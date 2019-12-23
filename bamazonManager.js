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
        ]).then(function (answer) {
            if (answer.menuOption === " Product for sale") {
                viewProduct();
            }
            if (answer.menuOption === "Low Inventory") {
                viewInventory();
            }
            if (answer.menuOption === "Add to Inventory") {
                addInventory();
            }
            if (answer.menuOption === "Add new product") {
                addNewProduct();
            }
        })
}
function viewProduct(answer) {
    var query = "SELECT * FROM products"
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        welcome()

    })
}

function viewInventory(answer) {
    var query = "SELECT * FROM products  WHERE stock_quantity<10";
    // run query to database //
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.log("---------Low Inventory level---------");
        console.table(results);
        welcome()

    })
}
// this is where i am having problem!//
function addInventory() {
    var itemQty = 0;

    console.log("adding to the inventory")
    //query the database to show all the products in the inventtory so they can add more inventory with id number//
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results)

        // asking manager which id number product you like to add to the inventory//
        console.log("\n=======================================================================================\n")
        inquirer
            .prompt([
                {
                    name: "id",
                    // type: "input",
                    message: "input item id to add your inventory",
                    // checking the item id is number greater than zero and contained in the DB//
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        }
                        return false;
                    }

                },
                {
                    name: "quantity",
                    // type: "input",
                    message: " what is the amount of quantity adding to the inventory?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        }
                        return false;
                    }

                }
            ]).then(function (answer) {
                for (var i = 0; i < results.length; i++) {
                    if (parseInt(answer.id) === results[i].item_id) {
                        itemQty= results[i].stock_quantity
                        increseQty(answer)
                    }

                }
            })
    })


}

function increseQty(answer) {
    console.log("your inventory is done");
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: itemQty + answer.quantity
            },
            {
                item_id: answer.id
            }
        ],
        function (error, results) {
            // throw error, else log inventory updated and return to welcome screen
            if (error) throw error;
            console.log("\nInventory successfully increased.\n");
            welcome();
        });
}


function addNewProduct(answer) {
    console.log("--------------adding new product to the database-------------------");
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: " input your item id",
            },
            {
                name: "Name",
                type: "input",
                message: " Enter your Name of the product you like to add in your DB",
            },
            {
                name: "department",
                type: "input",
                message: " what is the department for your product?",
            },
            {
                name: "price",
                type: "input",
                message: "cost for each product?"
            },
            {
                name: "quantity",
                type: "input",
                message: " how much quantity you like to add?"
            }

        ]).then(function (answer) {
            addItemToDB(answer)
        })
}

function addItemToDB(answer) {
    console.log("this is working");
    var query = "INSERT INTO products SET? "
    connection.query(query, 
     {
      item_id: answer.id,
      product_name: answer.Name,
      department_name:answer.department,
      price_costTocustomer: answer.price,
      stock_quantity: answer.quantity
     
        }, function(err, results){
            if (err) throw err;
            console.log("\n New product successfully add to the database.\n")
            viewProduct();
            welcome();
        }
        
        )
    
}
function exit() {
	console.log("\nNever stop selling.\n");
	connection.end();
}
