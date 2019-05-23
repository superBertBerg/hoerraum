import * as THREE from 'three'



export function initSquares(offsets, starts, speeds, diffuses, colors, size) {
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

    // const achsenversch = new THREE.BufferAttribute(new Float32Array(1 * 2), 2);
    // achsenversch.setXY(0, 1, 1);
    // square.addAttribute('versch', achsenversch);

    square.setIndex(
        new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
    square.addAttribute(
        'offset',
        new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3))
    if (diffuses != null) {
        square.addAttribute(
            'diffuse',
            new THREE.InstancedBufferAttribute(new Float32Array(diffuses), 3))
    }
    square.addAttribute(
        'speed', new THREE.InstancedBufferAttribute(new Float32Array(speeds), 1))
    square.addAttribute(
        'start', new THREE.InstancedBufferAttribute(new Float32Array(starts), 1))
    if (size != null) {
        square.addAttribute(
            'size', new THREE.InstancedBufferAttribute(new Float32Array(size), 1))
    }
    if (colors != null) {
        square.addAttribute(
            'color',
            new THREE.InstancedBufferAttribute(new Float32Array(colors), 3))
    }

    return square
}