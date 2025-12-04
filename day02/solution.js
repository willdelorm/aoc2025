import { getInputData } from "../utils.js";

// Part 1
function sumInvalidIds(inputFile) {
  const ranges = getInputData(inputFile).split(",");
  let sum = 0;

  for (let range of ranges) {
    const [firstId, lastId] = range.split("-");
    let numStart, numEnd;

    // Set start number
    if (firstId.length % 2 == 0) {
      numStart = parseInt(firstId.slice(0, firstId.length / 2));
    } else {
      const nextLen = firstId.length + 1;
      numStart = parseInt("1".padEnd(nextLen / 2, "0"));
    }

    // Set end number
    if (lastId.length % 2 == 0) {
      numEnd = parseInt(lastId.slice(0, lastId.length / 2));
    } else {
      const lastLen = lastId.length - 1;
      numEnd = parseInt("".padEnd(lastLen / 2, "9"));
    }

    // Check if each num repeated is in range
    let numToCheck = numStart;
    while (numToCheck <= numEnd) {
      const numDoubled = parseInt(numToCheck + "" + numToCheck);

      if (numDoubled >= firstId && numDoubled <= lastId) {
        sum += numDoubled;
      }

      numToCheck++;
    }
  }

  return sum;
}

// Outputs
console.log("Test:", sumInvalidIds("test.txt") == 1227775554);
console.log("Part 1:", sumInvalidIds("input.txt") == 16793817782);

// Part 2
function sumMoreInvalidIds(inputFile) {
  const ranges = getInputData(inputFile).split(",");
  let sum = 0;

  for (let range of ranges) {
    if (!range.trim()) continue;
    const [first, last] = range.split("-").map((n) => parseInt(n));

    // Check each number in the range
    for (let num = first; num <= last; num++) {
      let sNum = num.toString();
      let nLen = sNum.length;

      // Determine if num is invalid
      let isInvalidNum = false;
      for (let i = 1; i < Math.floor(nLen / 2) + 1; i++) {
        if (nLen % i != 0) continue;

        let k = Math.floor(nLen / i);
        if (k < 2) continue;

        let block = sNum.slice(0, i);
        if (block[0] == "0") continue;

        if (block.repeat(k) == sNum) {
          isInvalidNum = true;
        }
      }

      if (isInvalidNum) {
        sum += num;
      }
    }
  }

  return sum;
}

// Outputs
console.log("Test:", sumMoreInvalidIds("test.txt") == 4174379265);
console.log("Part 2:", sumMoreInvalidIds("input.txt") == 27469417404);
