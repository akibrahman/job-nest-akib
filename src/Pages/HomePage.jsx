import { Helmet } from "react-helmet";
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
    </div>
  );
};

export default HomePage;
