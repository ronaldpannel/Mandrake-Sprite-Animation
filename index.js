/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 500;

  class Background {
    constructor(canvasWidth, canvasHeight) {
       this.canvasWidth = canvasWidth;
       this.canvasHeight = canvasHeight;
      this.image = document.getElementById("background");
    }
    draw() {
      ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
    }
  }
  const background = new Background(canvas.width, canvas.height)

  class Mandrake {
    constructor(canvasWidth, canvasHeight) {
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = document.getElementById('mandrake')
      this.scale = 1.75;
      this.spriteWidth = 256;
      this.spriteHeight = 256;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.x = this.canvasWidth / 2 - (this.width * this.scale) / 2;
      this.y = this.canvasHeight / 2 - (this.height * this.scale) / 2;
      this.minFrame = 0;
      this.maxFrame = 355;
      this.frame = 0;
      this.frameX = 9;
      this.frameY = 7;
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width * this.scale,
        this.height * this.scale
      );
    }
    update() {
      this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
      this.frameX = this.frame % 18;
      this.frameY = Math.floor(this.frame / 18);
    }
    setAnimation(newMinFrame, newMaxFrame) {
      this.minFrame = newMinFrame;
      this.maxFrame = newMaxFrame;
      this.frame = this.minFrame;
    }
  }
  const mandrake = new Mandrake(canvas.width, canvas.height);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw()
    mandrake.draw(ctx);
    mandrake.update();

    requestAnimationFrame(animate);
  }
  animate();

  const all = document.getElementById("all");
  all.addEventListener("click", function () {
    mandrake.setAnimation(0, 355);
  });

  const grow = document.getElementById("grow");
  grow.addEventListener("click", function () {
    mandrake.setAnimation(0, 75);
  });
  const wink = document.getElementById("wink");
  wink.addEventListener("click", function () {
    mandrake.setAnimation(76, 112);
  });
  const float = document.getElementById("float");
  float.addEventListener("click", function () {
    mandrake.setAnimation(113, 262);
  });
  const hide = document.getElementById("hide");
  hide.addEventListener("click", function () {
    mandrake.setAnimation(263, 355);
  });

  //load function end
});
