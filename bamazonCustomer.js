var mysql      = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port	   : '3306',
  user     : 'root',
  password : '',
  database : 'Bamazon'
});
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

connection.query("SELECT * FROM products", function(error, result) {
	if (error) {
		throw error;
	} else {
		console.log("")
		console.log("===============================================================")
		console.log("                   Welcome to Rifle Paper Co.! ")
		console.log("===============================================================")
		console.log("")
		console.log("----------------------- ITEMS FOR SALE ------------------------")
		console.log("")

			for (var i = 0; i < result.length; i++) {

				console.log(result[i].item_id + ". " +result[i].department_name + " | " + result[i].product_name + " ((" + "$ " + result[i].price + "))")
				console.log("")
			}

		console.log("===============================================================")

		questions(); //calls the inquirer prompts!
	}
});

		
function questions() {
	inquirer.prompt([
		{
	        name: "productID",
	        message: "Which product would you like to buy? Identify by the product ID number."
	    }, {
	        name: "quantity",
	        message: "How many units would you like to purchase of that item?"
	      }

		]).then(function (answers) {

		var productID = answers.productID;
		var quantity = answers.quantity;
		

		connection.query("SELECT * FROM products", function(error, result) {
			if (error) {
				throw error;
			} else {
				if (result.stock_quantity > answers.quantity) {
					console.log("Your Order is On It's Way!")
				}
				else {
					console.log("Insufficient Quantity!")
				}
			}
		})

		// connection.query("UPDATE products SET ? WHERE ?", [
		// {
		// 	purchases : quantity
		// },
		// {
		// 	item_id : productID
		// }
		// ],
		//  function(err, res) {
		// if (err) {
		// 	throw(err)
		// 	connection.end();
			
		// }
		// else {
		// 	console.log('res')
		// 	console.log(res)
		// }
		// }) // ends the first query

		// connection.query("SELECT SUM (")

		// connection.query("SELECT stock_quantity, purchases FROM products WHERE ?", [
		// 	{
		// 		item_id : productID
		// 	}

		// 	] );

  		}) //ends the THEN function

  		
}


// connection.end();

    
// });
// });
    

