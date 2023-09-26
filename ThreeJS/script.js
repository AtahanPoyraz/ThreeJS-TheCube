import * as THREE from "three"

const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)

const materials = [
    new THREE.MeshStandardMaterial({ color: 0x00ffff }), 
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),  
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),  
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),  
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),  
    new THREE.MeshStandardMaterial({ color: 0x00ffff }),  
]

const mesh = new THREE.Mesh(geometry, materials)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 3

const canvas = document.getElementById("webgl")
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(window.innerWidth, window.innerHeight)

const light = new THREE.PointLight(0xffffff, 0.6)
light.position.set(1, 1, 2)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

let isDragging = false
let previousMousePosition = {
    x: 0,
    y: 0
}

canvas.addEventListener('mousedown', (event) => {
    isDragging = true
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    }
})

canvas.addEventListener('mouseup', () => {
    isDragging = false
})

canvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    }

    const rotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
            toRadians(deltaMove.y * 0.45),
            toRadians(deltaMove.x * 0.45),
            0,
            'XYZ'
        ))

    mesh.quaternion.multiplyQuaternions(rotationQuaternion, mesh.quaternion)
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    }
})

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight

    camera.aspect = newWidth / newHeight
    camera.updateProjectionMatrix()

    renderer.setSize(newWidth, newHeight)
})

const animate = () => {
    window.requestAnimationFrame(animate)
    mesh.rotation.x += 0.003
    mesh.rotation.y += 0.003
    renderer.render(scene, camera)
}

animate()
