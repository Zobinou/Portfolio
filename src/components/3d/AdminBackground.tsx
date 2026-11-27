'use client'

import { useEffect, useRef } from 'react'
import {
    Engine,
    Scene,
    FreeCamera,
    Vector3,
    Color4,
    Color3,
    MeshBuilder,
    StandardMaterial,
    GlowLayer,
    HemisphericLight,
} from '@babylonjs/core'

export default function AdminBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const engine = new Engine(canvas, true, { antialias: true, alpha: true }, true)
        const scene = new Scene(engine)
        scene.clearColor = new Color4(0, 0, 0, 0)

        const camera = new FreeCamera('camera', new Vector3(0, 0, -10), scene)
        camera.setTarget(Vector3.Zero())
        camera.minZ = 0.1

        const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
        light.intensity = 0.4

        const glow = new GlowLayer('glow', scene, { blurKernelSize: 32 })
        glow.intensity = 0.7

        const dotMat = new StandardMaterial('dotMat', scene)
        dotMat.emissiveColor = new Color3(0.08, 0.72, 0.65)
        dotMat.diffuseColor = Color3.Black()
        dotMat.specularColor = Color3.Black()

        const baseMesh = MeshBuilder.CreateSphere(
            'baseDot',
            { diameter: 0.08, segments: 6 },
            scene,
        )
        baseMesh.material = dotMat
        baseMesh.isVisible = false

        type Particle = {
            mesh: ReturnType<typeof baseMesh.createInstance>
            basePos: Vector3
            phase: number
            speed: number
        }
        const particles: Particle[] = []
        const count = 120
        const spreadX = 24
        const spreadY = 14
        const depth = 10

        for (let i = 0; i < count; i++) {
            const inst = baseMesh.createInstance(`dot-${i}`)
            const x = (Math.random() - 0.5) * spreadX
            const y = (Math.random() - 0.5) * spreadY
            const z = (Math.random() - 0.5) * depth
            inst.position.set(x, y, z)
            inst.scaling.setAll(0.5 + Math.random() * 0.9)
            particles.push({
                mesh: inst,
                basePos: inst.position.clone(),
                phase: Math.random() * Math.PI * 2,
                speed: 0.3 + Math.random() * 0.5,
            })
        }

        let alpha = 0
        let disposed = false

        const renderLoop = () => {
            if (disposed) return
            alpha += 0.0008
            const radius = 12
            camera.position.x = Math.sin(alpha) * radius * 0.4
            camera.position.z = -Math.cos(alpha) * radius
            camera.position.y = Math.sin(alpha * 0.7) * 1.2
            camera.setTarget(Vector3.Zero())

            const t = performance.now() * 0.0005
            for (const p of particles) {
                p.mesh.position.x = p.basePos.x + Math.sin(t * p.speed + p.phase) * 0.35
                p.mesh.position.y = p.basePos.y + Math.cos(t * p.speed + p.phase * 1.3) * 0.35
                p.mesh.position.z = p.basePos.z + Math.sin(t * p.speed * 0.7 + p.phase * 0.5) * 0.25
            }

            scene.render()
        }

        engine.runRenderLoop(renderLoop)

        const resize = () => engine.resize()
        window.addEventListener('resize', resize)

        return () => {
            disposed = true
            window.removeEventListener('resize', resize)
            engine.stopRenderLoop()
            scene.dispose()
            engine.dispose()
        }
    }, [])

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none">
            <canvas ref={canvasRef} className="h-full w-full" />
        </div>
    )
}