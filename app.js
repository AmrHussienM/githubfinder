const searchBtn=document.querySelector("#btnSearch");
const massage=document.querySelector(".massage");
const wrapperProfile=document.getElementById("wrapper-profile");
const wrapperProjects=document.getElementById("wrapper-projects");
const clientId = "6a8837a20aa1cb6ea9c7";
const clientSecret = "9a4e3607054c7b348e585d0d7e36226d4ce93a7b";


searchBtn.addEventListener("click",showData);


function handle(e){
    if(e.key === "Enter"){
        e.preventDefault();
        showData(e);
    }

    return false;
}

// function notFound() {
//     const notFound = document.getElementById("notFound");
//     notFound.innerHTML = "User Not Found";

//   }

function showData(){
    const inputValue=document.querySelector("#inputSearch").value.trim();
    fetch(`https://api.github.com/users/${inputValue}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((response) => {
        if(!response.ok ){ 
            massage.classList.remove('d-none');
            setTimeout(removeMassage, 3000);
            function removeMassage() {
                massage.classList.add('d-none');
            }
        }
        return response.json();
    })
    .then((data)=>{
        let html ="";
        if(data.id){
            html +=`<div class="user-card border-dotted">
                        <div class="img-card">
                            <div class="avtar">
                                <img src="${data.avatar_url}" alt="avtar">
                            </div>
                            <h1>${data.name}</h1>
                        </div>
                        <div class="info-card">
                            <a href="${data.html_url}" target="_blank" class="btn btn-dark">Visit GitHub Profile</a>
                            <p><b>Username: </b>${data.login}</p>
                        </div>
    
                    </div>
                    <div class="user-card border-dotted statistics">
                        <div class="bg-red">Followers: <span>${data.followers}</span></div>
                        <div class="bg-green">Followers: <span>${data.following}</span></div>
                        <div class="bg-alpha">Public Repos: <span>${data.public_repos}</span></div>
                        <div class="bg-dark">Public Gists: <span>${data.public_gists}</span></div>
                    </div>
                    `;

                    
                    fetch(`https://api.github.com/users/${inputValue}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`)//fetch(`https://api.github.com/users/${inputValue}/repos?client_id=${clientId}&client_secret=${clientSecret}`)
                    .then((response) => {
                            // if(!response.ok){ 
                            //     massage.classList.remove('d-none');
                            //     setTimeout(removeMassage, 3000);
                            //     function removeMassage() {
                            //     massage.classList.add('d-none');
                            
                            //     }
                            // }
                            return response.json();
                            })
                            .then((repos)=>{
                                
                            let output = "";
                            
                                repos.forEach((repo)=>{
                                    output +=`<div class="last-projects">
                                            <div class="user-card border-dotted project">
                                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                            </div>
                                        </div>`;
                                        
                            });
                        
                            wrapperProjects.innerHTML = output;
                        
                            });
    

        }
        wrapperProfile.innerHTML = html;
        wrapperProjects.innerHTML="";
           
    });

}

