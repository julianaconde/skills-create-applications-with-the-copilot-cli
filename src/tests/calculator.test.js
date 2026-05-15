'use strict';

const { calculate, main, normalizeOperation, parseNumber, printUsage } = require('../calculator');

// ─── normalizeOperation ───────────────────────────────────────────────────────

describe('normalizeOperation', () => {
  test('returns null for empty string', () => {
    expect(normalizeOperation('')).toBeNull();
  });

  test('returns null for null/undefined', () => {
    expect(normalizeOperation(null)).toBeNull();
    expect(normalizeOperation(undefined)).toBeNull();
  });

  test('returns null for unrecognized operation', () => {
    expect(normalizeOperation('unknown')).toBeNull();
  });

  // addition aliases
  test.each([['+'], ['add'], ['addition']])(
    'recognizes addition alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('add')
  );

  // subtraction aliases
  test.each([['-'], ['sub'], ['subtract'], ['subtraction']])(
    'recognizes subtraction alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('subtract')
  );

  // multiplication aliases
  test.each([['*'], ['x'], ['mul'], ['multiply'], ['multiplication']])(
    'recognizes multiplication alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('multiply')
  );

  // division aliases
  test.each([['/'], ['div'], ['divide'], ['division']])(
    'recognizes division alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('divide')
  );

  // modulo aliases
  test.each([['%'], ['mod'], ['modulo']])(
    'recognizes modulo alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('modulo')
  );

  // power aliases
  test.each([['**'], ['^'], ['pow'], ['power'], ['exponentiation']])(
    'recognizes power alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('power')
  );

  // squareRoot aliases
  test.each([['sqrt'], ['squareroot'], ['squareRoot'], ['square root']])(
    'recognizes squareRoot alias "%s"',
    (alias) => expect(normalizeOperation(alias)).toBe('squareRoot')
  );
});

// ─── parseNumber ─────────────────────────────────────────────────────────────

describe('parseNumber', () => {
  test('parses integer string', () => {
    expect(parseNumber('42', 'num')).toBe(42);
  });

  test('parses float string', () => {
    expect(parseNumber('3.14', 'num')).toBeCloseTo(3.14);
  });

  test('parses negative number', () => {
    expect(parseNumber('-5', 'num')).toBe(-5);
  });

  test('parses zero', () => {
    expect(parseNumber('0', 'num')).toBe(0);
  });

  test('throws for non-numeric string', () => {
    expect(() => parseNumber('foo', 'first number')).toThrow(
      'Invalid first number: "foo" is not a number.'
    );
  });

  test('throws for empty string', () => {
    expect(() => parseNumber('', 'value')).toThrow('is not a number');
  });
});

// ─── calculate — basic operations ────────────────────────────────────────────

describe('calculate — addition', () => {
  test('adds two positive numbers', () => expect(calculate(2, '+', 3)).toBe(5));
  test('adds negative and positive', () => expect(calculate(-4, '+', 7)).toBe(3));
  test('adds using word alias', () => expect(calculate(10, 'addition', 5)).toBe(15));
  test('2 + 3 = 5 (example from image)', () => expect(calculate(2, '+', 3)).toBe(5));
});

describe('calculate — subtraction', () => {
  test('subtracts two numbers', () => expect(calculate(10, '-', 4)).toBe(6));
  test('results in negative', () => expect(calculate(3, '-', 7)).toBe(-4));
  test('subtracts using word alias', () => expect(calculate(10, 'subtraction', 4)).toBe(6));
  test('10 - 4 = 6 (example from image)', () => expect(calculate(10, '-', 4)).toBe(6));
});

describe('calculate — multiplication', () => {
  test('multiplies two numbers', () => expect(calculate(45, '*', 2)).toBe(90));
  test('multiplies by zero', () => expect(calculate(5, '*', 0)).toBe(0));
  test('multiplies using word alias', () => expect(calculate(45, 'multiplication', 2)).toBe(90));
  test('45 * 2 = 90 (example from image)', () => expect(calculate(45, '*', 2)).toBe(90));
});

describe('calculate — division', () => {
  test('divides two numbers', () => expect(calculate(20, '/', 5)).toBe(4));
  test('returns decimal result', () => expect(calculate(7, '/', 2)).toBe(3.5));
  test('divides using word alias', () => expect(calculate(20, 'division', 5)).toBe(4));
  test('20 / 5 = 4 (example from image)', () => expect(calculate(20, '/', 5)).toBe(4));

  test('throws for division by zero', () => {
    expect(() => calculate(10, '/', 0)).toThrow('Division by zero is not allowed.');
  });
});

// ─── calculate — extended operations ─────────────────────────────────────────

