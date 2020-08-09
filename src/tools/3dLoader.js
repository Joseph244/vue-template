import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
let Wave = {
    waveObj: null,
    renderer: null,
    wave: function(wavefbxUrl, flag) {
        let container, controls;
        let camera, scene, renderer, light;
        let that = this;

        init();

        function init() {
            camera = new THREE.PerspectiveCamera(45, 384 / 256, 0.1, 1000);

            scene = new THREE.Scene();

            that.renderer = new THREE.WebGLRenderer({
                alpha: true
            });
            that.renderer.setPixelRatio(window.devicePixelRatio);
            that.renderer.setSize(384, 256);
            that.renderer.setClearColor(0x000000, 0);

            // controls, camera
            controls = new OrbitControls(camera, that.renderer.domElement);
            controls.target.set(0, 12, 0);
            camera.position.set(2, 18, 350);
            controls.update();

            // model
            let loader = new FBXLoader();
            loader.load(wavefbxUrl, object => {
                debugger;
                // object.position.y += 50;
                that.waveObj = object.children;
                // that.waveObj.children[0].children[0].material.color.b = 0.98;
                // that.waveObj.children[0].children[0].material.color.g = 0.97;
                // that.waveObj.children[0].children[0].material.color.r = 0.21;
                // that.waveObj.children[0].children[0].material.transparent = true;
                // that.waveObj.children[0].children[0].material.opacity = 0.6;
                scene.add(that.waveObj);

                // window.addEventListener( 'resize', onWindowResize, false );

                let ambiColor = '#ffffff';
                light = new THREE.AmbientLight(ambiColor); // 设置颜色
                scene.add(light);

                // animate();
            });
        }

        // function onWindowResize() {
        //
        //   camera.aspect = container.clientWidth / container.clientHeight;
        //   camera.updateProjectionMatrix();
        //
        //   renderer.setSize(container.clientWidth, container.clientHeight);
        //
        // }

        function animate() {
            // if (that.waveObj && flag) {
            //     // that.waveObj.rotation.y += 0.005;
            // }
            render();

            if (that.waveObj) {
                requestAnimationFrame(animate);
                // console.log('wave');
            }
        }

        function render() {
            that.renderer.render(scene, camera);
        }
    }
};

export default Wave;
