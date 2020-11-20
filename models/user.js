const mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose'),
Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',userSchema);

module.exports = User;