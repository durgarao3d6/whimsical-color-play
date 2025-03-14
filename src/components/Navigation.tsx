import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import useMobile from "../hooks/use-mobile";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Fetch admin status
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative">
        <div className="text-2xl font-bold relative">
          <motion.div
            className="absolute -top-1 -left-3 w-6 h-6 transform rotate-45"
            style={{
              background: 'linear-gradient(135deg, #34a853 0%, #68c087 100%)',
              borderRadius: '100% 0',
            }}
            animate={{
              rotate: [45, 55, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-2 left-1 w-5 h-5 transform -rotate-12"
            style={{
              background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
              borderRadius: '100% 0',
            }}
            animate={{
              rotate: [-12, -22, -12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <span className="relative z-10 bg-gradient-to-r from-secondary to-green-600 bg-clip-text text-transparent font-bold">
            VDL
          </span>
        </div>
      </div>
    </Link>
  );

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    ...(profile?.is_admin ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const authItems = user ? (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  ) : (
    <Link to="/auth">
      <Button variant="secondary">Sign In</Button>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.name} to={item.path} className="text-gray-800 hover:text-secondary">
                {item.name}
              </Link>
            ))}
            {authItems}
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-primary shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="text-gray-800 hover:text-secondary"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              {authItems}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;