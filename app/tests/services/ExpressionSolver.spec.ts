import { ExpressionSolver } from '../../src/services/ExpressionSolver';
import { ValidateExpression } from '../../src/services/ValidateExpression';

describe('ExpressionSolver class', () => {
  let solver: ExpressionSolver;
  let validExpression: ValidateExpression;

  beforeEach(() => {
    validExpression = new ValidateExpression();
    solver = new ExpressionSolver(validExpression);
  });

  it('should solve a simple postfix expression', () => {
    const result = solver.solveExpression('3 4 +');
    expect(result).toEqual(7);
  });

  it('should solve expressions with multiple operations', () => {
    const result = solver.solveExpression('3 4 + 5 *');
    expect(result).toEqual(35);
  });

  it('should handle expressions with different operators', () => {
    const result = solver.solveExpression('2 3 4 + 2 ^ *');
    expect(result).toEqual(98);
  });

});
