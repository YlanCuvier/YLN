<template>
  <div id="top" class="portfolio">
    <div class="grid-backdrop" aria-hidden="true">
      <InteractiveGridPattern
        class="grid-backdrop-pattern"
        :hue="34"
        :saturation="0.42"
        :brightness="0.86"
        :speed="0.36"
      />
    </div>

    <div class="grain" aria-hidden="true"></div>

    <header class="topbar reveal delay-1">
      <a class="wordmark" href="#top">YLAN CUVIER</a>
      <nav class="nav" aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#journey">Journey</a>
        <a href="#stack">Stack</a>
        <a href="#connect">Connect</a>
      </nav>
    </header>

    <main class="page">
      <section class="hero reveal delay-2" aria-labelledby="hero-title">
        <div class="shader-layer" aria-hidden="true">
          <ShaderToy
            :shader-code="shaderCode"
            :hue="24"
            :saturation="0.62"
            :brightness="1.16"
            :speed="0.72"
          />
          <div class="hero-fade"></div>
        </div>

        <div class="hero-body">
          <p class="kicker">Paris-based developer · Epitech · Freelance</p>
          <h1 id="hero-title">I ship fast, usable software with sharp product thinking.</h1>
          <p class="hero-copy">
            Fullstack developer focused on high-impact web and mobile systems, automation workflows,
            and real-time technical architecture.
          </p>

          <div class="hero-actions">
            <a class="cta cta-primary" href="https://github.com/YlanCuvier" target="_blank" rel="noreferrer">
              View GitHub
            </a>
            <a class="cta cta-secondary" href="https://linkedin.com/in/ylan-cuvier" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a class="cta cta-secondary" href="mailto:ylan.cuvier@epitech.eu">Email</a>
          </div>

          <div class="signal-grid">
            <article v-for="signal in signals" :key="signal.label" class="signal-card">
              <p class="signal-value">{{ signal.value }}</p>
              <p class="signal-label">{{ signal.label }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="work" class="panel reveal delay-3" aria-labelledby="work-title">
        <div class="panel-head">
          <p class="kicker">Selected Builds</p>
          <h2 id="work-title">Projects built with real constraints and real users</h2>
        </div>

        <div class="project-grid">
          <article
            v-for="(project, index) in projects"
            :key="project.name"
            class="project-card"
            :class="{ feature: index === 0 }"
          >
            <p class="project-type">{{ project.type }}</p>
            <h3>{{ project.name }}</h3>
            <p class="project-summary">{{ project.summary }}</p>
            <ul class="project-points">
              <li v-for="point in project.points" :key="point">{{ point }}</li>
            </ul>
            <p class="stack-line">
              <span>Stack</span>
              {{ project.stack }}
            </p>
          </article>
        </div>
      </section>

      <section id="journey" class="columns reveal delay-4" aria-label="Experience and stack">
        <article class="panel timeline-card">
          <div class="panel-head">
            <p class="kicker">Journey</p>
            <h2>Execution timeline</h2>
          </div>

          <div class="timeline">
            <article v-for="step in timeline" :key="step.title" class="timeline-item">
              <p class="timeline-date">{{ step.period }}</p>
              <h3>{{ step.title }}</h3>
              <p class="timeline-meta">{{ step.location }}</p>
              <p class="timeline-summary">{{ step.summary }}</p>
            </article>
          </div>
        </article>

        <article id="stack" class="panel stack-card">
          <AnimatedBackground class="stack-glow" :hue="184" :saturation="66" :brightness="1" :speed="0.56" />

          <div class="stack-content">
            <div class="panel-head stack-head">
              <p class="kicker">Technical Skills</p>
              <h2>Technical matrix built for fast product delivery</h2>
              <p class="stack-intro">
                Core languages, frameworks, and systems I rely on to ship stable features under real constraints.
              </p>
            </div>

            <div class="skills-stage" aria-label="Technical skills">
              <div class="skills-beam" aria-hidden="true"></div>

              <article
                v-for="(group, index) in technicalSkills"
                :key="group.title"
                class="skill-lane"
                :style="{ '--lane-delay': `${index * 80}ms` }"
              >
                <div class="lane-head">
                  <p class="lane-index">{{ String(index + 1).padStart(2, '0') }}</p>
                  <h3>{{ group.title }}</h3>
                </div>

                <ul class="lane-tags">
                  <li v-for="item in group.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </div>
        </article>
      </section>

      <section id="connect" class="panel contact reveal delay-5" aria-labelledby="connect-title">
        <AnimatedBackground class="contact-glow" :hue="34" :saturation="72" :brightness="1" :speed="0.44" />

        <div class="contact-copy-wrap">
          <p class="kicker">Connect</p>
          <h2 id="connect-title">Open to internships and freelance delivery</h2>
          <p class="contact-copy">
            Looking for product and engineering collaborations where execution speed, reliability,
            and clean architecture are expected by default.
          </p>
        </div>

        <div class="contact-list">
          <a class="contact-card" href="tel:+33612646319">
            <span>Phone</span>
            <strong>+33 6 12 64 63 19</strong>
          </a>
          <a class="contact-card" href="mailto:ylan.cuvier@epitech.eu">
            <span>Email</span>
            <strong>ylan.cuvier@epitech.eu</strong>
          </a>
          <a class="contact-card" href="https://linkedin.com/in/ylan-cuvier" target="_blank" rel="noreferrer">
            <span>Location</span>
            <strong>Paris, France</strong>
          </a>
        </div>
      </section>
    </main>

    <ScrollIsland title="Section Navigator" :height="184" :scroll-threshold="80">
      <nav class="island-links" aria-label="Section shortcuts">
        <a v-for="link in islandLinks" :key="link.href" class="island-link" :href="link.href">
          {{ link.label }}
        </a>
      </nav>
    </ScrollIsland>
  </div>
</template>

<script setup>
import AnimatedBackground from './components/AnimatedBackground.vue'
import InteractiveGridPattern from './components/InteractiveGridPattern.vue'
import ShaderToy from './components/ShaderToy.vue'
import ScrollIsland from './components/ScrollIsland.vue'

const shaderCode = 'inspira-silk-shader'

const signals = [
  { value: '11+', label: 'Languages used across school and freelance work' }
]

const projects = [
  {
    type: 'Automation Platform',
    name: 'AREA',
    summary:
      'Built an automation product inspired by IFTTT to synchronize tasks across connected services through trigger/action workflows.',
    points: [
      'Integrated GitHub, Discord, and Spotify with OAuth authentication.',
      'Developed backend services in Go using Gin and GORM with PostgreSQL.',
      'Created a Vue.js interface to configure and monitor automations.'
    ],
    stack: 'Vue.js, Go, Gin, GORM, PostgreSQL, OAuth'
  },
  {
    type: 'Game Engineering',
    name: 'R-Type',
    summary: 'Developed a cross-platform game engine and multiplayer recreation of the classic R-Type game.',
    points: [
      'Implemented a custom Entity Component System architecture.',
      'Handled low-latency networking with C++ and Asio.',
      'Focused on real-time synchronization in multiplayer gameplay.'
    ],
    stack: 'C++, Asio, ECS, Real-time Networking'
  },
  {
    type: 'Hackathon Project',
    name: 'Epitech x Vueling',
    summary: 'Created an offline translation tool designed for airplane usage constraints.',
    points: [
      'Built rapid prototype logic with a web-first UI approach.',
      'Designed to stay functional without internet connectivity.',
      'Delivered during hackathon timelines with focused scope.'
    ],
    stack: 'React.js, Node.js'
  },
  {
    type: 'Hackathon Project',
    name: 'Epitech x Onepoint',
    summary: 'Designed an eco-responsible chatbot to encourage sustainable behavior.',
    points: [
      'Implemented conversation flow and response handling.',
      'Connected AI tooling for quick prototyping with Ollama.',
      'Built in team collaboration mode under time pressure.'
    ],
    stack: 'React.js, Node.js, Ollama'
  }
]

const timeline = [
  {
    period: 'September 2024 - December 2024',
    title: 'Fullstack Web Developer at ISART Digital',
    location: 'Paris, France',
    summary:
      'Redesigned internal tools with PHP and Twig, and shipped a student-focused mobile intranet with Vue.js and Nuxt.js connected to a PHP backend.'
  },
  {
    period: '2023 - 2028',
    title: 'Master in Computer Science',
    location: 'EPITECH, Le Kremlin-Bicetre',
    summary:
      'Building deep systems, architecture, and product implementation skills through project-heavy training.'
  },
  {
    period: '2020 - 2023',
    title: 'General Baccalaureate',
    location: 'Lycee Claude Monet, Paris',
    summary: 'Specialized in mathematics and life and earth sciences before moving fully into software engineering.'
  }
]

const technicalSkills = [
  {
    title: 'Languages',
    items: ['PHP', 'JavaScript', 'Python', 'C', 'C++', 'Go', 'SQL', 'HTML', 'CSS', 'Haskell', 'Assembly']
  },
  {
    title: 'Frameworks & Runtimes',
    items: ['Vue.js', 'Nuxt.js', 'React', 'Node.js', 'Gin', 'Twig', 'Tailwind CSS']
  },
  {
    title: 'Tools & Databases',
    items: ['Git', 'GitHub', 'Docker', 'Postman', 'phpMyAdmin', 'GORM']
  },
  {
    title: 'Concepts & AI',
    items: [
      'REST API',
      'OAuth',
      'Object-Oriented Programming',
      'GitHub Copilot',
      'Google Gemini',
      'ChatGPT & Codex'
    ]
  },
  {
    title: 'Systems',
    items: ['Linux', 'Bash', 'Shell scripting']
  }
]

const islandLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Stack', href: '#stack' },
  { label: 'Connect', href: '#connect' }
]
</script>

