import { DynamicStack } from "./DynamicStack";

export class ValidateExpression {

    private hasNumberAfterOperator = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        for (let i = 1; i < expression.getSize(); i++) {
            if (
                this.isOperator(expression.get(i)) &&
                this.isOperator(expression.get(i - 1))
            ) {
                return false;
            }
        }
        return true;
    };
    

    private isOperator = (character: string): boolean => {
        return  character == '+' ||
                character == '-' ||
                character == '*' ||
                character == '/' ||
                character == '=' ||
                character == '^';

    };

    private isDigit = (character: string): boolean => {
        return !isNaN(parseInt(character));
    };

    private isParenthesis = (character: string): boolean => {
        return  character == '(' ||
                character == ')';
    };

    private getPrecedence = (operator: string): number => {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
            default:
                return 0;
        }
    };

    // checks for two consecutive digits
    private numberHasOneDigit = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        for (let i = 1; i < expression.getSize() - 1; i++) {
            if(
                this.isDigit(expression.get(i)) &&
                this.isDigit(expression.get(i - 1))
                
            ) return false;
        }
        return true;

    };

    private checkPriority = (operator1: string, operator2: string): boolean => {
        return this.getPrecedence(operator1) > this.getPrecedence(operator2);
    };

    // checks if the number of operators is greater than the number of numbers
    private hasMoreNumberThanOperator = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        let countOperator = 0, countNumber = 0;
        for(let i = 0; i < expression.getSize(); i++) {
            const character = expression.get(i);
            if(this.isOperator(character)) countOperator++;
            if(this.isDigit(character)) countNumber++;
        }

        if(countNumber > countOperator) return true;
        return false;
    };
   
    private checkBasePeek = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        // Check base and top
        if (expression.peek() !== ')' && !this.isDigit(expression.peek()))
            return false;
        if (expression.base() !== '(' && !this.isDigit(expression.base()))
            return false;
        return true;
    };   

    private validateParenthesesExpression = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);

        // Check if the expression has balanced parentheses
        if (!this.checkBasePeek(inputExpression)) {
            return false;
        }

        // Check the order of parentheses
        const auxStack = new DynamicStack<string>();
        for (let i = 0; i <= expression.getSize() - 1; i++) {
            if (expression.get(i) === '(') {
                auxStack.push(expression.get(i)); // Empilhar o parêntese de abertura
            } else if (expression.get(i) === ')') {
                if (!auxStack.isEmpty() && auxStack.peek() === '(') {
                    auxStack.pop(); // Remover o parêntese de abertura correspondente
                } else {
                    return false; // Parêntese de fechamento sem correspondente de abertura
                }
            }
        } 

        // Check that all opening parentheses have a corresponding closing
        return auxStack.isEmpty();
    };

    // General verify
    public  checkSyntaxExpression = (inputExpression: string): boolean => {
        return  this.hasNumberAfterOperator(inputExpression) &&
                this.hasMoreNumberThanOperator(inputExpression) &&
                this.validateParenthesesExpression(inputExpression) &&
                this.numberHasOneDigit(inputExpression);
    };



}



    

   

    