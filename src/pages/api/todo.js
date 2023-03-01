import connectDB from "@/Middleware/DbConnect";
import ActiveTodo from "@/Models/ActiveTodo";

const Todo = async(req,res) => {
    if(req.method == 'POST'){
        try {
            const create = new ActiveTodo({
                name: req.body.name,
                todo: req.body.todo,
                todoId: req.body.todoId,
                status: req.body.status,
                timeEnd: req.body.end,
            });
    
            await create.save();
            res.status(200).send({info:true, message:'Todo Added'})
        } catch (error) {
            res.status(500).send({info:false, message:`Someting went Wrong`})
        }


    }else if(req.method == 'GET'){

    }else if(req.method == 'PUT'){
        var arr = [];
            const getTodo = ActiveTodo.find({name:req.body.name}).then((data)=>{
                res.status(200).send({info:true, todo:data, message:'Active Todo Fetched'})
            });

    }
}

export default connectDB(Todo);