const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        //mongodb connection
        const con = await mongoose.connect("mongodb+srv://admin:admin123@cluster0.zozdp.mongodb.net/books?retryWrites=true&w=majority")
    
        console.log('MongoDB connected');
    
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB