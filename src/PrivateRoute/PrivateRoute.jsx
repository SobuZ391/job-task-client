import { Navigate, useLocation } from "react-router-dom";
import useAuth from './../Hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); 
    const location = useLocation(); 

    // Show loading indicator while the authentication status is being determined
    if (loading) {
      return (
        <div className="flex items-center justify-center w-full my-4">
          <div className="animate-pulse rounded shadow-md w-full py-4 dark:bg-gray-50">
            {/* Loading content here */}
          </div>
        </div>
      );
    }
    
    // Redirect to login if there is no authenticated user
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // Render children if the user is authenticated
    return <>{children}</>;
}

export default PrivateRoute;
