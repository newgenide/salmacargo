import mongoose from "mongoose";

export async function generateTracking(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


export async function connectDb(){
    try{
        if (mongoose.connections[0].readyState) {
            // If we have an existing connection, return it
            return mongoose.connection;
        }
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected');
        return connection;
    }catch(error:any){
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw the error for better error handling
    }
}