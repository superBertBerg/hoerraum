import * as THREE from 'three'
import { TweenLite } from 'gsap'
import { initSquares } from './components/constructsquares'


// TODO NEEDS SIZE ATTRIBUTE

export default class Ellipse {

    constructor(controler, name) {
        this.controler = controler
        this.name = name
        this.init()
    }

    init() {
        var instances = 200
        var xfact = 100
        var yfact = 45
        var zfact = -60
        var diffStart = 0.6
        var diffDest = 1.4

        this.x = xfact
        this.y = yfact
        this.z = zfact

        this.uniforms = {
            time: { value: 1.0 },
            xfact: { value: xfact },
            yfact: { value: yfact },
            zfact: { value: zfact }
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function elipseInit(time, xdiffuse, ydiffuse, zdiffuse) {
            return {
                x: xfact * Math.cos(time) * xdiffuse,
                y: yfact * Math.sin(time) * ydiffuse,
                z: zfact * Math.sin(time) * zdiffuse
            }
        }

        // spark coordinates
        let offsets = []
            // spark colors ?? all diffrent
        let colors = []
            // spark speed
        let speeds = []
            // index get pix start pos
        let starts = []
            // diffuse
        let diffuses = []



        for (var i = 0; i < instances; ++i) {
            var xdiffuse = getRandomArbitrary(diffStart, diffDest)
            var ydiffuse = getRandomArbitrary(diffStart, diffDest)
            var zdiffuse = getRandomArbitrary(diffStart, diffDest)

            var obj = elipseInit(i, xdiffuse, ydiffuse, zdiffuse);
            // coordinates
            offsets.push(obj.x, obj.y, obj.z);
            // Math.random()); colors
            colors.push(Math.random(), Math.random(), Math.random(), Math.random());
            // speed
            speeds.push(Math.random());
            // index
            starts.push(i);
            // diffusion
            diffuses.push(xdiffuse, ydiffuse, zdiffuse)
        }

        var square = initSquares(offsets, starts, speeds, diffuses, colors)
        square.maxInstancedCount = instances;

        var mat = new THREE.RawShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: require('./shaders/ellips.vert'),
            fragmentShader: require('./shaders/ellips.frag'),
            depthTest: false,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        this.mesh.name = this.name;
    }

    update(delta) {
        // if (!this.controler.scene.getObjectByName('ellipse')) return;

        this.uniforms.time.value = delta * 0.0005;
        // var diffuse = square.attributes.diffuse.array;
        // square.attributes.diffuse.needsUpdate = true;
        // this.controls.update();
    }

    hide(_destroy, time = 0.8) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uniforms.xfact, time, {
                value: 1500.0,
                onComplete: () => {
                    if (_destroy) this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.uniforms.yfact, time, { value: 1500.0 });
            TweenLite.to(this.uniforms.zfact, time * 0.8, { value: -500.0 });

        });
    }

    stop() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        this.mesh.parent.remove(this.mesh);
    }

    start(time = 0.8) {
        if (this.mesh) {
            this.controler.scene.add(this.mesh)
            return new Promise((resolve, reject) => {
                TweenLite.fromTo(this.uniforms.xfact, time, { value: 1500.0 }, { value: this.x });
                TweenLite.fromTo(this.uniforms.yfact, time, { value: 1500.0 }, { value: this.y });
                TweenLite.fromTo(this.uniforms.zfact, time * 0.8, { value: 1500.0 }, { value: this.z });
            });
        }
    }
}