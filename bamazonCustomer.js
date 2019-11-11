console.log("this is working");
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
  afterConnection();
  start();

});
//this function select the database table call "products" and print the table informations.//
function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
//this is start function that will prompt user for two messages 
function start() {
  inquirer
    .prompt({
      name: "BuyOrNotbuy",
      type: "list",
      message: "what is product [item_id] your like to buy today? and how manny [quantity] you like to buy?",
      choices: ["item_id", "stock_quantity", "cancell"]
    })
    //whenever user select different answer that will trigger differnt function base on thier choices and will end the connection with database.
     .then(function(answer) {
      if (answer.BuyOrNotbuy === "item_id") {
        itemId();
      }
     else if (answer.BuyOrNotbuy === "stock_quantity"){
        stockQauntity();
        console.log("this is working");
      }
      else{
        connection.end();
      }
    })

}

function itemId(){
inquirer
.prompt([
  {
    name: "item_id",
    type:"input",
    message: "what is the id number for your item?"
  },
  {
    name: "category", 
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
}
