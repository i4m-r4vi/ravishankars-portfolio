import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./pages/Overview";
import EditAbout from "./pages/EditAbout";
import EditHero from "./pages/EditHero";
import ManageProjects from "./pages/ManageProjects";
import EditSkills from "./pages/EditSkills";
import EditResume from "./pages/EditResume";
import EditNavbar from "./pages/EditNavbar";
import EditFooter from "./pages/EditFooter";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (!adminInfo) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Overview />} />
                    <Route path="about" element={<EditAbout />} />
                    <Route path="hero" element={<EditHero />} />
                    <Route path="projects" element={<ManageProjects />} />
                    <Route path="skills" element={<EditSkills />} />
                    <Route path="resume" element={<EditResume />} />
                    <Route path="navbar" element={<EditNavbar />} />
                    <Route path="footer" element={<EditFooter />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
