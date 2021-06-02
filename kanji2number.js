const	kanji_nums = "零壱弐参四五六七八九"
const	kanji_digits = "零拾百千"  // 10^i
const	kanji_big_digits = "零万億兆"  // 10000^i
const	numbers_str = "0123456789"


function	check_arg(arg) {
	if (typeof arg !== "string")
		throw "invailed arg";
}

function	kanji2number(kanji) {
	check_arg(kanji);
	if (kanji.length === 1 && kanji === kanji_nums[0]) // first, return simple case if value is 0. only this point expect character zero
		return (numbers_str[0]);

	let		number = 0n;  //using BigInt
	let		store = 0; // 0 <= store <= 9999. store value of "4 digits block"
	let		prev_d = 0; // store prev value not to backflow digits, like "ten bilion nine milion".
	let		prev_big_d = 0;  // same as above

	for (let p = 0; p < kanji.length; p++) {
		let digit_value = kanji_nums.indexOf(kanji[p]);
		if (digit_value <= 0)
			throw "invailed arg";

		p++;
		if (!(p < kanji.length)) {
			store += digit_value;
			break ;
		}

		let digit = kanji_digits.indexOf(kanji[p]);
		if (digit > 0) {
			if (prev_d !== 0 && digit > prev_d)
				throw "invailed arg";
			prev_d = digit;
			store += digit_value * (10 ** digit);
			continue ;
		}

		let big_digit = kanji_big_digits.indexOf(kanji[p]);
		if (big_digit <= 0)
			throw "invailed arg";
		if (prev_big_d !== 0 && big_digit > prev_big_d)
			throw "invailed arg";
		prev_big_d = big_digit;
		prev_d = 0;
		store += digit_value;
		number = number + BigInt(store) * (10000n ** BigInt(big_digit));
		store = 0;
	}
	number = number + BigInt(store);
	return (number.toString());
}

console.log(kanji2number(process.argv[2]));  // for print debug
