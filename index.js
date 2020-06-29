let scene, camera, cloudParticles = [];

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0X555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff8c19);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    let greenLight = new THREE.PointLight(0x15906a, 50, 450, 1.7);
    greenLight.position.set(200, 300, 200);
    scene.add(greenLight);

    let yellowLight = new THREE.PointLight(0xb6be67, 50, 450, 1.7);
    yellowLight.position.set(300, 300, 200);
    scene.add(yellowLight);

    let pinkLight = new THREE.PointLight(0xec8bea, 50, 450, 1.7);
    pinkLight.position.set(200, 300, 100);
    scene.add(pinkLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.fog = new THREE.FogExp2(0x2c217c, 0.001);
    renderer.setClearColor(scene.fog.color);
    document.body.appendChild(renderer.domElement);

    let loader = new THREE.TextureLoader();
    loader.load('./assets/smoke.png', texture =>{
        cloudGeo = new THREE.PlaneBufferGeometry(600, 600);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        });

        for(let i=0;i<75; i++){
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                (Math.random()* 1000) - 400, 500, (Math.random()* 500) - 500
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()*5*Math.PI;
            cloud.material.width = 0.75;
            cloud.material.height = 0.60;
            cloud.material.opacity = 0.45;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });
    window.addEventListener('resize', onWindowResize, false);
    setupWebAudio();
    render();
};

const setupWebAudio = () => {
    let analyser;

    let audio = document.createElement('audio');

    audio.src = '/assets/holding_hands.mp3';

    // comment in to have mp3 player apear
    // audio.controls = 'true';  
    document.body.appendChild(audio);

    let audioContext = new AudioContext();

    analyser = audioContext.createAnalyser();

    let source = audioContext.createMediaElementSource(audio);
    source.connect(audioContext.destination);

    // comment out so it doesn't always play
    audio.play();
};

const onWindowResize = () =>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const render = () => {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.001;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
init();