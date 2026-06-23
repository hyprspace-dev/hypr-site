import { useState, useEffect, useRef } from 'preact/hooks';

const configLines = [
  { text: '# ============================================================', highlight: false },
  { text: '# HyprSpaceOS — hyprland.conf', highlight: false },
  { text: '# Tuned for performance + aesthetics', highlight: false },
  { text: '# ============================================================', highlight: false },
  { text: '', highlight: false },
  { text: 'general {', highlight: false },
  { text: '    layout = dwindle', highlight: false },
  { text: '    border_size = 2', highlight: false },
  { text: '    gaps_in = 4', highlight: false },
  { text: '    gaps_out = 8', highlight: false },
  { text: '    col.active_border = rgb(00d4ff) rgb(a78bfa) 45deg', highlight: true },
  { text: '    col.inactive_border = rgb(333350)', highlight: false },
  { text: '}', highlight: false },
  { text: '', highlight: false },
  { text: 'decoration {', highlight: false },
  { text: '    rounding = 12', highlight: false },
  { text: '    blur {', highlight: false },
  { text: '        enabled = true', highlight: false },
  { text: '        size = 8', highlight: false },
  { text: '        passes = 3', highlight: false },
  { text: '        new_optimizations = true', highlight: false },
  { text: '    }', highlight: false },
  { text: '    shadow {', highlight: false },
  { text: '        enabled = true', highlight: false },
  { text: '        range = 12', highlight: false },
  { text: '        render_power = 3', highlight: false },
  { text: '        color = rgba(0, 0, 0, 0.6)', highlight: false },
  { text: '    }', highlight: false },
  { text: '}', highlight: false },
  { text: '', highlight: false },
  { text: 'animations {', highlight: false },
  { text: '    enabled = true', highlight: false },
  { text: '    bezier = overshot, 0.05, 0.9, 0.1, 1.05', highlight: true },
  { text: '    animation = windows, 1, 4, overshot, slide', highlight: false },
  { text: '    animation = border, 1, 8, overshot', highlight: false },
  { text: '    animation = fade, 1, 6, default', highlight: false },
  { text: '    animation = workspaces, 1, 5, overshot, slidevert', highlight: false },
  { text: '}', highlight: false },
  { text: '', highlight: false },
  { text: 'input {', highlight: false },
  { text: '    kb_layout = us', highlight: false },
  { text: '    follow_mouse = 1', highlight: false },
  { text: '    touchpad { natural_scroll = true }', highlight: false },
  { text: '}', highlight: false },
  { text: '', highlight: false },
  { text: 'windowrule = float, title:^(Picture-in-Picture)$', highlight: false },
  { text: 'windowrule = opacity 0.92 override, .*', highlight: true },
  { text: 'windowrulev2 = opacity 0.85 0.85, class:^(foot)$', highlight: false },
  { text: 'windowrulev2 = center, class:^(Rofi)$', highlight: false },
  { text: 'windowrulev2 = size 40% 60%, class:^(Rofi)$', highlight: false },
  { text: '', highlight: false },
  { text: 'bind = $mainMod, return, exec, kitty', highlight: false },
  { text: 'bind = $mainMod, d, exec, rofi -show drun', highlight: false },
  { text: 'bind = $mainMod, q, killactive', highlight: false },
  { text: 'bind = $mainMod, f, fullscreen', highlight: false },
  { text: 'bind = $mainMod, l, exec, hyprlock', highlight: false },
];

export default function ConfigViewer() {
  const [visible, setVisible] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const timer = setInterval(() => {
            i++;
            setVisible(i);
            if (i >= configLines.length) clearInterval(timer);
          }, 50);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} class="glass rounded-xl overflow-hidden font-mono text-xs leading-relaxed mx-auto max-w-4xl">
      <div class="flex items-center gap-2 px-4 py-2.5 border-b border-glass-border bg-black/20">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span class="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        <span class="ml-2 text-text-secondary/40 text-[10px]">~/.config/hypr/hyprland.conf</span>
      </div>
      <div class="p-4 overflow-x-auto">
        <pre class="min-w-[600px]">
          {configLines.slice(0, visible).map((line, i) => (
            <div
              key={i}
              class={`whitespace-pre ${line.highlight ? 'text-accent-cyan' : 'text-text-secondary/70'}`}
            >
              {line.text || ' '}
            </div>
          ))}
          {visible <= configLines.length && visible > 0 && (
            <div class="text-text-secondary/30 animate-pulse">▊</div>
          )}
        </pre>
      </div>
    </div>
  );
}
