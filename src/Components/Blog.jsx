const Blog = () => {
  return (
    <div className="w-[85%] mx-auto my-10">
      <p className="text-xl font-semibold bg-theme px-10 py-3 text-white">
        Blog
      </p>
      <div className="my-10">
        <p className="border w-max px-3 py-2 rounded-full border-theme mb-5">
          Quiestion: 01
        </p>
        <p className="border-b-2 border-l-2 p-2 mb-5 border-theme font-bold">
          What is an access token and refresh token? How do they work and where
          should we store them on the client-side
        </p>
        <img src="" alt="" />
        <p className="font-bold">Access Token & Refresh Token:</p>
        <p className="border-l-4 pl-5 border-theme">
          Access token is that type of token, which is usually generated after a
          successful authentication, and which is used to protect the api calls
          By providing clients identification.Usually, a access token is a
          Short-lived temporary token. <br /> On the other Hand <br /> Refresh
          token is highly secured and long-lived token, which is used to
          generate a access token again, without logging out a user.
        </p>

        <p className="font-bold mt-5">
          How do Access Token & Refresh Token works:
        </p>
        <p className="border-l-4 pl-5 border-theme">
          Firstly, when a user is being authenticated successfully, the server
          side generates a access token regarding that user's information and
          provides it to the client side. After that, when client site makes an
          api call, It uses these access token to protect the resources. And if
          a access token gets expiredthen, it will hit the refresh token and
          then the refresh token will generate an access token again regarding
          the user's information and will send it to the client side to use that
          access token farther. When client side hits an API call with access
          token first server checks that access token and after that, the server
          verifies that access token. If the access token is authorized, then
          server serves the API resources else didn't send the resources
        </p>
        <p className="font-bold mt-5">
          where should we store them on the client-side:
        </p>
        <p className="border-l-4 pl-5 border-theme">
          We should store these tokens in A really secret storage with
          HTTPaccess only because. These tokens are very important for the API
          resources. If this access token leaked, Then, an unknown stranger can
          access to our api resources. We can store a token in our memory or
          local storage. But these are not much safe. Rather than we can store
          our access tokens in cookies. Cookie is not 100% safe, but far way
          better than local storage, because in case of local storage, there is
          a chance to get leaked the API resources by XSS attacks. So the best
          decision is to store the ax tokens in cookies.{" "}
        </p>
      </div>

      <div className="my-10">
        <p className="border w-max px-3 py-2 rounded-full border-theme mb-5">
          Question: 02
        </p>
        <p className="border-b-2 border-l-2 p-2 mb-5 border-theme font-bold">
          What is Express JS?
        </p>
        <p className="border-l-4 pl-5 border-theme">
          Express.JS is an web application framework of Node.JS. The process of
          web development and making an API ss very difficult but express js
          makes these things very easy. Express js is known for its simplicity
          and flexibility. The hard terms are made easy by express js, like
          middleware, routing, HTTP calls etc
        </p>
      </div>
      <div className="my-10">
        <p className="border w-max px-3 py-2 rounded-full border-theme mb-5">
          Question: 03
        </p>
        <p className="border-b-2 border-l-2 p-2 mb-5 border-theme font-bold">
          What is NEXT.JS?
        </p>
        <p className="border-l-4 pl-5 border-theme">
          NEST JS is a framework which is built on top of Express JS, which
          helps to make a server-side application easily. Moreover, some
          features like Angular are here.By default, it leverages typescript but
          also supports javascript.
        </p>
        <p className="border-l-4 pl-5 border-theme">
          In summary, Express.js is a minimalistic and flexible web application
          framework for Node.js, while Nest.js is a more opinionated and
          structured framework built on top of Express.js
        </p>
      </div>
      <div className="my-10 mt-20">
        <p className="font-bold bg-theme text-white mx-auto border w-max px-3 py-2 rounded-full border-theme mb-5">
          Explaination of the Code of this Project
        </p>
        <p className="border-l-4 pl-5 border-theme">
          First of all, there is an Navbar, there has some conditional links
          based on user. That means if there is a user, then some elements will
          be shown. Or if there is no user, there will shown nothing of them.
          After that, I have a Slider here, I have used swiper Js, after that,
          there is a category wise jobs showing system. And I have made this by
          api call. when I am clicking on a tab, this is hitting to a useeffect
          and that useeffect is calling a API sending some queries and based on
          that queries that useeffect is getting some jobs. After that I am
          showing that jobs in that section. After that there is a testimonial
          sites . In Navbar there is a add a job session here we can add a job
          after adding a job it will hit api to add a job after that, there is
          my jobs. Here we will be shown that jobs which are added by me only.
          And it is getting by filter from all jobs collection of Mongodb. After
          that, there is a applied jobs. And these applied jobs are also are
          getting filtered from the Mongodb collection named appliedJobs. After
          that, when someone will apply to a job, there is a special thing that
          if their job is already applied by him, he can't apply for that job
          again. And here I have used the $and operator of Mongodb to figure out
          that this job is already applied by that person by matching the job id
          and email.After that when a user will delete his own job. That job
          will be deleted from the applied job also. That's why, if someone is
          there who applied that job before, and after that when the author will
          delete that job, the job will be deleted from both all jobs and
          applied jobs. Same for the updation, if.author updates a job, then
          that job will be also updated from the applied jobs.I have used
          firebase for authentication here. I have used JWT for some API calls,
          and I have used email verifying for two API calls. One of.them is my
          jobs and another one of them is applied jobs. That means if the access
          token is right but the user is wrong, then he will not get the API
          resources.
        </p>
        <br />
        <p className="border-l-4 pl-5 border-theme">
          The special thing which I have implemented here, that one is imgbb
          api. That means you no need to paste the image url. You can directly
          upload the image from your client side and the server side will handle
          the system of making the URL for that image. And also.I have
          implemented the loading system for every data loading API call. That
          is why you will be sure that yes, the data is now in loading state and
          also I have explored the framework motion and I have implemented the
          framework motions also.
        </p>
      </div>
    </div>
  );
};

export default Blog;
