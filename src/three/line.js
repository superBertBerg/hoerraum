import * as THREE from 'three';
import { TweenLite } from 'gsap';
import { initSquares } from './components/constructsquares'
import { getRandomArbitrary } from './utils/helpers.utils'
import { cpus } from 'os';

export default class Line {

    constructor(controler, name, config) {
        this.controler = controler
        this.name = name

        this.init(config.instances, config.waves, config.width, config.xfact, config.yfact, config.zfact, config.xDiffStart, config.xDiffDest, config.yDiffStart, config.yDiffDest, config.zDiffStart, config.zDiffDest)
    }

    init(instances, waves, width, xfact, yfact, zfact, xDiffStart, xDiffDest, yDiffStart, yDiffDest, zDiffStart, zDiffDest) {
        var xProgress = -width

        this.x = xfact
        this.y = yfact
        this.z = zfact

        this.uniline = {
            time: { value: 1.0 },
            xf: { value: xfact },
            yf: { value: yfact },
            zf: { value: zfact },
            xversch: { value: 0 },
            yversch: { value: -15 }
        }

        // spark coordinates
        let linex = []
            // speed z axe
        let speeds = []
            // index get pix start pos
        let starts = []
            // colors
        let colors = []
            // diffuse
        let diffuses = []

        var wave = 0
        for (var j = 0; j < waves; ++j) {
            var howwavy = getRandomArbitrary(2, 7)
                // console.log(howwavy)
            for (var i = 0; i < instances / waves; ++i) {
                var xdiffuse = getRandomArbitrary(xDiffStart, xDiffDest)
                var ydiffuse = getRandomArbitrary(yDiffStart, yDiffDest)
                var zdiffuse = getRandomArbitrary(zDiffStart, zDiffDest)
                    // coordinates
                linex.push(xProgress += (width * 2) / (instances / waves));
                // console.log(obj.x, obj.y)
                // speed
                speeds.push(Math.random());
                // index
                starts.push(wave);
                // diffusion
                diffuses.push(xdiffuse, ydiffuse, zdiffuse)

                colors.push(Math.random(), Math.random(), Math.random(), Math.random());

                wave += (howwavy * Math.PI / 1000)
                    // console.log(wave)
            }
            wave = Math.random()
            xProgress = -width
        }
        var square = initSquares(null, starts, speeds, diffuses, colors, null, linex)
        square.maxInstancedCount = instances;

        var mat = new THREE.RawShaderMaterial({
            uniforms: this.uniline,
            vertexShader: require('./shaders/line.vert'),
            fragmentShader: require('./shaders/line.frag'),
            depthTest: false,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        this.mesh.name = this.name;
        this.mesh.scale.set(6, 6, 1)
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    update(delta) {
        this.uniline.time.value = delta * 0.00025;
    }

    hide(time = 0.8) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uniline.xf, time, {
                // value: 500.0,
                onComplete: () => {
                    this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.uniline.yf, time, { value: 500.0 });
            TweenLite.to(this.uniline.zf, time * 0.8, { value: -500.0 });

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
                // TweenLite.fromTo(this.uniline.xf, time, { value: 500.0 }, { value: this.x });
                TweenLite.fromTo(this.uniline.yf, time, { value: 500.0 }, { value: this.y });
                TweenLite.fromTo(this.uniline.zf, time * 0.8, { value: 500.0 }, { value: this.z });
            });
        }
    }
}