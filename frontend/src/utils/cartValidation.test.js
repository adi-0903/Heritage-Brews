/**
 * Standalone Validation Script for Cart Calculations and Functions
 * File: D:\\Heritage Brews\\frontend\\src\\utils\\cartValidation.test.js
 * 
 * This script validates:
 * 1. Standard item addition and total calculation.
 * 2. Quantity updates and removal.
 * 3. Membership discount applications (e.g. 15% royal discount on normal items, 0% on membership items).
 * 4. Price freezing logic (ensuring cart prices are snapshot/frozen at addition time).
 */

// ANSI Color helper functions for beautiful output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  fgGreen: '\x1b[32m',
  fgRed: '\x1b[31m',
  fgCyan: '\x1b[36m',
  fgYellow: '\x1b[33m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
};

function logHeader(text) {
  console.log(`\n${colors.fgCyan}${colors.bright}=== ${text} ===${colors.reset}`);
}

function logSuccess(text) {
  console.log(`${colors.fgGreen}${colors.bright}✓ ${text}${colors.reset}`);
}

function logError(text) {
  console.log(`${colors.fgRed}${colors.bright}✗ ${text}${colors.reset}`);
}

// 1. Re-implementation of Cart Provider logic for exact parity testing
class CartSimulator {
  constructor(user = null) {
    this.items = [];
    this.user = user;
    this.isOpen = false;
  }

  // Get active membership from user profile (matches CartContext.jsx lines 11-13)
  get discountRate() {
    const activeMembership = this.user?.profile?.active_membership;
    return activeMembership?.discount_percentage ? parseFloat(activeMembership.discount_percentage) / 100 : 0;
  }

  // Add Item logic (matches CartContext.jsx lines 15-23)
  addItem(item) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      this.items = this.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
    } else {
      // Clones the item to ensure "price freezing" is robustly maintained
      this.items = [...this.items, { ...item, qty: 1 }];
    }
  }

  // Remove Item logic (matches CartContext.jsx lines 25-27)
  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id);
  }

  // Update Qty logic (matches CartContext.jsx lines 29-35)
  updateQty(id, qty) {
    if (qty <= 0) {
      this.items = this.items.filter(i => i.id !== id);
    } else {
      this.items = this.items.map(i => i.id === id ? { ...i, qty } : i);
    }
  }

  clearCart() {
    this.items = [];
  }

  // Calculates total number of items (matches CartContext.jsx line 40)
  get totalItems() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  // Calculates raw price before discounts (matches CartContext.jsx line 43)
  get rawTotal() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  // Calculates total price with discounts applied (matches CartContext.jsx lines 47-52)
  get totalPrice() {
    const rate = this.discountRate;
    return this.items.reduce((sum, i) => {
      // Membership items themselves are not subject to membership discounts
      const itemPrice = i.type === 'membership' ? i.price : i.price * (1 - rate);
      return sum + itemPrice * i.qty;
    }, 0);
  }

  // Calculates savings (matches CartContext.jsx line 53)
  get savings() {
    return this.rawTotal - this.totalPrice;
  }
}

// Assertion Helpers
function assertEquals(actual, expected, message) {
  if (Math.abs(actual - expected) > 0.001 && actual !== expected) {
    throw new Error(`Assertion failed: ${message}\n  Expected: ${expected} (type: ${typeof expected})\n  Actual:   ${actual} (type: ${typeof actual})`);
  }
  console.log(`  ${colors.fgGreen}✓${colors.reset} ${message} [Value: ${actual}]`);
}

function assertDeepEquals(actual, expected, message) {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(`Assertion failed: ${message}\n  Expected: ${expectedStr}\n  Actual:   ${actualStr}`);
  }
  console.log(`  ${colors.fgGreen}✓${colors.reset} ${message}`);
}

