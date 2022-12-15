const wholeCalculator = document.querySelector('.calculator-grid');
const smallDiv = document.querySelector('.previous-operand');
const bigDiv = document.querySelector('.current-operand');
const operations = document.querySelectorAll('[data-operation]');
const numbers = document.querySelectorAll('[data-number]');
const deleteKey = document.querySelector('[data-delete]');
const equalsKey = document.querySelector('[data-equals]');
const allClearKey = document.querySelector('[data-all-clear]');

class Calculator{
    constructor(smallDiv, bigDiv){
        this.smallDiv = smallDiv;
        this.bigDiv = bigDiv;
        this.clear();
    }

  clear(){
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  } 

  updateDisplay(){
    this.bigDiv.innerText = this.currentOperand;
    this.smallDiv.innerText = this.previousOperand;
  }

  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand!== ''){
      this.compute();
    }
      this.operation = operation;
    this.previousOperand = this.currentOperand
    this.currentOperand = '';
  }

  compute(){
    let compute 
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    // if(isNan(prev) || isNan(current)) return;
    switch(this.operation){
      case '+':
        compute = prev + current
        break;
      case '-':
        compute = prev - current
        break;
      case '*':
          compute = prev * current
          break;
      case '/':
        compute = prev / current
        break; 
      default:
        return  
    }
    this.currentOperand = compute
    this.operation = undefined
    this.previousOperand = ''
  }

  clearAfter(){
    this.currentOperand = parseFloat(this.currentOperand);
  }
}

const calculator = new Calculator(smallDiv, bigDiv);
numbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsKey.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearKey.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteKey.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})