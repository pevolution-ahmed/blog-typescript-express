import * as mongoose  from "mongoose";
import User from "./user.interface";

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
  });
const UserSchema = new  mongoose.Schema({
    username : String,
    password : String,
    email    : String,
    age      : Number,
    birthday : Date,
    address  : addressSchema
});

const userModel = mongoose.model<User & mongoose.Document>('User',UserSchema);
export default userModel;
