import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, setTodo } from "./store/todo";
import { getUser } from "./store/user";
import toast, { Toaster } from 'react-hot-toast';
import AllTodo from "./components/AllTodo";
import ActiveTodo from "./components/ActiveTodo";
import ExpiredTodo from "./components/ExpiredTodo";
import { setActive } from "./store/active";
import { Add } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Button, Dialog, DialogTitle } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    addBtn:{
        display:"flex",
        marginLeft:"auto",
        marginRight:"auto",
        color:"white",
        fontWeight:"bold",
        border:"solid 0.2rem white",
        
    },

    dialogBody:{
        padding:"1rem",
        display:"flex",
        flexDirection:"column",
        gap:"0.5rem",
        
    },

    inputField:{
        background:"none",
        padding:"0.2rem",
        color:"black",
        outline:"none",
        borderRadius:"0.2rem",
    },

    switchTab:{
        display:"flex",
        flexDirection:"row",
        gap:"1rem",
        padding:"1rem",
        justifyContent:"center"
    },
    swithchBtn:{
        color:"white",
        border:"0.1rem solid grey",
    
    }
}));

const notify = () => toast.success('Your Todo Added.');

const TodoPage = () => {
    const [tab, setTab] = useState(<AllTodo />)
    const TodoDetails = useSelector(getTodo);
    const UserDetail = useSelector(getUser);
    const [form, setForm] = useState("");
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();



    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTodo(form));
        dispatch(setActive(form));
        handleClose();
        notify();
    }

    return(
        <div style={{paddingTop:"0.5rem"}}>
            <h1 style={{padding:"1rem"}}>Welcome {UserDetail}</h1>

            <Button variant="outlined" endIcon={<Add />} className={classes.addBtn} onClick={() => setOpen(true)}>
                Add Todo
            </Button>

            <div className={classes.switchTab}>
                <Button className={classes.swithchBtn} onClick={() => setTab(<AllTodo />)}>All</Button>
                <Button className={classes.swithchBtn} onClick={() => setTab(<ActiveTodo />)}>Active</Button>
                <Button className={classes.swithchBtn} onClick={() => setTab(<ExpiredTodo />)}>Expired</Button>
            </div>

            <div>
                {tab}
            </div>

            <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Your Todo</DialogTitle>
                    <form onSubmit={handleSubmit} className={classes.dialogBody}>
                        <input type="text" placeholder='Todo' required className={classes.inputField} value={form} 
                            onChange={(e) => setForm(e.target.value)}
                        />
                        <button className={classes.btn} type="submit">Add</button>
                    </form>
                </Dialog>
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>  
    )
}

export default TodoPage;