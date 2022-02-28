
/* get containers */
const phonesContainer = document.getElementById('phone-container');
const productsDetailsContainer = document.getElementById('details-container');

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
            <a href="#" onclick="productsDetailsLoad('${phone.slug}')" class="btn btn-primary">Details</a>
        </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    
    });
    spinnerToggle('none');
}


const productsDetailsLoad = (id) => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

const displayDetails = (products) => {
    console.log(products);
    productsDetailsContainer.textContent = "";
    const div = document.createElement('div');
    div.className = "col-lg-8 col-md-6 col-11 d-block m-auto";
    div.innerHTML = `
    <div class="card mb-3">
        <div class="row g-0 d-flex align-items-center">
            <div class="col-md-4">
            <img src="${products.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title"> <b>Name:</b> ${products.name}</h3>
                <h5 class="card-title"> <b>Brand:</b> ${products.brand ? products.brand:""}</h5>
                <h6 class="card-title"> <b>ReleaseDate:</b> ${products.releaseDate ? products.releaseDate:"ReleaseDate not found"}</h6>
                <h5 class="card-title mainFeatures">MainFeatures:</h5>
                <p><b>Storage :</b> ${products.mainFeatures.storage ? products.mainFeatures.storage:"Not found"}</p>
                <p><b>Memory:</b> ${products.mainFeatures.memory ? products.mainFeatures.memory:"Not found"}</p>
                <p><b>DisplaySize: </b> ${products.mainFeatures.displaySize ? products.mainFeatures.displaySize:"Not found"}</p>
                <p><b>ChipSet:</b> ${products.mainFeatures.chipSet ? products.mainFeatures.chipSet:"Not found"}</p>
                <p><b>Sensors:</b> <span>Face ID, </span> <span>accelerometer, </span> <span>gyro,</span> <span>proximity, </span> <span>compass, </span> <span>barometer</span></p>
                <h5>Other:</h5>
                <p><b>WLAN:</b> Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, hotspot <span><b>Bluetooth:</b> 5.0, A2DP, LE</span>  <span><b>NFC:</b> Yes, with A-GPS, GLONASS, GALILEO, BDS, QZSS</span> <span><b>GPS:</b>Yes </span> <span><b>USB:</b>Lightning, USB 2.0</span> </p>
            </div>
            </div>
        </div>
    </div>

    `;

    productsDetailsContainer.appendChild(div);


}




