const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName : {type : String, required : true, minlength : 2},
  email : {type : String, required : true, unique : true},
  encryptedPassword : {type : String,},
  role : {type : String, enum : ["normal", "admin"], default : "normal"},
  picture_url : String,
  host_about : String,
  host_response_rate : Number,
  listing_id : [{listingId : {type : Schema.Types.ObjectId, ref: "Listing"}}],
  legal : Boolean,
}, {
  timestamps : true
});


userSchema.virtual("isAdmin").get(function(){
  return this.role === "admin";
})

const User = mongoose.model("User", userSchema)

module.exports = User;

