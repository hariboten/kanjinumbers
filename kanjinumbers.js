const kanji_nums = "零壱弐参四五六七八九"

function number2kanji (arg_str) {
	const	arg_n = parseInt(arg_str, 10);
	if (isNaN(arg_n) || arg_n < 0 || arg_n > 9) {
		console.log("invailed arg");
		return (null);
	}
	let		kanji = "";
	kanji = kanji_nums[arg_n] + kanji;
	return (kanji);
}

console.log(number2kanji(process.argv[2]));
