<template>
  <section
    id="waitlist"
    ref="sectionRef"
    class="relative py-28 lg:py-40 overflow-hidden"
  >
    <!-- Red ambient glow — off-center -->
    <div
      class="absolute -top-40 right-0 w-[600px] h-[400px] bg-f1-red/[0.03] rounded-full blur-[200px] pointer-events-none"
    />

    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        <!-- LEFT: Big type -->
        <div ref="textRef" class="opacity-0 lg:col-span-7">
          <span
            class="font-heading text-[10px] tracking-[0.4em] uppercase text-f1-red/50 mb-6 block"
            >Lista de espera</span
          >
          <h2
            class="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[0.9] tracking-tight"
          >
            ¿Listo para<br />
            <span class="text-f1-red">la pole?</span>
          </h2>
          <p class="text-white/25 text-sm mt-6 max-w-sm leading-relaxed">
            Acceso anticipado + 1 mes de Premium gratis. Sin spam, solo
            lanzamiento.
          </p>
        </div>

        <!-- RIGHT: Form -->
        <div ref="formRef" class="opacity-0 lg:col-span-5">
          <form @submit.prevent="handleSubmit" class="space-y-3">
            <input
              v-model="email"
              type="email"
              required
              placeholder="tu@email.com"
              class="w-full bg-carbon-mid/60 border border-white/[0.06] rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/15 focus:outline-none focus:border-f1-red/40 focus:ring-1 focus:ring-f1-red/15 transition-all"
            />
            <button
              type="submit"
              :disabled="submitted || loading"
              class="btn-f1 w-full bg-f1-red text-white py-4 rounded-xl font-bold text-sm tracking-wide red-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Registrando…</span>
              <span v-else-if="!submitted">Reservar mi lugar →</span>
              <span v-else>✓ Estás dentro</span>
            </button>
          </form>
          <p v-if="errorMsg" class="text-red-400 text-xs mt-3">
            {{ errorMsg }}
          </p>
          <p v-if="submitted && !alreadyIn" class="text-f1-red/50 text-xs mt-3">
            Posición #{{ position }} — te avisaremos cuando lancemos.
          </p>
          <p v-if="submitted && alreadyIn" class="text-white/30 text-xs mt-3">
            Ya estabas registrado. Eres #{{ position }} en la lista.
          </p>
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
const textRef = ref<HTMLElement>();
const formRef = ref<HTMLElement>();
const email = ref("");
const submitted = ref(false);
const loading = ref(false);
const position = ref(0);
const errorMsg = ref("");
const alreadyIn = ref(false);

async function handleSubmit() {
  if (!email.value || loading.value) return;
  loading.value = true;
  errorMsg.value = "";

  try {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });
    const data = await res.json();

    if (!res.ok) {
      errorMsg.value = data.error || "Algo salió mal, intenta de nuevo.";
      return;
    }

    submitted.value = true;
    position.value = data.position;
    alreadyIn.value = !!data.alreadyRegistered;
  } catch {
    errorMsg.value = "No se pudo conectar. Intenta más tarde.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  gsap.set(textRef.value, { y: 30 });
  gsap.to(textRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    scrollTrigger: { trigger: sectionRef.value, start: "top 75%" },
  });
  gsap.set(formRef.value, { y: 20 });
  gsap.to(formRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    delay: 0.15,
    scrollTrigger: { trigger: sectionRef.value, start: "top 75%" },
  });
});
</script>
