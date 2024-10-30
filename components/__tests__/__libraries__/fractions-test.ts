import { toFraction } from "@/libraries/fractions";

describe("Testing number parsing into fraction", () => {
  const tests = [
    { input: 0.25, expectedFraction: "1/4" },
    { input: 0.33, expectedFraction: "1/3" },
    { input: 0.66, expectedFraction: "2/3" },
    { input: 0.67, expectedFraction: "2/3" },
    { input: 0.75, expectedFraction: "3/4" },
  ];

  tests.forEach((t) => {
    test("Parsing the number with 0.1 precision should yield proper fraction string", () => {
      const actualFraction = toFraction(t.input, 0.1);
      expect(actualFraction).toBe(t.expectedFraction);
    });
  });
});