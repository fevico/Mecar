import { RequestHandler } from "express";
import  https  from "https";
import orderModel from "src/model/order";
import serviceModel from "src/model/services";
import walletModel from "src/model/wallet";
import { sendErrorRes } from "src/utils/helper";


export const makePayment: RequestHandler = (req, res) => {
    const { amount, email, metadata } = req.body;

    const params = JSON.stringify({
      email,
      amount,
      callback_url: 'https://ekomas-react-new.vercel.app/',
      metadata,
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const reqPaystack = https
      .request(options, (respaystack) => {
        let data = '';

        respaystack.on('data', (chunk) => {
          data += chunk;
        });

        respaystack.on('end', () => {
          console.log(JSON.parse(data));
          // Assuming res is the response object from the caller context
          // res.send(data);
        });
      })
      .on('error', (error) => {
        console.error(error);
      });

    reqPaystack.write(params);
    reqPaystack.end();
}

export const verifyPayment: RequestHandler = async (req, res) => {
    const reference = req.query.reference;
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };
  
    const reqPaystack = https.request(options, async (respaystack) => {
      let data = "";
  
      respaystack.on("data", (chunk) => {
        data += chunk;
      });
  
      respaystack.on("end", async () => {
        const responseData = JSON.parse(data);
  
        if (
          responseData.status === true &&
          responseData.data.status === "success"
        ) {
          const { customer, id, reference, status, currency, metadata } = responseData.data;
  
          const paymentData = {
            referenceId: reference,
            email: customer.email,
            status,
            currency,
            name: metadata.customerName,
            transactionId: id,
            phone: metadata.phone,
            price: metadata.totalPrice,
            serviceId: metadata.serviceId,
            userId: metadata.customerId
          };
  
          const order = new orderModel({ ...paymentData });
          await order.save();
  
          const totalPrice = parseFloat(metadata.totalPrice);
          const eightyPercent = totalPrice * 0.8;
          const twentyPercent = totalPrice * 0.2;
  
          // Update the paymentData to include the 80% and 20% values
          paymentData.price = eightyPercent;
  
          const service = await serviceModel.findById(metadata.serviceId).exec();
          if (!service) return res.status(400).json({ message: "Service is not available" });
  
          let wallet = await walletModel.findOne({ serviceId: metadata.serviceId }).exec();
          if (wallet) {
            wallet.balance += eightyPercent;
            await wallet.save();
          } else {
            wallet = await walletModel.create({
              serviceId: metadata.serviceId,
              balance: eightyPercent,
              userId: service.mechanicId,
            });
          }
  
          res.json({ message: "Payment verified and processed successfully!" });
        } else {
          res.status(400).json({ message: "Payment verification failed!" });
        }
      });
    });
  
    reqPaystack.on("error", (error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
}  
  