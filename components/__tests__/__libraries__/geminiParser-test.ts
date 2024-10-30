import {
  addTimes,
  Duration,
  parseQuantity,
  parseTag,
  parseTime,
} from "@/libraries/geminiParsers";

describe("Testing time parsing", () => {
  const tests = [
    { input: "5 sec", expectedTime: "5 sec" },
    { input: "5 seconds", expectedTime: "5 sec" },
    { input: "5s", expectedTime: "5 sec" },
    { input: "PT5S", expectedTime: "5 sec" },
    { input: "45min", expectedTime: "45 min" },
    { input: "45 mins", expectedTime: "45 min" },
    { input: "5m", expectedTime: "5 min" },
    { input: "PT5M", expectedTime: "5 min" },
    { input: "PT5H", expectedTime: "5 h" },
    { input: "5hours", expectedTime: "5 h" },
    { input: "5 hour", expectedTime: "5 h" },
    { input: "1h5m", expectedTime: "65 min" },
    { input: "1hour5min", expectedTime: "65 min" },
    { input: "2 hours 5 minutes", expectedTime: "125 min" },
    { input: "45", expectedTime: "45" },
  ];

  tests.forEach((t) => {
    test("Parsing the input should yield the correct time", () => {
      const actualTime = parseTime(t.input);
      expect(actualTime.toString()).toBe(t.expectedTime);
    });
  });
});

describe("Testing time additions", () => {
  const tests = [
    {
      time1: new Duration(5, "min"),
      time2: new Duration(6, "min"),
      expectedResult: "11 min",
    },
    {
      time1: new Duration(5, "sec"),
      time2: new Duration(6, "sec"),
      expectedResult: "11 sec",
    },
    {
      time1: new Duration(5, "h"),
      time2: new Duration(6, "h"),
      expectedResult: "11 h",
    },
    {
      time1: new Duration(5, "min"),
      time2: new Duration(2, "h"),
      expectedResult: "125 min",
    },
    {
      time1: new Duration(5, "h"),
      time2: new Duration(2, "min"),
      expectedResult: "302 min",
    },
    {
      time1: new Duration(5, "sec"),
      time2: new Duration(2, "min"),
      expectedResult: "2 min",
    },
    {
      time1: new Duration(5, "h"),
      time2: new Duration(2, "sec"),
      expectedResult: "300 min",
    },
  ];

  tests.forEach((t) => {
    test("Parsing the input should yield the correct time", () => {
      const actualTime = addTimes(t.time1, t.time2);
      expect(actualTime.toString()).toBe(t.expectedResult);
    });
  });
});

describe("Testing quantity parsing", () => {
  const tests = [
    { input: "5", expectedQuantity: 5 },
    { input: "5.", expectedQuantity: 5 },
    { input: "5.5", expectedQuantity: 5.5 },
    { input: "5,5", expectedQuantity: 5.5 },
    { input: "1/4", expectedQuantity: 0.25 },
    { input: "8/2", expectedQuantity: 4 },
    { input: "7.5/2.5", expectedQuantity: 3 },
    { input: "¼", expectedQuantity: 0.25 },
    { input: "½", expectedQuantity: 0.5 },
    { input: "¾", expectedQuantity: 0.75 },
    { input: "1/3", expectedQuantity: 0.33 },
    { input: "", expectedQuantity: 0 },
  ];

  tests.forEach((t) => {
    test("Parsing the input should yield the correct quantity", () => {
      const actualQuantity = parseQuantity(t.input);
      expect(actualQuantity).toBe(t.expectedQuantity);
    });
  });

  const precisionTests = [
    { input: "1/3", expectedQuantity: 0.3 },
    { input: "1/3", expectedQuantity: 0.333 },
  ];
  precisionTests.forEach((t) => {
    test("Parsing fractions should lead to at least 2 digits of precision", () => {
      const actualQuantity = parseQuantity(t.input);
      expect(actualQuantity).not.toBe(t.expectedQuantity);
    });
  });

  const failingTests = [{ input: "fse" }, { input: "18.a" }];
  failingTests.forEach((t) => {
    test("Parsing invalid input should throw", () => {
      expect(() => parseQuantity(t.input)).toThrow();
    });
  });
});


describe("Testing tag parsing", () => {
  const tests = [
    { input: "tag", expectedTag: "Tag" },
    { input: "URL", expectedTag: "Url" },
    { input: "main dish", expectedTag: "Main Dish" },
    { input: "5", expectedTag: "5" },
    { input: "", expectedTag: "" },
  ];

  tests.forEach((t) => {
    test("Parsing the tag should yield capitalize correctly", () => {
      const actualTag = parseTag(t.input);
      expect(actualTag).toBe(t.expectedTag);
    });
  });
});