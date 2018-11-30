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

const calculateIntegralUsingRectangleMethod = (a, b, n, eps = 0.001) => {
  let h = calcStep(a, b, n);
  let n1 = calculationsForRectangle(a, h, n);

  n *= 2;
  h = calcStep(a, b, n);
  let n2 = calculationsForRectangle(a, h, n);

  while (Math.abs(n2 - n1) > eps) {
    n1 = n2;
    n *= 2;
    h = calcStep(a, b, n);
    n2 = calculationsForRectangle(a, h, n);
  }

  return h;
}

const calculationsForTrapezium = (a, h, n, funcValues = {}) => {
  let result = 0;
  const calculatedValues = { ...funcValues };

  for (let i = 0; i <= n; i++) {
    let x = calcNextX2(a, i, h);
    let funtionResult = 0;

    if (calculatedValues[x] && typeof calculatedValues[x] === 'number') {
      funtionResult = calculatedValues[x];
    } else {
      funtionResult = F(x);
      calculatedValues[x] = funtionResult;
    }

    if (i === 0 || i === n) {
      result += funtionResult / 2;
    } else {
      result += funtionResult
    }
  }

  return {
    result: result * h,
    calculatedValues
  }  
}

const calculateIntegralUsingTrapeziumMethod = (a, b, n, eps = 0.001) => {
  let h = calcStep(a, b, n);
  let result;
  let calculatedValues;
  ({ result, calculatedValues }) = calculationsForTrapezium(a, h, n);
  let n1 = result;
  n *= 2;
  h = calcStep(a, b, n);
  ({ result, calculatedValues }) = calculationsForTrapezium(a, h, n, calculatedValues);
  let n2 = result;

  while (Math.abs(n2 - n1) > eps) {
    n1 = n2;
    n *= 2;
    h = calcStep(a, b, n);
    ({ result, calculatedValues }) = calculationsForTrapezium(a, h, n, calculatedValues);
    n2 = result;
  }

  return h;
}

const calculationsForParabola = (a, h, n, funcValues = {}) => {
  let result = F(calcNextX2(a, 0, h));
  const calculatedValues = { ...funcValues };

  for (let i = 1; i < n; i++) {
    let x = calcNextX2(a, i, h);
    let funtionResult = 0;

    if (calculatedValues[x] && typeof calculatedValues[x] === 'number') {
      funtionResult = calculatedValues[x];
    } else {
      funtionResult = F(x);
      calculatedValues[x] = funtionResult;
    }

    if (i % 2 === 1) {
      result += 4 * funtionResult;
    } else {
      result += 2 * funtionResult;
    }
  }

  result += F(calcNextX2(a, n, h));

  return {
    result: result * h / 3,
    calculatedValues
  };
}

const calculateIntegralUsingParabolaMethod = (a, b, n, eps = 0.001) => {
  let h = calcStep(a, b, n);
  let result;
  let calculatedValues;
  ({ result, calculatedValues }) = calculationsForParabola(a, h, n);
  let n1 = result;
  n *= 2;
  h = calcStep(a, b, n);
  ({ result, calculatedValues }) = calculationsForParabola(a, h, n, calculatedValues);
  let n2 = result;

  while (Math.abs(n2 - n1) > eps) {
    n1 = n2;
    n *= 2;
    h = calcStep(a, b, n);
    ({ result, calculatedValues }) = calculationsForParabola(a, h, n, calculatedValues);
    n2 = result;
  }

  return h;
}


const calculateIntegral = (a, b, n, type) => {
  let result = 0;

  switch (type) {
    case 0: 
      result = calculateIntegralUsingRectangleMethod(a, b, n);
      break;
    case 1:
      result = calculateIntegralUsingTrapeziumMethod(a, b, n);
      break;
    case 2:
      result = calculationsForParabola(a, b, n);
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
