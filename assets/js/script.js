"sterct mode";

// Selecting Elements
const header = document.querySelector(".header");
const section = document.querySelectorAll("section");
const list = document.querySelector(".list");
const lists = document.querySelectorAll("ul li a");
const listItem = Array.from(lists);
const iconMenu = document.querySelector("#icon-menu");
const iconX = document.querySelector("#icon-x");
const overlay = document.querySelector("#overlay");
const GoToTop = document.querySelector("#go-to-top");
const palette = document.querySelector("#palette");
const paletteLarge = document.querySelector("#palette-large");
const colors = document.querySelector(".colors");
const colorsLarge = document.querySelector(".colors-large");
const paletteColorsLarge = document.querySelectorAll(".colors-large li");
const ListPaletteColorsLarge = Array.from(paletteColorsLarge);
const paletteColors = document.querySelectorAll(".colors li");
const ListPaletteColors = Array.from(paletteColors);
const logoImgs = document.querySelectorAll(".logo-img");
const mainColor = window.localStorage.getItem("color_option");
const mainLogo = window.localStorage.getItem("logo_option");

// Check If Local Storage Does Not Contain Aany Color
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
}
// Check If Local Storage Does Not Contain Aany ImagLogo
if (mainLogo !== null) {
  logoImgs.forEach((logoImg) => {
    logoImg.src = mainLogo;
  });
}
// Navbar Activ Links
window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      listItem.forEach((links) => {
        links.classList.remove("active");
        if (sec && !sec.classList.contains("gallery")) {
          let link = document.querySelector(`ul li a[href="#${id}"]`);
          if (link !== null) {
            link.classList.add("active");
          }
        }
      });
    }
  });
  // Sticky Header
  header.classList.toggle("sticky", window.scrollY > 100);

  // Menu Click
  list.classList.add("active-list");
  overlay.style.display = "block";
  list.style.right = "0";

  list.classList.remove("active-list");
  list.style.right = "-50%";

  list.classList.remove("active-list");
  list.style.right = "-50%";
};

// (Show/Hide) Menu
iconMenu.addEventListener("click", () => {
  list.classList.add("active-list");
  overlay.style.display = "block";
  list.style.right = "0";
});

iconX.addEventListener("click", () => {
  list.classList.remove("active-list");
  list.style.right = "-50%";
});

overlay.addEventListener("click", () => {
  list.classList.remove("active-list");
  list.style.right = "-50%";
});

// Change (Color/Imag-Logo) And Saved In Local Storage
const paletteChangeColor = function (palette) {
  palette.addEventListener("click", function () {
    colors.classList.toggle("active");
    colorsLarge.classList.toggle("active");

    function changeLogo(event) {
      const selectedColorClass = event.target.className;
      const selectedColor = selectedColorClass.split(" ")[2];
      const logos = `./assets/images/logo-${selectedColor}.png`;
      logoImgs.forEach((logoImg) => {
        logoImg.src = logos;
      });
      localStorage.setItem("logo_option", logos);
    }

    ListPaletteColorsLarge.forEach((li) => {
      li.addEventListener("click", () => {
        const selectedColor = li.dataset.color;
        document.documentElement.style.setProperty(
          "--main-color",
          selectedColor
        );
        localStorage.setItem("color_option", selectedColor);
      });
      li.addEventListener("click", changeLogo);
    });

    ListPaletteColors.forEach((li) => {
      li.addEventListener("click", () => {
        const selectedColor = li.dataset.color;
        document.documentElement.style.setProperty(
          "--main-color",
          selectedColor
        );
        localStorage.setItem("color_option", selectedColor);
      });
      li.addEventListener("click", changeLogo);
    });
  });
};
paletteChangeColor(paletteLarge);
paletteChangeColor(palette);

// Go To Tob Button
window.addEventListener("scroll", function () {
  if (window.scrollY >= 1000) {
    GoToTop.classList.add("active");
    GoToTop.style.backgroundColor = "var(--main-color)";
  } else {
    GoToTop.classList.remove("active");
  }
});
