import * as THREE from 'three';
import { TweenLite } from 'gsap';
const Complex = require('three-simplicial-complex')(THREE);

export default class FractalTree {
    constructor(controler) {
        this.controler = controler;


        this.init()
    }
    Random(seed) {
        this.seed = seed
        this.rand = function() {
            let x = Math.sin(this.seed) * 10000
            this.seed++
                return x - Math.floor(x)
        }

        this.gaussian = function(mean, std) {
            var rand = 0;
            for (var i = 0; i < 6; i += 1) {
                rand += this.rand();
            }

            return ((rand - 3) / 6) * std + mean;
        }

        this.unif = function(a, b) {
            return this.rand() * (b - a) + a
        }
    }
    init() {
        /* CONGFIG TREE */
        let config = {
            maxDepth: 11,
            scale: 25,
            lineWidth: 22,
            lineWidthFalloff: 1.55,
            lengthVar: 10,
            branchiness: 0.04,
            curveAmount: 0,
            upAmount: 0,
            spread: 0.35,
            seed: 1
        }

        /* CONGFIG TREE */
        // let treeGeom = new THREE.BufferGeometry();
        let vertices = []
        let scale = []
        let arr = []

        let random = new this.Random(config.seed)
        arr.push(0)
        arr.push(0)
        arr.push(1)

        function tree(x, y, angle, depth, random, config, ctx) {
            if (depth >= config.maxDepth) {
                return
            }

            let _x = x
            let _y = y
            let _angle = angle
            let length = (config.scale / depth) * random.gaussian(1, config.lengthVar)
            let segments = length / 10

            ctx = config.lineWidth / (Math.pow(config.lineWidthFalloff, depth))
                // ctx.lineWidth = config.lineWidth / (Math.pow(config.lineWidthFalloff, depth))
                // ctx.strokeStyle = "rgb(60,60,60)"
                // ctx.lineCap = "round"

            let curve_dir = (random.unif(0, 1) < .5) ? -1 : 1
            let curve = config.curveAmount * curve_dir
            if (depth == 1) {
                curve *= .25
            }

            for (let i = 0; i < segments; i++) {

                let up = (angle < -Math.PI / 2) ? Math.PI / 2 - angle : angle - Math.PI / 2

                _angle += curve + (up * config.upAmount * depth)
                _x = x + 10 * Math.cos(angle)
                _y = y + 10 * Math.sin(angle)
                vertices.push([x, y])
                vertices.push([_x, _y])
                    // vertices.push(1)
                    // vertices.push(_x)
                    // vertices.push(_y)
                    // vertices.push(1)
                scale.push(ctx)
                    // scale.push(ctx)
                var steigung = (x - _x) / (y - _y)
                var distance = Math.sqrt((x - _x) * (x - _x) + (y - _y) * (y - _y))
                x = _x
                y = _y

                // console.log(steigung, (x - _x), (y - _y))

                for (var j = 0; j < distance; ++j) {
                    console.log(distance)
                    arr.push(x + j)
                    arr.push(y + steigung * j)
                    arr.push(1)
                }

                if (distance < 1) {
                    console.log(distance)
                    var dist = distance / 2
                    arr.push(x + dist)
                    arr.push(y + steigung * dist)
                    arr.push(1)
                }



                angle = _angle

                if (random.unif(0, 1) < config.branchiness) {
                    let dir = (random.unif(0, 1) < .5) ? -1 : 1
                    tree(x, y, angle + (config.spread / 2 * dir), depth + 1, random, config, ctx)
                        // scale.push(config.lineWidth / (Math.pow(config.lineWidthFalloff, depth)))
                    ctx = config.lineWidth / (Math.pow(config.lineWidthFalloff, depth))
                }
            }

            let dir = (random.unif(0, 1) < .5) ? -1 : 1
            tree(x, y, angle + (config.spread * dir), depth + 1, random, config, ctx)
            tree(x, y, angle + (config.spread * -dir), depth + 1, random, config, ctx)
                // LEAFS
                // if (depth >= config.maxDepth - 2) {

            //     let h = random.unif(160, 170)
            //     let s = random.unif(65, 75)
            //     let l = random.unif(60, 70)
            //     ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`

            //     let r = random.gaussian(4, 1)
            //     ctx.beginPath()
            //     ctx.arc(x, y, r, 0, Math.PI * 2)
            //     ctx.fill()
            // }
        }

        tree(0, 0, -1 * (Math.PI / 2) + random.gaussian(0, .5), 1, random, config, 1)

        console.log(arr, scale.length)

        var mesh = new THREE.BufferGeometry()
        mesh.addAttribute('position', new THREE.Float32BufferAttribute(arr, 3))

        mesh.maxInstancedCount = 100

        var mat = new THREE.PointsMaterial({
            size: 4,
            color: 0x888888
        })

        const mo = new THREE.Points(mesh, mat)
        this.controler.scene.add(mo)

        // console.log(vertices)

        // var stroke = require('extrude-polyline')({
        //     thickness: 20,
        //     cap: 'butt',
        //     join: 'miter',
        //     miterLimit: 10
        // })
        // var test = [
        //     [0, 0],
        //     [25, 25],
        //     [0, 25]
        // ]
        // var mesh = stroke.build(vertices)

        // // add z coordinate

        // for (const position of mesh.positions) {
        //     position[2] = 2
        // }

        // console.log(mesh)

        // const geom = Complex(mesh)

        // console.log(geom)

        // const material = new THREE.MeshBasicMaterial({
        //     color: 0x009900,
        //     side: THREE.DoubleSide
        // });
        // const mee = new THREE.Mesh(geom, material)
        // this.controler.scene.add(mee)
        // treeGeom.addAttribute('position', new THREE.BufferAttribute(Float32Array.from(vertices), 3));
        // treeGeom.addAttribute('scale', new THREE.BufferAttribute(Float32Array.from(scale), 1))
        // var treeMat = new THREE.ShaderMaterial({
        //     vertexShader: document.getElementById('vertexshader').textContent,
        //     fragmentShader: document.getElementById('fragmentshader').textContent,

        // });

        // let mesh4 = new THREE.LineSegments(treeGeom, treeMat)
        setTimeout(() => {


        }, 500);
    }








}