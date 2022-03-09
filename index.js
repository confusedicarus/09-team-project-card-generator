const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const teamMembers = [];
let manager = "";
let teamTitle = "";

function managerData() {
  inquirer.prompt([
    {
      type: "input",
      message: "What's the the name of this team/project?",
      name: "teamTitle",
    },
    {
      type: "input",
      message: "What is the name of the Project Lead?",
      name: "managerName",
    },
    {
      type: "input",
      message: "What's the Lead's Employee ID Number?",
      name: "managerID",
      choice: ["Manager", "Engineer", "Intern", "Finish Selection"],
    },
    {
      type: "input",
      message: "What's the Lead's E-Mail?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What's the office number?",
      name: "officeNum",
    },
  ]).then(managerData => {
      manager = New Manager(managerData.manager.name, managerData.managerID, managerData.managerEmail, managerData.officeNum);
      teamTitle = managerData.teamTitle
      console.log("Next: Other Employee Data")
  })
}
function otherEmployeeData() {
    inquirer.prompt([
       {
    type: "list",
    message: "What's this employee's role?",
    name: "roleSelection",
    choice: ["Engineer", "Intern"],
  },
  {
    type: "input",
    message: "Employee Name?",
    name: "employeeName",
  },
  {
    type: "input",
    message: "Employee ID Number?",
    name: "eID",
  },
  {
    type: "input",
    message: "Employee E-Mail?",
    name: "employeeEmail",
  },
  {
    type: "input",
    message: "GitHub Username?",
    name: "gitHub",
  },
  {
    type: "input",
    message: "School attended?",
    name: "school",
  },
  {
    type: "confirm",
    message: "Would you like to add another team member?",
    name: "newEmployee",
  },
    ]).then(employeeData => {
        if(employeeData.roleSelection === "Engineer") {
            teamMembers.push(new Engineer(employeeData.employeeName, employeeData.eID, employeeData.employeeEmail, employeeData.gitHub));
        } else if (employeeDataq.roleSelection === "Intern") {
            teamMembers.push(new Intern(employeeData.employeeName, employeeData.eID, employeeData.employeeEmail, employeeData.school))
        }
        if (employeeData.newEmployee === true) {
            otherEmployeeData()
        // } else {need to finish this}
    })
}


