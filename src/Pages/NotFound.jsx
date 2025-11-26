import { useNavigate } from "react-router-dom"

function NotFound(){
    const navigate=useNavigate();

return(
    <div className="h-screen w-full flex flex-col  items-center justify-center bg-[#040f18]">
        <h1 className=" text-9xl font-extrabold text-white tracking-widest">
           404
           </h1>
           <div className="bg-[#154c79] text-white px-2 text-small rounded rotate-12 absolute"> 
            Page not found
           </div>
           <button className="mt-5">
            <a  className="relative inline-block text-sm font-medium text-[#794215] group active:text-yellow-500 focus:outline-none focus:ring"> 
                <span onClick={() => navigate(-1)} className="relative block px-8 px-3 bg-[#1A2238] border border-current" >
                Go Back
                    </span>
                    </a>

           </button>

        

    </div>
)
}
export default NotFound