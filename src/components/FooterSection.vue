<template>
  <footer class="border-t border-white/[0.04]">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-f1-red rounded flex items-center justify-center font-heading font-black text-white text-[8px]">P</div>
        <span class="font-heading text-xs tracking-[0.15em] text-white/30">POLE<span class="text-f1-red/50">GP</span></span>
      </div>
      <div class="flex items-center gap-6">
        <a href="#" class="text-[11px] text-white/15 hover:text-white/30 transition-colors">Términos</a>
        <a href="#" class="text-[11px] text-white/15 hover:text-white/30 transition-colors">Privacidad</a>
        <span class="text-[11px] text-white/10">© {{ currentYear }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
