'use client';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef } from 'react';
import { cn } from './utils';

export interface ProjectData {
  tag: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  color: string;
}

interface CardProps extends ProjectData {
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  tag,
  icon,
  title,
  description,
  url,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  
  // Scaling starts when the NEXT card begins to overlap
  // We use the progress of the entire section to drive this
  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Parallax effect for the mockup image
  // It moves slightly within its container as we scroll through THIS card's section
  // We zoom in a bit to avoid showing edges during parallax
  const imageScale = useTransform(progress, [range[0] - 0.1, range[0] + 0.1], [1.1, 1]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 25}px)`,
        }}
        className={cn(
          "flex flex-col md:flex-row relative h-[520px] w-full max-w-[1000px] rounded-[40px] p-8 md:p-12 origin-top shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-zinc-200 bg-[#F5F5F5]",
          "overflow-hidden transition-shadow duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
        )}
      >
        {/* Left Column: Content */}
        <div className='w-full md:w-[45%] flex flex-col justify-between h-full z-10'>
          <div>
            <div className='flex items-center gap-2 mb-8'>
              <div className='p-2.5 bg-zinc-200/60 rounded-xl shadow-sm'>
                {icon}
              </div>
              <span className='text-[13px] font-bold text-zinc-400 uppercase tracking-[0.2em]'>{tag}</span>
            </div>
            
            <h2 className='text-4xl md:text-[44px] font-bold text-zinc-900 leading-[1.1] mb-8 tracking-tight'>
              {title}
            </h2>
            
            <p className='text-[17px] text-zinc-500 leading-relaxed max-w-[340px] font-medium'>
              {description}
            </p>
          </div>
          
          <div className='mt-auto flex items-center gap-4 text-zinc-300'>
             <div className='w-7 h-11 rounded-full border-2 border-zinc-200 flex justify-center p-1.5'>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className='w-1 h-3 bg-zinc-200 rounded-full'
                />
             </div>
             <span className='text-[10px] font-bold uppercase tracking-widest text-zinc-400'>Deep Focus</span>
          </div>
        </div>

        {/* Right Column: UI Mockup / Image with Parallax */}
        <div className='hidden md:block absolute right-0 top-0 w-[55%] h-full bg-zinc-100/30 border-l border-zinc-100'>
          <div className='relative w-full h-full p-10'>
             {/* Mockup Container */}
             <div className='w-full h-full rounded-2xl bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-zinc-100 overflow-hidden relative'>
                <div className='h-9 w-full bg-zinc-50/80 backdrop-blur-sm border-b border-zinc-100 flex items-center px-4 gap-2'>
                   <div className='w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/10' />
                   <div className='w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/10' />
                   <div className='w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/10' />
                   <div className='ml-2 h-4 w-32 bg-zinc-200/30 rounded-full' />
                </div>
                <div className='relative w-full h-full overflow-hidden'>
                   <motion.img 
                     style={{ scale: imageScale }}
                     src={url} 
                     alt={title} 
                     className='w-full h-full object-cover transition-opacity duration-700'
                   />
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function StackingCard({ projects }: { projects: ProjectData[] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className='relative'>
      {projects.map((project, i) => {
        // The scale logic:
        // Card starts scaling down when the NEXT one arrives.
        // If it's the last card (i == projects.length - 1), it doesn't scale.
        // Actually, in the creme.digital effect, as you scroll past the whole section, 
        // they might all scale together or stay.
        // We'll map it so each card scales starting from its neighbor's entry.
        
        const startScaling = (i + 1) * (1 / projects.length);
        const targetScale = 1 - (projects.length - i) * 0.04;
        
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            // range[0] is when it becomes sticky/next card arrives
            range={[startScaling, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}
