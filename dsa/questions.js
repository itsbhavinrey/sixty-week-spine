const topics = [
  { id: "foundations", title: "JS foundations", icon: "01", description: "Arrays, strings, loops, functions, objects and Maps—introduced through problems." },
  { id: "two-pointers", title: "Two pointers", icon: "02", description: "Coordinate two positions instead of checking every possible pair." },
  { id: "sliding-window", title: "Sliding window", icon: "03", description: "Reuse work while examining continuous ranges." },
  { id: "stack-queue", title: "Stacks & queues", icon: "04", description: "Control processing order and model nested structure." },
  { id: "linked-list", title: "Linked lists", icon: "05", description: "Build confidence with references and pointer movement." },
  { id: "binary-search", title: "Binary search", icon: "06", description: "Discard half the search space at each decision." },
  { id: "trees", title: "Trees & BSTs", icon: "07", description: "Recursive structures, DFS, BFS and ordered trees." },
  { id: "heap-intervals", title: "Heaps & intervals", icon: "08", description: "Priorities, top-k questions and overlapping ranges." },
  { id: "graphs", title: "Graphs", icon: "09", description: "Explore networks with traversal and dependency ordering." },
  { id: "backtracking", title: "Backtracking", icon: "10", description: "Search choices, undo decisions and build possibilities." },
  { id: "greedy-dp", title: "Greedy & DP", icon: "11", description: "Make locally useful choices or remember repeated subproblems." }
];

const catalog = [
  ["foundations","Find the Largest Number","Easy"],["foundations","Reverse a String","Easy"],["foundations","Two Sum","Easy"],["foundations","Contains Duplicate","Easy"],["foundations","Valid Anagram","Easy"],["foundations","Group Anagrams","Medium"],["foundations","Top K Frequent Elements","Medium"],["foundations","Product of Array Except Self","Medium"],["foundations","Maximum Subarray","Medium"],["foundations","Longest Consecutive Sequence","Medium"],["foundations","Majority Element","Easy"],["foundations","Rotate Array","Medium"],
  ["two-pointers","Valid Palindrome","Easy"],["two-pointers","Two Sum II","Medium"],["two-pointers","3Sum","Medium"],["two-pointers","Container With Most Water","Medium"],["two-pointers","Trapping Rain Water","Hard"],["two-pointers","Move Zeroes","Easy"],["two-pointers","Squares of a Sorted Array","Easy"],
  ["sliding-window","Best Time to Buy and Sell Stock","Easy"],["sliding-window","Longest Substring Without Repeating Characters","Medium"],["sliding-window","Longest Repeating Character Replacement","Medium"],["sliding-window","Permutation in String","Medium"],["sliding-window","Minimum Size Subarray Sum","Medium"],["sliding-window","Minimum Window Substring","Hard"],
  ["stack-queue","Valid Parentheses","Easy"],["stack-queue","Min Stack","Medium"],["stack-queue","Evaluate Reverse Polish Notation","Medium"],["stack-queue","Daily Temperatures","Medium"],["stack-queue","Car Fleet","Medium"],
  ["linked-list","Reverse Linked List","Easy"],["linked-list","Merge Two Sorted Lists","Easy"],["linked-list","Linked List Cycle","Easy"],["linked-list","Remove Nth Node From End","Medium"],["linked-list","Reorder List","Medium"],["linked-list","Copy List With Random Pointer","Medium"],
  ["binary-search","Binary Search","Easy"],["binary-search","Search a 2D Matrix","Medium"],["binary-search","Koko Eating Bananas","Medium"],["binary-search","Find Minimum in Rotated Sorted Array","Medium"],["binary-search","Search in Rotated Sorted Array","Medium"],
  ["trees","Invert Binary Tree","Easy"],["trees","Maximum Depth of Binary Tree","Easy"],["trees","Diameter of Binary Tree","Easy"],["trees","Balanced Binary Tree","Easy"],["trees","Same Tree","Easy"],["trees","Binary Tree Level Order Traversal","Medium"],["trees","Validate Binary Search Tree","Medium"],["trees","Kth Smallest Element in a BST","Medium"],["trees","Lowest Common Ancestor of a BST","Medium"],
  ["heap-intervals","Kth Largest Element in an Array","Medium"],["heap-intervals","Merge K Sorted Lists","Hard"],["heap-intervals","Task Scheduler","Medium"],["heap-intervals","Merge Intervals","Medium"],["heap-intervals","Insert Interval","Medium"],["heap-intervals","Non-overlapping Intervals","Medium"],
  ["graphs","Number of Islands","Medium"],["graphs","Clone Graph","Medium"],["graphs","Max Area of Island","Medium"],["graphs","Rotting Oranges","Medium"],["graphs","Course Schedule","Medium"],["graphs","Graph Valid Tree","Medium"],["graphs","Word Ladder","Hard"],
  ["backtracking","Subsets","Medium"],["backtracking","Combination Sum","Medium"],["backtracking","Permutations","Medium"],["backtracking","Word Search","Medium"],["backtracking","Palindrome Partitioning","Medium"],
  ["greedy-dp","Maximum Subarray: DP View","Medium"],["greedy-dp","Jump Game","Medium"],["greedy-dp","Climbing Stairs","Easy"],["greedy-dp","House Robber","Medium"],["greedy-dp","Coin Change","Medium"],["greedy-dp","Longest Increasing Subsequence","Medium"],["greedy-dp","Longest Common Subsequence","Medium"]
];

