import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { About } from "../types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Save, UploadCloud } from "lucide-react";

const EditAbout = () => {
    const [about, setAbout] = useState<About>({ title: "", description: "", imageUrl: "" });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const { data } = await api.get("/about");
            if (data.data) setAbout(data.data);
        } catch (error) {
            toast.error("Data_Retrieval_Error");
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setUploading(true);
        try {
            const { data } = await api.post("/admin/upload/image", formData);
            setAbout({ ...about, imageUrl: data.data.imageUrl });
            toast.success("Identity_Image_Uploaded");
        } catch (error) {
            toast.error("Upload_Failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/admin/about", about);
            toast.success("Profile_Records_Updated");
        } catch (error) {
            toast.error("Update_Sequence_Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Bio</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                    Identity <br />
                    Management<span className="text-accent">.</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <Card className="border-white/10 bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-accent">
                            <User size={16} />
                            <CardTitle className="text-lg uppercase">Personal_Intel</CardTitle>
                        </div>
                        <CardDescription>Configure the primary profile identification data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-3">
                            <Label>Identification_Title</Label>
                            <Input
                                value={about.title}
                                onChange={(e) => setAbout({ ...about, title: e.target.value })}
                                placeholder="E.g., I bridge the gap..."
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Narrative_Description</Label>
                            <Textarea
                                value={about.description}
                                onChange={(e) => setAbout({ ...about, description: e.target.value })}
                                rows={8}
                                placeholder="Detail the technical journey..."
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <Label>Profile_Visual_Source</Label>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                <div className="relative group">
                                    <div className="w-40 h-40 rounded-xl overflow-hidden border border-white/10 bg-ink relative">
                                        <img 
                                            src={about.imageUrl || "https://placehold.co/400x400?text=IDENTITY"} 
                                            alt="About" 
                                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" 
                                        />
                                        {uploading && (
                                            <div className="absolute inset-0 bg-ink/80 flex items-center justify-center">
                                                <div className="w-1 h-12 bg-accent animate-bounce" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-ink">
                                        <UploadCloud size={14} />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <p className="text-[10px] font-mono text-paper/30 uppercase tracking-widest leading-relaxed">
                                        RECOM_SPECS: 800x800px, PNG/JPG<br />
                                        MAX_FILE_SIZE: 5MB
                                    </p>
                                    <Input 
                                        type="file" 
                                        onChange={handleUpload} 
                                        className="max-w-xs cursor-pointer file:text-accent file:font-black" 
                                        disabled={uploading} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full md:w-auto h-12 px-12 flex items-center gap-3 group"
                            >
                                <Save size={16} />
                                <span className="font-black tracking-widest text-[10px] uppercase">
                                    {loading ? "Processing..." : "Commit_Changes"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default EditAbout;
