let price = 4583;

export function getGoldPrice() {
	const change = Math.floor(Math.random() * 101) - 50;
	price += change;
	if (price < 4000) price = 4000;
	return price;
}

