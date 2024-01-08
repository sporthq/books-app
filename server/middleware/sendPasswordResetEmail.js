import nodemailer from 'nodemailer';
export const sendPasswordResetEmail = (token, email) => {
	
	const html = `
	
    <html>
    <body>
    <h3>Cześć  ${email}</h3>
    <p>Użyj linku poniżej, aby zresetować swoje hasło 👇 (token ważny jest 30min)</p>
    <h2><a style="text-decoration: none" href="https://books-app-front.vercel.app/password-reset/${token}">Resetuj moje hasło</a></h2>
    <p>Pozdrawiam Sebastian, zapraszam do zapoznania się z moim  <b><a style="text-decoration: none" href="www.nowakart.pl" >portfolio.</a> </b></p>
	<p>www.nowakart.pl</p>
    </body>
    </html>
    
    `;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'bookings.rate.app@gmail.com',
			pass: process.env.GMAIL_PASS,
		},
	});

	const mailOptions = {
		from: 'bookings.rate.app@gmail.com',
		to: email,
		subject: 'Zresetuj swoje hasło - Booking rate',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Haslo zresetowane ${email}`);
			console.log(info.response);
		}
	});
};
