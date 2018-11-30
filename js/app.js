const F = (x) => x * 2;

const calcStep = (a, b, n) => (b - a) / n;
const calcNextX = (a, i, h) => a + (i + 1 / 2) * h;
const calcNextX2 = (a, i, h) => a + i * h;

const calculationsForRectangle = (a, h, n) => {
  let result = 0;
  for (let i = 0; i < n; i++) {
    let x = calcNextX(a, i, h);
    result += F(x);
  }

  return result * h;
}

const calculationsForTrapezium = (a, h, n) => {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    let x = calcNextX2(a, i, h);
    if (i === 0 || i === n) {
      result += F(x) / 2;
    } else {
      result += F(x)
    }
  }

  return result * h;
}

const calculationsForParabola = (a, h, n) => {
  let result = F(calcNextX2(a, 0, h));
  for (let i = 1; i < n; i++) {
    let x = calcNextX2(a, i, h);
    if (i % 2 === 1) {
      result += 4 * F(x);
    } else {
      result += 2 * F(x);
    }
  }

  result += F(calcNextX2(a, n, h));

  return result * h / 3;
}

const calculateIntegral = (a, b, n, type) => {
  const h = calcStep(a, b, n);
  let result = 0;

  switch (type) {
    case 0: 
      result = calculationsForRectangle(a, h, n);
      break;
    case 1:
      result = calculationsForTrapezium(a, h, n);
      break;
    case 2:
      result = calculationsForParabola(a, h, n);
      break;
  }

  return result;
}

window.onload = () => {
  const resBlock = document.getElementById('result');
  const n = 50;
  const a = 0;
  const b = 1;
};
