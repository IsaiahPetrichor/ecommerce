export const displayCard = (cardNum: number) => {
	const cardString: string = cardNum.toString();
	const lastFour: string = `${cardString[12]}${cardString[13]}${cardString[14]}${cardString[15]}`;
	const censoredCard: string = `**** **** **** ${lastFour}`;

	return censoredCard;
};

export const capitalize = (str: string) => {
	const firstCap: string = str.charAt(0).toUpperCase();
	const allButFirst: string = str.slice(1);
	const strCap: string = firstCap + allButFirst;

	return strCap;
};
