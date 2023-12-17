import { ExpressionParser } from '../../src/services/ExpressionParser';

describe('ExpressionParser class', () => {
  it('should parse a simple expression with digits and parentheses', () => {
    const expressionParser = new ExpressionParser();
    const result = expressionParser.parse('(3 + 4) * 5');
    expect(result).toEqual('3 4 + 5 *');
  });

  it('should handle an expression with operators and parentheses', () => {
    const expressionParser = new ExpressionParser();
    const result = expressionParser.parse('(2 + 3) * (4 - 1)');
    expect(result).toEqual('2 3 + 4 1 - *');
  });

  it('should handle an expression with multiple operators and parentheses', () => {
    const expressionParser = new ExpressionParser();
    const result = expressionParser.parse('(1 + 2) * 3 ^ 2 - 4');
    expect(result).toEqual('1 2 + 3 2 ^ * 4 -');
  });

  it('should handle an empty expression', () => {
    const expressionParser = new ExpressionParser();
    expect(() => expressionParser.parse('')).toThrow();
  });

  it('should handle an expression with digits and no parentheses or operators', () => {
    const expressionParser = new ExpressionParser();
    expect(() => expressionParser.parse('123456')).toThrow();
  });

  it('should handle an expression with only one type of token (operators)', () => {
    const expressionParser = new ExpressionParser();
    expect(() => expressionParser.parse('+-*/')).toThrow();
  });
});

