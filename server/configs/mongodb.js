import mongoose from "mongoose";

async function conncetDB() {
    try {
        let conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default conncetDB