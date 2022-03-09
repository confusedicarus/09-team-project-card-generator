const Employee = require(`./employee`);

class Intern extends Employee {
  constructor(name, email, eID, school) {
    super(name, email, eID);
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
