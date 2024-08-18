import  { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';



const Navbar = () => {
    const [theme,setTheme]=useState(localStorage.getItem("theme")? localStorage.getItem("theme"):"light");

    const handleToggle=(e)=>{
        if(e.target.checked){
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }
    
    useEffect(()=>{
        localStorage.setItem("theme",theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme",localTheme)
    },[theme]);
   
    const {logout,user}=useAuth();
    return (
        <>
            <div className="navbar container  mx-auto rounded-b-3xl z-5 bg-base-200">
                <div className="navbar-start">
                    <div className="dropdown z-10">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52">
                        <div className='flex  justify-center' >
                        <label className="flex cursor-pointer gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
         <input type="checkbox" onChange={handleToggle} value="synthwave"  className="toggle theme-controller"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>
                        </div>
                        <Link className='btn text-lg  btn-ghost' to='/' >Home</Link>
                    <Link to='/products' className='btn text-lg  btn-ghost' >Products</Link>
                    <Link to='/contact' className='btn text-lg  btn-ghost' >Contact</Link>
         </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost  font-bold lg:w-[100%]   w-[50%] lg:text-xl">
                    AshBorn   Ecomerce</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal items-center px-1">
                    <Link className='btn text-lg  btn-ghost' to='/' >Home</Link>
                    <Link to='/products' className='btn text-lg  btn-ghost' >Products</Link>
                    <Link to='/contact' className='btn text-lg  btn-ghost' >Contact</Link>
                
                         
                    </ul>
                </div>

                   
                {/* avatar part  */}
                <div className="navbar-end">
                <div className='lg:block hidden' >
                        <label className="flex cursor-pointer gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
         <input type="checkbox" onChange={handleToggle} value="synthwave"  className="toggle theme-controller"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </label>
                        </div>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ">
                                    <img  src={user?.photoURL || '/images/client3.png'} alt={user.displayName} />
                                   
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <button className="btn btn-sm  btn-ghost">{user?.displayName ||'user name not found'}</button>

                                </li>
                                <li>
                                    <button className="btn btn-sm  btn-ghost"
                                        onClick={logout}
                                    >Logout</button>

                                </li>
                            </ul>
                        </div>
                            :
                         <>  <Link to='/login'>
                                <button className="btn lg:btn-outline  btn-sm  btn-ghost">Login</button>
                            </Link>
                            <Link to='/register'>
                                <button className="btn btn-sm lg:btn-outline m-2 btn-ghost">Register</button>
                            </Link>

                            </> 
                    }
                   
                </div>
            </div>
        </>
    );
};

export default Navbar;