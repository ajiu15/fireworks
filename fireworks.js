<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>烟花绽放人像效果</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>
  <canvas id="fireworksCanvas"></canvas>

  <script>
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    const numParticles = 500; // 控制烟花粒子的数量

    // 设置画布尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 加载人像图像
    const image = new Image();
    image.src = 'your-image.jpg';  // 替换为你的人像图片路径

    image.onload = function () {
      createFireworks();
    };

    // 创建烟花效果
    function createFireworks() {
      // 绽放中心点
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 生成多种烟花效果的粒子
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        const particleEffect = getParticleEffect();
        const color = getColorFromImage(centerX, centerY);
        particles.push(new Particle(centerX, centerY, angle, speed, color, particleEffect));
      }
      animate();
    }

    // 创建不同种类的烟花粒子效果
    function getParticleEffect() {
      const effects = ['circle', 'star', 'line'];
      return effects[Math.floor(Math.random() * effects.length)];
    }

    // 绘制烟花粒子
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
        this.speed *= 0.98; // 模拟空气阻力
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

        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      };
    }

    // 获取人像颜色（取图像中心位置的颜色）
    function getColorFromImage(x, y) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    }

    // 动画函数
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制人像图像
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // 更新并绘制所有烟花粒子
      particles.forEach((particle, index) => {
        if (particle.life > particle.maxLife) {
          particles.splice(index, 1);  // 删除已消失的粒子
        } else {
          particle.update();
          particle.draw();
        }
      });

      requestAnimationFrame(animate);
    }
  </script>
</body>
</html>