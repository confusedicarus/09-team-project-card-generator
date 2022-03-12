const Employee = require("../lib/employee");
const Engineer = require("../lib/engineer");
const name = "Rick";
const email = "test@test.com";
const eID = 1;
const gitHub = "awesomeRick";

describe("Engineer", () => {
  describe("Initializatoin", () => {
    it("should create an object if provided valid arguments", () => {
      const obj = new Engineer();
      expect(typeof obj).toEqual("object");
    });
  });
  describe("Name property", () => {
    it("should return name", () => {
      const user = new Engineer(name);
      expect(user.name).toEqual(name);
    });
  });

  describe("email property", () => {
    it("should return email", () => {
      const user = new Engineer(name, email);
      expect(user.email).toEqual(email);
    });
  });

  describe("eID property", () => {
    it("should return ID", () => {
      const user = new Engineer(name, email, eID);
      expect(user.eID).toEqual(eID);
    });
  });
  describe("getGitHub", () => {
    it("should return ID", () => {
      const user = new Engineer(name, email, eID, gitHub);
      expect(user.gitHub).toEqual(user.getGitHub());
    });
  });
});
