import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

export default function BlogDetails() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    // Simulate API call - replace with real API call
    setTimeout(() => {
      setPost({
        id: Number(id),
        title: "Understanding International Education Trends in 2024",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        date: "January 15, 2024",
        readTime: "8 min read",
        image: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80`,
        author: {
          name: "Sarah Johnson",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
      });
      setLoading(false);
    }, 1000);
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
            backgroundImage: `url(${post.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/80" />
        <div className="relative h-full flex items-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/90">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm">
                  {post.date} · {post.readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-slate lg:prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed my-6">
              {paragraph.trim()}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
}
