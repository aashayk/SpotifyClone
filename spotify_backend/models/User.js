const mongoose = require("mongoose");
// How to create model
// step 1 : require mongoose
//step 2 : create a mongoose schema
// step 3 : create a model

const User = new mongoose.Schema({
    firstName:{
        type: String,
        required : true,
    },
    lastName:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    likedSongs:{
        type:String,
        default:"",
    },
    likedPlaylist:{
        type:String,
        default:"",
    },
    subscribedArtists:{
        type:String,
        default:"",
    }
});

const UserModel = mongoose.model("User",User);

module.exports = UserModel;