require('dotenv').config();
const nodemailer = require('nodemailer');

const SendEmailUtility= async (req, res) => {



    try{

        const email = req.body['email'];
        const name = req.body['name'];
        const message = req.body['message'];
        const EmailFrom = name+" "+email;


        //transporter
        let transporter = await nodemailer.createTransport({
            host: "mail.teamrabbil.com",
            port: 587,
            secure: false,
            auth: {
                user: "info@teamrabbil.com",
                pass: '~sR4[bhaC[Qs'
            },
            tls: {
                rejectUnauthorized: false
            }
        })

	
	
       let mailOptions = {
           from:`Portfolio App <info@teamrabbil.com>`,
           to: process.env.EMAIL_TO,
           subject: "My Portfolio App",
           html: `
             <h5>Detail Information</h5>
             <ul>
             <li><p>Name : ${name}</p></li>
             <li><p>Email : ${email}</p></li>
             <li><p>Message : ${message}</p></li>
             </ul>`
       };


	    const result = await transporter.sendMail(mailOptions);
        res.status(200).json({message:"success", result:result});
	}
	catch(e){
        res.status(500).json({message:"fail", error:e.toString()});
	}

}
module.exports=SendEmailUtility
