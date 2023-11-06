import { Helmet } from "react-helmet";
import TabWiseJobs from "../Components/TabWiseJobs";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>JobNest || Home</title>
      </Helmet>
      <TabWiseJobs></TabWiseJobs>
    </div>
  );
};

export default HomePage;
