import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Resume } from "../types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, FileText, UploadCloud, Briefcase, GraduationCap } from "lucide-react";

const EditResume = () => {
    const [resume, setResume] = useState<Resume>({
        resumeUrl: "",
        experiences: [],
        courses: []
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const { data } = await api.get("/resume");
            if (data.data) {
                setResume({
                    resumeUrl: data.data.resumeUrl || "",
                    experiences: data.data.experiences || [],
                    courses: data.data.courses || []
                });
            }
        } catch (error) {
            toast.error("Resume_Data_Retrieval_Error");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("resume", file);

        setUploading(true);
        try {
            const { data } = await api.post("/admin/upload/resume", formData);
            setResume({ ...resume, resumeUrl: data.data.resumeUrl });
            toast.success("Resume_PDF_Uploaded");
        } catch (error) {
            toast.error("Upload_Failed");
        } finally {
            setUploading(false);
        }
    };

    const addExperience = () => {
        setResume({
            ...resume,
            experiences: [...(resume.experiences || []), { year: "2024 - Present", role: "Role", company: "Company", desc: "" }]
        });
    };

    const removeExperience = (index: number) => {
        setResume({
            ...resume,
            experiences: resume.experiences.filter((_, i) => i !== index)
        });
    };

    const addCourse = () => {
        setResume({
            ...resume,
            courses: [...(resume.courses || []), { year: "2024", title: "Course Title", platform: "Platform", desc: "", certificateUrl: "" }]
        });
    };

    const removeCourse = (index: number) => {
        setResume({
            ...resume,
            courses: resume.courses.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put("/admin/resume", resume);
            toast.success("Career_Archive_Synchronized");
        } catch (error) {
            toast.error("Sync_Terminal_Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-4">
                    <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Module / Career</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                        Experience <br />
                        Archive<span className="text-accent">.</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={addCourse} className="h-12 px-6 flex items-center gap-3 border-accent/20 text-accent hover:bg-accent/5">
                        <GraduationCap size={18} />
                        <span className="font-black tracking-widest text-[10px] uppercase">Add_Course</span>
                    </Button>
                    <Button type="button" onClick={addExperience} className="h-12 px-8 flex items-center gap-3">
                        <Plus size={18} />
                        <span className="font-black tracking-widest text-[10px] uppercase">Add_Entry</span>
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                {/* CV Upload Section */}
                <Card className="border-white/10 bg-white/[0.02]">
                    <CardHeader>
                        <div className="flex items-center gap-2 text-accent">
                            <FileText size={16} />
                            <CardTitle className="text-lg uppercase">Curriculum_Vitae_Source</CardTitle>
                        </div>
                        <CardDescription>Primary PDF document for download access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-ink/50 rounded-xl border border-white/5">
                            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <UploadCloud size={32} />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <Label>Active_File_Node</Label>
                                    <p className="text-[10px] font-mono text-paper/30 break-all mt-1">{resume.resumeUrl || "NO_FILE_DETECTED"}</p>
                                </div>
                                <Input type="file" onChange={handleFileUpload} className="max-w-xs cursor-pointer" disabled={uploading} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Experience List */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <Briefcase size={16} className="text-accent" />
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-paper/40">Work_History_Nodes</h3>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>
                    {resume.experiences?.map((exp, idx) => (
                        <Card key={`exp-${idx}`} className="border-white/10 bg-white/[0.02] group hover:border-accent/30 transition-all duration-500">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 py-4 px-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-black italic text-accent/20">0{idx + 1}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">EXPERIENCE_NODE_{idx + 1}</span>
                                </div>
                                <Button type="button" variant="outline" size="icon" onClick={() => removeExperience(idx)} className="text-red-400 border-red-400/20 hover:bg-red-400/10">
                                    <Trash2 size={16} />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Temporal_Range (Year)</Label>
                                        <Input
                                            value={exp.year}
                                            onChange={(e) => {
                                                const newExp = [...resume.experiences];
                                                newExp[idx].year = e.target.value;
                                                setResume({ ...resume, experiences: newExp });
                                            }}
                                            placeholder="2023 - Present"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tactical_Role</Label>
                                        <Input
                                            value={exp.role}
                                            onChange={(e) => {
                                                const newExp = [...resume.experiences];
                                                newExp[idx].role = e.target.value;
                                                setResume({ ...resume, experiences: newExp });
                                            }}
                                            placeholder="Senior Architect"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Organization_ID</Label>
                                        <Input
                                            value={exp.company}
                                            onChange={(e) => {
                                                const newExp = [...resume.experiences];
                                                newExp[idx].company = e.target.value;
                                                setResume({ ...resume, experiences: newExp });
                                            }}
                                            placeholder="Company Name"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Operational_Brief (Description)</Label>
                                    <Textarea
                                        value={exp.desc}
                                        onChange={(e) => {
                                            const newExp = [...resume.experiences];
                                            newExp[idx].desc = e.target.value;
                                            setResume({ ...resume, experiences: newExp });
                                        }}
                                        rows={4}
                                        placeholder="Detail the technical execution..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Courses List */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 px-2">
                        <GraduationCap size={16} className="text-accent" />
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-paper/40">Certification_Archive</h3>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>
                    {resume.courses?.map((course, idx) => (
                        <Card key={`course-${idx}`} className="border-white/10 bg-white/[0.02] group hover:border-accent/30 transition-all duration-500">
                            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 py-4 px-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-black italic text-accent/20">0{idx + 1}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">COURSE_NODE_{idx + 1}</span>
                                </div>
                                <Button type="button" variant="outline" size="icon" onClick={() => removeCourse(idx)} className="text-red-400 border-red-400/20 hover:bg-red-400/10">
                                    <Trash2 size={16} />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Completion_Year</Label>
                                        <Input
                                            value={course.year}
                                            onChange={(e) => {
                                                const newCourses = [...resume.courses];
                                                newCourses[idx].year = e.target.value;
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            placeholder="2024"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Certification_Title</Label>
                                        <Input
                                            value={course.title}
                                            onChange={(e) => {
                                                const newCourses = [...resume.courses];
                                                newCourses[idx].title = e.target.value;
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            placeholder="Cloud Architecture Specialization"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Provider_Platform</Label>
                                        <Input
                                            value={course.platform}
                                            onChange={(e) => {
                                                const newCourses = [...resume.courses];
                                                newCourses[idx].platform = e.target.value;
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            placeholder="Coursera / Udemy / AWS"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Verification_Link (URL)</Label>
                                        <Input
                                            value={course.certificateUrl}
                                            onChange={(e) => {
                                                const newCourses = [...resume.courses];
                                                newCourses[idx].certificateUrl = e.target.value;
                                                setResume({ ...resume, courses: newCourses });
                                            }}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Operational_Brief (Description)</Label>
                                    <Textarea
                                        value={course.desc}
                                        onChange={(e) => {
                                            const newCourses = [...resume.courses];
                                            newCourses[idx].desc = e.target.value;
                                            setResume({ ...resume, courses: newCourses });
                                        }}
                                        rows={4}
                                        placeholder="Detail the technical execution..."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="fixed bottom-12 right-12 z-50">
                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className="h-16 px-12 rounded-2xl shadow-2xl shadow-accent/20 flex items-center gap-4 group"
                    >
                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="font-black tracking-[0.2em] text-[11px] uppercase">
                            {loading ? "SYNCING..." : "COMMIT_ALL_RECORDS"}
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditResume;
