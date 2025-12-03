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
- For each instruction:
    - If the direction is R, set it positive.
    - If the direction is L, set it negative.
    - Add the distance to the position.
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

Turns out that the above answer is not the password. "Due to newer security protocols, please use **password method 0x434C49434B** until further notice."

In part 2, the password is actually the number of times the dial clicks on 0 during any rotation in addition to when it ends on 0. This complicates matters a bit further.

Since I do not want to step through every click in the input data (potentially millions of clicks that would take far too long), I need to mathematically solve how many times the dial clicks over 0. To do so:

- Find the base value where `(position + base) % 100 == 0`.
- If the base value is greater than the distance, that instruction does not click over 0.
- Otherwise, the instruction will click over 0 at `base` clicks and every 100 afterward.

### Pseudo-code:

- Read the input file and separate instructions by line.
- Set the intial position to 50 and the counter to 0.
- Convert each instruction to an integer:
    - If the direction is R, set it positive.
    - If the direction is L, set it negative.
- For each instruction:
    - If integer is positive:
        - Find the base value with `(-position) % 100`.
        - If base == 0, set it to 100.
    - Else if integer is negative:
        - Find the base value with `position % 100`.
        - If base == 0, set it to 100.
    - Else bad value.
    - If base is <= distance:
        - Add `1 + (distance - base) // 100` to counter.
    - Else don't add to counter.

    - Add the distance to the position.
    - Adjust the position to fall within 0 and 99, inclusive.
- Return the counter value.

### Reflection

The math of this took a lot of tinkering. First, I had to find how far the dial needed to go to hit the first 0. Once I had that, I could calculate the number of additional zeros based on the number of additional full rotations. As long as the base was less than or equal to the distance, the dial would hit zero at least once.