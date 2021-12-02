export function getStoredProducts() {
    const addedItems = localStorage.getItem("cart")

    if (addedItems === null) {
        return [];
    } else {
        return JSON.parse(addedItems);
    }
}