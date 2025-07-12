import mongoose from "mongoose";

export const ConnectDb=async()=>{
    try {
         const connection= await mongoose.connect(
         "mongodb+srv://brandlktm:Ktmnp%40122@cluster0.gqfiqft.mongodb.net/mydbname?retryWrites=true&w=majority"

    )
    return connection

}
        
catch (error) {
        console.log(error)
        
    }}
   