const searchbtn = document.getElementById("search-btn");
const image = document.getElementById("profile-pic");
const name1 = document.getElementById("name");
const userName = document.getElementById("username");
const website = document.getElementById("website");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");
let firstSearch = true;
let hideBullets = $(".commit").hide();

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
    let hideBullets = $(".commit").show();

    const earlierInput = sessionStorage.getItem("latest-search");

    if (firstSearch === true) {
      console.log(sessionStorage.getItem("latest-search"));
    }

    // Fetching repos of the current user
    const reposRequest = await fetch(response["repos_url"]);
    //returns repos in an array
    const reposResponse = await reposRequest.json();
    


    // Check the amount of pages needed for the repos
    const reposPageAmount = Math.ceil(reposResponse.length / 3);

    // If same user is searched for multiple times add the repos only the first time
    if (firstSearch) {
      console.log("inputvalue " + inputValue);
      console.log("earlier input " + earlierInput);
      console.log("first search made by the user");
      sessionStorage.setItem("latest-search", "");
      for (let i = 0; i < 3; i++) {
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

        const commitsRequest1 = await fetch(
          "https://api.github.com/repos/" +
            inputValue +
            "/" +
            reposResponse[1]["name"] +
            "/commits"
        );
        const commitsResponse1 = await commitsRequest1.json();
        console.log(commitsResponse)

        console.log("length: " + commitsResponse.length)
        console.log("test ")
        
        


        //error when i is 2 = repository number 3
        //error when j is 1 = commit number 2
        //problem is in the loop conditions
        //adding commits for every repository
        for (let j = 0; j < 3 && j < commitsResponse.length; j++) {
          console.log("repository name " + reposResponse[i]["name"])
          console.log(
            "repository current commit " + commitsResponse[j]["commit"]["message"]
          );
          console.log("#repo" + i + " .repo-name .commit" + j)
          console.log("j " + j);
          console.log("i " + i);
          $("#repo" + i + " .commit" + j).text(commitsResponse[j]["commit"]["message"]);
        }

        //$("#repo" + i + " .commit").text(re)
      }

      for (let i = 0; i < 3; i++) {
        /*       const commitsRequest = await fetch("https://api.github.com/repos/Nicke7117/Calculator/commits")
      const commitsResponse = await commitsRequest.json()
      console.log("commmmmits", commitsResponse) */
      }
      firstSearch = false;
    } else if (inputValue === earlierInput) {
      console.log("user made same search");
    } else {
      // delete the recent repo names
      console.log("user made different search");
      $(".repo-name").textContent = "";

      for (let i = 0; i < 3; i++) {
        $("#repo" + i + " .repo-name").text(reposResponse[i]["name"]);
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
