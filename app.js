const searchbtn = document.getElementById("search-btn");
const image = document.getElementById("profile-pic");
const name1 = document.getElementById("name");
const userName = document.getElementById("username");
const website = document.getElementById("website");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
let firstSearch = true;

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
    console.log(inputValue);

    const earlierInput = sessionStorage.getItem("latest-search");

    if (firstSearch === true) {

      console.log(sessionStorage.getItem("latest-search"));
    }
    console.log(inputValue === earlierInput);
    console.log("earlier input 1234" + sessionStorage.getItem("latest-search"));

    // Fetching repos of the current user
    const reposRequest = await fetch(response["repos_url"]);
    //returns repos in an array
    const reposResponse = await reposRequest.json();
    console.log("erweop", reposResponse)

    // Check the amount of pages needed for the repos
    const reposPageAmount = Math.ceil(reposResponse.length / 3);

    // If same user is searched for multiple times add the repos only the first time
    if (firstSearch) {
      console.log("inputvalue " + inputValue);
      console.log("earlier input " + earlierInput);
      console.log("first search made by the user")
      sessionStorage.setItem("latest-search", "");
      firstSearch = false;
      for (let i = 0; i < 3; i++) {
        let repoName = document.createElement("P");
        repoName.className = "repo-name";
        repoName.textContent = reposResponse[i]["name"];
        document.getElementById("repo" + i).appendChild(repoName);
      }
    } else if (inputValue === earlierInput) {
      console.log("user made same search")
    } else {
      // delete the recent repo names
      console.log("user made different search")
      $(".repo-name").remove();

      // create elements with the repo names
      for (let i = 0; i < 3; i++) {
        let repoName = document.createElement("P");
        let repos = document.createElement("div");
        repos.className = "repo" + i; 
        repoName.className = "repo-name";
        console.log(i)
        repoName.textContent = reposResponse[i]["name"];
        document.getElementById("repo" + i).appendChild(repoName);
      }
    }

    
    // Add profile picture
    image.src = response["avatar_url"];

    //add the most recent search to local storage to wait for comparison
    sessionStorage.setItem("latest-search", inputValue);
    // Add name, username and website
    name1.textContent = response["name"];
    userName.textContent = response["login"];
    website.textContent = response["blog"];

  } catch (e) {
    console.log("Error! " + e);
  }
}
