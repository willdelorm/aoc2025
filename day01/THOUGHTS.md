# Day 1 Thoughts

The Advent of Code always highlights the rustiness in my mathematical problem solving. I should really practice more often than every December...

## Part 1

Today's problem asks us to find the **password** to the secret entrance to the North Pole. Following a series of instructions to open a nearby safe, the password is the **number of times the dial on the safe points to 0 after any rotation**.

The dial on the safe has values ranging from 0 to 99, and starts at 50. To find the password:

- Spin the dial right or left for each instruction.
- Count the number of times the dial lands on 0.

### Pseudo-code:

- Read the input file and separate instructions by line.
- Set the intial position to 50 and the counter to 0.
- Convert each instruction to an integer:
    - If the direction is R, set it positive.
    - If the direction is L, set it negative.
- For each instruction:
    - Add the integer to the position.
    - Adjust the position to fall within 0 and 99, inclusive.
    - If the position is 0, increment the counter.
- Return the counter value.

### Complications

Turns out JavaScript is stupid! Unlike many other languages, the modulo operator for JavaScript does *not* process modulo values correctly for negative numbers. As I learned in [this article](https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm), performing a modulo operation should return a value within the range of 0 and the modulo value minus 1. For example, a modulo 4 operation should return a value between 0 and 3. JavaScript does not do this.

I ran into this issue first hand as I tried using modulo operations to keep the dial position within the bounds of 0 and 99. Unfortunately, I kept resulting in negative values. After plugging in the formula obtained from the above article, I was able to achieve the answer!

```js
const mod = (m, n) => ((m % n) + n) % n;
```

## Part 2

