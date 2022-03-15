//global declrations
const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

const teamMembers = [];
let manager = "";
let teamTitle = "";
function managerHTML(manager) {
  return `<div class="card" style="width: 18rem">
<div class="card-body">
  <h5 class="card-title">${manager.getName()}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${manager.getRole()}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${manager.getID()}</li>
    <li class="list-group-item"><a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
    <li class="list-group-item">Office Number: ${manager.getOfficeNum()}</li>
  </ul>
</div>
</div>`;
}
function engineerHTML(engineer) {
  return `<div class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">${engineer.getName()}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${engineer.getRole()}</h6>
    <ul class="list-group">
      <li class="list-group-item">ID: ${engineer.getID()}</li>
      <li class="list-group-item">
        <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a>
      </li>
      <li class="list-group-item">
        <a href="https://github.com/${engineer.getGitHub()}">GitHub: ${engineer.getGitHub()}</a>
      </li>
    </ul>
  </div>
</div>
`;
}
function internHTML(intern) {
  return `<div class="card" style="width: 18rem">
  <div class="card-body">
    <h5 class="card-title">${intern.getName()}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${intern.getRole()}</h6>
    <ul class="list-group">
      <li class="list-group-item">ID: ${intern.getID()}</li>
      <li class="list-group-item">
        <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a>
      </li>
      <li class="list-group-item">School: ${intern.getSchool()}</li>
      </li>
    </ul>
  </div>
</div>
`;
}
function mainHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"
      ></script>
      <link rel="stylesheet" href="./style.css" />
      <title>${teamTitle}</title>
    </head>
    <body>
      <header>
        <h1 id="teamName">${teamTitle}</h1>
      </header>
      <div class="container">
        <div class="rows">${cardGen()}</div>
      </div>
      <footer>
        Team Project HTML Generator by
        <a href="https://github.com/confusedicarus">Rick M</a>
      </footer>
    </body>
  </html>
  `;
}
function cardGen() {
  let allMemHTML = "";
  for (var i = 0; i < teamMembers.length; i++) {
    let memberRole = teamMembers[i].getRole();
    if (memberRole === "Manager") {
      console.log(memberRole);
      allMemHTML += managerHTML(teamMembers[i]);
    } else if (memberRole === "Engineer") {
      console.log(memberRole);
      allMemHTML += engineerHTML(teamMembers[i]);
    } else {
      console.log(memberRole);
      allMemHTML += internHTML(teamMembers[i]);
    }
  }
  console.log(allMemHTML);
  return allMemHTML;
}
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
      teamMembers.push(manager);
      return otherEmployeeData();
    });
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
        fs.writeFileSync(`./dist/team-project-profile.html`, mainHTML());
        console.log("team-project-profile.html has been created");
      }
    });
}

initData();
