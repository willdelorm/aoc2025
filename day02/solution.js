import { getInputData } from "../utils.js";

// Part 1
function sumInvalidIds(inputFile) {
  const ranges = getInputData(inputFile).split(",");
  console.log(ranges);

  let sum = 0;

  for (let range of ranges) {
    const [firstId, lastId] = range.split("-");
    console.log(firstId, lastId);

    let numStart, numEnd;

    if (firstId.length % 2 == 0) {
      numStart = parseInt(firstId.slice(0, firstId.length / 2));
    } else {
      const nextLen = firstId.length + 1;
      numStart = parseInt("1".padEnd(nextLen / 2, "0"));
    }
    console.log(numStart);

    if (lastId.length % 2 == 0) {
      numEnd = parseInt(lastId.slice(0, lastId.length / 2));
    } else {
      const lastLen = lastId.length - 1;
      numEnd = parseInt("".padEnd(lastLen / 2, "9"));
    }
    console.log(numEnd);

    if (numEnd < numStart) {
      console.log("No invalid IDs");
      continue;
    }

    let numToCheck = numStart;
    while (numToCheck <= numEnd) {
        const numDoubled = parseInt(numToCheck + "" + numToCheck);
        console.log(numDoubled);

        if (numDoubled >= firstId && numDoubled <= lastId) {
            console.log(numDoubled, "less than", lastId)
            sum += numDoubled;
        }

        numToCheck++;
    }
  }

  return sum;
}

// Outputs
console.log("Test:", sumInvalidIds("test.txt") == 1227775554);
console.log("Part 1:", sumInvalidIds("input.txt"));

// Part 2
// function countZeroClicks(inputFile) {
//   const rotations = getInputData(inputFile)
//     .split("\n")
//     .map((n) => n.trim());
//   let position = 50;
//   let counter = 0;
// }

// console.log("Test:", countZeroClicks("test.txt"));
// console.log("Part 2:", countZeroClicks("input.txt"));
