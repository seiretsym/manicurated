import mongoose, { Schema, Document } from 'mongoose';

// photo type
interface Photo extends Document {
  url: string,
}

// define model
const PhotoSchema = new Schema<Photo>({
  url: {
    type: String,
  }
})

// export model
export default mongoose.model<Photo>("Photo", PhotoSchema);