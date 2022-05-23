var siteName = document.getElementById("siteName") ;
var siteUrl = document.getElementById("siteUrl") ;
var sitesInfo = document.getElementById("sitesInfo");
var bookmarks=[];
if(localStorage.getItem("bookmarks")==null){
    var bookmarks = [];
}
else{
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}
function submit(){
    var siteNameVal = siteName.value;
    var siteUrlVal = siteUrl.value; 
    var isValid=false;
    var singleSite = {"siteName":siteNameVal,"siteUrl":siteUrlVal};
     
       if(validateSiteNameLength()){ 
       
        document.getElementById("nameError").style.setProperty("display", "none", "important");
        if(validateSiteName() && siteNameVal.length!=0){
            document.getElementById("nameError").style.setProperty("display", "none", "important");  
             
            if(!checkIfSiteNameExist(siteNameVal) && siteNameVal.length!=0){
                document.getElementById("nameError").style.setProperty("display", "none", "important");
 
                isValid=true;
            }
            else{
                document.getElementById("nameError").style.setProperty("display", "block", "important");
                document.getElementById("nameError").innerHTML = "this siteName already exist";
                var isValid=false;
                  
            }
        }
        else{
            document.getElementById("nameError").style.setProperty("display", "block", "important");
            document.getElementById("nameError").innerHTML = "please enter correct siteName";
            var isValid=false; 
        }
    }
    else{
        document.getElementById("nameError").style.setProperty("display", "block", "important");
        document.getElementById("nameError").innerHTML = "site name Field is required"; 
        var isValid=false; 
    }  
    if(validateUrlSiteLength()){ 
        document.getElementById("urlError").style.setProperty("display", "none", "important"); 
         
        if(validateWebsite() && siteUrlVal.length!=0){
            
            document.getElementById("urlError").style.setProperty("display", "none", "important");
            if(!checkIfUrlSiteExist(siteUrlVal) && siteUrlVal.length!=0){
                document.getElementById("urlError").style.setProperty("display", "none", "important");
                isValid=true;
            }
            else{
                document.getElementById("urlError").style.setProperty("display", "block", "important");
                document.getElementById("urlError").innerHTML = "this siteUrl already exist";
                var isValid=false; 
                
                
            }
        }
        else{  
            document.getElementById("urlError").style.setProperty("display", "block", "important");
            document.getElementById("urlError").innerHTML = "please enter correct siteUrl";
            var isValid=false;  
        }
    }
    else{ 
        document.getElementById("urlError").style.setProperty("display", "block", "important");
        document.getElementById("urlError").innerHTML = "site url Field is required";
        var isValid=false;
    }
    if(isValid){
        bookmarks.push(singleSite);
        clearForm();
                localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
                displaySites();
            alert("site inserted successfully!");
    }
    else{
        alert("an error occurred");
    }  
    
}
function checkIfSiteNameExist(siteName){
for(var count=0;count<bookmarks.length;count++){
if(siteName==bookmarks[count].siteName){
    return true;
}
}
return false;

}
function checkIfUrlSiteExist(siteUrl){
for(var count=0;count<bookmarks.length;count++){
if(siteUrl==bookmarks[count].siteUrl){
    return true;
}
}
return false;

} 

function validateSiteName(){
    var regName = /^[a-z A-Z]{3,10}([0-9]*)$/;
    if(!regName.test(siteName.value)){
        document.getElementById("urlError").innerHTML = "please enter valid site name";
    }
    else{
        document.getElementById("urlError").innerHTML = "";
    }
    return regName.test(siteName.value);
}
function validateWebsite(){
    var urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)?/;
    if(!urlRegex.test(siteUrl.value) && siteUrl.value.length!=0){
document.getElementById("urlError").innerHTML = "please enter valid url";
document.getElementById("urlError").style.setProperty("display","block","important");
    }
    else{
        document.getElementById("urlError").style.setProperty("display", "none", "important");
        // document.getElementById("urlError").innerHTML = "";
    }
    return urlRegex.test(siteUrl.value);
}
function validateSiteNameLength(){ 
     
    return siteName.value.length != 0;
}
function validateUrlSiteLength(){
    return siteUrl.value.length != 0;
}
function deleteSite(Index){
    bookmarks.splice(Index,1); 
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
    displaySites();
}
displaySites();
function displaySites(){
    var str = "";
    for(var count=0;count<bookmarks.length;count++){
        str+=` 
        <div class="siteInfo d-flex align-items-center">
        <h2 id="${bookmarks[count].siteName}">${bookmarks[count].siteName}</h2>
   <a class="btn btn-primary text-decoration-none" href="${bookmarks[count].siteUrl}" target="_blank">visit</a>
   <button class="btn btn-danger btndelete" onclick="deleteSite(${count})">Delete</button>  
   </div>`;
    }
    sitesInfo.innerHTML = str;
}
function clearForm(){
    siteName.value="";
    siteUrl.value="";
}