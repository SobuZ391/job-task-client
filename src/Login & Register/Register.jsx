import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from './../Hooks/useAuth';
import SocialLogin from "./SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from "react";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Navigation systems
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // Function to verify the password based on the given criteria
  const verifyPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasValidLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }

    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }

    if (!hasValidLength) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const onSubmit = (data) => {
    const { email, password, image, fullName } = data;
  
    // Verify the password
    if (!verifyPassword(password)) {
      return;
    }
  
    // Create the user and update the profile
    createUser(email, password)
      .then(() => {
        updateUserProfile(fullName, image)
        .then(() => {
          // Display success toast after successful registration and profile update
          toast.success("Registration successful! Welcome!");

          // Delay navigation by 1 second (1000ms) to allow the toast to be displayed
          setTimeout(() => {
            navigate(from);
          }, 1000);
        })
          .catch((error) => {
            toast.error("Failed to update user profile: " + error.message);
          });
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content lg:w-[70%] flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold border-2 p-3 rounded-xl text-gray-700 ">Register now!</h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                  {...register("image")}
                />
              </div>
              <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="input-group flex items-center">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-[90%]"
            {...register("password", { required: true })}
          />
          {/* Eye icon to toggle password visibility */}
          <button
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && <span className="text-red-500">This field is required</span>}
      </div>
              <div className="form-control mt-6 p-0">
                <button type="submit" className="btn  btn-primary ">Register</button>
              </div>
              <label className="label">
                Have an account?{" "}
                <Link to="/login" className="label-text-alt  link link-hover">
                  Please Login
                </Link>
              </label>
              <SocialLogin />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