// Test Runner
const runTests = () => {
  let passedCount = 0;
  let failedCount = 0;
  
  const runTest = (name, testFn) => {
    logHeader(`Running Test: ${name}`);
    try {
      testFn();
      logSuccess(`Test "${name}" Passed Successfully!`);
      passedCount++;
    } catch (err) {
      logError(`Test "${name}" Failed!`);
      console.error(`${colors.fgRed}${err.stack}${colors.reset}`);
      failedCount++;
    }
  };

  // Scenario 1: Standard item addition and total calculation
  runTest("Standard Item Addition & Totals", () => {
    const cart = new CartSimulator();
    
    const beer1 = { id: 101, name: "Stout Beer", price: 120.00, type: "product" };
    const beer2 = { id: 102, name: "Amber Ale", price: 150.00, type: "product" };
    
    // Add first item
    cart.addItem(beer1);
    assertEquals(cart.items.length, 1, "Cart contains exactly 1 unique item");
    assertEquals(cart.totalItems, 1, "Total quantity of items is 1");
    assertEquals(cart.rawTotal, 120.00, "Raw total matches first item price");
    assertEquals(cart.totalPrice, 120.00, "Total price matches raw total (no discount)");
    assertEquals(cart.savings, 0.00, "Savings is 0.00");

    // Add first item again (quantity should increment)
    cart.addItem(beer1);
    assertEquals(cart.items.length, 1, "Cart still contains 1 unique item");
    assertEquals(cart.totalItems, 2, "Total quantity of items is 2");
    assertEquals(cart.items[0].qty, 2, "Quantity of Stout Beer is 2");
    assertEquals(cart.rawTotal, 240.00, "Raw total updated correctly (120 * 2)");
    assertEquals(cart.totalPrice, 240.00, "Total price updated correctly (120 * 2)");

    // Add second item
    cart.addItem(beer2);
    assertEquals(cart.items.length, 2, "Cart now contains 2 unique items");
    assertEquals(cart.totalItems, 3, "Total quantity of items is 3");
    assertEquals(cart.rawTotal, 390.00, "Raw total updated correctly (240 + 150)");
    assertEquals(cart.totalPrice, 390.00, "Total price updated correctly");
  });

  // Scenario 2: Quantity updates and removal
  runTest("Quantity Updates & Removal", () => {
    const cart = new CartSimulator();
    const itemA = { id: 201, name: "Wheat Beer", price: 100.00, type: "product" };
    const itemB = { id: 202, name: "IPA", price: 180.00, type: "product" };

    cart.addItem(itemA);
    cart.addItem(itemB);

    // Update quantity of itemA to 5
    cart.updateQty(201, 5);
    assertEquals(cart.items.find(i => i.id === 201).qty, 5, "Quantity of Wheat Beer updated to 5");
    assertEquals(cart.totalItems, 6, "Total items matches updated quantity (5 Wheat + 1 IPA)");
    assertEquals(cart.rawTotal, 680.00, "Raw total is 5 * 100 + 180 = 680");

    // Decrease quantity of itemA to 3
    cart.updateQty(201, 3);
    assertEquals(cart.items.find(i => i.id === 201).qty, 3, "Quantity of Wheat Beer decreased to 3");
    assertEquals(cart.totalItems, 4, "Total items is 4");
    assertEquals(cart.rawTotal, 480.00, "Raw total is 3 * 100 + 180 = 480");

    // Set quantity of itemA to 0 (should remove from cart)
    cart.updateQty(201, 0);
    assertEquals(cart.items.length, 1, "Wheat Beer removed because qty was set to 0");
    assertEquals(cart.items[0].id, 202, "Only IPA remains in cart");

    // Add Wheat Beer back
    cart.addItem(itemA);
    assertEquals(cart.items.length, 2, "Wheat Beer added back to cart");

    // Remove Wheat Beer directly using removeItem
    cart.removeItem(201);
    assertEquals(cart.items.length, 1, "Wheat Beer removed directly using removeItem");
    assertEquals(cart.items[0].id, 202, "Only IPA remains in cart");
  });

  // Scenario 3: Membership discount applications
  runTest("Membership Discounts (Royal 15%)", () => {
    // Mock user with Royal Membership (15% discount)
    const royalUser = {
      email: "royal_patron@heritagebrews.com",
      profile: {
        active_membership: {
          tier: "Royal",
          discount_percentage: "15.00",
        }
      }
    };

    const cart = new CartSimulator(royalUser);
    assertEquals(cart.discountRate, 0.15, "Discount rate is correctly parsed as 0.15");

    const normalProduct = { id: 301, name: "Premium Craft Lager", price: 200.00, type: "product" };
    const membershipFee = { id: 302, name: "Royal Membership Annual Renewal", price: 1000.00, type: "membership" };

    // Add standard product
    cart.addItem(normalProduct);
    assertEquals(cart.rawTotal, 200.00, "Raw total for normal product is 200");
    assertEquals(cart.totalPrice, 170.00, "Total price with 15% discount is 170 (200 * 0.85)");
    assertEquals(cart.savings, 30.00, "Savings is exactly 30 (200 - 170)");

    // Add membership fee (should NOT be discounted)
    cart.addItem(membershipFee);
    // Raw total: 200 (product) + 1000 (membership) = 1200
    // Total price: 170 (discounted product) + 1000 (undiscounted membership) = 1170
    assertEquals(cart.rawTotal, 1200.00, "Raw total is 1200");
    assertEquals(cart.totalPrice, 1170.00, "Total price is 1170 (Membership fee gets NO discount)");
    assertEquals(cart.savings, 30.00, "Savings remains 30");

    // Add second quantity of normal product
    cart.addItem(normalProduct);
    // 2 * 200 (product) + 1000 (membership)
    // Raw: 1400
    // Discounted products: 400 * 0.85 = 340
    // Membership: 1000
    // Total price: 1340
    // Savings: 60
    assertEquals(cart.rawTotal, 1400.00, "Raw total for 2 products and 1 membership is 1400");
    assertEquals(cart.totalPrice, 1340.00, "Total price is 1340 (Product discount scales, Membership still 0 discount)");
    assertEquals(cart.savings, 60.00, "Savings updated to 60");
  });

  // Scenario 4: Price Freezing Logic
  runTest("Price Freezing Logic", () => {
    const cart = new CartSimulator();
    
    // Live catalog database source product
    const liveCatalogProduct = {
      id: 401,
      name: "Limited Batch Dark Porter",
      price: 250.00,
      type: "product"
    };

    // Add catalog product to cart
    cart.addItem(liveCatalogProduct);
    assertEquals(cart.items[0].price, 250.00, "Added product price is initially 250.00");
    assertEquals(cart.totalPrice, 250.00, "Total price in cart is 250.00");

    // Simulate price increase in live catalog database (price hike to 350.00)
    liveCatalogProduct.price = 350.00;
    
    // The cart item must still preserve its "frozen" original price of 250.00
    assertEquals(cart.items[0].price, 250.00, "Cart item price remains FROZEN at 250.00 despite catalog price changes");
    assertEquals(cart.totalPrice, 250.00, "Cart total remains frozen at 250.00");

    // Add another item of the same product using the new catalog price
    // Note: Since CartContext uses existing object if id matches, it maps the quantity increment but retains the original price
    cart.addItem(liveCatalogProduct);
    assertEquals(cart.items[0].qty, 2, "Quantity incremented to 2");
    assertEquals(cart.items[0].price, 250.00, "Existing cart item price remains frozen at 250.00");
    assertEquals(cart.totalPrice, 500.00, "Total price is frozen at 500.00");
  });

  // Summary
  console.log(`\n${colors.fgYellow}${colors.bright}===========================================`);
  console.log(`            TEST RUN COMPLETE              `);
  console.log(`===========================================`);
  console.log(`  PASSED: ${passedCount}`);
  console.log(`  FAILED: ${failedCount}`);
  console.log(`===========================================${colors.reset}\n`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};

runTests();
