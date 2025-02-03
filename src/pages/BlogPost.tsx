import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MDEditor from '@uiw/react-md-editor';
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams();
  
  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary">
        <Navigation />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-[400px] w-full mb-8" />
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-8 w-full mb-8" />
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-primary">
        <Navigation />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <Button variant="outline">
              ← Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
              src={`https://source.unsplash.com/random/800x600?${post.category_slug || 'blog'}`}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
              {post.categories?.name || 'Uncategorized'}
            </span>
            <span className="text-gray-500 text-sm">
              {formatDate(post.created_at)}
            </span>
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