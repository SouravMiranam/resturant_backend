const testusercontroller=(req,res)=>{
try{
    // res.status(200).send({
    //     success:true,
    //     message:'test user data api'
    // })
    res.status(200).send({message:"test user data api"});
}
catch(err){
    console.log(err);
}
}
module.exports=testusercontroller;