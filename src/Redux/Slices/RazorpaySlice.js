

import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState={
    key:'',
    subscription_id:'',
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[10,5,3,6,15,2,7]
}

//using asyncthunk here
export const getRazorPayId=createAsyncThunk('/razorpay/getId',async()=>{
    try{
        const response=await axiosInstance.get('/payments/razorpay-key');
        return response.data;

    }
    catch(error){
        toast.error('Failed to load data');
    }
})
//purchaseCourseBoundle asyncthunk

export const purchaseCourseBoundle=createAsyncThunk('/purchaseCourse',async(data)=>{
    try{
        const response=await axiosInstance.post('/payments/subscribe');
        // for debugging purposes console.log(response)
        return response.data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

//verifyuser payment asyncthunk

export const verifyUserPayment=createAsyncThunk('/payments/verify',async(data)=>{
    try{
        const response=await axiosInstance.post('/payments/verify',{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);

    }
})

// getPaymentRecord asyncthunk

export const getPaymentRecord=createAsyncThunk('/payments/record',async()=>{
    try{
        const response= axiosInstance.get('/payments?count=100');
        toast.promise(response,{
            loading:'Getting the payment record',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to get payment records'
        })

        return (await response).data;

    }
    catch(error){
        toast.error('Operation failed');
    }
})

// cancel subscription asyncthunk

export const cancelCourseBundle=createAsyncThunk('/payments/cancel',async()=>{
    try{
        const response= axiosInstance.get('/payments/unsubscribe');
        toast.promise(response,{
            loading:'unsubscribe the bundle',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to unsubscribe'
        })
        return response.data;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})



const razorpaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getRazorPayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
        })
        .addCase(purchaseCourseBoundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            // for debuging purposes console.log(action)
            toast.success(action?.payload?.message); // action ? it checks empty or not
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
                // for debuging purposes console.log(action)
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success;

        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
        })

    }
})

export default razorpaySlice.reducer;
