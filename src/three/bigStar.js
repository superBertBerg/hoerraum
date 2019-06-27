import { TweenLite } from 'gsap'
import * as THREE from 'three'

import { initSquares } from './components/constructsquares'

export default class BigStars {
    constructor(controler, name, config) {
        this.controler = controler;
        this.name = name;

        this.positions = config
        this.init()
    }

    init() {
        let offsets = [];
        let size = [];


        for (var i = 0; i < this.positions.length; ++i) {
            offsets.push(this.positions[i].x, this.positions[i].y, -10)
            size.push(this.positions[i].size)
        }

        this.ufBigStars = {
            time: { value: 0 },
            color: { value: new THREE.Color(0xF5F5F5) }
        }


        let square = initSquares(offsets, null, null, null, null, size);

        let material = new THREE
            .RawShaderMaterial({
                uniforms: this.ufBigStars,
                vertexShader: require('./shaders/bigStar.vert'),
                fragmentShader: require('./shaders/bigStar.frag'),
                depthTest: false,
                transparent: true
            })

        this.mesh = new THREE.Mesh(square, material);
        this.mesh.name = this.name
    }
    update(delta) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        // TODO ugly, false when animation end
        this.mesh.geometry.attributes.size.needsUpdate = true;
    }
    hide(time = 0.8) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.fromTo(
                this.mesh.geometry.attributes.size.array, time, { 0: this.positions[0].size }, {
                    ease: Back.easeOut,
                    0: 0,
                    onComplete: () => {
                        this.stop()
                        resolve()
                    }
                });
            TweenLite.fromTo(
                this.mesh.geometry.attributes.size.array, time, { 1: this.positions[1].size }, {
                    ease: Back.easeOut,
                    1: 0
                });
            TweenLite.fromTo(
                this.mesh.geometry.attributes.size.array, time, { 2: this.positions[2].size }, {
                    ease: Back.easeOut,
                    2: 0
                });
        });
    }
    stop() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        this.mesh.parent.remove(this.mesh)
    }
    start(time = 0.8) {
        // TODO multipleadd possible??
        // TODO multiple this.controler.animate possible?
        if (this.mesh) {
            if (this.controler.scene.getObjectByName(this.name)) return;
            this.controler.scene.add(this.mesh);
            this.controler.animate()
            return new Promise((resolve, reject) => {
                TweenLite.fromTo(
                    this.mesh.geometry.attributes.size.array, time, { 0: 0 }, {
                        ease: Back.easeOut,
                        0: this.positions[0].size,
                        onComplete: () => {
                            resolve()
                        }
                    });
                TweenLite.fromTo(
                    this.mesh.geometry.attributes.size.array, time, { 1: 0 }, {
                        ease: Back.easeOut,
                        1: this.positions[1].size
                    });
                TweenLite.fromTo(
                    this.mesh.geometry.attributes.size.array, time, { 2: 0 }, {
                        ease: Back.easeOut,
                        2: this.positions[2].size
                    });
            });
        }
    }
}