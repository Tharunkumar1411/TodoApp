import connectDB from "@/Middleware/DbConnect";
import User from "@/Models/User";

const Auth = async(req,res) => {
    if(req.method == 'POST'){
        const body = req.body.name;
        const findUser = User.findOne({name: body}).then((data) => {
            if(data == null){
                const profile = new User({
                    name: body,
                });
                profile.save();
                res.status(200).send({info:data, message:'User Added'});
            }else{
                res.status(200).send({info:true, message:'User Exist'});
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
    }
}

export default connectDB(Auth);