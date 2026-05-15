const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
} = require("../calculator");

describe("addition", () => {
  test("adds two positive numbers", () => {
    expect(addition(2, 3)).toBe(5);
  });
  test("adds a positive and a negative number", () => {
    expect(addition(5, -3)).toBe(2);
  });
  test("adds two negative numbers", () => {
    expect(addition(-4, -6)).toBe(-10);
  });
  test("adds zero to a number", () => {
    expect(addition(7, 0)).toBe(7);
  });
  test("adds two zeros", () => {
    expect(addition(0, 0)).toBe(0);
  });
  test("adds decimal numbers", () => {
    expect(addition(1.5, 2.5)).toBeCloseTo(4.0);
  });
});

describe("subtraction", () => {
  test("subtracts two positive numbers", () => {
    expect(subtraction(5, 3)).toBe(2);
  });
  test("subtracts a larger number from a smaller one", () => {
    expect(subtraction(3, 5)).toBe(-2);
  });
  test("subtracts two negative numbers", () => {
    expect(subtraction(-4, -6)).toBe(2);
  });
  test("subtracts zero from a number", () => {
    expect(subtraction(7, 0)).toBe(7);
  });
  test("subtracts a number from zero", () => {
    expect(subtraction(0, 5)).toBe(-5);
  });
  test("subtracts decimal numbers", () => {
    expect(subtraction(3.5, 1.5)).toBeCloseTo(2.0);
  });
});

describe("multiplication", () => {
  test("multiplies two positive numbers", () => {
    expect(multiplication(3, 4)).toBe(12);
  });
  test("multiplies a positive and a negative number", () => {
    expect(multiplication(3, -4)).toBe(-12);
  });
  test("multiplies two negative numbers", () => {
    expect(multiplication(-3, -4)).toBe(12);
  });
  test("multiplies by zero", () => {
    expect(multiplication(5, 0)).toBe(0);
  });
  test("multiplies by one", () => {
    expect(multiplication(7, 1)).toBe(7);
  });
  test("multiplies decimal numbers", () => {
    expect(multiplication(2.5, 4)).toBeCloseTo(10.0);
  });
});

describe("division", () => {
  test("divides two positive numbers", () => {
    expect(division(10, 2)).toBe(5);
  });
  test("divides a positive by a negative number", () => {
    expect(division(10, -2)).toBe(-5);
  });
  test("divides two negative numbers", () => {
    expect(division(-10, -2)).toBe(5);
  });
  test("divides zero by a number", () => {
    expect(division(0, 5)).toBe(0);
  });
  test("divides resulting in a decimal", () => {
    expect(division(1, 4)).toBeCloseTo(0.25);
  });
  test("throws an error when dividing by zero", () => {
    expect(() => division(10, 0)).toThrow("Division by zero is not allowed");
  });
});

describe("modulo", () => {
  test("returns remainder for positive numbers", () => {
    expect(modulo(10, 3)).toBe(1);
  });
  test("returns zero when perfectly divisible", () => {
    expect(modulo(9, 3)).toBe(0);
  });
  test("returns remainder with a negative dividend", () => {
    expect(modulo(-10, 3)).toBe(-1);
  });
  test("returns remainder with a negative divisor", () => {
    expect(modulo(10, -3)).toBe(1);
  });
  test("returns zero when dividend is zero", () => {
    expect(modulo(0, 5)).toBe(0);
  });
  test("throws an error when modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed");
  });
});

describe("power", () => {
  test("raises a number to a positive exponent", () => {
    expect(power(2, 10)).toBe(1024);
  });
  test("raises a number to the power of zero", () => {
    expect(power(5, 0)).toBe(1);
  });
  test("raises a number to the power of one", () => {
    expect(power(7, 1)).toBe(7);
  });
  test("raises a number to a negative exponent", () => {
    expect(power(2, -2)).toBeCloseTo(0.25);
  });
  test("raises zero to a positive power", () => {
    expect(power(0, 5)).toBe(0);
  });
  test("raises a negative number to an even power", () => {
    expect(power(-3, 2)).toBe(9);
  });
  test("raises a negative number to an odd power", () => {
    expect(power(-3, 3)).toBe(-27);
  });
  test("raises a decimal base to an integer exponent", () => {
    expect(power(1.5, 2)).toBeCloseTo(2.25);
  });
});

describe("squareRoot", () => {
  test("returns the square root of a perfect square", () => {
    expect(squareRoot(9)).toBe(3);
  });
  test("returns the square root of zero", () => {
    expect(squareRoot(0)).toBe(0);
  });
  test("returns the square root of a non-perfect square", () => {
    expect(squareRoot(2)).toBeCloseTo(1.4142, 4);
  });
  test("returns the square root of a large number", () => {
    expect(squareRoot(10000)).toBe(100);
  });
  test("throws an error for a negative number", () => {
    expect(() => squareRoot(-1)).toThrow(
      "Square root of a negative number is not allowed"
    );
  });
  test("throws an error for a negative decimal", () => {
    expect(() => squareRoot(-0.5)).toThrow(
      "Square root of a negative number is not allowed"
    );
  });
});
