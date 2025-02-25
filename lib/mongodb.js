import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
    throw new Error("URI not found")
}

let cached = global.mongoose || {conn:null,promise:null}

async function connectDB() {
    if(cached.conn){
        return cached.conn
    }
    
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{}).then((mongoose)=>mongoose);
    }
    
    cached.conn = await cached.promise
    console.log("Here")
    return cached.conn
}

export default connectDB