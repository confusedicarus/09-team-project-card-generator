const Intern = require("../lib/intern");

describe("Can set school via constructor", () => {
  const testValue = "Denver University";
  const e = new Intern("Rick", 1, "test@test.com", testValue);
  expect(e.school).toEqual(testValue);
});

describe('getRole() should return "Intern"', () => {
  const testValue = "Intern";
  const e = new Intern("Rick", 1, "test@test.com", "UCLA");
  expect(e.getRole()).toEqual(testValue);
});

describe("Can get school via getSchool()", () => {
  const testValue = "Denver University";
  const e = new Intern("Rick", 1, "test@test.com", testValue);
  expect(e.getSchool()).toEqual(testValue);
});
