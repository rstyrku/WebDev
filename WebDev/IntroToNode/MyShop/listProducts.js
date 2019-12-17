var faker = require('faker');

console.log("==================");
console.log("Welcome To My Shop");
console.log("==================")
for(var i = 0; i < 10; i++){
    var name = faker.commerce.productName();
    var price = faker.commerce.price();
    console.log(name + " - " + price);
}