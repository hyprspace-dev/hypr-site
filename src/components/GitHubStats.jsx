import { useState, useEffect } from 'preact/hooks';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('hyprspaceos-gh-stats');
    if (cached) {
      setStats(JSON.parse(cached));
      return;
    }

    fetch('https://api.github.com/repos/hyprspace-dev/hypr-site')
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          const s = {
            stars: data.stargazers_count,
            forks: data.forks_count,
            updated: data.pushed_at ? data.pushed_at.slice(0, 10) : null,
          };
          setStats(s);
          sessionStorage.setItem('hyprspaceos-gh-stats', JSON.stringify(s));
        }
      })
      .catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <div class="flex items-center gap-5 text-xs text-text-secondary/60">
      {stats.stars !== undefined && (
        <span class="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-500/60">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {stats.stars}
        </span>
      )}
      {stats.forks !== undefined && (
        <span class="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-text-secondary/40">
            <path d="M10 21h4V7h-4v14zm-6 0h4V3H4v18zm12-10v10h4V11h-4z" />
          </svg>
          {stats.forks}
        </span>
      )}
      {stats.updated && (
        <span>Updated {stats.updated}</span>
      )}
    </div>
  );
}
