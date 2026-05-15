/**
 * Calculator module providing basic and advanced math operations.
 * Supported operations:
 *   - addition
 *   - subtraction
 *   - multiplication
 *   - division
 *   - modulo
 *   - power (exponentiation)
 *   - squareRoot
 */

/**
 * Returns the sum of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function addition(a, b) {
  return a + b;
}

/**
 * Returns the difference of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function subtraction(a, b) {
  return a - b;
}

/**
 * Returns the product of a and b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiplication(a, b) {
  return a * b;
}

/**
 * Returns the quotient of a divided by b.
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

/**
 * Returns the remainder of a divided by b (modulo operation).
 * Throws an error if b is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed");
  }
  return a % b;
}

/**
 * Returns base raised to the power of exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number}
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Returns the square root of n.
 * Throws an error if n is negative.
 * @param {number} n
 * @returns {number}
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed");
  }
  return Math.sqrt(n);
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
};
