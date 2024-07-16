import Button from "../Button/Button.js";
import Input from "../Input/Input.js";
import api from "../API/API.js";
import Select from "../Select/Select.js";
import cardList from "../CardList/CardList.js";
import Visit from "../Visit/Visit.js";
import VisitCardio from "../VisitCardio/VisitCardio.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";
import Textarea from "../Textarea/Textarea.js";
class Form {
    constructor() {
        this.config = {
            login: {
                buttons: ["submit", "cancel", "demoUser"],
                input: ["email", "password"],
                submit: (_, e) => this.handleSubmit(_, e),
                className: ""
            },
            createCard: {
                buttons: ["submit", "cancel"],
                select: ["doctors"],
                submit: (_, e) => this.handleSubmitCreateCard(_, e),//_если нет элеиента
                className: ""
            },
            updateCard: {
                buttons: ["update", "cancel"],

                submit: (cardId, e) => this.handleSubmitUpdateCard(cardId, e),
                className: ""
            },
            deleteCard: {
                buttons: ["delete", "cancel"],
                submit: (cardId, e) => this.handleSubmitDeleteCard(cardId, e),
                className: ""
            },
            search: {
                buttons: ["search"],
                select: ["urgency"],
                input: ["search", "searchDate"],
                submit: (_, e) => this.handleSubmitSearch(_, e),
                className: "form"
            },


        }
        this.form = document.createElement("form")

    }
    render(id, cardId) {

        const {
            buttons,
            input,
            submit,
            select,
            className
        } = this.config[id]

        if (id === "updateCard") {
            this.renderUpdateCard(cardId)
        }
        if (input) {
            input.forEach(item => {
                const inp = new Input().render(item)
                this.form.append(inp)
            })
        }
        if (select) {
            select.forEach(item => {
                const sel = new Select().render(item)
                this.form.append(sel)

            })
        }
        this.form.className = className

        buttons.forEach(item => {
            const btn = new Button(item).renderBtn()
            this.form.append(btn)
        });
        this.form.addEventListener("submit",
            // () => submit(cardId)
            submit.bind(this, cardId)
        )
        return this.form
    }
    async renderUpdateCard(cardId) {

        const inputWrapper = document.querySelector("#input-wrapper")
        const card = await api.getById(cardId)
        if (inputWrapper) {
            inputWrapper.remove()
        }
        const newDiv = document.createElement("div")
        const visitDoctor = new Visit({
            select: {
                arrayOfElem: ["doctors"],
                createElem: (id, card) => new Select().render(id, card)
            },

        })
        visitDoctor.render(newDiv, "select", card)
        const div = document.createElement("div")

        div.id = "input-wrapper"
        const visit = new Visit({
            select: {
                arrayOfElem: ["urgency"],
                createElem: (id, card) => new Select().render(id, card)
            },
            textarea: {
                arrayOfElem: ["purpose", "description"],
                createElem: (id, card) => new Textarea().render(id, card)
            },
            input:
            {
                arrayOfElem: ["dateVisit", "lastName", "name"],
                createElem: (id, card) => new Input().render(id, card)
            },
        })
        visit.render(div, "select", card)
        visit.render(div, "input", card)
        visit.render(div, "textarea", card)

        this.form.prepend(newDiv, div)


        if (card.doctors === "Кардиолог") {
            const visitCardio = new VisitCardio({
                input: {
                    arrayOfElem: ["age", "bmi", "pressure"],
                    createElem: (id, card) => new Input().render(id, card)
                },

                textarea: {
                    arrayOfElem: ["disease"],
                    createElem: (id, card) => new Textarea().render(id, card)
                },

            })
            visitCardio.render(div, "input", card)
            visitCardio.render(div, "textarea", card)
        }

        if (card.doctors === "Стоматолог") {
            const visitDentist = new VisitDentist({
                input: {
                    arrayOfElem: ["lastVisit"],
                    createElem: (id, card) => new Input().render(id, card)
                },
                textarea: {
                    arrayOfElem: ["purpose"],
                    createElem: (id, card) => new Textarea().render(id, card)
                }
            })
            visitDentist.render(div, "input", card)
        }

        if (card.doctors === "Терапевт") {
            const visitTherapist = new VisitTherapist({
                input: {
                    arrayOfElem: ["age"],
                    createElem: (id, card) => new Input().render(id, card)
                }
            })
            visitTherapist.render(div, "input", card)
        }
        cardList.card = null
    }
    async handleSubmit(event) {
        event.preventDefault()
        const input = event.target.querySelectorAll("input")


        const inputData = [...input].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const formData = {
            ...inputData
        }
        const token = await api.login(formData)
        if (token) {
            event.target.closest(".modal").remove()
            const btn = document.querySelector(".loginBtn")
            const newBtn = new Button("createCard").renderBtn()
            btn.replaceWith(newBtn) //поменять вход на создать визит
        }
    }

