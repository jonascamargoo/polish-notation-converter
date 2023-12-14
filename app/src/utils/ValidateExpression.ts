import { DynamicStack } from "./DynamicStack";

export class ValidateExpression {

    public validate(inputExpression: string): DynamicStack<string> {
        if(!this.checkSyntaxExpression(inputExpression))
            throw new Error();
        return DynamicStack.splitString(inputExpression);
         
    }

    public isOperator = (character: string): boolean => {
        return  character == '+' ||
                character == '-' ||
                character == '*' ||
                character == '/' ||
                character == '=' ||
                character == '^';
    };

    public isDigit = (character: string): boolean => {
        return !isNaN(parseInt(character));
    };

    public isParenthesis = (character: string): boolean => {
        return  character == '(' ||
                character == ')';
    };

    public getPrecedence = (operator: string): number => {
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

    public checkPriority(operator1: string, operator2: string): boolean {
        return  this.getPrecedence(operator1) > this.getPrecedence(operator2);

    }


    public checkSyntaxExpression = (inputExpression: string): boolean => {
        return  this.hasNumberAfterOperator(inputExpression) &&
                this.hasMoreNumberThanOperator(inputExpression) &&
                this.validateParenthesesExpression(inputExpression) &&
                this.numberHasOneDigit(inputExpression);
    };

    public hasNumberAfterOperator = (inputExpression: string): boolean => {
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


    public numberHasOneDigit = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        for (let i = 1; i < expression.getSize() - 1; i++) {
            if(
                this.isDigit(expression.get(i)) &&
                this.isDigit(expression.get(i - 1))
            ) return false;
        }
        return true;
    };

    public hasMoreNumberThanOperator = (inputExpression: string): boolean => {
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

    public checkBasePeek = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        // Check base and top
        if (expression.peek() !== ')' && !this.isDigit(expression.peek()))
            return false;
        if (expression.base() !== '(' && !this.isDigit(expression.base()))
            return false;
        return true;
    };

    public validateParenthesesExpression = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);

        if (!this.checkBasePeek(inputExpression)) {
            return false;
        }

        const auxStack = new DynamicStack<string>();
        for (let i = 0; i <= expression.getSize() - 1; i++) {
            if (expression.get(i) === '(') {
                auxStack.push(expression.get(i)); 
            } else if (expression.get(i) === ')') {
                if (!auxStack.isEmpty() && auxStack.peek() === '(') {
                    auxStack.pop(); 
                } else {
                    return false;
                }
            }
        } 

        // Check that all opening parentheses have a corresponding closing
        return auxStack.isEmpty();
    };
}
