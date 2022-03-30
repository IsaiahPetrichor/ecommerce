export const displayCard = (cardNum: number) => {
	const cardString: string = cardNum.toString();
	const lastFour: string = `${cardString[12]}${cardString[13]}${cardString[14]}${cardString[15]}`;
	const censoredCard: string = `**** **** **** ${lastFour}`;

	return censoredCard;
};

export const capitalize = (str: string) => {
	if (str === 'gift-card') {
		return 'Gift Card';
	}

	const firstCap: string = str.charAt(0).toUpperCase();
	const allButFirst: string = str.slice(1);
	const strCap: string = firstCap + allButFirst;

	return strCap;
};

export const verifyCard = (cardNumber: string) => {
	// uses basic luhn algorithm

	// verify that the card only contains digits
	if (cardNumber.match(/\D/) !== null) return false;

	// split the string into an array containing each character as an element
	let cardNumberArr = cardNumber.split('');
	// check the length of the array, credit cards are 16 digits long
	if (cardNumberArr.length !== 16) return false;

	// start from the last digit
	let sum = Number(cardNumberArr[15]);
	let parity = 14 % 2;

	for (let i = 0; i <= 14; i++) {
		let digit = Number(cardNumberArr[i]);
		if (i % 2 === parity) {
			digit = digit * 2;
		}
		if (digit > 9) {
			digit -= 9;
		}

		sum += digit;
	}

	// check the remainder to equal 0
	if (sum % 10 === 0) return true;
	// return false if it isnt 0
	return false;
};
