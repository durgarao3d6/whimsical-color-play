import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: blogStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['blog-stats'],
    queryFn: async () => {
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('slug, title, created_at');
      
      if (postsError) throw postsError;

      const { data: views, error: viewsError } = await supabase
        .from('post_views')
        .select('post_slug, viewed_at');
      
      if (viewsError) throw viewsError;

      const postStats = posts.map(post => ({
        ...post,
        viewCount: views.filter(view => view.post_slug === post.slug).length
      }));

      return {
        totalPosts: posts.length,
        totalViews: views.length,
        postStats
      };
    },
    enabled: !!profile?.is_admin,
  });

  useEffect(() => {
    if (profile && !profile.is_admin) {
      navigate('/');
    }
  }, [profile, navigate]);

  if (!user || !profile?.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-secondary">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {isLoadingStats ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  blogStats?.totalPosts || 0
                )}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {isLoadingStats ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  blogStats?.totalViews || 0
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingStats ? (
                  [...Array(3)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  blogStats?.postStats.map((post) => (
                    <TableRow key={post.slug}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        {new Date(post.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">{post.viewCount}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;