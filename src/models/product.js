import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        lowercase: true,
    }  ,
    slug:{
        type: String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        // required: true,
    },
    price:{
        type: Number,
        require:true,
    },
    image:{
        type: String,
    }   ,
    description:{
        type: String,
    }   ,
    image:{
        type: String,
    },
    gallery:{
        type: Array,
    }     
    ,countInStock:{
        type: Number,
        default: 0,
    }   
    ,
    discount:{
        type: Number,
        default: 0,
    },
    featured:{
        type: Boolean,
        default: false,
    },
    tags:{
        type: Array,
    }      
},{timestamps: true, versionKey: false}

)
productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);