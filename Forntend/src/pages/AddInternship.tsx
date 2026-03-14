import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Trash2, PlusCircle, Loader2 } from "lucide-react";

const AddInternship = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [internships, setInternships] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    category: "",
    description: "",
    type: "tech", 
  });

  // Backend Port 5000 hai toh yahan fix kar rahe hain fallback ke liye
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchInternships = async () => {
    try {
      console.log("Fetching from:", `${API_BASE}/internships/all`);
      const res = await fetch(`${API_BASE}/internships/all`);
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      console.log("Full Data Received:", data);

      // Backend format check: agar data.data hai ya sirf data array hai
      if (data.success) {
        setInternships(data.data || []);
      } else if (Array.isArray(data)) {
        setInternships(data);
      }
    } catch (err) {
      console.error("Fetch error details:", err);
      // toast.error("Could not load internships");
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`${API_BASE}/internships/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Delete request failed");
      
      const data = await res.json();
      if (data.success) {
        toast.success("Deleted successfully!");
        fetchInternships();
      }
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Sending Data:", formData);
      const res = await fetch(`${API_BASE}/internships/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Internship Posted Successfully!");
        setFormData({ title: "", duration: "", category: "", description: "", type: "tech" });
        // Turant list update karein
        fetchInternships();
      } else {
        throw new Error(data.message || "Failed to post");
      }
    } catch (err: any) {
      toast.error(err.message || "Error posting internship");
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-xl h-fit">
          <div className="flex items-center gap-2 mb-6 text-2xl font-bold">
            <PlusCircle className="text-primary" />
            <h1>Post Internship</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={formData.title} placeholder="e.g. React Developer" onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input value={formData.duration} placeholder="3 Months" onChange={e => setFormData({...formData, duration: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={formData.category} placeholder="Web Development" onChange={e => setFormData({...formData, category: e.target.value})} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Internship Type</Label>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="tech">Tech Internship</option>
                <option value="non-tech">Non-Tech Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea value={formData.description} className="w-full p-3 bg-background border rounded-md text-sm min-h-[100px] focus:ring-2 focus:ring-primary outline-none" placeholder="Brief details..." onChange={e => setFormData({...formData, description: e.target.value})} required />
            </div>
            
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading ? <Loader2 className="animate-spin" /> : "Create Internship"}
            </Button>
          </form>
        </div>

        {/* List Section */}
        <div className="bg-card p-8 rounded-2xl border border-border shadow-xl h-fit">
          <h2 className="text-2xl font-bold mb-6">Current List</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {internships && internships.length > 0 ? (
              internships.map((item: any) => (
                <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg bg-background/50 hover:border-primary/50 transition-colors">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase">{item.type} • {item.category}</p>
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(item._id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
                No internships found. Add your first one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInternship;