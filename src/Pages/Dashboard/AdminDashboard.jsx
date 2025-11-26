import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {ArcElement,Legend,CategoryScale,Chart as ChartJS,LinearScale,BarElement,Title,Tooltip} from 'chart.js';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { deleteCourse } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import {Bar, Pie} from 'react-chartjs-2';
import {FaUsers} from 'react-icons/fa';
import {FcSalesPerformance} from 'react-icons/fc';
import {GiMoneyStack} from 'react-icons/gi';
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";



 //these are the object it's provided by chart.js
 ChartJS.register(ArcElement,BarElement,CategoryScale,Legend,LinearScale,Title,Tooltip);

  

    function AdminDashboard(){

        const dispatch=useDispatch();
        const navigate=useNavigate();
        const {allUsersCount,subscribedUsersCount}=useSelector((state)=>state.stat);
        console.log('data->',allUsersCount,subscribedUsersCount)
        const  {allPayments,finalMonths,monthlySalesRecord}=useSelector((state)=>state.razorpay);
        const userData={
            labels:['Registered User','Enrolled User'],
            datasets:[
                {
                label:'User Details',
                data:[allUsersCount,subscribedUsersCount],
                backgroundColor:['yellow','green'],
                borderWidth:2,
                borderColor:['yellow','green']
            }

            // {
            //     label:'User Details',
            //     data:[10,15],
            //     backgroundColor:['red','blue'],
            //     borderWidth:1,
            //     borderColor:['yellow','green']
            // }
        ]
        }
      

        const salesData={
            labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            fontColor:'white',
            datasets:[{
                label:'Sales/Month',
                data:monthlySalesRecord,
                backgroundColor:['rgb(255,99,132)'],
                borderColor:['white'],
                borderWidth:2
            }]
        };

    
   


        const myCourses=useSelector((state)=>state?.courses?.courseData);
        // window gives the message 'Are you sure you want to delete the course'
        //  then enduser accept the common yes then execute the if statement
        async function onCourseDelete(id){
            if(window.confirm('Are you sure you want to delete the course?')){
                 const res=await dispatch(deleteCourse(id));
                 if(res?.payload?.success){
                    await dispatch(getAllCourses());
                 }

            }
        }


        useEffect(()=>{
            (
                async()=>{
                    await dispatch(getAllCourses());
                    // dispatch(getStatsData());
                    // dispatch(getPaymentRecord());
                }
            )()
        },[])

        return(
            <HomeLayout>
                <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white ">
                    <h1 className="text-center text-2xl sm:text-5xl font-semibold text-yellow-500">
                        Admin Dashboard
                    </h1>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 m-auto mx-10 ">
                        <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md ">
                          <div className="w-full h-64 md:h-80">
                            <Pie data={userData}/>
                            </div>  

                            <div className="grid grip-cols-2 gap-5">
                                <div className="flex itmes-center justify-between p-5 gap-5 rounded-md shadowmd">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">
                                            Registered Users
                                        </p>
                                        <h3 className="text-4xl font-bold">
                                            {allUsersCount}

                                        </h3>

                                    </div>
                                
                                        <FaUsers className='text-yellow-500 text-5xl '/> 

                                </div>

                                <div className="flex itmes-center justify-between p-5 gap-5 rounded-md shadowmd">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">
                                            Subscribed Users
                                        </p>
                                        <h3 className="text-4xl font-bold">
                                            {subscribedUsersCount}

                                        </h3>

                                    </div>
                                
                                        <FaUsers className='text-green-500 text-5xl '/> 

                                </div>

                            </div>

                        </div>

                        <div className=" flex flex-col items-center gap-10 shadow-lg rounded-md">
                            <div className="h-80 w-full relative">
                                <Bar data={salesData}
                                className="absolute bottom-0 h-80 w-full"/>

                            </div>

                            
                            <div className="grid grip-cols-2 gap-5">
                                <div className="flex itmes-center justify-between p-5 gap-5 rounded-md shadowmd">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">
                                            Subscription Count
                                        </p>
                                        <h3 className="text-4xl font-bold">
                                            {allPayments?.count}

                                        </h3>

                                    </div>
                                
                                        <FcSalesPerformance className='text-yellow-500 text-5xl '/> 

                                </div>

                                <div className="flex itmes-center justify-between p-5 gap-5 rounded-md shadowmd">
                                    <div className="flex flex-col items-center">
                                        <p className="font-semibold">
                                            Total Revenue
                                        </p>
                                        <h3 className="text-4xl font-bold">
                                            {allPayments?.count *499}

                                        </h3>

                                    </div>
                                
                                        <GiMoneyStack className='text-yellow-500 text-5xl '/> 

                                </div> 

                        </div>
                        </div>

                    </div>

                    <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 m-bottom-10">
                     <div className="flex w-full items-center justify-between ">
                       
                            <h1 className="text-center text-3xl font-semibold">
                                Courses Overview
                            </h1>

                            <button 
                            onClick={()=>{
                                navigate('/course/create')
                            }}
                            className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300
                             rounded text-sm md:text-lg px-2 py-1 md:px-4 md:py-2  cursor-pointer">
                             Create new Course
                            </button>
                   

                     </div>
                      
                      <div className="overflow-x-auto w-full">
                                              

                     <table className="table  min-w-[800px] ">
                        <thead>
                            <tr className="text-white text-xl">
                                <th>S No.</th>
                                <th>Course Title</th>
                                <th> Course Category</th>
                                <th> Instructor</th>
                                <th>Total Lectures</th>
                                <th>Description</th>
                                <th>Action</th>
                              
                            </tr>
                        </thead>
                        <tbody >
                            {
                                myCourses?.map((course,idx)=>{//idx means index
                                    return(
                                        <tr key={course._id}>
                                            <td>{idx+1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title} 
                                                className="w-full md:w-80 h-auto bg-transparent reseize-none" >

                                                </textarea>
                                            </td>
                                            <td>
                                                {course?.category}

                                            </td>
                                            <td>
                                                {course?.createdBy}
                                            </td>
                                            <td>
                                                {
                                                    course?.numberOfLectures
                                                }
                                            </td>
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                               <textarea value={course?.description}
                                               readOnly
                                               className="w-80 h-auto bg-transparent resize-none" >
                                                </textarea> 

                                            </td>
                                            <td className="flex items-center gap-4">
                                                <button
                                                className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={()=>navigate('/course/displaylectures',{state:{...course}})}>
                                                    < BsCollectionPlayFill/>

                                                </button>

                                                <button
                                                className="bg-red-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                                                onClick={()=>onCourseDelete(course?._id)}>
                                                    < BsTrash/>

                                                </button>

                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                     </table>


                      </div>


                    </div>

                </div>
            </HomeLayout>
        )
        }

    


    

export default AdminDashboard