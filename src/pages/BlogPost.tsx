import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MDEditor from '@uiw/react-md-editor';
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
    content: `# Getting Started with React

React is a popular JavaScript library for building user interfaces. It was developed by Facebook and has since become one of the most widely used frontend technologies.

## Key Concepts

1. Components
2. Props
3. State
4. Hooks

### Components

Components are the building blocks of React applications. They can be either class-based or functional.

\`\`\`jsx
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};
\`\`\`

### Props

Props allow you to pass data between components:

\`\`\`jsx
const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
\`\`\`

This is just the beginning of what you can do with React!`
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
          <div 
            className="prose prose-lg max-w-none p-8 rounded-xl backdrop-blur-lg bg-white/10 shadow-xl border border-white/20" 
            style={{
              background: `linear-gradient(109.6deg, rgba(230, 244, 234, 0.5) 11.2%, rgba(244, 252, 248, 0.5) 91.1%)`,
              backgroundImage: `
                linear-gradient(109.6deg, rgba(230, 244, 234, 0.5) 11.2%, rgba(244, 252, 248, 0.5) 91.1%),
                url(https://source.unsplash.com/photo-1513836279014-a89f7a76ae86)
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'soft-light'
            }}
            data-color-mode="light"
          >
            <MDEditor.Markdown 
              source={post.content}
              className="!bg-transparent"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;