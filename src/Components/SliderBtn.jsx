import propTypes from "prop-types";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSwiper } from "swiper/react";

const SliderBtn = ({ dir }) => {
  const swiper = useSwiper();
  if (dir === "prev") {
    return (
      <AiOutlineArrowLeft
        onClick={() => swiper.slidePrev()}
        className="text-white bg-theme rounded-full p-3 w-12 h-12 cursor-pointer active:scale-75 duration-300"
      ></AiOutlineArrowLeft>
    );
  } else if (dir === "next") {
    return (
      <AiOutlineArrowRight
        onClick={() => swiper.slideNext()}
        className="text-white bg-theme rounded-full p-3 w-12 h-12 cursor-pointer active:scale-75 duration-300"
      ></AiOutlineArrowRight>
    );
  }
};

SliderBtn.propTypes = {
  dir: propTypes.string.isRequired,
};
export default SliderBtn;
