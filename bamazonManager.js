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
function addInventory(answer) {
    console.log("adding to the inventory")
    //query the database to show all the products in the inventtory so they can add more inventory with id number//
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results)
    })
    // asking manager which id number product you like to add to the inventory//
    console.log("\n=======================================================================================\n")
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
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
                type: "input",
                message: " what is the amount of quantity adding to the inventory?",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    }
                    return false;
                }

            }
        ]).then(function (answer) {
            var itemQuantity = 0;
            for (var i = 0; i < results.length; i++) {
                if (answer.id === results[i].item_id) {
                    stock_quantity = results[i].stock_quantity + answer.quantity
                }
            }
        })

        // increseQty()
        

}

function increseQty(){
    connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: stockQty + parseInt(addQty)
			}, 
			{
				item_id: parseInt(item)
			}
		], 
		function(error, results) {
			// throw error, else log inventory updated and return to welcome screen
			if (error) throw error;
			console.log("\nInventory successfully increased.\n");
			welcome();
	});
}

}
function addNewProduct(answer) {
    console.log("adding new product to the database");
}