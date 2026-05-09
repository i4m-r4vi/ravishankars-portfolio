import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, Save, Plus, X, Globe, Trash2 } from "lucide-react";

const EditNavbar = () => {
    const [navbar, setNavbar] = useState({ logoText: "", links: [] as { label: string, url: string }[] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNavbar();
    }, []);

    const fetchNavbar = async () => {
        try {
            const { data } = await api.get("/navbar");
            if (data.data) setNavbar(data.data);
        } catch (error) {
            toast.error("Nav_Data_Link_Error");
        }
    };

    const addLink = () => {
        setNavbar({ ...navbar, links: [...(navbar.links || []), { label: "NEW_NODE", url: "#" }] });
    };

    const removeLink = (index: number) => {
        setNavbar({ ...navbar, links: navbar.links?.filter((_, i) => i !== index) || [] });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/admin/navbar", navbar);
            toast.success("Navigation_Array_Synchronized");
        } catch (error) {
            toast.error("Sync_Terminal_Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Navigation</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                    Node <br />
                    Hierarchy<span className="text-accent">.</span>
                </h1>
            </div>

            <form onSubmit={handleSave}>
                <Card className="border-white/10 bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-accent">
                            <Menu size={16} />
                            <CardTitle className="text-lg uppercase">Link_Structure_Core</CardTitle>
                        </div>
                        <CardDescription>Primary identification and routing node map</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-10">
                        <div className="space-y-3">
                            <Label>Operational_ID (Logo Text)</Label>
                            <Input
                                value={navbar.logoText}
                                onChange={(e) => setNavbar({ ...navbar, logoText: e.target.value })}
                                placeholder="E.g., RAVI.DEV"
                                required
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center px-1">
                                <Label className="text-paper/40">Active_Routings</Label>
                                <Button type="button" variant="outline" size="sm" onClick={addLink} className="h-8 flex items-center gap-2 border-accent/20 text-accent hover:bg-accent/10">
                                    <Plus size={14} />
                                    <span className="font-black text-[9px] uppercase tracking-widest">Inject_Node</span>
                                </Button>
                            </div>
                            
                            <div className="space-y-4">
                                {navbar.links?.map((link, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-white/5 bg-ink/50 group transition-all hover:border-accent/20">
                                        <div className="flex-[2] space-y-2">
                                            <Label className="text-[8px] text-paper/20">LABEL</Label>
                                            <Input
                                                placeholder="Node label..."
                                                value={link.label}
                                                onChange={(e) => {
                                                    const newLinks = [...navbar.links];
                                                    newLinks[idx].label = e.target.value;
                                                    setNavbar({ ...navbar, links: newLinks });
                                                }}
                                            />
                                        </div>
                                        <div className="flex-[3] space-y-2">
                                            <Label className="text-[8px] text-paper/20">TARGET_PATH</Label>
                                            <Input
                                                placeholder="#section or https://..."
                                                value={link.url}
                                                onChange={(e) => {
                                                    const newLinks = [...navbar.links];
                                                    newLinks[idx].url = e.target.value;
                                                    setNavbar({ ...navbar, links: newLinks });
                                                }}
                                            />
                                        </div>
                                        <div className="flex items-end pb-1">
                                            <Button type="button" variant="outline" size="icon" onClick={() => removeLink(idx)} className="h-10 w-10 text-red-400 border-red-400/20 hover:bg-red-400/10 shrink-0">
                                                <Trash2 size={16} />
                                            </Button>
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
                                    {loading ? "Processing..." : "Commit_Hierarchy"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default EditNavbar;
