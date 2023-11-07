import { Helmet } from "react-helmet";
import Contact from "../Components/Contact";
import HomeSlider from "../Components/HomeSlider";
import TabWiseJobs from "../Components/TabWiseJobs";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>JobNest || Home</title>
      </Helmet>
      <HomeSlider></HomeSlider>
      <TabWiseJobs></TabWiseJobs>
      <Contact></Contact>
    </div>
  );
};

export default HomePage;
