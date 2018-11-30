const F = (x) => x * 2;
const calcStep = (a, b, n) => (b - a) / n;
const calcNextX = (a, i, h) => a + (i + 1 / 2) * h;
const calcNextX2 = (a, i, h) => a + i * h;

const calculationsForRectangle = (a, h, n) => {
  const calculatedValues = {};
  let result = 0;

  for (let i = 0; i < n; i++) {
    let x = calcNextX(a, i, h);

    calculatedValues[x] = F(x);
    result += calculatedValues[x];
  }

  return {
    result: result * h,
    calculatedValues
  }  
};

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
};

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
};

const calculateIntegralUsingType = (a, b, n, calculator, eps = 0.001) => {
  let h = calcStep(a, b, n);
  let result;
  let calculatedValues;
  ({ result, calculatedValues }) = calculator(a, h, n);
  let n1 = result;
  n *= 2;
  h = calcStep(a, b, n);
  ({ result, calculatedValues }) = calculator(a, h, n, calculatedValues);
  let n2 = result;

  while (Math.abs(n2 - n1) > eps) {
    n1 = n2;
    n *= 2;
    h = calcStep(a, b, n);
    ({ result, calculatedValues }) = calculator(a, h, n, calculatedValues);
    n2 = result;
  }

  return {
    result: n2,
    calculatedValues
  };
};

const calculateIntegral = (a, b, n, type, eps = 0.001) => {
  let result = null;

  switch (type) {
    case 0: 
      result = calculateIntegralUsingType(a, b, n, calculationsForRectangle);
      break;
    case 1:
      result = calculateIntegralUsingType(a, b, n, calculationsForTrapezium);
      break;
    case 2:
      result = calculateIntegralUsingType(a, b, n, calculationsForParabola);
      break;
  }

  return result;
};

window.onload = () => {
  const resBlock = document.getElementById('result');
  const n = 50;
  const a = 0;
  const b = 1;
};
