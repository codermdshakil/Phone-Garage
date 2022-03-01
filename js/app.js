
// get containers 
const phonesContainer = document.getElementById('phone-container');
const productsDetailsContainer = document.getElementById('details-container');

const seeAll = (displayStyle) => {
    document.getElementById('see-allBox').style.display = displayStyle;
}

// get Error massage  
const firstError = document.getElementById('error1');
const secoundError = document.getElementById('error3');


// spinnerToggle 
const spinnerToggle  = (displayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
}

// all details Close 
const detailsClose = () => {
    const productsDetailsContainer = document.getElementById('details-container');
    productsDetailsContainer.textContent = "";
}

// laodData from api  
const loadData = () => {
    const searchInput =  document.getElementById('search-input');
    const searchTextValue = searchInput.value;
    const searchText = searchTextValue.toLowerCase();
    searchInput.value = "";

    if(searchText === "" || searchText < 0){
        seeAll("none");
        firstError.style.display = "block";
        phonesContainer.textContent = " ";
        secoundError.style.display ="none";
        productsDetailsContainer.textContent = "";
    }
    else{
        seeAll("Block");
        spinnerToggle('flex');
        firstError.style.display = "none";
        secoundError.style.display ="none";
        phonesContainer.textContent = "";
        productsDetailsContainer.textContent = "";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data));

    }
}

// display data that i get from api 
const displayData = (phones) => {

    const allstatus = phones.status;
    const allData = phones.data;

    if(allstatus === false){
        secoundError.style.display ="block";
        firstError.style.display = "none";
        phonesContainer.textContent = " ";
        productsDetailsContainer.textContent = "";
        spinnerToggle('none');
        seeAll("none");
    }
    else{
        
    const phonefirst20 = allData.slice(0, 20);
    phonesContainer.textContent = "";
    secoundError.style.display ="none";


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
}

const productsDetailsLoad = (id) => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

// card details show in UI  
const displayDetails = (products) => {
    productsDetailsContainer.textContent = "";
    const div = document.createElement('div');
    div.className = "col-lg-8 col-md-11 col-11 d-block m-auto";
    div.innerHTML = `
    <div class="card mb-3 main-card">
        <div class="close-box">
           <img onclick="detailsClose()" src="./media/close.png" alt="">
        </div>
        <div class="row g-0 d-flex align-items-center">
            <div class="col-md-4">
            <img src="${products.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title"> <b>Name:</b> ${products.name}</h3>
                <h5 class="card-title"> <b>Brand:</b> <span class="brand"> ${products.brand ? products.brand:""} </span> </h5>
                <h6 class="card-title"> <b>ReleaseDate:</b> ${products.releaseDate ? products.releaseDate:"ReleaseDate not found"}</h6>
                <h5 class="card-title mainFeatures">MainFeatures:</h5>
                <p><b>Storage :</b> ${products.mainFeatures.storage ? products.mainFeatures.storage:"Not found"}</p>
                <p><b>Memory:</b> ${products.mainFeatures.memory ? products.mainFeatures.memory:"Not found"}</p>
                <p><b>DisplaySize: </b> ${products.mainFeatures.displaySize ? products.mainFeatures.displaySize:"Not found"}</p>
                <p><b>ChipSet:</b> ${products.mainFeatures.chipSet ? products.mainFeatures.chipSet:"Not found"}</p>
                <p><b>Sensors:</b> <span  class="sencor-items"> ${products.mainFeatures.sensors[0]?products.mainFeatures.sensors[0]:''} </span> <span class="sencor-items">${products.mainFeatures.sensors[1]?products.mainFeatures.sensors[1]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[2]?products.mainFeatures.sensors[2]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[3]?products.mainFeatures.sensors[3]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[4]?products.mainFeatures.sensors[4]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[5]?products.mainFeatures.sensors[5]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[6]?products.mainFeatures.sensors[6]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[7]?products.mainFeatures.sensors[7]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[8]?products.mainFeatures.sensors[8]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[9]?products.mainFeatures.sensors[9]:''}</span> <span class="sencor-items">${products.mainFeatures.sensors[10]?products.mainFeatures.sensors[10]:''}</span> <span class="secor-items">${products.mainFeatures.sensors[11]?products.mainFeatures.sensors[11]:''}</span> <span class="secor-items">${products.mainFeatures.sensors[12]?products.mainFeatures.sensors[12]:''}</span>  <span class="secor-items">${products.mainFeatures.sensors[13]?products.mainFeatures.sensors[13]:''}</span>  <span class="secor-items">${products.mainFeatures.sensors[14]?products.mainFeatures.sensors[14]:''}</span> <span class="secor-items">${products.mainFeatures.sensors[15]?products.mainFeatures.sensors[15]:''}</span></p>
                <h5><b class="others">Others: </b></h5>
                <p class="other-element"> <b> NFC: </b> <span class="other-item"> ${products.others?.NFC? products.others?.NFC:"Not found" }, </span></p> 
                <p class="other-element"> <b> Radio</b> <span class="other-item">${products.others?.Radio? products.others?.Radio:"Not found"},  </span> </p>
                <p class="other-element"> <b>Bluetooth: </b>  <span class="other-item"> ${products.others?.Bluetooth? products.others?.Bluetooth:"Not found"}, </span></p> 
                <p class="other-element"> <b> USB: </b> <span class="other-item">  ${products.others?.USB? products.others?.USB:"Not found"}, </span></p> 
                <p class="other-element"> <b> GPS: </b><span class="other-item">${products.others?.GPS? products.others?.GPS:"Not found"}, </span> </p>
                <p class="other-element"> <b>WLAN: </b><span class="other-item"> ${products.others?.WLAN? products.others?.WLAN:"Not found"}, </span></p>
            </div>
            </div>
        </div>
    </div>
    `;
    productsDetailsContainer.appendChild(div);


}

