import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Hero } from "../types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image as ImageIcon, Save, Plus, X } from "lucide-react";

const EditHero = () => {
    const [hero, setHero] = useState<Hero>({ heading: "", subheading: "", typingTexts: [], imageUrl: "" });
    const [typingText, setTypingText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHero();
    }, []);

    const fetchHero = async () => {
        try {
            const { data } = await api.get("/hero");
            if (data.data) setHero(data.data);
        } catch (error) {
            toast.error("Hero_Data_Retrieval_Error");
        }
    };

    const addTypingText = () => {
        if (!typingText) return;
        setHero({ ...hero, typingTexts: [...(hero.typingTexts || []), typingText] });
        setTypingText("");
    };

    const removeTypingText = (index: number) => {
        const newTexts = hero.typingTexts?.filter((_, i) => i !== index);
        setHero({ ...hero, typingTexts: newTexts || [] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/admin/hero", hero);
            toast.success("Hero_Module_Synchronized");
        } catch (error) {
            toast.error("Sync_Failure");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Welcome</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                    Hero <br />
                    Parameters<span className="text-accent">.</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <Card className="border-white/10 bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-accent">
                            <ImageIcon size={16} />
                            <CardTitle className="text-lg uppercase">Visual_Entry_Core</CardTitle>
                        </div>
                        <CardDescription>Primary landing page heading and dynamic typography</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-3">
                            <Label>Primary_Heading</Label>
                            <Input
                                value={hero.heading}
                                onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                                placeholder="E.g., BUILD DEPLOY SECURE"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Sub_Tactical_Message</Label>
                            <Input
                                value={hero.subheading}
                                onChange={(e) => setHero({ ...hero, subheading: e.target.value })}
                                placeholder="Secondary message..."
                                required
                            />
                        </div>

                        <div className="space-y-6">
                            <Label>Dynamic_Array_Texts (Skills Showcase)</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={typingText}
                                    onChange={(e) => setTypingText(e.target.value)}
                                    placeholder="Add unit..."
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTypingText())}
                                />
                                <Button type="button" onClick={addTypingText} size="icon" className="shrink-0">
                                    <Plus size={18} />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {hero.typingTexts?.map((text, index) => (
                                    <div key={index} className="group bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 flex items-center gap-3 transition-all hover:bg-accent/20">
                                        <span className="font-mono text-[11px] font-black text-accent uppercase tracking-widest">{text}</span>
                                        <button type="button" onClick={() => removeTypingText(index)} className="text-accent/40 hover:text-red-400 transition-colors">
                                            <X size={12} />
                                        </button>
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
                                    {loading ? "Processing..." : "Commit_Parameters"}
                                </span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default EditHero;
