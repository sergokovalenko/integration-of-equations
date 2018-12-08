const calcFunctionArgument = (t, x, u) => t / (1 + x * x) + u * x;
const F1 = (x) => Math.pow(Math.E, x) * Math.sin(x);
const W = (z) => (1 - z * z) / (1 + z * z);
const U = (z) => Math.sin(z);
const F2 = (t, x, u) => {
  const arg = calcFunctionArgument(t, x, u);
  return U(arg) * W(x);
}
const calcStep = (a, b, n) => (b - a) / n;
const calcNextX = (a, i, h) => a + (i + 1 / 2) * h;
const calcNextX2 = (a, i, h) => a + i * h;

const calculationsForRectangle = (a, h, n, func) => {
  const calculatedValues = {};
  let result = 0;

  for (let i = 0; i < n; i++) {
    let x = calcNextX(a, i, h);

    calculatedValues[x] = func(x);
    result += calculatedValues[x];
  }

  return {
    result: result * h,
    calculatedValues
  }
};

const calculationsForTrapezium = (a, h, n, func, funcValues = {}) => {
  let result = 0;
  const calculatedValues = { ...funcValues };

  for (let i = 0; i <= n; i++) {
    let x = calcNextX2(a, i, h);
    let funtionResult = 0;

    if (calculatedValues[x] && typeof calculatedValues[x] === 'number') {
      funtionResult = calculatedValues[x];
    } else {
      funtionResult = func(x);
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

const calculationsForParabola = (a, h, n, func, funcValues = {}) => {
  let result = func(calcNextX2(a, 0, h));
  const calculatedValues = { ...funcValues };

  for (let i = 1; i < n; i++) {
    let x = calcNextX2(a, i, h);
    let funtionResult = 0;

    if (calculatedValues[x] && typeof calculatedValues[x] === 'number') {
      funtionResult = calculatedValues[x];
    } else {
      funtionResult = func(x);
      calculatedValues[x] = funtionResult;
    }

    if (i % 2 === 1) {
      result += 4 * funtionResult;
    } else {
      result += 2 * funtionResult;
    }
  }

  result += func(calcNextX2(a, n, h));

  return {
    result: result * h / 3,
    calculatedValues
  };
};

const calculateIntegralUsingType = (a, b, n, func, calculator, eps = 0.001) => {
  let h = calcStep(a, b, n);
  let { result, calculatedValues } = calculator(a, h, n, func);
  let n1 = result;

  n *= 2;
  h = calcStep(a, b, n);
  ({ result, calculatedValues } = calculator(a, h, n, func, calculatedValues));

  let n2 = result;

  while (Math.abs(n2 - n1) > eps) {
    n1 = n2;
    n *= 2;
    h = calcStep(a, b, n);
    ({ result, calculatedValues } = calculator(a, h, n, func, calculatedValues));
    n2 = result;
  }

  return {
    result: n2,
    calculatedValues
  };
};

const calculateIntegral = (from, to, stepCount, type, func = F1, eps = 0.001) => {
  let result = null;

  switch (type) {
    case 0:
      result = calculateIntegralUsingType(from, to, stepCount, func, calculationsForRectangle, eps);
      break;
    case 1:
      result = calculateIntegralUsingType(from, to, stepCount, func, calculationsForTrapezium, eps);
      break;
    case 2:
      result = calculateIntegralUsingType(from, to, stepCount, func, calculationsForParabola, eps);
      break;
  }

  return result;
};

const calculateFirstFunction = (from, to, stepCount, eps = 0.001) => ({
  rectMethod: calculateIntegral(from, to, stepCount, 0, F1, eps).result,
  trapezMethod: calculateIntegral(from, to, stepCount, 1, F1, eps).result,
  parabMethod: calculateIntegral(from, to, stepCount, 2, F1, eps).result
});

const calculateSecondFunction = (c, d, m, u, a2, b2, n) => {
  const result = [];
  const h = calcStep(c, d, m);
  

  for (let i = 0; i < m; i += 1) {
    const t = c + i * h
    const HOFfunc = (x) => F2(t, x, u); // wrapper for F2 function for saving t and u arguments
    const resObject = {
      t,
      rectMethod: calculateIntegral(a2, b2, n, 0, HOFfunc).result,
      trapezMethod: calculateIntegral(a2, b2, n, 1, HOFfunc).result,
      parabMethod: calculateIntegral(a2, b2, n, 1, HOFfunc).result
    };

    result.push(resObject);
  }

  return result;
}

const round = (num) => Math.round(num * 100) / 100;

window.onload = () => {
  const resBlock = document.getElementById('result');
  const n = 50;
  const a1 = 0;
  const b1 = 1;
  const a2 = 0;
  const b2 = Math.PI / 2;
  const c = 0.5;
  const d = 1.5;
  const m = 10;
  const u = -0.01;
  const first = calculateFirstFunction(a1, b1, n);
  const scnd = calculateSecondFunction(c, d, m, u, a2, b2, n);
  let UI = `<div><span>First function result:</span></div>` +
           `<div><span>Reactangle: </span>${first.rectMethod}</div>` +
           `<div><span>Trapezium: </span>${first.trapezMethod}</div>` +
           `<div><span>Parabola: </span>${first.parabMethod}</div>`;

  UI += '<table border="1"><tr><th>i</th><th>ti</th><th>Rectangle</th><th>Trapezium</th><th>Parabola</th></tr>';

  scnd.forEach((el, i) => {
    UI += `<tr><td>${i}</td><td>${round(el.t)}</td><td>${el.rectMethod}</td><td>${el.trapezMethod}</td><td>${el.parabMethod}</td></tr>`;
  });

  UI += '</table>';
  resBlock.innerHTML = UI;
};
