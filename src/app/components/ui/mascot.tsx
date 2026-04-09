/**
 * Avatar digital humano — estilo mascote corporativo (flat illustration).
 * Inspirado no estilo Lu da Magazine Luiza: personagem feminina vetorial,
 * expressiva e profissional.
 */
export function Mascot({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* fundo gradiente */}
      <defs>
        <radialGradient id="bg" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </radialGradient>
        <clipPath id="circle">
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="100" fill="url(#bg)" />

      {/* --- CORPO / ROUPA --- */}
      {/* blazer/top azul */}
      <ellipse cx="100" cy="188" rx="72" ry="48" fill="#2563eb" />
      {/* gola V */}
      <polygon points="100,140 88,168 100,162 112,168" fill="#1d4ed8" />
      {/* colarinho branco */}
      <polygon points="100,138 90,155 100,150 110,155" fill="white" />

      {/* --- PESCOÇO --- */}
      <rect x="88" y="126" width="24" height="18" rx="8" fill="#f5c5a3" />

      {/* --- CABEÇA --- */}
      <ellipse cx="100" cy="100" rx="46" ry="50" fill="#f5c5a3" />

      {/* --- CABELO --- */}
      {/* fundo do cabelo (bob escuro) */}
      <ellipse cx="100" cy="76" rx="46" ry="34" fill="#1a0a00" />
      {/* lateral esquerda */}
      <path d="M54 90 Q48 120 56 140 Q66 130 68 118 Z" fill="#1a0a00" />
      {/* lateral direita */}
      <path d="M146 90 Q152 120 144 140 Q134 130 132 118 Z" fill="#1a0a00" />
      {/* topo liso com franja suave */}
      <ellipse cx="100" cy="68" rx="46" ry="28" fill="#1a0a00" />
      {/* franja — cobre testa */}
      <path d="M60 82 Q72 72 88 76 Q100 80 112 76 Q128 72 140 82 Q140 90 100 90 Q60 90 60 82Z" fill="#1a0a00" />
      {/* brilho no cabelo */}
      <ellipse cx="88" cy="68" rx="14" ry="6" fill="white" opacity="0.08" transform="rotate(-20 88 68)" />

      {/* --- ORELHAS --- */}
      <ellipse cx="54" cy="104" rx="8" ry="10" fill="#f5c5a3" />
      <ellipse cx="146" cy="104" rx="8" ry="10" fill="#f5c5a3" />
      {/* sombra interna orelha */}
      <ellipse cx="54" cy="104" rx="5" ry="7" fill="#e8a882" />
      <ellipse cx="146" cy="104" rx="5" ry="7" fill="#e8a882" />

      {/* brincos */}
      <circle cx="54" cy="112" r="3" fill="#fbbf24" />
      <circle cx="146" cy="112" r="3" fill="#fbbf24" />

      {/* --- OLHOS --- */}
      {/* sobrancelhas */}
      <path d="M76 88 Q86 83 96 87" stroke="#1a0a00" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M104 87 Q114 83 124 88" stroke="#1a0a00" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* olho esquerdo */}
      <ellipse cx="86" cy="100" rx="13" ry="14" fill="white" />
      <ellipse cx="86" cy="101" rx="9" ry="10" fill="#3b82f6" />
      <ellipse cx="86" cy="101" rx="5.5" ry="6" fill="#1e3a8a" />
      <ellipse cx="86" cy="101" rx="2.5" ry="3" fill="#0a0a0a" />
      <circle cx="89" cy="97" r="2.5" fill="white" />
      <circle cx="83" cy="100" r="1" fill="white" opacity="0.6" />

      {/* olho direito */}
      <ellipse cx="114" cy="100" rx="13" ry="14" fill="white" />
      <ellipse cx="114" cy="101" rx="9" ry="10" fill="#3b82f6" />
      <ellipse cx="114" cy="101" rx="5.5" ry="6" fill="#1e3a8a" />
      <ellipse cx="114" cy="101" rx="2.5" ry="3" fill="#0a0a0a" />
      <circle cx="117" cy="97" r="2.5" fill="white" />
      <circle cx="111" cy="100" r="1" fill="white" opacity="0.6" />

      {/* cílios sutis */}
      <path d="M73 95 Q75 88 79 90" stroke="#1a0a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M99 90 Q103 88 105 95" stroke="#1a0a00" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* --- NARIZ --- */}
      <path d="M96 112 Q100 118 104 112" stroke="#e8a882" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* --- BOCA / SORRISO --- */}
      <path d="M84 124 Q100 136 116 124" fill="#e07a5f" />
      <path d="M84 124 Q100 132 116 124 Q100 138 84 124Z" fill="#c1524a" />
      {/* dentes */}
      <path d="M88 124 Q100 130 112 124 Q100 127 88 124Z" fill="white" />
      {/* lábio superior */}
      <path d="M84 124 Q92 120 100 123 Q108 120 116 124" stroke="#c1524a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* bochechas */}
      <ellipse cx="76" cy="116" rx="10" ry="7" fill="#f87171" opacity="0.35" />
      <ellipse cx="124" cy="116" rx="10" ry="7" fill="#f87171" opacity="0.35" />

      {/* --- MÃOS / BRAÇOS visíveis na base --- */}
      <ellipse cx="46" cy="188" rx="18" ry="12" fill="#f5c5a3" />
      <ellipse cx="154" cy="188" rx="18" ry="12" fill="#f5c5a3" />

      {/* brilho geral no rosto */}
      <ellipse cx="92" cy="90" rx="18" ry="10" fill="white" opacity="0.07" transform="rotate(-15 92 90)" />
    </svg>
  );
}
