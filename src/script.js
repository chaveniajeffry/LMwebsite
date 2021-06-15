const accounts = document.querySelectorAll('.actualImg')
const profileName = document.querySelector('.ph-name')
const profileMight = document.querySelector('.ph-might')
const profileOthers = document.querySelector('.ph-others')
const csBody = document.querySelector('.cs-body')
const profile = "profile.html"
const hideContent = document.querySelectorAll('.hide-content')
let currentCard = []
if(hideContent != null){
    for(let i=0;i<hideContent.length;i++){
        hideContent[i].addEventListener('click',hideThisContent)
        currentCard.push(hideContent[i].id) 
    }
}
//hide content
function hideThisContent(){
    let currentContentToHide = ""
    for(let i=0;i<currentCard.length;i++){
        if(currentCard[i].toString() == this.id.toString()){
            currentContentToHide = currentCard[i]
        }
    }
    
    const cardType = currentContentToHide.toString().replace("hide-content","body")
    const cardTypeIcon = currentContentToHide.toString().replace("hide-content","header-icon")
    
    const bodyContent = document.querySelector("."+cardType)
    const csIcon = document.querySelector("."+cardTypeIcon)
    // console.log(bodyContent)
    
    //far fa-square
    if(bodyContent.id == ""){//hide element
        bodyContent.removeAttribute('class')
        bodyContent.setAttribute('class',cardType+' hidden')
        bodyContent.setAttribute('id',cardType+"-hidden")
        csIcon.removeAttribute('class')
        csIcon.setAttribute('class','fa fa-arrow-left fa-lg '+cardTypeIcon)
    }else{//view element
        bodyContent.removeAttribute('class')
        bodyContent.setAttribute('class',cardType)
        bodyContent.removeAttribute('id')
        csIcon.removeAttribute('class')
        csIcon.setAttribute('class','fa fa-arrow-down fa-lg '+cardTypeIcon)
    }
    
}

//store data id after redirect on profile page
accounts.forEach(account => 
    account.addEventListener('click', ()=>{
    window.location.href = profile
    sessionStorage.setItem('name', account.getAttribute('data-id'))
    })
)


//getting information in json
if(document.location.host+"/LMwebsite/src/data.json"){
    fetch("/LMwebsite/src/data.json")
    .then((response)=> response.json())
    .then((data)=> storeData(data))
}

//store data locally
function storeData(data){
    for(let i=0;i<data.length;i++){
        if(data[i].ign === sessionStorage.getItem('name')){
            viewProfile(data[i])
        }
    }
}
//view profile with preffered data
function viewProfile(account_data){
    // console.log(account_data)
    let ign = account_data.ign
    let might = account_data.might
    let gems = account_data.gems
    let resetTime = account_data.resetTime
    let lastUpdate = account_data.lastUpdate
    let shield = account_data.shield
    let finalTemplate =""
    // console.log(csTemplate)
    if(window.location.href.search(profile) !== -1){
        profileName.innerHTML = "Name: "+ign
        profileMight.innerHTML = "Might: "+might.toLocaleString()
        profileOthers.innerHTML = "<div>Gems: "+gems+"</div><div>Reset Time: "+resetTime+"</div><div>Shield: "+shield+"</div><div>Last Update: "+lastUpdate+"</div>".toString();
        for(let csi=0;csi<account_data.castleSkin.length;csi++){
            // console.log(account_data.castleSkin.length)
            let csTemplate = '<div class="castle-skin">'.toString()
            csBody.innerHTML = csTemplate;
            let castleSkinImg = account_data.castleSkin[csi].castleSkinImg
            let castleSkinImgAlt = account_data.castleSkin[csi].castleSkinImgAlt
            let castleSkinStar = account_data.castleSkin[csi].castleSkinStar
            let csStarHtml ="<div class='cs-star'>";
            csTemplate+='<div class="cs-img"><img src="src/images/Castle Skin/'+castleSkinImg+'" alt="'+castleSkinImgAlt+'"/></div>'.toString()
            for(let i=0;i<5;i++){
                if(i < castleSkinStar){
                    csStarHtml+= "<i class='fas fa-star yellow'></i>"
                }else if(castleSkinStar==="None"){
                    csStarHtml = "<center>NAN</center>"
                }else{
                    csStarHtml+= "<i class='fas fa-star'></i>"
                }
            }
            csStarHtml+="</div>"
            csTemplate+=csStarHtml
            csTemplate+="</div>";
            finalTemplate += csTemplate.toString()
        }
        csBody.innerHTML = finalTemplate
    }
}


//function for dark theme
if(document.querySelector('.toggle-btn') !=null){
    document.querySelector('.toggle-btn').addEventListener('click',()=>{
        document.body.classList.toggle('dark')
        // console.log(document.querySelector('.fa-sun'))
        if(document.querySelector('.fa-sun') != null){
            document.querySelector('.fa-sun').classList.toggle('fa-moon')
        }else{
            document.querySelector('.fa-moon').classList.toggle('fa-sun')
        }
        // console.log(document.querySelector('.change-icon').classList.toggle('fa-moon'))
    })
}



window.onresize = floatBottomTop



window.onscroll = floatBottomTop
function floatBottomTop(){
    if (window.innerWidth > document.body.clientWidth) {
        window.onscroll = function() {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
                document.querySelector('#float-area').removeAttribute("class")
                document.querySelector('#float-area').setAttribute("class","float-top")
            }else{
                document.querySelector('#float-area').removeAttribute("class")
                document.querySelector('#float-area').setAttribute("class","float-bottom")
            }
          }
    }else{
        document.querySelector('#float-area').setAttribute("class","float-bottom")
    }
}
