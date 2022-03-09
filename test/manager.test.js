const Employee = require("../lib/employee");
const Manager = require("../lib/manager");

describe("Manager", () => {
  describe("Initializatoin", () => {
    it("should create an object if provided valid arguments", () => {
      const user = new Manager("Rick", "test@test.com", 1, 66);
      expect(user.name).toEqual("Rick");
      expect(user.email).toEqual("test@test.com");
      expect(user.eID).toEqual(1);
      expect(user.officeNum).toEqual(66);
    });
  });
});