<style scoped>
.portfolio {
  --bg: rgb(10 14 22 / 0.9);
  --line: rgb(220 216 201 / 0.2);
  --line-strong: rgb(244 201 132 / 0.35);
  --text-strong: rgb(246 241 227);
  --text-soft: rgb(173 181 202);
  --accent: rgb(244 201 132);
  --accent-cold: rgb(128 235 217);

  position: relative;
  z-index: 0;
  min-height: 100vh;
  padding: clamp(0.7rem, 2vw, 1.2rem);
  isolation: isolate;
  color: var(--text-strong);
}

.grid-backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.grid-backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 16% 14%, rgb(255 188 112 / 0.12), transparent 34%),
    radial-gradient(circle at 84% 84%, rgb(245 146 92 / 0.1), transparent 38%),
    linear-gradient(180deg, rgb(6 10 18 / 0.74), rgb(4 8 15 / 0.86));
}

.grid-backdrop-pattern {
  position: absolute;
  inset: 0;
  height: 100%;
  transform: none;
  opacity: 0.72;
  filter: saturate(1.08) contrast(1.06);
  mask-image: none;
  -webkit-mask-image: none;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 1;
  opacity: 0.08;
  pointer-events: none;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgb(255 255 255 / 0.02) 0,
      rgb(255 255 255 / 0.02) 1px,
      transparent 1px,
      transparent 3px
    );
}

