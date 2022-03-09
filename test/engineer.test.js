const Employee = require("../lib/employee");
const Engineer = require("../lib/engineer");

describe("Engineer", () => {
    describe("Initializatoin", () => {
      it("should create an object if provided valid arguments", () => {
        const user = new Engineer("Rick", "test@test.com", 1, "rlmor");
        expect(user.name).toEqual("Rick");
        expect(user.email).toEqual("test@test.com");
        expect(user.eID).toEqual(1);
        expect(user.gitHub).toEqual("rlmor");
      });
    });
  });