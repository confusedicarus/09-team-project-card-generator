const Employee = require(`./employee`);

class Manager extends Employee {
  constructor(name, email, eID, officeNum) {
    super(name, email, eID);

    this.officeNum = officeNum;
  }
  getOfficeNum() {
    return this.officeNum;
  }
  getRole() {
    return `Manager`;
  }
}
module.exports = Manager;
