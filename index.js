//global declrations
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const teamMembers = [];
let manager = "";
let teamTitle = "";

//starts the app and begins with manager credentials
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
      console.log("Next: Other Employee Data");
      return otherEmployeeData();
    });
}
//card creation for interns and engineers
function assembleTeam(employee) {
  if (employee.getRole() === "Intern") {
    var internCard = fs.readFileSync(`./html-templates/intern.html`, `utf8`);
    internCard = internCard.replace(`{{name}}`, employee.getName());
    internCard = internCard.replace(`{{eID}}`, employee.getID());
    internCard = internCard.replace(`{{role}}`, employee.getRole());
    internCard = internCard.replace(`{{email}}`, employee.getEmail());
    internCard = internCard.replace(`{{emailAnchor}}`, employee.getEmail());
    internCard = internCard.replace(`{{school}}`, employee.getSchool());
    return internCard;
  } else if (employee.getRole() === "Engineer") {
    var engineerCard = fs.readFileSync(
      `./html-templates/engineer.html`,
      `utf8`
    );
    engineerCard = engineerCard.replace(`{{name}}`, employee.getName());
    engineerCard = engineerCard.replace(`{{eID}}`, employee.getID());
    engineerCard = engineerCard.replace(`{{role}}`, employee.getRole());
    engineerCard = engineerCard.replace(`{{email}}`, employee.getEmail());
    engineerCard = engineerCard.replace(`{{emailAnchor}}`, employee.getEmail());
    engineerCard = engineerCard.replace(`{{gitHub}}`, employee.getGitHub());
    engineerCard = engineerCard.replace(
      `{{gitHubAnchor}}`,
      employee.getGitHub()
    );
    return engineerCard;
  }
}
//begins prompts for other employees and creates manager card.
function otherEmployeeData() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is this employee's role?",
        name: "employeeRole",
        choices: ["Engineer", "Intern"],
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
        when: (userInput) => userInput.employeeRole === "Engineer",
      },
      {
        type: "input",
        message: "School attended?",
        name: "school",
        when: (userInput) => userInput.employeeRole === "Intern",
      },
      {
        type: "confirm",
        message: "Would you like to add another team member?",
        name: "newEmployee",
      },
    ])
    .then((employeeData) => {
      if (employeeData.employeeRole === "Engineer") {
        const employee = new Engineer(
          employeeData.employeeName,
          employeeData.employeeEmail,
          employeeData.eID,
          employeeData.gitHub
        );
        teamMembers.push(employee);
      } else if (employeeData.employeeRole === "Intern") {
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
        var leadCard = fs.readFileSync("./html-templates/manager.html", "utf8");
        leadCard = leadCard.replace(`{{name}}`, manager.getName());
        leadCard = leadCard.replace(`{{role}}`, manager.getRole());
        leadCard = leadCard.replace(`{{eID}}`, manager.getID());
        leadCard = leadCard.replace(`{{email}}`, manager.getEmail());
        leadCard = leadCard.replace(`{{emailAnchor}}`, manager.getEmail());
        leadCard = leadCard.replace(`{{officeNum}}`, manager.getOfficeNum());
        //cards being appended and written to the html
        var cards = leadCard;
        for (var i = 0; i < teamMembers.length; i++) {
          var employee = teamMembers[i];
          cards += assembleTeam(employee);
        }
        main = main.replace(`{{cards}}`, cards);
        fs.writeFileSync(`./dist/team-project-profile.html`, main);
        console.log("team-project-profile.html has been created");
      }
    });
}

initData();
