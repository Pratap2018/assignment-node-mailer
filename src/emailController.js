const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD ,LINK} = require("./config");
const transport = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
};

const sendMail = async (req, res, next) => {
  try {
    const transporter = await nodemailer.createTransport(transport);
    const { name, userEmail  ,roll} = req.body;
    console.log(name , userEmail);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Heritage Institute of Technology",
        link: LINK,
      },
    });
    const mailBody = {
      body: {
        name,
        intro:
          "Your registration is successful. Your login details are as follows:",
        table: {
          data: [
            {
              "Student Name": name,
              "Class Roll": roll,
              "Password": "****ha",
            },
          ],
        },
      },
    };
    let mail =await MailGenerator.generate(mailBody);
    let message = {
           from: EMAIL,
           to: userEmail,
           subject: "Registration Details",
           html: mail,
         };

    await transporter.sendMail(message) 
    res.status(201).json({"msg":"Mail sent"})
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  sendMail,
};
