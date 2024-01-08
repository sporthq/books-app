import nodemailer from 'nodemailer';
// mwrk dalf ubba rwnp
// nowak.sebastian991@gmail.com
export const sendVerificationEmail = (token, email) => {
	const html = `
    <html>
    <body>
    <h3>Cześć  ${email}</h3>
    <p>Dziękuje za rejestracje w <b> BookingsRate! </b> </p>
    <p>Użyj linku poniżej, aby potwierdzić swoją rejestrację, (link jest ważny przez 24 godziny!).</p>
    <h2><a style="text-decoration: none" href="https://books-app-front.vercel.app/email-verify/${token}">Potwierdzam swój email</a></h2>
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
		subject: 'Potwierdź swój ades email - Booking rate',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email wysłany do ${email}`);
			console.log(info.response);
		}
	});
};
