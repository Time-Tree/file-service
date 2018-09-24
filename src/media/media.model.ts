import * as mongoose from "mongoose";
import { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

export interface IMedia extends Document {
  entityName?: string;
  foreignId: string;
  deleted: boolean;
  blobName: string;
  containerName: string;
  contentType: string;
}

const MediaSchema = new Schema({
  foreignId: {
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  blobName: {
    type: String,
    required: true
  },
  containerName: {
    type: String,
    required: true
  },
  entityName: {
    type: String,
    required: false
  },
  contentType: {
    type: String,
    required: true
  }
});

const MediaModel: Model<IMedia> = mongoose.model(
  "media",
  MediaSchema
) as mongoose.Model<IMedia>;
export default MediaModel;
