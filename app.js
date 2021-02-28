console.log(fetch("https://api.github.com/users/defunkt"));

async function API() {
  try {
    let request = await fetch("https://api.github.com/users/defunkt");
    let response = await request.json();
    let userName = response["login"]
    console.log("json! ", response);
    console.log(userName)
    
  } catch (e) {
    console.log(e);
  }
}

API();
