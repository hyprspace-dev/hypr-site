import { useState } from 'preact/hooks';

const screenshots = [
  { src: '/screenshots/desktop-1.jpg', alt: 'Clean desktop with terminal and file manager', label: 'Clean Desktop' },
  { src: '/screenshots/desktop-2.jpg', alt: 'Tiling window layout with multiple apps', label: 'Tiling Layout' },
  { src: '/screenshots/desktop-3.jpg', alt: 'Blur and transparency effects', label: 'Aesthetic Effects' },
  { src: '/screenshots/desktop-4.jpg', alt: 'Application launcher in action', label: 'App Launcher' },
  { src: '/screenshots/desktop-5.jpg', alt: 'Notification center and widgets', label: 'Notifications' },
  { src: '/screenshots/desktop-6.jpg', alt: 'Custom themed configuration', label: 'Custom Theme' },
];

export default function Lightbox() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {screenshots.map((shot, i) => (
          <button
            onClick={() => setSelected(i)}
            class="glass glass-hover overflow-hidden group cursor-pointer text-left"
          >
            <div class="aspect-video bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1a] flex items-center justify-center">
              <div class="text-center p-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-text-secondary/30 mx-auto mb-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p class="text-text-secondary/50 text-xs">Screenshot</p>
              </div>
            </div>
            <div class="p-4">
              <p class="text-sm text-text-primary font-medium">{shot.label}</p>
            </div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            class="glass-strong max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div class="aspect-video bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1a] flex items-center justify-center">
              <div class="text-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="text-text-secondary/30 mx-auto mb-3">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p class="text-text-secondary/50 text-sm">Screenshot Preview</p>
              </div>
            </div>
            <div class="flex items-center justify-between p-4">
              <p class="text-sm text-text-primary">{screenshots[selected].label}</p>
              <button
                onClick={() => setSelected(null)}
                class="text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
