console.log("this is working");
var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  start();

});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
function start() {
  inquirer
    .prompt({
      name: "BuyOrNotbuy",
      type: "list",
      message: "what is product [item_id] your like to buy today? and how manny [quantity] you like to buy?",
      choices: ["item_id", "stock_quantity", "cancell"]
    })
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
// function itemId(){

// }