.topbar,
.page {
  position: relative;
  z-index: 6;
}

.topbar {
  position: sticky;
  top: 0.7rem;
  z-index: 30;
  width: min(1200px, 100%);
  margin-inline: auto;
  padding: 0.72rem 0.9rem;
  border-radius: 1rem;
  border: 1px solid var(--line);
  background: rgb(8 12 19 / 0.72);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wordmark {
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  font-size: 1.02rem;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav a {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-soft);
  padding: 0.38rem 0.6rem;
  border-radius: 999px;
  transition: color 200ms ease, background-color 200ms ease;
}

.nav a:hover {
  color: var(--text-strong);
  background: rgb(255 255 255 / 0.08);
}

.page {
  width: min(1200px, 100%);
  margin-inline: auto;
  margin-top: 0.95rem;
  display: grid;
  gap: 0.9rem;
}

.hero {
  position: relative;
  min-height: clamp(26rem, 72vh, 40rem);
  border-radius: 1.4rem;
  border: 1px solid var(--line);
  overflow: hidden;
  background: var(--bg);
  box-shadow: 0 35px 80px rgb(0 0 0 / 0.45);
}

.shader-layer {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.shader-layer :deep(canvas) {
  width: 100%;
  height: 100%;
  display: block;
}

.hero-fade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg, rgb(8 12 20 / 0.88) 15%, rgb(8 12 20 / 0.42) 54%, rgb(8 12 20 / 0.86) 100%),
    radial-gradient(circle at 84% 22%, rgb(255 171 89 / 0.2), transparent 42%);
}

