import connectDB from "@/Middleware/DbConnect";
import User from "@/Models/User";

const Auth = async(req,res) => {
    console.log("hi")
    if(req.method == 'POST'){
        console.log("post")
        const body = req.body.name;
        const findUser = User.findOne({name: body}).then((data) => {
            console.log(data);
            if(data == null){
                const profile = new User({
                    name: body,
                });
                profile.save();
                res.status(200).send({info:data, message:'User Added'});
            }else{
                res.status(200).send({info:data, message:'User Exist'});
            }
        })

        //console.log(findUser.length)

    }else if(req.method=='GET'){
        const d = await User.find({});
        res.status(200).send(d);
    }
}

export default connectDB(Auth);