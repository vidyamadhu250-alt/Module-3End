# Playwright Automation – Module 3 End Assignment

## Project Overview

This project contains two End-to-End (E2E) automation test cases developed using **Playwright with JavaScript**.

The purpose of this assignment is to automate real-world application workflows and verify that the applications work as expected.

### Technologies Used
- JavaScript
- Playwright
- Node.js
- Visual Studio Code
- Git and GitHub

## Project Structure

```text
Playwright/
│
├── tests/
│   ├── grocery-order.spec.js
│   └── bank-manager.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── README.md
│
├── test-results/
└── playwright-report/
```

## Test Case 1: Online Grocery Order Placement

**Application:** Rahul Shetty Academy – GreenKart

**URL:** https://rahulshettyacademy.com/seleniumPractise/#/

### Objective
To automate the process of ordering a grocery product and verify that the order is successfully placed.

### Test Steps
1. Open the GreenKart application.
2. Search for the Brocolli product.
3. Add the product to the cart.
4. Open the shopping cart.
5. Verify that the selected product is available in the cart.
6. Proceed to checkout.
7. Click Place Order.
8. Select India as the country.
9. Accept the Terms and Conditions.
10. Click Proceed.
11. Verify the successful order confirmation message.

### Expected Result
The selected product should be added to the cart, and the application should display the successful order confirmation message.

## Test Case 2: Bank Manager Customer Management

**Application:** GlobalSQA Banking Application

**URL:** https://www.globalsqa.com/angularJs-protractor/BankingProject/

### Objective
To automate customer creation, bank account creation, customer search, and customer deletion.

### Test Steps

1. Open the Banking Application.
2. Click Bank Manager Login.
3. Navigate to Add Customer.
4. Enter the following customer details:
   - First Name: John
   - Last Name: Unique value generated during execution
   - Post Code: 682001
5. Submit the form.
6. Handle and print the customer creation alert.
7. Navigate to Open Account.
8. Select the newly created customer.
9. Select Dollar as the currency.
10. Click Process.
11. Handle and print the account creation alert.
12. Navigate to Customers.
13. Search using the unique last name.
14. Verify that exactly one matching customer record is displayed.
15. Print the customer details.
16. Delete the customer record.
17. Verify that the customer record is no longer displayed.

### Expected Result
The customer should be created successfully, a Dollar account should be opened, the customer details should be searchable, and the customer should be deleted successfully.


## Failure Analysis and Debugging

During test development, some locator and browser alert handling issues were encountered.

### Issue 1: Product Locator Failure
**Problem:** The grocery product locator did not identify the product correctly.

**Root Cause:** The assumed CSS selector did not match the application's actual HTML structure.

**Solution:** Used Playwright's `getByRole()` locator to identify the product heading and locate its corresponding Add to Cart button.

### Issue 2: Multiple Matching Buttons
**Problem:** Playwright strict mode reported multiple matching Add Customer buttons.

**Root Cause:** Both the navigation tab and form submit button had the same name.

**Solution:** Used `.first()` for the navigation button and a form-specific locator for submitting the customer form.

### Issue 3: Browser Alert Handling
**Problem:** The test timed out while accepting the customer creation alert.

**Root Cause:** The dialog handling approach caused the test to wait until its timeout.

**Solution:** Used `page.once('dialog')` to listen for the next browser alert, print its message, and accept it.


## Conclusion

This assignment helped me understand and implement End-to-End automation testing using Playwright and JavaScript.

I practiced:
- Locating web elements using Playwright locators.
- Handling browser alerts.
- Filling forms and selecting dropdown options.
- Validating application behavior using assertions.
- Searching and deleting records.
- Debugging test failures.
- Generating Playwright HTML reports.
