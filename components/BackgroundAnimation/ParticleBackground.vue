// components/ParticleBackground.vue
<template>
  <div class="fixed inset-0 -z-10">
    <canvas ref="canvasRef" class="w-full h-full bg-[#070B1F]"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

interface Mouse {
  x: number
  y: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const mouse = ref<Mouse>({ x: 0, y: 0 })
let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')
  if (!ctx) return

  // Set canvas size to match window size
  const updateSize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  updateSize()
  window.addEventListener('resize', updateSize)

  // Initialize particles
  const particleCount = 100
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    })
  }
}

const drawParticles = () => {
  if (!ctx || !canvasRef.value) return

  // Clear canvas
  ctx.fillStyle = '#070B1F'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  // Update and draw particles
  particles.value.forEach((particle, i) => {
    // Update position
    particle.x += particle.vx
    particle.y += particle.vy

    // Wrap around edges
    if (particle.x < 0) particle.x = canvasRef.value!.width
    if (particle.x > canvasRef.value!.width) particle.x = 0
    if (particle.y < 0) particle.y = canvasRef.value!.height
    if (particle.y > canvasRef.value!.height) particle.y = 0

    // Draw connections
    particles.value.forEach((p2, j) => {
      if (i === j) return

      const dx = particle.x - p2.x
      const dy = particle.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        // Draw line between particles
        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 150})`
        ctx!.lineWidth = 1
        ctx!.moveTo(particle.x, particle.y)
        ctx!.lineTo(p2.x, p2.y)
        ctx!.stroke()

        // // Mouse interaction
        // const mx = mouse.value.x
        // const my = mouse.value.y
        // const mouseDistance = Math.sqrt(
        //   Math.pow(particle.x - mx, 2) + Math.pow(particle.y - my, 2)
        // )

        // if (mouseDistance < 100) {
        //   const force = (100 - mouseDistance) / 500
        //   particle.vx += (particle.x - mx) * force
        //   particle.vy += (particle.y - my) * force
        // }
      }
    })

    // Draw particle
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, 2, 0, Math.PI * 2)
    ctx!.fillStyle = '#3B82F6'
    ctx!.fill()
  })

  // Request next frame
  animationFrame = requestAnimationFrame(drawParticles)
}

const handleMouseMove = (e: MouseEvent) => {
  mouse.value = {
    x: e.clientX,
    y: e.clientY
  }
}

onMounted(() => {
  initCanvas()
  drawParticles()
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>