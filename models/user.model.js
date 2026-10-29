// A model tells you how your mogodb structure looks like 

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type:String,
      required:true,
      unique: true,
      lowercase:true,
      trim:true,
      minLenght:1,
      maxLenght:30,

    },

    password:{
      type:String,
      required:true,
      minLenght:6,
      maxLenght:58,
      trim:true
    },

    email:{
      type:String,
      required:true,
      trim:true,
      unique:true,
      lowercase:true,


    }

  },
  {
    timestamps:true

    }
)

userSchema.pre("save", async function(){
  if(!this.isModified("password"))
     return 
  this.password = await bcrypt.hash(this.password,  10);
  // next()

  
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema)