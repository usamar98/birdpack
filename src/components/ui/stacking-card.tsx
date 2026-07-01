"use client";

import { forwardRef, useRef } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface StackingCardProject {
  title: string;
  description: string;
  link: string;
  color: string;
  imageAlt: string;
  imagePosition?: string;
  imageSize?: string;
  eyebrow?: string;
  ctaHref?: string;
}

interface CardProps extends StackingCardProject {
  i: number;
  total: number;
  progress: MotionValue<number>;
}

export function Card({
  i,
  total,
  title,
  description,
  link,
  color,
  imageAlt,
  imagePosition = "center",
  imageSize = "cover",
  eyebrow,
  ctaHref = "#contact",
  progress,
}: CardProps) {
  const cardStep = 1 / total;
  const enterStart = i === 0 ? 0 : Math.max(0, (i - 0.72) * cardStep);
  const enterEnd = i === 0 ? 0.001 : i * cardStep;
  const stackEnd = Math.min(1, (i + 1.4) * cardStep);
  const imageScale = useTransform(progress, [enterStart, enterEnd], [1.08, 1]);
  const y = useTransform(progress, [enterStart, enterEnd], i === 0 ? ["0%", "0%"] : ["112%", "0%"]);
  const scale = useTransform(progress, [enterEnd, 1], [1, 1 - (total - i - 1) * 0.022]);
  const opacity = useTransform(progress, [Math.max(0, enterStart - 0.04), enterStart], i === 0 ? [1, 1] : [0.75, 1]);
  const shadowOpacity = useTransform(progress, [enterEnd, stackEnd], [0.14, 0.22]);
  const boxShadow = useTransform(shadowOpacity, (value) => `0 34px 100px rgba(13,59,46,${value})`);

  return (
    <motion.article
      style={{
        backgroundColor: color,
        opacity,
        scale,
        y,
        zIndex: i + 1,
        top: `${i * 9}px`,
        boxShadow,
      }}
      className={cn(
        "absolute inset-x-0 mx-auto grid w-full max-w-6xl origin-top overflow-hidden rounded-[30px] border border-white/60 p-4 backdrop-blur-2xl sm:p-7",
        "min-h-[500px] gap-5 lg:h-[430px] lg:min-h-0 lg:grid-cols-[0.42fr_0.58fr] lg:p-8",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,248,223,0.78),rgba(255,248,223,0.2)_55%,rgba(13,59,46,0.1))]" />
      <div className="relative z-10 flex flex-col justify-center">
        <span className="mb-4 w-fit rounded-full border border-[#0d3b2e]/35 bg-[#fff8df]/55 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#315f4e] sm:mb-5">
          {eyebrow ?? String(i + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-3xl font-black leading-tight text-[#0d3b2e] sm:text-5xl">{title}</h3>
        <p className="mt-4 max-w-md text-base leading-7 text-[#315f4e] sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
        <a
          href={ctaHref}
          className="mt-5 inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-2xl border border-[#0d3b2e]/45 bg-[#0d3b2e] px-6 text-sm font-extrabold text-[#fff8df] shadow-[0_18px_36px_rgba(13,59,46,0.16)] transition hover:bg-[#082f24] sm:mt-7"
        >
          See more
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>

      <div className="relative z-10 min-h-[220px] overflow-hidden rounded-[24px] border border-white/64 bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.42)] sm:min-h-[320px] lg:my-auto lg:size-[330px] lg:min-h-0 lg:justify-self-center">
        <motion.div
          role="img"
          aria-label={imageAlt}
          className="h-full w-full bg-no-repeat"
          style={{
            scale: imageScale,
            backgroundImage: `url('${link}')`,
            backgroundPosition: imagePosition,
            backgroundSize: imageSize,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,250,232,0.68),transparent_34%),linear-gradient(180deg,transparent,rgba(255,232,154,0.16))]" />
      </div>
    </motion.article>
  );
}

interface StackingCardsProps {
  id?: string;
  title: string;
  subtitle?: string;
  projects: StackingCardProject[];
}

const StackingCards = forwardRef<HTMLElement, StackingCardsProps>(({ id, title, subtitle, projects }, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id={id} ref={ref} className="relative">
      <div ref={container} className="relative bg-transparent" style={{ height: `${projects.length * 88 + 100}vh` }}>
        <div className="sticky top-0 z-10 flex h-screen items-center overflow-hidden py-4 sm:py-5">
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
            <div className="mx-auto mb-5 max-w-4xl text-center sm:mb-7">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#315f4e]">Bird Pack range</p>
              <h2 className="font-display mt-3 text-4xl font-black leading-tight text-[#0d3b2e] sm:text-5xl">{title}</h2>
              {subtitle ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#315f4e] sm:mt-5 sm:text-lg sm:leading-8">{subtitle}</p> : null}
            </div>
            <div className="relative mx-auto h-[500px] w-full max-w-6xl sm:h-[540px] lg:h-[450px]">
              {projects.map((project, i) => (
                <Card key={`${project.title}-${i}`} {...project} i={i} total={projects.length} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

StackingCards.displayName = "StackingCards";

export default StackingCards;
