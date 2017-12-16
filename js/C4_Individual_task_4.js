var gl;
var shaderProgram;
var vertexBuffer; // буфер вершин
var colorBuffer; //буфер цветов
var ang = 0;
// установка шейдеров
function initShaders() {
    var fragmentShader = getShader(gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = getShader(gl.VERTEX_SHADER, 'shader-vs');

    shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}
// Функция создания шейдера
function getShader(type,id) {
    var source = document.getElementById(id).innerHTML;

    var shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
// установка буферов вершин и индексов
function initBuffers() {

    var vertices = [
        -1,  1,  0.0,
        -1, -1,  0.0,
        1, -1,  0.0,
        1, -1,  0.0,
        -1,  1,  0.0,
        1, 1,  0.0
    ];
    // установка буфера вершин
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 6;
    var сolors = [
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 0.0,
        0.12, 0.57, 0.53
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}

function initBuffers1(angle) {

    var vertices = [
        0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
        0.5, -0.5,  0.0
    ];
    rotateZ(vertices, angle);
    // установка буфера вершин
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    vertexBuffer.itemSize = 3;
    vertexBuffer.numberOfItems = 3;
    var сolors = [
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0
    ];
    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(сolors), gl.STATIC_DRAW);
}
// отрисовка
function draw() {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

function draw1() {

    //rotateZ(vertices, 45);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numberOfItems);
}

function rotateZ(m, angle) {
    var c0 = Math.cos(angle);
    var s0 = Math.sin(angle);
    var c1 = Math.cos(angle + 2*Math.PI/3);
    var s1 = Math.sin(angle + 2*Math.PI/3);
    var c2 = Math.cos(angle - 2*Math.PI/3);
    var s2 = Math.sin(angle - 2*Math.PI/3);

    m[0] = c0*0.5; m[1] = s0*0.5;
    m[3] = c1*0.5; m[4] = s1*0.5;
    m[6] = c2*0.5; m[7] = s2*0.5;
}

function rotate() {
    initBuffers();
    draw();
    initBuffers1(ang);
    draw1();
    ang += 0.01;
    if (ang > 2*Math.PI/3) ang = 0;
}

window.onload=function(){

    var canvas = document.getElementById("canvas3D");
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    if (!gl) {
        alert("Ваш браузер не поддерживает WebGL");
    }
    if(gl){
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;

        initShaders();

        setInterval(rotate, 1000/60);
    }
}