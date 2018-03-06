// Global Variables
const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'playlistDB'
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
connection.connect(function(err){;
    if (err){throw err};
    promptUser();
});
// Prompt User
function promptUser(){
    inquirer.prompt(questions[0]).then(function(inquirerResponse){
        var menuOptions = inquirerResponse.menuOptions;
        if(menuOptions = "Post an Item"){
            whereClause = "";
            searchQuery(whereClause);
        }
        else if(menuOptions = "Bid on an Item"){
            // SQL: Show List of Items
            inquirer.prompt(questions[1]).then(function(inquirerResponse){
                var itemId = inquirerResponse.selectItem;
                inquirer.prompt(questions[2]).then(function(inquirerResponse){
                    var bid = inquirerResponse.bid;
                    whereClause = `SELECT price FROM greattable WHERE id = '${itemId}'`;
                })
            })
            
            // 
            // (IF USER BID = HIGHER, INFORM SUCCESS)
            // (IF USER BID = LOWER, INFORM FAILURE AND GO BACK TO FIRST QUESTION)
            
            updateQuery(whereClause);
        }
    })
};

function searchQuery(whereClause){
    connection.query(whereClause,function(error,results,fields){
        if (error) throw error;
        if(results.length > 0){
            for(var i = 0; i < results.length; i++){
                
            }
        }
        else{
            if(results.affectedRows > 0){
                console.log(`Success!`)
            }
        }
    });
    connection.end();
}


function updateQuery(whereClause){
    connection.query(whereClause,function(error,results,fields){
        if (error) throw error;
        if(results.affectedRows > 0){
            console.log(`Success!`)
        }
    });
    connection.end();
}