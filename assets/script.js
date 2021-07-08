import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

// RAND COLOR
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 2;
    const far = 10000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100;
    camera.position.y = 25;
    camera.position.x = 15;

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const scene = new THREE.Scene();


    // SKYBOX BACKGROUND
    // {
    //     const loader = new THREE.CubeTextureLoader();
    //     const texture = loader.load([
    //         '/assets/img/cube/right.jpg',    // LEFT
    //         '/assets/img/cube/left.jpg',   // RIGHT
    //         '/assets/img/cube/up.jpg',      // UP
    //         '/assets/img/cube/down.jpg',    // DOWN
    //         '/assets/img/cube/back.jpg',    // BACK
    //         '/assets/img/cube/front.jpg',   // FRONT
    //     ]);
    //     scene.background = texture;
    // }


    // LIGHT 1
    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-4, 10, -10);
        scene.add(light);
    }

    // LIGHT 2
    {
        const color = 0xffffff;
        const intensity = 0.5;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(3, 3, 4);
        scene.add(light);
    }





    // CHASSI
    const geometry = new THREE.BoxGeometry(17, 4, 10);

    function createChassi(geometry) {
        const material = new THREE.MeshPhongMaterial({ color: getRandomColor() });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        return cube;
    }

    // WHEELS
    const wheels = new THREE.CylinderGeometry(2, 2, 12, 50);

    function createWheel(wheels) {
        const wheelMat = new THREE.MeshPhongMaterial({ color: 0x303030 });

        const roue = new THREE.Mesh(wheels, wheelMat);
        scene.add(roue);
        roue.rotation.x = 1.56;

        return roue
    }

    // COCKPIT
    const cockpits = new THREE.BoxGeometry(10, 5, 9);
    function createCockpit(cockpit) {
        const cockpitMat = new THREE.MeshPhongMaterial({ color:0xffffff });

        const cock = new THREE.Mesh(cockpit, cockpitMat);
        scene.add(cock);

        return cock
    }

    // GROUND 
    const ground = new THREE.BoxGeometry(1000, 10, 1000);

    function createGround(ground) {
        const groundMat = new THREE.MeshPhongMaterial({ color: 0x339933});

        const sol = new THREE.Mesh(ground, groundMat);
        scene.add(sol);

        return sol;
    }

    // THE WHOLE CAR
    function createCar() {
        const car = new THREE.Group();

        const backwheels = createWheel(wheels);
        backwheels.position.x = -4;
        backwheels.position.y = -1.5;
        backwheels.position.z = 0;
        car.add(backwheels);

        const frontWheels = createWheel(wheels);
        frontWheels.position.x = 5;
        frontWheels.position.y = -1.5;
        frontWheels.position.z = 0;
        car.add(frontWheels);

        const chassi = createChassi(geometry);
        chassi.position.x = 1;
        chassi.position.y = 0;
        chassi.position.z = 0;
        car.add(chassi);

        const cockpit = createCockpit(cockpits);
        cockpit.position.x = 0;
        cockpit.position.y = 3;
        cockpit.position.z = 0;
        car.add(cockpit);

        return car;
    }





    // INSTANCING

    // car
    const theCar = createCar();
    theCar.position.x = 0;
    theCar.position.y = 0;
    theCar.position.z = 0;
    scene.add(theCar);

    // const secondCar = createCar();
    // secondCar.position.x = 0;
    // secondCar.position.y = 0;
    // secondCar.position.z = 25;
    // scene.add(secondCar);

    // const thirdCar = createCar();
    // thirdCar.position.x = 0;
    // thirdCar.position.y = 0;
    // thirdCar.position.z = 50;
    // scene.add(thirdCar);

    // ground
    const grounder = createGround(ground);
    grounder.position.y = -8.5;


    // RESPONSIVE
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

    // const animate = function () {
    //     requestAnimationFrame( animate );

    //     theCar.position.x += 0.1;
    //     secondCar.position.x += 0.2;
    //     thirdCar.position.x += 0.3;

    //     renderer.render( scene, camera );
    // };

    // animate();
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