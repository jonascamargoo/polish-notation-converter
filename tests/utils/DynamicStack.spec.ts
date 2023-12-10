import { DynamicStack, Cell } from "../../src/utils/DynamicStack";

describe('DynamicStack', () => {
  let stack: DynamicStack<number>;

  beforeEach(() => {
    stack = new DynamicStack<number>();
  });

  test('push and pop', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(() => stack.pop()).toThrowError("Empity stack");
  });

  test('peek', () => {
    stack.push(42);
    expect(stack.peek()).toBe(42);
    expect(() => stack.pop()).not.toThrowError();
  });

  test('base', () => {
    stack.push(10);
    stack.push(20);
    stack.push(30);

    expect(stack.base()).toBe(10);
    stack.pop();
    expect(stack.base()).toBe(10);
    expect(stack.peek()).toBe(20);

  });

  test('get', () => {
    expect(() => stack.get(0)).toThrowError('Invalid position');
    
    stack.push(10);
    stack.push(20);
    stack.push(30);

    expect(stack.get(0)).toBe(10);
    expect(stack.get(1)).toBe(20);
    expect(stack.get(2)).toBe(30);
    expect(() => stack.get(3)).toThrowError('Invalid position');
  });

  test('print', () => {
    // Redirecting console output to verify console.log
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    // Empity stack
    stack.print();
    expect(consoleLogSpy).toHaveBeenCalledWith('Empity stack');

    // Not empity stack
    stack.push(42);
    stack.push(53);
    stack.print();
    expect(consoleLogSpy).toHaveBeenCalledWith(53);
    expect(consoleLogSpy).toHaveBeenCalledWith(42);

    // Restaurar o console.log original
    consoleLogSpy.mockRestore();
  });


});

// Você também pode escrever testes para a classe Cell se ela tiver lógica adicional
describe('Cell', () => {
  test('create Cell', () => {
    const cell = new Cell(42);
    expect(cell.item).toBe(42);
    expect(cell.next).toBeUndefined();
  });

  // Adicione mais testes conforme necessário
});
