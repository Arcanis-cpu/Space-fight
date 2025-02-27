function store(){
    console.log("storing...")
    if(runstorage==0){return}
    for(let i=0; i<20; i++){
        let string = "levelsDone"+i
        let oldItem = localStorage.getItem(string)
        if(oldItem=="NaN"){
            localStorage.setItem(string, levelsDone[i])
        }
        else{
            localStorage.setItem(string, Math.max(levelsDone[i], oldItem))
        }
    }
    if(runstorage==0){return}
    for(let i=0; i<20; i++){
        let string = "itemsOwned"+i
        let oldItem = localStorage.getItem(string)
        if(oldItem=="NaN"){
            localStorage.setItem(string, itemsOwned[i])
        }
        else{
            localStorage.setItem(string, Math.max(itemsOwned[i], oldItem))
        }
    }
    if(runstorage==0){return}
    localStorage.setItem("money", money)
    if(runstorage==0){return}

    localStorage.setItem("skin", skinEquiped)
    localStorage.setItem("pb", personalBest)
    console.log("stored")
}
function destore(){
    for(let i=0; i<20; i++){
        let string = "levelsDone"+i
        let Item = localStorage.getItem(string)
        if(Item!=NaN){
            levelsDone[i]=Item
        }
    }
    for(let i=0; i<20; i++){
        let string = "itemsOwned"+i
        let Item = localStorage.getItem(string)
        if(Item!=NaN){
            itemsOwned[i]=Item
        }
    }
    for(let i =0; i<itemsOwned.length;i++){
        if(itemsOwned[i]==1){
            shopButtonsStates[i]="equip"
        }
    }
    money=Math.max(localStorage.getItem("money"), money)
    if(money==NaN){
        money=0
    }

    skinEquiped=localStorage.getItem("skin")
    if(skinEquiped==NaN){
        skinEquiped=-1
    }
    else{
        shopButtonsStates[skinEquiped]="unequip"
    }
    personalBest=Math.max(localStorage.getItem("pb"), personalBest)
    if(personalBest==NaN){
        personalBest=personalBest
    }
}
let runstorage = 1
var returntomenustore = 1
var ostore = 1