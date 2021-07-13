const nodemailer = require("nodemailer");

async function main(){
	let testAcount = await nodemailer.createTestAccount();


	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587, 
		secure: false,
		auth: {
			user: testAcount.user,
			pass: testAcount.pass
		}
	});


	let info = await transporter.sendMail({
		from: '"Sei lá, mano" <foo@example.com>',  
		to: "",
		subject: "Olá mundo", 
		text: "Hello world",
		html: "<b>Hello world</b>"
	});

	console.log("Message sent: %s", info.messageId);
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

/* dei uma olhada na lib
* Tentei mandar uma mensagem pro meu email mas o gmail bloqueia ela 
* Tem um link aqui que eu acho que vai ser interessante 
* https://nodemailer.com/usage/using-gmail/
*/

main().catch(console.error);