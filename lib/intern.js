const Employee = require(`./employee`);

class Intern extends Employee {
  constructor(name, email, eID, school) {
    super(name, eID, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return `Intern`;
  }
}

module.exports = Intern;
