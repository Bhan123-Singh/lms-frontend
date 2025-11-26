import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../Layouts/HomeLayout"
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux"
import {toast} from 'react-hot-toast'
import { createAccount } from "../Redux/Slices/AuthSlice"


function SignUp(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewImage,setpreviewImage]=useState('')

    const [signupData,setsignupData]=useState({
    fullName:'',
    email:'',
    password:'',
    avatar:'',

    });
    function handleUserInput(e){
        const {name,value}=e.target;
        console.log(name,value);
        setsignupData({
            ...signupData,
            [name]:value
        })
    }

    //for image
    function getImage(event){
        event.preventDefault();
        
        //getting the image
        const uploadImage=event.target.files[0];
        if(uploadImage){
            setsignupData({
                ...signupData,
                avatar:uploadImage
            });
         const fileReader=new FileReader();
         fileReader.readAsDataURL(uploadImage);
         fileReader.addEventListener('load',function(){
         
            setpreviewImage(this.result)
         })   
        }
    }

    //for form validation

   async function createNewAccount(event){
        event.preventDefault();
        if(!signupData.fullName || !signupData.email || !signupData.avatar || !signupData.password){
            toast.error("Please fill all details.");
            return
        }
        
        //checking name field length
        if(signupData.fullName.length<5){
            toast.error("Name should be atleast of 5 characters ");
            return
        }

        // checking valid email
        if(!signupData.email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            toast.error("Invalid Email. ");
            return
        }
        // checking password validation
        // if(!signupData.password.match( /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/)){
        //     toast.error(" Password should be 6-16 character long with atleast a number and special character");
        //     return
        // }
 



    const formData=new FormData();
    formData.append('fullName',signupData.fullName);
    formData.append('email',signupData.email);
    formData.append('password',signupData.password);
    formData.append('avatar',signupData.avatar);
    //dispatch create account action

    const response=await dispatch(createAccount(formData));

    console.log("respose->",response)
     if(response?.payload?.success)
          navigate("/");
    setsignupData({
        fullName:'',
        email:'',
        password:'',
        avatar:''   
    });
    setpreviewImage('');
}


    return(
<HomeLayout>
    <div className="flex items-center justify-center h-[100vh]">
        <form action="" className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] "
        onSubmit={createNewAccount} noValidate>
            <h1 className="text-center text-2xl font-bold ">
                Registration Page
            </h1>
            <label htmlFor="image_uploads" className="cursor-pointer">
                {
                    previewImage?(<img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>):(<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>)
                }

            </label>
            <input
            onChange={getImage}
            className="hidden"
             type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg,.jpeg,.png,.svg" />

<div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="fullName" className="font-semibold">Name</label>
                <input type="text" required 
                name="fullName"
                id="fullName"
                placeholder="Enter your name..."
                className="rounded-sm px-2 py-1 bg-transparent border"
                onChange={handleUserInput}
                value={signupData.fullName}/>
               </div>
            <div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="email"  className="font-semibold">Email</label>
                <input type="email" required 
                name="email"
                id="email" 
                placeholder="Enter your email..."
                className="rounded-sm px-2 py-1 bg-transparent border"
                onChange={handleUserInput}
                value={signupData.email}/>
               </div>

                <div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="password" className="font-semibold">Password</label>
                <input type="password" required 
                name="password"
                id="password" 
                placeholder="Enter your password..."
                className=" rounded-sm px-2 py-1 bg-transparent border"
                onChange={handleUserInput}
                value={signupData.password}/>

                </div>

              
                <button type="submit" className="w-full  bg-yellow-600  cursor-pointer py-2 mt-2 text-lg font-semibold transition-all ease-in-out duration-300 hover:bg-yellow-800 rounded-sm "> Create Account

                </button>
                <p className="text-center">
                    Already have an account ? <Link to='/login' className=" link text-accent cursor-pointer">
                     Login</Link> 

                </p>

        

        </form>

    </div>
</HomeLayout>
    )
}
export default SignUp