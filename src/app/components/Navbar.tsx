import { ChevronDown } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex items-center justify-between py-6 w-full relative z-10">
      <div className="flex items-center gap-12">
        {/* Logo */}
        <div className="flex items-center cursor-pointer select-none group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 group-hover:scale-105 transition-transform duration-300">
            <path d="M12 2.5L4.5 7.5L12 12.5L19.5 7.5L12 2.5Z" fill="white"/>
            <path d="M4.5 11.5L12 16.5L19.5 11.5M4.5 15.5L12 20.5L19.5 15.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-[22px] tracking-wide mt-0.5" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}>utopia</span>
        </div>

        {/* Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] text-gray-300 font-medium tracking-wide mt-1">
          <a href="#" className="flex items-center hover:text-white transition-colors">
            Produto <ChevronDown size={14} className="ml-0.5 opacity-60"/>
          </a>
          <a href="#" className="hover:text-white transition-colors">Equipe</a>
          <a href="#" className="hover:text-white transition-colors">Empresas</a>
          <a href="#" className="flex items-center hover:text-white transition-colors">
            Explorar <ChevronDown size={14} className="ml-0.5 opacity-60"/>
          </a>
          <a href="#" className="hover:text-white transition-colors">Marketplace</a>
          <a href="#" className="flex items-center hover:text-white transition-colors">
            Preços <ChevronDown size={14} className="ml-0.5 opacity-60"/>
          </a>
        </nav>
      </div>
    </header>
  );
}