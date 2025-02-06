import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to create a project");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("projects").insert({
        title: formData.title,
        description: formData.description,
        github_url: formData.githubUrl,
        demo_url: formData.demoUrl,
        image_url: imageUrl,
        created_by: user.id,
      });

      if (error) throw error;

      toast.success("Project created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Project</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
            GitHub URL
          </label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="demoUrl" className="block text-sm font-medium mb-2">
            Demo URL
          </label>
          <Input
            id="demoUrl"
            name="demoUrl"
            type="url"
            value={formData.demoUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Image</label>
          <ImageUpload onUploadComplete={setImageUrl} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Project preview"
              className="mt-4 max-w-xs rounded-lg"
            />
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Project"}
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;