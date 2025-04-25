<template>
    <div ref="container" class=" abstract-pattern-container"></div>
    <!-- box overlay blur -->
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as THREE from 'three'
  
  const container = ref<HTMLElement | null>(null)
  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let wireframeMesh: THREE.Mesh
  let animationFrameId: number | null = null
  
  // Configuration  
  const config = {
    color: 0xffffff,
    backgroundColor: 0x0aa2ed,
    gridSize: { width: 1000, height: 1000 },
    gridDivisions: { width: 30, height: 30 },
    waveSpeed: 0.5,
    waveHeight: 120,
    cameraPosition: { x: 0, y: 100, z: 500 },
    autoRotate: true,
    rotationSpeed: 0.0003
}
  
  onMounted(() => {
    if (!container.value) return
    
    // Initialize scene
    scene = new THREE.Scene()
    
    // Create camera
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(60, aspect, 1, 10000)
    camera.position.set(config.cameraPosition.x, config.cameraPosition.y, config.cameraPosition.z)
    camera.lookAt(0, 0, 0)
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(config.backgroundColor, 1)
    container.value.appendChild(renderer.domElement)
    
    // Create wireframe grid
    createWireframeGrid()
    
    // Handle window resize
    window.addEventListener('resize', handleResize)
    
    // Start animation loop
    animate()
  })
  
  onBeforeUnmount(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
    
    window.removeEventListener('resize', handleResize)
    
    if (container.value && renderer) {
      container.value.removeChild(renderer.domElement)
    }
    
    // Clean up Three.js resources
    if (wireframeMesh) {
      wireframeMesh.geometry.dispose()
      if (wireframeMesh.material instanceof THREE.Material) {
        wireframeMesh.material.dispose()
      } else {
        wireframeMesh.material.forEach(material => material.dispose())
      }
      scene.remove(wireframeMesh)
    }
  })
  
  const handleResize = () => {
    if (!camera || !renderer) return
    
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  
  const createWireframeGrid = () => {
    // Create a plane geometry for the grid
    const geometry = new THREE.PlaneGeometry(
      config.gridSize.width,
      config.gridSize.height,
      config.gridDivisions.width,
      config.gridDivisions.height
    )
    
    // Apply vertex displacement to create initial waves
    const vertices = geometry.attributes.position.array
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      
      // Create wave pattern
      vertices[i + 2] = Math.sin(x * 0.01) * Math.sin(y * 0.01) * 30
    }
    
    // Create wireframe material
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    })
    
    // Create mesh and add to scene
    wireframeMesh = new THREE.Mesh(geometry, material)
    wireframeMesh.rotation.x = -Math.PI / 3 // Tilt the grid to match image perspective
    scene.add(wireframeMesh)
  }
  
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate)
    
    // Animate wireframe waves
    if (wireframeMesh) {
      const time = Date.now() * 0.001
      const vertices = wireframeMesh.geometry.attributes.position.array
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i]
        const y = vertices[i + 1]
        
        // Create animated wave pattern
        vertices[i + 2] = Math.sin(x * 0.01 + time * config.waveSpeed) * 
                          Math.sin(y * 0.01 + time * config.waveSpeed) * 
                          config.waveHeight
      }
      
      wireframeMesh.geometry.attributes.position.needsUpdate = true
      
      // Auto-rotate the grid
      if (config.autoRotate) {
        wireframeMesh.rotation.z += config.rotationSpeed
      }
    }
    
    renderer.render(scene, camera)
  }
  </script>
  
  <style scoped>
  .abstract-pattern-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
  }


  </style>