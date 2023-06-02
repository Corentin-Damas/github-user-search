"use strict";
const darkMode = document.querySelectorAll(".dark");
const toggleThemeBtn = document.querySelector(".luminosity-mode");
const themeSelect = document.querySelector(".luminosity-text");
const themeIcon = document.querySelector(".icon-header");
const btnSearch = document.querySelector(".btn-search");

const nbRepository = document.querySelector(".nb-repository");
const nbFollower = document.querySelector(".nb-follower");
const nbFollowing = document.querySelector(".nb-following");

const imgUser = document.querySelector(".user-picture");

let darkActive = true;

toggleThemeBtn.addEventListener("click", () => {
  darkMode.forEach((elem) => elem.classList.toggle("dark"));

  darkActive = !darkActive;

  if (darkActive != true) {
    themeSelect.textContent = "Dark";
    themeIcon.innerHTML = `<use xlink:href="icones/icon-moon.svg#moon"></use>`;
  }
  if (darkActive == true) {
    themeSelect.textContent = "Light";
    themeIcon.innerHTML = `<use xlink:href="icones/icon-sun.svg#sun"></use>`;
  }
});

let exempleName = "Corentin-damas";

btnSearch.addEventListener("click", () => {
  console.log("click");
  const getAdvice = async function () {
    try {
      const response = await fetch(
        `https://api.github.com/users/${exempleName}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log(jsonData.avatar_url);

      imgUser.style.backgroundImage = `url(${jsonData.avatar_url})`;

      nbRepository.textContent = `${jsonData.public_repos}`;
      nbFollower.textContent = `${jsonData.followers}`;
      nbFollowing.textContent = `${jsonData.following}`;

      //   adviceText.textContent = `" ${jsonData.slip.advice} "`;
      //   adviceId.textContent = `${jsonData.slip.id}`;
    } catch (err) {
      alert(err);
    }
  };
  getAdvice();
});
