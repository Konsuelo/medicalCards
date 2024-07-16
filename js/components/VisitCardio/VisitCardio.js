import Visit from "../Visit/Visit.js";
class VisitCardio extends Visit {
    constructor(config) {
        super(config)
    }
    renderCard(elem, card) {
       
        elem.insertAdjacentHTML("beforeend", `
           <p>давление: ${card.pressure}</p> 
           <p>индекс массы тела: ${card.BMI}</p>
           <p>перенесенные заболевания сердечно-сосудистой системы: ${card.disease}</p>
            `)
        return elem
    }
}
export default VisitCardio