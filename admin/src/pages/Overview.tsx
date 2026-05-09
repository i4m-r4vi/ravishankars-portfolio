import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Globe, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

const Overview = () => {
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">System / Dashboard</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
                    Control <br />
                    Central<span className="text-accent">.</span>
                </h1>
                <p className="text-paper/40 font-mono text-[10px] uppercase tracking-widest mt-2 max-w-md">
                    Logged in as <span className="text-accent">@{adminInfo.username}</span>. Welcome back to the architecture core.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Public Portfolio", value: "Visit_Site", url: "http://localhost:5173", icon: Globe, color: "text-blue-400" },
                    { label: "Temporal Status", value: new Date().toLocaleDateString(), icon: Clock, color: "text-green-400" },
                    { label: "Core Security", value: "Active", icon: ShieldCheck, color: "text-accent" }
                ].map((stat, i) => (
                    <Card key={i} className="group hover:border-accent/50 transition-all duration-500 overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-[9px] font-mono text-paper/30 uppercase tracking-[0.2em]">{stat.label}</CardTitle>
                            <stat.icon className={stat.color} size={14} />
                        </CardHeader>
                        <CardContent>
                            {stat.url ? (
                                <a href={stat.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 group/link">
                                    <div className="text-2xl font-black uppercase tracking-tighter italic text-paper group-hover/link:text-accent transition-colors underline decoration-white/5 underline-offset-4 decoration-1">{stat.value}</div>
                                    <ArrowUpRight size={16} className="text-accent opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
                                </a>
                            ) : (
                                <div className="text-2xl font-black uppercase tracking-tighter italic text-paper">{stat.value}</div>
                            )}
                        </CardContent>
                        {/* Technical scanline effect */}
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/20 group-hover:bg-accent/80 transition-all duration-700" />
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                <Card className="bg-white/[0.02]">
                    <CardHeader>
                        <CardTitle className="text-lg">Recent_Activities</CardTitle>
                        <CardDescription>Metrics from current deployment cycle</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { unit: "Deployment_Port", status: "5000 (API)", type: "Ready" },
                            { unit: "UI_Channel", status: "4000 (Admin)", type: "Active" },
                            { unit: "Public_Node", status: "5173 (Prod)", type: "Online" }
                        ].map((activity, i) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-white/5 bg-ink/30">
                                <span className="font-mono text-[9px] text-paper/60 uppercase">{activity.unit}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black italic">{activity.status}</span>
                                    <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-accent/20 bg-accent/5">
                    <CardHeader>
                        <CardTitle className="text-lg text-accent">System_Intelligence</CardTitle>
                        <CardDescription className="text-accent/40">Automated synchronization status</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute inset-0 border-4 border-accent/10 rounded-full" />
                            <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-[10px] font-black text-accent">SYNCing</span>
                            </div>
                        </div>
                        <p className="text-[9px] text-accent/60 uppercase tracking-[0.3em] font-black">All Modules Operational</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Overview;
