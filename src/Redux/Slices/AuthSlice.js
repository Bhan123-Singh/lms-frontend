import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import {toast} from "react-hot-toast";


const initialState={
  isLoggedIn:localStorage.getItem("isLoggedIn")  || false,
  role:localStorage.getItem('role') || '',
  data: localStorage.getItem("data") || {} 
}                                                            // e.target-> takes the html element from e.target

//for creating accouting
export const createAccount=createAsyncThunk(
  '/auth/signup',async(data)=>{
    try{
const res=axiosInstance.post("user/register",data);
toast.promise(res,{
  loading:'wait! creating your Account',
  success:(data)=>{return data?.data?.message},
  error:'failed to create Account'
});


return (await res).data;
    }
    catch(error){
      toast.error(error?.response?.data?.message);

    }
  }
)

//login create account for sent the backend data
export const login=createAsyncThunk(   //it's main purpose of  some time delay execution 
  '/auth/login',async(data)=>{//async(data) ->take the user information as input in data
    try{
const res=axiosInstance.post("user/login",data); // put input in data
toast.promise(res,{
  loading:'wait! authentication in progress...',
  success:(data)=>{return data?.data?.message;},
  error:'failed to login'
});
return (await res).data;
    }
    catch(error){
      toast.error(error?.response?.data?.message);

    }
  }
)

// logout for sent the backend data
//note: it is a actions
export const logout=createAsyncThunk("path/logout",async() =>{
  try{
    const res=axiosInstance.get("user/logout"); /* we can defines await 'res=await axiosInstance.post'
                                                         but toast message comes in late*/  
    toast.promise(res,{
      loading:'wait! logout in progress...',
      success:(data)=>{
        return data?.data?.message;
      },
      error:'failed to logout'

  });
  return (await res).data;
}
  catch(error){
toast.error(error?.response?.data?.message);
  }
});

//for updating profile

/*const data = [123, { name: 'Alice', email: 'alice@example.com' }];
const res = await axiosInstance.put(`/user/update/${data[0]}`, data[1]);
 */
export const updateProfile=createAsyncThunk("/user/update/profile",async(data) =>{
  //you can not pass duble parameter in async function such as '(id,data)'-> it is wrong way|| ,it means user can pass one parameter and  second parameterhave itself  of asyncthunk 
   /* '/user/update/profile'it
                                                                                          is a string which is uniquely
                                                                                          identify the ayncthuk*/
  try{ //  for use debuging purpose 'console.log(id,data)'
    const res=axiosInstance.put(`/user/update/${data[0]}`,data[1]);// data[o] means id on first index-0 and  data[1] means data on second index-1
    toast.promise(res,{
      loading:'wait! update in progress...',
      success:(data)=>{return data?.data?.message;},
      error:'failed to update profile'

  });
  return (await res).data;
}
  catch(error){
toast.error(error?.response?.data?.message);
  }
});

/* Note-> after updating the profile data ,state will not be updated
  that means for updating state defines the asyncthunk in the below line

  fetching data 

 
*/

export const getUserData=createAsyncThunk("/user/details",async() =>{
  try{
    const res=axiosInstance.get('/user/me');

  return (await res).data;
}
  catch(error){
toast.error(error.message);
  }
});



const authSlice=createSlice({ 
  name:"auth",
  initialState,
  reducers: {},   /* asyncthunk login ke different states like 'fullfilled' par ek 'Reducer' define kar skta h
                     Reducer takes parameter  state object and action like (state,action)=>*/ 
  extraReducers:(builder)=>{builder
  .addCase(login.fulfilled,(state,action)=> {// it means login ke fulfill se takes 'state and action'.
     // when app is reload then fetched the states to localStorage 
    localStorage.setItem('data',JSON.stringify(action?.payload?.user));
    localStorage.setItem('isLoggedIn',true);
    localStorage.setItem("role",action?.payload?.user?.role);

    //for set the in state  current running app  
    state.isLoggedIn=true;
    state.data=action?.payload?.user;
    state.role=action?.payload?.user?.role
  })


  .addCase(logout.fulfilled,(state) =>{
    localStorage.clear();
    state.data={};
    state.isLoggedIn=false;
    state.role='';
  })

  .addCase(getUserData.fulfilled,(state,action)=>{
    
    localStorage.setItem('data',JSON.stringify(action?.payload?.user));
    localStorage.setItem('isLoggedIn',true);
    localStorage.setItem("role",action?.payload?.user?.role);
    state.isLoggedIn=true;
    state.data=action?.payload?.user;
    state.role=action?.payload?.user?.role;
  })
}
});

//export const {}=authSlice.actions



export default authSlice.reducer;