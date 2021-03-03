const searchbtn = document.getElementById("search-btn");
const image = document.getElementById("profile-pic");
const name1 = document.getElementById("name");
const userName = document.getElementById("username");
const website = document.getElementById("website");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

// The page number the user is currently on
let pageNumber = 1;

// changes page to next page

rightBtn.addEventListener("click", nextPage);

function nextPage() {
  console.log("rait");
}

// changes page to previous page
leftBtn.addEventListener("click", previousPage);

function previousPage() {
  console.log("k");
}

searchbtn.addEventListener("click", getData);

async function getData(e) {
  try {
    const inputValue = document.getElementById("input").value;
    const request = await fetch("https://api.github.com/users/" + inputValue);
    const response = await request.json();

    // Fetching repos of the current user
    const reposRequest = await fetch(response["repos_url"]);
    //returns repos in an array
    const reposResponse = await reposRequest.json();

    // Check the amount of pages needed for the repos
    const reposPageAmount = Math.ceil(reposResponse.length / 3);

    // Add profile picture
    image.src = response["avatar_url"];

    // Add name, username and website
    name1.textContent = response["name"];
    userName.textContent = response["login"];
    website.textContent = response["blog"];

    console.log(reposResponse);
    console.log(response);
  } catch (e) {
    console.log("Error! " + e);
  }
}
