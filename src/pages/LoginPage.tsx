import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import backendEndpoint from "@/config/config";

interface FormState {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
      try {
        // register user api call here
        const res = await fetch(`${backendEndpoint}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.status === 404) {
          toast.error(data.message);
        } else if (res.status === 400) {
          toast.error("User does not exist with this mail");
        } else if (res.status === 200) {
          toast.success("Successfully Logged In");
          localStorage.setItem("accessToken", data.token);
          navigate("/tasks");
        } else {
          toast.warning("Something went wrong, Please check the logs");
          console.log(res);
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
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
            disabled={loading}
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
