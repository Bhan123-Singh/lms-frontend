import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";



function EditProfile(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[data,setData]=useState({
        previewImage:'',
        fullName:'',
        avatar:'',
        userId:useSelector((state)=>state?.auth?.data?._id)
    });
  
    console.log("Data",data)
  
    function handleImageUplaod(e){
        e.preventDefault();
        const uploadImage=e.target.files[0];
if(uploadImage){
    const fileReader=new FileReader();
    fileReader.readAsDataURL(uploadImage);
    fileReader.addEventListener('load',function(){
        setData({
            ...data,
            previewImage:this.result,
            avatar:uploadImage
        })
    })
}
}

        


function handleInputChange(e){
    const{name,value}=e.target;
    setData({
        ...data,
        [name]:value
    })
}

  async function onFormSubmit(e){
    e.preventDefault();
  
    if(!data.fullName || !data.avatar){
        toast.error('All Field are mandatory');
        return;

    }
    if(data.fullName.length<4){
        toast.error('Name cannot be of less than 5 characters');
        return;
    }

    const formData=new FormData();
    await formData.append('fullName',data.fullName);
    await formData.append('avatar',data.avatar);

    console.log(formData.entries().next());

    // for debuging purposes 'console.log(formData.entries().next())';
// takes the userid from 'data.userId' and other information from 'data'
 /*createasyncthunk provide features-> after execute promise 
                                                       part then thuk dispatch the data*/ 

      dispatch(updateProfile([data.userId,formData]))
      
      dispatch(getUserData())

navigate('/user/profile')

  
    }
return(
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
         <form onSubmit={onFormSubmit}
         className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]">
         <h1 className="text-center text-2xl font-semibold">
           Edit Profile
         </h1>
         <label  className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage? (
                 <img src={data.previewImage} 
                 alt="userimage"
                 className="w-28 h-28 rounded-full m-auto" 
                 />
            ):(
                <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
            )}
         </label>

         <input 
         onChange={handleImageUplaod}
         className="hidden"
         type="file"
         id="image_uploads"
         name="image_uploads"
         accept='.jpg, .png, .svg, .jpeg'/>

         <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Enter Your FullName

            </label>
            <input type="text" name="fullName" id="fullName"  placeholder="Enter Your Name" className="bg-transparent px-2 py-1 border"
             value={data.fullName}
             onChange={handleInputChange}
             required />
             </div>
             <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out
              duration-300 rounded-sm py-2 text-lg cursor-pointer">
              Update Profile
             </button>
             <Link to='/user/profile'>
             <p className="link text-accent cursor-pointer flex items-enter justify-center w-full"> 
                <AiOutlineArrowLeft/> Back to profile</p>
             </Link>

        
         </form>
        </div>
    </HomeLayout>
)

}




export default EditProfile;

/* FormData:-> 
               In javaScript a FormData object is a common way to create a 'bundle' of data to send the server
               using xmlhttpRequest or fetch.
               * It replicates the fuctionality of the HTML form element.
               * We can think of it as an array of arrays. there is one array for each element that we want to send to the 
                server.
                SYNTAX: formData=new FormFData([form]) 
*/