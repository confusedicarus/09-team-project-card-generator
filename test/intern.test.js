const Employee = require("../lib/employee");
const Intern = require("../lib/intern");

describe("Intern", () => {
  describe("Initializatoin", () => {
    it("should create an object if provided valid arguments", () => {
      const user = new Intern("Rick", "test@test.com", 1, "UCLA");
      expect(user.name).toEqual("Rick");
      expect(user.email).toEqual("test@test.com");
      expect(user.eID).toEqual(1);
      expect(user.school).toEqual("UCLA");
    });
  });
});
