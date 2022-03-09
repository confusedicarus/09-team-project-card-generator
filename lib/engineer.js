const Employee = require(`./employee`);

class Engineer extends Employee {
    constructor(name, eID, email, gitHub) {
        this.gitHub = gitHub

        super(name, email, eID)
    }
    getGitHub() {
        return this.gitHub;
    }
    getRole() {
        return `Engineer`;
    }
}
module.exports = Engineer;