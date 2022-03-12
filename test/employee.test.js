const Employee = require("../lib/employee");
const name = "Rick";
const email = "test@test.com";
const eID = 1;

describe("Employee", () => {
  describe("Initializatoin", () => {
    it("should create an object if provided valid arguments", () => {
      const obj = new Employee();
      expect(typeof obj).toEqual("object");
    });
  });
  describe("Name property", () => {
    it("should return name", () => {
      const user = new Employee(name);
      expect(user.name).toEqual(name);
    });
  });

  describe("email property", () => {
    it("should return email", () => {
      const user = new Employee(name, email);
      expect(user.email).toEqual(email);
    });
  });

  describe("eID property", () => {
    it("should return ID", () => {
      const user = new Employee(name, email, eID);
      expect(user.eID).toEqual(eID);
    });
  });
});
