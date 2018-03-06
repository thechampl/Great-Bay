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
            updateQuery(whereClause);
        }
        else if(menuOptions = "Bid on an Item"){
            whereClause = "";
            updateQuery(whereClause);
        }
    })
};

function updateQuery(whereClause){
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