import Visit from "../Visit/Visit.js";
class VisitTherapist extends Visit {
    constructor(config) {
        super(config) 
    }
    renderCard(elem, card){
        elem.insertAdjacentHTML("beforeend",`
            <p>возвраст: ${card.age}</p>
            `)
            return elem
    }
}
export default VisitTherapist