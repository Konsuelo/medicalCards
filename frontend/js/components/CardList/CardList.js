import Button from "../Button/Button.js"
class CardList {
    constructor() {
        this.cards = {}
        this.parent = document.querySelector("#root")
        this._card = null// чтобы сохранить, карту , которая уже создана
    }

    get card() {
        return this._card
    }
    set card(value) {
        this._card = value
    }
    formatData(cards) {
       
        const updateList = cards.reduce((acc, cur) => {
            
            acc[cur.id] = cur
            return acc
        }, {})
        this.cards = { ...this.cards, ...updateList }
      
    }
    renderCards(cards, main) {
        const ul = document.createElement("ul")
        this.formatData(cards)
        ul.id = "cards"
        cards.forEach(elem => {
            const cardElement = this.renderCard(elem);
            ul.appendChild(cardElement);
        });

        main.append(ul)
        this.parent.appendChild(main);
        // main.insertAdjacentElement("beforeend", cards.map(elem => {
        //     this.renderCard(elem)
        // }))
        // this.parent.append(main)
    }
    renderCard(card) {
        // this.cards[card.id] = card

        const li = document.createElement("li")
        li.id = card.id
        const btnUpdate = new Button("updateCard").renderBtn()
        const btnDelete = new Button("deleteCard").renderBtn()
        const btnShowMore = new Button("showMoreCard").renderBtn()
        // const btnSearch = new Button("searchBtn").renderBtn()
        li.insertAdjacentHTML("beforeend", `<h4>${card.name} ${card.lastName} </h4><p>${card.doctors}</p>`)
        const div = document.createElement("div")
        div.append(btnUpdate, btnDelete, btnShowMore)
        li.append(div)
        return li
    }
}
export default new CardList()