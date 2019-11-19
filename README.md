# bamazon-Customer
## Overview
### Customer 
In this assignment the aplication call Bamazon is building it's like Amazon using  **Node js** for **server** side and **MYSQL** for **database**. In this app i have created Database call Bamazon_db and added some of the mock up data to the table call **products**. using this app customers can view the products that are available for sales , they can place their order with item id number and if they don't to shop they can exit by clicking to the cancell.
 ### Manager 
 This app is also useful for manager to perform different types of activities like they can view what products are  avaiable for sale, what products are low inventory, if item is low in inventory they can increase inventory level by performing **add to the inventory** and manager can add completely new product to the store as well.
### Supervisor 
By using this app the Supervisor can two different action 
- They can view products sales by department id Number.
- They can create new department.

## Challenge #1: Customer View (Minimum Requirement)
1. Create a MySQL Database called bamazon.


2. Then create a Table inside of that database called products.


3. The products table should have each of the following columns:


- item_id (unique id for each product)


- product_name (Name of product)


- department_name


- price (cost to customer)


- stock_quantity (how much of the product is available in stores)




4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).


5. Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.


6. The app should then prompt users with two messages.

- The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.



7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

- If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



8. However, if your store does have enough of the product, you should fulfill the customer's order.

- This means updating the SQL database to reflect the remaining quantity.
- Once the update goes through, show the customer the total cost of their purchase.

## Screenshort
This is welcome page for the app. whenever customers proceed to the app customer will see welcome page and the products list that are for sales. and at bottom of this page will show two choices for customer one for shop and cancell.
<img src="images/Image 11-18-19 at 11.59 PM.jpg"
alt="database table in console"/>

when Customer wnats to shop product from this app customer will ask for item id and how manny quantity like to buy and will give the total price for order. this will give option for to place their order, continue shpping  and cancell order.
<img src="images/Image 11-19-19 at 12.11 AM.jpg"
alt="total for shopping"/>

## Challenge #2: Manager View (Next Level requirement)Create a new Node application called bamazonManager.js. Running this application will:


- List a set of menu options:


* View Products for Sale


* View Low Inventory


* Add to Inventory


* Add New Product




- If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.


- If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.


- If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.


 - If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


 ## Screenshort (results)

 This is home for manager

<img src="images/Screen Shot 2019-11-19 at 12.50.25 AM"
alt="total for shopping"/>


<img src="images/Image 11-19-19 at 12.54 AM.jpg"
alt="total for shopping"/>
<img src="images/Image 11-19-19 at 12.55 AM.jpg"
alt="total for shopping"/>
<img src="images/Image 11-19-19 at 1.00 AM.jpg"
alt="total for shopping"/>