    async handleSubmitCreateCard(_, event) {
        event.preventDefault()
        const input = event.target.querySelectorAll("input")
        const textarea = event.target.querySelectorAll("textarea")
        const select = event.target.querySelectorAll("select")


        const inputData = [...input].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const selectData = [...select].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const textareaData = [...textarea].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const formData = {
            ...inputData,
            ...selectData,
            ...textareaData,
        }

        const newCard = await api.createCard(formData)
        if (newCard.id) {
            {
                event.target.closest(".modal").remove()
                const elem = cardList.renderCard(newCard)
                const parent = document.getElementById("cards")

                parent.append(elem)
            }

        }
    }
    async handleSubmitDeleteCard(cardId, e) {
        e.preventDefault()
        const deleted = await api.deleteCard(cardId)
        if (deleted) {
            e.target.closest(".modal").remove()
            document.getElementById(cardId).remove()
        }

    }

    async handleSubmitUpdateCard(cardId, e) {
        e.preventDefault()

        const input = e.target.querySelectorAll("input")
        const textarea = e.target.querySelectorAll("textarea")
        const select = e.target.querySelectorAll("select")

        const inputData = [...input].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const selectData = [...select].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const textareaData = [...textarea].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const formData = {
            ...inputData,
            ...selectData,
            ...textareaData,
        }

        const card = await api.updateCard(cardId, formData)//которые уже есть
        if (card) {
            const cardElem = cardList.renderCard(card)//
            const cardPrev = document.getElementById(cardId)

            cardPrev.replaceWith(cardElem)
            e.target.closest(".modal").remove()
        }

    }
    handleSubmitSearch(_, e) {
        e.preventDefault()
        const input = this.form.querySelectorAll("input")
        const select = this.form.querySelectorAll("select")
        const inputData = [...input].reduce((acc, cur) => {
            // console.log(cur.checked)
            // acc[cur.name] = cur.value
            // return acc
            if (cur.type === 'checkbox') {
                acc[cur.name] = cur.checked;
            } else {
                acc[cur.name] = cur.value;
            }

            return acc;
        }, {});
        const cards = Object.values(cardList.cards)

        const selectData = [...select].reduce((acc, cur) => {

            acc[cur.name] = cur.value
            return acc
        }, {})
        const formData = { ...inputData, ...selectData }
        let result = null

        if (formData.search && formData.searchDate && formData.urgency) { 
            result = this.searchByUrgency(formData.urgency, cards)
            result = this.searchByDate(result)
            result = this.search(result, formData.search)
        }
        else if(formData.search && formData.searchDate){
            
            result = this.searchByDate(cards)
            result = this.search(result, formData.search)
        }
        else if(formData.searchDate && formData.urgency){
            
            result = this.searchByUrgency(formData.urgency, cards)
            result = this.searchByDate(result)
        }
        else if(formData.search && formData.urgency){
            
            result = this.searchByUrgency(formData.urgency, cards)
            result = this.search(result, formData.search)
        }
        else if (formData.urgency) {
            result = this.searchByUrgency(formData.urgency, cards)
        }
        else if (formData.searchDate) {
            result = this.searchByDate(cards)
           
        }
        else if (formData.search) {
            result = this.search(cards, formData.search)
        }

        const elemForDelete = document.querySelector("#cards")
        elemForDelete.remove()
        const main = document.querySelector("main")
        cardList.renderCards(result, main)
    }
    searchByUrgency(param, cards) {
        const result = cards.filter(({ urgency }) => urgency === param)//превращаем в массив
        return result
    }
    searchByDate(cards) {
        const now = new Date()

        const cardDate = cards.filter(({ dateVisit }) => {
            const cardDate = new Date(dateVisit);

            return cardDate < now
        })
        return cardDate
    };
    search(cards, param) {
        param = param.toLowerCase()
        const result = cards.filter((item) => {
            const { lastName, name, pressure, bmi, age, purpose, description, disease } = item
            if (lastName.toLowerCase().includes(param) || name.toLowerCase().includes(param) || pressure?.toLowerCase().includes(param) ||
                purpose?.toLowerCase().includes(param) || description?.toLowerCase().includes(param) || disease?.toLowerCase().includes(param) ||
                bmi?.includes(param) || age?.includes(param)) {
                console.log(item)
                return item
            }
        })
        return result
    }
}
export default Form
