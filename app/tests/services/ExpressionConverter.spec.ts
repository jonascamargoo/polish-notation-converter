import { ExpressionConverter } from '../../src/services/ExpressionConverter';

describe('ExpressionConverter class', () => {
  it('should parse a simple expression with digits and parentheses', () => {
    const expressionConverter = new ExpressionConverter();
    const result = expressionConverter.convertToPostfix('(3 + 4) * 5');
    expect(result).toEqual('3 4 + 5 *');
  });

  it('should handle an expression with operators and parentheses', () => {
    const expressionConverter = new ExpressionConverter();
    const result = expressionConverter.convertToPostfix('(2 + 3) * (4 - 1)');
    expect(result).toEqual('2 3 + 4 1 - *');
  });

  it('should handle an expression with multiple operators and parentheses', () => {
    const expressionConverter = new ExpressionConverter();
    const result = expressionConverter.convertToPostfix('(1 + 2) * 3 ^ 2 - 4');
    expect(result).toEqual('1 2 + 3 2 ^ * 4 -');
  });

  it('should handle an empty expression', () => {
    const expressionConverter = new ExpressionConverter();
    expect(() => expressionConverter.convertToPostfix('')).toThrow();
  });

  it('should handle an expression with digits and no parentheses or operators', () => {
    const expressionConverter = new ExpressionConverter();
    expect(() => expressionConverter.convertToPostfix('123456')).toThrow();
  });

  it('should handle an expression with only one type of token (operators)', () => {
    const expressionConverter = new ExpressionConverter();
    expect(() => expressionConverter.convertToPostfix('+-*/')).toThrow();
  });

  // it('should convert a simple postfix expression with digits and parentheses to infix', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   const result = expressionConverter.convertToInfix('3 4 + 5 *');
  //   expect(result).toEqual('(3 + 4) * 5');
  // });

  // it('should convert an expression with operators and parentheses to infix', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   const result = expressionConverter.convertToInfix('2 3 + 4 1 - *');
  //   expect(result).toEqual('(2 + 3) * (4 - 1)');
  // });

  // it('should convert an expression with multiple operators and parentheses to infix', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   const result = expressionConverter.convertToInfix('1 2 + 3 2 ^ * 4 -');
  //   expect(result).toEqual('(1 + 2) * 3 ^ 2 - 4');
  // });

  // it('should handle an empty expression', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   expect(() => expressionConverter.convertToInfix('')).toThrow();
  // });

  // it('should handle an expression with digits and no parentheses or operators', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   expect(() => expressionConverter.convertToInfix('123456')).toThrow();
  // });

  // it('should handle an expression with only one type of token (operators)', () => {
  //   const expressionConverter = new ExpressionConverter();
  //   expect(() => expressionConverter.convertToInfix('+-*/')).toThrow();
  // });
});

