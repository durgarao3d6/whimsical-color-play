import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import TaskList from "@/components/admin/TaskList";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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

  const { data: taskStats, isLoading: isLoadingTaskStats } = useQuery({
    queryKey: ['task-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('status');
      
      if (error) throw error;

      const stats = {
        completed: data.filter(task => task.status === 'completed').length,
        inProgress: data.filter(task => task.status === 'in_progress').length,
        pending: data.filter(task => task.status === 'pending').length,
      };

      return [
        { name: 'Completed', value: stats.completed, color: '#34a853' },
        { name: 'In Progress', value: stats.inProgress, color: '#fbbc05' },
        { name: 'Pending', value: stats.pending, color: '#ea4335' },
      ];
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-secondary">Admin Dashboard</h1>
          <Button onClick={() => navigate('/admin/tasks/new')}>Create New Task</Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
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
                <CardTitle>Task Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoadingTaskStats ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="h-full w-full" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {taskStats?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

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
          </TabsContent>

          <TabsContent value="tasks">
            <TaskList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;