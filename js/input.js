import Fis from "./fis.js";

/**
 * Converts a string of numbers into a Fis constructor as a string.
 * @param {String} value
 * @returns {String}
 */
export function toFis(value) {
	const sign = getSign(value);
	value = padString(String(Math.abs(Number(value))));
	const units = getUnits(value);
	return `(new Fis('${sign}', ${units[0]}, ${units[1]}, ${units[2]}))`;
}

/**
 * Returns an empty string if the number is positive.
 * Returns '-' if the number is negative.
 * @param {String} value
 * @returns {String} "" OR "-"
 */
function getSign(value) {
	if (Number(value) < 0) return "-";
	return "";
}

/**
 * Returns value padded with zeros. Values greater than
 * 5 characters will not be padded
 * @param {String} value
 * @returns {String}
 */
function padString(value) {
	while (value.length < 6) {
		value = "0" + value;
	}
	return value;
}

/**
 * Returns an array of values containing the feet, inches
 * and sixteenths.
 * @param {String} value
 * @returns {Array}
 */
function getUnits(value) {
	const len = value.length;
	const foot = Number(value.slice(0, len - 4));
	const inch = Number(value.slice(len - 4, len - 2));
	const sxt = Number(value.slice(len - 2, len));
	return [foot, inch, sxt];
}


export function decToFis(num) {
	const sign = getSign(num);
	num = Math.abs(num);
	// This is a bit of a workaround to avoid writing another method.
	// The decimal number is passed in as the foot parameter.
	// To regroup the value, the object is added to another
	// instance with a zero value.
	const fis = new Fis(sign, num, 0, 0)['add'](new Fis('', 0,0,0));
	return `(new Fis('${fis.sign}', ${fis.fis[0].unit}, ${fis.fis[1].unit}, ${fis.fis[2].unit}))`;
}