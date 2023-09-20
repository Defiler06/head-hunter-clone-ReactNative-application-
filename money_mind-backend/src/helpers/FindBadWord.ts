const forbiddenWords = [
	'сука',
	'блять',
	'гандон',
	'хуй',
	'пидор',
	'еблан',
	'блядь',
	'ебать',
	'пизда',
	'бля',
	'блядина',
	'блядский',
	'блядство',
	'выблядок',
	'выебон',
	'доеабался',
	'ебало',
	'ебанешься',
	'ебанул',
	'ебнулся',
	'ебашит',
	'дерьмо',
	'заебал',
	'заебись',
	'наебнулся',
	'объебал',
	'пиздабол',
	'пиздатый',
	'пиздец',
	'распиздяй',
	'уебище',
	'хуйня',
	'хуево',
	'шароебится',
];

export const findBadWord = (message: string) => {
	const regex = new RegExp(forbiddenWords.join('|'), 'gi');

	const foundWords = message.toLowerCase().match(regex);

	if (foundWords) {
		const censoredMessage = message.replace(regex, (word) =>
			'*'.repeat(word.length),
		);
		return censoredMessage;
	} else {
		return message;
	}
};
