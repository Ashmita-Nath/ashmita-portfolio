import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { useProjects } from "../context/ProjectsContext";

export default function LiveSyncIndicator({ compact = false }: { compact?: boolean }) {
  const { isLive, loading, error, lastSynced, repoCount, refresh } = useProjects();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (refreshing || loading) return;
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  const timeString = lastSynced
    ? lastSynced.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  if (compact) {
    return (
      <button
        onClick={handleRefresh}
        disabled={loading || refreshing}
        title={
          error
            ? `GitHub sync issue: ${error}. Click to retry.`
            : `Live GitHub Synced (${repoCount} repos). Last checked: ${timeString || "just now"}. Click to refresh.`
        }
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-muted hover:text-ink cursor-pointer group"
      >
        <span className="relative flex h-2 w-2">
          {isLive && !error ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : error ? (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/40"></span>
          )}
        </span>
        <span className="hidden sm:inline">
          {loading || refreshing ? "Syncing..." : isLive ? "GitHub Live" : "GitHub Sync"}
        </span>
        <RefreshCw
          size={11}
          className={`text-muted group-hover:text-ink transition-transform ${
            loading || refreshing ? "animate-spin text-accent-2" : ""
          }`}
        />
      </button>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-white/10 bg-surface/60 backdrop-blur-md text-xs shadow-sm"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          {isLive && !error ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          )}
        </span>

        {error ? (
          <div className="flex items-center gap-1 text-amber-300">
            <AlertCircle size={13} />
            <span>Cached Mode</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-muted">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>
              Real-time GitHub Sync · <strong className="text-ink font-semibold">{repoCount}</strong> repos
            </span>
          </div>
        )}
      </div>

      {timeString && (
        <span className="text-[11px] text-muted/60 hidden sm:inline">
          ({timeString})
        </span>
      )}

      <button
        onClick={handleRefresh}
        disabled={loading || refreshing}
        aria-label="Refresh GitHub repositories"
        className="p-1 rounded-md text-muted hover:text-ink hover:bg-white/10 transition-colors ml-auto"
        title="Check GitHub for new repositories"
      >
        <RefreshCw
          size={12}
          className={`transition-transform ${loading || refreshing ? "animate-spin text-accent-2" : "hover:rotate-45"}`}
        />
      </button>
    </div>
  );
}
