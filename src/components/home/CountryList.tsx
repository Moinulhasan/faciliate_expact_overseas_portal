import { CountryListData } from "../../lib/data/DemoData";

const CountryList = () => {
  return (
    <section className="py-10" id="countryList">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CountryListData.map((country, index) => {
            return (
              <>
                <li
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="h-40 bg-gray-200">
                    <img
                      src={country.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CountryList;
