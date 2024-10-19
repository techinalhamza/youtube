import mongoose, { Aggregate, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoScheema = new Schema(
  {
    videoFile: {
      type: String, // Cloudnary URL
      required: true,
    },
    thumbnail: {
      type: String, // Cloudnary URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoScheema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoScheema);
