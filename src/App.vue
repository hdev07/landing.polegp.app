<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import StatementSection from './components/StatementSection.vue'
import BentoGrid from './components/BentoGrid.vue'
import TimingTicker from './components/TimingTicker.vue'
import DuelSection from './components/DuelSection.vue'
import WaitlistSection from './components/WaitlistSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <StatementSection />
    <BentoGrid />
    <TimingTicker />
    <DuelSection />
    <WaitlistSection />
  </main>
  <FooterSection />
</template>
