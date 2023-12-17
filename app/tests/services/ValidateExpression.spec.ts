import { ValidateExpression } from "../../src/services/ValidateExpression";

describe("ValidateExpression", () => {
  let validator: ValidateExpression;

  beforeEach(() => {
    validator = new ValidateExpression();
  });

  it("checkSyntaxExpression", () => {
    expect(validator.checkSyntaxExpression("2+3")).toBe(true);
    expect(validator.checkSyntaxExpression("")).toBe(false);
    expect(validator.checkSyntaxExpression("(3+2)")).toBe(true);
    expect(validator.validateParenthesesExpression("((3+2)*5)")).toBe(true);
    
  });

  
});
