import Link from "next/link"

const FOOTER_LINKS = [
  { href: "/stem-for-all", label: "STEM for All" },
  { href: "/tech4all", label: "Tech4All" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-normal tracking-widest uppercase text-neutral-500">
            © 2025 Aletheia
          </p>
          <div className="flex flex-wrap justify-center gap-1">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors px-2 py-1 rounded hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
