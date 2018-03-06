const mongoose = require("mongoose");

// Item Schema
const ItemSchema = mongoose.Schema({
    barCode: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    itemType: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        default: "abcd"
    },
    price: {
        type: Number,
        default: 0.0
    },
    unit: {
        type: String,
        default: "kg"
    },
    discountPercent: {
        type: Number,
        default: 0.0
    },
    discount: {
        type: Number,
        default: 0.0
    },
    discountedPrice: {
        type: Number,
        default: 0.0
    }
});

const Item = (module.exports = mongoose.model("Item", ItemSchema));

module.exports.getItems = function (callback) {
    Item.find(callback);
};
module.exports.getItemById = function (id, callback) {
    Item.findById(id, callback);
};
module.exports.getItemByBarCode = function (barCode, callback) {
    const query = {
        barCode: barCode
    };
    Item.findOne(query, callback);
};
module.exports.addItem = function (newItem, callback) {
    Item.create(newItem, callback);
};

module.exports.deleteItem = (item, callback) => {
    const query = {
        barCode: item.barCode
    };
    Item.findOne(query, (err, item) => {
        Item.findByIdAndRemove(item._id, callback);
    });
};

module.exports.updateItem = (item, options, callback) => {
    const query = {
        barCode: item.barCode
    };
    var update = {
        quantity: item.quantity,
        discountPercent: item.discountPercent,
        discount: item.discount,
        discountedPrice: item.discountedPrice,
        price: item.price
    }
    Item.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateInventory = (item, options, callback) => {

    const query = {
        barCode: item.barCode
    };
    var update = {
        quantity: item.quantity,
        itemType: item.itemType,
        itemName: item.itemName,
        price: item.price,
        unit: item.unit,
        discountPercent: item.discountPercent,
        discount: item.discount,
        discountedPrice: item.discountedPrice
    }
    Item.findOneAndUpdate(query, update, options, callback);
}
module.exports.purchaseItem = (item, options, callback) => {
    const query = {
        barCode: item.barCode
    };
    var update = {
        quantity: item.quantity,
    }
    Item.findOneAndUpdate(query, update, options, callback);
}