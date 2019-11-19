// npm requirements//
var inquirer = require("inquirer");
var mysql = require("mysql");
// var consoleTableNPM = require("console.table");
// create mysql connection//
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "bamazon_db"
});
// connect to db
connection.connect(function (error) {
    if (error) throw error;
    // welcome manager
    console.log("\n-----------------------------------------------------------------"
        + "\nWelcome Bamazon Supervisor !\n"
        + "-----------------------------------------------------------------\n");
    // start the app
    alias()
    afterConnection()
});

function afterConnection() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: " view product sales by department 0r create new Department  ",
                choices: ["View product sales by Department", "Create New Department", "exit"]
            }
        ]).then(function (answer) {
            if (answer.action === "View product sales by Department") {
                viewDepartment();
            }
            if (answer.action === "Create New Department") {
                newDepartment()
            }
            if (answer.action === " exit") {

            }
        })

}



function viewDepartment() {
    var query = "SELECT * FROM departments "
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results)
    })
}
function newDepartment() {
    console.log("this is working new department");
}

function exit() {
    console.log(" exit is working");
}
function alias() {
    SELECT
    [column_1 | expression] AS descriptive_name
    FROM departments;
}
