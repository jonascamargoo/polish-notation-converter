import { ExpressionConverter } from "../services/ExpressionConverter.js";
import { ValidateExpression } from "../services/ValidateExpression.js";
import { ExpressionSolver } from "../services/ExpressionSolver.js";

export class ExpressionController {
 
    constructor(
        private converter = new ExpressionConverter(),
        private validator = new ValidateExpression(),
        private solver = new ExpressionSolver(validator),
        private infixNotation = true,
        private inputExpression = document.querySelector('#input-expression') as HTMLInputElement,
        private swapBtn = document.querySelector('#swap') as HTMLButtonElement,
        private solveBtn = document.querySelector('#solve') as HTMLBRElement,
        private printConverted = document.querySelector('#output-expression') as HTMLOutputElement,
        private printResult = document.querySelector('#result') as HTMLOutputElement,

    ) {}


    // Created a property named infixNotation. If it is set to true, I will proceed with solveFromInfix. If it is set to false, I will proceed with solveFromPostfix. However, for both cases, the final operation will always be performed in postfix form.

    
    public solve = (): void => {
        if(this.infixNotation) {
            this.solveFromInfix();
            return;
        }
        this.solveFromPostfix();
    }

    public swapNotation = (): void => {
        this.infixNotation = !this.infixNotation;
        this.inputExpression.focus();
        
    }

    private solveFromInfix = (): void => {
        const postfixExpression = this.converter.convertToPostfix(this.inputExpression.value);
        this.printConverted.textContent = postfixExpression;
        this.printResult.textContent = String(this.solver.solveExpression(postfixExpression));
    }

    private solveFromPostfix = ():void => {
        const infixExpression = this.converter.convertToInfix(this.inputExpression.value);
        this.printConverted.textContent = infixExpression;
        this.printResult.textContent =  String(this.solver.solveExpression(this.inputExpression.value));
    }

    
    
}