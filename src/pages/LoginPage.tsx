import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // login user api call here
        console.log("Login successful!");
        navigate("/");
      } catch (error) {
        alert("Login failed!");
      }
    }
  };
  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={cn(
                "w-full p-2 border rounded",
                errors.email ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={cn(
                "w-full p-2 border rounded",
                errors.password ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full p-2 text-black  bg-amber-400 rounded hover:bg-amber-500"
          >
            Login
          </Button>
        </form>
        <Button
          onClick={() => navigate("/register")}
          variant={"outline"}
          className="w-full mt-4 p-2 text-black border border-amber-400 rounded hover:bg-amber-50"
        >
          Don't have an account? Signup
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
