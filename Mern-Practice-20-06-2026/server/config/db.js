import mongoose from "mongoose";

const db = async ()=>{
    try {
        const res = await mongoose.connect(process.env.mongo_URL);
        if(res){
            console.log("Mongo DB connected successfully..");
        }else{
            console.log("Mongo DB connection failed!!");
            
        }
    } catch (error) {
        console.log("Mongo DB error", error);
        
    }
}

export default db;