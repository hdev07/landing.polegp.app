<template>
  <section
    id="pricing"
    ref="sectionRef"
    class="relative py-28 lg:py-36 overflow-hidden"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <!-- Label -->
      <div ref="labelRef" class="opacity-0 mb-16">
        <span
          class="font-heading text-[10px] tracking-[0.4em] uppercase text-white/20"
          >Planes</span
        >
      </div>

      <!-- Duel layout — asymmetric, NOT twin cards -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0">
        <!-- FREE: compact, understated -->
        <div ref="freeRef" class="opacity-0 lg:col-span-4 lg:pr-8">
          <div class="lg:sticky lg:top-32">
            <span
              class="font-heading text-xs tracking-[0.2em] uppercase text-white/25"
              >Grid</span
            >
            <div class="flex items-baseline gap-1 mt-3 mb-6">
              <span class="font-heading font-black text-4xl text-white/50"
                >$0</span
              >
              <span class="text-white/15 text-sm">/siempre</span>
            </div>
            <ul class="space-y-3">
              <li
                v-for="f in freePlan"
                :key="f"
                class="flex items-start gap-2 text-xs text-white/25"
              >
                <span class="text-white/10 mt-0.5">—</span>
                <span>{{ f }}</span>
              </li>
            </ul>
            <a
              href="#waitlist"
              class="inline-block mt-8 text-xs text-white/30 hover:text-white/50 border-b border-white/10 pb-0.5 transition-colors"
            >
              Empezar gratis →
            </a>
          </div>
        </div>

        <!-- Divider — diagonal line -->
        <div class="hidden lg:flex lg:col-span-1 items-stretch justify-center">
          <div
            class="w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
          />
        </div>

        <!-- PREMIUM: prominent, detailed -->
        <div ref="premRef" class="opacity-0 lg:col-span-7 lg:pl-8">
          <div class="glow-border rounded-2xl">
            <div class="bg-carbon-mid/80 rounded-2xl p-8 lg:p-10">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <span
                    class="font-heading text-xs tracking-[0.2em] uppercase text-gold/60"
                    >Pole Position</span
                  >
                  <div class="flex items-baseline gap-1.5 mt-2">
                    <span class="font-heading font-black text-5xl text-white"
                      >$4</span
                    >
                    <span class="text-white/30 text-lg">.99</span>
                    <span class="text-white/15 text-sm">/mes</span>
                  </div>
                  <p
                    class="text-[10px] text-white/15 mt-1 font-heading tracking-wider"
                  >
                    o $39.99/año — ahorra 33%
                  </p>
                </div>
                <span
                  class="hidden sm:block text-[8px] font-heading tracking-[0.15em] bg-gold/10 text-gold/50 border border-gold/15 px-3 py-1.5 rounded-full uppercase"
                  >Premium</span
                >
              </div>

              <!-- Features in 2 cols — NOT a simple list -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
                <div
                  v-for="f in premiumPlan"
                  :key="f.text"
                  class="flex items-start gap-2.5"
                >
                  <span class="text-f1-red/50 text-xs mt-0.5 shrink-0">{{
                    f.icon
                  }}</span>
                  <span class="text-white/40 text-sm">{{ f.text }}</span>
                </div>
              </div>

              <a
                href="#waitlist"
                class="btn-f1 mt-10 bg-f1-red text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide red-glow inline-flex items-center gap-3"
              >
                Unirme con Premium
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref<HTMLElement>();
const labelRef = ref<HTMLElement>();
const freeRef = ref<HTMLElement>();
const premRef = ref<HTMLElement>();

const freePlan = [
  "Predicciones básicas (Podio + Pole + Safety Car)",
  "Leaderboard global",
  "1 grupo privado",
  "Notificaciones por email",
];

const premiumPlan = [
  { icon: "◆", text: "Las 12 predicciones por carrera" },
  { icon: "◆", text: "Sistema Joker (x2 puntos)" },
  { icon: "◆", text: "Grupos ilimitados" },
  { icon: "◆", text: "Torneos con premios reales" },
  { icon: "◆", text: "Estadísticas avanzadas" },
  { icon: "◆", text: "Push notifications (PWA)" },
  { icon: "◆", text: "Badge exclusivo en leaderboard" },
  { icon: "◆", text: "Acceso anticipado a features" },
];

onMounted(() => {
  gsap.to(labelRef.value, {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: { trigger: sectionRef.value, start: "top 75%" },
  });
  gsap.set(freeRef.value, { y: 20 });
  gsap.to(freeRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    scrollTrigger: { trigger: freeRef.value, start: "top 80%" },
  });
  gsap.set(premRef.value, { y: 30 });
  gsap.to(premRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    scrollTrigger: { trigger: premRef.value, start: "top 80%" },
  });
});
</script>
