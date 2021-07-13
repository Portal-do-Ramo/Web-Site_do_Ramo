const nodemailer = require("nodemailer");
require("dotenv").config();


let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 567,
	secure: false,
	auth: {
		type: 'login',
		user: process.env.EMAIL,
		pass: process.env.SENHA
	},
	tls: {
		rejectUnauthorized: false,
	},
});
		
//mexer depois
async function main(){
	let info = await transporter.sendMail({
		from: '"Sei lá, mano" <foo@example.com>',
		to: ["grocre@gmail.com"],
		subject: "Olá mundo",
		text: "Hello world",
		html: "<b>Hello world</b>"
	});
	console.log(info);
}
	
main()
	/* dei uma olhada na lib
	
	* Tentei mandar uma mensagem pro meu email mas o gmail bloqueia ela 
* Tem um link aqui que eu acho que vai ser interessante 
* https://nodemailer.com/usage/using-gmail/
*/