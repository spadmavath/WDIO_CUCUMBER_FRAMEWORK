class InventoryPage {

    get inventoryContainer() {
        return $(".inventory_list");
    }

    async isInventoryPageDisplayed() {

        return await this.inventoryContainer.isDisplayed();
    }
}

export default new InventoryPage();