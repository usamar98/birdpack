"use client";

import Image from "next/image";
import { type CSSProperties, type FormEvent, type ReactNode, useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";


const brand = {
  name: "Bird Pack",
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

const brandAssets = {
  logo: "/images/products/logo.png",
  hero: "/images/products/customprint.png",
} as const;

const productImages = {
  paperBag: "/images/products/paperbags.png",
  cardboardBox: "/images/products/cardboards.png",
  foodPackaging: "/images/products/foodpacking.png",
  giftBox: "/images/products/giftbox.png",
  customPrinted: "/images/products/customprint.png",
  courierBag: "/images/products/couriershippingbags.png",
  bakeryBox: "/images/products/bakerypackaging.png",
  retailPackaging: "/images/products/retailpackaging.png",
} as const;

const categories = [
  {
    name: "Paper bags",
    description: "Reusable kraft carry bags with sturdy handles and clean branding space for shops, events, and daily orders.",
    image: productImages.paperBag,
    alt: "Kraft paper shopping bag",
    color: "rgba(255, 250, 232, 0.92)",
  },
  {
    name: "Cardboard boxes",
    description: "Strong corrugated packaging built for storage, shipping, and reliable product protection.",
    image: productImages.cardboardBox,
    alt: "Corrugated cardboard shipping box",
    color: "rgba(255, 244, 199, 0.9)",
  },
  {
    name: "Food packaging",
    description: "Food-safe boxes for cafes, restaurants, takeaways, catering runs, and fresh presentation.",
    image: productImages.foodPackaging,
    alt: "Food packaging box",
    color: "rgba(255, 247, 213, 0.92)",
  },
  {
    name: "Gift boxes",
    description: "Premium presentation boxes that make gifts, retail sets, and campaign packs feel finished.",
    image: productImages.giftBox,
    alt: "Gift box with orange ribbon",
    color: "rgba(255, 238, 177, 0.9)",
  },
  {
    name: "Custom printed packaging",
    description: "Branded packaging layouts with print-ready surfaces, color accents, and tailored finishing.",
    image: productImages.customPrinted,
    alt: "Custom printed cardboard packaging",
    color: "rgba(255, 250, 232, 0.9)",
  },
  {
    name: "Courier / shipping bags",
    description: "Lightweight mailer bags for courier dispatch, online orders, and secure delivery workflows.",
    image: productImages.courierBag,
    alt: "Courier mailer bag",
    color: "rgba(255, 241, 190, 0.9)",
  },
  {
    name: "Bakery packaging",
    description: "Boxes and trays for cupcakes, pastries, and bakery items that need a polished shelf look.",
    image: productImages.bakeryBox,
    alt: "Bakery cupcake packaging",
    color: "rgba(255, 247, 213, 0.92)",
  },
  {
    name: "Retail packaging",
    description: "Retail-ready bags and packs that help products stand out while staying practical to carry.",
    image: productImages.retailPackaging,
    alt: "Orange retail paper bag",
    color: "rgba(255, 244, 199, 0.9)",
  },
] as const;

const featuredProducts = [
  {
    name: "Kraft Paper Bag",
    description: "Strong, eco-friendly paper bags for retail and daily business needs.",
    image: productImages.paperBag,
    alt: "Kraft paper bag product",
  },
  {
    name: "Corrugated Box",
    description: "Durable boxes designed for safe storage, handling, and shipment.",
    image: productImages.cardboardBox,
    alt: "Corrugated box product",
  },
  {
    name: "Food Packaging Box",
    description: "Food-safe packaging for restaurants, cafes, takeaways, and events.",
    image: productImages.foodPackaging,
    alt: "Food packaging product",
  },
  {
    name: "Premium Gift Box",
    description: "Elegant rigid boxes that give products a polished presentation.",
    image: productImages.giftBox,
    alt: "Premium gift box product",
  },
  {
    name: "Courier / Mailer Bag",
    description: "Lightweight mailer bags for secure courier and shipping needs.",
    image: productImages.courierBag,
    alt: "Courier mailer bag product",
  },
  {
    name: "Retail Packaging",
    description: "Shelf-ready packaging for shops, product sets, and customer handover.",
    image: productImages.retailPackaging,
    alt: "Retail packaging product",
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
  { image: productImages.paperBag, alt: "Kraft paper bag gallery image" },
  { image: productImages.cardboardBox, alt: "Cardboard box gallery image" },
  { image: productImages.foodPackaging, alt: "Food box gallery image" },
  { image: productImages.giftBox, alt: "Gift box gallery image" },
  { image: productImages.customPrinted, alt: "Custom printed packaging gallery image" },
  { image: productImages.courierBag, alt: "Courier bag gallery image" },
  { image: productImages.bakeryBox, alt: "Bakery packaging gallery image" },
  { image: productImages.retailPackaging, alt: "Retail packaging gallery image" },
] as const;

type IconName = (typeof benefits)[number]["icon"] | "pin" | "mail" | "phone" | "whatsapp" | "arrow" | "box";

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

const categoryCarouselDelay = 3400;

type CategoryCardPose = {
  xMobile: string;
  xTablet: string;
  xDesktop: string;
  y: string;
  z: string;
  rotate: string;
  scaleMobile: number;
  scaleTablet: number;
  scaleDesktop: number;
  opacity: number;
  blur: string;
  zIndex: number;
};

type CategoryCardStyle = CSSProperties & Record<`--${string}`, string | number>;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  const half = total / 2;

  if (offset > half) {
    offset -= total;
  }

  if (offset < -half) {
    offset += total;
  }

  return offset;
}

function getCategoryCardPose(offset: number): CategoryCardPose {
  const sign = offset < 0 ? -1 : 1;
  const distance = Math.abs(offset);

  if (distance === 0) {
    return {
      xMobile: "0px",
      xTablet: "0px",
      xDesktop: "0px",
      y: "-50%",
      z: "170px",
      rotate: "0deg",
      scaleMobile: 0.98,
      scaleTablet: 1.02,
      scaleDesktop: 1.08,
      opacity: 1,
      blur: "0px",
      zIndex: 60,
    };
  }

  if (distance === 1) {
    return {
      xMobile: `${sign * 112}px`,
      xTablet: `${sign * 230}px`,
      xDesktop: `${sign * 335}px`,
      y: "-48%",
      z: "20px",
      rotate: `${sign * -18}deg`,
      scaleMobile: 0.64,
      scaleTablet: 0.72,
      scaleDesktop: 0.78,
      opacity: 0.96,
      blur: "0px",
      zIndex: 45,
    };
  }

  if (distance === 2) {
    return {
      xMobile: `${sign * 145}px`,
      xTablet: `${sign * 360}px`,
      xDesktop: `${sign * 540}px`,
      y: "-44%",
      z: "-115px",
      rotate: `${sign * -30}deg`,
      scaleMobile: 0.44,
      scaleTablet: 0.5,
      scaleDesktop: 0.56,
      opacity: 0.46,
      blur: "0.6px",
      zIndex: 20,
    };
  }

  if (distance >= 4) {
    return {
      xMobile: "0px",
      xTablet: "0px",
      xDesktop: "0px",
      y: "-43%",
      z: "-310px",
      rotate: `${sign * -8}deg`,
      scaleMobile: 0.34,
      scaleTablet: 0.38,
      scaleDesktop: 0.42,
      opacity: 0.18,
      blur: "1.4px",
      zIndex: 5,
    };
  }

  return {
    xMobile: `${sign * 82}px`,
    xTablet: `${sign * 470}px`,
    xDesktop: `${sign * 680}px`,
    y: "-43%",
    z: "-235px",
    rotate: `${sign * -40}deg`,
    scaleMobile: 0.34,
    scaleTablet: 0.4,
    scaleDesktop: 0.46,
    opacity: 0.26,
    blur: "1px",
    zIndex: 10,
  };
}

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
      <h2 className="font-display text-3xl font-bold leading-tight text-[#0d3b2e] sm:text-4xl lg:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#0d3b2e]" />
      {subtitle ? <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#315f4e] sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light" }) {
  const styles = {
    primary: "bg-[#0d3b2e] text-[#fff8df] shadow-[0_18px_36px_rgba(13,59,46,0.22)] hover:bg-[#082f24]",
    secondary: "border border-[#0d3b2e]/45 bg-[#fff8df]/80 text-[#0d3b2e] hover:border-[#0d3b2e] hover:bg-[#fff8df]",
    light: "bg-[#fff8df] text-[#0d3b2e] shadow-[0_16px_34px_rgba(13,59,46,0.16)] hover:bg-[#f7d762]",
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
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <span className="grid h-10 w-14 place-items-center sm:h-11 sm:w-16">
        <Image src={brandAssets.logo} alt="" width={120} height={66} unoptimized className="h-full w-full object-contain object-center" />
      </span>
      <span className="leading-none">
        <span className="block text-xl font-black text-[#0d3b2e] sm:text-2xl">{brand.name}</span>
        <span className="block pl-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#315f4e] sm:text-xs">Packaging</span>
      </span>
    </a>
  );
}

function ProductThumb({ image, alt, className = "" }: { image: string; alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`bg-transparent bg-cover bg-no-repeat ${className}`}
      style={{
        backgroundImage: `url('${image}')`,
        backgroundPosition: "center",
      }}
    />
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-bold text-[#0d3b2e] transition hover:text-[#082f24]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden sm:block">
          <ButtonLink href="#contact">Contact Us</ButtonLink>
        </div>
        <a href="#contact" className="rounded-full border border-[#0d3b2e]/45 bg-[#fff8df]/35 px-4 py-2 text-sm font-bold text-[#0d3b2e] backdrop-blur-sm sm:hidden">
          Contact
        </a>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src={brandAssets.hero}
        alt="Custom printed Bird Pack packaging displayed in a product showcase"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,232,154,0.9)_0%,rgba(255,250,232,0.76)_39%,rgba(255,241,189,0.28)_70%,rgba(255,241,189,0.08)_100%)]" />
      <Container className="flex min-h-[620px] items-center py-16 sm:py-20 lg:min-h-[680px]">
        <div className="relative z-10 w-full max-w-3xl">
          <h1 className="font-display max-w-[700px] text-[42px] font-black leading-[1] text-[#0d3b2e] drop-shadow-[0_2px_12px_rgba(255,248,223,0.58)] sm:text-[56px] lg:text-[68px]">
            <span className="block lg:whitespace-nowrap">High-Quality</span>
            <span className="block sm:hidden">Packaging</span>
            <span className="block sm:hidden">Products</span>
            <span className="hidden sm:block lg:whitespace-nowrap">Packaging Products</span>
            <span className="block lg:whitespace-nowrap">for Modern Businesses</span>
          </h1>
          <p className="mt-6 max-w-[320px] text-base leading-7 text-[#315f4e] sm:max-w-xl sm:text-xl sm:leading-8">
            {brand.tagline}
          </p>
          <div className="mt-9 flex max-w-[350px] flex-col gap-4 sm:max-w-none sm:flex-row">
            <ButtonLink href="#products">View Products</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">Contact Us</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductCategories() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const totalCategories = categories.length;
  const activeCategory = categories[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalCategories);
    }, categoryCarouselDelay);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, totalCategories]);

  function showCategory(index: number) {
    setActiveIndex((index + totalCategories) % totalCategories);
  }

  function showPreviousCategory() {
    showCategory(activeIndex - 1);
  }

  function showNextCategory() {
    showCategory(activeIndex + 1);
  }

  return (
    <Section id="products" className="scroll-mt-16 overflow-hidden py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="Product Categories"
          subtitle="Packaging categories for retail, shipping, food, gifting, bakery, and custom branded orders."
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-[min(90vw,760px)] -translate-x-1/2 rounded-full bg-[#fff8df]/45 blur-3xl" />
          <div
            className="relative mx-auto h-[500px] max-w-6xl overflow-visible [perspective:1200px] sm:h-[610px] lg:h-[650px] lg:[perspective:1600px]"
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[min(94vw,980px)] -translate-x-1/2 -translate-y-[41%] rounded-full border border-[#b88a20]/35 bg-[radial-gradient(circle,rgba(255,248,223,0.86),rgba(255,232,154,0.3)_58%,transparent_72%)] shadow-[0_42px_90px_rgba(13,59,46,0.12)] [transform:rotateX(63deg)]" />
            <p className="sr-only" aria-live="polite">
              Showing {activeCategory.name}
            </p>

            {categories.map((category, index) => {
              const offset = getCircularOffset(index, activeIndex, totalCategories);
              const pose = getCategoryCardPose(offset);
              const isActive = offset === 0;
              const isSideCard = Math.abs(offset) === 1;
              const cardStyle: CategoryCardStyle = {
                "--category-x-mobile": pose.xMobile,
                "--category-x-tablet": pose.xTablet,
                "--category-x-desktop": pose.xDesktop,
                "--category-y": pose.y,
                "--category-z": pose.z,
                "--category-rotate": pose.rotate,
                "--category-scale-mobile": pose.scaleMobile,
                "--category-scale-tablet": pose.scaleTablet,
                "--category-scale-desktop": pose.scaleDesktop,
                backgroundColor: category.color,
                filter: `blur(${pose.blur})`,
                opacity: pose.opacity,
                transform: "translate3d(calc(-50% + var(--category-x)), var(--category-y), var(--category-z)) rotateY(var(--category-rotate)) scale(var(--category-scale))",
                zIndex: pose.zIndex,
              };

              return (
                <article
                  key={category.name}
                  aria-hidden={Math.abs(offset) > 3}
                  className={`group absolute left-1/2 top-1/2 h-[350px] w-[min(76vw,335px)] overflow-hidden rounded-[42px] border border-white/70 bg-[#fff8df] shadow-[0_34px_90px_rgba(13,59,46,0.22)] transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [--category-scale:var(--category-scale-mobile)] [--category-x:var(--category-x-mobile)] [transform-style:preserve-3d] [will-change:transform] sm:h-[430px] sm:w-[380px] sm:[--category-scale:var(--category-scale-tablet)] sm:[--category-x:var(--category-x-tablet)] lg:h-[500px] lg:w-[430px] lg:[--category-scale:var(--category-scale-desktop)] lg:[--category-x:var(--category-x-desktop)] ${isActive ? "pointer-events-auto" : "cursor-pointer"}`}
                  style={cardStyle}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-28px_50px_rgba(13,59,46,0.08)]" />
                  <div className="pointer-events-none absolute -right-3 top-12 h-[calc(100%-96px)] w-6 rounded-r-[34px] bg-[#b88a20]/24 blur-[1px]" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,250,232,0.9),rgba(255,248,223,0.24)_48%,rgba(13,59,46,0.08))]" />

                  <div className={`relative z-10 overflow-hidden border border-white/70 bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)] ${isActive ? "mx-4 mt-4 h-[56%] rounded-[34px] sm:mx-5 sm:mt-5" : "h-full rounded-[42px]"}`}>
                    <ProductThumb image={category.image} alt={category.alt} className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,250,232,0.7),transparent_34%),linear-gradient(180deg,transparent_45%,rgba(13,59,46,0.36))]" />
                  </div>

                  {isActive ? (
                    <div className="relative z-10 flex min-h-[44%] flex-col justify-between p-5 sm:p-6">
                      <div>
                        <span className="inline-flex rounded-full border border-[#0d3b2e]/25 bg-[#fff8df]/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#315f4e] backdrop-blur">
                          Category {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display mt-3 text-[30px] font-black leading-[1.02] text-[#0d3b2e] sm:text-[42px]">{category.name}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#315f4e] sm:text-base sm:leading-7">{category.description}</p>
                      </div>
                      <a
                        href="#contact"
                        className="mt-4 inline-flex min-h-11 w-fit items-center justify-center gap-3 rounded-2xl bg-[#0d3b2e] px-5 text-sm font-extrabold text-[#fff8df] shadow-[0_18px_34px_rgba(13,59,46,0.22)] transition hover:bg-[#082f24]"
                      >
                        Ask about this
                        <Icon name="arrow" className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <div className={`pointer-events-none absolute inset-x-4 bottom-4 z-10 rounded-[26px] border border-white/65 bg-[#fff8df]/78 px-4 py-3 text-center shadow-[0_18px_36px_rgba(13,59,46,0.12)] backdrop-blur ${isSideCard ? "opacity-100" : "opacity-80"}`}>
                      <h3 className="font-display text-lg font-black leading-tight text-[#0d3b2e] sm:text-xl">{category.name}</h3>
                    </div>
                  )}

                  {!isActive ? (
                    <button
                      type="button"
                      aria-label={`Show ${category.name}`}
                      className="absolute inset-0 z-20 rounded-[42px] focus:outline-none focus:ring-4 focus:ring-[#0d3b2e]/25"
                      onClick={() => showCategory(index)}
                    />
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="relative z-20 mt-3 flex items-center justify-center gap-4 sm:mt-0">
            <button
              type="button"
              aria-label="Previous product category"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#0d3b2e]/35 bg-[#fff8df]/70 text-[#0d3b2e] shadow-[0_14px_32px_rgba(13,59,46,0.12)] backdrop-blur transition hover:bg-[#fff8df] focus:outline-none focus:ring-4 focus:ring-[#0d3b2e]/15"
              onClick={showPreviousCategory}
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>
            <div className="flex items-center gap-2" aria-label="Product category selector">
              {categories.map((category, index) => (
                <button
                  key={`category-dot-${category.name}`}
                  type="button"
                  aria-label={`Show ${category.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-[#0d3b2e]/15 ${index === activeIndex ? "w-8 bg-[#0d3b2e]" : "w-2.5 bg-[#0d3b2e]/30 hover:bg-[#0d3b2e]/55"}`}
                  onClick={() => showCategory(index)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next product category"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#0d3b2e]/35 bg-[#fff8df]/70 text-[#0d3b2e] shadow-[0_14px_32px_rgba(13,59,46,0.12)] backdrop-blur transition hover:bg-[#fff8df] focus:outline-none focus:ring-4 focus:ring-[#0d3b2e]/15"
              onClick={showNextCategory}
            >
              <Icon name="arrow" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
function FeaturedProducts() {
  return (
    <Section id="featured" className="scroll-mt-16 py-14 sm:py-20">
      <Container>
        <SectionHeading
          title="Featured Products"
          subtitle="Explore practical, premium packaging options that help customers understand your product quality before they contact you."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <FeaturedProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FeaturedProductCard({ product, index }: { product: (typeof featuredProducts)[number]; index: number }) {
  return (
    <article className="featured-product-card group relative isolate overflow-hidden rounded-[30px] border border-[#fff8df]/68 bg-[#fff8df]/28 shadow-[0_26px_70px_rgba(13,59,46,0.13)] backdrop-blur-xl md:min-h-[470px]">
      <div className="relative z-10 h-[270px] overflow-hidden md:hidden">
        <ProductThumb image={product.image} alt={product.alt} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(13,59,46,0.58))]" />
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
          <h4 className="font-display text-2xl font-black leading-tight drop-shadow-md">{product.name}</h4>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff8df]/84 text-[#0d3b2e] backdrop-blur">
            <Icon name="arrow" className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="relative z-0 flex flex-col justify-end p-6 md:absolute md:inset-0 md:p-7 md:pl-28">
        <span className="mb-4 w-fit rounded-full border border-[#0d3b2e]/35 bg-[#fff8df]/52 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#315f4e]">
          {String(index + 1).padStart(2, "0")} / {String(featuredProducts.length).padStart(2, "0")}
        </span>
        <h3 className="font-display text-3xl font-black leading-tight text-[#0d3b2e] md:text-[34px]">{product.name}</h3>
        <p className="mt-4 text-sm leading-7 text-[#315f4e] md:text-base">{product.description}</p>
        <a
          href="#contact"
          className="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-2xl bg-[#0d3b2e] px-5 text-sm font-extrabold text-[#fff8df] shadow-[0_18px_36px_rgba(13,59,46,0.22)] transition hover:bg-[#082f24]"
        >
          Ask for Details
        </a>
      </div>
      <div className="featured-product-front pointer-events-none absolute inset-0 z-10 hidden overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:block">
        <ProductThumb image={product.image} alt={product.alt} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(13,59,46,0.58))]" />
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
          <h4 className="font-display text-2xl font-black leading-tight drop-shadow-md">{product.name}</h4>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff8df]/84 text-[#0d3b2e] backdrop-blur">
            <Icon name="arrow" className="h-5 w-5" />
          </span>
        </div>
      </div>
    </article>
  );
}

function WhyChooseUs() {
  return (
    <Section id="why-us" className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={`Why Choose ${brand.name}?`} />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} className="grid overflow-hidden rounded-[28px] border border-[#b88a20]/45 bg-[#fff8df]/78 shadow-[0_24px_60px_rgba(13,59,46,0.1)] sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <motion.article key={benefit.title} variants={reveal} className="border-b border-[#b88a20]/35 p-7 text-center last:border-b-0 sm:border-r lg:border-b-0 lg:last:border-r-0">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#0d3b2e] text-[#f7d762]">
                <Icon name={benefit.icon} className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-base font-black text-[#0d3b2e]">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#315f4e]">{benefit.description}</p>
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
        <div className="grid gap-6 rounded-[32px] border border-[#b88a20]/45 bg-[#fff8df]/82 p-4 shadow-[0_28px_70px_rgba(13,59,46,0.1)] lg:grid-cols-[0.95fr_1.15fr_0.95fr] lg:p-6">
          <ProductThumb image={productImages.customPrinted} alt="Custom printed packaging set" className="min-h-[280px] rounded-[24px]" />
          <div className="flex flex-col justify-center px-3 py-5 lg:px-6">
            <h2 className="font-display text-3xl font-bold leading-tight text-[#0d3b2e] sm:text-4xl">Custom Packaging Made for Your Brand</h2>
            <p className="mt-5 text-base leading-8 text-[#315f4e]">
              Customers can request packaging in custom size, color, logo, and printing options. We help shape packaging that presents your products clearly and professionally.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {customOptions.map((option) => (
                <div key={option} className="rounded-2xl border border-[#b88a20]/45 bg-[#f7d762]/35 p-3 text-center text-xs font-extrabold text-[#0d3b2e]">
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] bg-[#0d3b2e] p-7 text-center text-[#fff8df] shadow-[0_22px_55px_rgba(13,59,46,0.28)]">
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
            <motion.div key={`${item.alt}-${index}`} variants={reveal} whileHover={{ y: -7, scale: 1.015 }} className="overflow-hidden rounded-2xl border border-[#b88a20]/45 bg-[#fff8df] shadow-[0_18px_45px_rgba(13,59,46,0.1)]">
              <ProductThumb image={item.image} alt={item.alt} className="aspect-[4/3]" />
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
          <motion.form onSubmit={handleSubmit} variants={reveal} className="rounded-[28px] border border-[#b88a20]/45 bg-[#fff8df]/88 p-6 shadow-[0_24px_60px_rgba(13,59,46,0.1)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" placeholder="Your name" />
              <Field label="Phone" placeholder="Your phone number" />
            </div>
            <Field label="Email" placeholder="Your email address" type="email" className="mt-5" />
            <label className="mt-5 block">
              <span className="text-sm font-extrabold text-[#0d3b2e]">Message</span>
              <textarea
                required
                rows={5}
                placeholder="Write your message..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#b88a20]/45 bg-[#fff8df] px-4 py-3 text-sm text-[#0d3b2e] outline-none transition placeholder:text-[#668a7c] focus:border-[#0d3b2e] focus:ring-4 focus:ring-[#0d3b2e]/10"
              />
            </label>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] bg-[#0d3b2e] px-6 py-3 text-sm font-bold text-[#fff8df] shadow-[0_18px_36px_rgba(13,59,46,0.22)] transition hover:bg-[#082f24]">
                {submitted ? "Message Ready" : "Send Message"}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
              <a href={brand.whatsapp} className="inline-flex min-h-12 items-center justify-center gap-3 rounded-[14px] border border-[#0d3b2e]/35 bg-[#f7d762]/35 px-6 py-3 text-sm font-bold text-[#0d3b2e] transition hover:bg-[#fff8df]">
                <Icon name="whatsapp" className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
            {submitted ? <p className="mt-4 rounded-2xl bg-[#f7d762]/40 px-4 py-3 text-sm font-bold text-[#0d3b2e]">Thanks. Your inquiry is ready for the {brand.name} team.</p> : null}
          </motion.form>

          <motion.aside variants={reveal} className="grid gap-5 rounded-[28px] border border-[#b88a20]/45 bg-[#fff8df]/88 p-6 shadow-[0_24px_60px_rgba(13,59,46,0.1)] sm:p-8">
            <ContactItem icon="pin" title="Business Location" text={brand.location} />
            <ContactItem icon="mail" title="Email" text={brand.email} />
            <ContactItem icon="phone" title="Phone" text={brand.phone} />
            <div className="relative mt-2 min-h-56 overflow-hidden rounded-3xl border border-[#b88a20]/45 bg-[#f7d762]/28">
              <div className="absolute inset-0 opacity-65 [background-image:linear-gradient(30deg,rgba(13,59,46,0.12)_1px,transparent_1px),linear-gradient(120deg,rgba(13,59,46,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#0d3b2e] text-[#fff8df] shadow-[0_20px_45px_rgba(13,59,46,0.28)]">
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
      <span className="text-sm font-extrabold text-[#0d3b2e]">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-2xl border border-[#b88a20]/45 bg-[#fff8df] px-4 text-sm text-[#0d3b2e] outline-none transition placeholder:text-[#668a7c] focus:border-[#0d3b2e] focus:ring-4 focus:ring-[#0d3b2e]/10"
      />
    </label>
  );
}

function ContactItem({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0d3b2e] text-[#f7d762]">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-black text-[#0d3b2e]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#315f4e]">{text}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#b88a20]/55 bg-transparent pt-12">
      <Container>
        <div className="grid gap-10 pb-10 md:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#315f4e]">High-quality packaging products for businesses that need polished presentation, reliable materials, and clear support.</p>
          </div>
          <FooterColumn title="Quick Links" items={navItems.map((item) => ({ label: item.label, href: item.href }))} />
          <FooterColumn title="Product Categories" items={categories.slice(0, 6).map((item) => ({ label: item.name, href: "#products" }))} />
          <div>
            <h3 className="font-black text-[#0d3b2e]">Contact Info</h3>
            <p className="mt-4 text-sm leading-7 text-[#315f4e]">{brand.location}</p>
            <p className="mt-3 text-sm font-bold text-[#0d3b2e]">{brand.email}</p>
            <p className="mt-2 text-sm font-bold text-[#0d3b2e]">{brand.phone}</p>
          </div>
        </div>
      </Container>
      <div className="border-t border-[#b88a20]/60 bg-transparent py-4 text-center text-xs font-bold text-[#0d3b2e]">
        (c) 2026 {brand.name}. Made for modern business packaging showcases.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-black text-[#0d3b2e]">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <a href={item.href} className="text-sm font-semibold text-[#315f4e] transition hover:text-[#0d3b2e]">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BirdPackSite() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fff1bd] text-[#0d3b2e]">
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






