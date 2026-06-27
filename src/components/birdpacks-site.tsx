"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const brand = {
  name: "BirdPacks",
  tagline: "Premium Packaging Solutions for Modern Businesses",
  email: "info@birdpacks.com",
  phone: "+923017987824",
  whatsapp: "https://wa.me/923017987824",
  location: "Packaging support available across Pakistan",
};

const navItems = [
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "Custom Packaging", href: "#custom" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  { name: "Paper bags", sheet: [0, 0], alt: "Kraft paper shopping bag" },
  { name: "Cardboard boxes", sheet: [1, 0], alt: "Corrugated cardboard shipping box" },
  { name: "Food packaging", sheet: [2, 0], alt: "Food packaging box" },
  { name: "Gift boxes", sheet: [3, 0], alt: "Gift box with orange ribbon" },
  { name: "Custom printed packaging", sheet: [0, 1], alt: "Custom printed cardboard packaging" },
  { name: "Courier / shipping bags", sheet: [1, 1], alt: "Courier mailer bag" },
  { name: "Bakery packaging", sheet: [2, 1], alt: "Bakery cupcake packaging" },
  { name: "Retail packaging", sheet: [3, 1], alt: "Orange retail paper bag" },
] as const;

const featuredProducts = [
  {
    name: "Kraft Paper Bag",
    description: "Strong, eco-friendly paper bags for retail and daily business needs.",
    sheet: [0, 0],
    alt: "Kraft paper bag product",
  },
  {
    name: "Corrugated Box",
    description: "Durable boxes designed for safe storage, handling, and shipment.",
    sheet: [1, 0],
    alt: "Corrugated box product",
  },
  {
    name: "Food Packaging Box",
    description: "Food-safe packaging for restaurants, cafes, takeaways, and events.",
    sheet: [2, 0],
    alt: "Food packaging product",
  },
  {
    name: "Premium Gift Box",
    description: "Elegant rigid boxes that give products a polished presentation.",
    sheet: [3, 0],
    alt: "Premium gift box product",
  },
  {
    name: "Courier / Mailer Bag",
    description: "Lightweight mailer bags for secure courier and shipping needs.",
    sheet: [1, 1],
    alt: "Courier mailer bag product",
  },
] as const;

const benefits = [
  {
    title: "Custom designs",
    description: "Packaging concepts shaped around your brand identity and product needs.",
    icon: "design",
  },
  {
    title: "Bulk order support",
    description: "Flexible support for small batches, repeat runs, and large business volumes.",
    icon: "boxes",
  },
  {
    title: "Premium material",
    description: "Reliable paper, board, and finishing options with a professional feel.",
    icon: "shield",
  },
  {
    title: "Fast delivery",
    description: "Clear timelines and efficient coordination from inquiry to dispatch.",
    icon: "truck",
  },
  {
    title: "Business-friendly solutions",
    description: "Practical packaging guidance for retail, food, gifting, and shipping.",
    icon: "briefcase",
  },
] as const;

const galleryItems = [
  { sheet: [0, 0], alt: "Kraft paper bag gallery image" },
  { sheet: [1, 0], alt: "Cardboard box gallery image" },
  { sheet: [2, 0], alt: "Food box gallery image" },
  { sheet: [3, 0], alt: "Gift box gallery image" },
  { sheet: [0, 1], alt: "Custom printed packaging gallery image" },
  { sheet: [1, 1], alt: "Courier bag gallery image" },
  { sheet: [2, 1], alt: "Bakery packaging gallery image" },
  { sheet: [3, 1], alt: "Retail bag gallery image" },
  { sheet: [0, 2], alt: "Luxury box gallery image" },
  { sheet: [1, 2], alt: "Mailer box gallery image" },
  { sheet: [2, 2], alt: "Bakery pastry box gallery image" },
  { sheet: [3, 2], alt: "Retail packaging set gallery image" },
] as const;

type IconName = (typeof benefits)[number]["icon"] | "pin" | "mail" | "phone" | "whatsapp" | "arrow" | "box";

