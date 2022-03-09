const Employee = require("../lib/employee");

describe("Employee", () => {
  describe("Initializatoin", () => {
    it("should create an object if provided valid arguments", () => {
      const user = new Employee("Rick", "test@test.com", 1);
      expect(user.name).toEqual("Rick");
      expect(user.email).toEqual("test@test.com");
      expect(user.eID).toEqual(1);
    });
  });
});
