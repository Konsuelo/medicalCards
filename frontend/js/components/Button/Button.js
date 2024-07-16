import Modal from "../Modal/Modal.js"
import cardList from "../CardList/CardList.js"
class Button {
    constructor(id) {
        this.button = document.createElement("button")
        this.config = {
            login: {
                title: "Вход",
                className: "btn loginBtn",
                onclick: (event) => this.handlerLogin(event)
            },
            close: {
                title: "x",
                className: "btn close",
                onclick: (e) => this.handlerClose(e)
            },
            submit: {
                title: "подтвердить",
                className: "btn submit",
                type: "submit"
            },
            cancel: {
                title: "отмена",
                className: "btn cancel",
                onclick: (e) => this.handlerClose(e)
            },
            demoUser: {
                title: "demoUser",
                className: "btn demoUser",
                onclick: this.handlerDemoUser.bind(this)
            },
            createCard: {
                title: "Создать карточку",
                className: "btn createVisit",
                onclick: (event) => this.handlerLogin(event)
            },
            updateCard: {
                title: "Обновить карточку",
                className: "btn updateCard",
                onclick: (event) => this.handlerUpdate(event)
            },
            deleteCard: {
                title: "Удалить карточку",
                className: "btn deleteCard",
                onclick: (event) => this.handlerDelete(event)
            },
            showMoreCard: {
                title: "показать больше",
                className: "btn showMoreCard",
                onclick: (event) => this.handleShowMore(event)
            },
            delete: {
                type:"submit",
                title:"удалить",
                className:"delete",
            },
            search:{
                className: "btn searchBtn",
                title:"поиск",
              type:"submit"
            },
            update:{
                className:"btn updateBtn",
                title:"обновить",
                type:"submit"
            }
        }
        this.id = id
        this.user = {
            email: "shyl_92@mail.ru",
            password: "123456789"
        }
    }
    renderBtn() {
        const {
            title,
            className,
            onclick,
            type
        } = this.config[this.id]
        this.button.textContent = title
        this.button.className = className
        this.button.type = type || "button"
        this.button.addEventListener("click", onclick)
        return this.button
    }
    handlerLogin() {

        const modal = new Modal().renderModal(this.id)

        const parent = document.getElementById("root")
        parent.append(modal)
    }
    handlerClose(event) {
        const m = event.target.closest(".modal")
        cardList.card = null
        m.remove()
    }
    handlerDemoUser(event) {

        const form = event.target.closest("form")
        const input = form.querySelectorAll("input")
        input.forEach(item => {
            item.value = this.user[item.name]//Input class email, password

        });
    }
    handlerUpdate(event) {
        const id = event.target.closest("li").id
        const modal = new Modal().renderModal(this.id,id)
        
        const parent = document.getElementById("root")
        parent.append(modal)
    }
    handlerDelete(event) {
        const id = event.target.closest("li").id
        const modal = new Modal().renderModal(this.id,id)
        const parent = document.getElementById("root")
        parent.append(modal)
    }
    async handleShowMore(event) {   
        const id = event.target.closest("li").id
   
        const modal = await new Modal().renderModalWithOutForm(this.id, id)
        const parent = document.getElementById("root")
        parent.append(modal)
    }


}
export default Button
