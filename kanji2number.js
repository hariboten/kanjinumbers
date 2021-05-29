const	kanji_nums = "零壱弐参四五六七八九"
const	kanji_digit = "零拾百千"
const	kanji_big_digit = "零万億兆"
const	kanji_strs = "零壱弐参四五六七八九拾百千万億兆"
const	numbers_str = "0123456789"

function kanji2number(arg_str)
{
	if (arg_str.length =! 1)
		throw "invailed arg";
	let	number = "";
	let digit_value;
	digit_value = kanji_nums.indexOf(arg_str);
	if (digit_value < 0)
		throw "invailed arg";
	number = digit_value.toString();
	return (number);
}

console.log(kanji2number(process.argv[2]));
