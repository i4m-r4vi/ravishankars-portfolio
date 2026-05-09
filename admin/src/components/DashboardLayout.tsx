import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Image, Briefcase, Code, Menu, LogOut, Globe, X, FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
    <Link
        to={to}
        className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group font-mono text-[11px] uppercase tracking-widest",
            active 
                ? "bg-accent text-ink font-black shadow-lg shadow-accent/20" 
                : "text-paper/40 hover:text-accent hover:bg-white/5"
        )}
    >
        <Icon size={16} className={cn(active ? "text-ink" : "text-accent/60 group-hover:text-accent")} />
        <span>{label}</span>
    </Link>
);

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("adminInfo");
        navigate("/login");
    };

    const menuItems = [
        { to: "/", icon: LayoutDashboard, label: "Overview" },
        { to: "/hero", icon: Image, label: "Hero Section" },
        { to: "/about", icon: User, label: "About Me" },
        { to: "/projects", icon: Briefcase, label: "Projects" },
        { to: "/skills", icon: Code, label: "Skills" },
        { to: "/resume", icon: FileText, label: "Experience" },
        { to: "/navbar", icon: Menu, label: "Navbar" },
        { to: "/footer", icon: Globe, label: "Footer" },
    ];

    return (
        <div className="min-h-screen bg-ink text-paper flex selection:bg-accent selection:text-white">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 bg-ink border-r border-white/10 transition-transform duration-500 lg:translate-x-0 w-64 z-[100]",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full flex flex-col p-6">
                    <div className="mb-12 flex items-center justify-between">
                        <div>
                            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-accent">RAVISHANKAR</h1>
                            <p className="text-[8px] font-mono text-paper/20 mt-1 uppercase">Control_Panel_v2.0</p>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-paper/40">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <p className="text-[8px] uppercase tracking-widest text-paper/20 font-bold mb-4 ml-4">Management_Units</p>
                        {menuItems.map((item) => (
                            <SidebarItem
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                                active={location.pathname === item.to}
                            />
                        ))}
                    </nav>

                    <div className="mt-auto pt-8">
                        <Separator className="mb-6" />
                        <Button 
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full justify-start space-x-3 text-red-400 border-red-400/20 hover:bg-red-400/10 hover:text-red-400"
                        >
                            <LogOut size={16} />
                            <span className="font-mono text-[10px] uppercase tracking-widest">Terminate_Session</span>
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-8 relative min-h-screen">
                {/* Tech Overlays (Frontend style) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                    <div className="w-full h-full border-[1px] border-white/5 grid grid-cols-12 grid-rows-12">
                        {Array.from({ length: 144 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-white/5" />
                        ))}
                    </div>
                </div>

                <div className="lg:hidden mb-8 flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                    <h1 className="text-[10px] font-black uppercase tracking-widest text-accent">PORTFOLIO CMS</h1>
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-accent">
                        <Menu size={24} />
                    </button>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
