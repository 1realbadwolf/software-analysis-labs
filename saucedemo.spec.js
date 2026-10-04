const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const testData = require('../data/test-data.json');

test.describe('Sauce Demo UI Tests - Lab 5 Page Object + Data-Driven', () => {

  for (const data of testData) {
    test(`${data.id}: ${data.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();

      if (data.expected === 'success') {
  await loginPage.login(data.username, data.password);
  await expect(page).toHaveURL(/inventory/);
  await expect(inventoryPage.productTitles.first()).toBeVisible();
  const count = await inventoryPage.getProductCount();
  expect(count).toBeGreaterThanOrEqual(1);
}

      else if (data.expected === 'error') {
        await loginPage.login(data.username, data.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(data.errorText);
      }

      else if (data.expected === 'cart') {
        await loginPage.login(data.username, data.password);
        await inventoryPage.addFirstProductToCart();
        const cartCount = await inventoryPage.getCartCount();
        expect(cartCount).toBe(data.expectedCartCount);
      }

      else if (data.expected === 'logout') {
        await loginPage.login(data.username, data.password);
        await inventoryPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
      }
    });
  }
});
