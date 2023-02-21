import { Button, Card, CardHeader, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getExpire, } from "../store/expire";

const useStyles = makeStyles((theme) => ({
    card:{
        width:"fit-content"
    }
}));


const ExpiredTodo = () => {
    const classes = useStyles();
    const ExpireTodo = useSelector(getExpire);
    const dispatch = useDispatch();

    return(
        <div>
            <h1>expire todo</h1>

            <Grid container spacing={2} style={{margin:"0.4rem"}}>
                {ExpireTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} >
                            <Card >
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