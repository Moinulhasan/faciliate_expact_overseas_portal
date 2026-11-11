import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const TestData = [
  {
    id: 1,
    title: "Job Placement Assistance – Details",
    sub_title:
      "Our Job Placement Assistance service ensures you make informed decisions about your career abroad. Our process involves:",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80",
    list: [
      "<strong>Assessment of Skills and Interests:</strong> We start by understanding your career aspirations and preferences.",
      "<strong>Resume and Cover Letter Crafting:</strong> Tailoring your application materials to stand out in the competitive job market.",
      "<strong>Career Counseling:</strong> Providing insights into global job trends and opportunities.",
      "<strong>Interview Preparation:</strong> Mock sessions and tips to help you excel in interviews.",
      "<strong>Employer Connections:</strong> Leveraging our network to connect you with trusted employers.",
    ],
  },
  {
    id: 2,
    title: "Visa Assistance - Details",
    sub_title:
      "We provide end-to-end support for visa processes to ensure your travel plans proceed without a hitch. Key aspects include:",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    list: [
      "<strong>Customized Guidance:</strong> Our team understands visa regulations and tailors the process for each country.",
      "<strong>Document Checklist:</strong> We provide a detailed checklist to ensure all required documents are ready.",
      "<strong>Mock Interviews:</strong> Practice sessions to boost your confidence for visa interviews.",
      "<strong>Post-Visa Services:</strong> Assistance with housing, local transportation, and other settling-in support upon arrival.",
    ],
  },
  {
    id: 3,
    title: "Document Processing - Details",
    sub_title:
      "Our document processing services are designed to save you time and effort. Highlights include:",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
    list: [
      "<strong>Legal Authentication:</strong> Ensuring all your documents are legally acceptable in your destination country.",
      "<strong>Translations:</strong> Accurate translations by certified professionals to meet international standards.",
      "<strong>Digital Accessibility:</strong> Secure storage and easy access to your documents through our digital platform.",
      "<strong>Real-Time Tracking:</strong> Stay updated on the status of your applications and submissions.",
    ],
  },
];

const Details = () => {
  const { id } = useParams();
  const [post, setPost] = useState<{
    id: number;
    title: string;
    image: string;
    sub_title: string;
    list: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPost(TestData.find((item) => item.id === Number(id)) || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${post.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-slate lg:prose-lg max-w-none">
          <div className="flex items-center space-x-4 text-gray-700">
            <div>
              <p className="font-medium">{post.sub_title}</p>
            </div>
          </div>
          <ul className="list-decimal marker:text-black-700">
            {post.list.map((paragraph: string, index: number) => (
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

export default Details;
