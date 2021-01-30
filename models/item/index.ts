import mongoose, { Schema, Document } from 'mongoose';

// item type
interface Item extends Document {
  name: string,
  picture: string,
  brand: string,
  tags: Array<string>
}

// define model
const ItemSchema = new Schema<Item>({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  brand: {
    type: String,
  },
  tags: [{
    type: String
  }]
})

// export model
export default mongoose.model<Item>("Item", ItemSchema);