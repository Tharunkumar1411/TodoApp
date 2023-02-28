import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import { getActive, removeActive } from "../store/active";
import { setExpire } from "../store/expire";
import styles from "../styles/Home.module.css";


const ActiveTodo = () => {
    const ActiveTodo = useSelector(getActive);
    const dispatch = useDispatch();


    const handleDone = (value) => {
        var tempArr = ActiveTodo.filter((item) => item !== value);
        
        dispatch(removeActive(tempArr));
        dispatch(setExpire(value));
    }
    return(
        <div>

            <Grid container spacing={2} style={{display:"flex",justifyContent:"center"}}>
                {(ActiveTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5 className="text-2xl font-bold pb-2">Empty Todo</h5>
                </div>
                :
                ActiveTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} >
                            <Card style={{backgroundColor:"#ced8db"}}>
                                <CardHeader title={e} />
                                <Button onClick={() => handleDone(e)}>Completed ❔</Button>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
    
        </div>
    )
}

export default ActiveTodo;