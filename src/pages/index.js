import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, setUser } from '../store/user'
import { useRouter } from 'next/router'
import { Divider, IconButton } from '@mui/material'
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material'


export default function Home() {
  const [form, setForm] = useState("");
  const dispatch = useDispatch();
  const UserDetails = useSelector(getUser);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setUser(form));
    router.push("/TodoPage");

  }

  useEffect(() => {
    
  })


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


      </main>
    </>
  )
}
