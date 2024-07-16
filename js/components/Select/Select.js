import Visit from "../Visit/Visit.js"
import Textarea from "../Textarea/Textarea.js"
import Input from "../Input/Input.js"
import VisitCardio from "../VisitCardio/VisitCardio.js"
import VisitDentist from "../VisitDentist/VisitDentist.js"
import VisitTherapist from "../VisitTherapist/VisitTherapist.js"
import cardList from "../CardList/CardList.js"
class Select {
    constructor() {
        this.config = {
            doctors: {
                options: [
                    "Выберите врача",
                    "Кардиолог",
                    "Стоматолог",
                    "Терапевт",
                ],
                value: [
                    "",
                    "Кардиолог",
                    "Стоматолог",
                    "Терапевт",
                    // "cardiologist",
                    // "dentist",
                    // "therapist",

                ],
                label: "Выберите врача",
                name: "doctors",
                className: "doctors",
                onChange: (e) => this.handleChange(e)
            },

            urgency: {
                options: [
                    "Выберите срочность",
                    "обычная",
                    "приоритетная",
                    "неотложная"
                ],
                value: [
                    "",
                    "обычная",
                    "приоритетная",
                    "неотложная"
                    // "regular",
                    // "priority",
                    // "urgent",
                ],
                label: "Срочность",
                className: "urgency",
                name: "urgency",
            }

        }

        this.select = document.createElement("select")
        this.element = document.createElement("label")
    }
    render(id,card) {
        const {
            options,
            value,
            name,
            className,
            label,
            onChange
        } = this.config[id]
        this.select.name = name
        this.element.textContent = label
        this.select.className = className
        options.forEach((item, index) => {
            const option = document.createElement("option")
            option.textContent = item
            option.value = value[index]
            if (!index) {
                option.disabled = true
            }//если индекс 0, то нельзя выбрать
            this.select.append(option)
        });
        this.select.addEventListener("change", onChange)
        this.select.value = card? card[name]:options[0]

        this.element.append(this.select)
        return this.element
    }
    handleChange(event) {   
        const value = event.target.value.toLowerCase()
        const inputWrapper = document.querySelector("#input-wrapper")
        const card = cardList.card//которая есть

        if (inputWrapper) {
            inputWrapper.remove()
        }
        const div = document.createElement("div")
       
        div.id = "input-wrapper"
        const visit = new Visit({
            select: {
                arrayOfElem: ["urgency"],
                createElem: (id,card) => new Select().render(id,card)
            },
            textarea: {
                arrayOfElem: ["purpose", "description"],
                createElem: (id,card) => new Textarea().render(id,card)
            },
            input:
            {
                arrayOfElem: ["dateVisit", "lastName", "name"],
                createElem: (id,card) => new Input().render(id,card)
            },
        })
        visit.render(div, "input",card)
        visit.render(div,"textarea",card)
        visit.render(div,"select",card)
        event.target.after(div)

      
        if(value.toLowerCase() ==="кардиолог" ){
           
            const visitCardio = new VisitCardio({
               input: {
                arrayOfElem: ["age", "bmi", "pressure"],
                createElem: (id) => new Input().render(id)
            },
           
            textarea: {
                arrayOfElem: ["disease"],
                createElem: (id) => new Textarea().render(id)
            },  
          
            })
            visitCardio.render(div, "input")
            visitCardio.render(div,"textarea")
        }

        if(value === "стомотолог"){
            const visitDentist = new VisitDentist({
                input: {
                    arrayOfElem:["lastVisit"],
                    createElem: (id) => new Input().render(id)
                }
            })
            visitDentist.render(div, "input")
        }

        if(value === "терапевт") {
            const visitTherapist = new VisitTherapist({
                input:{
                    arrayOfElem:["age"],
                    createElem: (id) => new Input().render(id)
                }
            })
            visitTherapist.render(div, "input")
        }

    }
}
export default Select