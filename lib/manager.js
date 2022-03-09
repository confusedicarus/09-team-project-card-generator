const Employee = require(`./employee`);

class Manger extends Employee {
    constructor(name, eID, email, officeNum) {
        
        this.officeNum = officeNum

        super(name, email, eID);
    }
    getOfficeNum() {
        return this.officeNum;
    };
    getRole() {
        return `Manager`;
    }
}
module.exports = Manager;