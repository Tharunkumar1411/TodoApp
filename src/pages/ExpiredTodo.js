import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getExpire, } from "../store/expire";
import styles from "../styles/Home.module.css";

const ExpiredTodo = () => {
    const ExpireTodo = useSelector(getExpire);
    const dispatch = useDispatch();

    return(
        <div>

            <Grid container spacing={2} style={{display:"flex",justifyContent:"center"}}>
                {(ExpireTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5 className="text-2xl font-bold pb-2">Empty Todo</h5>
                </div>
                : ExpireTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i}>
                            <Card className="md:w-96 w-full border-l-4 border-indigo-500">
                                <CardHeader title={e[0]} subheader={`Ends In: ${e[4].slice(0,10)}`}/>
                            </Card>
                        </Grid>
                    )
                })}
                
            </Grid>
        </div>
    )
}

export default ExpiredTodo;