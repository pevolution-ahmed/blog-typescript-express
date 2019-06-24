import App from './app';
import PostsController from './posts/posts.controller';
import * as mongoose from 'mongoose';
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
 
validateEnv();
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
} = process.env;
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
const app = new App(
  [
    new PostsController(),
  ]
);
 
app.listen();