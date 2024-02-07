import { useState, useEffect} from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import {login, logout} from './store/authSlice'
import authService from './appwrite/auth'
import {Header} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then(userData => {
      if (userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])


  return (
    <>
      <h1 className=''>
       <Header/>
       <main>
        <Outlet/>
       </main>
      </h1>
    </>
  )
}

export default App
