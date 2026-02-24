<template>
  <div class="scroll-island-wrap" :class="{ 'is-visible': isVisible }">
    <nav class="scroll-island" :aria-label="title">
      <div class="scroll-main">
        <button
          class="island-button island-status"
          type="button"
          :aria-expanded="isOpen"
          :aria-controls="panelId"
          @click="toggleOpen"
        >
          <span class="status-dot" aria-hidden="true"></span>
          <span class="status-title">{{ title }}</span>
          <span class="status-progress">
            <NumberFlow :value="roundedProgress" />
            <span class="status-percent">%</span>
          </span>
        </button>

        <button class="island-button island-top" type="button" aria-label="Scroll to top" @click="scrollToTop">
          <ChevronUp :size="16" />
        </button>
      </div>

      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" :style="{ width: `${roundedProgress}%` }"></div>
      </div>

      <transition name="island-panel">
        <div
          v-if="isOpen"
          :id="panelId"
          class="scroll-panel"
          :style="{ '--panel-height': `${height}px` }"
          @click="onPanelClick"
        >
          <slot />
        </div>
      </transition>
    </nav>
  </div>
</template>

<script setup>
import NumberFlow from '@number-flow/vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { ChevronUp } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Scroll Island'
  },
  height: {
    type: Number,
    default: 200
  },
  scrollThreshold: {
    type: Number,
    default: 100
  }
})

const panelId = 'scroll-island-panel'
const isOpen = ref(false)

const { y } = useWindowScroll()
const { height: viewportHeight } = useWindowSize()

const maxScrollable = computed(() => {
  if (typeof document === 'undefined') return 1
  return Math.max(document.documentElement.scrollHeight - viewportHeight.value, 1)
})

const progress = computed(() => {
  const value = (y.value / maxScrollable.value) * 100
  return Math.min(Math.max(value, 0), 100)
})

const roundedProgress = computed(() => Math.round(progress.value))
const isVisible = computed(() => y.value > props.scrollThreshold)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const onPanelClick = (event) => {
  if (event.target instanceof Element && event.target.closest('a')) {
    isOpen.value = false
  }
}

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  isOpen.value = false
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scroll-island-wrap {
  position: fixed;
  left: 50%;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  transform: translate(-50%, 16px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease, transform 220ms ease;
  z-index: 35;
  width: min(92vw, 28rem);
}

.scroll-island-wrap.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
  pointer-events: auto;
}

.scroll-island {
  border-radius: 1.05rem;
  border: 1px solid var(--line, rgb(220 216 201 / 0.24));
  background:
    linear-gradient(140deg, rgb(8 12 19 / 0.92), rgb(7 11 18 / 0.88)),
    radial-gradient(circle at 12% 10%, rgb(244 201 132 / 0.1), transparent 40%);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 42px rgb(0 0 0 / 0.32);
  overflow: hidden;
}

.scroll-main {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.36rem;
}

.island-button {
  border: 0;
  font: inherit;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.island-button:focus-visible {
  outline: 2px solid rgb(128 235 217 / 0.8);
  outline-offset: 2px;
}

.island-status {
  flex: 1;
  min-height: 2.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.35rem 0.58rem;
  background: rgb(255 255 255 / 0.04);
  text-align: left;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent, #f4c984), var(--accent-cold, #80ebd9));
  box-shadow: 0 0 14px rgb(244 201 132 / 0.58);
}

.status-title {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-soft, #adb5ca);
  font-weight: 700;
}

.status-progress {
  margin-left: auto;
  display: inline-flex;
  align-items: baseline;
  gap: 0.12rem;
  color: var(--text-strong, #f6f1e3);
  font-weight: 700;
  line-height: 1;
}

.status-percent {
  font-size: 0.78rem;
  color: var(--accent, #f4c984);
}

.island-top {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.68rem;
  display: grid;
  place-items: center;
  color: var(--text-strong, #f6f1e3);
  background: rgb(255 255 255 / 0.06);
  transition: background-color 170ms ease, transform 170ms ease;
}

.island-top:hover {
  background: rgb(255 255 255 / 0.12);
  transform: translateY(-1px);
}

.progress-track {
  height: 2px;
  background: rgb(255 255 255 / 0.08);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-cold, #80ebd9), var(--accent, #f4c984));
  transition: width 160ms linear;
}

.scroll-panel {
  max-height: var(--panel-height, 200px);
  overflow: auto;
  border-top: 1px solid var(--line, rgb(220 216 201 / 0.24));
  padding: 0.52rem;
  background: rgb(255 255 255 / 0.03);
}

.island-panel-enter-active,
.island-panel-leave-active {
  transition: max-height 220ms ease, opacity 180ms ease;
}

.island-panel-enter-from,
.island-panel-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 620px) {
  .scroll-island-wrap {
    bottom: calc(0.75rem + env(safe-area-inset-bottom));
    width: min(94vw, 28rem);
  }

  .status-title {
    font-size: 0.64rem;
    letter-spacing: 0.08em;
  }
}
</style>
