'use strict';

var button = document.getElementById('submit');
var tableContainer = document.getElementById('table-container');
var form = document.getElementById('animeForm');
var table = document.createElement('table');



// Anime constructor 
Anime.allAnimes = JSON.parse( localStorage.getItem('myAnimes')) || [];  // array of all animes ( get its values from local storage if exist, if not , it will be empty array)
function Anime (title,catagory){
    this.title=title;
    this.catagory = catagory;
    this.season = getRandomInt();
    Anime.allAnimes.push(this);
}



// event listener: for submit the form
button.addEventListener('click', function(event){
    event.preventDefault();
    if(form.animeTitle.value){ // check if the user enter the title of anime or not.
        var title = form.animeTitle.value;
        var catagory = form.catagories.value;
        new Anime(title,catagory);
        localStorage.setItem('myAnimes', JSON.stringify(Anime.allAnimes));
        renderTableBody(); 
        form.animeTitle.value='';
    }
    else{
        alert("you should enter the anime's title..")
    }
});



// render table..
function renderTableHeader(){
    var thead = document.createElement('thead');
    var row = document.createElement('tr');
    var col1 = document.createElement('th');
    var col2 = document.createElement('th');
    var col3 = document.createElement('th');
    var col4 = document.createElement('th');
    col1.textContent='Anime Title';
    col2.textContent='Catagory';
    col3.textContent='Random Season';
    col4.textContent='Remove';
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    thead.appendChild(row);
    table.appendChild(thead);
    tableContainer.appendChild(table);
}


var tbody= document.createElement('tbody');
function renderTableBody(){
    tbody.innerHTML='';
    for(let i =0 ; i< Anime.allAnimes.length ; i++){
        var row = document.createElement('tr');
        var remove = document.createElement('button');
        var col1 = document.createElement('td');
        var col2 = document.createElement('td');
        var col3 = document.createElement('td');
        var col4 = document.createElement('td');
        col1.textContent=Anime.allAnimes[i].title;
        col2.textContent=Anime.allAnimes[i].catagory;
        col3.textContent=Anime.allAnimes[i].season;
        remove.textContent='X';
        remove.setAttribute('id',Anime.allAnimes[i].title);
        remove.setAttribute('class','remove-button');
        col4.appendChild(remove);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        tbody.appendChild(row);

    }
    table.appendChild(tbody);
}

renderTableHeader();
renderTableBody();





//event listener: for remove data from the table:
tbody.addEventListener('click',function(event){
    var id = event.target.id;
    if(id){  // check if the id not null ( click on remove button ):

        for(let i = 0 ; i< Anime.allAnimes.length; i++){
            if(id===Anime.allAnimes[i].title){
                Anime.allAnimes.splice(i,1); // remove this element from the array
                localStorage.setItem('myAnimes', JSON.stringify(Anime.allAnimes)); // update the value of array at local storage
                renderTableBody(); // render the table again ( after remove the row)
                break;
            }
        }
    }

});






// helper functions :
function getRandomInt(){
    return Math.floor(Math.random()*(7-1)+1);
}