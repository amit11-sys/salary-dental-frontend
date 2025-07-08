import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  category: z.enum(["general", "bug", "feature"]),
  feedback: z.string().min(1, "Message is required"),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
const Feedback = () => {
    const { request } = useAxios();
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "general",
      feedback: "",
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
      const url = `${import.meta.env.VITE_BASE_URL}feedback`;
        request(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data, // ✅ send form data here
        })
          .then((res: any) => {
            //    console.log(res);
            if (res?.status === 201) {
              toast.success("Thanks for your feedback! We will get back to you soon.");
              //  navigate("/thank-you");
            }
          })
          .catch(() => {
            toast.error("Error occurred while sending message", {
              autoClose: 3000,
            });
          });
    
    reset(); // Reset form
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Send Us Feedback
        </h1>
       <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name (Optional)
        </label>
        <input
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your name"
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (Optional)
        </label>
        <input
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="your@email.com"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Feedback Type
        </label>
        <select
          {...register("category")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="general">General Feedback</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          {...register("feedback")}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Share your thoughts, suggestions, or report issues..."
        />
        {errors.feedback && (
          <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>
    </form>
      </div>
    </div>
  );
};

export default Feedback;
