
import { test, expect } from '@playwright/test';

test('Place Broccoli order successfully', async ({ page }) => {

    // STEP 1: Open the Grocery Application
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // STEP 2: Locate Brocolli product
    const broccoli = page.getByRole('heading', {
        name: 'Brocolli - 1 Kg',
        exact: true
    });

    // Verify that the product is visible
    await expect(broccoli).toBeVisible();

    // Find the product card and click its ADD TO CART button
    const productCard = broccoli.locator('..');

    await productCard.getByRole('button', {
        name: 'ADD TO CART'
    }).click();

    console.log('Brocolli added to cart successfully');

    // STEP 3: Open the Shopping Cart
    await page.getByRole('link', {
        name: 'Cart'
    }).click();

    // STEP 4: Verify the product in the cart preview
    const cart = page.locator('.cart-preview');

    await expect(cart).toContainText('Brocolli');

    console.log('Product verified in shopping cart');

    // STEP 5: Proceed to Checkout
    await cart.getByRole('button', {
        name: /PROCEED TO CHECKOUT/i
    }).click();

    // Verify navigation to cart page
    await expect(page).toHaveURL(/#\/cart/);

    // STEP 6: Click Place Order
    await page.getByText('Place Order', {
        exact: true
    }).click();

    // Verify navigation to country page
    await expect(page).toHaveURL(/#\/country/);

    // STEP 7: Select India from the country dropdown
    await page.locator('select').selectOption({
        label: 'India'
    });

    console.log('Country selected: India');

    // STEP 8: Accept Terms and Conditions
    await page.locator('.chkAgree').check();

    console.log('Terms and Conditions accepted');

    // STEP 9: Click Proceed
    await page.getByRole('button', {
        name: 'Proceed',
        exact: true
    }).click();

    // STEP 10: Verify the order confirmation message
    const confirmation = page.getByText(
        /Thank\s*you,\s*your order has been placed successfully/i
    );

    await expect(confirmation).toBeVisible();

    // Verify the required confirmation text
    await expect(confirmation).toContainText(
        /Thank\s*you,\s*your order has been placed successfully/i
    );

    // STEP 11: Print confirmation message in the console
    const message = (await confirmation.textContent()).trim();

    console.log('Order Confirmation:', message);

});
