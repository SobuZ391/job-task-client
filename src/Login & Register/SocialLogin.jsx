
import { useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './../Hooks/useAuth';

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then((result) => {
                if (result.user) {
                    // Show a toast notification for successful login
                    toast.success('Login successful!');

                    // Navigate to the desired route
                    setTimeout(() => {
                        navigate(from);
                      }, 1000);
                }
            })
            .catch((error) => {
                // Show a toast notification for login failure
                toast.error('Login failed. Please try again.');

                // Optionally log the error
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="flex gap-3 my-5 justify-center items-center">
            <button className="btn" onClick={() => handleSocialLogin(googleLogin)}>
                <FaGoogle /> Google
            </button>
            <button className="btn" onClick={() => handleSocialLogin(githubLogin)}>
                <FaGithub /> GitHub
            </button>
           
            <ToastContainer />
        </div>
    );
};

export default SocialLogin;
