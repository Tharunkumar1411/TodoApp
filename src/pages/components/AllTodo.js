import { Card, CardHeader, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { getTodo } from "../../store/todo";
import styles from "../../styles/Home.module.css";


const AllTodo = () => {
    const AllTodo = useSelector(getTodo);

    return(
        <div>
            <h1  style={{textAlign:"center"}}>All todo</h1>

            <Grid container spacing={2} style={{margin:"0.4rem"}}>
                {(AllTodo.length == 0)? <div className={styles.notFound}>
                    <h5>Empty Todo</h5>
                </div>
                : 
                AllTodo.map((e,i) => {
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

export default AllTodo;