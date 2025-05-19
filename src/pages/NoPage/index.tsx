import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-full px-2 md:px-16 py-5 md:py-10  mt-2">
        <div className="mx-auto w-full bg-white rounded-xl p-6">
          <ChevronLeftIcon
            className="h-6 w-6 text-gray-700 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="flex items-center justify-center h-[80vh] relative">
            <div className="text-center">
              <h1 className="text-[140px] font-bold text-gray-800">404</h1>
              <h2 className="text-5xl text-gray-700 mt-4">
                SORRY! THE PAGE NOT FOUND
              </h2>
              <p className="text-gray-700 mt-40 text-lg w-1/2 mx-auto">
                Lorem ipsum dolor sit amet, consec tse tur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore
              </p>
              <img
                src="/images/Vector (5).png"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
