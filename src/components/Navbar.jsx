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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-neutral-900/70 border-b border-neutral-700/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-9 w-9" />
              <span className="text-lg font-semibold">Viral-VR</span>
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-10">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a
                    href={item.href}
                    className="text-sm font-medium text-neutral-200 hover:text-orange-400 transition"
                  >
                    {item.label}
                  </a>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all group-hover:w-full" />
                </li>
              ))}
            </ul>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`
          fixed inset-0 z-40 bg-neutral-950
          flex flex-col items-center justify-center
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Close button top right */}
        <button
          className="absolute top-5 right-5"
          onClick={() => setMobileOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col items-center gap-8 text-2xl font-semibold">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="hover:text-orange-400 transition"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="mt-12">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Spacer so content doesn't hide behind navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
