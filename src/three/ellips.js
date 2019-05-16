import * as THREE from 'three';
import { TweenLite } from 'gsap'
var TrackballControls = require('three-trackballcontrols');


export default class Ellipse {
    constructor() {
        this.container = new THREE.Object3D();
        this.container.name = 'ellips'
        this.initThree()
        this.initTrack()
        this.initElips()
            // this.animate()
    }

    initThree() {
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('host').appendChild(this.renderer.domElement);
        this.camera = new THREE.PerspectiveCamera(
            40, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 50;
        this.light = new THREE.PointLight(0xffffff, 1, Infinity);
        this.camera.add(this.light);

        this.scene.add(this.light);
    }
    initTrack() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 5.0; // need to speed it up a little
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initElips() {
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

        var cubeGeo = new THREE.InstancedBufferGeometry()

        // blueprint actual geometry
        const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
        positions.setXYZ(0, -0.5, 0.5, 0.0);
        positions.setXYZ(1, 0.5, 0.5, 0.0);
        positions.setXYZ(2, -0.5, -0.5, 0.0);
        positions.setXYZ(3, 0.5, -0.5, 0.0);
        cubeGeo.addAttribute('position', positions);

        // uvs
        const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
        uvs.setXYZ(0, 0.0, 0.0);
        uvs.setXYZ(1, 1.0, 0.0);
        uvs.setXYZ(2, 0.0, 1.0);
        uvs.setXYZ(3, 1.0, 1.0);
        cubeGeo.addAttribute('uv', uvs);

        cubeGeo.setIndex(
            new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
        cubeGeo.addAttribute(
            'cubePos',
            new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
        cubeGeo.addAttribute(
            'color',
            new THREE.InstancedBufferAttribute(new Float32Array(colors), 3))
        cubeGeo.addAttribute(
            'diffuse',
            new THREE.InstancedBufferAttribute(new Float32Array(diffuses), 3))
        cubeGeo.addAttribute(
            'speed',
            new THREE.InstancedBufferAttribute(new Float32Array(speeds), 1))
        cubeGeo.addAttribute(
            'start',
            new THREE.InstancedBufferAttribute(new Float32Array(starts), 1))

        cubeGeo.maxInstancedCount = 200;

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

        var mat = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            depthTest: false,
            transparent: true
        });
        this.object3D = new THREE.Mesh(cubeGeo, mat);
        this.container.add(this.object3D)
        this.scene.add(this.container);
        // var axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
        //   stats.update();
    }
    start() {
        if (this.object3D) {
            this.container.add(this.object3D)
            this.animate()
            this.show()
        }
    }
    animate() {
        if (!this.container.children[0]) return;
        var time = Date.now() % 1000000 * 0.0005;
        this.container.children[0].material.uniforms.time.value = time;
        // var diffuse = cubeGeo.attributes.diffuse.array;
        // cubeGeo.attributes.diffuse.needsUpdate = true;
        this.controls.update();
        this.render();
        requestAnimationFrame(this.animate.bind(this));
    }

    // try direct reeference
    hide(_destroy, time = 0.8) {
        if (!this.container.children[0]) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.container.children[0].material.uniforms.xfact, time, {
                value: 500.0,
                onComplete: () => {
                    if (_destroy) this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.container.children[0].material.uniforms.yfact, time, { value: 500.0 });
            TweenLite.to(this.container.children[0].material.uniforms.zfact, time * 0.8, { value: -500.0 });

        });
    }
    show(time = 0.8) {
        if (!this.object3D) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.container.children[0].material.uniforms.xfact, time, { value: this.x });
            TweenLite.to(this.container.children[0].material.uniforms.yfact, time, { value: this.y });
            TweenLite.to(this.container.children[0].material.uniforms.zfact, time * 0.8, { value: this.z });

        });
    }
    stop() {

        this.object3D.parent.remove(this.object3D);
        // var selectedObject = this.scene.getObjectByName(this.object3D.name);
        // console.log(selectedObject)
        // this.scene.remove(selectedObject);
        // console.log(this.scene)
        // animate();
    }

    destroy() {
        if (!this.object3D) return;

        this.object3D.parent.remove(this.object3D);
        this.object3D.geometry.dispose();
        this.object3D.material.dispose();
        this.object3D = null;
    }

}