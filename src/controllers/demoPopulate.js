import mongoose from "mongoose";
import { Story } from "../models/DemoPopulate";

export const demoPopulate  = async (req,res)=>{
    try {
        const author = new Person({
            _id: new mongoose.Types.ObjectId(),
            name: "Minhhv",
            age:20,

        });
        await author.save();
        const story1 = new Story({
            title: "Casino Royale",
            author: author._id,
        });

        story1.save();
    } catch (error) {
        console.log(error);
    }
}