import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import ornament from "@/assets/gold-ornament.png";
import envelopeImg from "@/assets/envelope.jpg";
import petalsImg from "@/assets/petals.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Half Saree Ceremony — K. Madesh & K. Prema" },
      { name: "description", content: "You are cordially invited to the Half Saree Ceremony on 28 June 2026, 11:30 AM at GN Conventional Hall, Denkanikottai." },
      { property: "og:title", content: "Half Saree Ceremony — 28 June 2026" },
      { property: "og:description", content: "With love, K. Madesh & K. Prema invite you to celebrate this special occasion." },
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
    <div className="mb-12 text-center">
      {kicker && (
        <p className="font-script text-3xl text-[var(--rose)] md:text-4xl">{kicker}</p>
      )}
      <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.25em] text-emerald-deep md:text-4xl">
        <span className="text-gradient-gold">{title}</span>
      </h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-3">
        <span className="h-px w-16 bg-gold/60" />
        <span className="text-gold">❖</span>
        <span className="h-px w-16 bg-gold/60" />
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
        className="relative flex min-h-screen items-center justify-center px-4 py-16"
        style={{ background: "var(--gradient-emerald)" }}
      >
        {/* gold corner ornaments */}
        <Ornament className="absolute -left-20 -top-20 w-72 md:w-96" />
        <Ornament className="absolute -right-20 -top-20 w-72 md:w-96" flip />
        <Ornament className="absolute -bottom-24 -left-20 w-72 md:w-96 rotate-180" />
        <Ornament className="absolute -bottom-24 -right-20 w-72 md:w-96 rotate-180" flip />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          {!opened ? (
            <div className="animate-fade-up flex flex-col items-center gap-8">
              <p className="font-script text-4xl text-gold-soft md:text-5xl">Madesh & Prema</p>
              <div className="relative">
                <img
                  src={envelopeImg}
                  alt="Wedding invitation envelope"
                  width={520}
                  height={520}
                  className="mx-auto w-72 rounded-lg shadow-[var(--shadow-elegant)] md:w-96"
                />
                <div className="absolute inset-0 rounded-lg ring-1 ring-gold/40" />
              </div>
              <div className="space-y-2">
                <h1 className="font-display text-2xl uppercase tracking-[0.4em] text-gold md:text-4xl">
                  <span className="shimmer">Touch to Open</span>
                </h1>
                <p className="font-serif italic text-gold-soft/80">Tap to unveil the invitation</p>
              </div>
              <button
                onClick={() => setOpened(true)}
                className="animate-float-tap animate-glow group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[oklch(0.6_0.13_70)] text-3xl text-emerald-darker shadow-[var(--shadow-gold)] transition hover:scale-110"
                aria-label="Open invitation"
              >
                <span className="absolute inset-1 rounded-full ring-2 ring-emerald-darker/30" />
                ♥
              </button>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-soft/70">👆 Tap the heart</p>
            </div>
          ) : (
            <div
              key="opened"
              className="animate-fade-up rounded-2xl border border-gold/50 bg-ivory/95 p-8 shadow-[var(--shadow-elegant)] md:p-12"
              style={{ animationDuration: "1.2s" }}
            >
              <div className="mx-auto mb-6 flex items-center justify-center gap-3">
                <span className="text-gold">✦</span>
                <p className="font-script text-3xl text-[var(--rose)]">Shubh Aashirwad</p>
                <span className="text-gold">✦</span>
              </div>
              <p className="font-serif text-2xl text-emerald-deep md:text-3xl">🌸</p>
              <h1 className="my-3 font-display text-3xl uppercase tracking-[0.18em] text-emerald-deep md:text-5xl">
                Half Saree<br />Ceremony
              </h1>
              <p className="font-serif text-2xl text-emerald-deep md:text-3xl">🌸</p>
              <div className="my-6 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gold" />
                <span className="text-gold">❖</span>
                <span className="h-px w-12 bg-gold" />
              </div>
              <p className="font-script text-3xl text-[var(--rose)] md:text-4xl">You are cordially invited</p>
              <p className="mx-auto mt-6 max-w-md font-serif text-lg italic leading-relaxed text-foreground/80">
                With immense joy and happiness, we warmly invite you to join us for the Half Saree Ceremony.
              </p>
              <a
                href="#details"
                className="mt-8 inline-block rounded-full border border-gold bg-emerald-deep px-8 py-3 font-display text-xs uppercase tracking-[0.3em] text-gold-soft transition hover:bg-emerald-darker hover:shadow-[var(--shadow-gold)]"
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
          <section id="details" className="relative px-4 py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-5xl">
              <SectionHeading kicker="The Celebration" title="Event Details" />
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { icon: "📅", label: "Date", value: "28 June 2026", sub: "Sunday" },
                  { icon: "🕒", label: "Time", value: "11:30 AM", sub: "onwards" },
                  { icon: "📍", label: "Venue", value: "GN Conventional Hall", sub: "Denkanikottai" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="ornate-border group relative rounded-lg bg-card p-8 text-center transition hover:shadow-[var(--shadow-gold)]"
                  >
                    <div className="mx-auto mb-3 text-4xl">{d.icon}</div>
                    <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">{d.label}</p>
                    <p className="mt-3 font-serif text-2xl text-emerald-deep">{d.value}</p>
                    <p className="font-serif italic text-muted-foreground">{d.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ FAMILY INVITATION ============ */}
          <section
            className="relative px-4 py-24 text-ivory"
            style={{ background: "var(--gradient-emerald)" }}
          >
            <Ornament className="absolute left-1/2 top-6 w-32 -translate-x-1/2" />
            <div className="relative mx-auto max-w-3xl text-center">
              <p className="font-script text-4xl text-gold-soft md:text-5xl">Our Heartfelt Invitation</p>
              <div className="mx-auto my-6 flex items-center justify-center gap-3">
                <span className="h-px w-16 bg-gold/60" />
                <span className="text-gold">❖</span>
                <span className="h-px w-16 bg-gold/60" />
              </div>
              <p className="font-serif text-xl italic leading-relaxed md:text-2xl">
                With immense joy and happiness, we warmly invite you to join us for the Half Saree Ceremony.
              </p>
              <p className="mt-6 font-serif text-lg italic leading-relaxed text-gold-soft/90">
                Your presence and blessings will make this special occasion truly memorable.
              </p>
            </div>
          </section>

          {/* ============ COUNTDOWN ============ */}
          <section className="relative px-4 py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-4xl">
              <SectionHeading kicker="Counting the moments" title="Until We Celebrate" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { l: "Days", v: c.days },
                  { l: "Hours", v: c.hours },
                  { l: "Minutes", v: c.minutes },
                  { l: "Seconds", v: c.seconds },
                ].map((t) => (
                  <div
                    key={t.l}
                    className="relative rounded-lg border border-gold/40 bg-emerald-deep py-8 text-center shadow-[var(--shadow-elegant)]"
                    style={{ backgroundColor: "var(--emerald-deep)" }}
                  >
                    <div className="absolute inset-2 rounded-md border border-gold/30" />
                    <p className="font-display text-5xl text-gold md:text-6xl">
                      {String(t.v).padStart(2, "0")}
                    </p>
                    <p className="mt-2 font-display text-xs uppercase tracking-[0.3em] text-gold-soft/80">
                      {t.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============ VENUE / MAP ============ */}
          <section className="relative px-4 py-24" style={{ backgroundColor: "var(--ivory)" }}>
            <div className="mx-auto max-w-5xl">
              <SectionHeading kicker="Find your way" title="The Venue" />
              <div className="overflow-hidden rounded-lg border border-gold/40 shadow-[var(--shadow-elegant)]">
                <iframe
                  title="Venue location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(VENUE_QUERY)}&output=embed`}
                  className="h-80 w-full md:h-96"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  className="rounded-full border border-gold bg-emerald-deep px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-gold-soft transition hover:shadow-[var(--shadow-gold)]"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_QUERY)}`}
                  target="_blank" rel="noreferrer"
                >Get Directions</a>
                <a
                  className="rounded-full border border-emerald-deep bg-gold px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-emerald-darker transition hover:shadow-[var(--shadow-gold)]"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`}
                  target="_blank" rel="noreferrer"
                >Open in Maps</a>
                <button
                  className="rounded-full border border-[var(--rose)] bg-card px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-[var(--rose)] transition hover:shadow-[var(--shadow-gold)]"
                  onClick={() => {
                    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_QUERY)}`;
                    if (navigator.share) navigator.share({ title: "Venue", url }).catch(() => {});
                    else navigator.clipboard?.writeText(url);
                  }}
                >Share Location</button>
              </div>
            </div>
          </section>

          {/* ============ GALLERY ============ */}
          <Gallery />

          {/* ============ RSVP ============ */}
          <RSVP />

          {/* ============ BLESSINGS ============ */}
          <Blessings />

          {/* ============ FOOTER ============ */}
          <footer
            className="relative px-4 py-20 text-center text-ivory"
            style={{ background: "var(--gradient-emerald)" }}
          >
            <Ornament className="absolute left-1/2 top-6 w-32 -translate-x-1/2" />
            <p className="font-script text-4xl text-gold-soft md:text-5xl">With Love</p>
            <h3 className="mt-4 font-display text-2xl uppercase tracking-[0.3em] text-gold md:text-3xl">
              K. Madesh &amp; K. Prema
            </h3>
            <div className="mx-auto my-6 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-gold/60" />
              <span className="text-gold">❖</span>
              <span className="h-px w-16 bg-gold/60" />
            </div>
            <p className="font-serif italic text-gold-soft/90">
              Thank you for being part of our celebration.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold-soft/60">🌸 28 · 06 · 2026 🌸</p>
          </footer>
        </>
      )}
    </div>
  );
}

/* ============== GALLERY ============== */
function Gallery() {
  const items = [
    { h: 320, t: "Childhood Memories" },
    { h: 420, t: "Family Moments" },
    { h: 280, t: "Joyful Times" },
    { h: 380, t: "Cherished Days" },
    { h: 340, t: "Growing Up" },
    { h: 300, t: "Celebrations" },
  ];
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <section className="relative px-4 py-24" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Memories" title="Our Gallery" />
        <div className="columns-2 gap-4 md:columns-3">
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="group mb-4 block w-full overflow-hidden rounded-lg border border-gold/40 shadow-md transition hover:shadow-[var(--shadow-gold)]"
            >
              <div
                className="relative flex items-end justify-center bg-gradient-to-br from-emerald-deep to-[oklch(0.45_0.08_160)] p-6 text-ivory transition group-hover:scale-105"
                style={{ height: it.h, backgroundColor: "var(--emerald-deep)" }}
              >
                <div className="absolute inset-3 rounded-md border border-gold/40" />
                <img src={petalsImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
                <span className="relative z-10 font-script text-2xl text-gold-soft">{it.t}</span>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-sm italic text-muted-foreground">
          Add your treasured photographs here.
        </p>
      </div>
      {lightbox !== null && (
        <button
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-darker/95 p-8 backdrop-blur"
        >
          <div className="ornate-border max-w-2xl rounded-lg bg-ivory p-12 text-center">
            <p className="font-script text-4xl text-[var(--rose)]">{items[lightbox].t}</p>
            <p className="mt-4 font-serif italic text-muted-foreground">Photo placeholder</p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">Tap anywhere to close</p>
          </div>
        </button>
      )}
    </section>
  );
}

/* ============== RSVP ============== */
function RSVP() {
  const [form, setForm] = useState({ name: "", phone: "", guests: "1", attend: "yes" });
  const [sent, setSent] = useState(false);
  return (
    <section
      className="relative px-4 py-24 text-ivory"
      style={{ background: "var(--gradient-emerald)" }}
    >
      <Ornament className="absolute left-1/2 top-6 w-32 -translate-x-1/2" />
      <div className="relative mx-auto max-w-xl">
        <div className="text-center">
          <p className="font-script text-4xl text-gold-soft md:text-5xl">Kindly Respond</p>
          <h2 className="mt-2 font-display text-3xl uppercase tracking-[0.25em] text-gold md:text-4xl">
            <span className="shimmer">RSVP</span>
          </h2>
          <div className="mx-auto my-4 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gold/60" />
            <span className="text-gold">❖</span>
            <span className="h-px w-16 bg-gold/60" />
          </div>
        </div>
        {sent ? (
          <div className="ornate-border rounded-lg bg-ivory p-10 text-center text-foreground">
            <p className="text-5xl">🙏</p>
            <p className="mt-4 font-script text-3xl text-[var(--rose)]">Thank you!</p>
            <p className="mt-2 font-serif italic text-muted-foreground">
              Your response has been recorded. We look forward to celebrating with you.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-4 rounded-lg border border-gold/40 bg-ivory/95 p-8 text-foreground shadow-[var(--shadow-elegant)]"
          >
            <Field label="Your Name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-gold/40 bg-card px-4 py-3 font-serif outline-none focus:border-gold focus:ring-2 focus:ring-gold/40" />
            </Field>
            <Field label="Mobile Number">
              <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md border border-gold/40 bg-card px-4 py-3 font-serif outline-none focus:border-gold focus:ring-2 focus:ring-gold/40" />
            </Field>
            <Field label="Number of Guests">
              <input required type="number" min={1} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                className="w-full rounded-md border border-gold/40 bg-card px-4 py-3 font-serif outline-none focus:border-gold focus:ring-2 focus:ring-gold/40" />
            </Field>
            <Field label="Will you attend?">
              <div className="flex gap-3">
                {[
                  { v: "yes", l: "Attending 🌸" },
                  { v: "no", l: "Unable to attend" },
                ].map((o) => (
                  <button type="button" key={o.v}
                    onClick={() => setForm({ ...form, attend: o.v })}
                    className={`flex-1 rounded-md border px-4 py-3 font-display text-xs uppercase tracking-[0.2em] transition ${
                      form.attend === o.v
                        ? "border-gold bg-emerald-deep text-gold-soft shadow-[var(--shadow-gold)]"
                        : "border-gold/40 bg-card text-foreground hover:border-gold"
                    }`}
                  >{o.l}</button>
                ))}
              </div>
            </Field>
            <button type="submit" className="w-full rounded-full border border-gold bg-emerald-deep py-4 font-display text-sm uppercase tracking-[0.3em] text-gold-soft transition hover:shadow-[var(--shadow-gold)]">
              Send Blessings 🙏
            </button>
          </form>
        )}
      </div>
    </section>
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

/* ============== BLESSINGS ============== */
type Wish = { name: string; message: string };
function Blessings() {
  const [wishes, setWishes] = useState<Wish[]>([
    { name: "Lakshmi Aunty", message: "May this beautiful day bring endless joy and prosperity to your life." },
    { name: "Ravi & Family", message: "Heartfelt wishes on this auspicious occasion. Stay blessed always! 🌸" },
    { name: "Priya", message: "Congratulations! Wishing you a bright and beautiful journey ahead." },
  ]);
  const [form, setForm] = useState({ name: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setWishes([{ name: form.name, message: form.message }, ...wishes]);
    setForm({ name: "", message: "" });
  };
  return (
    <section className="relative px-4 py-24" style={{ backgroundColor: "var(--ivory)" }}>
      <div className="mx-auto max-w-5xl">
        <SectionHeading kicker="Shower us with love" title="Blessings & Wishes" />

        <form onSubmit={submit} className="mx-auto mb-12 grid max-w-2xl gap-3 rounded-lg border border-gold/40 bg-card p-6 shadow-md md:grid-cols-3">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-md border border-gold/40 bg-ivory px-4 py-3 font-serif outline-none focus:border-gold md:col-span-1"
          />
          <input
            placeholder="Your blessing message…"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="rounded-md border border-gold/40 bg-ivory px-4 py-3 font-serif outline-none focus:border-gold md:col-span-2"
          />
          <button className="rounded-full border border-gold bg-emerald-deep px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-gold-soft transition hover:shadow-[var(--shadow-gold)] md:col-span-3">
            Submit Blessings ✿
          </button>
        </form>

        <div className="grid gap-5 md:grid-cols-3">
          {wishes.map((w, i) => (
            <div
              key={i}
              className="ornate-border relative rounded-lg bg-card p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]"
            >
              <div className="mb-3 text-3xl text-gold">❝</div>
              <p className="font-serif italic leading-relaxed text-foreground/85">{w.message}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gold/40" />
                <p className="font-script text-2xl text-[var(--rose)]">{w.name}</p>
                <span className="h-px flex-1 bg-gold/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
