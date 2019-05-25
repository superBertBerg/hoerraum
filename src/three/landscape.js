import * as THREE from 'three';
import { TweenLite } from 'gsap';
import { CombineNoise, GenerateNoise } from './components/perlinGeneric'

export default class Landscape {
    constructor(controler, landscape, name) {
        this.controler = controler
        this.name = name

        this.init(landscape.amplitude, landscape.wavelength, landscape.octaves, landscape.divisor, landscape.strokes, landscape.fact, landscape.color)
    }

    init(ampl, wl, oc, div, strokes, fact, color) {
        let circleDisplacmentArr = CombineNoise(GenerateNoise(ampl, wl, oc, div, strokes))

        let landscape = new THREE.ShapeBufferGeometry(this.generateLandscape(strokes - 1, fact, circleDisplacmentArr));

        let material = new THREE.MeshBasicMaterial({
            color: color,
        })

        this.mesh = new THREE.Mesh(landscape, material)
        this.mesh.name = this.name
    }

    generateLandscape(lines, circleRadius, perlinNoiseArr) {
        let step = 0
        let circleStep = Math.PI * 2 / lines
        let landscape = new THREE.Shape()

        landscape.moveTo(0, 0);

        for (var i = 0; i < lines + 1; ++i) {
            landscape.lineTo(Math.cos(step) * perlinNoiseArr.pos[i] + circleRadius * Math.cos(step), Math.sin(step) * perlinNoiseArr.pos[i] + circleRadius * Math.sin(step))
            step += circleStep;
        }

        return landscape;
    }

    update(delta) {
        // console.log(delta)
        this.mesh.rotation.z += delta;
    }
    hide(time = 0.8, to = 2400) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.mesh.position, time, {
                y: to,
                onComplete: () => {
                    this.stop();
                    resolve();
                }
            });
        });
    }
    stop() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        this.mesh.parent.remove(this.mesh)
    }
    start(time = 0.8, fromY = -2400, toY = -2000) {
        // TODO multipleadd possible??
        // TODO multiple this.controler.animate possible?
        if (this.mesh) {
            if (this.controler.scene.getObjectByName(this.name)) return;
            this.controler.scene.add(this.mesh)
            this.controler.animate()
            return new Promise((resolve, reject) => {
                TweenLite.fromTo(this.mesh.position, time, { y: fromY }, { y: toY });
            });
        }
    }
}