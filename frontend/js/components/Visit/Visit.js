
class Visit {
    constructor(config) {
        this.config = config
    }
    render(parent,id, card){
        const {
            arrayOfElem,
            createElem,
        } = this.config[id]
        arrayOfElem.forEach(item => {
            const elem = createElem(item,card)
            parent.append(elem)
        });
        return parent
    }
    renderCard(elem, card){

        elem.insertAdjacentHTML("beforeend",`
            <h3>доктор: ${card.doctors}</h3>
            <p>имя: ${card.name}</p>
            <p>фамилия: ${card.lastName}</p>
            <p>срочность: ${card.urgency}</p>
            <p>дата визита: ${card.dateVisit}</p>
            <p>описание: ${card.description}</p>`)
          
            return elem
    }
}
export default Visit