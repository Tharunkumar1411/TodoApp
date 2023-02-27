import connectDB from "@/Middleware/DbConnect";
import User from "@/Models/User";

const Auth = async(req,res) => {
    if(req.method == 'POST'){
        
        const findUser = User.findOne({name: req.body.name}).then((data) => {
            if(data == null){
                const profile = new User({
                    name: req.body.name,
                    password: req.body.password,
                    teleId: req.body.teleId
                });
                profile.save();
                res.status(200).send({info:true, message:'New User Added'});
            }else{
                if(data.password == req.body.password){
                    res.status(200).send({info:false, message:'Username Already Exist'});
                }else{
                    res.status(200).send({info:false, message:'Wrong Password'});
                }
            }
        })

        //console.log(findUser.length)

    }else if(req.method == 'GET'){
        const d = await User.find({});
        var users = [];
        d.map((e,i)=>  {
            users.push(e.name);
        });
        res.status(200).send(users);
    }else if(req.method == 'PUT'){
        const findUser = User.findOne({name: req.body.name}).then((data) => {
            if(data.password == req.body.password){
                res.status(200).send({info:true, message:'Login Successful'});
            }else{
                res.status(200).send({info:false, message:'Wrong Password'});
            }
        })
    }
}

export default connectDB(Auth);