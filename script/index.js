// function main() {}

// module.exports = { main }

/**
 * response = {
 *  result: [{}, {}]
 * }
 * 
 * xhr.responseText = jsondata
 */

// Creates a div tag and stored it in a variable called modal
let modal = document.createElement("div");

/*
Set class name of variable modal which is still a div tag that we created
*/
modal.className = "modal fade";

/*
Set id of variable modal which is still a div tag that we created
*/
modal.id = "exampleModal";

/*
Set tabIndex of variable modal which is still a div tag that we created
*/
modal.tabIndex = "-1";

/*
Set aria-Label-By of variable modal which is still a div tag that we created
*/
modal.ariaLabelby = "exampleModalLabel";

/*
Set aria-hidden of variable modal which is still a div tag that we created
*/
modal.ariaHidden = "true";

let modalDialog = document.createElement("div");
modalDialog.className = "modal-dialog";
modal.appendChild(modalDialog);

let modalContent = document.createElement("div");
modalContent.className = "modal-content";
modalDialog.appendChild(modalContent);

let modalHeader = document.createElement("div");
modalHeader.className = "modal-header";
modalContent.appendChild(modalHeader);

let modalTitle = document.createElement("h5");
modalTitle.className = "modal-title";
modalTitle.id = "exampleModalLabel";
modalTitle.innerHTML = "Bio";
modalHeader.appendChild(modalTitle);

let buttonClose = document.createElement("button");
buttonClose.type = "button";
buttonClose.className = "btn-close";
buttonClose.dataset.bsDismiss = "modal";
buttonClose.ariaLabel = "Close";
modalHeader.appendChild(buttonClose);

let modalBody = document.createElement("div");
modalBody.className = "modal-body";
modalContent.appendChild(modalBody);



//created p tag for each option in the bio
let modalBodyParagragh1 = document.createElement("p");
modalBodyParagragh1.id = "modal-name";
let modalBodyParagragh2 = document.createElement("p");
modalBodyParagragh2.id = "modal-gender";
let modalBodyParagragh3 = document.createElement("p");
modalBodyParagragh3.id = "modal-height";
let modalBodyParagragh4 = document.createElement("p");
modalBodyParagragh4.id = "modal-mass";
let modalBodyParagragh5 = document.createElement("p");
modalBodyParagragh5.id = "modal-skin-color";

//set another tag inside the modal body
modalBody.appendChild(modalBodyParagragh1);
modalBody.appendChild(modalBodyParagragh2);
modalBody.appendChild(modalBodyParagragh3);
modalBody.appendChild(modalBodyParagragh4);
modalBody.appendChild(modalBodyParagragh5);

modalDialog.appendChild(modalContent);

// functionto fetch API
async function getAPI() {
    let response = await fetch("https://swapi.dev/api/people/");
    response = await response.json();

    console.log(response, "first call");


    let i = 1;

    //created a div to hold all the items together; pictures and details.
    let characterContainer = document.createElement("div");
    characterContainer.id = "character-container";
    characterContainer.className = "row d-flex justify-content-center";

    //looping throught the API result
    response.results.forEach(result => {

        console.log(result, "first call");
        let container = document.createElement('div');
        container.className = "col-md-3 my-3 d-flex justify-content-center";

        //created a card(bootstrap) to display individual picture and name
        let card = document.createElement('div');
        card.className = "card shadow-lg";
        card.style.width = "18rem";
        container.appendChild(card);

        //Appends images to the individual cards 
        let img = document.createElement('img');
        img.src = `./wk1-image/image${i}.jpg`;
        img.className = "card-img-top";
        img.alt = "image-1";
        img.style.height = "16rem";
        img.style.width = "100%";
        img.style.objectFit = "cover";
        img.style.objectPosition = "top";
        card.appendChild(img);

        //Holds all cards in one div(card-body)
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);

        let paragragh = document.createElement("p");

        let hyperlink = document.createElement("a");
        hyperlink.href = "javascript:void(0);";
        hyperlink.className = "text-decoration-none text-dark";
        hyperlink.innerHTML = result.name;
        cardBody.appendChild(paragragh);
        paragragh.appendChild(hyperlink);

        let hyperlink2 = document.createElement("a");
        hyperlink2.href = "javascript:void(0);";
        hyperlink2.style.color = "#e84b9f";
        hyperlink2.dataset.id = i;
        hyperlink2.addEventListener("click", function (e) {
            getSingleAPI(hyperlink2.dataset.id);
        })
        hyperlink2.dataset.bsToggle = "modal";
        hyperlink2.dataset.bsTarget = "#exampleModal";
        hyperlink2.innerHTML = "Learn more";
        cardBody.appendChild(hyperlink2);

        //Append API to the main container to display
        characterContainer.appendChild(container);

        i++;
    });

    document.querySelector("#body").appendChild(characterContainer);
    document.querySelector("#body").appendChild(modal);
    return response;
}

getAPI();

//onclick it fetches the id from the API
async function getSingleAPI(id) {
    let response = await fetch("https://swapi.dev/api/people/" + id);
    response = await response.json();

    console.log(response, "second call")
    //And concatinates to the specified option 
    modalBodyParagragh1.innerHTML = " Name: " + response.name;
    modalBodyParagragh2.innerHTML = " Gender: " + response.gender;
    modalBodyParagragh3.innerHTML = " Height: " + response.height;
    // modalBodyParagragh4.innerHTML = " Mass: " + response.mass;
    // modalBodyParagragh5.innerHTML = "Skin color: " + response.skin_color;
}
