import { use } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";


function CreateCourse(){// it is a function of create course


    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [userInput,setUserInput]=useState({
      title:'',
      category:'',
      createdBy:'',
      description:'',
      thumbnail:null,
      previewImage:''
    });

    // it is a function of for uploadinf image in server
     function handleImageUpload(e){
        e.preventDefault(); // it is prevent the default imageuplaoder '  default imageuplaoder is after image uplaodinf the page is refressed'
        const uploadedImage=e.target.files[0];// takes the data from e.target for uplaoding image or file

        if(uploadedImage){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load',function(){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage
                })
            })
        }
    }

    function handleUserInput(e){//  this function defines the if  user change any in input then execute the function
        const {name,value}=e.target; // takes the value of name,value from e.target
        setUserInput({
            ...userInput,
            [name]:value //set the value in name property
        })
    }

   async function onFormSubmit(e){// it is a form sunmiting function
        e.preventDefault(); //it means prevent the form defalut behavior ,'form default behavior is after submiting form then page is refressed'

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy){
            toast.error('All field are mandatory');
            return;
        }

        const response=await dispatch(createNewCourse(userInput)) // create dispatch(action:any) userinput is data
         if(response?.payload?.success){//it means response of payload if data get successfully then setuserinput refresseed
            setUserInput({
                title:'',
                category:'',
                createdBy:'',
                description:'',
                thumbnail:null,
                previewImage:''
            })
            navigate('/courses'); // navigate the courses pages


         }
    }
// creating ui
return(
    <HomeLayout>
    
         
<div className="flex items-center justify-center min-h-screen px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-[#121212]">
  <form
    onSubmit={onFormSubmit}
    className="
      flex flex-col gap-8 
      rounded-lg p-5 sm:p-8 md:p-10 
      text-white w-full 
      max-w-2xl md:max-w-4xl 
      my-12 shadow-[0_0_15px_rgba(0,0,0,0.7)]
      relative bg-[#1f1f1f]
    "
  >
    {/* Back button */}
    <Link className="absolute top-4 left-4 text-2xl link text-accent cursor-pointer">
      <AiOutlineArrowLeft />
    </Link>

    <h1 className="text-center text-2xl sm:text-3xl font-bold">
      Create New Course
    </h1>

    {/* Grid layout */}
    <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* LEFT */}
      <div className="flex flex-col gap-6">
        {/* Thumbnail */}
        <div>
          <label htmlFor="image_uploads" className="cursor-pointer block">
            {userInput.previewImage ? (
              <img
                className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover border rounded-md"
                src={userInput.previewImage}
              />
            ) : (
              <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 flex items-center justify-center border rounded-md text-center px-3">
                <h1 className="font-semibold text-base sm:text-lg">
                  Upload Your Course Thumbnail
                </h1>
              </div>
            )}
          </label>

          <input
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg,.jpeg,.png"
            name="image_uploads"
            onChange={handleImageUpload}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-lg font-semibold">
            Course Title
          </label>
          <input
            type="text"
            required
            name="title"
            id="title"
            placeholder="Enter Course Title"
            className="bg-transparent px-3 py-2 border rounded-md focus:outline-yellow-500"
            value={userInput.title}
            onChange={handleUserInput}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-5">
        {/* Instructor */}
        <div className="flex flex-col gap-1">
          <label htmlFor="createdBy" className="text-lg font-semibold">
            Course Instructor
          </label>
          <input
            type="text"
            required
            name="createdBy"
            id="createdBy"
            placeholder="Enter Instructor Name"
            className="bg-transparent px-3 py-2 border rounded-md focus:outline-yellow-500"
            value={userInput.createdBy}
            onChange={handleUserInput}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-lg font-semibold">
            Course Category
          </label>
          <input
            type="text"
            required
            name="category"
            id="category"
            placeholder="Enter Course Category"
            className="bg-transparent px-3 py-2 border rounded-md focus:outline-yellow-500"
            value={userInput.category}
            onChange={handleUserInput}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-lg font-semibold">
            Course Description
          </label>
          <textarea
            required
            name="description"
            id="description"
            placeholder="Enter Course Description"
            className="bg-transparent px-3 py-2 border rounded-md h-24 sm:h-28 md:h-32 overflow-y-scroll resize-none focus:outline-yellow-500"
            value={userInput.description}
            onChange={handleUserInput}
          />
        </div>
      </div>
    </main>

    {/* Submit button */}
    <button
      type="submit"
      className="
        w-full bg-yellow-600 hover:bg-yellow-500 
        transition-all duration-300 py-3 
        rounded-md font-semibold text-lg cursor-pointer
      "
    >
      Create Course
    </button>
  </form>
</div>

         
       
    </HomeLayout>
)


}

export default CreateCourse;