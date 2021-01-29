import mongoose, { Schema, Document } from 'mongoose';
import Item from '../item';

// collection type
interface Collection extends Document {
  name: string,
  items: Array<Schema.Types.ObjectId>
}

// define model
const CollectionSchema = new Schema<Collection>({
  name: {
    type: String
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }]
})

// cascade hook: delete items from db
CollectionSchema.pre("deleteOne", function (this: Collection, next: Function) {
  Item.deleteMany({ _id: this.items }).then(() => next());
})

// export model
export default mongoose.model<Collection>("Collection", CollectionSchema);