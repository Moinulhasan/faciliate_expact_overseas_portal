import { useEffect, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useForm, Controller } from "react-hook-form";

export default function Contact() {
  useScrollAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const onSubmit = async (data: any) => {
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);

      const response = await fetch(
        "http://api.overseas.facilitatexpat.com/api/contact-us",
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
    <div className="">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 text-center">
              {message}
            </h3>
            <p className="text-gray-700 mt-2 text-center">
              {message === "Error!"
                ? "Thank you we will contact with you."
                : "Something went wrong!"}
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
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl animate-fade-in delay-100">
              Get in touch with our team for any inquiries or support
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">rafik@facilitatexpat.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+880 17 1970 6041</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    18/3 Naya Paltan, Level-04/B,
                    <br />
                    Mashjid Goli, Dhaka-1000
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
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
        </div>
      </div>
    </div>
  );
}
