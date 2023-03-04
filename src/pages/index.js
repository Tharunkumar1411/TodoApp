import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/user'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import GitHub from '@mui/icons-material/GitHub'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'
import ReactLoading from 'react-loading';

import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import backImg from "../../public/backImg.avif";
import Image from 'next/image'

export default function Home() {
  const [form, setForm] = useState({name:"",password:"",teleId:"",entry:Date.now()});
  const [type, setType] = useState({signIn:true, login:false});
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();




  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(type.signIn){
      const checkUser = axios.post("https://todo-app-tharunkumar.vercel.app/api/auth",form).then((data)=>{
        if(data.data.info){
          toast.success(`${data.data.message}`);
          dispatch(setUser(form));
          router.push("/TodoPage");
        }else{
          setLoading(false);
          setTimeout(()=>{
            toast.error(`${data.data.message}`);
          },2000)
        }
      })
    }else if(type.login){
      const getUser = axios.put("https://todo-app-tharunkumar.vercel.app/api/auth",form).then((data) => {
        if(data.data.info){
          dispatch(setUser(form));
          toast.success(`${data.data.message}`);
          router.push("/TodoPage");
        }else{
          setLoading(false);
          setTimeout(()=>{
            toast.error(`${data.data.message}`);
          },2000)
        }
      });
    }
  }


  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Basic Todo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
    
      {(loading)?  <div className="flex justify-center">
            <ReactLoading type={"bubbles"} color={"blue"} height={'20%'} width={'20%'} 
            />
        </div>
        : 
      <div >
          <Image
              src={backImg}
              quality={100}
              style={{objectFit: 'cover',layout:'fill',width:"100%",height:"100vh"}}
              
          />
        <div className={styles.center}>
            <h1 className="text-2xl font-bold pb-2">ToDo App 📝</h1>
            <div className='flex justify-evenly gap-2'>
              <button className={(type.signIn) ? 'bg-gray-400 border border-sky-500 p-2 rounded-md'  : 'border border-sky-500 p-2 rounded-md' } 
                onClick={() => setType({...type, signIn:true, login:false})}
              >Sign In</button>
              <button className={(type.login) ? 'bg-gray-400 border border-sky-500 p-2 rounded-md'  : 'border border-sky-500 p-2 rounded-md' }
                onClick={() => setType({...type, signIn:false, login:true})}
              >Login</button>
            </div>
          <form className={styles.indexBody} onSubmit={handleSubmit}>

            <input type="text" placeholder='UserName' required className={styles.inputField} value={form.name.trim()} 
              onChange={(e) => setForm({...form, name:e.target.value})}
            />

            <input type="password" placeholder='Password' required className={styles.inputField} value={form.password.trim()} 
              onChange={(e) => setForm({...form, password:e.target.value})}
            />
            {/* <input type="text" placeholder='TeleId' className={styles.inputField} value={form.teleId.trim()} 
              onChange={(e) => setForm({...form, teleId:e.target.value})}
            /> */}

            <button className={styles.btn} type="submit">Get Started ➡️</button>
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
      </div>
  
  }
      </main>
    </>
  )
}
