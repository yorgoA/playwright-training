/*
 * You have an array called productPrices with various product prices.
 *
 * 1. Apply a 10% discount to all prices using the map method and store the
 *    results in a new array called discountedPrices.
 * 2. Use the filter method to create a new array called affordableProducts
 *    containing only products priced below $50.
 * 3. Calculate the total cost of all items in the affordableProducts array
 *    using the reduce method.
 */

const productPrices = [200, 350, 788, 120, 50, 187, 670, 900, 20, 30];

const discountedPrices = productPrices.map((price) => price * 0.9);
console.log(discountedPrices);

const affordableProducts = productPrices.filter((price) => price < 50);
console.log(affordableProducts);

const total = affordableProducts.reduce((sum, price) => sum + price, 0);
console.log(total);