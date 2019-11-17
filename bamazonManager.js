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
function welcome() {
    inquirer
        .prompt([
            {
                name: "menuOption",
                type: "list",
                message: "Bamazon Manager Menu",
                choices: [" Product for sale", "Low Inventory", "Add to Inventory", "Add new product"]


            }
        ]).then(function(answer) {
            if (answer.menuOption === " Product for sale"){
                viewProduct();
            }
            if (answer.menuOption === "Low Inventory"){
                viewInventory();
            }
            if (answer.menuOption === "Add to Inventory"){
                addInventory();
            }
            if (answer.menuOption ===  "Add new product"){
                addNewProduct();
            }



            // switch ("answer") {
            //     case "Product for sale":
            //         viewProduct();
            //         break;
            //     case "Low Inventory":
            //         viewInventory();
            //         break;
            //     case "Add to Inventory":
            //         addInventory();
            //         break;
            //     case "Add new product":
            //         addNewProduct();
            //         break;
            //     default:
            //         welcome();
            // }
        })
}
function viewProduct(answer){
    console.log("this is view product")
}

function viewInventory(answer){
    console.log("this is view inventory")
}
function addInventory(answer){
    console.log("adding to the inventory")
}
function addNewProduct(answer){
    console.log("adding new product to the database");
}