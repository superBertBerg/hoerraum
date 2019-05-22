//merge parts of init PLEASE!!

import * as THREE from 'three';
import { TweenLite } from 'gsap'

const glslify = require('glslify');

export default class Ellipse {

    constructor(controler) {
        this.controler = controler

        this.init()
            // this.animate()
    }

    init() {
        var instances = 200
        var xfact = 12
        var yfact = 5
        var zfact = -8
        var diffStart = 0.6
        var diffDest = 1.4

        this.x = xfact
        this.y = yfact
        this.z = zfact


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

        square.setIndex(
            new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
        square.addAttribute(
            'cubePos',
            new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
        square.addAttribute(
            'color',
            new THREE.InstancedBufferAttribute(new Float32Array(colors), 3))
        square.addAttribute(
            'diffuse',
            new THREE.InstancedBufferAttribute(new Float32Array(diffuses), 3))
        square.addAttribute(
            'speed',
            new THREE.InstancedBufferAttribute(new Float32Array(speeds), 1))
        square.addAttribute(
            'start',
            new THREE.InstancedBufferAttribute(new Float32Array(starts), 1))

        square.maxInstancedCount = 200;

        var vertexShader = [
            'precision highp float;', '', 'uniform mat4 modelViewMatrix;',
            'uniform mat4 projectionMatrix;', 'uniform float time;',
            'uniform float xfact;', 'uniform float yfact;', 'uniform float zfact;',
            '', 'attribute vec3 position;', 'attribute vec3 cubePos;',
            'attribute vec3 color;', 'attribute vec3 diffuse;', 'attribute vec2 uv;',
            'attribute float speed;', 'attribute float start;', '', '',
            'varying vec2 vUv;', 'varying vec3 vColor;',
            'void main() {', '   ', '   vUv = uv;', '   vColor = color;',
            '   float dist = normalize(distance(cubePos, position));',
            '   dist = 1.0/distance(cubePos, position);', '   gl_PointSize = 30.0;',
            '   vec3 displace = cubePos;',
            '   displace.x = xfact * cos(start+time*speed) * diffuse.x;',
            '   displace.y = yfact * sin(start+time*speed) * diffuse.y;',
            '   displace.z = zfact * sin(start+time*speed) * diffuse.z;', '   ',
            '   vec3 scale = vec3(dist * 10.,dist * 10.,dist * 10.);', '   ',
            '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position*scale + displace, 1.0 );',
            '', '}'
        ].join('\n');
        var fragmentShader = [
            'precision highp float;', '', 'varying vec2 vUv;', 'varying vec3 vColor;',
            '', '', 'void main() {', '   vec4 color = vec4(0.0);',
            '   vec2 uv = vUv;', '   ', '   vec4 colA = vec4(vColor, 1.0);',
            '   float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;',
            '   vec4 colB = vec4(grey, grey, grey, 1.0);', '   float border = 0.4;',
            '   float radius = 0.5;',
            '   float distinner = radius - distance(uv, vec2(0.5));',
            '   float t = smoothstep(0.0, border, distinner);',
            "   ",
            '   color = colB;', '   color.a = t;', '   ',
            '	gl_FragColor = color;', '   ',
            // "	gl_FragColor = vec4(dist, 0.0, 0.0, 1.0);",
            '', '}'
        ].join('\n');

        var uniforms = {
            time: { value: 1.0 },
            xfact: { value: xfact },
            yfact: { value: yfact },
            zfact: { value: zfact }
        }
        console.log(uniforms)

        var mat = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            // vertexShader: glslify(require('./shaders/ellipsVert.vert')),
            fragmentShader: fragmentShader,
            // fragmentShader: glslify(require('./shaders/ellipsFrag.frag')),
            depthTest: false,
            transparent: true
        });
        this.mesh = new THREE.Mesh(square, mat);
        this.mesh.name = 'ellipse';
    }

    update() {
        if (!this.controler.scene.getObjectByName('ellipse')) return;

        // CHANGE
        var time = Date.now() % 1000000 * 0.0005;
        // CHANGE
        this.controler['ellipse'].mesh.material.uniforms.time.value = time;
        // var diffuse = square.attributes.diffuse.array;
        // square.attributes.diffuse.needsUpdate = true;
        // this.controls.update();
    }

    hide(_destroy, time = 0.8) {
        if (!this.controler.scene.getObjectByName('ellipse')) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.mesh.material.uniforms.xfact, time, {
                value: 500.0,
                onComplete: () => {
                    if (_destroy) this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.mesh.material.uniforms.yfact, time, { value: 500.0 });
            TweenLite.to(this.mesh.material.uniforms.zfact, time * 0.8, { value: -500.0 });

        });
    }
    show(time = 0.8) {
        if (!this.mesh) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.mesh.material.uniforms.xfact, time, { value: this.x });
            TweenLite.to(this.mesh.material.uniforms.yfact, time, { value: this.y });
            TweenLite.to(this.mesh.material.uniforms.zfact, time * 0.8, { value: this.z });
        });
    }
    stop() {
        if (!this.controler.scene.getObjectByName('ellipse')) return;
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