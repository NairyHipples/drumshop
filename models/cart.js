module.exports = function Cart(initItems) {
    this.items = initItems;

    this.totalQty = 0;
    this.totalPrice = 0;

    if (this.items) {
        for (var key in this.items) {
            this.totalQty += this.items[key].qty;
            this.totalPrice += this.items[key].qty * this.items[key].item.price;
        }
    }

    this.add = function (item, id) {
        //checking if item id already exists in the cart
        var storedItem = this.items[id];
        //if not
        if (!storedItem) {
            //creating a new entry, giving it a key and assigning it to the stored item
            storedItem = this.items[id] = {qty: 0, item: item, price: 0};
        }
        //update quantity by 1
        storedItem.qty++;
        //adjust price
        storedItem.price = storedItem.item.price * storedItem.qty;
        //update total quantity
        this.totalQty++;
        //update total price
        this.totalPrice += storedItem.price;
    };

    //defining cart items as an array so the items can be put in a list
    this.generateArray = function () {
        var arr = [];
        //loop through key for the items
        for (var id in this.items) {
            //push the value of each items
            arr.push(this.items[id]);
        }
        return arr;
    };
};
