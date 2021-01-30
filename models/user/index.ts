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
export interface UserMethods extends User, Document {
  validatePassword(password: string): boolean
}

// define model
const UserSchema = new Schema<UserMethods>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }
})


// create method for validating password
UserSchema.methods.validatePassword = function (this: UserMethods, password: string) {
  // return true or false based on comparison
  return bcrypt.compareSync(password, this.password);
}

// create hook for password encryption
UserSchema.pre("save", async function (this: User, next: Function) {
  // check if this.password has been modified (it should be since it's a required field)
  if (this.isModified("password")) {
    // change the password stored in db to a hashed version
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  };

  // create a profile to attach to user
  const profile = await Profile.create({})

  // set profile id
  this.profile = profile._id;

  // continue
  return next();
})

// custom validation, for the purpose of creating a profile in the pre-save hook
UserSchema.pre("validate", async function (this: User, next: Function) {
  // attempt to find email used in registration in db
  const user = UserModel.findOne({ email: this.email })

  if (user) {
    // throw error if found
    return next({ error: "Email already exists." })
  } else {
    // continue if not
    return next()
  }

})

// cascade hook: delete attached profile
UserSchema.pre("deleteOne", async function (this: User, next: Function) {
  await Profile.deleteOne({ _id: this.profile })
  next();
})

const UserModel = model<UserMethods>("User", UserSchema);

// export model
export default UserModel