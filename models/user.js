var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Encrypt password when creating a new user
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true}
});

//Expects a password to be inserted
//Returns an encrypted password so I can use the encryptPassword method
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

//Check if a password matches the encrypted passwords algorithm
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
