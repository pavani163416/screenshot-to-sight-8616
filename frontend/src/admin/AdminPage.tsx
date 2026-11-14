import { useState, useEffect } from "react";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";
import { isAdminLoggedIn, clearAdminToken } from "./adminAuth";

export function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setLoggedIn(isAdminLoggedIn());
    setChecking(false);
  }, []);

  function handleLoginSuccess() {
    setLoggedIn(true);
  }

  function handleLogout() {
    clearAdminToken();
    setLoggedIn(false);
  }

  if (checking) {
    return (
      <div className="min-h-screen futuristic-obsidian-bg flex items-center justify-center text-slate-400 font-mono text-xs">
        Verifying admin session...
      </div>
    );
  }

  return loggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
}

export default AdminPage;
