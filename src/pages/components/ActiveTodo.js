import { Button, Card, CardHeader, Grid, makeStyles } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getActive, removeActive } from "../../store/active";
import { setExpire } from "../../store/expire";
import { getTodo } from "../../store/todo";
import styles from "../../styles/Home.module.css";


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
            <h1 style={{textAlign:"center"}}>Active todo</h1>

            <Grid container spacing={2} style={{margin:"0.4rem"}}>
                {(ActiveTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5>Empty Todo</h5>
                </div>
                :
                ActiveTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} >
                            <Card>
                                <CardHeader title={e} />
                                <Button onClick={() => handleDone(e)}>Done</Button>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
    
        </div>
    )
}

export default ActiveTodo;