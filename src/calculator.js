#!/usr/bin/env node

'use strict';

// Supported operations:
// - addition (+, add, addition)
// - subtraction (-, subtract, subtraction)
// - multiplication (*, x, multiply, multiplication)
// - division (/, divide, division)

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
  ['division', 'divide']
]);

function printUsage(io = console) {
  io.error('Usage: node src/calculator.js <number1> <operation> <number2>');
  io.error('Operations: +, -, *, /, add, subtract, multiply, divide');
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
    default:
      throw new Error(`Unsupported operation: "${operation}".`);
  }
}

function main(args = process.argv.slice(2), io = console) {
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
  normalizeOperation,
  parseNumber,
  printUsage
};

if (require.main === module) {
  process.exitCode = main();
}
