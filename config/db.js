const mongoose=require('mongoose');

const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log(`connected to database ${mongoose.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}
module.exports=connectdb;