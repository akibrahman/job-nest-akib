import { Helmet } from "react-helmet";
import Contact from "../Components/Contact";
import HomeSlider from "../Components/HomeSlider";
import TabWiseJobs from "../Components/TabWiseJobs";
import Testimonials from "../Components/Testimonials";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>JobNest || Home</title>
      </Helmet>
      <HomeSlider></HomeSlider>
      <TabWiseJobs></TabWiseJobs>
      <Testimonials></Testimonials>
      <Contact></Contact>
    </div>
  );
};

export default HomePage;
