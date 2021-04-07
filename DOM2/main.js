const css = document.querySelector('h3');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const body = document.getElementById('gradient');

function setGradient() {
  body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;

  css.innerText = body.style.background + ';';
}

window.addEventListener('load', setGradient);

color1.addEventListener('input', setGradient);

color2.addEventListener('input', setGradient);
