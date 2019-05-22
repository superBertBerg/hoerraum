import * as THREE from 'three';
import { TweenLite } from 'gsap';
import Ellipse from './ellipse';
import Line from './line'

var TrackballControls = require('three-trackballcontrols');


export default class Controler {
    constructor() {
        this.initThree()
        this.initTrack()
        this.line = new Line(this)
        this.ellipse = new Ellipse(this)
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.camera = new THREE.PerspectiveCamera(
            40, window.innerWidth / window.innerHeight, 1, 10000);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.z = 50;

        this.addToScene()
        document.getElementById('host').appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    initTrack() {
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 5.0;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        if (this.scene.children.length == 0) return;
        // if(!this.['ellipse'])
        this.ellipse.update();
        this.line.update();

        // console.log(this)
        this.controls.update();
        this.render()
            // console.log('asdf')
        requestAnimationFrame(this.animate.bind(this));
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    addToScene() {
        // this.scene.add(this.Ellipse.mesh)
        var axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }
}