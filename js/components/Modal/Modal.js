import Button from "../Button/Button.js";
import Form from "../Form/Form.js";
import api from "../API/API.js";
import Visit from "../Visit/Visit.js";
import VisitCardio from "../VisitCardio/VisitCardio.js";
import VisitDentist from "../VisitDentist/VisitDentist.js";
import VisitTherapist from "../VisitTherapist/VisitTherapist.js";
class Modal {
    constructor() {
        this.config = {
            login: {
                title: "Добро пожаловать, залогинтесь",
            },
            createCard: {
                title: "Создание карточки"

            },
            updateCard: {
                title: "Обновить карточку"
            },
            deleteCard: {
                title: "Удалить карточку"
            },
            showMoreCard: {
                title: "показать больше"
            }

        }
        this.modal = document.createElement("div")

        this.modalContent = document.createElement("div")


    }
    renderModal(id, cardId) {

        const {
            title,
        } = this.config[id]
        const button = new Button("close").renderBtn()
        const titleElem = document.createElement("h2")
        const newForm = new Form().render(id, cardId)
        
        this.modal.className = "modal"
        this.modalContent.className = "modal-content"
        titleElem.textContent = title
        
        this.modalContent.append(button, titleElem, newForm)
        this.modal.append(this.modalContent)
        return this.modal
    }
    async renderModalWithOutForm(id, cardId) {
        const {
            title,
        } = this.config[id]

        const button = new Button("cancel").renderBtn()
        const btnClose = new Button("close").renderBtn()
        const titleElem = document.createElement("h2")
        titleElem.textContent = title
        
        const card = await api.getById(cardId)
        const div = document.createElement("div")
        const visit = await new Visit().renderCard(div, card)
        
        this.modal.className = "modal"
        this.modalContent.className = "modal-content"
       
        if (card.doctors === "Стоматолог") {
            const newVisitDentist = await new VisitDentist().renderCard(div, card)
            this.modalContent.append(btnClose, titleElem, visit, newVisitDentist, button)

        }
        if(card.doctors === "Терапевт"){
            const newVisitTherapist = await new VisitTherapist().renderCard(div,card)
          
            this.modalContent.append(btnClose, titleElem, visit, newVisitTherapist, button)
        }
        if(card.doctors === "Кардиолог"){
            const newVisitCardiologist = await new VisitCardio().renderCard(div,card)
            this.modalContent.append(btnClose, titleElem, visit, newVisitCardiologist, button)
        }
        this.modalContent.append(button) //add
        this.modal.append(this.modalContent)
        return this.modal
    }

}
export default Modal


// <!-- The Modal -->
// <div id="myModal" class="modal">

//   <!-- Modal content -->
//   <div class="modal-content">---СДЕЛАТЬ
//     <span class="close">&times;</span>
//     <p>Some text in the Modal..</p>
//   </div>

// </div>