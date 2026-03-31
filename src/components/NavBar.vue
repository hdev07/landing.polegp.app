<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-carbon/85 backdrop-blur-xl border-b border-white/[0.04]' : 'bg-transparent'"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div class="flex items-center justify-between h-14 lg:h-16">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2.5 group">
          <div class="w-7 h-7 bg-f1-red rounded flex items-center justify-center font-heading font-black text-white text-[10px] transition-transform group-hover:scale-110">
            P
          </div>
          <span class="font-heading font-bold text-sm tracking-[0.15em] text-white/80">
            POLE<span class="text-f1-red">GP</span>
          </span>
        </a>

        <!-- Minimal nav -->
        <div class="flex items-center gap-6">
          <a href="#features" class="hidden sm:inline text-[11px] text-white/25 hover:text-white/50 transition-colors tracking-wider uppercase font-heading">Features</a>
          <a href="#pricing" class="hidden sm:inline text-[11px] text-white/25 hover:text-white/50 transition-colors tracking-wider uppercase font-heading">Pricing</a>
          <a href="#waitlist" class="btn-f1 bg-f1-red text-white px-4 py-2 rounded-lg font-semibold text-xs tracking-wide">
            Waitlist
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

function onScroll() { scrolled.value = window.scrollY > 50 }

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
