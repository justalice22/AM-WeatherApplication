function findsearchresult(event){
    event.preventDefault();
    let searchinput = document.querySelector("#search-form-value");
    let cityElement = document.querySelector("#city-name");
    cityElement.innerHTML = searchinput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", findsearchresult);