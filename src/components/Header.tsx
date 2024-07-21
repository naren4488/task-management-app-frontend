import { useState } from "react";
import BrandLogo from "/TMA-Logo.png";
import { Button } from "./ui/button";
import { User } from "lucide-react";

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
            <Button
              onClick={() => setIsAuthenticated(false)}
              className=" bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Button variant={"outline"}>Sign Up</Button>
            <Button
              onClick={() => setIsAuthenticated(true)}
              className=" bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
