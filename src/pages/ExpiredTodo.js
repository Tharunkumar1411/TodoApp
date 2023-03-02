import { getUserDetails } from "@/store/user";
import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpire, setExpire, } from "../store/expire";
import styles from "../styles/Home.module.css";

const ExpiredTodo = () => {
    const ExpireTodo = useSelector(getExpire);
    const dispatch = useDispatch();
    const username = useSelector(getUserDetails);

    const apicall = async() => {
        axios.put("http://localhost:3000/api/getExpire",{name: username.name}).then((data)=>{
            var arr = [];
            var ele = data.data.todo;
            ele.map((e,i)=>{
                arr.push([e.todo,e.todoId,e.status,e.timeEnd,e.timeStart])
            });
            dispatch(setExpire(arr));
    });
        return true;
    }

    useEffect(() => {
        (async () => {
            const wait = await apicall();
            // setLoading(false)
        })();
    },[]);

    return(
        <div>

            <Grid container spacing={2} style={{}}>
                {(ExpireTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5 className="text-2xl font-bold pb-2">Achieved Todo Empty</h5>
                </div>
                : ExpireTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i}>
                            <Card className="md:w-96 w-full border-l-4 border-green-500">
                                <CardHeader title={e[0]} subheader={`Achieved 😎`}/>
                            </Card>
                        </Grid>
                    )
                })}
                
            </Grid>
        </div>
    )
}

export default ExpiredTodo;