import { DynamicStack } from "./DynamicStack";

export class ValidateExpression {


    hasNumberAfterOperator = (inputExpression: string): boolean => {
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
    

    isOperator = (character: string): boolean => {
        return  character == '+' ||
                character == '-' ||
                character == '*' ||
                character == '/' ||
                character == '^';

    };

    isDigit = (character: string): boolean => {
        return !isNaN(parseInt(character));
    };

    isParenthesis = (character: string): boolean => {
        return  character == '(' ||
                character == ')';
    };


    getPrecedence = (operator: string): number => {
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
    numberHasOneDigit = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
        for (let i = 1; i < expression.getSize() - 1; i++) {
            if(
                this.isDigit(expression.get(i)) &&
                this.isDigit(expression.get(i - 1))
                
            ) return false;
        }
        return true;

    };

    checkPriority = (operator1: string, operator2: string): boolean => {
        return this.getPrecedence(operator1) > this.getPrecedence(operator2);
    };

    // checks if the number of operators is greater than the number of numbers
    hasMoreNumberThanOperator = (inputExpression: string): boolean => {
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


    // 
    checkParentheses = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);
    
        // Analisando os extremos da pilha
        if (expression.peek() !== ')' && !this.isDigit(expression.peek())) {
            return false;
        }
    
        if (expression.base() !== '(' && !this.isDigit(expression.base())) {
            return false;
        }

        // Analisando as posições intermediárias
        for (let i = 1; i <= expression.getSize() - 2; i++) {
            if (expression.get(i) === '(') {
                if (expression.get(i - 1) !== '(' && !this.isDigit(expression.get(i - 1)))
                    return false;
                if (expression.get(expression.getSize()-1) == ')')
                    return false;
            }
    
            if (expression.get(i) === ')') {
                if(expression.get(1) == ')')
                    return false;
                if (expression.get(i + 1) !== ')' && !this.isDigit(expression.get(i + 1))) {
                    return false;
                }
    
                if (expression.get(i - 1) !== ')' && !this.isOperator(expression.get(i - 1))) {
                    return false;
                }
            } 

            
        }

        return true;
    };

   

    validateParenthesesExpression = (inputExpression: string): boolean => {
        const expression = DynamicStack.splitString(inputExpression);

        // Verificar se a expressão tem parênteses balanceados
        if (!this.checkParentheses(inputExpression)) {
            return false;
        }

        // Checar a ordem dos parênteses
        const auxStack = new DynamicStack<string>();
        for (let i = expression.getSize() - 1; i >= 0; i--) {
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

        // Verificar se todos os parênteses de abertura têm correspondente de fechamento
        return auxStack.isEmpty();
    };

    // verificacao geral
    checkSyntaxExpression = (inputExpression: string): boolean => {
        return  this.hasNumberAfterOperator(inputExpression) &&
                this.hasMoreNumberThanOperator(inputExpression) &&
                this.validateParenthesesExpression(inputExpression) &&
                this.numberHasOneDigit(inputExpression);
    };



}



    

   

    