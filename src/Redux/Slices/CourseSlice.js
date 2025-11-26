import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState={
    courseData :[]

}
export const getAllCourses=createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/courses");
        console.log("response->",response)
        toast.promise(response,{
            loading:"loading course data...",
            success:"course loaded successfully",
            error:"Failed to get the courses",
    
        });
        return (await response).data.courses;
    }
   
    catch(error){
        toast.error(error?.response?.data?.message)
    }
});

//creatinf asyncthunk for deleting the course by admin
export const deleteCourse=createAsyncThunk("/course/get",async(id)=>{
    try{
        const response=axiosInstance.delete(`/courses/${id}`);
        toast.promise(response,{
            loading:"deleting  course...",
            success:"course deleted successfully",
            error:"Failed to delete the courses",
    
        });
        return (await response).data.courses;
    }
   
    catch(error){
        toast.error(error?.response?.data?.message)
    }
});


export const createNewCourse=createAsyncThunk('/course/create',async(data)=>{ //put the  name of asyncthunk is 'course/create'
    //get the data from end user side
    try{
        let formData=new FormData();          /*  creating FormData is not mandaroty,
                                        you can use only const response=axiosIntance.post('/courses',data) 
                                        Note: FormData is object */
        formData.append('title',data?.title);
        formData.append('description',data?.description);
        formData.append('category',data?.category);
        formData.append('createdBy',data?.createdBy);
        formData.append('thumbnail',data?.thumbnail);
       
        // define api request to server
        const response=axiosInstance.post('/courses',formData);
        toast.promise(response,{
            loading:'Created new courses',
            success:'Course created successfully',
            error:'Failed to create course'
        });
        return(await response).data // it means send the data property of response to server 

    }
    catch(error){
       toast.error(error?.response?.data?.message);

    }
})




const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,(state,action)=>{
       
           if(action.payload){
            console.log("actionPayload->",action.payload)
            state.courseData=action.payload;
           } 
        })


    }
})
export default courseSlice.reducer;




/* Q-1: What is Redux thunk?
   Ans: Thunk is a logical concept in programming where you deal with a function that is primarily used to delay the 
         calculation or evaluation of any operation.

         ** for Redux specifically 'thunks' are a pattern of writting functions with logic inside that can interact
            with a Redux store's dispatch and getState methods-
         ** using thuncks requires the redux-thunk middleware to be added to the redux store as part of its configuration
         Note-1: Thunks are a standard approach for writting async logic in Redux apps, and are commonly used for data fetching
         .However they can be used for a variety of tasks and can contain both synchronous and asynchronous logic
         
         Note-2: Writing Thunks->
                                   A thunk function is a function that accepts two argument .the Redux store Dispatch method
                                   ,and the Redux store 'getState method' . Thunk functions are not directly called by application
                                    code. Instead,they are passed to 'store.dispatch()'

      Q-2: what is createAsyncThunk?
      Ans:  A function that accepts a Redux action type string and 
            a callback function that should return a promise. 
            It generates promise lifecycle action types based on the action type prefix that you pass in,
            and returns a thunk action creator 
            that will run the promise callback and dispatch the lifecycle actions based on the returned promise.                              

           Ex. dispatch(CreateNewCourse(useInput))

*/