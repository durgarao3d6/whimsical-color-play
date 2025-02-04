import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MDEditor from '@uiw/react-md-editor';
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
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
      if (!data) throw new Error('Post not found');
      return data;
    },
    enabled: !!slug,
  });

  const recordView = useMutation({
    mutationFn: async () => {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { error } = await supabase
        .from('post_views')
        .insert([
          {
            post_slug: slug,
            ip_address: ip
          }
        ]);
      
      if (error) throw error;
    }
  });

  useEffect(() => {
    if (slug && !isLoading && post) {
      recordView.mutate();
    }
  }, [slug, isLoading, post]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
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
        <div className="flex justify-between items-center mb-8">
          <Link to="/blog">
            <Button variant="outline">
              ← Back to Blog
            </Button>
          </Link>
          {profile?.is_admin && (
            <Link to={`/blog/${post.slug}/edit`}>
              <Button className="bg-secondary text-white hover:bg-secondary/90">
                Edit Post
              </Button>
            </Link>
          )}
        </div>
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
            data-color-mode="light"
          >
            <MDEditor.Markdown 
              source={post.content || ''}
              className="!bg-transparent"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPost;