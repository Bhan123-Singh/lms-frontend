import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRazorPayId, purchaseCourseBoundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import {BiRupee} from 'react-icons/bi'
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout(){

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const razorpayKey=useSelector((state)=>state?.razorpay?.key);
    const subscription_id=useSelector((state)=>state?.razorpay?.subscription_id);

    //define the object here object name is paymentDetails 
    const paymentDetails={
        razorpay_payment_id: '',
        razorpay_subscription_id: '',
        razorpay_signature:''
    }

     async function handleSubscription(e){
        e.preventDefault();
        if(!razorpayKey|| !subscription_id){
            toast.error('Something went wrong');
            return;
        }
        const options={
            key:razorpayKey,
            subscription_id:subscription_id,
            name:'Coursify Pvt. Ltd.',
            description:"Subscription",
            theme:{
                color:'#f37254'
            },
           
            // handler is property
            handler:async function (response){
                paymentDetails.razorpay_payment_id= response.razorpay_payment_id; /* takes the razorpay_payment_id to 
                response and reserve in paymentDetails of razorpay_payment_id */
                paymentDetails.razorpay_signature= response.razorpay_signature;
                paymentDetails.razorpay_subscription_id= response.razorpay_subscription_id;
                toast.success('Payment successful');
                const res=await dispatch(verifyUserPayment(paymentDetails));
                (res?.payload?.success)? navigate('/checkout/success'):navigate('/checkout/fail');
                
                // debuging purposes console.log(isPaymentVerified);
                //isPaymentVerified ? navigate('/checkout/success'):navigate('/check/fail');
            }
        }

        // define the object here
        // window object is a browser model object
        //Razorpay function exits in window object
        // Razorpay function gives us from Razorpay cdn
        // it is fetch the razorpay from 'index.html'
        const paymentObject=new window.Razorpay(options)
        paymentObject.open();    
     }
    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBoundle());
    }
    // when run content first the load the data
    useEffect(()=>{
          load();
    },[]);
    return(
        <HomeLayout>
            <form 
             onSubmit={handleSubscription}
             className="min-h-[90vh] flex items-center justify-center text-white">
                <div className=" w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rouned-tr-lg">

                    Subscription Bundle
                    </h1>
                    <div className="px-4 space-y-5 text-center ">
                        <p className="text-[17px]">
                            This purchase will allow you to access all available course
                            of our plateform for {''}
                            <span className="text-yellow-500 font-bold">
                                <br />
                           1 year duration
                            </span>
                            All the existing and new launched courses will be also available

                        </p>

                        <p className="flex items-center justify-center gap-2xl font-bold text-yellow-500">
                            <BiRupee/>
                            <span>499</span> only
                        </p>

                        <div>
                            <p>
                                100% refund on cancellation
                            </p>
                            <p>
                                * Terms and conditions applied *
                            </p>
                        </div>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full bottom-0 left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                           Buy Now 
                        </button>

                    </div>


                </div>

            </form>

        </HomeLayout>
    )

}

export default Checkout;