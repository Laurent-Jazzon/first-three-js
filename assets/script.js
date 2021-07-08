import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 2;
    const far = 10000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 50;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();


    {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            '/assets/img/cube/right-375.jpg',    // LEFT
            '/assets/img/cube/left-375.jpg',   // RIGHT
            '/assets/img/cube/up-375.jpg',      // UP
            '/assets/img/cube/down-375.jpg',    // DOWN
            '/assets/img/cube/back-375.jpg',    // BACK
            '/assets/img/cube/front-375.jpg',   // FRONT
        ]);
        scene.background = texture;
    }


    // LIGHT 1
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(2, 3, 4);
        scene.add(light);
    }

    // LIGHT 2
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-3, 3, 4);
        scene.add(light);
    }

    // CHASSI
    const geometry = new THREE.BoxGeometry(17, 4, 10);

    function makeInstance(geometry, color, x, y, z) {
        const material = new THREE.MeshPhongMaterial({ color });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.y = y;
        cube.position.z = z;

        return cube;
    }

    // WHEELS
    const wheels = new THREE.CylinderGeometry(2, 2, 12, 50);

    function createWheel(wheels, color, x, y, z) {
        const wheelMat = new THREE.MeshPhongMaterial({ color });

        const roue = new THREE.Mesh(wheels, wheelMat);
        scene.add(roue);

        roue.position.x = x;
        roue.position.y = y;
        roue.position.z = z;
        roue.rotation.x = 1.56;

        return roue
    }

    // COCKPIT
    const cockpit = new THREE.BoxGeometry(10, 5, 9);

    function createCockpit(cockpit, color, x, y, z) {
        const cockpitMat = new THREE.MeshPhongMaterial({ color });

        const cock = new THREE.Mesh(cockpit, cockpitMat);
        scene.add(cock);

        cock.position.x = x;
        cock.position.y = y;
        cock.position.z = z;

        return cock
    }

    // GROUND 
    const ground = new THREE.BoxGeometry(1000, 10, 1000);

    function createGround(ground, color, x, y, z) {
        const groundMat = new THREE.MeshPhongMaterial({ color });

        const sol = new THREE.Mesh(ground, groundMat);
        scene.add(sol);

        sol.position.x = x;
        sol.position.y = y;
        sol.position.z = z;

        return sol;
    }

    // INSTANCING
    makeInstance(geometry, 0xff3300, 1, 0, 0);
    createWheel(wheels, 0x808080, -4, -1.5, 0);
    createWheel(wheels, 0x808080, 5, -1.5, 0);
    createCockpit(cockpit, 0xffffff, 0, 3, 0)
    createGround(ground, 0x339933, 0, -8.5, 0)

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    }
    render();

    controls.addEventListener('change', render);
    window.addEventListener('resize', render);

    // note: this is a workaround for an OrbitControls issue
    // in an iframe. Will remove once the issue is fixed in
    // three.js
    window.addEventListener('mousedown', (e) => {
        e.preventDefault();
        window.focus();
    });
    window.addEventListener('keydown', (e) => {
        e.preventDefault();
    });
}

main();