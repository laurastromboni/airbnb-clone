const mongoose = require("mongoose");

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  listing_id : [{listingId : {type : Schema.Types.ObjectId, ref: "Listing"}}],
  reviewer_id : [{reviewerId : {type : Schema.Types.ObjectId, ref: "Listing"}}],
  comments : {type : String,},
  date : {type : Date},
}, {
  timestamps : true
});


const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;