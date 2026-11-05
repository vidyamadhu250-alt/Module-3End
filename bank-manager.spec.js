
const { test, expect } = require('@playwright/test');

test('Bank Manager - Add Customer, Open Account, Search and Delete', async ({ page }) => {

    // Generate unique customer details
    const firstName = 'John';
    const lastName = 'Test' + Date.now();
    const customerName = `${firstName} ${lastName}`;
    const postCode = '682001';

    // STEP 1: Open Banking Application
    await page.goto(
        'https://www.globalsqa.com/angularJs-protractor/BankingProject/'
    );

    // STEP 2: Bank Manager Login
    await page.getByRole('button', {
        name: 'Bank Manager Login'
    }).click();

    await expect(
        page.getByRole('button', { name: 'Add Customer' }).first()
    ).toBeVisible();

    console.log('Bank Manager Login Successful');

    // STEP 3: Add Customer
    await page.getByRole('button', {
        name: 'Add Customer'
    }).first().click();

    // Enter customer details
    await page.locator('input[ng-model="fName"]').fill(firstName);
    await page.locator('input[ng-model="lName"]').fill(lastName);
    await page.locator('input[ng-model="postCd"]').fill(postCode);

    // Handle Add Customer alert
    page.once('dialog', async (dialog) => {
        console.log('Add Customer Alert:', dialog.message());
        await dialog.accept();
    });

    // Submit customer form
    await page.locator('form button[type="submit"]').click();

    console.log('Customer Added Successfully');

    // STEP 4: Open Account
    await page.getByRole('button', {
        name: 'Open Account'
    }).click();

    // Select newly created customer
    await page.locator('#userSelect').selectOption({
        label: customerName
    });

    // Select Dollar currency
    await page.locator('#currency').selectOption({
        label: 'Dollar'
    });

    // Handle Open Account alert
    page.once('dialog', async (dialog) => {
        console.log('Open Account Alert:', dialog.message());
        await dialog.accept();
    });

    // Click Process
    await page.getByRole('button', {
        name: 'Process'
    }).click();

    console.log('Bank Account Created Successfully');

    // STEP 5: Search Customer
    await page.getByRole('button', {
        name: 'Customers'
    }).click();

    // Search using unique last name
    const searchBox = page.locator(
        'input[ng-model="searchCustomer"]'
    );

    await searchBox.fill(lastName);

    // Locate matching customer row
    const customerRow = page.locator('table tbody tr').filter({
        hasText: lastName
    });

    // Verify exactly one matching customer
    await expect(customerRow).toHaveCount(1);

    // Print customer details
    const customerDetails = await customerRow.innerText();

    console.log('Customer Details:', customerDetails);
    console.log('Exactly one matching customer found');

    // STEP 6: Delete Customer
    await customerRow.getByRole('button', {
        name: 'Delete'
    }).click();

    // Verify customer record is deleted
    await expect(customerRow).toHaveCount(0);

    console.log('Customer Deleted Successfully');
    console.log('Verified: No matching customer record remains');

});
