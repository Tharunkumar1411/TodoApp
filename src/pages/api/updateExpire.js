import connectDB from "@/Middleware/DbConnect";
import ActiveTodo from "@/Models/ActiveTodo";
import ExpiredTodo from "@/Models/ExpiredTodo";

const Expire = async(req,res) => {
    //console.log('getting')
    if(req.method == 'POST'){
            const updateExpire = new ExpiredTodo({
                name: req.body.name,
                todo: req.body.todo,
                todoId: req.body.todoId,
                timeStart: req.body.start,
                status: req.body.status,
            });
            await updateExpire.save();
            res.status(200).send({info:true, message:'Achieved Todo Added'})

    }else if(req.method == 'PUT'){
        const removeTodo = ActiveTodo.deleteOne({"todoId":req.body.todoId}).then((data)=>{
            res.status(200).send({info:true, message:'Todo Removed'});
        });
    }
}

export default connectDB(Expire);