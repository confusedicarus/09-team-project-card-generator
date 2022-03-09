class Employee {
  constructor(name, email, eID) {
    this.name = name;
    this.email = email;
    this.eID = eID;
  }

  getName() {
    return this.name;
  }
  getID() {
    return this.eID;
  }
  getEmail() {
    return this.email;
  }
  getRole() {
    return `Employee`;
  }
}

module.exports = Employee;
