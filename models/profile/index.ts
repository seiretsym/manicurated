import mongoose, { Schema, Document } from 'mongoose';
import Collection from "../collection";
import Photo from "../photo";

// profile type
interface Profile extends Document {
  name: string,
  picture: string,
  collections: Array<Schema.Types.ObjectId>
  photos: Array<Schema.Types.ObjectId>
}

// define model
const ProfileSchema = new Schema<Profile>({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  collections: [{
    type: Schema.Types.ObjectId,
    ref: "Profile"
  }],
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo"
  }]
})

// cascade hook: delete collections from db
ProfileSchema.pre("deleteOne", function (this: Profile, next: Function) {
  Collection.deleteMany({ _id: this.collections }).then(() => next())
})

// cascade hook: delete photos from db
ProfileSchema.pre("deleteOne", function (this: Profile, next: Function) {
  Photo.deleteMany({ _id: this.photos }).then(() => next())
})

// export model
export default mongoose.model<Profile>("Profile", ProfileSchema);