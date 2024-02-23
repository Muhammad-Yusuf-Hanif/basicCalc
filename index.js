const display = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll("button"));
const errMsg = document.getElementById("errorMessage");

// Function to check the last numeric entry for a decimal point
function canAddDecimal(expression) {
	// Find the last numeric entry by splitting the expression at operators
	const parts = expression.split(/[\+\-\*\/]/); // Split by operators
	const lastPart = parts[parts.length - 1];
	return !lastPart.includes(".");
}

// Function to allow zeroes only part of a larger number instead of several leading zeroes
function canAppendZero(expression) {
	const parts = expression.split(/[\+\-\*\/]/); // Split by operators
	const lastPart = parts[parts.length - 1];
	return !(lastPart === "0" || lastPart === "");
}

buttons.map((button) => {
	button.addEventListener("click", (e) => {
		errMsg.innerHTML = "";
		const currentInput = e.target.innerText;
		if (currentInput === ".") {
			if (canAddDecimal(display.innerText)) {
				display.innerText += currentInput;
			}
			return;
		}

		if (currentInput === "AC") {
			display.innerText = " ";
		} else if (currentInput === "Del") {
			if (display.innerText) {
				display.innerText = display.innerText.slice(0, -1);
			}
		} else if (currentInput === "=" && display.innerText !== "NaN") {
			if (display.innerText) {
				try {
					display.innerText = eval(display.innerText);
				} catch (error) {
					// error handling based on errors received from eval method which is displayed below the calc
					if (error.toString() === "SyntaxError: Unexpected end of input") {
						errMsg.innerHTML = "Error: Add two values before calculating";
					} else if (error.toString() === "SyntaxError: Unexpected number") {
						errMsg.innerHTML = "Error: Enter valid numbers";
					} else if (error.toString() === "SyntaxError: Unexpected token '.'") {
						errMsg.innerHTML = "Error: Enter a valid number before the period";
					}
					console.log(error.toString());
					display.innerText = "";
				}
			}
		} else {
			if (currentInput === "0" && !canAppendZero(display.innerText)) {
				return; // Prevent appending zero if it's not allowed
			}
			display.innerText += currentInput;
		}
	});
});
