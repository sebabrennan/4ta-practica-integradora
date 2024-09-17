import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from "uuid";

export const productCollectionName = "products"

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true, default: uuidv4() },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array },
  owner: { type: String, required: true, default: "admin",  }
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(
  productCollectionName,
  productSchema
);
