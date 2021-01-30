import { Schema, Document, model } from 'mongoose';
import { Profile } from '..';
import Collection from "../collection";
import Photo from "../photo";

// profile type
interface Profile extends Document {
  name: string,
  picture: string,
  collections: Array<Schema.Types.ObjectId>
  photos: Array<Schema.Types.ObjectId>
}

interface ProfileMethods extends Profile {
  cascadeDelete(): void;
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
    ref: "Collection"
  }],
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo"
  }]
})

ProfileSchema.methods.cascadeDelete = async function (this: Profile) {
  await Collection.deleteMany({ _id: this.collections })
  await Photo.deleteMany({ _id: this.photos })
  return console.log("Collections & Photos Removed");
}

// export model
export default model<ProfileMethods>("Profile", ProfileSchema);