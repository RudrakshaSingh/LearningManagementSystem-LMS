import mongoose from "mongoose";

mongoose.set("strictQuery", false); //mongoose configuration. query will not be done in strict mode .if extra query parameter is passed to save or get ,ignore them if it not exits do not give error

const connectionToDb = async () => {
    try {
        const {
            connection,
        } = //connect in async fashion
            await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/LMS");

        if (connection) {
            console.log(`connected to mongodb:${connection.host}`);
        }
    } catch (e) {
        console.log(e);
        process.exit(1); //to kill or terminate server
    }
};

export default connectionToDb;
