import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Save, Plus, Trash2 } from "lucide-react";

const EditFooter = () => {
    const [footer, setFooter] = useState({ text: "", socialLinks: [] as { platform: string, url: string }[] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFooter();
    }, []);

    const fetchFooter = async () => {
        try {
            const { data } = await api.get("/footer");
            if (data.data) setFooter(data.data);
        } catch (error) {
            toast.error("Footer_Retrieval_Failed");
        }
    };

    const addSocial = () => {
        setFooter({ ...footer, socialLinks: [...(footer.socialLinks || []), { platform: "PLATFORM_ID", url: "" }] });
    };

    const removeSocial = (index: number) => {
        setFooter({ ...footer, socialLinks: footer.socialLinks?.filter((_, i) => i !== index) || [] });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/admin/footer", footer);
            toast.success("Base_Module_Synchronized");
        } catch (error) {
            toast.error("Sync_Execution_Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Footer</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                    Final <br />
                    Parameters<span className="text-accent">.</span>
                </h1>
            </div>

            <form onSubmit={handleSave}>
                <Card className="border-white/10 bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-accent">
                            <Globe size={16} />
                            <CardTitle className="text-lg uppercase">System_Base_Core</CardTitle>
                        </div>
                        <CardDescription>Copyright identification and external communication links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-10">
                        <div className="space-y-3">
                            <Label>Manifest_Signature (Footer Text)</Label>
                            <Input
                                value={footer.text}
                                onChange={(e) => setFooter({ ...footer, text: e.target.value })}
                                placeholder="E.g., © 2026 Archive"
                                required
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center px-1">
                                <Label className="text-paper/40">Communication_Links</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addSocial} className="h-8 flex items-center gap-2 border-accent/20 text-accent hover:bg-accent/10">
                                    <Plus size={14} />
                                    <span className="font-black text-[9px] uppercase tracking-widest">Add_Link</span>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {footer.socialLinks?.map((social, idx) => (
                                    <div key={idx} className="p-6 rounded-xl border border-white/5 bg-ink/50 space-y-4 group transition-all hover:border-accent/20">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2 flex-1 mr-4">
                                                <Label className="text-[8px] text-paper/20 uppercase font-mono">Platform_ID</Label>
                                                <Input
                                                    placeholder="E.g. GitHub"
                                                    value={social.platform}
                                                    onChange={(e) => {
                                                        const newLinks = [...footer.socialLinks];
                                                        newLinks[idx].platform = e.target.value;
                                                        setFooter({ ...footer, socialLinks: newLinks });
                                                    }}
                                                />
                                            </div>
                                            <Button type="button" variant="outline" size="icon" onClick={() => removeSocial(idx)} className="h-8 w-8 text-red-400 border-red-400/20 hover:bg-red-400/10 mt-6">
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[8px] text-paper/20 uppercase font-mono">Target_Endpoint (URL)</Label>
                                            <Input
                                                placeholder="https://..."
                                                value={social.url}
                                                onChange={(e) => {
                                                    const newLinks = [...footer.socialLinks];
                                                    newLinks[idx].url = e.target.value;
                                                    setFooter({ ...footer, socialLinks: newLinks });
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <Button 
                                type="submit" 
                                disabled={loading}
                                className="w-full md:w-auto h-12 px-12 flex items-center gap-3"
                            >
                                <Save size={16} />
                                <span className="font-black tracking-widest text-[10px] uppercase">
                                    {loading ? "Processing..." : "Commit_Signature"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default EditFooter;
