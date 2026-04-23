import React from 'react';
import StackingCard, { ProjectData } from './ui/stacking-card';
import { Code, CheckCircle, Pencil, Users } from 'lucide-react';

const projects: ProjectData[] = [
  {
    tag: 'Briefing',
    icon: <Code size={20} className="text-zinc-600" />,
    title: 'Alinhamento rápido no que importa',
    description:
      'Escopo claro para landing, SaaS ou app: priorizamos o que vende e o que precisa estar no ar primeiro, sem semanas em reunião infinita.',
    url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Build',
    icon: <CheckCircle size={20} className="text-zinc-600" />,
    title: 'Sprints curtos, entrega contínua',
    description:
      'Desenvolvimento em ciclos objetivos com demos frequentes. Você acompanha o produto tomando forma e ajusta antes do go-live.',
    url: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Qualidade',
    icon: <Pencil size={20} className="text-zinc-600" />,
    title: 'Acabamento premium, performance real',
    description:
      'UI polida, código enxuto e stack atual, para seu site ou sistema carregar rápido, converter melhor e aguentar escala.',
    url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Lançamento',
    icon: <Users size={20} className="text-zinc-600" />,
    title: 'Do deploy ao time usando de verdade',
    description:
      'Publicação assistida, repasse com documentação e suporte pós-lançamento para landing pages, SaaS e apps entrarem no ar com confiança.',
    url: 'https://images.unsplash.com/photo-1542744173-8e7e5381bb52?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
];

export function StackingCardsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-20">
      {/* Creme Digital Inspired Radial Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,120,244,0.4)_0%,rgba(240,113,165,0.3)_50%,rgba(125,194,251,0.2)_100%)] blur-[100px]" />
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-pink-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto px-8 md:px-12 mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
          Como trabalhamos: landings, SaaS e apps <br />
          <span className="text-zinc-400">com processo enxuto, prazos realistas e entrega que você acompanha em cada sprint.</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8">
        <StackingCard projects={projects} />
      </div>
    </section>
  );
}
