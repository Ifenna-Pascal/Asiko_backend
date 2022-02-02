const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
       userId: {
           type: Schema.Types.ObjectId,
           ref: "user",
           required: true
       },
       imageUrl: {
           type: String,
           required: true
       },
       caption: {
           type:String,
           required: true
       }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('post', postSchema);

module.exports = Post;