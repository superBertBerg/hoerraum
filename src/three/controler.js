import * as THREE from 'three';
import { TweenLite } from 'gsap';
import Ellipse from './ellipse';
import Line from './line';
import Face from './faces'
// import TouchTexture from './TouchTexture';

var TrackballControls = require('three-trackballcontrols');


export default class Controler {
    constructor() {
        this.initThree()
        this.initTrack()
        this.line = new Line(this)
        this.ellipse = new Ellipse(this)
        this.face = new Face(this, 105);
        this.face.init('static/images/markus-150.png')
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.camera = new THREE.PerspectiveCamera(
            40, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 300;
        this.addToScene()
        document.getElementById('host').appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // CHANGE
        this.clock = new THREE.Clock(true);
        this.time = Date.now();
        this.timer = 0;
    }

    initTrack() {
        // this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        // this.controls.rotateSpeed = 5.0;
    }

    initTouch() {
        // create only once
        if (!this.touch) this.touch = new TouchTexture(this);
        this.object3D.material.uniforms.uTouch.value = this.touch.texture;
    }

    onWindowResize() {
        // this.camera.aspect = window.innerWidth / window.innerHeight;
        // this.camera.updateProjectionMatrix();

        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.resize()
    }

    animate() {
        if (this.scene.children.length == 0) return;
        // if(!this.['ellipse'])


        this.time = Date.now() % 1000000;
        this.timer += this.clock.getDelta()

        this.ellipse.update(this.time);
        this.line.update(this.time);
        this.face.update(this.timer);
        // console.log(this.line.uniline.yf)
        // console.log(this)
        // this.controls.update();
        this.render()
            // console.log('asdf')
        requestAnimationFrame(this.animate.bind(this));
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        if (!this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.fovHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // if (this.interactive) this.interactive.resize();
        if (this.face) this.face.resize();
    }

    addToScene() {
        // // this.scene.add(this.Ellipse.mesh)
        // var axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);
    }
}