const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

var apiKey = "19f78a5be5b9c57bea8cee71daae7acc-us22"; //Here your API key from Mailchimp
var listID = "e6fb609139"; //Here your list id

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    
    var data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);    // change a bit to improve and simplify

    var options = {
        url: "https://us22.api.mailchimp.com/3.0/lists/" + listID,
        method: "POST",
        headers: {
            "Authorization": "anagutjor " + apiKey
        },
        body: jsonData
    }

    request(options, function(error, response, body){    // change a bit to improve and simplify
        if(error){
            res.sendFile(__dirname + "/failure.html");
        } else {
            console.log(response.statusCode);
                if(response.statusCode === 200){
                    res.sendFile(__dirname + "/success.html");
                } else {
                    res.sendFile(__dirname + "/failure.html");
                }
        }
    })
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000");
})

// My api key = 19f78a5be5b9c57bea8cee71daae7acc-us22
// My lis key =  e6fb609139
 

