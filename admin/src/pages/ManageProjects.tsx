import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Project } from "../types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, ExternalLink, Github, Save, X, UploadCloud, Briefcase, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ManageProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        title: "",
        description: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        imageUrl: ""
    });
    const [techInput, setTechInput] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const { data } = await api.post("/admin/upload/image", formData);
            setCurrentProject({ ...currentProject, imageUrl: data.data.imageUrl });
            toast.success("Asset_Uploaded: Success");
        } catch (error) {
            toast.error("Asset_Upload_Failure");
        } finally {
            setUploading(false);
        }
    };

    const fetchProjects = async () => {
        try {
            const { data } = await api.get("/projects");
            setProjects(data.data);
        } catch (error) {
            toast.error("Database_Query_Error");
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditing && currentProject._id) {
                await api.put(`/admin/projects/${currentProject._id}`, currentProject);
                toast.success("Manifest_Updated");
            } else {
                await api.post("/admin/projects", currentProject);
                toast.success("New_Project_Initiated");
            }
            fetchProjects();
            setShowModal(false);
            resetForm();
        } catch (error) {
            toast.error("Execution_Failure");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("CONFIRM_DELETION: Proceed with destructive action?")) return;
        try {
            await api.delete(`/admin/projects/${id}`);
            toast.success("Archive_Deleted");
            fetchProjects();
        } catch (error) {
            toast.error("Deletion_Protocol_Failed");
        }
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setIsEditing(true);
        setShowModal(true);
    };

    const resetForm = () => {
        setCurrentProject({ title: "", description: "", technologies: [], githubUrl: "", liveUrl: "", imageUrl: "" });
        setIsEditing(false);
        setTechInput("");
    };

    const addTech = () => {
        if (!techInput) return;
        setCurrentProject({ ...currentProject, technologies: [...(currentProject.technologies || []), techInput] });
        setTechInput("");
    };

    const removeTech = (index: number) => {
        const newTech = currentProject.technologies?.filter((_, i) => i !== index);
        setCurrentProject({ ...currentProject, technologies: newTech });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-4">
                    <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Works</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                        Visual <br />
                        Archive<span className="text-accent">.</span>
                    </h1>
                </div>
                <Button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="h-12 px-8 flex items-center gap-3"
                >
                    <Plus size={18} />
                    <span className="font-black tracking-widest text-[10px] uppercase">New_Entry</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {projects?.map((project, idx) => (
                    <Card key={project._id} className="group relative overflow-hidden flex flex-col hover:border-accent/40 transition-all duration-700">
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <img 
                                src={project.imageUrl || "https://placehold.co/600x400?text=PROJECT"} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute top-4 left-4 z-20">
                                <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-ink/80 backdrop-blur-md px-3 py-1 border border-white/10">      
                                    0{idx + 1}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-8 flex-1 flex flex-col gap-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none">{project.title}</h3>
                                <p className="text-paper/40 text-xs font-mono line-clamp-3 leading-relaxed">{project.description}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {project.technologies?.map(tech => (
                                    <span key={tech} className="px-2 py-1 border border-white/10 text-[9px] uppercase tracking-widest font-black text-paper/30">{tech}</span>
                                ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <Button variant="outline" size="icon" onClick={() => handleEdit(project)} className="h-8 w-8 text-accent border-accent/20">
                                        <Edit2 size={14} />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleDelete(project._id)} className="h-8 w-8 text-red-400 border-red-400/20">
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                                <div className="flex gap-4 text-paper/30">
                                    {project.githubUrl && <Github size={14} />}
                                    {project.liveUrl && <ExternalLink size={14} />}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal - Technical Interface Style */}
            {showModal && (
                <div className="fixed inset-0 bg-ink/95 backdrop-blur-2xl flex items-center justify-center z-[100] p-4 font-sans">
                    <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-white/20 bg-ink relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-paper/40 hover:text-accent transition-colors">
                            <X size={24} />
                        </button>
                        
                        <CardHeader className="border-b border-white/5 mb-8">
                            <div className="flex items-center gap-3 text-accent mb-2">
                                <Briefcase size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Unit / Project_Form</span>
                            </div>
                            <CardTitle className="text-3xl italic">{isEditing ? "Modify_Entry" : "Init_Project"}</CardTitle>
                        </CardHeader>

                        <CardContent className="p-8 pt-0">
                            <form onSubmit={handleSave} className="space-y-8">
                                <div className="space-y-3">
                                    <Label>System_Label (Title)</Label>
                                    <Input
                                        value={currentProject.title}
                                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                        placeholder="Identification name..."
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label>Functional_Overview (Description)</Label>
                                    <Textarea
                                        value={currentProject.description}
                                        onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                        rows={4}
                                        placeholder="Execution details..."
                                        required
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label>Visual_Archive_Asset</Label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                            {currentProject.imageUrl ? (
                                                <img src={currentProject.imageUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/5"><ImageIcon /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <Input type="file" onChange={handleImageUpload} className="max-w-xs cursor-pointer" disabled={uploading} />
                                            {uploading && <p className="text-[9px] text-accent font-black animate-pulse">UPLOADING_METRICS...</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label>Tactical_Stack (Technologies)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={techInput}
                                            onChange={(e) => setTechInput(e.target.value)}
                                            placeholder="Add tech unit..."
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                                        />
                                        <Button type="button" onClick={addTech} size="icon" className="shrink-0"><Plus size={18} /></Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {currentProject.technologies?.map((tech, i) => (
                                            <span key={i} className="bg-accent/10 border border-accent/20 text-accent px-3 py-1.5 rounded-md text-[10px] font-black uppercase flex items-center gap-2">
                                                {tech}
                                                <button type="button" onClick={() => removeTech(i)}><X size={10} /></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label>Source_Node (GitHub)</Label>
                                        <Input
                                            value={currentProject.githubUrl}
                                            onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label>Live_Interface (URL)</Label>
                                        <Input
                                            value={currentProject.liveUrl}
                                            onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="pt-12 flex gap-4">
                                    <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1 h-12 uppercase font-black text-[10px] tracking-widest border-white/10">Abort_Process</Button>
                                    <Button type="submit" disabled={loading} className="flex-[2] h-12 flex items-center gap-3">
                                        <Save size={16} />
                                        <span className="font-black tracking-widest text-[10px] uppercase">{loading ? "Commiting..." : "Finalize_Records"}</span>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ManageProjects;