type SheetPosition = readonly [number, number];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "design":
      return (
        <svg {...common}>
          <path d="M4 20l5.2-1.4L20 7.8 16.2 4 5.4 14.8 4 20z" />
          <path d="M14.6 5.6l3.8 3.8" />
          <path d="M5 11l8 8" />
        </svg>
      );
    case "boxes":
      return (
        <svg {...common}>
          <path d="M4 9l5-3 5 3-5 3-5-3z" />
          <path d="M10 15l5-3 5 3-5 3-5-3z" />
          <path d="M4 15l5-3 5 3-5 3-5-3z" />
          <path d="M9 12v6M15 12v6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7" />
          <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
          <path d="M4 7h16v12H4z" />
          <path d="M4 12h16" />
          <path d="M10 12v2h4v-2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
          <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M4 6h16v12H4z" />
          <path d="M4 8l8 5 8-5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M7 4l3 3-2 2c1.2 2.5 2.8 4.1 5.3 5.3l2-2 3 3-1.8 3.2c-.5.9-1.5 1.3-2.5 1-5.1-1.5-8.9-5.3-10.5-10.5-.3-1 .1-2 1-2.5L7 4z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12 4a8 8 0 0 0-6.9 12.1L4 20l4-1a8 8 0 1 0 4-15z" />
          <path d="M9.1 8.6c.2-.4.5-.4.8-.2l1 .8c.3.2.3.5.1.8l-.4.6c.7 1.2 1.6 2.1 2.8 2.8l.7-.5c.3-.2.6-.2.8.1l.8 1c.2.3.1.6-.2.8-.7.5-1.5.7-2.3.4-2.1-.7-3.8-2.4-4.5-4.5-.3-.8-.1-1.6.4-2.1z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 8l8-4 8 4-8 4-8-4z" />
          <path d="M4 8v8l8 4 8-4V8" />
          <path d="M12 12v8" />
        </svg>
      );
  }
}

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <motion.section
      id={id}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-110px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({ title, subtitle, compact = false }: { title: string; subtitle?: string; compact?: boolean }) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${compact ? "mb-6 sm:mb-8" : "mb-10"}`}>
      <h2 className="font-display text-3xl font-bold leading-tight text-[#2d150d] sm:text-4xl lg:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#ff5a0a]" />
      {subtitle ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#70574c] sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light" }) {
  const styles = {
    primary: "bg-[#ff5a0a] text-white shadow-[0_18px_36px_rgba(255,90,10,0.22)] hover:bg-[#e64d00]",
    secondary: "border border-[#ff8c4d] bg-white/70 text-[#f05505] hover:border-[#ff5a0a] hover:bg-white",
    light: "bg-white text-[#f05505] shadow-[0_16px_34px_rgba(91,35,0,0.14)] hover:bg-[#fff7ed]",
  };

  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] px-6 py-3 text-sm font-bold transition ${styles[variant]}`}
    >
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </motion.a>
  );
}

function Logo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label={`${brand.name} home`}>
      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#ffb77f]/70 bg-white/35 shadow-[0_18px_38px_rgba(255,90,10,0.16)] backdrop-blur">
        <Image src="/bp-logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
      </span>
      <span className="leading-none">
        <span className="block text-2xl font-black text-[#ff5a0a]">{brand.name}</span>
        <span className="block pl-1 text-xs font-bold uppercase tracking-[0.18em] text-[#1b5866]">Packaging</span>
      </span>
    </a>
  );
}

