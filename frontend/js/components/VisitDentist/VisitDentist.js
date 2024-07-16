import Visit from "../Visit/Visit.js";
class VisitDentist extends Visit {
    constructor(config) {
        super(config) 
    }
    renderCard(elem, card){
       
         elem.insertAdjacentHTML("beforeend",`
           <p>цель визита: ${card.purpose}</p>
           <p>дата последнего посещения: ${card.lastVisit}<p>
             `)
             return elem
    }
}
export default VisitDentist