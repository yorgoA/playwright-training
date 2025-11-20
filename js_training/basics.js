 /* 
 You have an array called productPrices with various product prices.

Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices.

Use the filter method to create a new array called affordableProducts containing only products priced below $50

Calculate the total cost of all items in the affordableProducts array using the reduce method.
 */

const { toASCII } = require("punycode")

var productPrices =[200,350,788,120,50,187,670,900,20,30]
var discountedPrices = productPrices.map(price=>price*0.9)
console.log(discountedPrices)

console.log("*********************************************")

var affordableProducts = productPrices.filter(product=>product<50)
console.log(affordableProducts)

console.log("*********************************************")
var total = affordableProducts.reduce((total,product)=>total=total+product,0)
console.log(total)