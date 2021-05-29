const	kanji_nums = "零壱弐参四五六七八九"
const	kanji_digits = "零拾百千"
const	kanji_big_digits = "零万億兆"
const	kanji_strs = "零壱弐参四五六七八九拾百千万億兆"
const	numbers_str = "0123456789"

function kanji2number(arg_str)
{
	let	number = 0;
	while (true) {
		let digit_value;
		let	digit;
		digit_value = kanji_nums.indexOf(arg_str[0]);
		if (digit_value < 0)
			digit_value = 1;
		else if (arg_str.length > 1)
			arg_str = arg_str.substring(1);
		else {
			number += digit_value;
			break ;
		}
		digit = kanji_digits.indexOf(arg_str[0]);
		if (digit < 0)
			digit = 0;
		number += digit_value * (10 ** digit)
		if (arg_str.length > 1)
			arg_str = arg_str.substring(1);
		else
			break ;
	}
	return (number.toString());
}

console.log(kanji2number(process.argv[2]));
