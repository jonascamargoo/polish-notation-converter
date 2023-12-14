import { parse } from '../../src/utils/ExpressionParser';

describe('parser function', () => {
    it('simple expression', () => {
      expect(parse('2 + 3 * 4')).toBe('2 3 4 * +');
    });
  
    it('expression with parentheses', () => {
      expect(parse('(5 + 3) * 2')).toBe('5 3 + 2 *');
    });
  
});