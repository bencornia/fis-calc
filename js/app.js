import Fis from "./fis.js";
import { toFis, decToFis } from "./input.js";

const events = {
	stack: [],
	display: [],
	execute: function () {
		return eval(this.stack.join(""));
	},
	clear: function () {
		this.stack = [];
		this.display = [];
	},
};

// Callback function that temporarily clears the display
// between operations. The function definition is reassigned
// whenever an operator is pressed. When a number key is 
// pressed after an operator key then tempClear is immediately 
// called and then reassigned. This allows the user to enter 
// text without manually clearing the display between operations.
// Operator key is pressed: tempClear = () => display.textContent = '';
// Number key is pressed: tempClear(); 
//												tempClear = () => return;
let tempClear = () => {
	return;
};

// Create an array of all the numbered buttons.
const numberBtns = Array.from(document.querySelectorAll("button")).filter((btn) => {
	if (isNaN(parseInt(btn.textContent)) === false) {
		return btn;
	}
});

// Add event listeners to all the numbered buttons.
numberBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		inputNum(btn.textContent);
	})
})

// Declare constants for all of the operation buttons
const smallDisplay = document.getElementById("small-display")
const display = document.getElementById("display");
const clrBtn = document.querySelector(".clear");
const backBtn = document.querySelector(".back");
const areaBtn = document.querySelector(".area");
const divBtn = document.querySelector(".divide");
const mulBtn = document.querySelector(".multiply");
const subBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".plus");
const plusMinusBtn = document.querySelector(".plus-minus");
const decimalBtn = document.querySelector(".decimal");
const eqlBtn = document.querySelector(".equal");

// Create an array of all the operation buttons
const operations = [
	clrBtn, backBtn, areaBtn, 
	divBtn, mulBtn, subBtn, 
	addBtn, plusMinusBtn, decimalBtn, 
	eqlBtn
];

// Create an array of the keys representing each operation
const keys = [
	'c', 'Backspace', 'a',
	'/', '*', '-',
	'+', 'm', '.',
	'Enter'
]

// Map each key as an attribute of the buttons.
for (let i=0; i<operations.length; i++) {
	operations[i].setAttribute('keyValue', keys[i]);
}

// Keydown handler.
document.addEventListener("keydown", input);
/**
 * 
 * @param {KeyboardEvent} e 
 * @returns 
 */
function input(e) {
	// If the buttons keyValue matches the event key
	// then focus button and click it.
	operations.forEach(btn => {
		if (btn.getAttribute('keyValue') === e.key) {
			// prevent enter button from pressing button twice.
			// otherwise it will overwrite negative values.
			if (btn.getAttribute('keyValue') === 'Enter') {
				e.preventDefault();
			}
			btn.focus();
			btn.click();
		}
	})
	// If the key is a number other than a function key
	// then focus the key and click it.
	if (/^f\d/gi.test(e.key)) {
		return;
	} else if (/\d/gi.test(e.key)) {
		numberBtns.forEach(btn => {
			if (btn.textContent == e.key) {
				btn.focus()
				btn.click();
			}
		})
	}
}

function inputNum(char) {
	tempClear();
	// Limit input length to 10
	if (display.textContent.length > 10) {
		return;
	}
	display.textContent += char;
	tempClear = () => {
		return;
	};
}

// clearbtn handler
clrBtn.addEventListener("click", () => {
	display.textContent = "";
	smallDisplay.textContent = "";
	events.clear();
});

// backBtn handler
backBtn.addEventListener("click", () => {
	display.textContent = display.textContent.slice(0, -1);
});

// operator handlers
addBtn.addEventListener("click", () => loadOperator("['add']", "+"));
subBtn.addEventListener("click", () => loadOperator("['sub']", "-"));
mulBtn.addEventListener("click", () => loadOperator("['mul']", "*"));
divBtn.addEventListener("click", () => loadOperator("['div']", "/"));
areaBtn.addEventListener("click", () => loadOperator("['area']", "*area*"));

const operators = ["['add']", "['sub']", "['mul']", "['div']", "['area']"];
function loadOperator(func, repr) {
	if (operators.some(operator => operator === events.stack[1])) {
		events.stack.pop()
		events.stack.push(func);

		events.display.pop();
		events.display.push(repr);
		smallDisplay.textContent = events.display.join(' ')
	}
	else {
		pushToStack();
		events.display.push(display.textContent)
		events.stack.push(func);
		
		events.display.push(repr)
		smallDisplay.textContent = events.display.join(' ')
	}
}

// eqlBtn handler
eqlBtn.addEventListener("click", evaluate);

function evaluate() {
	pushToStack();
	events.display.push(display.textContent)
	display.textContent = events.execute();

	events.display.push('=');
	smallDisplay.textContent = events.display.join(' ')
	events.clear();
}

function pushToStack() {
	// Multiply and divide operators don't use fis as second argument.
	if (["['mul']", "['div']"].some(operator => operator === events.stack[1])) {
		events.stack.push(`(${display.textContent})`)
	}
	else {
		if (display.textContent.includes('.')) {
			const fis = decToFis(display.textContent);
			events.stack.push(fis);
		}
		else {
			const fis = toFis(display.textContent);
			events.stack.push(fis);
		}
	}
	tempClear = () => (display.textContent = "");
}

// Handler for decimal input.
decimalBtn.addEventListener('click', () => {
	if (!display.textContent.includes('.')) {
		display.textContent += '.'
	}
});

// Handler for AddEqual btn
plusMinusBtn.addEventListener('click', () => {
	if (Number(display.textContent) < 0) {
		display.textContent = display.textContent.replace('-', '');
	}
	else if (Number(display.textContent) > 0) {
		display.textContent = '-' + display.textContent;
	}
})