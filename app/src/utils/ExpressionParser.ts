import { DynamicStack } from './DynamicStack';
import { ValidateExpression } from './ValidateExpression'

// The auxStack is used to temporarily store operators and parentheses while the expression is being traversed and characters are being processed. It assists in determining the correct order of operators and in handling parentheses during the conversion process
export const parse = (inputExpression: string): string => {
    const validator = new ValidateExpression();
    const expression = validator.validate(inputExpression);
    const auxStack = new DynamicStack<string>();
    let postfixExpression: string = '';

    for (let i = 0; i <= expression.getSize() - 1; i++) {
        const current = expression.get(i);

        if(validator.isDigit(current))
            postfixExpression += current + ' ';

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

        if(validator.isOperator(current)) {
            if(auxStack.isEmpty()) {
                auxStack.push(current);
            } else {
                while(!auxStack.isEmpty()) {
                    const charAux = auxStack.pop();
                    if(charAux == '(') {
                        auxStack.push(charAux);
                        break;
                    }
                    //Here, we determine the priority order. The selected number is added to auxStack and will be appended to postfixExpression at a later stage
                    if(validator.isOperator(charAux)) {

                        if(validator.checkPriority(current, charAux)) {
                            auxStack.push(charAux);
                            break;
                        } else {
                            postfixExpression += charAux + ' ';
                            

                        }
                    }
                    // Here, the replacement of the item with higher priority by the one with lower priority takes place
                }
                auxStack.push(current);
            }
            
        }
    }    

    // Here we added remaining items to postfix Expression
    while(!auxStack.isEmpty())
        postfixExpression += auxStack.pop() + ' ';

    return postfixExpression.trim();

}




