import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
 
  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToTheDatabase();    
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

  }
 
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

  }
 
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
  }
  private initializeErrorHandling(){
    this.app.use(errorMiddleware);
  }
}
 
export default App;
