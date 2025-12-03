# --- Day 2: Gift Shop ---

Fix the gift shop computer. A young Elf added invalid product IDs. The input contains ID ranges that need to be checked.

Ranges are separated by commas, and contain the first ID and last ID separated by a dash.

## Part 1

IDs are invalid if it:

- Is made up of some sequence of digits repeated twice.
  - If ID is a single digit, continue.
  - If ID is an odd number of digits, continue.
  - If ID is an even number of digits, check.
    - Split ID in half.
    - If two halves are not equal, continue.
    - If two halves are equal, add to sum.

The answer is the sum of the invalid IDs.

To minimize on number of values to check, take the first halves of the first and last ID in a range.

Simple Example: 40 - 99

- Half of 40 is 4. Half of 99 is 9.
- Double 4 to 44. If within range, add to sum.
- Double 5 to 55. If within range, add to sum.
- Double 6 to 66. If within range, add to sum.
- Double 7 to 77. If within range, add to sum.
- Double 8 to 88. If within range, add to sum.
- Double 9 to 99. If within range, add to sum.

Example: 90 - 110

- Half of 90 is 9.
- Double 9 to 99. 99 is within range.
- Double 10 to 1010. Not in range.

Example: 998 - 1012

- 998 is odd. Next even number is 1000. in range.
- Half 1000 to 10.
- Double 10 to 1010. in range.
- Double 11 to 1111. not in range.

Logic this:

### Pseudo-code

- Read input and separated ranges by commas
- Set sum = 0
- For each range:

  - Set first number to check.

    - If first ID is even
      - take first half.
    - Else,
      - get length of first ID + 1
      - first number is 1 plus 0s to match length.

  - Set last number to check.

    - If last ID is even
      - take first half.
    - Else,
      - get length of last ID - 1
      - last number is 9s repeating to that length.

  - While num to check is less than or equal to last num to check

    - Double the number.
    - If number is <= last ID and number is >= first Id
      - add number to sum.
    - increment number to check.

- Return the sum.
