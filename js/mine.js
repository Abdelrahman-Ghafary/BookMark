// Global Variable
siteName = document.getElementById("siteName");
webSite = document.getElementById("webSite");
var siteArray=[];
closeBtn= document.getElementById("closeBtn");


// Condition Of Local Storage
if(localStorage.getItem("sites")==null)
    {
        siteArray=[];
    }
    else
    {
        siteArray = JSON.parse(localStorage.getItem("sites"));
       displayData(); 
    }


// Add Website
function addWebSite()
{
    siteNameInput = siteName.value;
    webSiteInput = webSite.value;
    var siteInfo = 
    {
        siteName:siteNameInput,
        siteUrl:webSiteInput
    } 
    var regexSiteName = /^[a-zA-Z0-9]{3,}$/gmi
    var regexWebSite = /^(www)\.[a-z]+\.(com)$/gmi;
    if(regexWebSite.test(webSiteInput)&&regexSiteName.test(siteNameInput))
        {
            document.getElementById("siteName").classList.remove("is-invalid");
            document.getElementById("siteName").classList.add("is-valid")
            siteArray.push(siteInfo);
  localStorage.setItem("sites",JSON.stringify(siteArray)); 
   clearData();
   displayData();
   document.getElementById("siteName").classList.replace("is-valid","is-invalid");
   document.getElementById("webSite").classList.replace("is-valid","is-invalid");
        }
        else
        {
           document.getElementById("overlay").classList.replace("d-none","d-flex");
        }
  
}


// ValidationInput
function validateInput()
{
    siteNameInput = siteName.value;
    webSiteInput = webSite.value;
    var regexSiteName = /^[a-zA-Z0-9]{3,}$/gmi
    var regexWebSite = /^(www)\.[a-z]+\.(com)$/gmi;




    if(regexSiteName.test(siteNameInput)==true)
        {
            document.getElementById("siteName").classList.remove("is-invalid");
            document.getElementById("siteName").classList.add("is-valid");
            document.getElementById("alertSiteName").classList.replace("d-block","d-none");
         
        }
        else 
        {
            document.getElementById("siteName").classList.remove("is-valid");
            document.getElementById("siteName").classList.add("is-invalid");
            document.getElementById("alertSiteName").classList.replace("d-none","d-block");
          
        }


        if(regexWebSite.test(webSiteInput)==true)
            {
                document.getElementById("webSite").classList.remove("is-invalid");
                document.getElementById("webSite").classList.add("is-valid");
                document.getElementById("alertSiteUrl").classList.replace("d-block","d-none");
              
            }
            else
            {
                document.getElementById("webSite").classList.remove("is-valid");
                document.getElementById("webSite").classList.add("is-invalid");
                document.getElementById("alertSiteUrl").classList.replace("d-none","d-block");
             
            }

}
// Clear Data
function clearData()
{
    siteName.value=null;
    webSite.value=null;
}


// Display Data 
function displayData()
{
    var cartona="";
    for(var i=0;i<siteArray.length;i++)
        {
            cartona+=
            `
            <tbody id="tbody">
                    <tr>
                        <td>${i+1}</td>
                        <td>${siteArray[i].siteName}</td>
                        <td><button onclick="visitUrl(${i});" class="btn btn-warning  text-white"> <i class="fa-solid fa-eye px-2"></i>Visit</button></td>
                        <td><button onclick="DeleteItem(${i});" class="btn btn-danger" > <i class="fa-solid fa-trash-can px-2"></i>Delete</button></td>
                    </tr>
                </tbody>
            `
        }
        document.getElementById("tbody").innerHTML=cartona;
}


// Visit URL
function visitUrl(i)
{
  window.open(`http://${siteArray[i].siteUrl}`);
}


//Delete Items

function DeleteItem(i)
{
siteArray.splice(i,1);
localStorage.setItem("sites",JSON.stringify(siteArray));
displayData();
}

closeBtn.addEventListener("click",function(){
   document.getElementById("overlay").classList.replace("d-flex","d-none");
})