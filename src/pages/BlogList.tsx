import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const BlogList = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      description: "Learn the basics of React and start building modern web applications.",
      date: "March 15, 2024",
      image: "photo-1488590528505-98d2b5aba04b",
      category: "Development",
      content: "React is a popular JavaScript library for building user interfaces..."
    },
    {
      id: 2,
      title: "Mastering TypeScript",
      description: "Deep dive into TypeScript features and best practices.",
      date: "March 10, 2024",
      image: "photo-1518770660439-4636190af475",
      category: "Programming",
      content: "TypeScript adds static typing to JavaScript, making it more robust..."
    },
    {
      id: 3,
      title: "Web Design Trends 2024",
      description: "Explore the latest trends in web design and UI/UX.",
      date: "March 5, 2024",
      image: "photo-1487058792275-0ad4aaf24ca7",
      category: "Design",
      content: "The web design landscape is constantly evolving..."
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-secondary">Blog Posts</h1>
          <Link to="/blog/create">
            <Button className="bg-secondary text-white hover:bg-secondary/90">
              Create New Post
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={`/blog/${post.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={`https://source.unsplash.com/${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-secondary">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-secondary">Read More →</span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;