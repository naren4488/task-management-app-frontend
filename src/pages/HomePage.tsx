import { Button } from "@/components/ui/button";
import dragDrop from "/dragDrop.png";
import edit from "/edit.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="md:grid grid-cols-2  gap-4 px-8 ">
      <div className="flex flex-col gap-8 md:w-[80%] items-start">
        <div className="">
          <h2 className="text-6xl max-md:text-4xl mb-6">
            Manage your taks with ease <br /> with{" "}
            <span className=" border-b-2 border-amber-300">TMA-VOOSH</span>
          </h2>
          <p className="text-gray-600 text-xl md:w-[80%]">
            Create your tasks with a click, & manage with amazing drag and drop
            feature.
          </p>
        </div>
        <Link to={"/tasks"}>
          <Button
            className="mt-6 bg-amber-300 hover:bg-amber-400 text-xl font-light px-6"
            variant={"ghost"}
          >
            Go to Tasks
          </Button>
        </Link>
        <div className="flex gap-4 items-center">
          <p className="text-xl font-light">Don't have an account?</p>
          <Link to={"register"}>
            <Button
              variant={"outline"}
              className="hover:bg-amber-100 border-amber-300 text-xl font-light "
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
      <div className="max-md:hidden  relative  rounded-lg shadow-xl h-[80%]">
        <div className="overflow-hidden rounded-lg">
          <img
            src={dragDrop}
            className=" shadow-lg h-full w-full object-cover "
          />
        </div>
        <div className="absolute -left-32 top-48 h-full w-full overflow-hidden shadow-xl  rounded-lg">
          <img
            src={edit}
            className=" shadow-lg h-full w-full object-cover scale-150"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
