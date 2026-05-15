/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   - addition       (+)  : adds two numbers
 *   - subtraction    (-)  : subtracts the second number from the first
 *   - multiplication (*)  : multiplies two numbers
 *   - division       (/)  : divides the first number by the second
 *   - modulo         (%)  : returns the remainder of dividing the first by the second
 *   - power          (**) : raises the first number to the power of the second
 *   - squareRoot    (sqrt): returns the square root of a number
 *
 * Usage:
 *   node src/calculator.js <number1> <operation> <number2>
 *   node src/calculator.js sqrt <number>
 *
 * Examples:
 *   node src/calculator.js 10 + 5
 *   node src/calculator.js 10 % 3
 *   node src/calculator.js 2 ** 8
 *   node src/calculator.js sqrt 16
 */

// Maps operation aliases to their canonical names
const operationAliases = new Map([
  ['+', 'add'],
  ['add', 'add'],
  ['addition', 'add'],
  ['-', 'subtract'],
  ['sub', 'subtract'],
  ['subtract', 'subtract'],
  ['subtraction', 'subtract'],
  ['*', 'multiply'],
  ['x', 'multiply'],
  ['mul', 'multiply'],
  ['multiply', 'multiply'],
  ['multiplication', 'multiply'],
  ['/', 'divide'],
  ['div', 'divide'],
  ['divide', 'divide'],
  ['division', 'divide'],
  ['%', 'modulo'],
  ['mod', 'modulo'],
  ['modulo', 'modulo'],
  ['**', 'power'],
  ['^', 'power'],
  ['pow', 'power'],
  ['power', 'power'],
  ['exponentiation', 'power'],
  ['sqrt', 'squareRoot'],
  ['squareroot', 'squareRoot'],
  ['squareRoot', 'squareRoot'],
  ['square root', 'squareRoot'],
]);

/**
 * Prints usage information to the given io object.
 * @param {object} io - Output interface (defaults to console)
 */
function printUsage(io = console) {
  io.log('Usage: node src/calculator.js <number1> <operation> <number2>');
  io.log('       node src/calculator.js sqrt <number>');
  io.log('');
  io.log('Operations:');
  io.log('  addition       (+)  : 10 + 5');
  io.log('  subtraction    (-)  : 10 - 5');
  io.log('  multiplication (*)  : 10 * 5');
  io.log('  division       (/)  : 10 / 5');
  io.log('  modulo         (%)  : 10 % 3');
  io.log('  power          (**) : 2 ** 8');
  io.log('  squareRoot  (sqrt)  : sqrt 16');
}

/**
 * Parses a string value into a finite number.
 * @param {string} value - The value to parse
 * @param {string} label - Label used in error messages
 * @returns {number} The parsed number
 * @throws {Error} If value is not a valid number
 */
function parseNumber(value, label) {
  if (value === '' || value === null || value === undefined) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }
  return num;
}

/**
 * Normalizes an operation string to its canonical form.
 * @param {string} op - The operation string (e.g. '+', 'add', 'addition')
 * @returns {string|null} Canonical operation name or null if unrecognized
 */
function normalizeOperation(op) {
  if (!op) return null;
  return operationAliases.get(op) || operationAliases.get(op.toLowerCase()) || null;
}

/**
 * Performs an arithmetic calculation.
 *
 * Binary operations require both left and right values:
 *   addition, subtraction, multiplication, division, modulo, power
 *
 * Unary operations require only the left value:
 *   squareRoot
 *
 * @param {number} left - The first operand
 * @param {string} operation - The operation name or alias
 * @param {number|null} right - The second operand (null for unary operations)
 * @returns {number} The result of the calculation
 * @throws {Error} On unsupported operations or invalid inputs (e.g. division by zero)
 */
function calculate(left, operation, right) {
  const op = normalizeOperation(operation);

  switch (op) {
    case 'add':
      // addition: returns the sum of left and right
      return left + right;

    case 'subtract':
      // subtraction: returns the difference of left minus right
      return left - right;

    case 'multiply':
      // multiplication: returns the product of left and right
      return left * right;

    case 'divide':
      // division: returns the quotient of left divided by right
      if (right === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return left / right;

    case 'modulo':
      // modulo: returns the remainder of left divided by right
      if (right === 0) {
        throw new Error('Modulo by zero is not allowed.');
      }
      return left % right;

    case 'power':
      // power (exponentiation): returns left raised to the power of right
      return Math.pow(left, right);

    case 'squareRoot':
      // squareRoot: returns the square root of left
      if (left < 0) {
        throw new Error('Square root of a negative number is not allowed.');
      }
      return Math.sqrt(left);

    default:
      throw new Error(`Unsupported operation: "${operation}".`);
  }
}

/**
 * Main CLI entry point. Parses arguments and runs the calculator.
 * @param {string[]} args - Command-line arguments (defaults to process.argv slice)
 * @param {object} io - Output interface (defaults to console)
 * @returns {number} Exit code (0 for success, 1 for error)
 */
function main(args = process.argv.slice(2), io = console) {
  if (args.length === 0) {
    printUsage(io);
    return 0;
  }

  try {
    // Support: sqrt <number>
    const firstNormalized = normalizeOperation(args[0]);
    if (firstNormalized === 'squareRoot') {
      if (args.length < 2) {
        io.error('Error: sqrt requires one number argument.');
        return 1;
      }
      const num = parseNumber(args[1], 'number');
      const result = calculate(num, 'squareRoot', null);
      io.log(`sqrt(${num}) = ${result}`);
      return 0;
    }

    // Support: <number1> <operation> <number2>
    if (args.length < 3) {
      io.error('Error: Expected <number1> <operation> <number2>.');
      printUsage(io);
      return 1;
    }

    const left = parseNumber(args[0], 'first number');
    const operation = args[1];
    const right = parseNumber(args[2], 'second number');
    const result = calculate(left, operation, right);
    io.log(`${left} ${operation} ${right} = ${result}`);
    return 0;
  } catch (err) {
    io.error(`Error: ${err.message}`);
    return 1;
  }
}

module.exports = { calculate, main, normalizeOperation, parseNumber, printUsage };

if (require.main === module) {
  process.exitCode = main();
}
