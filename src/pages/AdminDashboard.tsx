import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import TaskList from "@/components/admin/TaskList";
import { motion } from "framer-motion";
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
import { ClipboardList, BarChart, Users, TrendingUp } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

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
        { name: 'Completed', value: stats.completed, color: '#34C759' },
        { name: 'In Progress', value: stats.inProgress, color: '#5856D6' },
        { name: 'Pending', value: stats.pending, color: '#FF2D55' },
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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#1A1F2C]">Analytics Dashboard</h1>
          <Button 
            onClick={() => navigate('/admin/tasks/new')}
            className="bg-[#5856D6] hover:bg-[#5856D6]/90 transition-colors"
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </motion.div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#5856D6] data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-[#5856D6] data-[state=active]:text-white">
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div variants={fadeInUp} custom={0}>
                <Card className="hover:shadow-lg transition-shadow bg-white border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#1A1F2C]">
                      <BarChart className="mr-2 h-5 w-5 text-[#5856D6]" />
                      Total Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-[#5856D6]">
                      {isLoadingStats ? (
                        <Skeleton className="h-10 w-20" />
                      ) : (
                        blogStats?.totalPosts || 0
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <TrendingUp className="inline-block mr-1 h-4 w-4 text-[#34C759]" />
                      Active posts
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeInUp} custom={1}>
                <Card className="hover:shadow-lg transition-shadow bg-white border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#1A1F2C]">
                      <Users className="mr-2 h-5 w-5 text-[#5856D6]" />
                      Total Views
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-[#5856D6]">
                      {isLoadingStats ? (
                        <Skeleton className="h-10 w-20" />
                      ) : (
                        blogStats?.totalViews || 0
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <TrendingUp className="inline-block mr-1 h-4 w-4 text-[#34C759]" />
                      Total engagement
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp} custom={2}>
                <Card className="hover:shadow-lg transition-shadow bg-white border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center text-[#1A1F2C]">
                      <ClipboardList className="mr-2 h-5 w-5 text-[#5856D6]" />
                      Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-[#5856D6]">
                      {isLoadingTaskStats ? (
                        <Skeleton className="h-10 w-20" />
                      ) : (
                        taskStats?.reduce((acc, curr) => acc + curr.value, 0) || 0
                      )}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <TrendingUp className="inline-block mr-1 h-4 w-4 text-[#34C759]" />
                      Active tasks
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} custom={3}>
              <Card className="hover:shadow-lg transition-shadow bg-white border-none">
                <CardHeader>
                  <CardTitle className="text-[#1A1F2C]">Task Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
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
                          innerRadius={80}
                          outerRadius={120}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          className="animate-fade-in"
                        >
                          {taskStats?.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color}
                              className="hover:opacity-80 transition-opacity"
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          formatter={(value) => <span className="text-[#1A1F2C]">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} custom={4}>
              <Card className="hover:shadow-lg transition-shadow bg-white border-none">
                <CardHeader>
                  <CardTitle className="text-[#1A1F2C]">Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[#1A1F2C]">Title</TableHead>
                        <TableHead className="text-[#1A1F2C]">Created At</TableHead>
                        <TableHead className="text-right text-[#1A1F2C]">Views</TableHead>
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
                          <TableRow key={post.slug} className="hover:bg-gray-50 transition-colors">
                            <TableCell className="font-medium text-[#1A1F2C]">{post.title}</TableCell>
                            <TableCell className="text-gray-500">
                              {new Date(post.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right text-[#5856D6] font-medium">{post.viewCount}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="tasks">
            <motion.div variants={fadeInUp}>
              <TaskList />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;