const Engineer = require("../lib/engineer");

describe("Can set GitHUb account via constructor", () => {
    const testValue = "GitHubUser";
    const e = new Engineer("Rick", 1, "test@test.com", testValue);
    expect(e.github).toEqual(testValue);
});

describe("getRole() should return \"Engineer\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Rick", 1, "test@test.com", "GitHubUser");
    expect(e.getRole()).toEqual(testValue);
});

describe("Can get GitHub username via getGithub()", () => {
    const testValue = "GitHubUser";
    const e = new Engineer("Rick", 1, "test@test.com", testValue);
    expect(e.getGithub()).toEqual(testValue);
});