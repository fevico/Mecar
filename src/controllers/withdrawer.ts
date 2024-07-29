import axios from "axios";
import { RequestHandler } from "express";
import walletModel from "src/model/wallet";
import { sendErrorRes } from "src/utils/helper";

const PUBLIC_KEY = process.env.PUBLIC_KEY

export const getBankList: RequestHandler = async (req, res) => {
    // const user = req.user.id;

    // const wallet = await walletModel.findOne({ userId: user });
    // if(!wallet) return sendErrorRes(res, "No wallet record!", 422)
     

    const options = {
        method: 'GET',
        url: `https://strowallet.com/api/fetchBanks/`, 
        params: {
            public_key: PUBLIC_KEY,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios(options);
        res.json(response.data);
    } catch (error) {
        console.error('Error finding wallet transactions:', error); 
        return res.status(500).json({ message: "Error finding wallet transactions" });
    }

}

export const getAccountDetails: RequestHandler = async (req, res) =>{
    const {bankCode, accountNumber} = req.body
    const options = {
    method: 'GET',
    url: `https://strowallet.com/api/banks/get-customer-name/`,
    params: {
        public_key: PUBLIC_KEY,
        account_number: accountNumber,
        bank_code: bankCode
    },
    headers: {
        'Content-Type': 'application/json'
    }
};

try {
    const response = await axios(options);
    res.json(response.data);
    // { 
    //     "success": true,
    //     "message": "Suceess!",
    //     "data": {
    //         "bank_code": "000004",
    //         "account_number": "2108334757",
    //         "account_name": "AJAYI FAVOUR VICTOR",
    //         "sessionId": "090286240528182058894842974198"
    //     }
    // }
} catch (error) {
    console.error('Error fetching data plans:', error);
    res.status(500).json({ message: "Error fetching data plans" });
}

}

export const withdraw: RequestHandler = async (req, res) =>{
    const {bank_code, account_number, narration, amount, name_enquiry_reference} = req.body
const options = { 
    method: 'POST',
    url: `https://strowallet.com/api/banks/request/`,
    params: {
        public_key: PUBLIC_KEY,
        account_number: account_number,
        bank_code: bank_code,
        name_enquiry_reference: name_enquiry_reference,
        narration: narration,
        amount: amount
    },
    headers: {
        'Content-Type': 'application/json'
    }
};

// {
//     "success": true,
//     "response": {
//         "statusCode": 200,
//         "responseCode": "00",
//         "message": "Approved or completed successfully",
//         "sessionId": "090286240528182120460018097460",
//         "paymentReference": "BPU18MMZ9FX1",
//         "provider": "NIBSS",
//         "type": "Outwards",
//         "destinationInstitutionCode": "000004",
//         "creditAccountName": "AJAYI FAVOUR VICTOR",
//         "creditAccountNumber": "2108334757",
//         "narration": "money"
//     },
//     "message": "Transaction Successfully."
// }

try {
    const response = await axios(options);
    res.json(response.data);
} catch (error) {
    console.error('Error fetching data plans:', error);
    res.status(500).json({ message: "Error fetching data plans" });
}

}