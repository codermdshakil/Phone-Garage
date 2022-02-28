
/* get elements  */
const phonesContainer = document.getElementById('phone-container');

/* get Error massage  */
const firstError = document.getElementById('error1');


/* spinnerToggle  */
const spinnerToggle  = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}



// laodData from api 
const loadData = () => {
   
    const searchInput =  document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = "";

    if(searchText === "" || searchText < 0){
        firstError.style.display = "block";
        phonesContainer.textContent = " ";
    }
    
    else{
        spinnerToggle('flex');
        firstError.style.display = "none";
        phonesContainer.textContent = "";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data));

    }
}

const displayData = (phones) => {

    const phonefirst20 = phones.slice(0, 20);
    phonesContainer.textContent = "";
    phonefirst20.forEach(phone => {
        const div = document.createElement('div');
        div.className = "col-lg-4 col-md-6 col-10 d-block m-auto m-md-0";
        div.innerHTML =`
        <div class="card">
        <div class="img-frame">
          <img src="${phone.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h4 class="card-title">Name: ${phone.phone_name}</h4>
            <h5>Brand: <span class="brand-name">${phone.brand}</span></h5>
            <a href="#" class="btn btn-primary">Details</a>
        </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    
    });
    spinnerToggle('none');
}