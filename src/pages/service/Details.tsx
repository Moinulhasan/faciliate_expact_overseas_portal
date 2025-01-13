import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const TestData = [
  {
    id: 1,
    title: "Academic Counseling - Details",
    sub_title:
      "Our Academic Counseling service ensures you make informed decisions about your education abroad. Our process involves:",
    list: [
      "*Assessment of Goals and Interests:* We start by understanding your aspirations and preferences.",
      "*University and Course Selection:* Based on your profile, we suggest institutions and programs that best suit your needs.",
      "*Profile Enhancement:* We help you showcase your strengths to stand out in the competitive admissions process.",
      "*Application Support:* Our experts guide you through crafting compelling applications, essays, and recommendation letters.",
      "*Ongoing Support:* From interview preparation to final admission decisions, we're with you every step of the way.",
    ],
  },
  {
    id: 2,
    title: "Visa Assistance - Details",
    sub_title:
      "We provide end-to-end support for visa processes to ensure your travel plans proceed without a hitch. Key aspects include:",
    list: [
      "*Customized Guidance:* Our team understands visa regulations and tailors the process for each country.",
      "*Document Checklist:* We provide a detailed checklist to ensure all required documents are ready.",
      "*Mock Interviews:* Practice sessions to boost your confidence for visa interviews.",
      "*Post-Visa Services:* Assistance with housing, local transportation, and other settling-in support upon arrival.",
    ],
  },
  {
    id: 3,
    title: "Document Processing - Details",
    sub_title:
      "Our document processing services are designed to save you time and effort. Highlights include:",
    list: [
      "*Legal Authentication:* Ensuring all your documents are legally acceptable in your destination country.",
      "*Translations:* Accurate translations by certified professionals to meet international standards.",
      "*Digital Accessibility:* Secure storage and easy access to your documents through our digital platform.",
      "*Real-Time Tracking:* Stay updated on the status of your applications and submissions.",
    ],
  },
];

const Details = () => {
  const { id } = useParams();
  const [post, setPost] = useState<{
    id: number;
    title: string;
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
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div>
                <p className="font-medium">{post.sub_title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-slate lg:prose-lg max-w-none">
          {post.list.map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-700 leading-relaxed my-6">
              {paragraph.trim()}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
};

export default Details;
