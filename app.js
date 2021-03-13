const searchbtn = document.getElementById("search-btn");
const image = document.getElementById("profile-pic");
const name1 = document.getElementById("name");
const userName = document.getElementById("username");
const website = document.getElementById("website");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
let firstSearch = true;
let hideBullets = $(".commit").hide();
let everyCommit = document.getElementsByTagName("li")
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

//Removes sessionstorage when window is reloaded
window.onload = function(){
  sessionStorage.removeItem("latest-search")
  console.log("reload")
}

async function getData(e) {
  try {
    const inputValue = document.getElementById("input").value;
    const request = await fetch("https://api.github.com/users/" + inputValue);
    const response = await request.json();
    console.log(inputValue);
    let hideBullets = $(".commit").show();
    const earlierInput = sessionStorage.getItem("latest-search");
    // Fetching repos of the current user
    const reposRequest = await fetch(response["repos_url"]);
    //returns repos in an array
    const reposResponse = await reposRequest.json();

    // Check the amount of pages needed for the repos
    const reposPageAmount = Math.ceil(reposResponse.length / 3);

    // Check if the search is the same as the most recent one
    if (inputValue === earlierInput) {
      console.log("user made same search");
    } else {
      console.log("inputvalue " + inputValue);
      console.log("earlier input " + earlierInput);
      console.log("first search made by the user");
      sessionStorage.setItem("latest-search", "");
      console.log(everyCommit, "esfhbnuise")
     
      //delete the commits of the recent user 
      for(let i = 0; i < everyCommit.length; i++){
        everyCommit[i].textContent = "";
      }


      for (let i = 0; i < 3; i++) {

        //Set repos names
        $("#repo" + i + " .repo-name").text("")
        $("#repo" + i + " .repo-name").text(reposResponse[i]["name"]);
        console.log(
          ($("#repo" + i + " .repo-name").textContent =
            reposResponse[i]["name"])
        );

        //requesting the commits for the current repo
        const commitsRequest = await fetch(
          "https://api.github.com/repos/" +
            inputValue +
            "/" +
            reposResponse[i]["name"] +
            "/commits"
        );
        const commitsResponse = await commitsRequest.json();



        for (let j = 0; j < 3 && j < commitsResponse.length; j++) {
          $("#repo" + i + " .commit" + j).text(
            commitsResponse[j]["commit"]["message"]
          );
        }
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
