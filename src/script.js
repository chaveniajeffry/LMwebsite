const accounts = document.querySelectorAll('.actualImg')
const profileName = document.querySelector('.ph-name')
const profileMight = document.querySelector('.ph-might')
const profileOthers = document.querySelector('.ph-others')
const csBody = document.querySelector('.cs-body')
const equipmentThumbnail = document.querySelector('.equipment-thumbnail')
const equipmentModal = document.querySelector('.equipment-modal')
const closeEquipmentModal = document.querySelector('#equipment-modal-hide-content')
const equipmentModalHeading = document.querySelector('.equipment-modal-heading')
const researchThumbnail = document.querySelector('.research-thumbnail')
const researchModal = document.querySelector('.research-modal')
const closeResearchModal = document.querySelector('#research-modal-hide-content')
const researchModalHeading = document.querySelector('.research-modal-heading')
const researchModalthumbnail = document.querySelector('.research-modal-thumbnail')
const buildingInfoTableBody = document.querySelector('.building-info-body .table-info .tbody')
const troopCompositionTableBody = document.querySelector('.troop-composition-body .troop-composition-table-info .troop-composition-tbody')
const profile = "profile.html"
const hideContent = document.querySelectorAll('.hide-content')
let cardList = []
// console.log(closeEquipmentModal)
if(equipmentThumbnail != null){
    for(let i=0; i<equipmentThumbnail.children.length;i++){
    
        equipmentThumbnail.children[i].addEventListener('click', ()=>{
            equipmentModalHeading.innerHTML = equipmentThumbnail.children[i].innerHTML 
            equipmentModal.style.display="block"
            equipmentModal.style.animationName = "pop-in"
            equipmentModal.style.animationDuration = ".5s"
            equipmentModal.style.animationTimingFunction = "ease-in-out"
        })
    }
    closeEquipmentModal.addEventListener('click', ()=>{
        equipmentModal.style.animationName = "pop-out"
        equipmentModal.style.animationDuration = ".5s"
        equipmentModal.style.animationTimingFunction = "ease-in-out"
        equipmentModal.style.animationFillMode = "forwards"
        setTimeout(()=>{equipmentModal.style.display="none"}, 5*100)
    })
}




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
    const cardName = currentContentToHide.toString().replace("hide-content","card")
    const cardType = currentContentToHide.toString().replace("hide-content","body")
    const cardHeader = currentContentToHide.toString().replace("hide-content","header")
    const cardTypeIcon = currentContentToHide.toString().replace("hide-content","header-icon")
    
    const bodyContent = document.querySelector("."+cardType)
    const csIcon = document.querySelector("."+cardTypeIcon)
    
    //far fa-square
    if(bodyContent.id == ""){//hide element
        bodyContent.removeAttribute('class')
        bodyContent.setAttribute('class',cardType+' hidden')
        bodyContent.setAttribute('id',cardType+"-hidden")
        csIcon.removeAttribute('class')
        csIcon.setAttribute('class','fa fa-arrow-left fa-lg '+cardTypeIcon)
        document.querySelector('.'+cardName).style.height = 0
        document.querySelector('.'+cardHeader).style.boxShadow = "0px 0px 5px 0px rgba(0, 0, 0, 0.75)"
    }else{//view element
        bodyContent.removeAttribute('class')
        bodyContent.setAttribute('class',cardType)
        bodyContent.removeAttribute('id')
        csIcon.removeAttribute('class')
        csIcon.setAttribute('class','fa fa-arrow-down fa-lg '+cardTypeIcon)
        document.querySelector('.'+cardName).style.height = "auto"
        document.querySelector('.'+cardHeader).style.boxShadow = "none"
        const isLargeNumber = (element) => element == cardName;
        const indexNum = cardList.findIndex(isLargeNumber)
        cardList.splice(indexNum,1)
    }
    // const IisLargeNumber = (element) => element == cardName;
    // const IindexNum = cardList.findIndex(IisLargeNumber)
    // console.log(IindexNum)
    if(cardList.includes("cs-card") && cardList.includes("building-info-card") && cardList.includes("troop-composition-card")){
        floatBottomTop()
    }
    // console.log(cardList.includes("cs-card","building-info-card","troop-composition-card"))
    // cardList.every((cardvalue)=>cardvalue=="cs-card" && cardvalue=="building-info-card" && cardvalue=="troop-composition-card")
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
            viewResearch(data[i])
            viewBuildingInfo(data[i].buildingComposition)
            viewTroopComposition(data[i].troopComposition)
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


