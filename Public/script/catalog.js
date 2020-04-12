/* //global variables
var items=[
{ //first item
    code: '1tvs',
    title: 'Tv',
    price: 1000,
    description: 'Samsung',
    category: 'Electronics',
    image: 'img/tv.jpg'
},
{ //second item
    code: '1ph10',
    title: 'Phone',
    price: 1000,
    description: 'I Phone X',
    category: 'Mobile devices',
    image: 'img/cel.jpg'
},
{  //third item
    code: '2spks',
    title: 'Speakers',
    price: 1000,
    description: 'Bose Speakers',
    category: 'Audio',
    image: 'img/spk.png'
},
{ //Fourth item
    code: '1cpc',
    title: 'Computer',
    price: 1000,
    description: 'HP Pavilion',
    category: 'Hardware',
    image: 'img/pc.jpg'
}
];
 */
var items=[];
 var serverURL="http://localhost:8080/API/";

//functions

function fetchCatalog(){
    //get the items from the server
    $.ajax({
        url:serverURL+"items",
        type:"GET",
        success: function(res){
            console.log("Server responded OK",res);
            for(var j=0;j<res.length;j++){
                //items.push(res[j]);

            //Code to display only all of my non empty items of the catalog:
            if(res[j].user=="Isabel" && res[j].title!=""){
                items.push(res[j]);
            }
            }
            console.log(items);
            displayCatalog();
        },
        error:function(details){
            console.log("Error",details);
        }
    });

}
function displayCatalog(){
    for(var i=0;i<items.length;i++){
        displayItem(items[i]);
    }
}
function displayItem(product){
    //1-travel inside the array
    //for(var i=0;i<items.length;i++){
    //2-get element from the array
    //var product = items[i];
    //3-create the string
    var layout=`<div class="item" id="${product.code}">
    <img src="${product.image}">
    <h4>${product.title}</h4>
    <h6 class="item-price">${product.price}</h6>
    <p>${product.description}</p>
    <div class="button-div">
    <button class="btn btn-primary mb-2">Add to cart</button>
    </div>
    </div>`;
    //console.log(i,layout);
    //4-display the element in the DOM (HTML)
    $("#catalog").append(layout);
    //}
}
//displayCatalog();

function init(){
    console.log('Catalog page');
    fetchCatalog();
    $("#search-btn").click(Search);
    //search pressing keyboard enter with event
    $("#search-txt").keypress(function(e){
        if(e.keyCode==13){
            Search();
        }
    });
}

function Search(){
//$('#search-btn').on('click',function(){
   // body search function
   var searchString=$('#search-txt').val();
   //console.log(items);
   //travel inside the array
   for(var i=0;i<items.length;i++){
        //conditional
       //if(searchString.toUpperCase()!= items[i].title.toUpperCase()){
           //code to search the name, code, description, 
        if(items[i].title.toUpperCase().includes(searchString.toUpperCase())
        || items[i].code.toUpperCase().includes(searchString.toUpperCase())
        || items[i].description.toUpperCase().includes(searchString.toUpperCase())){ 
       //execute the change
            //$('#'+items[i].code).hide();
            console.log(items[i]);
           $('#'+items[i].code).show();
       }
       else{
           //execute the change
           //('#'+items[i].code).show();
          $('#'+items[i].code).hide();
       }
       
   if(searchString==""){
    $('#'+items[i].code).show();

   }
   }
}; 

//initialization
window.onload=init; 