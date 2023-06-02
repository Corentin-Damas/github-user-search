"use strict";
const darkMode = document.querySelectorAll(".dark");
const toggleThemeBtn = document.querySelector(".luminosity-mode");
const themeSelect = document.querySelector(".luminosity-text");
const themeIcon = document.querySelector(".icon-header");
const btnSearch = document.querySelector(".btn-search");

const inputValue = document.querySelector(".form_input").value;

const userName = document.querySelector(".user-name-short");
const userId = document.querySelector(".user-id");
const biography = document.querySelector(".user-biography");
const joinTimer = document.querySelector(".user-join-time");

const nbRepository = document.querySelector(".nb-repository");
const nbFollower = document.querySelector(".nb-follower");
const nbFollowing = document.querySelector(".nb-following");

const localUser = document.querySelector(".social-city-name");
const twitterUser = document.querySelector(".social-twitter-page");
const websiteUser = document.querySelector(".website-user");
const compagniUser = document.querySelector(".user-compagnie");

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
  const inputValue = document.querySelector(".form_input").value;

  console.log(inputValue);
  const getUserInfo = async function () {
    try {
      const response = await fetch(
        `https://api.github.com/users/${inputValue}`
      );
      const jsonData = await response.json();

      //   user not found

      if (jsonData.message == "Not Found") {
        userName.textContent = `No "${inputValue}" on github`;
        userId.textContent = "n/a";

        nbRepository.textContent = 0;
        nbFollower.textContent = 0;
        nbFollowing.textContent = 0;
        joinTimer.textContent = "Joined DD Mmm YYYY";

        //   user found
      } else {
        jsonData.name != null
          ? (userName.textContent = `${jsonData.name}`)
          : (userName.textContent = `${jsonData.login}`);
        userId.textContent = `${jsonData.login}`;

        imgUser.style.backgroundImage = `url(${jsonData.avatar_url})`;
        if (jsonData.bio == null) {
          biography.textContent = "This dev has no bio.";
        }
        if (jsonData.bio != null) {
          biography.textContent = `${jsonData.bio}`;
        }

        nbRepository.textContent = `${jsonData.public_repos}`;
        nbFollower.textContent = `${jsonData.followers}`;
        nbFollowing.textContent = `${jsonData.following}`;

        const dateJoined = new Date(jsonData.created_at);
        let months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let date = dateJoined.getDate();
        let month = dateJoined.getMonth();
        month = months[month];

        if (date < 10) {
          date = "0" + date;
        }

        joinTimer.textContent = `Joined ${date} ${month} ${dateJoined.getFullYear()}`;

        jsonData.location != null
          ? (localUser.textContent = `${jsonData.location}`)
          : (localUser.style.color = "grey");

        jsonData.twitter_username != null
          ? (twitterUser.textContent = `${jsonData.twitter_username}`)
          : (twitterUser.style.color = "grey");

        jsonData.blog != null
          ? (websiteUser.href = `${jsonData.blog}`)
          : (websiteUser.style.color = "grey");

        jsonData.company != null
          ? (compagniUser.textContent = `${jsonData.company}`)
          : (compagniUser.style.color = "grey");
      }
    } catch (err) {
      alert(err);
    }
  };
  getUserInfo();
});