.hero-body {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: clamp(1rem, 4vw, 3rem);
  display: grid;
  align-content: center;
  gap: 1rem;
  max-width: 780px;
}

.kicker {
  margin: 0;
  color: var(--accent-cold);
  font-size: 0.71rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 800;
}

h1,
h2,
h3,
p,
ul {
  margin: 0;
}

.hero h1 {
  font-family: var(--font-display);
  line-height: 0.95;
  letter-spacing: 0.01em;
  max-width: 14ch;
  font-size: clamp(2.3rem, 8vw, 5.8rem);
  text-wrap: balance;
}

.hero-copy {
  max-width: 60ch;
  color: var(--text-soft);
  line-height: 1.65;
  font-size: clamp(0.95rem, 2.2vw, 1.15rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.cta {
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid var(--line);
  padding: 0.62rem 0.88rem;
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 800;
  transition: transform 170ms ease, border-color 170ms ease, box-shadow 170ms ease;
}

.cta:hover {
  transform: translateY(-2px);
}

.cta-primary {
  color: rgb(8 11 18);
  border-color: transparent;
  background: linear-gradient(120deg, rgb(255 205 142), rgb(242 170 79));
  box-shadow: 0 12px 26px rgb(242 170 79 / 0.34);
}

.cta-secondary {
  color: var(--text-strong);
  background: rgb(255 255 255 / 0.04);
}

.cta-secondary:hover {
  border-color: var(--line-strong);
}

.signal-grid {
  margin-top: 0.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.6rem;
}

.signal-card {
  border: 1px solid var(--line);
  border-radius: 0.88rem;
  background: rgb(255 255 255 / 0.04);
  padding: 0.72rem;
}

.signal-value {
  font-family: var(--font-display);
  color: var(--accent);
  font-size: 1.8rem;
  line-height: 0.95;
}

.signal-label {
  margin-top: 0.28rem;
  color: var(--text-soft);
  font-size: 0.82rem;
  line-height: 1.45;
}

.panel {
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  background: rgb(8 12 20 / 0.82);
  padding: clamp(0.95rem, 3vw, 1.8rem);
  box-shadow: 0 24px 55px rgb(0 0 0 / 0.28);
}

.panel-head {
  display: grid;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
}

.panel h2 {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2.5rem);
  line-height: 1.05;
  max-width: 22ch;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.project-card {
  border: 1px solid rgb(230 223 206 / 0.18);
  border-radius: 0.95rem;
  background: linear-gradient(155deg, rgb(18 26 40 / 0.9), rgb(13 18 30 / 0.92));
  padding: 0.9rem;
  display: grid;
  gap: 0.62rem;
  transition: transform 190ms ease, border-color 190ms ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgb(244 201 132 / 0.44);
}

.project-card.feature {
  background: linear-gradient(155deg, rgb(30 38 57 / 0.92), rgb(11 17 28 / 0.95));
}

.project-type {
  color: var(--accent-cold);
  font-size: 0.67rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  font-weight: 800;
}

.project-card h3 {
  font-family: var(--font-display);
  font-size: 1.16rem;
}

.project-summary {
  color: var(--text-soft);
  line-height: 1.56;
}

.project-points {
  padding-left: 1.05rem;
  color: rgb(186 194 216);
  display: grid;
  gap: 0.36rem;
  line-height: 1.45;
  font-size: 0.88rem;
}

.stack-line {
  color: var(--text-soft);
  line-height: 1.5;
  font-size: 0.86rem;
}

.stack-line span {
  display: inline-block;
  margin-right: 0.42rem;
  border-radius: 999px;
  padding: 0.2rem 0.45rem;
  background: rgb(128 235 217 / 0.2);
  color: rgb(166 248 236);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 800;
  font-size: 0.66rem;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.timeline {
  display: grid;
  gap: 0.7rem;
}

.timeline-item {
  position: relative;
  border: 1px solid rgb(232 225 207 / 0.18);
  border-radius: 0.88rem;
  background: rgb(255 255 255 / 0.03);
  padding: 0.82rem;
  padding-left: 0.95rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 0.7rem;
  left: 0;
  bottom: 0.7rem;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent), var(--accent-cold));
}

.timeline-date {
  color: rgb(141 151 175);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.timeline-item h3 {
  margin-top: 0.24rem;
  font-family: var(--font-display);
  font-size: 1rem;
}

.timeline-meta {
  margin-top: 0.2rem;
  color: rgb(187 195 216);
  font-size: 0.86rem;
}

.timeline-summary {
  margin-top: 0.45rem;
  color: var(--text-soft);
  line-height: 1.55;
}

.stack-card {
  position: relative;
  overflow: hidden;
}

.stack-glow {
  opacity: 0.28;
  mix-blend-mode: screen;
}

.stack-content {
  position: relative;
  z-index: 2;
}

.stack-head {
  margin-bottom: 0.95rem;
}

.stack-intro {
  margin-top: 0.22rem;
  max-width: 58ch;
  color: var(--text-soft);
  line-height: 1.58;
}

.skills-stage {
  position: relative;
  display: grid;
  gap: 0.65rem;
  padding: 0.85rem;
  border-radius: 0.95rem;
  border: 1px solid rgb(233 225 208 / 0.16);
  background:
    linear-gradient(160deg, rgb(8 13 21 / 0.72), rgb(8 12 20 / 0.86)),
    radial-gradient(circle at 86% 20%, rgb(129 237 218 / 0.1), transparent 45%);
}

.skills-beam {
  position: absolute;
  top: 0.9rem;
  bottom: 0.9rem;
  left: 1.15rem;
  width: 2px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgb(247 204 129), rgb(128 235 217));
  box-shadow: 0 0 26px rgb(128 235 217 / 0.24);
  opacity: 0.7;
}

.skill-lane {
  --lane-accent: rgb(247 204 129 / 0.38);
  position: relative;
  border-radius: 0.85rem;
  border: 1px solid rgb(236 229 212 / 0.15);
  background: linear-gradient(140deg, rgb(15 24 38 / 0.86), rgb(9 15 24 / 0.94));
  padding: 0.72rem 0.75rem 0.76rem 1.05rem;
  display: grid;
  gap: 0.5rem;
  margin-left: 1rem;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
  animation: lane-rise 620ms cubic-bezier(0.17, 0.67, 0.3, 1) both;
  animation-delay: var(--lane-delay, 0ms);
}

.skill-lane::before {
  content: '';
  position: absolute;
  top: 0.62rem;
  bottom: 0.62rem;
  left: -0.74rem;
  width: 6px;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--accent), var(--accent-cold));
  opacity: 0.92;
}

