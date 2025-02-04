import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import BlogList from "@/pages/BlogList";
import BlogPost from "@/pages/BlogPost";
import CreateBlog from "@/pages/CreateBlog";
import EditBlog from "@/pages/EditBlog";
import ProjectDemo from "@/pages/ProjectDemo";
import AdminDashboard from "@/pages/AdminDashboard";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/:slug/edit" element={<EditBlog />} />
            <Route path="/project-demo" element={<ProjectDemo />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;