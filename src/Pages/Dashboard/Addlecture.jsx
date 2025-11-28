import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import {addCourseLecture} from "../../Redux/Slices/LectureSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";


function AddLecture(){
       // takes the courseDetails of state to location
       const location =useLocation();
       const courseDetails = location?.state ;
     const   dispatch=useDispatch();
     const navigate=useNavigate();
     const [userInput,setUserInput]=useState({
        id:courseDetails._id  || "" ,
        lecture:undefined,
        title:'',
        description:'',
        videoSrc:''
     });
      function handleInputChange(e){
        const {name,value}=e.target; // takes value name and value from html element
        setUserInput({
           ...userInput,
           [name]:value
        })

      }

      function handleVideo(e){
        const video=e.target.files[0];
        const source=window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:source

            })
        
      }

      async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description){
          toast.error('All fields are mandatory')
        return;            
        }

         const formData = new FormData();
         formData.append("id", userInput.id);
         formData.append("title", userInput.title);
         formData.append("description", userInput.description);
         formData.append("lecture", userInput.lecture);

         const response = await dispatch(addCourseLecture(formData));

        
        if(response?.payload?.success){
          navigate(-1);
            setUserInput({ id:courseDetails._id,
                lecture:undefined,
                title:'',
                description:'',
                videoSrc:''
                
            })
        }

      }

      // when app is load time then execute the useEffect function
      // first of all checks the coursedetails exits or not then if it is not exit
      // then navigate the '/courses'page
      useEffect(()=>{
        if(!courseDetails) navigate('/courses')
      },[])

return(
 
    <HomeLayout>
     <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16  ">
      <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
        <header className="flex items-center justify-center relative">
      <button
      className="absolute left-2 text-xl text-green-500"
      onClick={()=>navigate(-1)}>
        <AiOutlineArrowLeft/>
      </button>
        <h1 className="text-xl text-yellow-500 font-semibold">
          Add new lecture
        </h1>
        </header>
        <form action=""
       onSubmit={onFormSubmit} className="flex flex-col gap-3" >
        <input type="text" name='title'
        placeholder="enter the title of the lecture"
        onChange={handleInputChange}
        className="bg-transparent py-3 px-1 border"
        value={userInput.title} />

<textarea type="text" name='description'
        placeholder="enter the description of the lecture"
        onChange={handleInputChange}
        className="bg-transparent py-3 px-1 border resize-none  h-24"
        value={userInput.description} />
        {userInput.videoSrc?(
          <video src={userInput.videoSrc}
           muted
           controls
           controlsList="nodownload nofullscreen"
           disablePictureInPicture
           className="object-fill rounded-tl-lg rounded-tr-lg w-full"
          >
            
          </video>

        ):(
         <div className="h-48 border flex flex-col items-center justify-center  cursor-pointer  ">
          <label htmlFor="lecture" 
          className="font-semibold text-xl cursor-pointer">Choose your video
            <input type="file" className="hidden" id='lecture' name="lecture"
            onChange={handleVideo}
            accept="video/*"/>
          </label>
         </div>
        )}

        <button type="submit" className="btn btn-primary text-sm md:text-lg px-2 py-1 md:px-4 md:py-2   ">
          Add new lecture
        </button>
        </form>
       
      </div>

     </div>
    </HomeLayout>
)
}
export default AddLecture;