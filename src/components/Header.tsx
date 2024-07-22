import { useState } from "react";
import BrandLogo from "/TMA-Logo.png";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="px-4 lg:px-12 shadow-md py-2 border-b border-b-amber-300">
      <div className="flex items-center justify-between">
        <img src={BrandLogo} alt="" className="size-10" />
        {isAuthenticated ? (
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2">
              <User className="bg-amber-100 rounded-full p-1 size-8" />
              <p>Narendra Kajla</p>
            </div>
            <Link to={"/"}>
              <Button
                onClick={() => setIsAuthenticated(false)}
                className=" bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link to={"/register"}>
              <Button variant={"outline"}>Sign Up</Button>
            </Link>
            <Link to={"/login"}>
              <Button
                onClick={() => setIsAuthenticated(true)}
                className=" bg-amber-400 hover:bg-amber-500 text-black px-5"
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
