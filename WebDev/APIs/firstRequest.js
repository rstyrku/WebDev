var request = require('request');

request("http://www.reddit.com", function(error, response, body){
    if(error){
        console.log("Something Went Wront");
        console.log(error);
    }

    else{
        if(response.statusCode == 200){
            console.log(body);
        }
    }

});