.skill-lane:nth-child(odd) {
  margin-left: 1rem;
}

.skill-lane:nth-child(even) {
  margin-left: 1.72rem;
}

.skill-lane:nth-child(2) {
  --lane-accent: rgb(128 235 217 / 0.34);
}

.skill-lane:nth-child(3) {
  --lane-accent: rgb(129 181 255 / 0.34);
}

.skill-lane:nth-child(4) {
  --lane-accent: rgb(248 210 139 / 0.34);
}

.skill-lane:nth-child(5) {
  --lane-accent: rgb(176 237 232 / 0.34);
}

.skill-lane:hover {
  transform: translateY(-2px);
  border-color: var(--lane-accent);
  box-shadow: 0 14px 32px rgb(0 0 0 / 0.26);
}

.lane-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.lane-index {
  margin: 0;
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 0.86rem;
  line-height: 1;
  letter-spacing: 0.07em;
}

.lane-head h3 {
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.01em;
}

.lane-tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.34rem;
}

.lane-tags li {
  border-radius: 999px;
  border: 1px solid rgb(238 230 212 / 0.24);
  background: rgb(255 255 255 / 0.06);
  color: rgb(219 225 243);
  padding: 0.2rem 0.48rem;
  font-size: 0.74rem;
  line-height: 1.35;
}

