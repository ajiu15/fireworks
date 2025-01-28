<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>�̻���������Ч��</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const numParticles = 500; // �����̻����ӵ�����
// ���û����ߴ�
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ��������ͼ��
const image = new Image();
image.src = 'your-image.jpg';  // �滻Ϊ�������ͼƬ·��
image.onload = function () {
  createFireworks();
};
// �����̻�Ч��
function createFireworks() {
  // �������ĵ�
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  // ���ɶ����̻�Ч��������
  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    const particleEffect = getParticleEffect();
    const color = getColorFromImage(centerX, centerY);
    particles.push(new Particle(centerX, centerY, angle, speed, color, particleEffect));
  }
  animate();
}
// ������ͬ������̻�����Ч��
function getParticleEffect() {
  const effects = ['circle', 'star', 'line'];
  return effects[Math.floor(Math.random() * effects.length)];
}
// �����̻�����
function Particle(x, y, angle, speed, color, effect) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = speed;
  this.color = color;
  this.effect = effect;
  this.life = 0;
  this.maxLife = 60 + Math.random() * 100;
  this.update = function () {
    this.life++;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.speed *= 0.98; // ģ���������
  };
  this.draw = function () {
    ctx.beginPath();
    
    if (this.effect === 'circle') {
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    } else if (this.effect === 'star') {
      for (let i = 0; i < 5; i++) {
        const angleOffset = i * Math.PI / 2.5;
        ctx.lineTo(this.x + Math.cos(angleOffset) * 5, this.y + Math.sin(angleOffset) * 5);
      }
    } else if (this.effect === 'line') {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + Math.cos(this.angle) * 5, this.y + Math.sin(this.angle) * 5);
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}
// ��ȡ������ɫ��ȡͼ������λ�õ���ɫ��
function getColorFromImage(x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
}
// ��������
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ��������ͼ��
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  // ���²����������̻�����
  particles.forEach((particle, index) => {
    if (particle.life > particle.maxLife) {
      particles.splice(index, 1);  // ɾ������ʧ������
    } else {
      particle.update();
      particle.draw();
    }
  </style>
</head>
<body>
  <canvas id="fireworksCanvas"></canvas>
  <script src="fireworks.js"></script>
</body>
</html>
  });
  requestAnimationFrame(animate);
}