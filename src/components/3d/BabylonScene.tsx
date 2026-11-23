'use client'

import type { Engine as BabylonEngine } from '@babylonjs/core/Engines/engine'
import { useEffect, useRef } from 'react'

export default function BabylonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<BabylonEngine | null>(null)
  const resizeHandlerRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let mounted = true
    const canvas = canvasRef.current
    if (!canvas) return

    const initScene = async () => {
      const [
        { Engine },
        { Scene },
        { ArcRotateCamera },
        { HemisphericLight },
        { PointLight },
        { Vector3 },
        { Color3, Color4 },
        { MeshBuilder },
        { StandardMaterial },
      ] = await Promise.all([
        import('@babylonjs/core/Engines/engine'),
        import('@babylonjs/core/scene'),
        import('@babylonjs/core/Cameras/arcRotateCamera'),
        import('@babylonjs/core/Lights/hemisphericLight'),
        import('@babylonjs/core/Lights/pointLight'),
        import('@babylonjs/core/Maths/math.vector'),
        import('@babylonjs/core/Maths/math.color'),
        import('@babylonjs/core/Meshes/meshBuilder'),
        import('@babylonjs/core/Materials/standardMaterial'),
      ])

      if (!mounted || !canvas) return

      const engine = new Engine(canvas, true, {
        preserveDrawingBuffer: false,
        stencil: true,
        alpha: true,
      })
      engineRef.current = engine

      const scene = new Scene(engine)
      scene.clearColor = new Color4(0, 0, 0, 0)

      const camera = new ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.6,
        9,
        Vector3.Zero(),
        scene
      )
      camera.attachControl(canvas, true)
      camera.lowerRadiusLimit = 6
      camera.upperRadiusLimit = 14
      camera.wheelPrecision = 80

      new HemisphericLight('hemi', new Vector3(0, 1, 0), scene)

      const pointLight = new PointLight('point', new Vector3(5, 5, 5), scene)
      pointLight.diffuse = Color3.FromHexString('#14b8a6')

      // Matériau teal
      const tealMat = new StandardMaterial('tealMat', scene)
      tealMat.diffuseColor = Color3.FromHexString('#14b8a6')
      tealMat.emissiveColor = Color3.FromHexString('#0f766e').scale(0.3)

      const blueMat = new StandardMaterial('blueMat', scene)
      blueMat.diffuseColor = Color3.FromHexString('#0ea5e9')
      blueMat.emissiveColor = Color3.FromHexString('#0369a1').scale(0.3)

      // Torus principal
      const torus = MeshBuilder.CreateTorus(
        'torus',
        { diameter: 3.2, thickness: 0.35, tessellation: 64 },
        scene
      )
      torus.material = tealMat

      // Sphère orbitale
      const sphere = MeshBuilder.CreateSphere(
        'sphere',
        { diameter: 0.9, segments: 32 },
        scene
      )
      sphere.material = blueMat

      // Anneau secondaire
      const ring = MeshBuilder.CreateTorus(
        'ring',
        { diameter: 5, thickness: 0.08, tessellation: 96 },
        scene
      )
      ring.material = tealMat
      ring.rotation.x = Math.PI / 2.5

      // Petites sphères satellites
      const satellites = Array.from({ length: 4 }).map((_, i) => {
        const s = MeshBuilder.CreateSphere(
          `sat-${i}`,
          { diameter: 0.35, segments: 16 },
          scene
        )
        s.material = i % 2 === 0 ? tealMat : blueMat
        return s
      })

      let angle = 0
      engine.runRenderLoop(() => {
        angle += 0.006
        torus.rotation.x = angle
        torus.rotation.y = angle * 0.7
        ring.rotation.z = -angle * 0.5

        sphere.position.x = Math.cos(angle) * 2.6
        sphere.position.z = Math.sin(angle) * 2.6
        sphere.position.y = Math.sin(angle * 1.5) * 0.6

        satellites.forEach((s, i) => {
          const a = angle * (1 + i * 0.4) + (i * Math.PI) / 2
          s.position.x = Math.cos(a) * 2.2
          s.position.z = Math.sin(a) * 2.2
          s.position.y = Math.cos(a * 1.3) * 0.8
        })

        scene.render()
      })

      const onResize = () => engine.resize()
      window.addEventListener('resize', onResize)
      resizeHandlerRef.current = onResize
    }

    if ('requestIdleCallback' in window) {
      ;(
        window as Window & {
          requestIdleCallback: (
            callback: () => void,
            options: { timeout: number }
          ) => number
        }
      ).requestIdleCallback(() => initScene(), { timeout: 2000 })
    } else {
      setTimeout(initScene, 500)
    }

    return () => {
      mounted = false
      if (resizeHandlerRef.current) {
        window.removeEventListener('resize', resizeHandlerRef.current)
        resizeHandlerRef.current = null
      }
      if (engineRef.current) {
        engineRef.current.dispose()
        engineRef.current = null
      }
    }
  }, [])

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-border bg-bg-card md:h-105">
      <canvas ref={canvasRef} className="h-full w-full outline-none" />
      <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-bg-primary/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-text-muted backdrop-blur">
        Interactive · 3D
      </span>
    </div>
  )
}