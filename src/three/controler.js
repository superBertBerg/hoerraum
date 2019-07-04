import * as THREE from 'three';
import { TweenLite } from 'gsap';
import Ellipse from './ellipse';
import Line from './line';
import Face from './faces';
import Star from './stars';
import Landscape from './landscape';
import FractalTree from './fractal';
import ImgOnPlane from './image';
import BigStars from './bigStar';
import * as config from './config/config.json'
// import TouchTexture from './TouchTexture';

var TrackballControls = require('three-trackballcontrols');


export default class Controler {
    constructor() {

        this.initThree()
        var t0 = performance.now();
        this.line = new Line(this, 'line', config.line)
        this.bigStars = new BigStars(this, 'bigStars', config.bigStars);
        this.bigLand = new Landscape(this, 'bigland', config.bigland)
        this.midLand = new Landscape(this, 'midland', config.midland)
        this.smallLand = new Landscape(this, 'smallland', config.smallland)
        this.matthias = new Face(this, 'matthias', config.matthias);
        this.markus = new Face(this, 'mark', config.markus);
        this.men = new Face(this, 'men', config.men)
        this.matthias.init(config.matthias.imgPath);
        this.markus.init(config.markus.imgPath);
        this.men.init(config.men.imgPath)
        this.ellipse = new Ellipse(this, 'ellipse', config.ellipse)
        this.star = new Star(this, 'stars', config.stars)
        this.head = new ImgOnPlane(this, 'head', config.head)
        var t1 = performance.now();
        // this.initTrack()
        // this.fracTree = new FractalTree(this)
        // this.addToScene(this.bigStars.mesh)
        // this.addToScene(this.head.mesh)

        console.log("time to init", t1 - t0)




        this.animate()
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.camera = new THREE.PerspectiveCamera(
            40, window.innerWidth / window.innerHeight, 1, 10000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 300;

        document.getElementById('host').appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        // CHANGE
        this.clock = new THREE.Clock(true);
        this.time = Date.now();
        this.timer = 0;
    }

    initTrack() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 5.0;
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

        this.time = Date.now() % 1000000;
        this.timer += this.clock.getDelta()

        this.ellipse.update(this.time);
        this.line.update(this.time);
        this.matthias.update(this.timer);
        this.markus.update(this.timer);
        this.men.update(this.timer);
        this.star.update(this.time);
        this.bigLand.update(-0.00001);
        this.midLand.update(0.000008);
        this.smallLand.update(-0.000005);
        this.bigStars.update(this.time)

        // this.controls.update();
        this.render()

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

    addToScene(toAdd) {
        this.scene.add(toAdd)
            // // this.scene.add(this.Ellipse.mesh)
            // var axesHelper = new THREE.AxesHelper(110);
            // axesHelper.size = 100
            // this.scene.add(axesHelper);
            // console.log(axesHelper)

    }
}