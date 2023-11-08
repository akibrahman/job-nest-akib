import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "../CSS/Slider.css";
import SliderBtn from "./SliderBtn";

const HomeSlider = () => {
  return (
    <div className="">
      <Swiper
        className="w-full h-full"
        modules={[Pagination, Autoplay, Navigation]}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="bg-slide1 bg-cover bg-center">
            <div className="w-full h-full bg-[rgba(0,0,0,0.7)]">
              <div className="w-[85%] mx-auto py-10 md:py-20 lg:py-32 text-white">
                <p className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-6">
                  {/* Your Path to Success: Find Your Dream Job with Us */}
                  Find Your Dream Job with Us
                </p>
                <p className="font-medium mb-10 w-[70%] mx-auto md:mx-0">
                  Our job hunting company website is your one-stop destination
                  for career opportunities. We provide comprehensive job
                  listings, expert career advice, and a platform for connecting
                  with top employers.
                </p>
                <div className="flex items-center">
                  <input
                    className="focus:outline-none px-4 py-3 rounded-full rounded-e md:w-[500px] text-theme font-bold w-[200px]"
                    type="text"
                    name=""
                    id=""
                  />
                  <button className="bg-theme p-3 rounded-full rounded-s">
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-slide3 bg-cover bg-center">
            <div className="w-full h-full bg-[rgba(0,0,0,0.7)]">
              <div className="w-[85%] mx-auto py-10 md:py-20 lg:py-32 text-white">
                <p className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-6">
                  Your Gateway to Opportunities
                </p>
                <p className="font-medium mb-10 w-[70%] mx-auto md:mx-0 md:">
                  Our job hunting company website is your one-stop destination
                  for career opportunities. We provide comprehensive job
                  listings, expert career advice, and a platform for connecting
                  with top employers.
                </p>
                <div className="flex items-center">
                  <input
                    className="focus:outline-none px-4 py-3 rounded-full rounded-e md:w-[500px] text-theme font-bold w-[200px]"
                    type="text"
                    name=""
                    id=""
                  />
                  <button className="bg-theme p-3 rounded-full rounded-s">
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-slide2 bg-cover bg-center">
            <div className="w-full h-full bg-[rgba(0,0,0,0.7)]">
              <div className="w-[85%] mx-auto py-10 md:py-20 lg:py-32 text-white">
                <p className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-6">
                  {/* Your Path to Success: Find Your Dream Job with Us */}
                  Your Path to Success
                </p>
                <p className="font-medium mb-10 w-[70%] mx-auto md:mx-0 md:">
                  Our job hunting company website is your one-stop destination
                  for career opportunities. We provide comprehensive job
                  listings, expert career advice, and a platform for connecting
                  with top employers.
                </p>
                <div className="flex items-center">
                  <input
                    className="focus:outline-none px-4 py-3 rounded-full rounded-e md:w-[500px] text-theme font-bold w-[200px]"
                    type="text"
                    name=""
                    id=""
                  />
                  <button className="bg-theme p-3 rounded-full rounded-s">
                    search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="w-min absolute z-10 left-3 top-1/2 -translate-y-1/2">
          <SliderBtn dir="prev"></SliderBtn>
        </div>
        <div className="w-min absolute z-10 right-3 top-1/2 -translate-y-1/2">
          <SliderBtn dir="next"></SliderBtn>
        </div>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
