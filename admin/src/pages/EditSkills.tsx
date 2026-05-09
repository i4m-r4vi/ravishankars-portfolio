import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save, Zap, X } from "lucide-react";

const EditSkills = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get("/skills");
            if (data.data) setCategories(data.data);
        } catch (error) {
            toast.error("Skills_Retrieval_Failed");
        }
    };

    const addCategory = () => {
        setCategories([...categories, { category: "New Unit", skills: [] }]);
    };

    const removeCategory = (index: number) => {
        setCategories(categories.filter((_, i) => i !== index));
    };

    const addSkill = (catIndex: number) => {
        const newCategories = [...categories];
        newCategories[catIndex].skills.push({ name: "Skill_ID", level: 80 });
        setCategories(newCategories);
    };

    const removeSkill = (catIndex: number, skillIndex: number) => {
        const newCategories = [...categories];
        newCategories[catIndex].skills.splice(skillIndex, 1);
        setCategories(newCategories);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await api.put("/admin/skills", categories);
            toast.success("Technical_Arsenal_Synchronized");
        } catch (error) {
            toast.error("Sync_Operation_Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-4">
                    <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Arsenal</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                        Core <br />
                        Craft<span className="text-accent">.</span>
                    </h1>
                </div>
                <Button onClick={addCategory} className="h-12 px-8 flex items-center gap-3">
                    <Plus size={20} />
                    <span className="font-black tracking-widest text-[10px] uppercase">Add_Category</span>
                </Button>
            </div>

            <div className="space-y-8 pb-32">
                {categories.map((cat, catIdx) => (
                    <Card key={cat._id || catIdx} className="border-white/10 bg-white/[0.02] group transition-all duration-500 hover:border-accent/30">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 py-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-black italic text-accent/20">0{catIdx + 1}</span>
                                <Input
                                    value={cat.category || ""}
                                    onChange={(e) => {
                                        const newCats = [...categories];
                                        newCats[catIdx].category = e.target.value;
                                        setCategories(newCats);
                                    }}
                                    className="border-none bg-transparent text-xl font-black uppercase tracking-widest italic p-0 h-auto focus-visible:ring-0 text-paper hover:text-accent transition-colors"
                                />
                            </div>
                            <Button variant="outline" size="icon" onClick={() => removeCategory(catIdx)} className="text-red-400 border-red-400/20 hover:bg-red-400/10">
                                <Trash2 size={16} />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {cat.skills?.map((skill: any, skillIdx: number) => (
                                    <div key={skillIdx} className="relative group/skill">
                                        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-ink/50 transition-all hover:bg-white/5 hover:border-accent/20">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-center px-1">
                                                    <Input
                                                        value={skill.name || ""}
                                                        onChange={(e) => {
                                                            const newCats = [...categories];
                                                            newCats[catIdx].skills[skillIdx].name = e.target.value;
                                                            setCategories(newCats);
                                                        }}
                                                        className="h-auto p-0 border-none bg-transparent font-mono text-[11px] font-black uppercase tracking-[0.2em] text-paper/60 focus-visible:ring-0"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            value={skill.level ?? 0}
                                                            onChange={(e) => {
                                                                const newCats = [...categories];
                                                                newCats[catIdx].skills[skillIdx].level = parseInt(e.target.value) || 0;
                                                                setCategories(newCats);
                                                            }}
                                                            className="w-12 h-auto p-0 border-none bg-transparent text-right font-mono text-[10px] font-black text-accent focus-visible:ring-0"
                                                            min="0" max="100"
                                                        />
                                                        <span className="text-[8px] font-mono text-accent/40">%</span>
                                                    </div>
                                                </div>
                                                <div className="h-1 bg-white/5 w-full relative rounded-full overflow-hidden">
                                                    <div 
                                                        className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000"
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeSkill(catIdx, skillIdx)} className="text-red-400/30 hover:text-red-400 transition-colors">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button 
                                    type="button"
                                    onClick={() => addSkill(catIdx)} 
                                    className="h-[82px] border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 text-paper/20 hover:border-accent/20 hover:text-accent hover:bg-accent/5 transition-all duration-500"
                                >
                                    <Zap size={18} />
                                    <span className="font-black text-[9px] uppercase tracking-widest">Inject_Skill_Unit</span>
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="fixed bottom-12 right-12 z-50">
                <Button 
                    onClick={handleSave} 
                    disabled={loading} 
                    className="h-16 px-12 rounded-2xl shadow-2xl shadow-accent/20 flex items-center gap-4 group"
                >
                    <Save size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-black tracking-[0.2em] text-[11px] uppercase">
                        {loading ? "SYNCING..." : "COMMIT_ALL_UNITS"}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default EditSkills;
