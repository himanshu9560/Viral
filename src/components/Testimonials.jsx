import { useEffect, useRef, useState } from "react";
import { testimonials } from "../constants";

const Testimonials = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      {
        // 👇 KEY FIX for mobile
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="Testimonials"
      className={`
        relative mt-20 border-b border-neutral-800
        scroll-mt-24 tracking-wide

        transition-all duration-700 ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }
      `}
    >
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying
      </h2>

      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2"
          >
            <div className="bg-neutral-900 rounded-md p-6 text-md border border-neutral-800 font-thin transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <p>{testimonial.text}</p>

              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt={testimonial.user}
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
