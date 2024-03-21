const baseURL = "https://www.thecolorapi.com";
const logoIcon = document.getElementById("theme-logo");
const body = document.getElementById("body");
const form = document.getElementById("form-section");
let isLightMode = true;

document.addEventListener("click", (event) => {
  const schemeDataSet = event.target.dataset.scheme;
  if (schemeDataSet) {
    navigator.clipboard.writeText(schemeDataSet);
  }
})

document.getElementById("theme-btn").addEventListener("click", toggleTheme)

form.addEventListener("input", makeRequest)

function toggleTheme() {
  isLightMode = !isLightMode
  if (isLightMode) {
    setLightMode()
  } else {
    setDarkMode()
  }
}

function makeRequest() {
  const hexValue = document.getElementById("color-input").value;
  const colorSchemeValue = document.getElementById("color-scheme").value;
  fetchColorScheme(hexValue, colorSchemeValue);
}

function setLightMode() {
  logoIcon.classList.remove("fa-sun");
  logoIcon.classList.add("fa-moon");
  body.classList.remove("dark-mode")
  body.classList.add("light-mode")
}

function setDarkMode() {
  logoIcon.classList.remove("fa-moon")
  logoIcon.classList.add("fa-sun")
  body.classList.remove("light-mode")
  body.classList.add("dark-mode")
}

function fetchColorScheme(hex, scheme) {
  const cleanHex = hex.replaceAll("#", "");
  fetch(`${baseURL}/scheme?hex=${cleanHex}&mode=${scheme}`)
  .then(res => res.json())
  .then(data => {
    const retrievedColors = data["colors"].map( colorItem => {
      return colorItem["hex"]["value"];
    });
    renderSchemeHTML(retrievedColors);
  })
}

function renderSchemeHTML(hexArray) {
  const schemeContainer = document.getElementById("scheme-container");  
  const hexDisplayHTML = hexArray.map( item => {
    return `
    <div class="scheme-container-item">
      <div data-scheme="${item}" class="color-div" style="background-color:${item}"></div>
      <p class="scheme-text">${item}</p>
    </div>
    `
  }).join("");
  schemeContainer.innerHTML = hexDisplayHTML;
}

makeRequest();
