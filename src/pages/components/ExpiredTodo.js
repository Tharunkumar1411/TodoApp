import { Card, CardHeader, Grid, } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getExpire, } from "../../store/expire";
import styles from "../../styles/Home.module.css";

const ExpiredTodo = () => {
    const ExpireTodo = useSelector(getExpire);
    const dispatch = useDispatch();

    return(
        <div>
            <h1  style={{textAlign:"center"}}>Expire todo</h1>

            <Grid container spacing={2} style={{margin:"0.4rem"}}>
                {(ExpireTodo.length == 0)? 
                <div className={styles.notFound}>
                    <h5>No Data Found</h5>
                </div>
                : ExpireTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} >
                            <Card>
                                <CardHeader title={e} />
                            </Card>
                        </Grid>
                    )
                })}
                
            </Grid>
        </div>
    )
}

export default ExpiredTodo;