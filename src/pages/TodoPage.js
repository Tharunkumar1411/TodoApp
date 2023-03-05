import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../store/user";
import toast, { Toaster } from 'react-hot-toast';

import Button from "@mui/material/Button";
import  Dialog from "@mui/material/Dialog";
import ReactLoading from 'react-loading';

import styles from "../styles/Home.module.css";
import AllTodo from "./AllTodo";
import ActiveTodo from "./ActiveTodo";
import ExpiredTodo from "./ExpiredTodo";
import ProfilePage from "./Profile";
import axios from "axios";
import { Badge, DialogContent, Divider } from "@mui/material";
import { getActiveCount, setActiveCount, setCount } from "@/store/active";
import { getExpireCount, setExpireCount } from "@/store/expire";
import { LogoutOutlined, Person2Rounded } from "@mui/icons-material";
import { useRouter } from "next/router";

const TodoPage = () => {
    const [tab, setTab] = useState()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState("text");
    const [active, setActiv] = useState({all:false, act:false, achieved:false});
    const username = useSelector(getUserDetails);
    const router = useRouter();

    const [todo, setTodo] = useState({name:username.name, todo:'',end:'',way:'getTodo'});
    const [form, setForm] = useState("");
    const [open, setOpen] = useState(false);
    const activeCount = useSelector(getActiveCount);
    const expireCount = useSelector(getExpireCount);

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

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() =>{
            router.replace("/");
        },2000)
    }
    
    const handleProfileClick = () => {
        setActiv({...active, all:false, act:false, achieved:false});
        setTab(null);
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
    useEffect(()=>{
        (async() => { 
            const getActiveCountApi = await axios.put("https://todo-app-tharunkumar.vercel.app/api/todo",{name:username.name}).then((data)=>{
                const activeCount = data.data.todo.length;
                dispatch(setActiveCount(activeCount));
            })

            const getAchievedCountApi = await axios.put("https://todo-app-tharunkumar.vercel.app/api/getExpire",{name:username.name}).then((data)=>{
                const expireCount = data.data.todo.length;
                dispatch(setExpireCount(expireCount));
            })
    
        })();
    })
    return(
    <div>
        {(loading == true) ? 
        <div className="flex justify-center">
            <ReactLoading type={"bubbles"} color={"blue"} height={'20%'} width={'20%'} 
            />
        </div>
        :
        <div>
            <div className="flex flex-row justify-between gap-2 m-2 p-2">
                
                <h1 onClick={handleProfileClick} className="text-2xl cursor-pointer font-bold pb-1 bg-sky-500 hover:border-violet-900 border-2 rounded-md pr-2">
                    <Person2Rounded /> {username.name}
                </h1>

                <label onClick={handleLogout} className="cursor-pointer"><strong>Logout</strong>
                <LogoutOutlined className="m-2"/></label>
            </div>
            <Divider textAlign="center" className="" variant="middle"/>
            <div className="flex flex-col gap-4 pt-2">
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
                    <Badge badgeContent={activeCount} color="primary" variant="string"><Button 
                        variant = {(active.act)? 'outlined':'none'}
                        onClick = {()=> handleClick('Active')}
                    >
                        Active
                    </Button></Badge>

                    <Badge badgeContent={expireCount} color="primary" variant="string"><Button 
                        variant = {(active.achieved)? 'outlined':'none'}
                        onClick = {()=> handleClick('Achieved')}
                    >
                        Achieved
                    </Button></Badge>
                </div>
            </div>

            <div className="m-4">
                {(tab == null)? <ProfilePage /> : tab}
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