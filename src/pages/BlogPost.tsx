import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();
  
  // This would typically come from an API
  const post = {
    id: parseInt(id || "1"),
    title: "Getting Started with React",
    description: "Learn the basics of React and start building modern web applications.",
    date: "March 15, 2024",
    image: "photo-1488590528505-98d2b5aba04b",
    category: "Development",
    content: `React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has since become one of the most widely used frontend technologies.

In this comprehensive guide, we'll cover:

1. Setting up your development environment
2. Understanding React components
3. Working with state and props
4. Handling user events
5. Making API calls

React's component-based architecture makes it easy to build scalable applications. By breaking down your UI into smaller, reusable components, you can create maintainable and efficient code.

Components can be either class-based or functional, though the trend in modern React development is to use functional components with hooks. Hooks provide a way to use state and other React features without writing a class.

Let's look at a simple example:

const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};

This is just the beginning of what you can do with React. As you progress, you'll learn about more advanced concepts like context, custom hooks, and performance optimization.`
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-24"
      >
        <Link to="/blog">
          <Button variant="outline" className="mb-8">
            ← Back to Blog
          </Button>
        </Link>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src={`https://source.unsplash.com/${post.image}`}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.date}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{post.description}</p>
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;