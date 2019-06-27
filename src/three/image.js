import * as THREE from 'three';
import { TweenLite } from 'gsap';



export default class ImgOnPlane {
    constructor(controler, name, config) {
        this.controler = controler
        this.name = name
        this.init(config.imgPath)
        this.animation = config
    }

    init(imgPath) {
        let geometry = new THREE.PlaneGeometry(30, 30, 10)
        let loader = new THREE.TextureLoader();

        let material = new THREE.MeshBasicMaterial({
                map: loader.load(imgPath),
                color: new THREE.Color(0xf5f5f5),
                transparent: true
            })
            // this.mesh.position.set(0, 0, 0)
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.name = this.name
    }
    hide() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.fromTo(
                this.mesh.material, this.animation.time, { opacity: this.animation.opacityto }, {
                    ease: Back.easeOut,
                    opacity: this.animation.opacityfrom,
                    onComplete: () => {
                        this.stop()
                        resolve()
                    }
                });
            TweenLite.fromTo(
                this.mesh.position, this.animation.time, { z: this.animation.zfrom }, {
                    ease: Circ.easeOut,
                    z: this.animation.zto
                });
        });
    }
    stop() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        this.mesh.parent.remove(this.mesh)
    }
    start() {
        if (this.mesh) {
            if (this.controler.scene.getObjectByName(this.name)) return;
            this.controler.scene.add(this.mesh);
            return new Promise((resolve, reject) => {
                this.mesh.position.z = 10
                TweenLite.fromTo(
                    this.mesh.material, this.animation.time, { opacity: this.animation.opacityfrom }, {
                        ease: Back.easeOut,
                        opacity: this.animation.opacityto,
                        onComplete: () => {
                            resolve()
                        }
                    });
                TweenLite.fromTo(
                    this.mesh.position, this.animation.time, { y: this.animation.yfrom }, {
                        ease: Circ.easeOut,
                        y: this.animation.yto
                    });
                TweenLite.fromTo(
                    this.mesh.position, this.animation.time, { x: this.animation.xfrom }, {
                        ease: Circ.easeOut,
                        x: this.animation.xto
                    });
            });
        }
    }
}