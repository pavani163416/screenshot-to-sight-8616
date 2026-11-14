import { useState, useEffect, useMemo } from "react";
import {
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Trash2,
  RefreshCw,
  Search,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FolderKanban,
  Coins,
  Send,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAdminToken, clearAdminToken, getApiUrl } from "./adminAuth";
import type { Inquiry, AdminStats } from "./types";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    new: 0,
    contacted: 0,
    in_discussion: 0,
    archived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function fetchInquiries(isManualRefresh = false) {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
    setErrorMessage(null);

    const token = getAdminToken();
    if (!token) {
      onLogout();
      return;
    }

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        clearAdminToken();
        onLogout();
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to fetch inquiries");
      }

      setInquiries(data.data || []);
      if (data.stats) {
        setStats(data.stats);
      } else {
        // Calculate stats locally if not provided
        const list: Inquiry[] = data.data || [];
        setStats({
          total: list.length,
          new: list.filter((i) => i.status === "new").length,
          contacted: list.filter((i) => i.status === "contacted").length,
          in_discussion: list.filter((i) => i.status === "in_discussion").length,
          archived: list.filter((i) => i.status === "archived").length,
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load inquiries.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function handleStatusChange(id: string, newStatus: string) {
    const token = getAdminToken();
    if (!token) return;

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to update status");
      }

      // Update state locally
      setInquiries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus as Inquiry["status"] } : item))
      );

      setActionMessage(`Updated status to "${newStatus}"`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Status update failed.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  }

  async function handleDelete(id: string, clientName: string) {
    if (!confirm(`Are you sure you want to delete the inquiry from "${clientName}"?`)) {
      return;
    }

    const token = getAdminToken();
    if (!token) return;

    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to delete inquiry");
      }

      setInquiries((prev) => prev.filter((item) => item._id !== id));
      setActionMessage(`Deleted inquiry from ${clientName}`);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Delete failed.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    }
  }

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      // Status filter
      if (statusFilter !== "all" && inquiry.status !== statusFilter) {
        return false;
      }

      // Text search
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        inquiry.name?.toLowerCase().includes(q) ||
        inquiry.email?.toLowerCase().includes(q) ||
        inquiry.phone?.toLowerCase().includes(q) ||
        inquiry.project_type?.toLowerCase().includes(q) ||
        inquiry.message?.toLowerCase().includes(q)
      );
    });
  }, [inquiries, search, statusFilter]);

  function formatDate(iso: string) {
    try {
      const date = new Date(iso);
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return iso;
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "new":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "contacted":
        return "bg-sky-500/20 text-sky-300 border-sky-500/40";
      case "in_discussion":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "archived":
        return "bg-zinc-500/20 text-zinc-400 border-zinc-500/40";
      default:
        return "bg-white/10 text-white border-white/20";
    }
  }

  return (
    <div className="min-h-screen futuristic-obsidian-bg cyber-grid-overlay text-slate-100 antialiased pb-20">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
            P
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-display">
              Addepalli Pavani <span className="text-emerald-400 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-mono">Admin</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Inquiries Management • MongoDB Atlas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            Live Site <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="rounded-lg text-xs bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/30 hover:border-red-500/50"
          >
            <LogOut className="h-3.5 w-3.5 mr-1.5" /> Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Toast / Banner Messages */}
        {actionMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-2xl p-4 sm:p-5 bg-zinc-950/70 border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>Total Inquiries</span>
              <Inbox className="h-4 w-4 text-slate-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stats.total}</div>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 bg-emerald-950/20 border border-emerald-500/30 shadow-lg">
            <div className="flex items-center justify-between text-emerald-400 text-xs font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> New
              </span>
              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-300 font-mono">{stats.new}</div>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 bg-sky-950/20 border border-sky-500/30 shadow-lg">
            <div className="flex items-center justify-between text-sky-400 text-xs font-mono mb-2">
              <span>Contacted</span>
              <Mail className="h-4 w-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-sky-300 font-mono">{stats.contacted}</div>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 bg-amber-950/20 border border-amber-500/30 shadow-lg">
            <div className="flex items-center justify-between text-amber-400 text-xs font-mono mb-2">
              <span>In Discussion</span>
              <MessageSquare className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono">{stats.in_discussion}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="rounded-2xl p-4 bg-zinc-950/70 border border-white/10 shadow-lg flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name, email, phone, or message..."
              className="pl-10 bg-black/60 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-emerald-400 text-xs sm:text-sm h-10"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["all", "new", "contacted", "in_discussion", "archived"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? "bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                }`}
              >
                {st.replace("_", " ")}
              </button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={refreshing}
              onClick={() => fetchInquiries(true)}
              className="rounded-lg h-8 px-2.5 bg-white/5 border-white/10 hover:bg-white/10 text-slate-300"
              title="Refresh inquiries"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Inquiries Cards */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 rounded-2xl bg-zinc-950/40 border border-white/5">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-emerald-400 mb-3" />
            <p className="text-sm font-mono">Loading inquiries from MongoDB Atlas...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-400 rounded-2xl bg-zinc-950/40 border border-white/5">
            <Inbox className="h-10 w-10 mx-auto text-slate-600 mb-3" />
            <p className="text-base font-semibold text-slate-200">No inquiries found</p>
            <p className="text-xs text-slate-500 mt-1">
              {search || statusFilter !== "all"
                ? "Try clearing the search query or status filter."
                : "New client submissions from the contact form will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => {
              const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
              const whatsappLink = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

              return (
                <div
                  key={inquiry._id}
                  className="rounded-2xl p-5 sm:p-6 bg-zinc-950/80 border border-white/10 hover:border-emerald-500/30 transition-all shadow-xl space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                        {inquiry.name ? inquiry.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{inquiry.name}</h3>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadge(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status.replace("_", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-500" />
                            {formatDate(inquiry.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Changer & Delete Button */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                        className="bg-black/60 border border-white/15 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:border-emerald-400 focus:outline-none cursor-pointer font-mono"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_discussion">In Discussion</option>
                        <option value="archived">Archived</option>
                      </select>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(inquiry._id, inquiry.name)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono">
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-slate-300 hover:text-emerald-400 truncate"
                        title="Click to email client"
                      >
                        {inquiry.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <Phone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                      {whatsappLink ? (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-emerald-400 truncate flex items-center gap-1"
                          title="Open WhatsApp chat"
                        >
                          {inquiry.phone} <ExternalLink className="h-2.5 w-2.5 text-slate-500" />
                        </a>
                      ) : (
                        <span className="text-slate-500 truncate">No phone</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <FolderKanban className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span className="text-slate-300 truncate">{inquiry.project_type}</span>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <Coins className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                      <span className="text-slate-300 truncate">
                        {inquiry.budget_range || "Budget: Not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Message Box */}
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <MessageSquare className="h-3 w-3 text-emerald-400" /> Project Details & Requirements
                    </div>
                    <p className="whitespace-pre-wrap">{inquiry.message}</p>
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                    <a
                      href={`mailto:${inquiry.email}?subject=Regarding%20your%20project%20inquiry%20(${encodeURIComponent(
                        inquiry.project_type
                      )})&body=Hi%20${encodeURIComponent(
                        inquiry.name
                      )},%0A%0AThank%20you%20for%20reaching%20out%20about%20your%20project.%20I%20reviewed%20your%20inquiry%20and%20would%20love%20to%20discuss%20the%20details.`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
                    >
                      <Send className="h-3 w-3" /> Reply via Email
                    </a>

                    {whatsappLink && (
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 transition-colors"
                      >
                        <Phone className="h-3 w-3" /> Chat on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
