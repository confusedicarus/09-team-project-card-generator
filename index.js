const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const teamMembers = [];
let manager = "";
let teamTitle = "";

function initData() {
  inquirer
    .prompt([
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
    ])
    .then((initData) => {
      manager = new Manager(
        initData.managerName,
        initData.managerEmail,
        initData.managerID,
        initData.officeNum
      );
      teamTitle = initData.teamTitle;
      //   console.log(initData);
      console.log("Next: Other Employee Data");
      return otherEmployeeData();
    });
}
function otherEmployeeData() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is this employee's role?",
        name: "employeeRole",
        choices: ["Intern", "Engineer"],
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
        when: (userInput) => userInput.roleSelection === "Engineer",
      },
      {
        type: "input",
        message: "School attended?",
        name: "school",
        when: (userInput) => userInput.roleSelection === "Intern",
      },
      {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "newEmployee",
      },
    ])
    .then((employeeData) => {
      if (employeeData.roleSelection === "Engineer") {
        const employee = new Engineer(
          employeeData.employeeName,
          employeeData.employeeEmail,
          employeeData.eID,
          employeeData.gitHub
        );
        teamMembers.push(employee);
      } else if (employeeData.roleSelection === "Intern") {
        const employee = new Intern(
          employeeData.employeeName,
          employeeData.employeeEmail,
          employeeData.eID,
          employeeData.school
        );
        teamMembers.push(employee);
      }
      if (employeeData.newEmployee === true) {
        otherEmployeeData();
      } else {
        var main = fs.readFileSync(`./html-templates/main.html`, "utf8");
        main = main.replace(`{{teamTitle}}`, teamTitle);
        main = main.replace(`{{teamName}}`, teamTitle);

        var managerCard = fs.readFileSync(
          "./html-templates/manager.html",
          "utf8"
        );

        managerCard = managerCard.replace(`{{name}}`, manager.getName());
        managerCard = managerCard.replace(`{{role}}`, manager.getRole());
        managerCard = managerCard.replace(`{{eID}}`, manager.getID());
        managerCard = managerCard.replace(`{{email}}`, manager.getEmail());
        managerCard = managerCard.replace(
          `{{officeNum}}`,
          manager.getOfficeNum()
        );
        //this isn't working. expected behavior: make cards based on the number of teamMembers -- actual behavior: creates only manager card
        var cards = managerCard;
        for (var i = 0; i < teamMembers.length; i++) {
          var employee = teamMembers[i];
          cards += assembleTeam(employee);
          console.log(teamMembers);
        }
        main = main.replace(`{{cards}}`, cards);
        fs.writeFileSync(`./output/team-project-profile.html`, main);
        console.log(employeeData);
        console.log("team-project-profile.html has been created");
      }
    });
}

function assembleTeam(employee) {
  if (employee.getRole() === "Intern") {
    var internCard = fs.readFileSync(`./html-templates/intern.html`, `utf8`);
    internCard = internCard.replace(`{{name}}`, employee.getName());
    internCard = internCard.replace(`{{role}}`, employee.getName());
    internCard = internCard.replace(`{{email}}`, employee.getName());
    internCard = internCard.replace(`{{school}}`, employee.getName());
  } else if (employee.getRole() === "Engineer") {
    var engineerCard = fs.readFileSync(
      `./html-templates/engineer.html`,
      `utf8`
    );
    engineerCard = engineerCard.replace(`{{name}}`, employee.getName());
    engineerCard = engineerCard.replace(`{{role}}`, employee.getRole());
    engineerCard = engineerCard.replace(`{{email}}`, employee.getEmail());
    engineerCard = engineerCard.replace(`{{gitHub}}`, employee.getGitHub());
  }
}
initData();
