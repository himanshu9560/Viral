import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import codeImg from "../assets/code.jpg";
import { checklistItems } from "../constants";

const Workflow = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          // reset animation when scrolling away
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
      id="Workflow"
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
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Accelerate your{" "}
        <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
          coding workflow.
        </span>
      </h2>

      {/* CONTENT */}
      <div className="flex flex-wrap justify-center">
        {/* IMAGE */}
        <div className="p-2 w-full lg:w-1/2 transition-transform duration-300 hover:scale-105">
          <img
            src={codeImg}
            alt="Coding"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* CHECKLIST */}
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div
              key={index}
              className="flex mb-12 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>

              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
