import { getTodo } from "@/store/todo";
import { Card, CardHeader, Grid } from "@mui/material";
import { useSelector } from "react-redux";


const AllTodo = () => {
    const AllTodo = useSelector(getTodo);

    return(
        <div>
            <h1  style={{textAlign:"center"}}>All todo</h1>

            <Grid container spacing={2} style={{display:"flex",justifyContent:"center"}}>
                {AllTodo.map((e,i) => {
                    return(
                        <Grid item xs={12} sm={4} md={4} key={i} >
                            <Card style={{backgroundColor:"#ced8db"}}>
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