const lessons = {
  "find-the-largest-number": {
    prompt: "Given a non-empty array of numbers, return its largest value. Do not use Math.max for the first solution.",
    example: `findLargest([4, 2, 9, 5, 1]) // 9\nfindLargest([-7, -2, -10])  // -2`,
    concepts: ["array", "function", "for...of", "comparison", "O(n)"],
    syntax: `<p>An <code>array</code> stores values in order. A function packages reusable logic. <code>for...of</code> visits each value.</p><pre>const numbers = [4, 2, 9];\n\nfunction showEach(items) {\n  for (const item of items) {\n    console.log(item);\n  }\n}</pre>`,
    hint: `<p>Keep one variable representing the largest number seen so far. Start it with the first array element—not <code>0</code>, because every input could be negative.</p>`,
    approach: `<ol><li>Store the first number as <code>largest</code>.</li><li>Visit every number.</li><li>If the current number is greater, replace <code>largest</code>.</li><li>Return the final value.</li></ol>`,
    solution: `<pre>function findLargest(numbers) {\n  let largest = numbers[0];\n\n  for (const number of numbers) {\n    if (number > largest) {\n      largest = number;\n    }\n  }\n\n  return largest;\n}</pre>`,
    complexity: `<p>We inspect each of <code>n</code> numbers once: <strong>O(n) time</strong>. We keep only one extra variable: <strong>O(1) space</strong>.</p>`,
    edgeCases: `<ul><li>A one-element array</li><li>Every number is negative</li><li>The largest value appears multiple times</li></ul>`
  },
  "reverse-a-string": {
    prompt: "Given a string, return a new string with its characters in reverse order.",
    example: `reverseString("hello") // "olleh"\nreverseString("JS")    // "SJ"`,
    concepts: ["string", "index", "loop", "let", "O(n)"],
    syntax: `<p>Strings are indexed from zero. They cannot be changed in place, so we build a new one.</p><pre>const word = "hello";\nword.length;      // 5\nword[0];          // "h"\nword[word.length - 1]; // "o"</pre>`,
    hint: `<p>Start at the last valid index, <code>text.length - 1</code>, and move toward index <code>0</code>.</p>`,
    approach: `<p>Create an empty result. Walk backward through the input and append each character to the result.</p>`,
    solution: `<pre>function reverseString(text) {\n  let reversed = "";\n\n  for (let i = text.length - 1; i >= 0; i--) {\n    reversed += text[i];\n  }\n\n  return reversed;\n}</pre>`,
    complexity: `<p>We visit <code>n</code> characters: <strong>O(n) time</strong>. The returned string contains <code>n</code> characters: <strong>O(n) space</strong>.</p>`,
    edgeCases: `<ul><li>An empty string</li><li>One character</li><li>Spaces and punctuation</li></ul>`
  },
  "two-sum": {
    prompt: "Given an array of integers and a target, return the indices of two different numbers whose sum equals the target. Assume exactly one answer exists.",
    example: `twoSum([2, 7, 11, 15], 9) // [0, 1]\ntwoSum([3, 2, 4], 6)      // [1, 2]`,
    concepts: ["Map", "complement", "lookup", "hashing", "O(n)"],
    syntax: `<p>A <code>Map</code> stores key–value pairs. Here, the number is the key and its index is the value.</p><pre>const seen = new Map();\nseen.set(7, 1);\nseen.has(7); // true\nseen.get(7); // 1</pre>`,
    hint: `<p>For each number, calculate what partner it needs: <code>target - number</code>. Can you remember previously seen numbers so finding that partner is fast?</p>`,
    approach: `<ol><li>Create an empty Map.</li><li>For each number, compute its complement.</li><li>If the complement is already stored, return both indices.</li><li>Otherwise store the current number and index.</li></ol>`,
    solution: `<pre>function twoSum(numbers, target) {\n  const seen = new Map();\n\n  for (let i = 0; i < numbers.length; i++) {\n    const complement = target - numbers[i];\n\n    if (seen.has(complement)) {\n      return [seen.get(complement), i];\n    }\n\n    seen.set(numbers[i], i);\n  }\n}</pre>`,
    complexity: `<p>A nested-loop solution checks pairs in <strong>O(n²)</strong> time. A Map gives average <strong>O(1)</strong> lookup, producing <strong>O(n) time</strong> and <strong>O(n) space</strong>.</p>`,
    edgeCases: `<ul><li>The same value may occur twice, such as <code>[3, 3]</code></li><li>A number cannot use itself twice</li><li>Negative values</li></ul>`
  },
  "contains-duplicate": {
    prompt: "Return true if any value appears at least twice in an integer array; otherwise return false.",
    example: `containsDuplicate([1, 2, 3, 1]) // true\ncontainsDuplicate([1, 2, 3, 4]) // false`,
    concepts: ["Set", "early return", "hashing", "O(n)"],
    syntax: `<p>A <code>Set</code> stores unique values. Unlike a Map, it has no separate value attached to each key.</p><pre>const seen = new Set();\nseen.add(4);\nseen.has(4); // true</pre>`,
    hint: `<p>As you visit each number, ask whether you have seen it before. You can return immediately when the answer becomes known.</p>`,
    approach: `<p>Use a Set as memory. If the current value is already in it, return true; otherwise add it. Return false after the loop.</p>`,
    solution: `<pre>function containsDuplicate(numbers) {\n  const seen = new Set();\n\n  for (const number of numbers) {\n    if (seen.has(number)) return true;\n    seen.add(number);\n  }\n\n  return false;\n}</pre>`,
    complexity: `<p>One pass gives <strong>O(n) time</strong>. In the worst case the Set holds every number, giving <strong>O(n) space</strong>.</p>`,
    edgeCases: `<ul><li>An empty array</li><li>Two equal negative numbers</li><li>Many copies of one value</li></ul>`
  },
  "valid-anagram": {
    prompt: "Return true when two lowercase strings contain exactly the same characters with the same frequencies, possibly in a different order.",
    example: `isAnagram("anagram", "nagaram") // true\nisAnagram("rat", "car")         // false`,
    concepts: ["object", "frequency counter", "for...of", "O(n)"],
    syntax: `<p>A plain object can act as a frequency table. Bracket notation lets a character become a key.</p><pre>const count = {};\ncount["a"] = (count["a"] ?? 0) + 1;</pre><p><code>?? 0</code> uses zero when the key does not exist yet.</p>`,
    hint: `<p>Different lengths can never be anagrams. Otherwise, count characters from the first string and subtract using the second.</p>`,
    approach: `<ol><li>Reject different lengths.</li><li>Count each character in the first string.</li><li>For each character in the second, reject a missing/zero count and then subtract one.</li></ol>`,
    solution: `<pre>function isAnagram(first, second) {\n  if (first.length !== second.length) return false;\n\n  const counts = {};\n  for (const char of first) {\n    counts[char] = (counts[char] ?? 0) + 1;\n  }\n\n  for (const char of second) {\n    if (!counts[char]) return false;\n    counts[char]--;\n  }\n\n  return true;\n}</pre>`,
    complexity: `<p>We traverse both strings once: <strong>O(n) time</strong>. Space is <strong>O(k)</strong>, where <code>k</code> is the number of distinct characters.</p>`,
    edgeCases: `<ul><li>Different lengths</li><li>Repeated letters</li><li>Two empty strings</li></ul>`
  }
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const questions = catalog.map((item, index) => {
  const [topic, title, difficulty] = item;
  const id = slugify(title);
  return { number: index + 1, topic, title, difficulty, id, ...lessons[id] };
});
