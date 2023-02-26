import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../store/user'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'

import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'


export default function Home() {
  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const UserDetails = useSelector(getUser);
  const router = useRouter();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const checkUserNameAvailable = UserDetails.includes(form);

    if(!checkUserNameAvailable){
      const checkUser = axios.post("http://localhost:3000/api/auth",{name:form});
      const toast =  await toast.success("Account Created");
      router.push("/TodoPage");
    }else{
      toast.error('Username Already Exist');
    }
  }


  useEffect(() => {
    const getUser = axios.get("http://localhost:3000/api/auth").then((data) => {
      dispatch(setUser(data.data));
    });
  },[])


  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Basic Todo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      
        <div className={styles.center}>
            <h1>ToDo App 📝</h1>

          <form className={styles.indexBody} onSubmit={handleSubmit}>
            <input type="text" placeholder='UserName' required className={styles.inputField} value={form.trim()} 
              onChange={(e) => setForm(e.target.value)}
            />
            <button className={styles.btn} type="submit">Get Started</button>
          </form>

          <div style={{padding:"0.2rem"}}>
            <IconButton color="primary" onClick={() => window.open("https://github.com/Tharunkumar001",'_blank')}><GitHub /></IconButton>
            <IconButton color="primary" onClick={() => window.open("https://www.linkedin.com/in/tharunkumar1411/",'_blank')}><LinkedIn /></IconButton>
            <IconButton color="primary" onClick={() => window.open("https://twitter.com/tharunkumar1411",'_blank')}><Twitter /></IconButton>

          </div>
        </div>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </main>
    </>
  )
}
