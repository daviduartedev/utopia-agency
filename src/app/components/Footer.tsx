export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/5">
      <div className="max-w-[1300px] mx-auto px-8 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center cursor-pointer select-none group">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="mr-2 group-hover:scale-105 transition-transform duration-300"
            >
              <path d="M12 2.5L4.5 7.5L12 12.5L19.5 7.5L12 2.5Z" fill="white"/>
              <path 
                d="M4.5 11.5L12 16.5L19.5 11.5M4.5 15.5L12 20.5L19.5 15.5" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span 
              className="font-bold text-[22px] tracking-wide mt-0.5" 
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
            >
              utopia
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[14px] text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Portfólio
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Serviços
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contato
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-[14px] text-gray-500">
            © {currentYear} Utopia Studio. Todos os direitos reservados.
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
          <p>Landings, SaaS e apps — entrega rápida, padrão premium.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
