// Page Object Model for Sauce Demo Inventory / Products Page
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('#inventory_container');
   this.productTitles = page.locator('[data-test="inventory-item-name"]');
    this.addToCartButtons = page.locator('button[data-test^="add-to-cart"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductCount() {
    return await this.productTitles.count();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent();
    }
    return '0';
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
