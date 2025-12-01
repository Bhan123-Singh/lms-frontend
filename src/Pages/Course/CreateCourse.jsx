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
        <div className="flex items-center justify-center min-h-screen px-4">
  <form
    onSubmit={onFormSubmit}
    className="flex flex-col justify-center gap-6 rounded-lg p-6 text-white w-full max-w-3xl my-10 shadow-[0_0_10px_black] relative bg-[#1f1f1f]"
  >
    <Link className="absolute top-4 left-4 text-2xl link text-accent cursor-pointer">
      <AiOutlineArrowLeft />
    </Link>

    <h1 className="text-center text-2xl font-bold">Create New Course</h1>

    {/* Responsive Two Column Grid */}
    <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left section (image + title) */}
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="image_uploads" className="cursor-pointer block">
            {userInput.previewImage ? (
              <img
                className="w-full h-44 object-cover border rounded-md"
                src={userInput.previewImage}
              />
            ) : (
              <div className="w-full h-44 flex items-center justify-center border rounded-md text-center px-2">
                <h1 className="font-bold text-lg">
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
            className="bg-transparent px-3 py-2 border rounded-md"
            value={userInput.title}
            onChange={handleUserInput}
          />
        </div>
      </div>

      {/* Right section (instructor + category + description) */}
      <div className="flex flex-col gap-4">
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
            className="bg-transparent px-3 py-2 border rounded-md"
            value={userInput.createdBy}
            onChange={handleUserInput}
          />
        </div>

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
            className="bg-transparent px-3 py-2 border rounded-md"
            value={userInput.category}
            onChange={handleUserInput}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-lg font-semibold">
            Course Description
          </label>
          <textarea
            required
            name="description"
            id="description"
            placeholder="Enter Course Description"
            className="bg-transparent px-3 py-2 border rounded-md h-24 overflow-y-scroll resize-none"
            value={userInput.description}
            onChange={handleUserInput}
          />
        </div>
      </div>
    </main>

    <button
      type="submit"
      className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-3 rounded-md font-semibold text-lg cursor-pointer"
    >
      Create Course
    </button>
  </form>
</div>
       
    </HomeLayout>
)


}

export default CreateCourse;