//Include necessary packages for database.
var pg = require('pg');
var cgDB= pg.Pool({
    user:"",
    host: "localhost",
    database: 'yelpcamp',
    password:"",
    port: "5432"
});

//Function to take care of any extra apostraphes. Necessary for PostGres queries.
function extraAposDB(name) {
    var split = name.split("'");
    var final = "";
    for(var i = 0; i < split.length; i++){
        final += split[i];
        if(i < split.length - 1){
            final += "''";
        }
    }
    return final;
}

var data = [
    {
        name: "Cloud's Rest",
        imgurl: 'https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-20-640x427.jpg',
        description: 'askl;d;fjhav shdfka fhkl;d jakls; jaslf hafk valfk;a sdfkl;bvajslkdfvas jlkasdjf lksajdf vaskf asl;kdfjsbvlkjabs dvkjlf;ajs dlkfnvkljasd vklfjasd fjklnva;lksdfv l;kasdfj '
    },
    {
        name: "Desert Mesa",
        imgurl: 'https://render.fineartamerica.com/images/rendered/default/print/8.000/5.375/break/images-medium/painted-desert-mesa-top-david-waldo.jpg',
        description: 'askl;d;fjhav shdfka fhkl;d jakls; jaslf hafk valfk;a sdfkl;bvajslkdfvas jlkasdjf lksajdf vaskf asl;kdfjsbvlkjabs dvkjlf;ajs dlkfnvkljasd vklfjasd fjklnva;lksdfv l;kasdfj '
    },
    {
        name: "Canyon Floor",
        imgurl: 'https://media-cdn.tripadvisor.com/media/photo-s/01/29/b8/c1/canyon-floor.jpg',
        description: 'askl;d;fjhav shdfka fhkl;d jakls; jaslf hafk valfk;a sdfkl;bvajslkdfvas jlkasdjf lksajdf vaskf asl;kdfjsbvlkjabs dvkjlf;ajs dlkfnvkljasd vklfjasd fjklnva;lksdfv l;kasdfj '
    }
];

function seedDB(){
    //Remove All Campgrounds
    cgDB.query('DELETE FROM campgrounds');
    cgDB.query('DELETE FROM comments');

    //Add a few Campgrounds
    data.forEach(function(seed){

        //Generate query to input in database
        var query = "INSERT INTO campgrounds(name, imgurl, description) VALUES ('" + extraAposDB(seed.name) + "', '" +
            extraAposDB(seed.imgurl) + "', '" + extraAposDB(seed.description) +"');";
        cgDB.query(query, function(err){
            if(err){
                console.log(err);
            }
            //Add a few Comments
            query = "INSERT INTO comments(comment, campground, author) VALUES ('This Place is Great, But I wish There was Internet','" +
                extraAposDB(seed.name) + "', 'Homer')";
            cgDB.query(query, function(err){
                if(err){
                    console.log(err);
                }
            })
        });
    })
}

module.exports = seedDB();