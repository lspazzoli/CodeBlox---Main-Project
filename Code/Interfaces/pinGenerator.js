/*********************************************************************
	Code version 0.1
	Person class
	Authors:
		Bilal Muhammad
		Lethabo Mogase
		Dirk de Klerk
		Lorenzo Spazzoli
	Team:
		CodeBlox
*********************************************************************/
var otpGenerator = require('otp-generator');

function PinGenerator() {
	otpGenerator.generate(8, {upperCase: false, specialChars: false, alphabets: false });
}

module.exports = PinGenerator;


