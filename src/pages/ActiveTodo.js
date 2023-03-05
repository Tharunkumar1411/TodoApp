import { getUserDetails } from "@/store/user";
import { CardActions, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { getActive, removeActive, setActive } from "../store/active";
import { setExpire } from "../store/expire";
import styles from "../styles/Home.module.css";


const ActiveTodo = () => {
    const ActiveTodo = useSelector(getActive);
    const dispatch = useDispatch();
    const username = useSelector(getUserDetails);

    const [expire, setExpire] = useState({name:'',todoId:'',todo:'',status:'Achieved',startTime:''});
    const [open, setOpen] = useState(false);
    const [dialog, setDialog] = useState("")
    
    const handleDone = (e,type) =>{
        setOpen(true);
        setDialog(type);
        setExpire({...expire, name:username.name, todo:e[0], todoId:e[1], startTime:e[3]})
    }

    const handleAchieved = () => {
            const addExpire = axios.post('https://todo-app-tharunkumar.vercel.app/api/updateExpire',expire).then((data)=>{
                //console.log(data);
            });

            const removeApi = axios.put("https://todo-app-tharunkumar.vercel.app/api/updateExpire",{name:username.name,todoId:expire.todoId}).then((data)=>{
                toast.success("Todo Achieved");
            });

            setOpen(false);
        }

        const handleRemove = () => {
            const removeApi = axios.put("https://todo-app-tharunkumar.vercel.app/api/updateExpire",{name:username.name,todoId:expire.todoId}).then((data)=>{
                toast.success("Todo Achieved");
            });

            setOpen(false);
        }
    const apicall = async() => {
        axios.put("https://todo-app-tharunkumar.vercel.app/api/todo",{name: username.name}).then((data)=>{
            var arr = [];
            var ele = data.data.todo;
            ele.map((e,i)=>{
                arr.push([e.todo,e.todoId,e.status,e.timeEnd,e.timeStart])
            });
            dispatch(setActive(arr));
    });
        return true;
    }

    useEffect(() => {
        (async () => {
            const wait = await apicall();
            // setLoading(false)
        })();
    },[open]);

    return(
        <div>
            <Grid container spacing={4}>
                {(ActiveTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5 className="text-2xl font-bold pb-2">No Active Todo</h5>
                </div>
                :
                ActiveTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} className="">
                            <Card className="md:w-96 w-full border-l-4 border-indigo-500">
                                <CardHeader title={e[0]} subheader={`Ends In: ${e[4].slice(0,10)}`}/>
                                <CardActions>
                                    <Button variant="outlined" size="small" color="success" onClick={() => {handleDone(e,"Achieved");}}>Completed ✅</Button>
                                    <Button variant="outlined" size="small" color="error" onClick={() => handleDone(e,"Remove")}>Delete Todo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Dialog 
                open={open}
                onClose={()=>setOpen(false)}
            >
                <DialogTitle><strong>🚩Comfirmation Dialog</strong></DialogTitle>
                <DialogContent>(This action can't be undone)</DialogContent>

                <DialogContent>
                    <h1 className="font-bold">{expire.todo}</h1>
                </DialogContent>
                
                <DialogActions>
                    {(dialog != 'Achieved')? 
                    <Button variant="outlined" color="error" onClick={handleRemove}>Remove Todo</Button>:
                    <Button variant="outlined" color="success" onClick={handleAchieved}>Todo Achieved</Button>
                    }
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ActiveTodo;