import { useState } from 'preact/hooks';

const editions = [
  {
    id: 'full',
    label: 'Full',
    desc: 'Everything. Kitty, waybar, rofi, dunst, themes, wallpapers, and every tuning we made. Boot and go.',
    size: '3.2 GB',
    filename: 'HyprSpaceOS-Full-2026.06.iso',
    sha256: 'a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    desc: 'Hyprland, Arch base, terminal, and network manager. Everything else is one `pacman -S` away.',
    size: '1.1 GB',
    filename: 'HyprSpaceOS-Minimal-2026.06.iso',
    sha256: 'b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5',
  },
  {
    id: 'rolling',
    label: 'Rolling',
    desc: 'The same as Full, but updated weekly with the latest upstream packages. For people who live on the edge.',
    size: '2.8 GB',
    filename: 'HyprSpaceOS-Rolling-2026.06.iso',
    sha256: 'c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
  },
];

export default function EditionTabs() {
  const [active, setActive] = useState(editions[0]);

  return (
    <div class="w-full max-w-3xl mx-auto">
      <div class="flex border-b border-glass-border mb-8">
        {editions.map((ed) => (
          <button
            onClick={() => setActive(ed)}
            class={`px-6 py-3 text-sm font-medium transition-colors relative ${
              active.id === ed.id
                ? 'text-accent-cyan'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {ed.label}
            {active.id === ed.id && (
              <span class="absolute bottom-0 left-0 right-0 h-0.5 accent-gradient-bg rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div class="glass p-8 text-center">
        <p class="text-text-secondary mb-6 max-w-lg mx-auto">
          {active.desc}
        </p>

        <div class="text-sm text-text-secondary mb-4 font-mono">
          {active.filename}
          <span class="ml-3 text-accent-cyan">{active.size}</span>
        </div>

        <a
          href="#"
          class="accent-gradient-bg text-white px-10 py-4 rounded-full text-base font-semibold inline-block hover:opacity-90 transition-opacity shadow-lg shadow-accent-cyan/20"
        >
          Download {active.label}
        </a>

        <details class="mt-6 group">
          <summary class="text-sm text-text-secondary cursor-pointer hover:text-text-primary transition-colors">
            Verify checksum
          </summary>
          <pre class="mt-3 text-xs text-left font-mono text-text-secondary/60 bg-black/30 p-4 rounded-lg overflow-x-auto">
SHA256: {active.sha256}
          </pre>
        </details>
      </div>
    </div>
  );
}
