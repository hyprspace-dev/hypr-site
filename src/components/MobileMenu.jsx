import { useState } from 'preact/hooks';

export default function MobileMenu({ links, base }) {
  const [open, setOpen] = useState(false);

  return (
    <div class="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        class="text-text-primary p-2 focus:outline-2 focus:outline-offset-2 rounded transition-all"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div class="fixed left-0 right-0 top-16 bottom-0 z-40 glass-strong flex flex-col items-center justify-start gap-8 pt-12 pb-12 overflow-y-auto">
          {links.map((link) => (
            <a
              href={link.href}
              class="text-text-primary text-xl font-medium hover:text-accent transition-colors focus:outline-2 focus:outline-offset-2 rounded px-4 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${base}downloads`}
            class="accent-gradient-bg text-white px-6 py-3 rounded-full text-lg font-semibold focus:outline-2 focus:outline-offset-2 transition-all"
            onClick={() => setOpen(false)}
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
