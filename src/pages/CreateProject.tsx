import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const COMMON_TECH_STACK = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python",
  "Vue.js", "Angular", "Next.js", "Express", "MongoDB",
  "PostgreSQL", "MySQL", "Redis", "Docker", "AWS",
  "Firebase", "Supabase", "GraphQL", "REST API", "TailwindCSS"
];

const CreateProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newTech, setNewTech] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
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
        tech_stack: techStack,
      });

      if (error) throw error;

      toast.success("Project created successfully!");
      navigate("/projects");
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

  const addTechStack = (tech: string) => {
    if (tech && !techStack.includes(tech)) {
      setTechStack([...techStack, tech]);
      setNewTech("");
    }
  };

  const removeTechStack = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="githubUrl" className="block text-sm font-medium">
            GitHub URL
          </label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="demoUrl" className="block text-sm font-medium">
            Demo URL
          </label>
          <Input
            id="demoUrl"
            name="demoUrl"
            type="url"
            value={formData.demoUrl}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">Tech Stack</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechStack(tech)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="Add technology..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechStack(newTech);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addTechStack(newTech)}
            >
              Add
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Common technologies:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_TECH_STACK.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary/20"
                  onClick={() => addTechStack(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Project Image</label>
          <ImageUpload onUploadComplete={setImageUrl} />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Project preview"
              className="mt-4 max-w-xs rounded-lg"
            />
          )}
        </div>

        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;