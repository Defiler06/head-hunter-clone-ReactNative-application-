import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const sendEmail = async (recipient: string, text: string) => {
	try {
		// Создание транспорта Nodemailer
		const transporter = nodemailer.createTransport({
			host: 'smtp.mail.ru',
			port: 465,
			secure: true,
			auth: {
				user: 'aaron.black99@mail.ru',
				pass: 'XnYqNA52Nz1naB5Ue7q7',
			},
		});

		// Определение информации об отправителе и получателе
		const mailOptions = {
			from: 'aaron.black99@mail.ru',
			to: recipient,
			subject: `Hello dear ${recipient}`,
			text: `Перейдите по ссылке чтобы подтвердить что вы настоящий ${text}`,
		};

		// Отправка электронного сообщения
		const result = await transporter.sendMail(mailOptions);
		console.log('Сообщение успешно отправлено:', result.messageId);
	} catch (error) {
		console.error('Ошибка при отправке сообщения:', error);
	}
};

export default sendEmail;
