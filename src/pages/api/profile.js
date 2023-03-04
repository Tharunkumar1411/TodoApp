import connectDB from "@/Middleware/DbConnect";
import ActiveTodo from "@/Models/ActiveTodo";
import User from "@/Models/User";

const Profile = async(req,res) => {
    if(req.method == 'POST'){

    }else if(req.method == 'PUT'){
        // const arr = []
        // // console.log(req.body.name)
        // const getActiveCount = ActiveTodo.find({name:req.body.name}).then((data)=>{
        //     console.log(data);
        // });
    }
}

export default connectDB(Profile);