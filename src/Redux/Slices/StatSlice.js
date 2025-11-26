import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState={
    allUsersCount: 16,
    subscribedUsersCount:20
};

export const getStatsData=createAsyncThunk('stat/get',async()=>{
    try{ const response=axiosInstance.get('/admin/stats/users');
       toast.promise(response,{
        loading:'Getting the stats...',
        success:(data)=>{
            return data?.data?.message
        },
        error:'Failed to load data stats'
       }) 

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
 const StatSlice = createSlice({
    name:'stat',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{builder
        .addCase(getStatsData.fulfilled,(state,action)=>{
            state.allUsersCount=action?.payload?.allUsersCount;
            state.subscribedUsersCount=action?.payload?.subscribedUsersCount;
        })

    }
 });

 export default StatSlice.reducer;