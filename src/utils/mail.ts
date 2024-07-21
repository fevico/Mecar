import nodemailer from 'nodemailer';
import { MailtrapClient } from "mailtrap";


const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: process.env.MAIL_TRAP_PASS, 
    },
  });

  
  const ENDPOINT = "https://send.api.mailtrap.io/";
  const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN  as string;

  interface MailtrapClientConfig {
    endpoint: string;
    token: string;
  }
  
  const clientConfig: MailtrapClientConfig = {
    endpoint: ENDPOINT,
    token: MAILTRAP_TOKEN
  }

  const client = new MailtrapClient(clientConfig);

  export const sendVerification = async (email: string, token: string, name: string) => {
    const VERIFICATION_EMAIL = process.env.VERIFICATION_EMAIL as string;

  
    const sender = {
      email: VERIFICATION_EMAIL,
      name: "Mecar Auto Tech",
    };
    const recipients = [
      {
        email,
      }
    ];
  

    client
    .send({
      from: sender,
      to: recipients,
      template_uuid: "225c9f52-06f4-43ba-9c74-cfe1ad270ac5",
      template_variables: {
        "user_name": name,
        "user_otp": token,
      }
    })
  };


export const sendForgetPasswordToken = async(email: string, token: string, name: string)=>{

  const VERIFICATION_EMAIL = process.env.VERIFICATION_EMAIL as string;

  
  const sender = {
    email: VERIFICATION_EMAIL,
    name: "Mecar Auto Tech",
  };
  const recipients = [
    {
      email,
    }
  ];

client
.send({ 
  from: sender,
  to: recipients,
  template_uuid: "27a0681c-e63e-4650-ac27-492cfff4ae32",
  template_variables: {
    "user_name": name,
    "user_email": email,
    "pass_reset_token": token,
  }
})
   
  // await transport.sendMail({
  //   from: "no-reply@example.com",
  //   to:email,
  //   subject: "Verify your account",
  //   html: `Kindly use the otp to reset your password ${token}`,
  // });
}

export const sendResetPasswordMail = async(email: string, fisrtName: string)=>{
   
  await transport.sendMail({
    from: "no-reply@example.com",
    to:email,
    subject: "Verify your account",
    html: `Hello! ${fisrtName} Your pasword has been updated successfully you can now sign in with your new password`,
  });
}

const mail = {
    sendVerification,
    sendForgetPasswordToken,
    sendResetPasswordMail
};
export default mail
