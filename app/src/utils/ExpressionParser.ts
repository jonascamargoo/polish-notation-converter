import { DynamicStack } from './DynamicStack';
import { ValidateExpression } from './ValidateExpression'

// The auxStack is used to temporarily store operators and parentheses while the expression is being traversed and characters are being processed. It assists in determining the correct order of operators and in handling parentheses during the conversion process
export const parser = (inputExpression: string): string => {
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

        //  ele vai eliminar os itens da pilha auxiliar e ira adicionar um por um dentro da expressao pos-fixa, exceto os (. Ou seja, ele busca os digitos e operadores e vai adicionando em postfixExpression
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

                    if(validator.isOperator(charAux)) {// aqui eh analisada a ordem de prioridade dos operadores

                        if(validator.checkPriority(current, charAux)) { //o item de maior prioridade eh adicionado a pilha auxilar, a fim de ser adicionado a postfixExpression posteriormente
                            auxStack.push(charAux);
                            break;
                        } else {
                            postfixExpression += charAux + ' ';
                            

                        }
                    }
                    
                }
                auxStack.push(current); //aqui ocorre a substituicao do item de maior prioridade pelo de menor
            }
            
        }
    }    

    // aqui os itens que sobraram na pilha auxiliar sao adicionados
    while(!auxStack.isEmpty())
        postfixExpression += auxStack.pop() + ' ';

    return postfixExpression.trim();

}




