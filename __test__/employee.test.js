const Employee = require("../lib/employee");

describe("Can instantiate Employee instance", () => {
  const e = new Employee("Rick");
  expect(typeof e).toEqual("object");
});

describe("Can set name via constructor arguments", () => {
  const name = "Rick";
  const e = new Employee(name);
  expect(e.name).toEqual(name);
});

describe("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("Rick", testValue);
  expect(e.id).toEqual(testValue);
});

describe("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Employee("Rick", 1, testValue);
  expect(e.email).toEqual(testValue);
});

describe("Can get name via getName()", () => {
  const testValue = "Rick";
  const e = new Employee(testValue);
  expect(e.getName()).toEqual(testValue);
});

describe("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Employee("Rick", testValue);
  expect(e.getId()).toEqual(testValue);
});

describe("Can get email via getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Employee("Rick", 1, testValue);
  expect(e.getEmail()).toEqual(testValue);
});

describe('getRole() should return "Employee"', () => {
  const testValue = "Employee";
  const e = new Employee("Rick", 1, "test@test.com");
  expect(e.getRole()).toEqual(testValue);
});
