/* global BigInt */

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
	let		prev_type;  // previous parsed character type {0:none, 1:d_value, 2:digit, 3:big_digit}
	let		digit_value;
	let		big_digit;

	for (let p = 0; p < kanji.length; p++) {

		let tmp = kanji_nums.indexOf(kanji[p]);
		if (tmp > 0) {
			digit_value = tmp;
			if (prev_type === 1)
				throw "invailed arg";
			prev_type = 1;
			continue;
		}

		let digit = kanji_digits.indexOf(kanji[p]);
		if (digit > 0) {
			if (prev_type === 2 || prev_type === 3)
				throw "invailed arg";
			prev_type = 2;
			if (prev_d !== 0 && digit > prev_d)  // check digit backflow
				throw "invailed arg";
			prev_d = digit;
			store += digit_value * (10 ** digit);
			digit_value = 0;
			continue ;
		}

		let big_digit = kanji_big_digits.indexOf(kanji[p]);
		if (big_digit <= 0)
			throw "invailed arg";
		if (prev_big_d !== 0 && big_digit > prev_big_d)  // check digit backflow
			throw "invailed arg";
		if (prev_type === 3)
			throw "invailed arg";
		prev_type = 3;
		prev_big_d = big_digit;
		prev_d = 0;
		store += digit_value;
		digit_value = 0;
		number = number + BigInt(store) * (10000n ** BigInt(big_digit));
		store = 0;
	}
	number = number + BigInt(store + digit_value);
	return (number.toString());
}

exports.handler = async (event) => {
	let number
	try {
		number = kanji2number(event.pathParameters.kanji);
	} catch {
		const response = {
			statusCode: 204,
			headers:{
				"access-control-allow-origin": "*"
		},
		};
		return response;
	}
	const response = {
		statusCode: 200,
		headers:{
			"access-control-allow-origin": "*"
		},
		body: number,
	};
	return response;
};

//console.log(kanji2number(process.argv[2]));  // for print debug
