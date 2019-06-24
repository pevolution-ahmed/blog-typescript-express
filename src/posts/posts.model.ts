import * as mongoose from 'mongoose';
import Post from './post.interface';
 
const postSchema = new mongoose.Schema({
 author: {
    ref: 'User', // cause we name it here 'User'in
    // mongoose.model<User & mongoose.Document>('User', UserSchema); at UserModel
    type: mongoose.Schema.Types.ObjectId,
  },
  content: String,
  title: String,
});
 
const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);
// TypeScript is now aware of all the fields you
// defined in the interface and knows that it 
// can expect them to be available in the post model.
 
export default postModel;