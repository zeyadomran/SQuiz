import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, text: string) {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	await transporter.sendMail({
		from: '"Zeyad Omran" <ziomran@gmail.com>',
		to,
		subject,
		text,
	});
}
