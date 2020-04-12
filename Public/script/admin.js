var serverURL="http://localhost:8080/api/";
var items=[];

function init(){
    console.log("Admin Page");
}
window.onload=init;

//object constructor
class Item{
    constructor(code,title,price,description,category,image){
    this.code=code;
    this.title=title;
    this.price=price;
    this.description=description;
    this.category=category;
    this.image=image;
    this.user="Isabel";
}
}
function clearForm(){
    $("#code").val("");
    $("#code").focus("");
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}

function register(){
    //console.log("Current items"+items.length);
    
    //save from the input in a variable
    var code=$("#code").val();
    var title=$("#title").val();
    var price=$("#price").val();
    var description=$("#description").val();
    var category=$("#category").val();
    var image=$("#image").val();

    if(code!="" && title!="" && price!="" && description!="" && category!="" ){
    //create object
    var newItem= new Item(code,title,price,description,category,image)

    //assign the var to the attribute
    items.push(newItem);
    var jsonString=JSON.stringify(newItem);
    console.log(newItem);
    console.log(jsonString);

    
   /*  console.log("New Item: "+ items.length);
    alert("You register a new product"); */
    }
    //Ajax means Asin JS and XML, is a framework to send data(string, integer,boolean)
    $.ajax({
        url:serverURL+"items",
        type:"POST",
        contentType:"application/json",
        data:jsonString,
        success: function(response){
            console.log("It works",response);
            //Show the notification
            $('#alert-box').removeClass("hidden");
            //hide the alert
            setTimeout(function(){
                $('#alert-box').addClass('hidden');
            },3000);
            clearForm();
        },
        error:function(errorDetails){
            console.log("Error, Something went wrong",errorDetails);
        }
    });
}

$("#register-btn").on('click',function(){
    register();
});


