import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldAlert, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { username, password });
            localStorage.setItem("adminInfo", JSON.stringify(data.data));
            toast.success("Identity_Verified: Welcome_Back");
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Verification_Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-ink p-4 overflow-hidden font-sans">
            {/* Tech Grid Background (Frontend style) */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <div className="w-full h-full border-[1px] border-white/5 grid grid-cols-12 grid-rows-12">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                </div>
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="w-full max-w-md relative z-10 flex flex-col items-center"
            >
                <div className="mb-12 text-center w-full">
                    <span className="text-accent text-[10px] tracking-[0.6em] font-black uppercase block mb-4">Secure_Authentication_Protocol</span>
                    <h1 className="text-5xl font-black text-paper uppercase tracking-tighter italic leading-none">
                        Root <br />
                        Access<span className="text-accent">.</span>
                    </h1>
                </div>

                <Card className="border-white/10 bg-white/[0.02] backdrop-blur-2xl w-full">
                    <CardHeader className="space-y-1">
                        <div className="flex items-center gap-2 text-accent">
                            <ShieldAlert size={14} />
                            <CardTitle className="text-sm">Admin_Identity_Required</CardTitle>
                        </div>
                        <CardDescription>Enter credentials to access the architecture core</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username">Operator_ID</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username..."
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Access_Key</Label>
                                <div className="relative group/key">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/20 hover:text-accent transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <Button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full h-12 flex justify-between group overflow-hidden relative"
                            >
                                <span className="font-black tracking-widest text-[10px] uppercase">
                                    {loading ? "Authenticating..." : "Establish_Connection"}
                                </span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-8 flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[8px] font-mono text-paper/20 uppercase tracking-[0.2em]">Server_Status: Operational</span>
                    </div>
                    <span className="text-[8px] font-mono text-paper/20 uppercase tracking-[0.2em]">Region: 12.97° N, 77.59° E</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
