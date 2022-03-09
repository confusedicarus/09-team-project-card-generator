const Manager = require("../lib/manager");
const Employee = require("../lib/employee");

describe("Can set office number via constructor argument", () => {
  const testValue = 100;
  const e = new Manager("Rick", 1, "test@test.com", testValue);
  expect(e.officeNumber).toEqual(testValue);
});

describe('getRole() should return "Manager"', () => {
  const testValue = "Manager";
  const e = new Manager("Rick", 1, "test@test.com", 100);
  expect(e.getRole()).toEqual(testValue);
});

describe("Can get office number via getOffice()", () => {
  const testValue = 100;
  const e = new Manager("Rick", 1, "test@test.com", testValue);
  expect(e.getOfficeNumber()).toEqual(testValue);
});
