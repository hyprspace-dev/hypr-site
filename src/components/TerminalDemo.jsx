import { useState, useEffect } from 'preact/hooks';

const lines = [
  { text: 'hyprspaceos login: user', delay: 600 },
  { text: 'Password: ', delay: 800 },
  { text: '', delay: 400 },
  { text: 'user@hyprspaceos ~ $ cat /etc/os-release', delay: 900 },
  { text: 'NAME="HyprSpaceOS"', delay: 300 },
  { text: 'ID=hyprspaceos', delay: 200 },
  { text: 'PRETTY_NAME="HyprSpaceOS 2026.06 (Rolling)"', delay: 300 },
  { text: '', delay: 400 },
  { text: 'user@hyprspaceos ~ $ hyprctl version', delay: 700 },
  { text: 'Hyprland 0.48.0', delay: 300 },
  { text: '', delay: 1000 },
  { text: 'user@hyprspaceos ~ $ ▊', delay: 200 },
];

export default function TerminalDemo() {
  const [visible, setVisible] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('terminal-demo');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let currentLine = 0;
    let timeout;

    const typeLine = () => {
      if (currentLine < lines.length) {
        setVisible((prev) => [...prev, currentLine]);
        timeout = setTimeout(typeLine, lines[currentLine].delay || 500);
        currentLine++;
      }
    };

    typeLine();

    return () => clearTimeout(timeout);
  }, [started]);

  return (
    <div
      id="terminal-demo"
      class="glass rounded-xl overflow-hidden font-mono text-sm mx-auto max-w-xl"
    >
      <div class="flex items-center gap-2 px-4 py-3 border-b border-glass-border bg-black/20">
        <span class="w-3 h-3 rounded-full bg-red-500/60" />
        <span class="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span class="w-3 h-3 rounded-full bg-green-500/60" />
        <span class="ml-2 text-text-secondary/50 text-xs">hyprspaceos-terminal</span>
      </div>
      <div class="p-4 min-h-[280px]">
        {lines.slice(0, visible.length).map((line, i) => (
          <div key={i} class="leading-relaxed">
            {line.text || <br />}
          </div>
        ))}
      </div>
    </div>
  );
}
