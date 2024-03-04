const mongoose = require("mongoose");
// How to create model
// step 1 : require mongoose
//step 2 : create a mongoose schema
// step 3 : create a model

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  collaborators:[
    {
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
  ],
});

const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = Playlist;
