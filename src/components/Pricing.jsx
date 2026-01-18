import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";

const Pricing = () => {
  const sectionRef = useRef(null);
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
        threshold: 0.25,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="Pricing"
      className={`
        relative mt-20 min-h-[800px] border-b border-neutral-800 scroll-mt-24

        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-14 scale-95"
        }
      `}
    >
      {/* TITLE */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        Pricing
      </h2>

      {/* CARDS */}
      <div className="flex flex-wrap">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 p-2"
          >
            <div className="p-10 border border-neutral-700 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <p className="text-4xl mb-8">
                {option.title}
                {option.title === "Pro" && (
                  <span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-xl mb-4 ml-2">
                    (Most Popular)
                  </span>
                )}
              </p>

              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">{option.price}</span>
                <span className="text-neutral-400 tracking-tight">
                  /Month
                </span>
              </p>

              <ul>
                {option.features.map((feature, index) => (
                  <li
                    key={index}
                    className="mt-8 flex items-center transition-transform duration-200 hover:translate-x-1"
                  >
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl
                  hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200"
              >
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
