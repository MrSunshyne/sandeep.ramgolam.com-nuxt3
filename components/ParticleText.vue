<template>
    <div class="particle-text-container">
        <canvas ref="canvasRef" @click="textGeneration()"></canvas>
        <div ref="authorRef" class="author">
            {{ props.textList[textIndex].author }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    textList: {
        type: Array,
        default: () => [
            { text: 'If he is free i will see him', author: 'Andrea Pirlo', source: 'Source 1' },
            { text: 'If you emit enough photons at the earth, it will eventually emit a Tesla', author: 'Elon Musk', source: 'Source 2' },
            { text: 'The minimum IQ required to destroy the world drops by one point every 18 months.', author: 'Chomsky', source: 'Source 3' },
            { text: 'Clear is better than clever', author: 'Go Proverbs', source: 's' },
            { text: "I know it's actually not possible, but because of you we have a chance. So, let's give it a try", author: 'Jurgen Klopp', source: 'Source 5' },
        ]
    }
});

const canvasRef = ref(null);
const authorRef = ref(null);
const textIndex = ref(0);

// WebGL variables
let gl;
let program;
let aPosition;
let uResolution;
let uFrame;
let vertexBuffer;
let frame = 0;
let vertices = [];
let dVertices = [];
const vertexCount = 10000 * 4;
const depth = 0;
const smoothness = 6;
const fontSize = 9;
const fontName = 'Arial, Helvetica';
const maxLineWidth = 200; // Maximum width for each line in pixels
const lineHeight = fontSize * 1.4; // Space between lines


const vertexShaderSource = `
  attribute vec4 a_position;
  uniform vec2 u_resolution;
  uniform float u_frame;
  varying vec4 v_position;
  varying float v_frame;
  void main () {
    v_position = a_position;
    v_frame = u_frame;
    v_position.xy /= u_resolution;
    v_position.y *= -1.0;
    
    v_position.xy *= 10.0;
    v_position.z += cos(u_frame / 20.0 + v_position.x * 10.0) * sin(u_frame / 10.0 + v_position.y * 12.0) * 0.02;
    v_position.xy /= (1.0 + v_position.z);
    
    gl_Position = vec4(v_position.xy, 0.0, 1.0);
    gl_PointSize = 3.0;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_position;
  varying float v_frame;
  float pi = 3.141592653589793;
  
  float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
      hue += 1.0;
    else if (hue > 1.0)
      hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
      res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
      res = f2;
    else if ((3.0 * hue) < 2.0)
      res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
      res = f1;
    return res;
  }

  vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;
    
    hsl.x = mod(hsl.x, 360.0);
    hsl.x /= 360.0;

    if (hsl.y == 0.0) {
      rgb = vec3(hsl.z);
    } else {
      float f2;

      if (hsl.z < 0.5)
        f2 = hsl.z * (1.0 + hsl.y);
      else
        f2 = hsl.z + hsl.y - hsl.y * hsl.z;

      float f1 = 2.0 * hsl.z - f2;

      rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
      rgb.g = hue2rgb(f1, f2, hsl.x);
      rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }   
    return rgb;
  }
  
  void main () {
    vec4 col = vec4(hsl2rgb(vec3(v_frame + v_position.z * 2000.0, 1.0, .5)) * v_position.w, 1.0);
    gl_FragColor = col;
  }
`;


const compileShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};


const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    return program;
};

onMounted(() => {
    const canvas = canvasRef.value;
    gl = canvas.getContext('webgl', { alpha: true });

    // Initialize canvas size
    const setSize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    program = createProgram(gl, vertexShader, fragmentShader);

    // Setup WebGL
    aPosition = gl.getAttribLocation(program, 'a_position');
    uResolution = gl.getUniformLocation(program, 'u_resolution');
    uFrame = gl.getUniformLocation(program, 'u_frame');
    vertexBuffer = gl.createBuffer();

    gl.useProgram(program);
    gl.clearColor(0, 0, 0, 0); // Transparent background
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(aPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Set initial resolution
    gl.uniform2fv(uResolution, [canvas.width, canvas.height]);

    // Initialize vertices
    for (let i = 0; i < vertexCount; i++) {
        dVertices.push(0);
    }

    render();
    textGeneration();
});

const render = (timeStamp = performance.now()) => {
    frame += 1;
    gl.uniform1f(uFrame, frame);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Update vertices
    for (let i = 0; i < vertices.length; i += 4) {
        for (let j = 0; j < 4; j++) {
            const idx = i + j;
            dVertices[idx] -= ((dVertices[idx] - vertices[idx]) / smoothness);
        }
    }

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dVertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, dVertices.length / 4);

    requestAnimationFrame(render);
};

const wrapText = (context, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = context.measureText(currentLine + ' ' + word).width;
        
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};

const textGeneration = () => {
    const refCtx = document.createElement('canvas').getContext('2d');
    vertices = [];

    textIndex.value = (textIndex.value + 1) % props.textList.length;

    refCtx.font = `${fontSize}px ${fontName}`;
    const text = props.textList[textIndex.value].text;
    
    // Wrap text into lines
    const lines = wrapText(refCtx, text, maxLineWidth);
    
    // Calculate total height needed for all lines
    const totalHeight = lines.length * lineHeight;
    
    // Find the widest line to determine canvas width
    const maxTextWidth = Math.max(...lines.map(line => refCtx.measureText(line).width));
    const canvasWidth = Math.max(maxTextWidth, maxLineWidth);
    
    // Set canvas dimensions
    refCtx.canvas.width = canvasWidth;
    refCtx.canvas.height = totalHeight;
    
    // Reset font after canvas resize
    refCtx.font = `${fontSize}px ${fontName}`;
    refCtx.textBaseline = "top";
    refCtx.textAlign = "center";  // Center text alignment
    refCtx.clearRect(0, 0, refCtx.canvas.width, refCtx.canvas.height);
    refCtx.fillStyle = "#ff0000";

    // Draw each line centered
    lines.forEach((line, index) => {
        refCtx.fillText(line, canvasWidth / 2, index * lineHeight);
    });

    const { data } = refCtx.getImageData(0, 0, refCtx.canvas.width, refCtx.canvas.height);

    // Generate vertices from text, adjusting for centered layout
    for (let i = 0; i < vertexCount; i += 4) {
        const j = i % data.length;
        const dI = (j / 4 >> 0);
        const x = dI % refCtx.canvas.width - canvasWidth / 2; // Center horizontally
        const y = ((dI / refCtx.canvas.width >> 0) % refCtx.canvas.height) - totalHeight / 2;
        const z = -depth / 2 + Math.random() * depth;
        const v = (data[j] * (data[j + 3] / 255)) / 255;

        vertices.push(x, y, z, v);
    }
};
</script>

<style scoped>
.particle-text-container {
    position: relative;
    width: 100%;
    height: 100%;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
}

.author {
    position: absolute;
    bottom: 40px;
    right: 40px;
    color: white;
    font-family: 'Courier New', monospace;
    font-size: 24px;
}
</style>