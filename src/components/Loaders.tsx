// src/components/Spinner.js
import { useLoading } from "../context/LoadingContext";

const Spinner = () => {
  const { loading } = useLoading();

  return loading ? (
    // <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    //   <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
  ) : null;
};

export default Spinner;
