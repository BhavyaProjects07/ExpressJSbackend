import mingoose, { Schema } from "mongoose";


const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // cloudinary Url
            required: true,
            
        },
        
        thumbnail: {
            type: String, // cloudinary Url
            required: true,
        },

        duration: {
            type: Number, // in seconds
            required: true,
        },

        views: {
            type: Number,
            default: 0,
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
        },



    },

    { Timestamps: true, }
)


export const Video = mongoose.model("Video", videoSchema);