<style lang="less" module>
.firstPage {
}
</style>
<template>
    <div :class="$style.firstPage">
        <div id="model1" style="border:1px solid red; width:900px;height:700px;"></div>
        <div id="WebGL-output" style="border:1px solid red; width:900px;height:700px;"></div>
    </div>
</template>
<script>
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import {} from '@/api'
export default {
    name: 'firstPage',
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null
        };
    },
    computed: {},
    watch: {},
    methods: {
        test(domId = 'WebGL-output') {
            // 创建一个场景（场景是一个容器，用于保存、跟踪所要渲染的物体和使用的光源）
            let container = document.getElementById(domId);
            this.scene = new THREE.Scene();
            // this.scene.background = new THREE.Color(0x050505);
            // 创建一个摄像机对象（摄像机决定了能够在场景里看到什么）
            this.camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 10000);

            // 设置摄像机的位置，并让其指向场景的中心（0,0,0）
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.camera.position.z = 5000;
            // this.camera.lookAt(this.scene.position);

            // 创建一个WebGL渲染器并设置其大小
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(new THREE.Color(0xeeeeee));
            this.renderer.setSize(container.clientWidth, container.clientHeight);

            this.scene.add(new THREE.AmbientLight('#ffffff'));

            var loader = new FBXLoader();
            let that = this;
            loader.load('/3dModels/wave.fbx', object => {
                debugger;
                that.scene.add(object);
                that.animate();
                // 渲染场景
                // this.renderer.render(scene, camera);
            });

            // 将渲染的结果输出到指定页面元素中
            container.appendChild(this.renderer.domElement);
        },
        test2(domId = 'model1') {
            let container = document.getElementById(domId);
            // 创建一个场景（场景是一个容器，用于保存、跟踪所要渲染的物体和使用的光源）
            var scene = new THREE.Scene();

            // 创建一个摄像机对象（摄像机决定了能够在场景里看到什么）
            var camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);

            // 设置摄像机的位置，并让其指向场景的中心（0,0,0）
            camera.position.x = -30;
            camera.position.y = 40;
            camera.position.z = 30;
            camera.lookAt(scene.position);

            // 创建一个WebGL渲染器并设置其大小
            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(new THREE.Color(0xeeeeee));
            renderer.setSize(container.clientWidth, container.clientHeight);

            // 在场景中添加坐标轴
            var axes = new THREE.AxisHelper(20);
            scene.add(axes);

            // 创建一个平面
            var planeGeometry = new THREE.PlaneGeometry(60, 20);
            // 平面使用颜色为0xcccccc的基本材质
            var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
            var plane = new THREE.Mesh(planeGeometry, planeMaterial);

            // 设置屏幕的位置和旋转角度
            plane.rotation.x = -0.5 * Math.PI;
            plane.position.x = 15;
            plane.position.y = 0;
            plane.position.z = 0;

            // 将平面添加场景中
            scene.add(plane);

            // 创建一个立方体
            var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
            // 将线框（wireframe）属性设置为true，这样物体就不会被渲染为实物物体
            var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            // 设置立方体的位置
            cube.position.x = -4;
            cube.position.y = 3;
            cube.position.z = 0;

            // 将立方体添加到场景中
            scene.add(cube);

            // 创建一个球体
            var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
            // 将线框（wireframe）属性设置为true，这样物体就不会被渲染为实物物体
            var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            // 设置球体的位置
            sphere.position.x = 20;
            sphere.position.y = 4;
            sphere.position.z = 2;

            // 将球体添加到场景中
            scene.add(sphere);

            // 将渲染的结果输出到指定页面元素中
            document.getElementById('model1').appendChild(renderer.domElement);

            // 渲染场景
            renderer.render(scene, camera);
        },
        animate() {
            this.renderer.render(this.scene, this.camera);

            requestAnimationFrame(this.animate);
        }
    },
    mounted() {
        this.test2();
        // this.$refs.Model1.append(this.Wave.renderer.domElement);
    }
};
</script>
