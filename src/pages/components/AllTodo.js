import { Button, Card, CardContent, CardHeader, Grid, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getActive, removeActive } from "../store/active";
import { setExpire } from "../store/expire";
import { getTodo } from "../store/todo";

const useStyles = makeStyles((theme) => ({
    card:{
        width:"fit-content"
    }
}));

const AllTodo = () => {
    const classes = useStyles();
    const AllTodo = useSelector(getTodo);

    return(
        <div>
            <h1>All todo</h1>

            <Grid container spacing={2} style={{margin:"0.4rem"}}>
                {AllTodo.map((e,i) => {
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

export default AllTodo;