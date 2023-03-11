const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(URL)
  .then((result) => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err.message));

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 9,
    validate: {
      validator: (v) => /\d{2,3}-\d{6,}/.test(v),
      message: (v) => `${v.value} is not valid number.`,
    },
  },
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("phoneBook", phoneBookSchema);
