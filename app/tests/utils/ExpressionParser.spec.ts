import { parser } from '../../src/utils/ExpressionParser';

describe('parser function', () => {
    it('simple expression', () => {
      expect(parser('2 + 3 * 4')).toBe('2 3 4 * +');
    });
  
    it('expression with parentheses', () => {
      expect(parser('(5 + 3) * 2')).toBe('5 3 + 2 *');
    });
  
});