//objects

var customer = {
    firstName: 'Jon',
    lastName: 'Smit',
    cars: ["volvo", "Toyta","Tesla"]
}
//Dot notation
customer.firstName = "mike"
// Bracket notation
customer['lastName'] = "silver"
console.log(`${customer.firstName} ${customer.lastName}`)

console.log(customer)

//arrays
var car = ["volvo", "Toyta","Tesla"]
car[1] = "BMW"
console.log(car[1]);
console.log(customer.cars[2]);
