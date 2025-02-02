import ContactForm from "../../components/global/ContactForm";

export default function Contact() {
  return (
    <section className="py-20 bg-blue-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Ready to start your educational journey? Contact us today for
              expert guidance and support.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Office Address
                </h3>
                <p className="text-gray-600">
                  18/3 Naya Paltan, Level-04/B,
                  <br />
                  Mashjid Goli, Dhaka-1000
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-600">
                  Email: rafik@facilitatexpat.com
                  <br />
                  Phone: +880 17 1970 6041
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Office Hours
                </h3>
                <p className="text-gray-600">
                  Sunday - Thusday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
