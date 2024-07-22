import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // register user api call here

        console.log("Signup successful!");
        navigate("/login");
      } catch (error) {
        alert("Signup failed!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Signup</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center "
        >
          <div>
            <label className=" mb-2 text-sm font-medium">
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={cn(
                  "w-full p-2 border rounded",
                  errors.firstName ? "border-red-500" : "border-gray-300"
                )}
              />
            </label>
            {errors.firstName && (
              <span className="text-sm text-red-500">{errors.firstName}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={cn(
                  "w-full p-2 border rounded",
                  errors.lastName ? "border-red-500" : "border-gray-300"
                )}
              />
            </label>

            {errors.lastName && (
              <span className="text-sm text-red-500">{errors.lastName}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email:
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
            </label>
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Password:
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
            </label>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password:
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={cn(
                  "w-full p-2 border rounded",
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                )}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full p-2 text-black  bg-amber-400 rounded hover:bg-amber-500"
          >
            Signup
          </Button>
        </form>
        <Button
          onClick={() => navigate("/login")}
          variant={"outline"}
          className="w-full mt-4 p-2 text-black border border-amber-400 rounded hover:bg-amber-50"
        >
          Already have an account? Login
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
