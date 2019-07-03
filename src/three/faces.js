import * as THREE from 'three';

import TouchTexture from './TouchTexture';

export default class Face {

    constructor(controler, name, config) {
        this.controler = controler;
        this.name = name
        this.x = config.x
        this.y = config.y
        this.divisor = config.pointDivisor
        this.threshold = config.threshold
        this.scaleing = config.scale
        if(window.innerWidth<769) {
            this.divisor *= config.mobMultipyDivisor
        }
    }

    init(src) {
        const loader = new THREE.TextureLoader();


        loader.load(src, (texture) => {
            this.texture = texture;
            this.texture.minFilter = THREE.LinearFilter;
            this.texture.magFilter = THREE.LinearFilter;
            this.texture.format = THREE.RGBFormat;

            this.width = texture.image.width;
            this.height = texture.image.height;
            this.initPoints(true);
            // this.initHitArea();
            // this.initTouch();
            // this.resize();
            // this.show();
        });

    }

    initPoints(discard) {
        this.numPoints = this.width * this.height;

        let numVisible = this.numPoints;
        let threshold = 0;
        let originalColors;

        this.uFace = {
            uTime: { value: 0 },
            uRandom: { value: 1.0 },
            uDepth: { value: 2.0 },
            uSize: { value: 5.0 },
            uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
            uTexture: { value: this.texture },
            uTouch: { value: null },
        };

        if (discard) {
            // discard pixels darker than threshold #22
            numVisible = 0;
            threshold = 34;

            const img = this.texture.image;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = this.width;
            canvas.height = this.height;
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, 0, this.width, this.height * -1);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            originalColors = Float32Array.from(imgData.data);

            for (let i = 0; i < this.numPoints; i++) {
                if (originalColors[i * 4 + 0] > threshold) {
                    if (i % 2 == 0) numVisible++;
                }

            }

            // console.log('numVisible', numVisible, this.numPoints);
        }

        const material = new THREE.RawShaderMaterial({
            uniforms: this.uFace,
            vertexShader: require('./shaders/particle.vert'),
            fragmentShader: require('./shaders/particle.frag'),
            depthTest: false,
            transparent: true,
            // blending: THREE.AdditiveBlending
        });

        const square = new THREE.InstancedBufferGeometry();

        // positions
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

        // index
        square.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

        const indices = new Uint16Array(numVisible);
        const offsets = new Float32Array(numVisible * 3);
        const angles = new Float32Array(numVisible);

        for (let i = 0, j = 0; i < this.numPoints; i++) {
            if ((discard && originalColors[i * 4 + 0] <= threshold) || !(i % this.divisor == 0)) continue;

            offsets[j * 3 + 0] = i % this.width;
            offsets[j * 3 + 1] = Math.floor(i / this.width);

            indices[j] = i;

            angles[j] = Math.random() * Math.PI;
            j++;
        }
        square.addAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
        square.addAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
        square.addAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));

        this.mesh = new THREE.Mesh(square, material);
        this.mesh.name = this.name;
        this.mesh.scale.set(this.scaleing, this.scaleing, 1)
            // this.mesh.translateX(this.x)
    }

    // initTouch() {
    //     // create only once
    //     if (!this.touch) this.touch = new TouchTexture(this);
    //     this.object3D.material.uniforms.uTouch.value = this.touch.texture;
    // }

    // initHitArea() {
    //     const geometry = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
    //     const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, depthTest: false });
    //     material.visible = false;
    //     this.hitArea = new THREE.Mesh(geometry, material);
    //     this.container.add(this.hitArea);
    // }

    // addListeners() {
    //     this.handlerInteractiveMove = this.onInteractiveMove.bind(this);

    //     this.webgl.interactive.addListener('interactive-move', this.handlerInteractiveMove);
    //     this.webgl.interactive.objects.push(this.hitArea);
    //     this.webgl.interactive.enable();
    // }

    // removeListeners() {
    //     this.webgl.interactive.removeListener('interactive-move', this.handlerInteractiveMove);

    //     const index = this.webgl.interactive.objects.findIndex(obj => obj === this.hitArea);
    //     this.webgl.interactive.objects.splice(index, 1);
    //     this.webgl.interactive.disable();
    // }

    // ---------------------------------------------------------------------------------------------
    // PUBLIC
    // ---------------------------------------------------------------------------------------------

    update(delta) {
        // if (!this.controler.scene.getObjectByName('face')) return;
        // if (this.touch) this.touch.update();
        if (this.mesh) {

            this.uFace.uTime.value = delta;
        }
    }

    show(time = 1.0) {
        TweenLite.fromTo(this.uFace.uSize, time, { value: 0.1 }, { value: .8 });
        TweenLite.to(this.uFace.uRandom, time, { value: 3.0 });
        TweenLite.fromTo(this.uFace.uDepth, time * 1.5, { value: 40.0 }, { value: 4.0 });

        // this.addListeners();
    }

    hide(time = 0.8) {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        return new Promise((resolve, reject) => {
            TweenLite.to(this.uFace.uRandom, time, {
                value: 5.0,
                onComplete: () => {
                    this.stop();
                    resolve();
                }
            });
            TweenLite.to(this.uFace.uDepth, time, { value: -20.0, ease: Quad.easeIn });
            TweenLite.to(this.uFace.uSize, time * 0.8, { value: 0.0 });

            // this.removeListeners();
        });
    }

    stop() {
        if (!this.controler.scene.getObjectByName(this.name)) return;
        this.mesh.parent.remove(this.mesh);
    }

    start() {
        // console.log(this.mesh)
        if (this.mesh) {
            // if (this.controler.scene.getObjectByName(this.name)) return;
            this.controler.scene.add(this.mesh)
            this.show()
        }
    }

    move(xto, yto, time = 0.8) {
        if (!this.mesh) return;
        TweenLite.to(this.mesh.position, time, { x: xto });
        TweenLite.to(this.mesh.position, time, { y: yto });
    }
    moveToStart(time = 0.8) {
        if (!this.mesh) return;
        TweenLite.to(this.mesh.position, time, { x: this.x });
        TweenLite.to(this.mesh.position, time, { y: this.y });
    }
    setScale(sym) {
        this.mesh.scale.set(sym, sym, 1);
    }

    // ---------------------------------------------------------------------------------------------
    // EVENT HANDLERS
    // ---------------------------------------------------------------------------------------------

    resize() {
        if (!this.mesh) return;

        const scale = this.controler.fovHeight / this.height;
        // console.log(scale)
        // this.mesh.scale.set(0, scale, 1);
        // this.hitArea.scale.set(scale, scale, 1);
    }

    // onInteractiveMove(e) {
    //     const uv = e.intersectionData.uv;
    //     if (this.touch) this.touch.addTouch(uv);
    // }
}