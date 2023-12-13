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

  test("isOperatorOrDigit", () => {
    expect(validator.isOperator("+")).toBe(true);
    expect(validator.isOperator("")).toBe(false);
    expect(validator.isOperator("=")).toBe(true);
    expect(validator.isDigit("7")).toBe(true);

  });
  

  test("validateParenthesesExpression", () => {
    expect(validator.validateParenthesesExpression("()")).toBe(true);
    expect(validator.validateParenthesesExpression("(3+2)")).toBe(true);
    expect(validator.validateParenthesesExpression("((3+2)*5)")).toBe(true);
    expect(validator.validateParenthesesExpression("()(")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2)*5)")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2)*(5")).toBe(false);
    expect(validator.validateParenthesesExpression("(3+2")).toBe(false);
  });

  test("checkSyntaxExpression", () => {
    expect(validator.checkSyntaxExpression("2+3")).toBe(true);
    expect(validator.checkSyntaxExpression("")).toBe(false);
    expect(validator.checkSyntaxExpression("(3+2)")).toBe(true);
    expect(validator.validateParenthesesExpression("((3+2)*5)")).toBe(true);
    
  });

  
});
