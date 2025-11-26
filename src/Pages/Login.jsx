import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layouts/HomeLayout"

import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { login} from "../Redux/Slices/AuthSlice"


function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
   

    const [loginData,setLoginData]=useState({

    email:'',
    password:'',
   

    });
    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

   

    //for form validation

   async function onLogin(event){
        event.preventDefault();
        if( !loginData.email || !loginData.password){
            toast.error("Please fill all details.");
            return
        }
        
       
 



    
    //dispatch create account action

    const response=await dispatch(login(loginData));
    console.log("response->",response)
     if(response?.payload?.success) //or use (response?.payload?.success)
          navigate("/");
    setLoginData({
        
        email:'',
        password:'',
          
    });
 
}


    return(
<HomeLayout>
    <div className="flex items-center justify-center h-[100vh]">
        <form action="" className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] "
        onSubmit={onLogin} noValidate>
            <h1 className="text-center text-2xl font-bold ">
            Login Page
            </h1>
            

            <div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="email" className="font-semibold">Email</label>
                <input type="email" required 
                name="email"
                id="email" 
                placeholder="Enter your email..."
                className="rounded-sm px-2 py-1 bg-transparent border"
                onChange={handleUserInput}
                value={loginData.email}/>
               </div>

                <div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="password" className="font-semibold">Password</label>
                <input type="password" required 
                name="password"
                id="password" 
                placeholder="Enter your password..."
                className=" rounded-sm px-2 py-1 bg-transparent border"
                onChange={handleUserInput}
                value={loginData.password}/>

                </div>

              
                <button type="submit" className="w-full  bg-yellow-600  cursor-pointer py-2 mt-2 text-lg font-semibold transition-all ease-in-out duration-300 hover:bg-yellow-800 rounded-sm "> Login

                </button>
                <p className="text-center">
                    do not have an account ? <Link to='/signup' className=" link text-accent cursor-pointer">
                     Signup</Link> 

                </p>

        

        </form>

    </div>
</HomeLayout>
    )
}
export default Login