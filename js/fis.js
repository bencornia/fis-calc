'use strict';

class BaseNum {
	/**
	 * @param {Number} unit
	 */
	constructor(sign, unit, factor) {
		this.unit = Number(`${sign}${unit}`);
		this.factor = factor;
		this.baseValue = this.unit * factor;
	}
}

class Sxt extends BaseNum {
	/**
	 * @param {Number} num
	 */
	constructor(sign, num) {
		super(sign, num, 1);
	}
}

class Inch extends BaseNum {
	/**
	 * @param {Number} num
	 */
	constructor(sign, num) {
		super(sign, num, 16);
	}
}

class Foot extends BaseNum {
	/**
	 * @param {Number} num
	 */
	constructor(sign, num) {
		super(sign, num, 192);
	}
}

export default class Fis {
	/**
	 * @param {Number} foot
	 * @param {Number} inch
	 * @param {Number} sxt
	 */
	constructor(sign, foot, inch, sxt) {
		this.fis = [new Foot(sign, foot), new Inch(sign, inch), new Sxt(sign, sxt)];
		this.baseSum = this.sum(this.fis);
    this.sign = this.getSign(this.baseSum);
	}

  /**
   * Returns the sum of the baseValue of each unit.
   * @param {Array} fis 
   * @returns {Number}
   */
	sum(fis) {
		return fis.reduce((a, b) => {
			return a + b.baseValue;
		}, 0);
	}

  /**
   * Returns the sign of the baseSum value.
   * @param {Number} baseSum 
   * @returns {String} "" or "-"
   */
	getSign(baseSum) {
		if (baseSum < 0) return "-";
		else return "";
	}

	/**
	 * @param {Fis} other
	 * @returns {Fis} The sum.
	 */
	add(other) {
		const sum = [];
		for (let i = 0; i < this.fis.length; i++) {
			sum.push(this.fis[i].unit + other.fis[i].unit);
		}
		return this.regroup(sum);
	}

	/**
	 * @param {Fis} other
	 * @returns {Fis} The difference.
	 */
	sub(other) {
		const difference = [];
		for (let i = 0; i < this.fis.length; i++) {
			difference.push(this.fis[i].unit - other.fis[i].unit);
		}
		return this.regroup(difference);
	}

	/**
	 * @param {Number} other
	 * @returns {Fis} The product.
	 */
	mul(other) {
		const product = [];
		for (let i = 0; i < this.fis.length; i++) {
			product.push(this.fis[i].unit * other);
		}
		return this.regroup(product);
	}

	/**
	 * @param {Number} other
	 * @returns {Fis} The quotient.
	 */
	div(other) {
		const quotient = [];
		for (let i = 0; i < this.fis.length; i++) {
			quotient.push(this.fis[i].unit / other);
		}

		return this.regroup(quotient);
	}

  /**
	 * @param {Fis} other
	 * @returns {Fis}
	 */
	area(other) {
		const product = [];
		for (let i = 0; i < this.fis.length; i++) {
			product.push(this.fis[i].unit * other.fis[i].unit);
		}

		return this.regroup(product);
	}

  /**
   * Takes an array [foot, inch, sxt] and regroups the values.
   * 
   * [1, 0, 16] would be converted to [1, 1, 0]
   * 
   * [0, 12, 0] would be converted to [1, 0, 0]
   * 
   * The values are then used to construct an instance of Fis.
   * @param {Array} result 
   * @returns {Fis} an instance of Fis
   */
	regroup(result) {
    let baseValue = result[0]*192 + result[1]*16 + result[2]
    const sign = this.getSign(baseValue);
    baseValue = Math.ceil(Math.abs(baseValue));
    const foot = Math.floor(baseValue/192);
    const inch = Math.floor( (baseValue - foot * 192) / 16 )
    const sxt = baseValue - foot * 192 - inch * 16

    return new Fis(sign, foot, inch, sxt);
	}

  /**
   * Returns a string representation of the measurement.
   * @returns {String}
   */
  toString() {
    const fis = this.fis.map(item => {
      item = String(Math.abs(item.unit));
      if (item < 10) {
        item = "0" + item;
      }

      return item;
    })
		
		return this.sign + fis.join('');    
  }
}