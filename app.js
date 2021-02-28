let searchbtn = document.getElementById("search-btn")

searchbtn.addEventListener("click", API)


async function API(e) {

  
  try {

    
    let request = await fetch("https://api.github.com/users/defunkt");
    let response = await request.json();
    let userName = response["login"]
    /* let repo = await fetch("https://api.github.com/repos/octocat/hello-world") */
    /* let respons = await repo.json() */
    console.log("json! ", response);
    console.log(userName)
    
    
  } catch (e) {
    console.log(e);
  }
}

API();


