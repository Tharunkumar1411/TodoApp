import connectDB from "@/Middleware/DbConnect";
import ExpiredTodo from "@/Models/ExpiredTodo";

const Expire = async(req,res) => {
    //console.log('getting')
    if(req.method == 'POST'){

    }else if(req.method == 'PUT'){
        const removeTodo = ExpiredTodo.find({name:req.body.name}).then((data)=>{
            res.status(200).send({info:true, todo:data, message:'Achieved Todo Fetched'});
        });
    }
}

export default connectDB(Expire);