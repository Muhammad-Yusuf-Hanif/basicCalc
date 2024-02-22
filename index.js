const display = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll(["button"]));
const errMsg = document.getElementById("errorMessage");

buttons.map((button) => {
	button.addEventListener("click", (e) => {
		errMsg.innerHTML = "";
		if (e.target.innerText === ".") {
			if (display.innerText.includes(".")) {
				return;
			}
		}

		if (e.target.innerText === "AC") {
			display.innerText = " ";
		} else if (e.target.innerText === "Del") {
			if (display.innerText) {
				display.innerText = display.innerText.slice(0, -1);
			}
		} else if (e.target.innerText === "=") {
			if (display.innerText) {
				try {
					if (display.innerText.includes("*")) {
						display.innerText = eval(display.innerText);
					} else if (display.innerText.includes("+")) {
						display.innerText = eval(display.innerText);
					} else if (display.innerText.includes("-")) {
						display.innerText = eval(display.innerText);
					} else if (display.innerText.includes("/")) {
						display.innerText = eval(display.innerText);
					}
				} catch (error) {
					if (error.toString() === "SyntaxError: Unexpected end of input") {
						errMsg.innerHTML = "Add two values before requesting calculation";
					} else if (error.toString === "SyntaxError: Unexpected number") {
						errMsg.innerHTML = "Enter valid numbers";
					}
					console.log("typeof error", typeof error);
					console.log(error.toString());
					display.innerText = "";
				}
			}
		} else {
			display.innerText += e.target.innerText;
			if (e.target.innerText === "0" && display.innerText === "0") {
				if (display.innerText[0] === "0") {
					return;
				}
			}
		}
	});
});

// if the first value is a zero and the second value is a period then you should be able to add further values
