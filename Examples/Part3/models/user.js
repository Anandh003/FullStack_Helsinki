const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
    maxLength: 32,
    validate: {
      validator: (name) => name.length && /^[A-Za-z][a-zA-Z0-9_]{7,29}$/.test(name),
      message: 'Invalid User Name.'
    }
  },
  passwordHash: String,
  name: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
