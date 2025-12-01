import HomeLayout from "../Layouts/HomeLayout"
import  HomePageimage from '../assets/images/coolimg-9.jpg'

import { Link } from "react-router-dom"

function HomePage(){
return(
    <HomeLayout>
<div className="pt-10   text-white flex flex-col md:flex-row items-center justify-center gap-10 mx-16 h-[98vh]">
    <div className=" w-full md:w-1/2 space-y-6">
   
    <h1 className=" text-3xl md:text-5xl  font-semibold  ">
    Find out best
    <span className=" text-yellow-500 font-bold ">
         Online Courses
    </span>
    </h1>
    
  
    <p className="md:text-xl  text-gray-200">
        We have a large Library of courses taught by high Skilled and qualified
        faculties at a very affordable cost
        
    </p>
    <div className=" flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 ">
        <Link to="/courses">
        <button className=" bg-yellow-600 px-5 py-3 rounded-md hover:bg-yellow-700 transition-all ease-in-out duration-300 cursor-pointer md:text-lg font-semibold">
            Explore Courses
        </button>
        </Link>
        
                       <Link to="/contact">
        <button className="border border-white  bg-gray-400 px-5 py-3 rounded-md hover:bg-yellow-700 transition-all ease-in-out duration-300 cursor-pointer font-semibold md:text-lg">
            Constact Us

        </button>
        </Link>
  
        
    </div>
    

    </div>
    <div className=" w-full md:w-1/2 flex items-center justify-center  ">
    <img src={HomePageimage} alt="HomePage image" className=" rounded-lg w-4/5 "  />

    </div>

</div>

    

        </HomeLayout>
)
}
export default HomePage