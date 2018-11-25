var oldValue;
var newValue;
var prevOp = "+";
var repeatHitOperator;
var repeatDeci;
var addDeci;
var weirdBoolean;
var noOpsStart = true;

window.addEventListener("DOMContentLoaded", init);

function init() {
    var tds = document.getElementsByTagName('td');
    oldValue = 0;
    newValue = 0;
    repeatHitOperator = false;
    repeatDeci = false;
    prevOp = "+";
    addDeci = false;
    updateResult("0");
    noOpsStart = true;
}

function updateResult(value) {
    var result = document.getElementsByTagName('td')[0];
    result.textContent = value;
}

function decimal() {
        if (repeatDeci) {
            return;
        }
        addDeci = true;
        var currentDisplay = document.getElementsByTagName('td')[0].textContent;
        if(addDeci && !weirdBoolean) {
            newString = currentDisplay + ".";
            updateResult(newString); //this will be used by the digitPressed next button click
        } else if (weirdBoolean) {
            newString = "0" + ".";
            updateResult(newString);
        }
        weirdBoolean = false;
        repeatDeci = true;
}

function digitPressed(number) {
    repeatHitOperator = false;
    noOpsStart = false;

    var calcDisplay = document.getElementsByTagName('td')[0].textContent;

    if (prevOp == "=") {
        oldValue = 0;
        prevOp = "+";
        if(!addDeci) {     //this got so ugly because we have to handle it the same way down before. Might as well be a funciton at this point
            newValue = newValue*10 + number;
            updateResult(newValue);
        } else {
            var combinedString;
            var firstHalf = calcDisplay.split(".")[0];
            var secondHalf = calcDisplay.split(".")[1];
            if(secondHalf && secondHalf!=0 && number!=0 && (secondHalf % 10 !=0)) {
                console.log(secondHalf);
                if (secondHalf.includes('0')) {
                    console.log("GOT HERE");
                    combinedString = firstHalf + "." + secondHalf + number;
                } else {
                    console.log("Doing normal calc");
                    secondHalf = secondHalf*10 + number;
                    combinedString = firstHalf + "." + secondHalf;
                }
            } else if (secondHalf==0 || secondHalf % 10 == 0) {
                combinedString = firstHalf + "." + secondHalf + number;
            } else if (secondHalf && (number==0)) {
                combinedString = firstHalf + "." + secondHalf + number;
            }
            newValue = combinedString;
            updateResult(combinedString);
        }
        //end if prevOp == "="
    } else {
        if(!addDeci) {
            newValue = newValue*10 + number;
            updateResult(newValue);
        } else {
            var combinedString;
            var firstHalf = calcDisplay.split(".")[0];
            var secondHalf = calcDisplay.split(".")[1];
            if(secondHalf && secondHalf!=0 && number!=0 && (secondHalf % 10 !=0)) {
                console.log(secondHalf);
                if (secondHalf.includes('0')) {
                    console.log("GOT HERE");
                    combinedString = firstHalf + "." + secondHalf + number;
                } else {
                    console.log("Doing normal calc");
                    secondHalf = secondHalf*10 + number;
                    combinedString = firstHalf + "." + secondHalf;
                }
            } else if (secondHalf==0 || secondHalf % 10 == 0) {
                combinedString = firstHalf + "." + secondHalf + number;
            } else if (secondHalf && (number==0)) {
                combinedString = firstHalf + "." + secondHalf + number;
            }
            newValue = combinedString;
            updateResult(combinedString);
        }
    }
    weirdBoolean = false;
}

function opPressed(operator) {
    
    if (noOpsStart) {
        return;
    }

    if(repeatHitOperator) {
        prevOp = operator;
        return;
    }

    
    repeatHitOperator = true;
    weirdBoolean = true;
    addDeci = false;
    var calc;

    switch(prevOp) {
        case "+":
            calc = eval(oldValue + "+" + newValue);
            repeatDeci = false;
            break;
        case "-":
            calc = eval(oldValue + "-" + newValue);
            repeatDeci = false;
            break;
        case "/":
            calc = eval(oldValue + "/" + newValue);
            repeatDeci = false;
            break;
        case "*":
            calc = eval(oldValue + "*" + newValue);
            repeatDeci = false;
            break;
        default:
            return
    }
    if (calc == Infinity) {
        updateResult("Undefined");
        //init();
        return;
    } else if (Number.isNaN(calc)) {
        updateResult("Undefined");
        init();
    }
    console.log("got under default");
    oldValue = calc;
    newValue = 0;
    prevOp = operator;
    console.log("prevOp is now " + prevOp);

    if(calc.toString().length > 8) {
        updateResult(calc.toFixed(8));
    } else {updateResult(calc);}

    noOpsStart = false;
}

