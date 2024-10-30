export function toFraction(x: number, tolerance: number = 0.0001) {
  if (x === 0) return "0";
  if (x < 0) x = -x;
  var num = 1,
    den = 1;

  function iterate() {
    var R = num / den;
    if (Math.abs((R - x) / x) < tolerance) return;

    if (R < x) num++;
    else den++;
    iterate();
  }

  iterate();
  if (den === 1) return num.toString();
  return `${num}/${den}`;
}
