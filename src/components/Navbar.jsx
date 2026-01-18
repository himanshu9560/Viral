import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll animation (DISABLED when menu is open)
  useEffect(() => {
    if (mobileDrawerOpen) return;

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileDrawerOpen]);

  // Lock background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileDrawerOpen ? "hidden" : "auto";
  }, [mobileDrawerOpen]);

  return (
    <nav
      className={`
        sticky top-0 z-50
        border-b border-neutral-700/80
        transition-all duration-300 ease-out
        ${
          scrolled && !mobileDrawerOpen
            ? "py-1 bg-neutral-900/80 backdrop-blur-xl shadow-lg"
            : "py-3 bg-neutral-900/50 backdrop-blur-md"
        }
      `}
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className={`mr-2 transition-all duration-300 ${
                scrolled ? "h-8 w-8" : "h-10 w-10"
              }`}
            />
            <span className="text-xl tracking-tight">Viral-VR</span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                <a
                  href={item.href}
                  className="hover:text-orange-400 transition"
                >
                  {item.label}
                </a>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all group-hover:w-full"></span>
              </li>
            ))}
          </ul>

          {/* Desktop Auth */}
          <div className="hidden md:flex space-x-8 items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-1.5 rounded-md bg-gradient-to-r from-orange-500 to-orange-700 text-white text-sm">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="z-50 relative"
            >
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (transform-only animation) */}
      <div
        className={`
          fixed inset-0 z-40 bg-neutral-900
          flex flex-col justify-center items-center md:hidden
          transition-transform duration-300 ease-out
          ${
            mobileDrawerOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <ul className="text-2xl">
          {navItems.map((item, index) => (
            <li key={index} className="py-4">
              <a
                href={item.href}
                onClick={() => setMobileDrawerOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex space-x-6 mt-8">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 text-white">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
