import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import CourseCard from "../components/CourseCard";




function CourseList(){
    const dispatch=useDispatch();
    const {courseData} =useSelector((state)=>state.courses);
    console.log("coursedata->",courseData)
   
    async function loadCourses(){
        await dispatch(getAllCourses())
   
    }
    useEffect(()=>{
        loadCourses();
    },[]);


    //for ui
    return(
        <HomeLayout>
           <div className="min-h-[90vh] pt-12 sm:pl-20 flex flex-col items-center justify-center gap-10 text-white ">
               <h1 className="text-center text-3xl font-semibold mb-5">Explore the courese made by &nbsp;
                <span className="font-bold  text-yellow-500 ">
                      Industry experts
                </span>
                </h1>
                <div className="mb-10  sm:flex flex-wrap   gap-14">
                  
                  {courseData?.map((element)=>{
                    return < CourseCard key={element._id} data={element}/>
                  })}
                </div>
           
           </div>


        </HomeLayout>
    )
}

export default CourseList