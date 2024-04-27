let upper = document.querySelector(".upper");

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.classList.add("trans");
        upper.style.transform = "translateY(0)";
        upper.style.opacity = "1";
    }else{
        nav.classList.remove("trans");
        upper.style.transform = "translateY(calc(100% + 21px))";
        upper.style.opacity = "0";
    };
});

upper.addEventListener("click", function(){
    scrollTo(0,0);
});

let search = document.querySelectorAll("#search");
let overlay1 = document.querySelector(".overlay1");
let searchBar = document.querySelector(".searchBar");
let close1 = document.querySelector(".close");

search.forEach((item) => {
    item.addEventListener("click", function(){
        overlay1.style.display = "block";
        setTimeout(() => {
            searchBar.style.transform = "translateY(0)";
        }, 100);
    });
})

close1.addEventListener("click", function(){
    searchBar.style.transform = "translateY(-100%)";
    setTimeout(() => {
        overlay1.style.display = "none";
    }, 300);
});

let row1 = document.querySelector(".products-row");
let basket = document.querySelectorAll("#basket");
let spanCount = document.querySelectorAll("#basket span");
let cart1 = document.querySelector(".cart");
let over = document.querySelector(".over");
let close5 = document.querySelector(".close3");
let choosen = document.querySelector(".choosen");
let lasted = document.querySelector(".lasted");
let totalPrice = document.querySelector(".total h4 span")
let empty = document.querySelector(".empty");

let list = [];

let index1;

let cart;
if(localStorage.getItem("pro") == null){
    cart = [];
    checkThings();
    displayPurchases();
}else{
    cart = JSON.parse(localStorage.getItem("pro"));
    checkThings();
    displayPurchases();
}

let getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayThings(products)
};
getData();

function displayThings(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card">
        <div class="image">
            <img src="${item.image}" alt="">
            <div class="bottom-icons">
                <div class="icon1"><i class="fa-regular fa-heart"></i></div>
                <div class="icon2" onclick="addToCart(${index})"><i class="fa-solid fa-cart-shopping"></i></div>
                <div class="icon3" onclick="openInfo(${index})"><i class="fa-brands fa-searchengin"></i></div>
            </div>
        </div>
        <div class="card-body">
            <h3>${item.name}</h3>
            <div class="price">
                <span class="disc">
                    ${item.disc}
                </span>
                <span class="realPrice">
                    $${item.price}
                </span>
            </div>
        </div>
        </div>
        `
    });
    row1.innerHTML = card;
};

let overlay2 = document.querySelector(".overlay2");
let overRow = document.querySelector(".over-row");
let leftImage = document.querySelector(".left-image img");
let title = document.querySelector(".right-info h2");
let price = document.querySelector(".price2 span");
let close2 = document.querySelector(".close2");
let addToCart1 = document.querySelector(".addToCart");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let counts = document.querySelector(".left-counts input");

function openInfo(index){
    index1 = index;
    overlay2.style.display = "flex";
    setTimeout(() => {
        overRow.style.transform = "translateY(0)";
        overRow.style.opacity = "1";
    }, 100);
    leftImage.src = list[index].image;
    title.textContent = list[index].name;
    price.textContent = list[index].price;
};

function addToCart(index){
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(final){
        final.count++;
    }else{
        cart.push({...choosenProduct, count: 1});
    };
    checkThings();
    displayPurchases();
    localStorage.setItem("pro", JSON.stringify(cart));
};

plus.addEventListener("click", function(){
    counts.value++;
});

minus.addEventListener("click", function(){
    counts.value--;
    if(counts.value < 1){
        counts.value = 1;
    };
});

close2.addEventListener("click", function(){
    overRow.style.transform = "translateY(-30%)";
    overRow.style.opacity = "0";
    setTimeout(() => {
        overlay2.style.display = "none";
        counts.value = 1;
    }, 400);
});


addToCart1.addEventListener("click", function(){
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(counts.value > 1 && final){
        final.count = counts.value;
    }else{
        cart.push({...choosenProduct, count: 1});
    };
    checkThings();
    displayPurchases();
    localStorage.setItem("pro", JSON.stringify(cart));
});

basket.forEach((item) => {
    item.addEventListener("click", function(){
        over.style.display = "flex";
        setTimeout(() => {
            cart1.style.opacity = "1";
            cart1.style.transform = "translateX(0)";
        }, 100);
    });
});

close5.addEventListener("click", function(){
    cart1.style.transform = "translateX(100%)";
    cart1.style.opacity = "0";
    setTimeout(() => {
        over.style.display = "none";
    }, 300);
});

function displayPurchases(){
    let card = "";
    let counter = 0;
    for(let i = 0; i < cart.length; i += 1){
        counter += cart[i].price * cart[i].count;
    };
    cart.forEach((item, index) => {
        card += `
        <div class="card2">
        <div class="left-infos">
            <img src="${item.image}" alt="">
            <div class="right">
                <h4>${item.name}</h4>
                <p>Qty: ${item.count}</p>
            </div>
        </div>
        <div class="right-prices">
            <div class="close5" onclick="deleteElement(${index})">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <h4>$${item.price}</h4>
        </div>
        </div>
        `
    });
    choosen.innerHTML = card;
    totalPrice.textContent = counter;
};
displayPurchases();

function deleteElement(index){
    cart.splice(index, 1);
    localStorage.setItem("pro", JSON.stringify(cart));
    checkThings();
    displayPurchases();
};

function checkThings(){
    if(cart.length == 0){
        lasted.style.display = "none";
        empty.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = 0;
        });
    }else{
        lasted.style.display = "block";
        empty.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};

function searchProduct(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.name.includes(searching.trim())){
            card += `
            <div class="card">
            <div class="image">
                <img src="${item.image}" alt="">
                <div class="bottom-icons">
                    <div class="icon1"><i class="fa-regular fa-heart"></i></div>
                    <div class="icon2" onclick="addToCart(${index})"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="icon3" onclick="openInfo(${index})"><i class="fa-brands fa-searchengin"></i></div>
                </div>
            </div>
            <div class="card-body">
                <h3>${item.name}</h3>
                <div class="price">
                    <span class="disc">
                        ${item.disc}
                    </span>
                    <span class="realPrice">
                        $${item.price}
                    </span>
                </div>
            </div>
            </div>
            `
        };
    });
    row1.innerHTML = card;
};

let headers = document.querySelectorAll(".title2");
let bots = document.querySelectorAll(".bot");
let icona = document.querySelectorAll(".title2 i");

headers.forEach((item, index) => {
    item.addEventListener("click", function(){
        if(bots[index].style.height == 0){
            bots[index].style.height = bots[index].scrollHeight + "px";
            icona[index].style.transform = "rotate(180deg)";
        }else{
            bots[index].style.height = null;
            icona[index].style.transform = "rotate(0deg)";
        };
    });
});

let over2 = document.querySelector(".over2");
let aside = document.querySelector(".aside1");
let closeAside = document.querySelector(".aside1");
let bars = document.querySelectorAll("#bar");

bars.forEach((item) => {
    item.addEventListener("click", function(){
        over2.style.display = "flex";
        setTimeout(() => {
            aside.style.transform = "translateX(0)";
            aside.style.opacity = "1";
        }, 100)
    });
})

closeAside.addEventListener("click", function(){
    aside.style.transform = "translateX(calc(-100% + -41px))";
    aside.style.opacity = "0";
    setTimeout(() => {
        over2.style.display = "none";
    }, 300);
});