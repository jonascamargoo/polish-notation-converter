import { DynamicStack } from '../utils/DynamicStack.js';
import { ValidateExpression } from './ValidateExpression.js';

export class ExpressionSolver {
  constructor(protected validator: ValidateExpression) {}

  public performOperation = (operator: string, operand1: number, operand2: number)  => ({
    '+': operand1 +  operand2,
    '-': operand1 -  operand2,
    '*': operand1 *  operand2,
    '/': operand1 /  operand2,
    '^': operand1 ** operand2
  }[operator]);

  public solveExpression = (postfixExpression: string): number => {
    const digits = DynamicStack.splitString(postfixExpression);
    const operandStack = new DynamicStack<number>();
    let current: number | string;
    let operand1: number;
    let operand2: number;
    let result: number | undefined;
    for (let i = 0; i <= postfixExpression.length - 1; i++) {
      current = digits.get(i);
      if(this.validator.isDigit(current))
        operandStack.push(Number(current))
      // Analyzing if it's an operator. If so, perform the operation and remove the operands used
      if(this.validator.isOperator(current)) {
        operand2 = operandStack.pop();
        operand1 = operandStack.pop();
        result = this.performOperation(current, operand1, operand2)
        if(result !== undefined)
          operandStack.push(result);
      }
    }
    return operandStack.pop(); // Final result
  }
    
}