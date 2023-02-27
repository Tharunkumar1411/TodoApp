import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, setTodo } from "../store/todo";
import { getUser, getUserDetails } from "../store/user";
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
import ProfilePage from "./Profile";
import axios from "axios";
import { DialogContent } from "@mui/material";

const notify = () => toast.success('Your Todo Added.');

const TodoPage = () => {
    const [tab, setTab] = useState()
    const dispatch = useDispatch();

    const [type, setType] = useState("text");
    const [active, setActive] = useState({all:false, act:false, achieved:false});
    const username = useSelector(getUserDetails)
    const [todoForm, setTodo] = useState({name:username.name,todo:'', start:Date.now ,end:'',status:'',todoId:''})
    const [form, setForm] = useState("");
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
    }

    const handleClick = (val) => {
        if(val == 'All'){
            setActive({...active, all:true, act:false, achieved:false});
        }else if(val == 'Active'){
            setActive({...active, all:false, act:true, achieved:false});
        }else if(val == 'Achieved'){
            setActive({...active, all:false, act:false, achieved:true});
        }
    }

    useEffect(() => {
        // axios.put("http://localhost:3000/api/todo",userData).then((data)=>{
        //     console.log(data);
        // })
    })

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(setTodo(form));
    //     dispatch(setActive(form));
    //     handleClose();
    //     notify();
    //     // axios.get("http://localhost:3000/api/hello").then((data) => {
    //     //     console.log(data);
    //     // })
    // }

    return(
        <div>
            <div className="flex flex-row gap-2 m-2 p-2">
                <h1 className="text-2xl font-bold pb-2 border-b-4 border-sky-200">ToDo App</h1>
                {/* <div className="flex justify-evenly">
                    <button className="border-b-4 border-sky-200 rounded-md">Profile</button>
                    <button className="border-b-4 border-red-200 pl-2 pr-2 rounded-md">Logout</button>
                </div> */}
            
            </div>
            <div className="flex flex-col gap-4">
                <button className="mx-auto p-2 rounded-md w-32 text-blue-500 border border-sky-500">Add Todo +</button>
                
                <div className="flex flex-row gap-8 justify-center">
                    <Button 
                        variant = {(active.all)? 'outlined':'none'}
                        onClick = {()=> handleClick('All')}
                    >
                        All
                    </Button>
                    <Button 
                        variant = {(active.act)? 'outlined':'none'}
                        onClick = {()=> handleClick('Active')}
                    >
                        Active
                    </Button>
                    <Button 
                        variant = {(active.achieved)? 'outlined':'none'}
                        onClick = {()=> handleClick('Achieved')}
                    >
                        Achieved
                    </Button>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <ProfilePage />
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Dialog 
                open={open}
            >
                <DialogTitle className="flex justify-center text-2xl font-bold pb-2">Add Your Todo</DialogTitle>

                <DialogContent >
                    <form className="flex flex-col pb-4 w-64">
                        <input type="text" placeholder='Your Todo' required className={styles.inputField} value={todoForm.todo} 
                            onChange={(e) => setForm({...todoForm, todo:e.target.value})}
                        />

                        <input type={type}  onFocus={()=>setType("date")} placeholder='Todo End Time' required className={styles.inputField} value={todoForm.end} 
                        onChange={(e) => setForm({...todoForm, end:e.target.value})}
                        />
                        
                    </form>
                    <button type="submit" className="mx-auto p-2 rounded-md w-32 text-blue-500 border border-sky-500">Add ➡️</button>

                </DialogContent>
            </Dialog>
        </div>  
    )
}

export default TodoPage;