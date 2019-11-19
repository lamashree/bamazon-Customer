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
        + "\nWelcome Bamazon Manager!\n"
        + "-----------------------------------------------------------------\n");
    // start the app
    welcome();
});
