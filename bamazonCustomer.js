var mysql = require("mysql");
var inquirer = require("inquirer");
// creating connection to the mysql and store in the variable "connection".//
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
// function that establishing connection to database if there are throw error otherwise print information.//
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("\n.................................................Welcome to Bamazon..................................................\n")
  console.log("\n................................................what you like to purchase Today?.....................................\n")
  
  afterConnection();


});
//this function select the database table call "products" and print the table informations.//
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("\n==========================================Products for the sale in the store========================================\n")

    console.table(res);
    // connection.end();
    start(res);

  });
}
//this is start function that will prompt user for two messages 
function start(inventory) {
//   console.log("\n..............................Welcome Bamazon............................\n")
// console.log("\n.............................what you like to purchase Today?................\n")
  inquirer
    .prompt({
      name: "BuyOrNotbuy",
      type: "list",
      message: "this is the list of the item you can buy with Bamazon.",
      choices: ["Buy",  "cancell"]
    })
    //whenever user select different answer that will trigger differnt function base on thier choices and will end the connection with database.
     .then(function(answer) {
      if (answer.BuyOrNotbuy === "Buy") {
        itemBuy();
      }
    //  else if (answer.BuyOrNotbuy === "stock_quantity"){
    //     stockQauntity();
    //     console.log("this is working");
    //   }
      else{
        connection.end();
      }
    })

}

function itemBuy(){
inquirer
.prompt([
  {
    name: "item_id",
    type:"input",
    message: "what is the id number for your item?"
  },
  {
    name: "quantity", 
    type: "input",
    message: "How manny quantuty you like to buy?",
    validate:function(value){
     if(isNaN(value) == false){
       return true;
     }
     return false;
    }

  },

])


.then(function(answer) {
  // var query = "SELECT item_id, stock_quantity ? FROM products where = ?";

  var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?"

  connection.query(query, {item_id: answer.item_id}, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("\n Product id: " + res[i].item_id + "\n Stock_Quantity: " + res[i].stock_quantity);
    }
  });
})
};
