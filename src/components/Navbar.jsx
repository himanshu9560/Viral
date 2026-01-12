import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-2 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Viral-VR</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden md:flex justify-center space-x-8 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="
                  px-4 py-1.5 rounded-md
                  bg-gradient-to-r from-orange-500 to-orange-700
                 text-white text-sm font-medium
                  hover:opacity-90
                  transition
                ">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href} onClick={toggleNavbar}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Auth */}
            <div className="flex space-x-6 mt-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="
                    px-6 py-2 rounded-lg
                    bg-gradient-to-r from-orange-500 to-orange-700
                    text-white font-semibold
                    transition-all duration-300
                  ">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