@keyframes lane-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact {
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: 1.4fr 1fr;
}

.contact-glow {
  opacity: 0.23;
  mix-blend-mode: screen;
}

.contact-copy-wrap,
.contact-list {
  position: relative;
  z-index: 2;
}

.contact-copy {
  margin-top: 0.44rem;
  max-width: 58ch;
  color: var(--text-soft);
  line-height: 1.62;
}

.contact-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.56rem;
}

.contact-card {
  text-decoration: none;
  border: 1px solid rgb(231 224 206 / 0.2);
  border-radius: 0.82rem;
  padding: 0.68rem;
  display: grid;
  gap: 0.22rem;
  background: rgb(255 255 255 / 0.04);
  transition: transform 180ms ease, border-color 180ms ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  border-color: var(--line-strong);
}

.contact-card span {
  color: rgb(149 161 187);
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  font-weight: 800;
}

.contact-card strong {
  font-size: 0.92rem;
  line-height: 1.35;
}

.island-links {
  display: grid;
  gap: 0.4rem;
}

.island-link {
  text-decoration: none;
  border-radius: 0.72rem;
  border: 1px solid rgb(230 222 205 / 0.22);
  background: rgb(255 255 255 / 0.05);
  color: var(--text-strong);
  padding: 0.46rem 0.62rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.68rem;
  font-weight: 700;
  transition: transform 170ms ease, border-color 170ms ease, background-color 170ms ease;
}

.island-link:hover {
  transform: translateY(-1px);
  border-color: var(--line-strong);
  background: rgb(255 255 255 / 0.1);
}

.island-link:focus-visible {
  outline: 2px solid rgb(128 235 217 / 0.82);
  outline-offset: 2px;
}

.reveal {
  animation: reveal-up 600ms ease both;
}

.delay-1 {
  animation-delay: 40ms;
}

.delay-2 {
  animation-delay: 90ms;
}

.delay-3 {
  animation-delay: 140ms;
}

.delay-4 {
  animation-delay: 190ms;
}

.delay-5 {
  animation-delay: 240ms;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 980px) {
  .nav {
    display: none;
  }

  .signal-grid,
  .project-grid,
  .columns,
  .contact {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    max-width: 12ch;
  }

  .skills-stage {
    padding: 0.72rem;
  }

  .skills-beam {
    left: 1rem;
  }

  .skill-lane,
  .skill-lane:nth-child(even) {
    transform: translateX(0);
    margin-left: 0.88rem;
  }
}

@media (max-width: 620px) {
  .portfolio {
    padding: 0.65rem;
  }

  .topbar,
  .hero,
  .panel,
  .project-card,
  .timeline-item,
  .skill-lane,
  .contact-card {
    border-radius: 0.9rem;
  }

  .hero-actions {
    gap: 0.45rem;
  }

  .cta {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .skills-stage {
    padding: 0.66rem;
  }

  .skills-beam {
    left: 0.9rem;
  }

  .skill-lane,
  .skill-lane:nth-child(even) {
    margin-left: 0.78rem;
    transform: translateX(0);
  }
}
</style>
