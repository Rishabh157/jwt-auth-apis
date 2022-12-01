const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://Rahul:SklvMYPQ8OjA7EYs@cluster0.3z86cw7.mongodb.net/intern-22")
        console.log("MongoDb Connection Successfull")
    } catch (err) {
        console.log("Something Went Wrong with Database");
        process.exit(1);
    }
}

module.exports = connectDb
