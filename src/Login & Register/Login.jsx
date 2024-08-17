import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from './SocialLogin';
import useAuth from './../Hooks/useAuth';

const Login = () => {
    const { signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
   
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Navigation systems
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";

  

    // Handle form submission
    const onSubmit = data => {
        const { email, password } = data;

       

        // Sign in the user
        signInUser(email, password)
        .then(() => {
            // Display success toast after successful registration and profile update
            toast.success("Login successful! Welcome!");
  
            // Delay navigation by 1 second (1000ms) to allow the toast to be displayed
            setTimeout(() => {
              navigate(from);
            }, 1000);
          })
            .catch(() => {
                toast.error('Login failed: Make sure you submitted correct information ' );
            });
    };

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content  lg:w-[70%] flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold border-2 p-3 rounded-xl text-gray-700">Login now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered w-[90%]"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <span className="text-red-500">This field is required</span>}
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
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <label className="label">
                                New here? <Link to="/register" className="label-text-alt link link-hover">Create an account</Link>
                            </label>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;