//viewresearch
function viewResearch(account_data){
    const researchData = account_data.research
    let researchModalThumbnailContent = ""
    for(let i=0; i<researchData.length;i++){
        researchModalThumbnailContent += "<img src='"+researchData[i].imgDirectory+researchData[i].imgName+"' alt='"+researchData[i].imgAlt+"'>"
    }
    researchThumbnail.innerHTML = researchModalThumbnailContent
    
    if(researchThumbnail != null){
        for(let i=0; i<researchThumbnail.children.length;i++){
                researchThumbnail.children[i].addEventListener('click', ()=>{
                    researchModalHeading.innerHTML = researchThumbnail.children[i].getAttribute('alt')
                    researchModal.style.display="block"
                    researchModal.style.animationName = "pop-in"
                    researchModal.style.animationDuration = ".5s"
                    researchModal.style.animationTimingFunction = "ease-in-out"
                    viewResearchModalData(researchData[i])
                })
        }
        
        closeResearchModal.addEventListener('click', ()=>{
            researchModal.style.animationName = "pop-out"
            researchModal.style.animationDuration = ".5s"
            researchModal.style.animationTimingFunction = "ease-in-out"
            researchModal.style.animationFillMode = "forwards"
            setTimeout(()=>{researchModal.style.display="none"}, 5*100)
        })
    }
}

//viewbuildingInfo
function viewBuildingInfo(account_data){
    let buildingInfoTableBodyContent=""
    for(let i=0; i<account_data.length;i++){
        buildingInfoTableBodyContent+="<div class='tcontent'>"
        buildingInfoTableBodyContent+="<p>"+account_data[i].buildingName+"</p>"
        buildingInfoTableBodyContent+="<p>"+account_data[i].buildingCategory+"</p>"
        buildingInfoTableBodyContent+="<p>"+account_data[i].buildingCount+"</p>"
        buildingInfoTableBodyContent+="<p>"+account_data[i].buildingLevel+"</p>"
        buildingInfoTableBodyContent+="</div>"
    }
    buildingInfoTableBody.innerHTML = buildingInfoTableBodyContent
}

//view troop composition
function viewTroopComposition(account_data){
    // troopCompositionTableBody
    let troopCompositionTableBodyContent = ""
    let totalTroopCount = 0
    for(let i=0;i<account_data.length;i++){
        troopCompositionTableBodyContent+="<div class='troop-composition-tcontent'>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].troopType+"</p>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].t1Count+"</p>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].t2Count+"</p>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].t3Count+"</p>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].t4Count+"</p>"
        troopCompositionTableBodyContent+="<p>"+account_data[i].t5Count+"</p>"
        troopCompositionTableBodyContent+="</div>"
        totalTroopCount+=account_data[i].t1Count+
                        account_data[i].t2Count+
                        account_data[i].t3Count+
                        account_data[i].t4Count+
                        account_data[i].t5Count
    }
    troopCompositionTableBodyContent+="<div class='troop-composition-total'>"
    troopCompositionTableBodyContent+="<p>Total</p>"
    troopCompositionTableBodyContent+="<p class='total'>"+totalTroopCount+"</p>"
    troopCompositionTableBodyContent+="</div>"
    troopCompositionTableBody.innerHTML = troopCompositionTableBodyContent
}


//view data template
// function viewTroopComposition(account_data){
//     // troopCompositionTableBody
//     let troopCompositionTableBodyContent = ""
//     console.log(account_data)
// }