describe('calculate — modulo', () => {
  test('returns remainder of 10 % 3', () => expect(calculate(10, '%', 3)).toBe(1));
  test('returns 0 when evenly divisible', () => expect(calculate(12, '%', 4)).toBe(0));
  test('works with word alias "modulo"', () => expect(calculate(17, 'modulo', 5)).toBe(2));
  test('works with alias "mod"', () => expect(calculate(9, 'mod', 2)).toBe(1));

  test('throws for modulo by zero', () => {
    expect(() => calculate(10, '%', 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('calculate — power (exponentiation)', () => {
  test('raises to power: 2 ** 8 = 256', () => expect(calculate(2, '**', 8)).toBe(256));
  test('power of zero is 1', () => expect(calculate(5, '**', 0)).toBe(1));
  test('power of 1 is base', () => expect(calculate(7, '**', 1)).toBe(7));
  test('works with word alias "power"', () => expect(calculate(3, 'power', 3)).toBe(27));
  test('works with alias "exponentiation"', () => expect(calculate(2, 'exponentiation', 10)).toBe(1024));
  test('works with alias "^"', () => expect(calculate(4, '^', 2)).toBe(16));
  test('fractional exponent gives root', () => expect(calculate(9, '**', 0.5)).toBeCloseTo(3));
});

describe('calculate — squareRoot', () => {
  test('square root of 16 is 4', () => expect(calculate(16, 'sqrt', null)).toBe(4));
  test('square root of 25 is 5', () => expect(calculate(25, 'sqrt', null)).toBe(5));
  test('square root of 2 is irrational', () =>
    expect(calculate(2, 'sqrt', null)).toBeCloseTo(1.4142135));
  test('square root of 0 is 0', () => expect(calculate(0, 'sqrt', null)).toBe(0));
  test('works with alias "squareRoot"', () => expect(calculate(9, 'squareRoot', null)).toBe(3));

  test('throws for square root of a negative number', () => {
    expect(() => calculate(-1, 'sqrt', null)).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });

  test('throws for square root of -9', () => {
    expect(() => calculate(-9, 'squareRoot', null)).toThrow(
      'Square root of a negative number is not allowed.'
    );
  });
});

describe('calculate — unsupported operation', () => {
  test('throws for unknown operation', () => {
    expect(() => calculate(1, 'unknown', 2)).toThrow('Unsupported operation: "unknown".');
  });
});

// ─── main (CLI) ───────────────────────────────────────────────────────────────

describe('main — basic usage', () => {
  let mockIo;

  beforeEach(() => {
    mockIo = { log: jest.fn(), error: jest.fn() };
  });

  test('prints usage and returns 0 when called with no args', () => {
    const code = main([], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalled();
  });

  test('returns 1 and prints error for too few args', () => {
    const code = main(['10', '+'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalled();
  });

  test('addition: 2 + 3 = 5', () => {
    const code = main(['2', '+', '3'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('2 + 3 = 5');
  });

  test('subtraction: 10 - 4 = 6', () => {
    const code = main(['10', '-', '4'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('10 - 4 = 6');
  });

  test('multiplication: 45 * 2 = 90', () => {
    const code = main(['45', '*', '2'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('45 * 2 = 90');
  });

  test('division: 20 / 5 = 4', () => {
    const code = main(['20', '/', '5'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('20 / 5 = 4');
  });
});

describe('main — extended operations', () => {
  let mockIo;

  beforeEach(() => {
    mockIo = { log: jest.fn(), error: jest.fn() };
  });

  test('modulo: 10 % 3 = 1', () => {
    const code = main(['10', '%', '3'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('10 % 3 = 1');
  });

  test('power: 2 ** 8 = 256', () => {
    const code = main(['2', '**', '8'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('2 ** 8 = 256');
  });

  test('square root: sqrt 16 = 4', () => {
    const code = main(['sqrt', '16'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('sqrt(16) = 4');
  });

  test('square root: sqrt 25 = 5', () => {
    const code = main(['sqrt', '25'], mockIo);
    expect(code).toBe(0);
    expect(mockIo.log).toHaveBeenCalledWith('sqrt(25) = 5');
  });

  test('returns 1 for square root missing arg', () => {
    const code = main(['sqrt'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalled();
  });
});

describe('main — error handling', () => {
  let mockIo;

  beforeEach(() => {
    mockIo = { log: jest.fn(), error: jest.fn() };
  });

  test('returns 1 for invalid first number', () => {
    const code = main(['foo', '+', '3'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid first number')
    );
  });

  test('returns 1 for invalid second number', () => {
    const code = main(['10', '+', 'bar'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Invalid second number')
    );
  });

  test('returns 1 for division by zero', () => {
    const code = main(['10', '/', '0'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Division by zero')
    );
  });

  test('returns 1 for modulo by zero', () => {
    const code = main(['10', '%', '0'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Modulo by zero')
    );
  });

  test('returns 1 for square root of negative number', () => {
    const code = main(['sqrt', '-4'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Square root of a negative number')
    );
  });

  test('returns 1 for unsupported operation', () => {
    const code = main(['10', 'blah', '3'], mockIo);
    expect(code).toBe(1);
    expect(mockIo.error).toHaveBeenCalledWith(
      expect.stringContaining('Unsupported operation')
    );
  });
});
