//   Vc表示船的对地航速，thetaC表示船的对地航向，
//   Vs表示视风速，thetaS表示视风向。
function calculateWind(Vc, thetaC, Vs, thetaS) {
    var Vw = Math.sqrt(Math.pow(Vs, 2) + Math.pow(Vc, 2) - 2 * Vs * Vc * Math.cos(thetaS - thetaC));
    var thetaW = thetaS - Math.asin((Vs / Vw) * Math.sin(thetaS - thetaC));
    return [Vw, thetaW];
}

console.log(calculateWind(Vc, thetaC, Vs, thetaS))