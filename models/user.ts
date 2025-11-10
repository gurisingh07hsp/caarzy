import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Document} from 'mongoose';
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  phone: string;
  email: string;
  password: string;
  authProvider: "credentials" | "google";
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
   authProvider: {
    type: String,
    enum: ["credentials", "google"],
    default: "credentials",
  },
  password: {
    type: String,
    required: function(this: { authProvider: string }) {
      return this.authProvider === "credentials";
    },
    min: 6
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
  },
  likedcars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
  }],
  otp: {
      code: String,
      expiresAt: Date
  },
},
 {
  timestamps: true
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_SECRET!,{expiresIn: '7d'});
    return token;
}

userSchema.statics.comparePassword = async function (password: string,hashPassword: string) {
    return await bcrypt.compare(password,hashPassword);
}
userSchema.statics.hashPassword = async function (password: string) {
    return await bcrypt.hash(password,10);
}

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
