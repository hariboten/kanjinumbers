const	kanji_nums = "零壱弐参四五六七八九"
const	kanji_digit = "零拾百千"
const	kanji_big_digit = "零万億兆"
const	numbers_str = "0123456789"

function	n2k_less_ten_thousand (num)
{
	let	kanji = "";
	for (let d = 0; d < 4; d++) {
		let	digit_value = num % 10;
		if (digit_value === 0) {
			num = Math.floor(num / 10);
			continue ;
		}
		if (d !== 0)
			kanji = kanji_digit[d] + kanji;
		kanji = kanji_nums[digit_value] + kanji;
		num = Math.floor(num / 10);
		if (num === 0)
			break ;
	}
	return (kanji);
}

function	argument_check (arg_str) {
	if (arg_str.length > 16)
		throw "too long argument";
	if (arg_str.length !== 1 && arg_str[0] === "0")
		throw "argument beginning with zero"
	for (let i = 0; i < arg_str.length; i++) {
		if (numbers_str.indexOf(arg_str[i]) < 0)
			throw "argument has not numeric character";
	}
}

function	number2kanji (arg_str) {
	if (arg_str === "0")
		return (kanji_nums[0]);
	argument_check (arg_str);

	let	kanji = "";
	for (let big_digit = 0; big_digit < 4; big_digit++) {
		if (big_digit !== 0)
			kanji = kanji_big_digit[big_digit] + kanji;
		if (arg_str.length <= 4) {
			kanji = n2k_less_ten_thousand(parseInt(arg_str)) + kanji;
			break ;
		}
		kanji = n2k_less_ten_thousand(arg_str.substring(arg_str.length - 4)) + kanji;
		arg_str = arg_str.substring(0, arg_str.length - 4);
	}
	return (kanji);
}

// lambda
exports.handler = async (event) => {
	let kanji
	try {
		kanji = number2kanji(event.pathParameters.number.toString());
	} catch {
		const response = {
			headers:{
				"access-control-allow-origin": "*"
			},
			statusCode: 204,
		};
		return response;
	}
	const response = {
		statusCode: 200,
		headers:{
			"access-control-allow-origin": "*"
		},
		body: JSON.stringify(kanji),
	};
	return response;
}

//console.log(number2kanji(process.argv[2]));  //for print debug
