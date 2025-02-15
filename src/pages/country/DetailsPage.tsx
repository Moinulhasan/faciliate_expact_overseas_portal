import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CountryListData } from "../../lib/data/DemoData";

const DetailsPage = () => {
  const { slug } = useParams();
  const [country, setCountry] = useState<{
    id: number;
    name: string;
    image: string;
    details: string[];
    list: string[];
  } | null>(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setCountry(CountryListData.find((item) => item.slug === slug) || null);
  }, [slug]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-[length:100%_100%] bg-[100%_100%] bg-no-repeat"
          style={{
            backgroundImage: `url('${country?.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              {country?.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-slate lg:prose-lg max-w-none">
          <div className="flex items-center space-x-4 text-gray-700">
            <div>
              <p className="font-medium">Description:</p>
              {country?.details.map((paragraph: string, index: number) => (
                <p className="font-normal" key={index}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
          <p className="font-medium">Services:</p>
          <ul className="list-decimal marker:text-black-700">
            {country?.list.map((paragraph: string, index: number) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph.trim() }}
                className="text-gray-700 leading-relaxed my-6"
              ></li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
};

export default DetailsPage;
