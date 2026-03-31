<template>
  <section class="relative py-10 overflow-hidden border-y border-white/[0.03]">
    <!-- Row 1: left to right -->
    <div class="relative">
      <div class="flex whitespace-nowrap" style="animation: marquee-left 35s linear infinite">
        <div class="flex items-center gap-12 px-6" v-for="copy in 2" :key="'a'+copy">
          <span v-for="item in row1" :key="item.key+copy"
            class="inline-flex items-center gap-3 py-3"
          >
            <span class="font-heading font-bold text-sm tabular-nums" :class="item.color">{{ item.value }}</span>
            <span class="text-[10px] text-white/15 tracking-wider uppercase font-heading">{{ item.label }}</span>
            <span class="text-white/[0.06] mx-3">—</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Row 2: right to left -->
    <div class="relative mt-1">
      <div class="flex whitespace-nowrap" style="animation: marquee-right 40s linear infinite">
        <div class="flex items-center gap-12 px-6" v-for="copy in 2" :key="'b'+copy">
          <span v-for="item in row2" :key="item.key+copy"
            class="inline-flex items-center gap-3 py-3"
          >
            <span class="font-heading font-bold text-sm tabular-nums" :class="item.color">{{ item.value }}</span>
            <span class="text-[10px] text-white/15 tracking-wider uppercase font-heading">{{ item.label }}</span>
            <span class="text-white/[0.06] mx-3">—</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const row1 = [
  { key: 'p', value: '12', label: 'Predicciones por carrera', color: 'text-f1-red' },
  { key: 'r', value: '24', label: 'Grandes Premios', color: 'text-white/40' },
  { key: 's', value: '100+', label: 'Puntos posibles', color: 'text-gold/60' },
  { key: 'j', value: 'x2', label: 'Bonus Joker', color: 'text-speed-blue/60' },
  { key: 'c', value: 'x3', label: 'Max catch-up', color: 'text-sector-green/60' },
  { key: 'g', value: '∞', label: 'Grupos', color: 'text-white/30' },
]

const row2 = [
  { key: 'pw', value: 'PWA', label: 'Instala sin App Store', color: 'text-white/30' },
  { key: 'lr', value: 'LIVE', label: 'Rankings en tiempo real', color: 'text-f1-red/60' },
  { key: 'sp', value: '6', label: 'Sprint weekends', color: 'text-white/30' },
  { key: 'tm', value: '$$$', label: 'Torneos con premios', color: 'text-gold/40' },
  { key: 'nt', value: 'PUSH', label: 'Notificaciones smart', color: 'text-white/25' },
  { key: 'st', value: '288', label: 'Predicciones por temporada', color: 'text-sector-purple/50' },
]
</script>
