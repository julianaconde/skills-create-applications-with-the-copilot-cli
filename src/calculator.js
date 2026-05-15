#!/usr/bin/env node

'use strict';

// Supported operations:
// - addition (+, add, addition)
// - subtraction (-, subtract, subtraction)
// - multiplication (*, x, multiply, multiplication)
// - division (/, divide, division)
// - modulo (%, mod, modulo)
// - exponentiation (^, power, exponent, exponentiation)
// - square root (sqrt, square-root, squareroot)

const operationAliases = new Map([
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
  ['exponent', 'power'],
  ['exponentiation', 'power'],
  ['sqrt', 'squareRoot'],
  ['square-root', 'squareRoot'],
  ['squareroot', 'squareRoot']
]);

function printUsage(io = console) {
  io.error('Usage: node src/calculator.js <number1> <operation> <number2>');
  io.error('Usage: node src/calculator.js <operation> <number>');
  io.error(
    'Operations: +, -, *, /, %, ^, add, subtract, multiply, divide, modulo, power, sqrt'
  );
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }

  return parsedValue;
}

function normalizeOperation(operation) {
  return operationAliases.get(operation.toLowerCase());
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
}

function calculate(left, operation, right) {
  switch (operation) {
    case 'add':
      return left + right;
    case 'subtract':
      return left - right;
    case 'multiply':
      return left * right;
    case 'divide':
      if (right === 0) {
        throw new Error('Division by zero is not allowed.');
      }

      return left / right;
    case 'modulo':
      return modulo(left, right);
    case 'power':
      return power(left, right);
    case 'squareRoot':
      return squareRoot(left);
    default:
      throw new Error(`Unsupported operation: "${operation}".`);
  }
}

function main(args = process.argv.slice(2), io = console) {
  if (args.length === 2) {
    const [operationInput, valueInput] = args;
    const normalizedOperation = normalizeOperation(operationInput);

    if (normalizedOperation !== 'squareRoot') {
      printUsage(io);
      return 1;
    }

    try {
      const value = parseNumber(valueInput, 'number');
      const result = calculate(value, normalizedOperation);

      io.log(result);
      return 0;
    } catch (error) {
      io.error(error.message);
      return 1;
    }
  }

  const [leftInput, operationInput, rightInput] = args;

  if (!leftInput || !operationInput || !rightInput) {
    printUsage(io);
    return 1;
  }

  const normalizedOperation = normalizeOperation(operationInput);

  if (!normalizedOperation) {
    io.error(`Unsupported operation: "${operationInput}".`);
    printUsage(io);
    return 1;
  }

  try {
    const left = parseNumber(leftInput, 'first number');
    const right = parseNumber(rightInput, 'second number');
    const result = calculate(left, normalizedOperation, right);

    io.log(result);
    return 0;
  } catch (error) {
    io.error(error.message);
    return 1;
  }
}

module.exports = {
  calculate,
  main,
  modulo,
  normalizeOperation,
  parseNumber,
  power,
  printUsage,
  squareRoot
};

if (require.main === module) {
  process.exitCode = main();
}
