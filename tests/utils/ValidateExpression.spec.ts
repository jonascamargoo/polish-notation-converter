// import { DynamicStack } from "../../src/utils/DynamicStack";
import { ValidateExpression } from "../../src/utils/ValidateExpression";

describe("ValidateExpression", () => {
  let validator: ValidateExpression;

  beforeEach(() => {
    validator = new ValidateExpression();
  });

  test("hasNumberAfterOperator", () => {
    expect(validator.hasNumberAfterOperator("2+3")).toBe(true);
    expect(validator.hasNumberAfterOperator("2++")).toBe(false);
    
  });

  test("isOperator", () => {
    expect(validator.isOperator("+")).toBe(true);
    expect(validator.isOperator("")).toBe(false);

    
    
  });

  // Adicione testes para os outros métodos aqui...

  test("checkSyntaxExpression", () => {
    expect(validator.checkSyntaxExpression("2+3")).toBe(true);
    expect(validator.checkSyntaxExpression("")).toBe(false);
    //expect(validator.validateParenthesesExpression("(3+2)")).toBe(true);


    
    // Adicione mais casos de teste aqui...
  });
  

  test("validateParenthesesExpression", () => {
    // Expressões válidas
    expect(validator.validateParenthesesExpression("()")).toBe(true);
    expect(validator.validateParenthesesExpression("(3+2)")).toBe(true);
    expect(validator.validateParenthesesExpression("((3+2)*5)")).toBe(true);

    // Expressões inválidas
    expect(validator.validateParenthesesExpression("()(")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2)*5)")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2)*(5")).toBe(false);
  });

  
});
