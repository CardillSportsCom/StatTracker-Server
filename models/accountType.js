const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AccountTypeSchema = new Schema({
	name: String,
});

AccountTypeSchema.set("collection", "accountTypes");

module.exports = mongoose.model("AccountType", AccountTypeSchema);
