const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
const team = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
      },

      {
        type: "input",
        message: "What is your manager's employee ID?",
        name: "managerID",
      },

      {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
      },

      {
        type: "input",
        message: "What is your manager's number?",
        name: "managerNumber",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.managerNumber
      );
      team.push(manager);
      createTeam();
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "engineerName",
      },

      {
        type: "input",
        message: "What is your engineer's employee ID?",
        name: "engineerID",
      },

      {
        type: "input",
        message: "What is your engineer's email?",
        name: "engineerEmail",
      },

      {
        type: "input",
        message: "What is your engineer's GitHub?",
        name: "engineerGithub",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.engineerGithub
      );
      team.push(engineer);
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "internName",
      },

      {
        type: "input",
        message: "What is your intern's employee ID?",
        name: "internID",
      },

      {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail",
      },

      {
        type: "input",
        message: "What is your intern's School?",
        name: "internSchool",
      },
    ])
    .then((answers) => {
      console.log(answers);
      const intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.internSchool
      );
      team.push(intern);
      createTeam();
    });
}
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add an engineer, add an intern or finish?",
        name: "mainMenu",
        choices: ["Add engineer", "Add intern", "Finish"],
      },
    ])
    .then((answers) => {
      if (answers.mainMenu === "Add engineer") {
        createEngineer();
      } else if (answers.mainMenu === "Add intern") {
        createIntern();
      } else {
        const parseHTML = generateHTML(team);

        fs.writeFile("team.html", parseHTML, (err) =>
          err ? console.error(err) : console.log("Success!")
        );
      }
    });
}

const generateHTML = (team) => {
  const managerTemplate = `<div class="manager-card">
<h3 class= "employee-name">${team[0].getName()} </h3>
<h4 class="title">Manager</h4>
<div>ID: ${team[0].getId()} </div>
<div>Email: <a href="mailto:${team[0].getEmail()}"> ${team[0].getEmail()}</a></div>
<div>Office Number: ${team[0].getOfficeNumber()} </div> 
</div>`;

  const engineers = team.filter(
    (employee) => employee.getRole() === "Engineer"
  );

  let engineerTemplate = "";

  engineers.forEach((engineer) => {
    engineerTemplate += `<div class="engineer-card"> 
<h3 class= "employee-name">${engineer.getName()} </h3>
<h4 class="title">Engineer</h4>
<div>ID: ${engineer.getId()} </div>
<div>Email: <a href="mailto:${engineer.getEmail()}"> ${engineer.getEmail()}</a></div>
<div>Github: <a href="https://github.com/${engineer.getGithub()}" target="_blank"> ${engineer.getGithub()} </a> </div>
</div>`;
  });

  const interns = team.filter((employee) => employee.getRole() === "Intern");

  let internTemplate = "";

  interns.forEach((intern) => {
    internTemplate += `<div class="intern-card"> 
<h3 class= "employee-name">${intern.getName()} </h3>
<h4 class="title">Intern</h4>
<div>ID: ${intern.getId()} </div>
<div>Email: <a href="mailto:${intern.getEmail()}"> ${intern.getEmail()}</a></div>
<div>School: ${intern.getSchool()} </div>
</div>`;
  });

  const document = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Team Profile Generator</title>
</head>
<body>
<h1 class="heading">Willy B's Team</h1>
${managerTemplate}
<div class="employee-wrapper">
${engineerTemplate}
${internTemplate}
</div>
</body>
</html>`;
  return document;
};

createManager();
