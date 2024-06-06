var NameInput=document.getElementById("exampleInputSiteName");
var siteUrl=document.getElementById("exampleInputSiteURL");
var submit=document.getElementById("AddElement")
var invalidmsg=document.getElementById("invalid");


arrayList=[];
if(JSON.parse(localStorage.getItem('storageOFinput'))!=null)
{
arrayList=JSON.parse(localStorage.getItem('storageOFinput'))
display();
}

submit.addEventListener('click',function(e){
    e.preventDefault();
    if(RegexVakidation()==true&&RegexVakidationURL()==true){
    {
    invalidmsg.classList.add("d-none");
    var WebstieNames={
        name:NameInput.value,
        siteName:siteUrl.value
    }
    arrayList.push(WebstieNames)
    localStorage.setItem('storageOFinput',JSON.stringify(arrayList))
    console.log(WebstieNames);
    display();
    }
}else{
    invalidmsg.classList.remove("d-none");
}
})

NameInput.addEventListener('input',RegexVakidation)
siteUrl.addEventListener('input',RegexVakidationURL)

function RegexVakidation(){
    var Regex=/^([a-z]|[A-Z]|[0-9]){3,}$/
    var input=NameInput.value;
    if(Regex.test(input)==true){
        NameInput.classList.add('is-valid')
        NameInput.classList.remove('is-invalid')
        return true
    }else{
        NameInput.classList.add('is-invalid')
        NameInput.classList.remove('is-valid')
    return false
    }
}
function RegexVakidationURL(){
    var Regex=/^http(s|):\/\/([a-z]|[A-Z])+\.[a-z]{2,}$/
    var input=siteUrl.value;
    if(Regex.test(input)==true){
        siteUrl.classList.add('is-valid')
        siteUrl.classList.remove('is-invalid')
        return true
    }else{
        siteUrl.classList.add('is-invalid')
        siteUrl.classList.remove('is-valid')
    return false
    }
}
 function display(){
    var container=""
    for(var i =1;i<arrayList.length;i++){
        container+=
        `
        <tr>
        <th scope="row">${i}</th>
        <td>${arrayList[i].name}</td>
        <td>        
           <button id="VisitSite" onclick="visiturl(${i})" type="submit" class="btn btn-success px-5 fs-6 "><i class="fas fa-eye"></i> Visit</button>
        </td>
        <td>        
           <button id="DeleteElement" onclick="deleteelemnt(${i})" type="submit" class="btn btn-danger px-5 fs-6 "><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>
        `

    }
    document.getElementById("tbody").innerHTML=container 
}

var VisitUrl=document.getElementById("VisitSite");
var deletebtn=document.getElementById("DeleteElement");

function deleteelemnt(index){
    arrayList.splice(index,1)
    localStorage.setItem("storageOFinput",JSON.stringify(arrayList))
    display();  
}

function visiturl(index){
var url = arrayList[index].siteName;
window.location.href=url;
}