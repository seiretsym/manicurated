import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import Profile from "../profile";

// user type
interface User extends Document {
  email: string,
  password: string,
  profile: Schema.Types.ObjectId;
}

// model method type
interface UserMethods extends User, Document {
  validatePassword(password: string): boolean
}

// define model
const UserSchema = new Schema<UserMethods>({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true
  }
})

// create method for validating password
UserSchema.methods.validatePassword = function (this: UserMethods, password: string) {
  // return true or false based on comparison
  return bcrypt.compareSync(password, this.password);
}

// create hook for password encryption
UserSchema.pre("save", function (this: User, next: Function) {
  // check if this.password has been modified (it should be since it's a required field)
  if (this.isModified("password")) {
    // change the password stored in db to a hashed version
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  };
  // continue
  return next();
})

// cascade hook: delete attached profile
UserSchema.pre("deleteOne", function (this: User, next: Function) {
  Profile.deleteOne({ _id: this.profile }).then(() => next())
})

// export model
export default model<UserMethods>("User", UserSchema)