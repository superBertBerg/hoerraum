import * as THREE from 'three'
import { TweenLite } from 'gsap'
import { initSquares } from './components/constructsquares'

export default class Stars {

    constructor(controler) {
        this.controler = controler

        this.init()
    }

    init() {
        var instances = 1000
        var viewHeight = 220
        var viewWidth = 220 * this.controler.camera.aspect
        var depth = 100

        this.x = 1.0
        this.y = 1.0
        this.z = 1.0

        this.ufStar = {
            time: { value: 1.0 },
            xfact: { value: 1.0 },
            yfact: { value: 1.0 },
            zfact: { value: 1.0 }
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function starInit() {
            var dep = getRandomArbitrary(-depth, depth)
            return {
                x: getRandomArbitrary(0, viewWidth) - (viewWidth / 2),
                y: getRandomArbitrary(0, viewHeight) - (viewHeight / 2),
                // x: getRandomArbitrary(0, viewWidth + Math.tan(100) * depth) - (viewWidth / 2) * (depth / Math.tan(100)),
                // y: getRandomArbitrary(0, viewHeight + Math.tan(100) * depth) - (viewHeight / 2) * (depth / Math.tan(100)),
                z: dep
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
            // Size
        let sizes = []

        for (var i = 0; i < instances; ++i) {
            var obj = starInit();
            // coordinates
            offsets.push(obj.x, obj.y, obj.z);
            // Math.random()); colors
            colors.push(Math.random(), Math.random(), Math.random(), Math.random());
            // speed
            speeds.push(Math.random());
            // index
            starts.push(i);
            // Size
            sizes.push(getRandomArbitrary(0.1, 2))
                // sizes.push(1)
        }

        var square = initSquares(offsets, starts, speeds, null, colors, sizes)

        square.maxInstancedCount = instances;

        var mat = new THREE.RawShaderMaterial({
            uniforms: this.ufStar,
            vertexShader: require('./shaders/star.vert'),
            fragmentShader: require('./shaders/star.frag'),
            depthTest: false,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        this.mesh.name = 'stars';
    }

    update(delta) {
        if (!this.controler.scene.getObjectByName('stars')) return;

        this.ufStar.time.value = delta * 0.0012;
    }

    hide(_destroy, time = 0.8) {
        if (!this.controler.scene.getObjectByName('stars')) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.ufStar.zfact, time, {
                value: 50.0,
                onComplete: () => {
                    if (_destroy) this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.ufStar.xfact, time, { value: 50.0 });
            TweenLite.to(this.ufStar.yfact, time, { value: 50.0 });
        });
    }
    show(time = 0.8) {
        if (!this.mesh) return;
        return new Promise((resolve, reject) => {
            TweenLite.fromTo(this.ufStar.zfact, time, { value: 40.0 }, { value: this.z });
            TweenLite.fromTo(this.ufStar.xfact, time, { value: 40.0 }, { value: this.z });
            TweenLite.fromTo(this.ufStar.yfact, time, { value: 40.0 }, { value: this.z });
        });
    }
    stop() {
        if (!this.controler.scene.getObjectByName('stars')) return;
        this.mesh.parent.remove(this.mesh);
    }

    start() {
        if (this.mesh) {
            if (this.controler.scene.getObjectByName('stars')) {
                console.log('already in scene')
                return;
            }
            this.controler.scene.add(this.mesh)
            this.show()
            this.controler.animate()
        }
    }
}