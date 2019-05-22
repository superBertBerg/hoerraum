import * as THREE from 'three';
import { TweenLite } from 'gsap';

const glslify = require('glslify');

export default class Line {

    constructor(controler) {
        this.controler = controler

        this.init()
    }

    init() {

        var instances = 2000;
        var waves = 3
        var divider = 40
        var xProgress = -40
        var xfact = 1.8
        var yfact = 2
        var zfact = 0.5
        var diffStart = 0.8
        var diffDest = 1.2
            // var verticalDisplace = -12
        var verticalDisplace = 0

        this.x = xfact
        this.y = yfact
        this.z = zfact

        this.uniline = {
            time: { value: 1.0 },
            xf: { value: xfact },
            yf: { value: yfact },
            zf: { value: zfact }
        }

        // this.uniline.xfact = xfact
        // this.uniline.yfact = yfact
        // this.uniline.zfact = zfact


        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function lineInit(time, zdiffuse) {
            // console.log((Math.abs(xProgress) * 2) / instances)
            xProgress += (divider * 2) / (instances / waves)
            return {
                x: xProgress,
                y: yfact * Math.sin(time) + verticalDisplace,
                z: zfact * zdiffuse
            }
        }


        // spark coordinates
        let offsets = []
            // spark colors ?? all diffrent
        let speeds = []
            // index get pix start pos
        let starts = []
            // diffuse
        let diffuses = []

        var wave = 0
        for (var j = 0; j < waves; ++j) {
            var howwavy = getRandomArbitrary(2, 10)
            console.log(howwavy)
            for (var i = 0; i < instances / waves; ++i) {
                var xdiffuse = getRandomArbitrary(diffStart, diffDest)
                var ydiffuse = getRandomArbitrary(diffStart, diffStart)
                var zdiffuse = getRandomArbitrary(diffStart, diffDest)

                var obj = lineInit(wave, zdiffuse);
                // coordinates
                offsets.push(obj.x, obj.y, obj.z);
                // speed
                speeds.push(Math.random());
                // index
                starts.push(wave);
                // diffusion
                diffuses.push(xdiffuse, ydiffuse, zdiffuse)

                wave += (howwavy * Math.PI / 1000)
                    // console.log(wave)
            }
            console.log(xProgress)
            wave = Math.random()
            xProgress = -divider
        }


        var square = new THREE.InstancedBufferGeometry()

        // blueprint actual geometry
        const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
        positions.setXYZ(0, -0.5, 0.5, 0.0);
        positions.setXYZ(1, 0.5, 0.5, 0.0);
        positions.setXYZ(2, -0.5, -0.5, 0.0);
        positions.setXYZ(3, 0.5, -0.5, 0.0);
        square.addAttribute('position', positions);

        // uvs
        const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
        uvs.setXYZ(0, 0.0, 0.0);
        uvs.setXYZ(1, 1.0, 0.0);
        uvs.setXYZ(2, 0.0, 1.0);
        uvs.setXYZ(3, 1.0, 1.0);
        square.addAttribute('uv', uvs);

        // const 
        // const achsenversch = new THREE.BufferAttribute(new Float32Array(1 * 2), 2);
        // achsenversch.setXY(0, 0, 10);
        // square.addAttribute('versch', achsenversch);

        square.setIndex(
            new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
        square.addAttribute(
            'cubePos',
            new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
        square.addAttribute(
            'diffuse',
            new THREE.InstancedBufferAttribute(new Float32Array(diffuses), 3))
        square.addAttribute(
            'speed',
            new THREE.InstancedBufferAttribute(new Float32Array(speeds), 1))
        square.addAttribute(
            'start',
            new THREE.InstancedBufferAttribute(new Float32Array(starts), 1))

        square.maxInstancedCount = instances;

        var vertexShader = [
            'precision highp float;', '', 'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;', 'uniform float time;',
            'uniform float xf;', 'uniform float yf;', 'uniform float zf;',
            'attribute vec2 versch;', 'attribute vec3 position;', 'attribute vec3 cubePos;',
            'attribute vec3 diffuse;', 'attribute vec2 uv;',
            'attribute float speed;', 'attribute float start;', '', '',
            'varying vec2 vUv;',
            'float rand(vec2 co){',
            '    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
            '}',
            'void main() {', '   ', '   vUv = uv;',
            // '   float dist = normalize(distance(cubePos, position));',
            // '   dist = 1.0/distance(cubePos, position);', '   gl_PointSize = 30.0;',
            '   vec3 displace = cubePos;',
            '   displace.x += versch.x + sin(start+time)*xf*diffuse.x;',
            '   displace.y = -10. + sin(start+time*1.5)*yf*diffuse.y;',
            // '   displace.y = yfact * sin(start+time*speed);',
            '   displace.z = zf * sin(start+time*speed) * diffuse.z;', '   ',
            '   float scaleon = rand(displace.xy);', '   ',
            '   vec3 scale = vec3(0.2, 0.2, 0.2);', '   ',
            '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position * scale + displace, 1.0 );',
            '', '}'
        ].join('\n');
        var fragmentShader = [
            'precision highp float;', '', 'varying vec2 vUv;',
            '', '', 'void main() {',
            '   vec2 uv = vUv;', '   ',
            // '   float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;',
            // '   vec4 colB = vec4(grey, grey, grey, 1.0);', '   
            '   float border = 0.4;',
            '   float radius = 0.5;',
            '   float distinner = radius - distance(uv, vec2(0.5));',
            '   float t = smoothstep(0.0, border, distinner);',
            // "   ",
            '  vec4 color = vec4(1.0, 1.0, 1.0, 0.0);', '   color.a = t;', '   ',
            '	gl_FragColor = color;', '   ',
            // "	gl_FragColor = vec4(1, 0.0, 0.0, 1.0);",
            '', '}'
        ].join('\n');


        console.log(this.uniline)
        var mat = new THREE.RawShaderMaterial({
            uniforms: this.uniline,
            vertexShader: vertexShader,
            // vertexShader: glslify(require('./shaders/ellipsVert.vert')),
            fragmentShader: fragmentShader,
            // fragmentShader: glslify(require('./shaders/ellipsFrag.frag')),
            depthTest: false,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        console.log(this.mesh)
        this.mesh.name = 'line';
    }
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    update() {
        if (!this.controler.scene.getObjectByName('line')) return;

        // CHANGE

        var time = Date.now() % 1000000 * 0.0005
            // CHANGE
        this.uniline.time.value = time;
        // var diffuse = square.attributes.diffuse.array;
        // square.attributes.diffuse.needsUpdate = true;
        // this.controls.update();
    }

    hide(_destroy, time = 0.8) {
        if (!this.controler.scene.getObjectByName('line')) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uniline.xfact, time, {
                value: 500.0,
                onComplete: () => {
                    if (_destroy) this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.uniline.yfact, time, { value: 500.0 });
            TweenLite.to(this.uniline.zfact, time * 0.8, { value: -500.0 });

        });
    }
    show(time = 0.8) {
            if (!this.mesh) return;
            return new Promise((resolve, reject) => {
                TweenLite.to(this.uniline.xfact, time, { value: this.x });
                TweenLite.to(this.uniline.yfact, time, { value: this.y });
                TweenLite.to(this.uniline.zfact, time * 0.8, { value: this.z });
            });

        }
        // hide(_destroy, time = 0.8) {
        //     if (!this.controler.scene.getObjectByName('line')) return;
        //     return new Promise((resolve, reject) => {
        //         TweenLite.to(this.uniline.xf, time, {
        //             value: 500.0,
        //             onComplete: () => {
        //                 if (_destroy) this.stop();
        //                 resolve();
        //             }
        //         });
        //         TweenLite.to(this.uniline.yf, time, { value: 500.0 });
        //         TweenLite.to(this.uniline.zf, time * 0.8, { value: -500.0 });

    //     });
    // }
    show(time = 0.8) {
        if (!this.mesh) return;
        this.wavy()
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uniline.xf, time, { value: this.x });
            TweenLite.to(this.uniline.yf, time, { value: this.y });
            TweenLite.to(this.uniline.zf, time * 0.8, { value: this.z });
        });
    }
    wavy() {
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uniline.yf, 5, {
                // ease: Elastic.easeOut.config(1, 0.3),
                // // y: -500,
                value: 200,
                onComplete: () => {
                    console.log('again')
                    this.wavy()
                }
            });
        });
    }

    stop() {
        if (!this.controler.scene.getObjectByName('line')) return;
        this.mesh.parent.remove(this.mesh);
    }

    start() {
        if (this.mesh) {
            this.controler.scene.add(this.mesh)
            this.controler.animate()
            this.show()
        }
    }
}