// import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../CSS/Slider.css";
// import SliderBtn from "./SliderBtn";
const Testimonials = () => {
  return (
    <div className="w-full md:w-[85%] mx-auto bg-gradient-to-r from-theme to-theme2 pb-20 pt-16 my-10">
      <p className="text-4xl font-medium text-center mb-10">Testimonials</p>
      <Swiper
        modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          425: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 3,
          },
        }}
        pagination={true}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              JobNest transformed my job search journey. With their
              user-friendly platform and expert guidance, I found my dream job
              in no time. The personalized job matches and invaluable resources
              made all the difference. I can nott recommend JobNest enough!
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/FHCM74b/t3.jpg"
                alt=""
              />
              <p>Akib Rahman</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              I had been searching for the perfect job for months until I
              discovered JobNest. Their extensive listings and easy-to-navigate
              website provided me with numerous opportunities. I am grateful to
              the JobNest team for helping me find my ideal role.
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/tLYjngc/t5.jpg"
                alt=""
              />
              <p>Kawsar Ali</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              JobNest is my go-to for job hunting. Their professional approach
              and robust job database gave me the edge in my career. The support
              and resources available are truly exceptional. Thank you, JobNest,
              for making my job search a success!
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/w4sWsRS/t10.webp"
                alt=""
              />
              <p>Rohit Sarma</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              JobNest is a game-changer in the job market. Their intuitive
              platform and diverse job listings cater to every career need. With
              their help, I secured my dream job, and I could not be happier.
              JobNest, you are the best. All the best. Keep gonig like that.
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/sWDMS05/gucci4.jpg"
                alt=""
              />
              <p>Reshmi Khan</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              JobNest took the stress out of my job search. The seamless
              experience and tailored job recommendations simplified the
              process. Their dedication to helping job seekers is evident. I am
              now in a job that perfectly matches my skills and aspirations
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/t4hGzTd/t7.jpg"
                alt=""
              />
              <p>Rahul Akbar</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-4 rounded-lg p-3 bg-white pb-10">
            <p className="text-center p-4 rounded-lg">
              JobNest exceeded my expectations. The user interface is intuitive,
              and the wealth of information available is unmatched. JobNest
              guided me to a career path I did not even know existed. If you are
              serious about finding the right job, JobNest is the place to be
            </p>
            <div className="flex flex-col items-center">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.ibb.co/RQZ8M7k/t1.png"
                alt=""
              />
              <p>Shamim Ali</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
