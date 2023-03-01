import { CardActions } from "@mui/material";
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

                {(ActiveTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5 className="text-2xl font-bold pb-2">Empty Todo</h5>
                </div>
                :
                ActiveTodo.map((e,i) => {
                    return(
                        <Grid container spacing={2} className="">
                        <Grid item xs={12} sm={4} md={4} key={i} className="m-1">
                            <Card className="md:w-96 w-full border-l-4 border-indigo-500">
                                <CardHeader title={e[0]} subheader={`Ends In: ${e[4].slice(0,10)}`}/>
                                <CardActions>
                                    <Button variant="outlined" size="small" color="success" onClick={() => handleDone(e)}>Completed ✅</Button>
                                    <Button variant="outlined" size="small" color="error" onClick={() => handleDone(e)}>Delete Todo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        </Grid>

                    )
                })}

        </div>
    )
}

export default ActiveTodo;