import { useState, type FormEvent } from "react";
import { Lock, User, ArrowLeft, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAdminToken, getApiUrl } from "./adminAuth";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Invalid credentials. Please check username and password.");
      }

      setAdminToken(data.token);
      onLoginSuccess();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect to backend service.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function fillDemoCredentials() {
    setUsername("admin");
    setPassword("admin123");
    setError(null);
  }

  return (
    <div className="min-h-screen futuristic-obsidian-bg cyber-grid-overlay flex flex-col justify-center items-center px-4 py-12 relative text-slate-100">
      {/* Glow highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back link */}
      <div className="absolute top-6 left-6 z-10">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/30"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
        </a>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2 font-display">
            Admin Portal <span className="text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/40 font-mono">v1.0</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Manage inquiries submitted to Addepalli Pavani Portfolio
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 sm:p-8 bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or addepallipavani4@gmail.com"
                  className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-emerald-400 focus:ring-emerald-400/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-black/50 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-emerald-400 focus:ring-emerald-400/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-semibold h-11 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...
                </>
              ) : (
                "Sign In to Admin Dashboard"
              )}
            </Button>
          </form>

          {/* Quick Helper */}
          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
            <span>Default: <code className="text-emerald-400/80">admin</code> / <code className="text-emerald-400/80">admin123</code></span>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-emerald-400 hover:text-emerald-300 underline font-mono text-[11px]"
            >
              Auto-fill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
