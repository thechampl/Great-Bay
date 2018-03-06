// Global Variables
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'greatbay'
});
const query = connection.query;
const questions = [
    {
        type: "list",
        message: "Select a Menu Option: ",
        name: "menuOptions",
        choices: ["Post an Item","Bid on an Item"]
    },
    {
        type: "input",
        message: "Enter the ID of the Item You Wish to Bid On: ",
        name: "selectItem"
    },
    {
        type: "input",
        message: "Enter Your Bid: ",
        name: "bid"
    }
]
var whereClause = "";
// Initialize
connection.connect(function(err){
    if (err){throw err};
    promptUser();
});
// Prompt User
function promptUser(){
    inquirer.prompt(questions[0]).then(function(inquirerResponse){
        var menuOptions = inquirerResponse.menuOptions;
        if(menuOptions === "Post an Item"){
            //whereClause = "";
            //searchQuery(whereClause);
        }
        else if(menuOptions === "Bid on an Item"){
            bidOnItem();
        }
    })
};

function searchQuery(whereClause){
    connection.query(whereClause,function(error,results,fields){
        if (error) throw error;
    });
}

function bidOnItem(){
    whereClause = `SELECT * FROM greattable`;
    connection.query(whereClause,function(error,results,fields){
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                console.log(`${results[i].id}. ${results[i].name} ($${results[i].price})`);
            }
            inquirer.prompt(questions[1]).then(function(inquirerResponse){
                var itemId = inquirerResponse.selectItem;
                inquirer.prompt(questions[2]).then(function(inquirerResponse){
                    var bid = inquirerResponse.bid;
                    whereClause = `SELECT price FROM greattable WHERE id = ${itemId}`;
                    connection.query(whereClause,function(error,results,fields){
                        var price = results[0].price;
                        if(bid > price){
                            console.log("Congratulations! You successfully placed your bid.")
                            connection.end();
                        }
                        else if(bid <= price){
                            console.log("Sorry, someone else has out-bid you. Please try again.")
                            promptUser();
                        }
                    })
                })
            })
        }
    });
}