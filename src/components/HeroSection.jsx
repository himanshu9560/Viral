import { useEffect, useRef, useState } from "react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          // reset animation when leaving viewport
          setVisible(false);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={heroRef}
      className={`
        flex flex-col items-center mt-6 lg:mt-20

        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-14 scale-95"
        }
      `}
    >
      {/* TITLE */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Viral-VR build tools
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          for developers
        </span>
      </h1>

      {/* DESCRIPTION */}
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Empower your creativity and bring your VR app ideas to life with our
        intuitive development tools. Get started today and turn your imagination
        into immersive reality!
      </p>

      {/* BUTTONS */}
      <div className="flex justify-center my-10">
        <a
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md transition-transform duration-300 hover:scale-105"
        >
          Start for free
        </a>
        <a
          href="#"
          className="py-3 px-4 mx-3 rounded-md border transition-transform duration-300 hover:scale-105"
        >
          Documentation
        </a>
      </div>

      {/* VIDEOS */}
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 transition-transform duration-300 hover:scale-105"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4 transition-transform duration-300 hover:scale-105"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
