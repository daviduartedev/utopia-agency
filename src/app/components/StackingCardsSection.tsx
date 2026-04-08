import React from 'react';
import StackingCard, { ProjectData } from './ui/stacking-card';
import { Code, CheckCircle, Pencil, Users } from 'lucide-react';

const projects: ProjectData[] = [
  {
    tag: 'Build',
    icon: <Code size={20} className="text-zinc-600" />,
    title: 'Build your MVP in just 2 weeks',
    description:
      'We start by designing and developing the core functionality to validate your concept fast — so you can prove traction before investing big.',
    url: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Iterate',
    icon: <CheckCircle size={20} className="text-zinc-600" />,
    title: 'Set your roadmap and milestones',
    description:
      'Continuous development with flexible roadmaps that let you shift priorities as you learn from users and adapt to the market.',
    url: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Grow',
    icon: <Pencil size={20} className="text-zinc-600" />,
    title: 'Move faster with AI-powered tools',
    description:
      'Leverage modern AI workflows and automated testing to accelerate deployment and ensure software quality at every step.',
    url: 'https://images.unsplash.com/photo-1675271591211-126ad94e495d?q=80&w=1200&auto=format&fit=crop',
    color: '#E5E5E5',
  },
  {
    tag: 'Collaborate',
    icon: <Users size={20} className="text-zinc-600" />,
    title: 'Stay flexible with async collaboration',
    description:
      'Global-first async workflows that keep everyone aligned without unnecessary meetings, letting you scale with talent anywhere.',
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
          How we work? We simplify complex builds into <br />
          <span className="text-zinc-400">fast, focused sprints that ship real results every week.</span>
        </h2>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 md:px-8">
        <StackingCard projects={projects} />
      </div>
    </section>
  );
}
