import { useState } from 'react';

type AccordionProps = {
  heading: string;
  des: string;
};

function Accordion({ heading, des }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-[#2E2B6E]">{heading}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600">{des}</div>
      </div>
    </div>
  );
}

export default Accordion;
