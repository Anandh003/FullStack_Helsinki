const { mongoose } = require("mongoose");

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log("Invalid argurments. Args can be 'password, name, phonenumber' ");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.ftkxjif.mongodb.net/Phonebook?retryWrites=true&w=majority`;
let userName = "";
let phoneNumber = "";

if (process.argv.length > 3) {
  userName = process.argv[3];
  phoneNumber = process.argv[4];
}

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const phoneBookModel = new mongoose.model("phoneBook", phoneBookSchema);

if (process.argv.length === 5) {
  const newEntry = new phoneBookModel({
    name: userName,
    number: phoneNumber,
  });

  newEntry.save().then((result) => {
    console.log(`Added ${userName} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
} else {
  phoneBookModel.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
}
