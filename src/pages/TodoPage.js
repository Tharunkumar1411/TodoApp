import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, setTodo } from "../store/todo";
import { getUser } from "../store/user";
import toast, { Toaster } from 'react-hot-toast';

import { setActive } from "../store/active";
import AccountBox from "@mui/icons-material/AccountBox";
import Button from "@mui/material/Button";
import  Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogActions";

import styles from "../styles/Home.module.css";
import AllTodo from "./AllTodo";
import ActiveTodo from "./ActiveTodo";
import ExpiredTodo from "./ExpiredTodo";

const notify = () => toast.success('Your Todo Added.');

const TodoPage = () => {
    const [tab, setTab] = useState()
    const TodoDetails = useSelector(getTodo);
    const UserDetail = useSelector(getUser);
    const [form, setForm] = useState("");
    const [open, setOpen] = useState(false);
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
        // axios.get("http://localhost:3000/api/hello").then((data) => {
        //     console.log(data);
        // })
    }

    return(
        <div style={{paddingTop:"0.5rem"}}>
            <div>
                <h1  className={styles.profileDiv} style={{padding:"1rem"}}><AccountBox />{UserDetail}</h1><br />
            </div>

            <Button variant="outlined" className={styles.addBtn} onClick={() => setOpen(true)}>
                Add Todo's
            </Button>

            <div className={styles.switchTab}>
                <Button className={styles.swithchBtn} onClick={() => setTab(<AllTodo />)}>All</Button>
                <Button className={styles.swithchBtn} onClick={() => setTab(<ActiveTodo />)}>Active</Button>
                <Button className={styles.swithchBtn} onClick={() => setTab(<ExpiredTodo />)}>Expired</Button>
            </div>

            <div>
                {tab}
            </div>

            <div>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Add Your Todo</DialogTitle>
                    <form onSubmit={handleSubmit} className={styles.dialogBody}>
                        <input type="text" placeholder='Todo' required className={styles.input} value={form} 
                            onChange={(e) => setForm(e.target.value)}
                        />
                        <button className={styles.btn} type="submit">Add</button>
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