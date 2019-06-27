import * as THREE from 'three'
import { TweenLite } from 'gsap'
import { initSquares } from './components/constructsquares'

export default class Stars {

    constructor(controler, name, config) {
        this.controler = controler
        this.name = name
        this.init(config.instances, config.viewHeight, config.viewWidth, config.depth)
    }

    init(instances, viewHeight, viewWidt, depth) {
        var viewWidth = viewWidt * this.controler.camera.aspect


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
            var dep = getRandomArbitrary(-depth, 0)
            return {
                // x: getRandomArbitrary(0, viewWidth) - (viewWidth / 2),
                // y: getRandomArbitrary(0, viewHeight) - (viewHeight / 2),
                x: getRandomArbitrary(0, viewWidth + Math.tan(0.7853982) * Math.abs(depth)) - (viewWidth + (Math.abs(depth) * Math.tan(0.7853982))) / 2,
                y: getRandomArbitrary(0, viewHeight + Math.tan(0.7853982) * Math.abs(depth)) - (viewHeight + (Math.abs(depth) * Math.tan(0.7853982))) / 2,
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
            sizes.push(getRandomArbitrary(0.1, 2.5))
                // sizes.push(1)
        }

        var square = initSquares(offsets, starts, speeds, null, colors, sizes)

        square.maxInstancedCount = instances;

        var mat = new THREE.RawShaderMaterial({
            uniforms: this.ufStar,
            vertexShader: require('./shaders/star.vert'),
            fragmentShader: require('./shaders/star.frag'),
            depthTest: true,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        this.mesh.name = this.name;
    }

    update(delta) {
        if (!this.controler.scene.getObjectByName(this.name)) return;

        this.ufStar.time.value = delta * 0.0012;
    }

    hide(time = 0.8) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.ufStar.zfact, time, {
                value: 50.0,
                onComplete: () => {
                    this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.ufStar.xfact, time, { value: 50.0 });
            TweenLite.to(this.ufStar.yfact, time, { value: 50.0 });
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
                TweenLite.fromTo(this.ufStar.zfact, time, { value: 40.0 }, { value: this.z });
                TweenLite.fromTo(this.ufStar.xfact, time, { value: 40.0 }, { value: this.z });
                TweenLite.fromTo(this.ufStar.yfact, time, { value: 40.0 }, { value: this.z });
            });
        }
    }
}