function ProductThumb({ sheet, alt, className = "" }: { sheet: SheetPosition; alt: string; className?: string }) {
  const [col, row] = sheet;

  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-[#fff1df] bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: "url('/images/birdpacks-products-sheet.svg')",
        backgroundSize: "400% 300%",
        backgroundPosition: `${(col / 3) * 100}% ${(row / 2) * 100}%`,
      }}
    />
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8c5]/70 bg-[#fff9f0]/92 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-bold text-[#3a2118] transition hover:text-[#ff5a0a]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <ButtonLink href="#contact">Contact Us</ButtonLink>
        </div>
        <a href="#contact" className="rounded-full border border-[#f2c5a4] px-4 py-2 text-sm font-bold text-[#f05505] sm:hidden">
          Contact
        </a>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[#ffb067]/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#ff5a0a]/10 blur-3xl" />
      <Container className="grid items-center gap-10 py-10 sm:py-14 lg:min-h-[560px] lg:grid-cols-[0.94fr_1.06fr] lg:py-10">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-3xl">
          <motion.h1
            variants={reveal}
            className="font-display max-w-[650px] text-[40px] font-black leading-[1] text-[#2d150d] sm:text-[54px] lg:text-[58px]"
          >
            <span className="block lg:whitespace-nowrap">High-Quality</span>
            <span className="block lg:whitespace-nowrap">Packaging Products</span>
            <span className="block lg:whitespace-nowrap">for Modern Businesses</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-xl text-lg leading-8 text-[#70574c] sm:text-xl">
            {brand.tagline}
          </motion.p>
          <motion.div variants={reveal} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#products">View Products</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">Contact Us</ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="relative min-h-[300px] sm:min-h-[380px] lg:aspect-[16/9] lg:min-h-0"
        >
          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 0.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 overflow-hidden rounded-[28px] bg-[#fff8ef]"
          >
            <Image
              src="/images/birdpacks-hero.svg"
              alt="BirdPacks boxes, bags, food packaging, and mailer products"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}

function ProductCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const categorySlides = Array.from({ length: Math.ceil(categories.length / 2) }, (_, index) =>
    categories.slice(index * 2, index * 2 + 2),
  );
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(categorySlides.length - 1) * 100}%`]);

  return (
    <section ref={sectionRef} id="products" className="relative min-h-[360vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-10 sm:py-16 lg:py-20">
        <Container>
          <SectionHeading title="Product Categories" />
          <div className="relative overflow-hidden rounded-[34px]" style={{ perspective: "1200px" }}>
            <motion.div style={{ x }} className="flex">
              {categorySlides.map((slide, slideIndex) => (
                <div key={`category-slide-${slideIndex}`} className="grid w-full shrink-0 gap-5 px-1 sm:grid-cols-2 sm:gap-6 lg:gap-8">
                  {slide.map((category) => (
                    <motion.article
                      key={category.name}
                      whileHover={{ y: -10, rotateY: -4 }}
                      className="group relative min-h-[245px] overflow-hidden rounded-[30px] border border-white/60 bg-white/38 p-4 text-left shadow-[0_30px_90px_rgba(51,22,0,0.12)] backdrop-blur-xl transition hover:border-[#ffb17a]/80 sm:min-h-[440px] sm:p-6 lg:min-h-[470px]"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.55),rgba(255,255,255,0.16)_55%,rgba(23,137,153,0.08))]" />
                      <div className="relative flex h-full flex-col">
                        <ProductThumb sheet={category.sheet} alt={category.alt} className="min-h-[135px] flex-1 rounded-[24px] sm:min-h-[270px]" />
                        <div className="mt-4 flex items-end justify-between gap-4 sm:mt-5 sm:gap-5">
                          <h3 className="font-display max-w-[13rem] text-xl font-black leading-tight text-[#2d150d] sm:text-3xl">
                            {category.name}
                          </h3>
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#ffbe8b]/70 bg-white/44 text-[#ff5a0a] shadow-[0_14px_35px_rgba(255,90,10,0.14)]">
                            <Icon name="box" className="h-6 w-6" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mx-auto mt-8 h-2 max-w-xl overflow-hidden rounded-full bg-white/55">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-[#ff5a0a]" />
          </div>
        </Container>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(featuredProducts.length - 1) * 100}%`]);

  return (
    <section id="featured" ref={sectionRef} className="relative" style={{ height: `${featuredProducts.length * 108}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-6 sm:py-8 lg:py-10">
        <Container>
          <SectionHeading
            compact
            title="Featured Products"
            subtitle="Explore practical, premium packaging options that help customers understand your product quality before they contact you."
          />
          <div className="overflow-hidden rounded-[34px]">
            <motion.div style={{ x }} className="flex">
              {featuredProducts.map((product, index) => (
                <div key={product.name} className="w-full shrink-0 px-1">
                  <motion.article
                    whileHover={{ y: -8 }}
                    className="mx-auto grid min-h-[430px] max-w-5xl overflow-hidden rounded-[34px] border border-white/60 bg-white/36 shadow-[0_35px_100px_rgba(51,22,0,0.14)] backdrop-blur-xl sm:min-h-[460px] lg:grid-cols-[1.1fr_0.9fr]"
                  >
                    <ProductThumb sheet={product.sheet} alt={product.alt} className="min-h-[200px] sm:min-h-[240px] lg:min-h-full" />
                    <div className="flex flex-col justify-center p-6 sm:p-10">
                      <span className="mb-5 w-fit rounded-full border border-[#ffb17a]/70 bg-white/45 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#1b5866] sm:mb-6">
                        {String(index + 1).padStart(2, "0")} / {String(featuredProducts.length).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-3xl font-black leading-tight text-[#2d150d] sm:text-5xl">{product.name}</h3>
                      <p className="mt-4 max-w-xl text-base leading-7 text-[#6b5146] sm:mt-6 sm:text-lg sm:leading-8">{product.description}</p>
                      <motion.a
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href="#contact"
                        className="mt-6 inline-flex min-h-12 w-fit items-center justify-center rounded-2xl bg-[#ff5a0a] px-6 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(255,90,10,0.22)] transition hover:bg-[#e64d00] sm:mt-7"
                      >
                        Ask for Details
                      </motion.a>
                    </div>
                  </motion.article>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mx-auto mt-8 h-2 max-w-xl overflow-hidden rounded-full bg-white/55">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left rounded-full bg-[#1b9aaa]" />
          </div>
        </Container>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <Section id="why-us" className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={`Why Choose ${brand.name}?`} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} className="grid overflow-hidden rounded-[28px] border border-[#edd9c3] bg-white/74 shadow-[0_24px_60px_rgba(77,34,0,0.07)] sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <motion.article key={benefit.title} variants={reveal} className="border-b border-[#edd9c3] p-7 text-center last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#fff1e5] text-[#ff5a0a]">
                <Icon name={benefit.icon} className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-base font-black text-[#2d150d]">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#725a4f]">{benefit.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function CustomPackaging() {
  const customOptions = ["Custom size", "Custom color", "Your logo", "Quality printing"];

  return (
    <Section id="custom" className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 rounded-[32px] border border-[#ead7bf] bg-white/82 p-4 shadow-[0_28px_70px_rgba(69,29,0,0.08)] lg:grid-cols-[0.95fr_1.15fr_0.95fr] lg:p-6">
          <ProductThumb sheet={[3, 2]} alt="Custom packaging set with orange and white boxes" className="min-h-[280px] rounded-[24px]" />
          <div className="flex flex-col justify-center px-3 py-5 lg:px-6">
            <h2 className="font-display text-3xl font-bold leading-tight text-[#2d150d] sm:text-4xl">Custom Packaging Made for Your Brand</h2>
            <p className="mt-5 text-base leading-8 text-[#70574c]">
              Customers can request packaging in custom size, color, logo, and printing options. We help shape packaging that presents your products clearly and professionally.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {customOptions.map((option) => (
                <div key={option} className="rounded-2xl border border-[#f1d3ba] bg-[#fff8f0] p-3 text-center text-xs font-extrabold text-[#563326]">
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] bg-[#ff5a0a] p-7 text-center text-white shadow-[0_22px_55px_rgba(255,90,10,0.25)]">
            <Icon name="box" className="h-14 w-14" />
            <h3 className="font-display mt-5 text-2xl font-bold leading-tight">Let&apos;s build packaging that represents your brand.</h3>
            <ButtonLink href="#contact" variant="light">Get Custom Packaging</ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Gallery() {
  return (
    <Section id="gallery" className="py-14 sm:py-20">
      <Container>
        <SectionHeading title="Gallery" subtitle="A closer look at packaging styles for retail, food, gifting, courier, bakery, and custom printed product lines." />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map((item, index) => (
            <motion.div key={`${item.alt}-${index}`} variants={reveal} whileHover={{ y: -7, scale: 1.015 }} className="overflow-hidden rounded-2xl border border-[#ead7bf] bg-white shadow-[0_18px_45px_rgba(69,29,0,0.07)]">
              <ProductThumb sheet={item.sheet} alt={item.alt} className="aspect-[4/3]" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section id="contact" className="py-14 sm:py-20">
      <Container>
        <SectionHeading title="Get in Touch" subtitle={`Tell us what packaging you need and the ${brand.name} team will guide you with product details, custom options, and next steps.`} />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form onSubmit={handleSubmit} variants={reveal} className="rounded-[28px] border border-[#ead7bf] bg-white/86 p-6 shadow-[0_24px_60px_rgba(69,29,0,0.08)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" placeholder="Your name" />
              <Field label="Phone" placeholder="Your phone number" />
            </div>
            <Field label="Email" placeholder="Your email address" type="email" className="mt-5" />
            <label className="mt-5 block">
              <span className="text-sm font-extrabold text-[#3d2117]">Message</span>
              <textarea
                required
                rows={5}
                placeholder="Write your message..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#ead7bf] bg-[#fffbf6] px-4 py-3 text-sm text-[#2d150d] outline-none transition placeholder:text-[#a18b7f] focus:border-[#ff8c4d] focus:ring-4 focus:ring-[#ff5a0a]/10"
              />
            </label>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] bg-[#ff5a0a] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(255,90,10,0.22)] transition hover:bg-[#e64d00]">
                {submitted ? "Message Ready" : "Send Message"}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
              <a href={brand.whatsapp} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] border border-[#bfe6ca] bg-[#f5fff7] px-6 py-3 text-sm font-bold text-[#16833a] transition hover:bg-white">
                <Icon name="whatsapp" className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
            {submitted ? <p className="mt-4 rounded-2xl bg-[#fff1e5] px-4 py-3 text-sm font-bold text-[#a64100]">Thanks. Your inquiry is ready for the {brand.name} team.</p> : null}
          </motion.form>

          <motion.aside variants={reveal} className="grid gap-5 rounded-[28px] border border-[#ead7bf] bg-white/86 p-6 shadow-[0_24px_60px_rgba(69,29,0,0.08)] sm:p-8">
            <ContactItem icon="pin" title="Business Location" text={brand.location} />
            <ContactItem icon="mail" title="Email" text={brand.email} />
            <ContactItem icon="phone" title="Phone" text={brand.phone} />
            <div className="relative mt-2 min-h-56 overflow-hidden rounded-3xl border border-[#f0d7c1] bg-[#fff4e7]">
              <div className="absolute inset-0 opacity-65 [background-image:linear-gradient(30deg,rgba(101,70,52,0.12)_1px,transparent_1px),linear-gradient(120deg,rgba(101,70,52,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ff5a0a] text-white shadow-[0_20px_45px_rgba(255,90,10,0.28)]">
                <Icon name="pin" className="h-10 w-10" />
              </div>
            </div>
          </motion.aside>
        </div>
      </Container>
    </Section>
  );
}

function Field({ label, placeholder, type = "text", className = "" }: { label: string; placeholder: string; type?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-extrabold text-[#3d2117]">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-[#ead7bf] bg-[#fffbf6] px-4 text-sm text-[#2d150d] outline-none transition placeholder:text-[#a18b7f] focus:border-[#ff8c4d] focus:ring-4 focus:ring-[#ff5a0a]/10"
      />
    </label>
  );
}

function ContactItem({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff1e5] text-[#ff5a0a]">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-black text-[#2d150d]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#70574c]">{text}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#ead7bf] bg-[#fff1df] pt-12">
      <Container>
        <div className="grid gap-10 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#70574c]">High-quality packaging products for businesses that need polished presentation, reliable materials, and clear support.</p>
          </div>
          <FooterColumn title="Quick Links" items={navItems.map((item) => ({ label: item.label, href: item.href }))} />
          <FooterColumn title="Product Categories" items={categories.slice(0, 6).map((item) => ({ label: item.name, href: "#products" }))} />
          <div>
            <h3 className="font-black text-[#2d150d]">Contact Info</h3>
            <p className="mt-4 text-sm leading-7 text-[#70574c]">{brand.location}</p>
            <p className="mt-3 text-sm font-bold text-[#2d150d]">{brand.email}</p>
            <p className="mt-2 text-sm font-bold text-[#2d150d]">{brand.phone}</p>
          </div>
        </div>
      </Container>
      <div className="bg-[#ff5a0a] py-4 text-center text-xs font-bold text-white">
        (c) 2026 {brand.name}. Made for modern business packaging showcases.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-black text-[#2d150d]">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <a href={item.href} className="text-sm font-semibold text-[#70574c] transition hover:text-[#ff5a0a]">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BirdPacksSite() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff8ef] text-[#2d150d]">
      <Header />
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <CustomPackaging />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}






