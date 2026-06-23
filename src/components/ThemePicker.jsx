import { useState, useEffect } from 'preact/hooks';

const themes = [
  { name: 'Cyan', h: 190, s: 100, l: 50, h2: 260, s2: 80, l2: 60 },
  { name: 'Magenta', h: 330, s: 80, l: 60, h2: 200, s2: 80, l2: 55 },
  { name: 'Green', h: 160, s: 60, l: 55, h2: 190, s2: 80, l2: 50 },
  { name: 'Gold', h: 40, s: 90, l: 55, h2: 330, s2: 70, l2: 55 },
];

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('hyprspaceos-theme');
    if (saved) {
      const idx = themes.findIndex((t) => t.name === saved);
      if (idx >= 0) applyTheme(idx);
    }
  }, []);

  function applyTheme(i) {
    const t = themes[i];
    document.documentElement.style.setProperty('--accent-h', t.h);
    document.documentElement.style.setProperty('--accent-s', `${t.s}%`);
    document.documentElement.style.setProperty('--accent-l', `${t.l}%`);
    document.documentElement.style.setProperty('--accent-secondary-h', t.h2);
    document.documentElement.style.setProperty('--accent-secondary-s', `${t.s2}%`);
    document.documentElement.style.setProperty('--accent-secondary-l', `${t.l2}%`);
    setActive(i);
    localStorage.setItem('hyprspaceos-theme', t.name);
  }

  return (
    <div class="relative">
      <button
        onClick={() => setOpen(!open)}
        class="w-6 h-6 rounded-full border-2 border-glass-border transition-transform hover:scale-110"
        style={{ background: `hsl(${themes[active].h}, ${themes[active].s}%, ${themes[active].l}%)` }}
        aria-label="Switch theme"
      />
      {open && (
        <div class="absolute right-0 top-8 glass-strong p-2 flex gap-2 z-50">
          {themes.map((t, i) => (
            <button
              key={t.name}
              onClick={() => { applyTheme(i); setOpen(false); }}
              class={`w-7 h-7 rounded-full transition-transform hover:scale-125 ${i === active ? 'ring-2 ring-white' : ''}`}
              style={{ background: `hsl(${t.h}, ${t.s}%, ${t.l}%)` }}
              aria-label={t.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
