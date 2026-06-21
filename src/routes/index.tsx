import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ornament from "@/assets/gold-ornament.png";
import envelopeImg from "@/assets/envelope.jpg";
import petalsImg from "@/assets/petals.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Puberty Ceremony — K. Madesh & R. Prema" },
      { name: "description", content: "You are cordially invited to the Puberty Ceremony on 28 June 2026, 11:30 AM at GN Conventional Hall, Denkanikottai." },
      { property: "og:title", content: "Puberty Ceremony — 28 June 2026" },
      { property: "og:description", content: "With love, K. Madesh & R. Prema invite you to celebrate this special occasion." },
    ],
  }),
  component: Invitation,
});

const TARGET = new Date("2026-06-28T11:30:00+05:30").getTime();
const VENUE_QUERY = "GN Conventional Hall, Denkanikottai";

function useCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 18 + Math.random() * 28,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 8,
        rotate: Math.random() * 360,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-petal absolute -top-10 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
            background: `radial-gradient(circle at 30% 30%, oklch(0.85 0.12 10) 0%, oklch(0.72 0.13 5) 60%, transparent 70%)`,
            clipPath: "ellipse(45% 50% at 50% 50%)",
            opacity: 0.75,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
          }}
        />
      ))}
    </div>
  );
}

function Ornament({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <img
      src={ornament}
      alt=""
      aria-hidden
      loading="lazy"
      className={`pointer-events-none select-none opacity-80 ${flip ? "scale-x-[-1]" : ""} ${className}`}
    />
  );
}

function SectionHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mb-8 sm:mb-12 text-center">
      {kicker && (
        <p className="font-script text-xl sm:text-3xl md:text-4xl text-[var(--rose)]">{kicker}</p>
      )}
      <h2 className="mt-1 sm:mt-2 font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-deep">
        <span className="text-gradient-gold">{title}</span>
      </h2>
      <div className="mx-auto mt-3 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
        <span className="h-px w-10 sm:w-16 bg-gold/60" />
        <span className="text-gold">❖</span>
        <span className="h-px w-10 sm:w-16 bg-gold/60" />
      </div>
    </div>
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const c = useCountdown();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ivory text-foreground">
      {opened && <Petals />}

      {/* ============ HERO / ENVELOPE ============ */}
      <section
        className="relative flex min-h-screen items-center justify-center px-3 py-8 sm:px-4 sm:py-16"
        style={{ background: "var(--gradient-emerald)" }}
      >
        {/* gold corner ornaments - hidden on mobile */}
        <Ornament className="absolute -left-20 -top-20 w-48 md:w-72 lg:w-96 hidden sm:block" />
        <Ornament className="absolute -right-20 -top-20 w-48 md:w-72 lg:w-96 hidden sm:block" flip />
        <Ornament className="absolute -bottom-24 -left-20 w-48 md:w-72 lg:w-96 hidden sm:block rotate-180" />
        <Ornament className="absolute -bottom-24 -right-20 w-48 md:w-72 lg:w-96 hidden sm:block rotate-180" flip />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          {!opened ? (
            <div className="animate-fade-up flex flex-col items-center gap-4 sm:gap-8">
              <p className="font-script text-2xl sm:text-4xl md:text-5xl text-gold-soft">Madesh & Prema</p>
              <div className="relative">
                <img
                  src={envelopeImg}
                  alt="Wedding invitation envelope"
                  width={520}
                  height={520}
                  className="mx-auto w-56 sm:w-72 md:w-96 rounded-lg shadow-[var(--shadow-elegant)]"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-gold/40" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h1 className="font-display text-lg sm:text-2xl md:text-4xl uppercase tracking-[0.3em] sm:tracking-[0.4em] text-gold">
                  <span className="shimmer">Touch to Open</span>
                </h1>
                <p className="font-serif text-sm sm:text-base italic text-gold-soft/80">Tap to unveil the invitation</p>
              </div>
              <button
                onClick={() => setOpened(true)}
                className="animate-float-tap animate-glow group relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[oklch(0.6_0.13_70)] text-2xl sm:text-3xl text-emerald-darker shadow-[var(--shadow-gold)] transition hover:scale-110 active:scale-95"
                aria-label="Open invitation"
              >
                <span className="absolute inset-1 rounded-full ring-2 ring-emerald-darker/30" />
                ♥
              </button>
              <p className="text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold-soft/70">👆 Tap the heart</p>
            </div>
          ) : (
            <div
              key="opened"
              className="animate-fade-up rounded-2xl border border-gold/50 bg-ivory/95 p-5 sm:p-8 md:p-12 shadow-[var(--shadow-elegant)]"
              style={{ animationDuration: "1.2s" }}
            >
              <div className="mx-auto mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-gold">✦</span>
                <p className="font-script text-xl sm:text-3xl text-[var(--rose)]">Shubh Aashirwad</p>
                <span className="text-gold">✦</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-emerald-deep">🌸</p>
              <h1 className="my-2 sm:my-3 font-display text-2xl sm:text-3xl md:text-5xl uppercase tracking-[0.15em] sm:tracking-[0.18em] text-emerald-deep">
                Puberty<br />Ceremony
              </h1>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-emerald-deep">🌸</p>
              <div className="my-4 sm:my-6 flex items-center justify-center gap-2 sm:gap-3">
                <span className="h-px w-8 sm:w-12 bg-gold" />
                <span className="text-gold">❖</span>
                <span className="h-px w-8 sm:w-12 bg-gold" />
              </div>
              <p className="font-script text-xl sm:text-3xl md:text-4xl text-[var(--rose)]">You are cordially invited</p>
              <p className="mx-auto mt-4 sm:mt-6 max-w-md font-serif text-base sm:text-lg italic leading-relaxed text-foreground/80">
                With immense joy and happiness, we warmly invite you to join us for the Puberty Ceremony.
              </p>
              <a
                href="#details"
                className="mt-6 sm:mt-8 inline-block rounded-full border border-gold bg-emerald-deep px-6 sm:px-8 py-2.5 sm:py-3 font-display text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold-soft transition hover:bg-emerald-darker hover:shadow-[var(--shadow-gold)] active:scale-95"
              >
                View Details ↓
              </a>
            </div>
          )}
        </div>
      </section>

      {opened && (
        <>
          {/* ============ EVENT DETAILS ============ */}
          <section id="details" className="relative px-3 py-12 sm:px-4 sm:py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-5xl">
              <SectionHeading kicker="The Celebration" title="Event Details" />
              <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
                {[
                  { icon: "📅", label: "Date", value: "28 June 2026", sub: "Sunday" },
                  { icon: "🕒", label: "Time", value: "11:30 AM", sub: "onwards" },
                  { icon: "📍", label: "Venue", value: "GN Conventional Hall", sub: "Denkanikottai" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="ornate-border group relative rounded-lg bg-card p-4 sm:p-8 text-center transition hover:shadow-[var(--shadow-gold)]"
                  >
                    <div className="mx-auto mb-2 sm:mb-3 text-3xl sm:text-4xl">{d.icon}</div>
                    <p className="font-display text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">{d.label}</p>
                    <p className="mt-2 sm:mt-3 font-serif text-xl sm:text-2xl text-emerald-deep">{d.value}</p>
                    <p className="font-serif text-xs sm:text-sm italic text-muted-foreground">{d.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ FAMILY INVITATION ============ */}
          <section
            className="relative px-3 py-12 sm:px-4 sm:py-24 text-ivory"
            style={{ background: "var(--gradient-emerald)" }}
          >
            <Ornament className="absolute left-1/2 top-3 sm:top-6 w-20 sm:w-32 -translate-x-1/2" />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="font-script text-2xl sm:text-4xl md:text-5xl text-gold-soft">Our Heartfelt Invitation</p>
              <div className="mx-auto my-4 sm:my-6 flex items-center justify-center gap-2 sm:gap-3">
                <span className="h-px w-10 sm:w-16 bg-gold/60" />
                <span className="text-gold">❖</span>
                <span className="h-px w-10 sm:w-16 bg-gold/60" />
              </div>
              <p className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed">
                With immense joy and happiness, we warmly invite you to join us for the Puberty Ceremony.
              </p>
              <p className="mt-4 sm:mt-6 font-serif text-sm sm:text-lg italic leading-relaxed text-gold-soft/90">
                Your presence and blessings will make this special occasion truly memorable.
              </p>
            </div>
          </section>

          {/* ============ COUNTDOWN ============ */}
          <section className="relative px-3 py-12 sm:px-4 sm:py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-4xl">
              <SectionHeading kicker="Counting the moments" title="Until We Celebrate" />
              <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-4">
                {[
                  { l: "Days", v: c.days },
                  { l: "Hours", v: c.hours },
                  { l: "Minutes", v: c.minutes },
                  { l: "Seconds", v: c.seconds },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="relative rounded-lg border border-gold/40 bg-emerald-deep py-4 sm:py-8 text-center shadow-[var(--shadow-elegant)]"
                    style={{ backgroundColor: "var(--emerald-deep)" }}
                  >
                    <div className="absolute inset-2 rounded-md border border-gold/30" />
                    <p className="font-display text-3xl sm:text-5xl md:text-6xl text-gold">
                      {String(t.v).padStart(2, "0")}
                    </p>
                    <p className="mt-1 sm:mt-2 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-soft/80">
                      {t.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ VENUE / MAP ============ */}
          <section className="relative px-3 py-12 sm:px-4 sm:py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-5xl">
              <SectionHeading kicker="Find your way" title="The Venue" />
              <div className="overflow-hidden rounded-lg border border-gold/40 shadow-[var(--shadow-elegant)]">
                <iframe
                  title="Venue location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`}
                  className="h-60 sm:h-80 md:h-96 w-full"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3">
                <a
                  className="rounded-full border border-gold bg-emerald-deep px-4 sm:px-6 py-2.5 sm:py-3 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gold-soft transition hover:shadow-[var(--shadow-gold)] active:scale-95"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_QUERY)}`}
                  target="_blank" rel="noreferrer"
                >Get Directions</a>
                <a
                  className="rounded-full border border-emerald-deep bg-gold px-4 sm:px-6 py-2.5 sm:py-3 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-emerald-darker transition hover:shadow-[var(--shadow-gold)] active:scale-95"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`}
                  target="_blank" rel="noreferrer"
                >Open in Maps</a>
                <button
                  className="rounded-full border border-[var(--rose)] bg-card px-4 sm:px-6 py-2.5 sm:py-3 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--rose)] transition hover:shadow-[var(--shadow-gold)] active:scale-95"
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`;
                    if (navigator.share) navigator.share({ title: "Venue", url }).catch(() => {});
                    else navigator.clipboard?.writeText(url);
                  }}
                >Share Location</button>
              </div>
            </div>
          </section>

          {/* ============ FOOTER ============ */}
          <footer
            className="relative px-3 py-12 sm:px-4 sm:py-20 text-center text-ivory"
            style={{ background: "var(--gradient-emerald)" }}
          >
            <Ornament className="absolute left-1/2 top-3 sm:top-6 w-20 sm:w-32 -translate-x-1/2" />
            <p className="font-script text-2xl sm:text-4xl md:text-5xl text-gold-soft">With Love</p>
            <h3 className="mt-3 sm:mt-4 font-display text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gold">
              K. Madesh &amp; R. Prema
            </h3>
            <div className="mx-auto my-4 sm:my-6 flex items-center justify-center gap-2 sm:gap-3">
              <span className="h-px w-10 sm:w-16 bg-gold/60" />
              <span className="text-gold">❖</span>
              <span className="h-px w-10 sm:w-16 bg-gold/60" />
            </div>
            <p className="font-serif text-sm sm:text-base italic text-gold-soft/90">
              Thank you for being part of our celebration.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold-soft/60">🌸 28 · 06 · 2026 🌸</p>
          </footer>
        </>
      )}
    </div>
  );
}



function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.3em] text-emerald-deep">{label}</span>
      {children}
    </label>
  );
}

