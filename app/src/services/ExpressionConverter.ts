import { DynamicStack } from '../utils/DynamicStack.js';
import { ValidateExpression } from './ValidateExpression.js'

// The auxStack is used to temporarily store operators and parentheses while the expression is being traversed and characters are being processed. It assists in determining the correct order of operators and in handling parentheses during the conversion process


export class ExpressionConverter {
    
  constructor(
        private validator = new ValidateExpression()
  ) {}

  public convertToPostfix  = (inputExpression: string): string => {
    const expression = this.validator.validate(inputExpression);
    const auxStack = new DynamicStack<string>();
    let postfixExpression = '';
    for (let i = 0; i < expression.getSize(); i++) {
      const current = expression.get(i);
      if(this.validator.isDigit(current))
        postfixExpression += current + ' ';
      if(this.validator.isParenthesis(current)) {
        if(current == '(')
          auxStack.push(current);
        if(current == ')') {
          while(!auxStack.isEmpty()) {
            const charAux = auxStack.pop();
            if(charAux !== '(') {
              postfixExpression += charAux + ' ';
            } else {
              break;
            }
          }
        }
      }
      if(this.validator.isOperator(current)) {
        if(this.validator.isOperator(current)) {
          if(auxStack.isEmpty()) {
            auxStack.push(current);
          } else {
            while(!auxStack.isEmpty()) {
              const charAux = auxStack.pop();
              if(charAux == '(') {
                auxStack.push(charAux);
                break;
              }
              if(this.validator.isOperator(charAux)) {
                if(this.validator.checkPriority(current, charAux)) {
                  auxStack.push(charAux);
                  break;
                } else {
                  postfixExpression += charAux + ' ';
                }
              }
            }
            auxStack.push(current);
          }
        }
      }
    }    

    // Add remaining items to the postfix expression
    while(!auxStack.isEmpty())
      postfixExpression += auxStack.pop() + ' ';
    
    return postfixExpression.trim();
  }

  // I don't have to return a stack here, because when I perform the operation, it will be in postfix
  public convertToInfix = (inputExpression: string): string => {
    const validatedExpression = this.validator.validatePostfix(inputExpression);
    const expression = new DynamicStack<string>();
    let infixExpression = '';
    let current: string;
    for (let i = 0; i < validatedExpression.length; i++) {
      let op1, op2: string;
      current = validatedExpression.charAt(i);
      if(this.validator.isDigit(current)) {
        expression.push(current);
      }
      if(this.validator.isOperator(current)) {
        op1 = expression.pop();
        op2 = expression.pop();
        expression.push(`(${op2} ${current} ${op1})`);
      }
    }
    infixExpression = expression.pop();
    return infixExpression.trim();
  };

}



