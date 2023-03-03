const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(URL)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("phoneBook", phoneBookSchema);
