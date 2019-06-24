import Controller from "interfaces/controller.interface";
import * as express from 'express';
import userModel from "./user.model";
import * as bcrypt from 'bcrypt';
import User from "./user.interface";
import TokenData from "./token.interface";
import * as jwt from 'jsonwebtoken';

class UserController implements Controller{
    path: string = '/user'; 
    router: express.Router;
    private user  = userModel;
    constructor(){
        this.intializeRoutes();

    }
    private intializeRoutes(){
        this.router.get(this.path,this.loggingIn);
        this.router.get(this.path,this.registeration);
        this.router.get(this.path,this.loggingOut);

        
    }
    private registeration = async(req:express.Request , res:express.Response,next:express.NextFunction)=> {
        const userData = req.body;
        //validation
       if(await this.user.findOne({email : userData.email})){
        next(new Error("Email is Already Exists in DB "));
       }else if (await this.user.findOne({username : userData.username})){
        next(new Error("Username is Already Exists in DB "));
       }
       else{
           const hashedPassword = await bcrypt.hash(userData.password,10);
           const user = await this.user.create({
               ...userData,
               password : hashedPassword
           });
           user.password = undefined;
           const tokenData = this.createToken(user);
           res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
           res.send(user);
       }

    }

    private loggingIn = async(req:express.Request , res:express.Response,next:express.NextFunction)=>{
        const userData = req.body;
        const user = await this.user.findOne({ email: userData.email });
        const matchedPassword:boolean = await bcrypt.compare(userData.password,user.password) ;
        if(user && matchedPassword){
            user.password = undefined;
            const tokenData = this.createToken(user);
            res.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
            res.send(user);
        }
        else{
            next(new Error("Wrong Credentials!"));
        }

    }

    private loggingOut = (request:express.Request , response:express.Response,next:express.NextFunction)=>{
        response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        response.send(200);

    }
    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken= {
          _id: user._id,
        };
        return {
          expiresIn,
          token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
      }
    private createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
      }


}


export default UserController;