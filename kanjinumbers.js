const	kanji_nums = "零壱弐参四五六七八九"
const	kanji_digit = "零拾百千"

function	n2k_ten_thousand_block (num)
{

}

function	number2kanji (arg_str) {
	let	arg_n = parseInt(arg_str, 10);
	if (isNaN(arg_n) || arg_n < 0 || arg_n > 9999) {
		console.log("invailed arg");
		return (null);
	}
	if (arg_n === 0)
		return (kanji_nums[0]);
	let	kanji = "";
	for (let d = 0; d < 4; d++) {
		let	digit_value = arg_n % 10;
		if (digit_value == 0) {
			arg_n = Math.floor(arg_n / 10);
			continue ;
		}
		if (d != 0)
			kanji = kanji_digit[d] + kanji;
		if (digit_value != 1 || d == 0)
			kanji = kanji_nums[digit_value] + kanji;
		arg_n = Math.floor(arg_n / 10);
		if (arg_n == 0)
			break ;
	}
	return (kanji);
}

console.log(number2kanji(process.argv[2]));
