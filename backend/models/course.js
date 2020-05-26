const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
    },

    courseurl: {
      type: String,
    },

    coursedata: {
      type: Array,
      default: [
        {
          sectionname: String,
          sectiondata: {
            type: Array,
            default: [
              {
                topic: String,
                videourl: String,
              },
            ],
          },
        },
      ],
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
