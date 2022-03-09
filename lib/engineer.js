const Employee = require(`./employee`);

class Engineer extends Employee {
  constructor(name, email, eID, gitHub) {
    super(name, email, eID);
    this.gitHub = gitHub;
  }
  getGitHub() {
    return this.gitHub;
  }
  getRole() {
    return `Engineer`;
  }
}
module.exports = Engineer;