//view research modal data
function viewResearchModalData(research_data){
    const imgDirectory = research_data.imgDirectory
    let researchModalthumbnailContent=""
    if(research_data.economy){
       for(let z=0; z<research_data.economy.length;z++){
        // const cardName = currentContentToHide.toString().replace("hide-content","card")
        // console.log(research_data.economy[z].imgName.toString().substring(4,7))
        let gridRow = research_data.economy[z].imgName.toString().substring(1,3)
        let gridColumn = research_data.economy[z].imgName.toString().substring(5,7)
        // console.log(parseInt(gridRow)+gridColumn)
        if(parseInt(gridColumn) == 1){
            researchModalthumbnailContent+="<div class='research-modal-panel research-modal-col-1' "
        }else if(parseInt(gridColumn) == 2){
            researchModalthumbnailContent+="<div class='research-modal-panel research-modal-col-2' "
        }else if(parseInt(gridColumn) == 3){
            researchModalthumbnailContent+="<div class='research-modal-panel research-modal-col-3' "
        }else if(parseInt(gridColumn) == 4){
            researchModalthumbnailContent+="<div class='research-modal-panel research-modal-col-4' "
        }
        researchModalthumbnailContent+="style='grid-row:"+parseInt(gridRow)+"/"+(parseInt(gridRow)+1)+"'>"
        researchModalthumbnailContent+="<div class='rm-panel-img'>"
        researchModalthumbnailContent+="<img src='"+imgDirectory+research_data.economy[z].imgName+"'>"
        researchModalthumbnailContent+="</div>"
        researchModalthumbnailContent+="<div class='rm-panel-name'>"
        researchModalthumbnailContent+=research_data.economy[z].name
        researchModalthumbnailContent+="</div>"
        researchModalthumbnailContent+="<div class='rm-panel-status'>"
        researchModalthumbnailContent+=research_data.economy[z].status
        researchModalthumbnailContent+="</div>"
        researchModalthumbnailContent+="</div>"
        
       }
       
    //    console.log(researchModalthumbnailContent)
       researchModalthumbnail.innerHTML = researchModalthumbnailContent
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
let equipmentChildrenText = []
const equipmentChildrenElemet = document.querySelector('.equipment-thumbnail').children
for(let i=0; i<equipmentChildrenElemet.length;i++){
    equipmentChildrenText.push(equipmentChildrenElemet[i].innerHTML)
    // equipmentChildrenElemet[i].innerHTML = "Change"
}
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
    //check if 1000px
    
    if(window.innerWidth >= 1000){
        // document.querySelector('.equipment-thumbnail').children[0].innerHTML = "aa"
        let equipmentRawNameArray = []
        let initialOnlyEquipmentName = []
        for(let i=0; i<equipmentChildrenElemet.length;i++){
            // let equipmentRawName = equipmentChildrenElemet[i].innerHTML.toString()
            // // EquipmentRawNameArray += EquipmentRawName.split(" ")
            // equipmentRawNameArray.push(equipmentRawName.split(" "))
            
            equipmentChildrenText.push(equipmentChildrenElemet[i].innerHTML)
            // equipmentChildrenElemet[i].setAttribute('title',htmlEntities(equipmentChildrenElemet[i].innerHTML))
            equipmentChildrenElemet[i].innerHTML = equipmentChildrenElemet[i].getAttribute('data-id')
        }
        // console.log(equipmentRawNameArray)
        // for(let i=0; i<equipmentRawNameArray.length;i++){
        //     for(let j=0;j<equipmentRawNameArray[i].length;j++){
        //         console.log(equipmentRawNameArray[i][j].charAt(0).toUpperCase())
        //         let tempInitialName = ""
        //         if(equipmentRawNameArray[i][j].charAt(0).toUpperCase() != "S"){
        //             tempInitialName+=equipmentRawNameArray[i][j]
        //         }else{
        //             tempInitialName+=equipmentRawNameArray[i][j]
        //             equipmentRawNameArray.push(tempInitialName)
        //             tempInitialName = ""
        //         }
        //     }
        // }
        // console.log(equipmentRawNameArray)
    }else{
        for(let i=0; i<equipmentChildrenElemet.length;i++){
            equipmentChildrenText.push(equipmentChildrenElemet[i].innerHTML)
            // equipmentChildrenElemet[i].setAttribute('title',htmlEntities(equipmentChildrenElemet[i].innerHTML))
            equipmentChildrenElemet[i].innerHTML = equipmentChildrenText[i]
            

        }
    }
}
function htmlEntities(str) {
    return String(str).replace('&lt;','<');
}
