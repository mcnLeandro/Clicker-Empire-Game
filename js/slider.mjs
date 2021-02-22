
export class Slider {

    constructor(sliderItemsSelector,sliderFrameId, mainId,extraId,leftBtnId,rightBtnId){
        this.sliderItems = document.querySelectorAll(`.${sliderItemsSelector}`);

        this.sliderFrame = document.getElementById(sliderFrameId)
        this.main        = document.getElementById(mainId)
        this.extra       = document.getElementById(extraId)

        this.leftBtn  = document.getElementById(leftBtnId)
        this.leftBtn.sliderObj = this
        this.rightBtn = document.getElementById(rightBtnId)
        this.rightBtn.sliderObj = this
    }
    
    set(){
        if(this.sliderItems.length == 0){
            let div = document.createElement("div")
            div.classList.add("h-500px","p-5")

            let p = document.createElement("p")
            p.classList.add("white","text-center")
            p.innerHTML = "You don't have a single product. You should get that from items."
            div.append(p)
            this.main.append(div)
            this.extra.classList.add("deplete-animation")
        }
        else if(this.sliderItems.length == 1){
            this.main.append(this.sliderItems[0]);
            this.main.setAttribute("data-index", "0");
            this.extra.classList.add("deplete-animation")
        }
        else {

            this.main.append(this.sliderItems[1]);
            this.main.setAttribute("data-index", "1");
            this.slideJump(-1, "left");

            this.leftBtn.addEventListener("click", function(){
                this.sliderObj.slideJump(-1, "left");
            });
            
            this.rightBtn.addEventListener("click", function(){
                this.sliderObj.slideJump(+1, "right");
            });
        }
    }
    slideJump(steps, animationType) {
        let index = parseInt(this.main.getAttribute("data-index"));
        let currentElement = this.sliderItems.item(index) != null ?this.sliderItems.item(index):"" ;
    
        index += steps;
    
        if(index < 0) index = this.sliderItems.length -1;
        else if(index >= this.sliderItems.length) index = 0;
    
        let nextElement = this.sliderItems.item(index)!= null ?this.sliderItems.item(index):"" ;
    
        this.main.setAttribute("data-index", index.toString());
    
        this.animateMain(currentElement, nextElement, animationType);
    }
    animateMain(currentElement, nextElement, animationType) {
        this.main.innerHTML = "";
        this.main.append(nextElement);
        
        this.extra.innerHTML = "";
        this.extra.append(currentElement);
    
        this.main.classList.add("expand-animation");
        this.extra.classList.add("deplete-animation");
        
        if (animationType === "right"){
            this.sliderFrame.innerHTML = "";
            this.sliderFrame.append(this.extra);
            this.sliderFrame.append(this.main);
        } else if (animationType === "left") {
            this.sliderFrame.innerHTML = "";
            this.sliderFrame.append(this.main);
            this.sliderFrame.append(this.extra);
        }
    }
}