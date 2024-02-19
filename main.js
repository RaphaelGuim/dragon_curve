class DragonLine {
  constructor(position, direction, length, inside = true) {
    this.position = position;
    this.direction = direction;
    this.direction.setMag(length);
    this.length = length;
    this.splited = false;
    this.inside = inside;
    this.angle = 0.78;
  }

  draw() {
    if (this.splited) return;
    push();
    strokeWeight(4);
    translate(this.position);
    line(0, 0, this.direction.x, this.direction.y);
    pop();
  }
  split(newLength) {
    let dirA = this.direction
      .copy()
      .rotate(this.angle * (this.inside ? -1 : 1));
    let dirB = this.direction
      .copy()
      .rotate(this.angle * (this.inside ? 1 : -1));
    this.splited = true;
    return [
      new DragonLine(this.position.copy(), dirA, newLength),
      new DragonLine(
        this.position.copy().add(dirA.copy()),
        dirB,
        newLength,
        false
      ),
    ];
  }

  splitCurve() {
    if (this.splited) return [];
    let newLength = this.length / (2 * cos(this.angle));
    if (newLength < 5) return [];
    return this.split(newLength);
  }
}

let curves = [];
function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  let dir = createVector(1, 0);
  curves.push(
    new DragonLine(
      createVector(-window.innerWidth / 4 + 50, 180),
      dir,
      window.innerWidth / 2
    )
  );
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background("black");
  translate(window.innerWidth / 2, window.innerHeight / 2);
  scale(0.9);

  curves.forEach((c, index) => {
    stroke(((index + 1) * 360) / curves.length, 100, 100);
    c.draw();
  });

  curves = curves.concat(curves[0].splitCurve());
  curves = curves.splice(1);
}
