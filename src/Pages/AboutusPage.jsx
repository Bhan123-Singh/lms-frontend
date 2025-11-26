
import HomeLayout from "../Layouts/HomeLayout"
import Aboutusimg from '../assets/images/coolimg-7.png'
import modipic from '../assets/images/modi.jpg'
import tatapic from '../assets/images/ratantata.jpg'
import apj from '../assets/images/apjabdul.jpg'
import einstin from '../assets/images/einstein.jpg'

function AboutusPage(){
return(
    <HomeLayout>
        <div className=" pt-20 flex md:flex flex-col text-white">
            <div className="flex flex-col md:flex-row items-center gap-5 mx-10">
                <section className="md:w-1/2 space-y-10">
                <h1 className="text-5xl text-yellow-500 font-semibold">
                    Affordable and quality education

                </h1>
                <p className="text-xl text-gray-200">
                    Our goal is to provide the affordable and quality education to the world.
                    we are providing the plateform for the aspiring teachers and students to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind

                </p>

                </section>
                <div className=" w-full md:w-1/2">
                <img src={Aboutusimg} alt="aboutusPage" className="drop-shadow-6xl rounded-lg w-3/4" />

                </div>

            </div>

            <div className="carousel w-full md:w-1/2 my-16 m-auto ">
  <div id="slide1" className="carousel-item relative w-full">
    <div className="flex flex-col items-center justify-center gap-4 px-[15%] ">
    <img
      src={modipic}
      className="w-40 rounded-full border-2 border-gray-400" />
      <p className="text-gray-200 text-xl">
      {  "Hard work never brings fatigue. It brings satisfaction"}

      </p>
      <h3 className="text-2xl font-semibold">
        Narendra Modi

      </h3>
    <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>

    </div>
  
  <div id="slide2" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={tatapic}
      className="w-40 rounded-full border-2 border-gray-400" />
      <p className="text-gray-200 text-xl">
      {"  If you want to walk fast, walk alone. If you want to walk far, walk together"}

      </p>
      <h3 className="text-2xl font-semibold">
        Ratan Tata

      </h3>
    <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={apj}
      className="w-40 rounded-full border-2 border-gray-400" />
       <p className="text-gray-200 text-xl">
      {"  If you want to shine like the sun, first burn like the sun."}

      </p>
      <h3 className="text-2xl font-semibold">
        Abdul Kalam

      </h3>
    <div className="absolute   left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
  <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
    <img
      src={einstin}
      className="w-40 rounded-full border-2 border-gray-400" />
       <p className="text-gray-200 text-xl">
      {"  We can't solve today's problems with the mentality that created them."}

      </p>
      <h3 className="text-2xl font-semibold">
        Albert Eistein

      </h3>
    <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
  </div>
</div>


        </div>

     
    </HomeLayout>
)
}
export default AboutusPage