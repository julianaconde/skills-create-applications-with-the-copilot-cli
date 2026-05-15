'use strict';

const {
  calculate,
  main,
  modulo,
  normalizeOperation,
  parseNumber,
  power,
  squareRoot
} = require('../calculator');

describe('normalizeOperation', () => {
  test.each([
    ['+', 'add'],
    ['add', 'add'],
    ['addition', 'add'],
    ['-', 'subtract'],
    ['subtract', 'subtract'],
    ['subtraction', 'subtract'],
    ['*', 'multiply'],
    ['x', 'multiply'],
    ['multiply', 'multiply'],
    ['multiplication', 'multiply'],
    ['/', 'divide'],
    ['divide', 'divide'],
    ['division', 'divide'],
    ['%', 'modulo'],
    ['mod', 'modulo'],
    ['modulo', 'modulo'],
    ['^', 'power'],
    ['power', 'power'],
    ['exponentiation', 'power'],
    ['sqrt', 'squareRoot'],
    ['square-root', 'squareRoot'],
    ['squareroot', 'squareRoot']
  ])('maps %s to %s', (input, expected) => {
    expect(normalizeOperation(input)).toBe(expected);
  });

  test('returns undefined for an unsupported operation', () => {
    expect(normalizeOperation('noop')).toBeUndefined();
  });
});

describe('parseNumber', () => {
  test('parses integer input', () => {
    expect(parseNumber('42', 'test number')).toBe(42);
  });

  test('parses decimal input', () => {
    expect(parseNumber('3.14', 'test number')).toBeCloseTo(3.14);
  });

  test('throws for invalid input', () => {
    expect(() => parseNumber('abc', 'test number')).toThrow(
      'Invalid test number: "abc" is not a number.'
    );
  });
});

describe('calculate', () => {
  test('adds numbers', () => {
    expect(calculate(2, 'add', 3)).toBe(5);
  });

  test('subtracts numbers', () => {
    expect(calculate(10, 'subtract', 4)).toBe(6);
  });

  test('multiplies numbers', () => {
    expect(calculate(45, 'multiply', 2)).toBe(90);
  });

  test('divides numbers', () => {
    expect(calculate(20, 'divide', 5)).toBe(4);
  });

  test('supports decimal division', () => {
    expect(calculate(7.5, 'divide', 2.5)).toBe(3);
  });

  test('returns the modulo', () => {
    expect(calculate(10, 'modulo', 3)).toBe(1);
  });

  test('raises a number to a power', () => {
    expect(calculate(2, 'power', 4)).toBe(16);
  });

  test('returns the square root', () => {
    expect(calculate(81, 'squareRoot')).toBe(9);
  });

  test('throws for division by zero', () => {
    expect(() => calculate(20, 'divide', 0)).toThrow(
      'Division by zero is not allowed.'
    );
  });

  test('throws for modulo by zero', () => {
    expect(() => calculate(20, 'modulo', 0)).toThrow(
      'Modulo by zero is not allowed.'
    );
  });

  test('throws for square root of a negative number', () => {
    expect(() => calculate(-9, 'squareRoot')).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });

  test('throws for unsupported operations', () => {
    expect(() => calculate(1, 'unsupported', 2)).toThrow(
      'Unsupported operation: "unsupported".'
    );
  });
});

describe('operation helpers', () => {
  test('modulo returns the remainder', () => {
    expect(modulo(17, 5)).toBe(2);
  });

  test('power returns the exponentiation result', () => {
    expect(power(3, 3)).toBe(27);
  });

  test('squareRoot returns the square root for positive numbers', () => {
    expect(squareRoot(25)).toBe(5);
  });

  test('squareRoot throws for negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });
});

describe('main', () => {
  function createIo() {
    return {
      error: jest.fn(),
      log: jest.fn()
    };
  }

  test('runs the image addition example', () => {
    const io = createIo();

    expect(main(['2', '+', '3'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(5);
  });

  test('runs the image subtraction example', () => {
    const io = createIo();

    expect(main(['10', '-', '4'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(6);
  });

  test('runs the image multiplication example', () => {
    const io = createIo();

    expect(main(['45', '*', '2'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(90);
  });

  test('runs the image division example', () => {
    const io = createIo();

    expect(main(['20', '/', '5'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(4);
  });

  test('runs the modulo example', () => {
    const io = createIo();

    expect(main(['10', '%', '3'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(1);
  });

  test('runs the power example', () => {
    const io = createIo();

    expect(main(['2', '^', '4'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(16);
  });

  test('runs the square root example', () => {
    const io = createIo();

    expect(main(['sqrt', '49'], io)).toBe(0);
    expect(io.log).toHaveBeenCalledWith(7);
  });

  test('returns an error for missing arguments', () => {
    const io = createIo();

    expect(main(['2', '+'], io)).toBe(1);
    expect(io.error).toHaveBeenNthCalledWith(
      1,
      'Usage: node src/calculator.js <number1> <operation> <number2>'
    );
    expect(io.error).toHaveBeenNthCalledWith(
      2,
      'Usage: node src/calculator.js <operation> <number>'
    );
    expect(io.error).toHaveBeenNthCalledWith(
      3,
      'Operations: +, -, *, /, %, ^, add, subtract, multiply, divide, modulo, power, sqrt'
    );
  });

  test('returns an error for unsupported operations', () => {
    const io = createIo();

    expect(main(['2', 'noop', '3'], io)).toBe(1);
    expect(io.error).toHaveBeenNthCalledWith(1, 'Unsupported operation: "noop".');
  });

  test('returns an error for invalid numbers', () => {
    const io = createIo();

    expect(main(['two', '+', '3'], io)).toBe(1);
    expect(io.error).toHaveBeenCalledWith(
      'Invalid first number: "two" is not a number.'
    );
  });

  test('returns an error for division by zero', () => {
    const io = createIo();

    expect(main(['20', '/', '0'], io)).toBe(1);
    expect(io.error).toHaveBeenCalledWith('Division by zero is not allowed.');
  });

  test('returns an error for square root of a negative number', () => {
    const io = createIo();

    expect(main(['sqrt', '-9'], io)).toBe(1);
    expect(io.error).toHaveBeenCalledWith(
      'Square root of a negative number is not allowed.'
    );
  });
});
