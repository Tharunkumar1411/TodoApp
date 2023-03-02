import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserDetails } from "../store/user";
import toast, { Toaster } from 'react-hot-toast';

import { getActive, setActive } from "../store/active";
import Button from "@mui/material/Button";
import  Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogActions";
import ReactLoading from 'react-loading';

import styles from "../styles/Home.module.css";
import AllTodo from "./AllTodo";
import ActiveTodo from "./ActiveTodo";
import ExpiredTodo from "./ExpiredTodo";
import ProfilePage from "./Profile";
import axios from "axios";
import { DialogContent } from "@mui/material";

const TodoPage = () => {
    const [tab, setTab] = useState()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("text");
    const [active, setActiv] = useState({all:false, act:false, achieved:false});
    const username = useSelector(getUserDetails);



    const [todo, setTodo] = useState({name:username.name, todo:'',end:'',way:'getTodo'});
    const [form, setForm] = useState("");
    const [open, setOpen] = useState(false);

    const handleClick = (val) => {
        if(val == 'All'){ 
            setActiv({...active, all:true, act:false, achieved:false});
            setTab(<AllTodo />)
        }else if(val == 'Active'){
            setActiv({...active, all:false, act:true, achieved:false});
            setTab(<ActiveTodo />)
        }else if(val == 'Achieved'){
            setActiv({...active, all:false, act:false, achieved:true});
            setTab(<ExpiredTodo />)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post("https://todo-app-tharunkumar.vercel.app/api/todo",todo).then((data) => {
            if(data.data.info){
                toast.success(`${data.data.message}`);
            }else{
                toast.error(`${data.data.message}`)
            }
            setOpen(false);
        });
    }

    return(
    <div>
        {(loading == true) ? 
        <div className="flex justify-center">
            <ReactLoading type={"bubbles"} color={"blue"} height={'20%'} width={'20%'} 
            />
        </div>
        :
        <div>
            <div className="flex flex-row gap-2 m-2 p-2">
                <h1 className="text-2xl font-bold pb-2 border-b-4 border-sky-200">{username.name}</h1>
                {/* <div className="flex justify-evenly">
                    <button className="border-b-4 border-sky-200 rounded-md">Profile</button>
                    <button className="border-b-4 border-red-200 pl-2 pr-2 rounded-md">Logout</button>
                </div> */}
            
            </div>
            <div className="flex flex-col gap-4">
                <button className="mx-auto p-2 rounded-md w-32 text-blue-500 border border-sky-500"
                    onClick={()=>setOpen(true)}
                >
                    Add Todo +</button>
                
                <div className="flex flex-row gap-8 justify-center mt-8">
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

            <div className="m-4">
                {(!true)? <ProfilePage /> : tab}
            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Dialog 
                open={open}
                onClose={()=>setOpen(false)}
            >

                <DialogContent >
                <h1 className="text-center text-2xl font-bold pb-2">Add Your Todo</h1>

                    <form className="flex flex-col pb-4 w-64" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Todo" className={styles.inputField} 
                            value={todo.todo} onChange={(e)=> setTodo({...todo, todo:e.target.value})} required
                        />

                        <input type={type} onFocus={()=>setType("date")} placeholder="Todo End Date" className={styles.inputField} 
                            value={todo.end} onChange={(e)=> setTodo({...todo, end:e.target.value})} required
                        /><br />
                        
                        <button type="submit" className="mx-auto p-1 rounded-md w-32 text-blue-500 border border-sky-500">Add ➡️</button>

                    </form>

                </DialogContent>
            </Dialog>
        </div>  
        }
    </div>
    )
}

export default TodoPage;