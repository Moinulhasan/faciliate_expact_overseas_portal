import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);

      const response = await fetch(
        "https://api.overseas.facilitatexpat.com/api/contact-us",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );
      reset();
      setMessage("Success!");
      setIsModalOpen(true);
      const final = await response.json();
      console.log("Success:", final);
    } catch (e) {
      setMessage("Error!");
      console.log(e);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              {message}
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              {message === "Error!"
                ? "Something went wrong!"
                : "Thank you we will contact with you."}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Enter name"
                onBlur={onBlur}
                onChange={onChange}
                value={value || ""}
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
          {errors?.name?.message && (
            <p className="px-2 text-sm text-red-800">
              {String(errors.name.message)}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                placeholder="Enter email"
                onBlur={onBlur}
                onChange={onChange}
                value={value || ""}
                name="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
          {errors?.email?.message && (
            <p className="px-2 text-sm text-red-800">
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                placeholder="Enter phone"
                onBlur={onBlur}
                onChange={onChange}
                value={value || ""}
                name="phone"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
          {errors?.phone?.message && (
            <p className="px-2 text-sm text-red-800">
              {String(errors.phone.message)}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <Controller
            name="message"
            control={control}
            rules={{
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <textarea
                id="message"
                name="message"
                placeholder="Enter message"
                onBlur={onBlur}
                onChange={onChange}
                value={value || ""}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
          {errors?.message?.message && (
            <p className="px-2 text-sm text-red-800">
              {String(errors.message.message)}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
