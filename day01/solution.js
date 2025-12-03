import { getInputData } from "../utils.js";

// Part 1
function countZeros(inputFile) {
  const rotations = getInputData(inputFile)
    .split("\n")
    .map((n) => n.trim());
  let position = 50;
  let counter = 0;

  for (let line of rotations) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));

    // Convert data to positive or negative integers
    if (direction == "R") {
      position = (position + distance) % 100;
    } else if (direction == "L") {
      position = (((position - distance) % 100) + 100) % 100;
    } else {
      throw new Error("Invalid instruction.");
    }

    // Increment if dial lands on zero
    if (position == 0) {
      counter++;
    }
  }

  return counter;
}

// Outputs
console.log("Test:", countZeros("test.txt"));
console.log("Part 1:", countZeros("input.txt"));

// Part 2
function countZeroClicks(inputFile) {
  const rotations = getInputData(inputFile)
    .split("\n")
    .map((n) => n.trim());
  let position = 50;
  let counter = 0;

  for (let line of rotations) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));

    // Find the base value to hit 0
    let base = 0;
    if (direction == "R") {
      base = ((-position % 100) + 100) % 100;
      if (base == 0) {
          base = 100;
        }
    } else if (direction == "L") {
        base = position % 100;
        if (base == 0) {
            base = 100;
        }
    } else {
      throw new Error("Invalid instruction.");
    }

    // Increment counter based on number of hits
    if (base <= distance) {
        const hits = 1 + Math.floor((distance - base) / 100);
        counter += hits;
    }

    // Update position
    if (direction == "R") {
      position = (position + distance) % 100;
    } else if (direction == "L") {
      position = (((position - distance) % 100) + 100) % 100;
    } else {
      throw new Error("Invalid instruction.");
    }
  }

  return counter;
}

console.log("Test:", countZeroClicks("test.txt"));
console.log("Part 2:", countZeroClicks("input.txt"));
