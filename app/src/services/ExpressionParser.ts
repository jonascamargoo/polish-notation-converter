import { DynamicStack } from '../utils/DynamicStack';
import { ValidateExpression } from './ValidateExpression'

// The auxStack is used to temporarily store operators and parentheses while the expression is being traversed and characters are being processed. It assists in determining the correct order of operators and in handling parentheses during the conversion process


export class ExpressionParser {
    
    constructor(
        private validator = new ValidateExpression(),
        private auxStack = new DynamicStack<string>(),
        private postfixExpression = ''
    ) {}

    public parse = (inputExpression: string): string => {
        // Validar a expressão e armazená-la na pilha 'expression'
        const expression = this.validator.validate(inputExpression);

        for (let i = 0; i <= expression.getSize() - 1; i++) {
            const current = expression.get(i);
            if(this.validator.isDigit(current))
                this.handleDigitToken(current);
            if(this.validator.isParenthesis(current))
                this.handleParentheseToken(current);
            if(this.validator.isOperator(current))
                this.handleOperatorToken(current);
        }    

        // Adicionar itens restantes à expressão postfix
        while(!this.auxStack.isEmpty())
            this.postfixExpression += this.auxStack.pop() + ' ';
    
        return this.postfixExpression.trim();
    }

    private handleDigitToken = (current: string): void => {
        this.postfixExpression += current + ' ';
    }

    private handleParentheseToken = (current: string): void => {
        if(current == '(')
            this.auxStack.push(current);
        if(current == ')') {
            while(!this.auxStack.isEmpty()) {
                const charAux = this.auxStack.pop();
                if(charAux !== '(') {
                    this.postfixExpression += charAux + ' ';
                } else {
                    break;
                }
            }
        }
    }

    private handleOperatorToken = (current: string) => {
        if(this.validator.isOperator(current)) {
            if(this.auxStack.isEmpty()) {
                this.auxStack.push(current);
            } else {
                while(!this.auxStack.isEmpty()) {
                    const charAux = this.auxStack.pop();
                    if(charAux == '(') {
                        this.auxStack.push(charAux);
                        break;
                    }
                    if(this.validator.isOperator(charAux)) {
                        if(this.validator.checkPriority(current, charAux)) {
                            this.auxStack.push(charAux);
                            break;
                        } else {
                            this.postfixExpression += charAux + ' ';
                        }
                    }
                }
                this.auxStack.push(current);
            }
        }
    }
}



