
class Input {
    constructor() {
        this.config = {
            email: {
                label: "email",
                className: "input",
                placeholder: "example@gmail.com",
                type: "email",
                name: "email",
                id: "email",
                required: true //будет писать "обязательно для заполнения"
            },
            password: {
                label: "password",
                className: "input",
                placeholder: "password",
                type: "password",
                name: "password",
                id: "password",
                required: true
            },
            pressure: {
                label: "обычное давление",
                className: "input",
                placeholder: "number",
                type: "number",
                name: "pressure",
                id: "pressure",
                required: true
            },
            bmi: {
                label: "индекс массы тела",
                className: "input",
                placeholder: "BMI",
                type: "number",
                name: "BMI",
                id: "BMI",
                required: true
            },
            age: {
                label: "возраст",
                className: "input",
                placeholder: "возраст",
                type: "number",
                name: "age",
                id: "age",
                required: true
            },
            dateVisit: {
                label: "Дата следующего посещения",
                className: "dateVisit",
                type: "date",
                name: "dateVisit",
                id: "dateVisit",
                required: true
            },
            lastName:{
                label:"Фамилия",
                className:"input",
                placeholder:"фамилия",
                name: "lastName",
                id:"lastName",
                required: true
            },
            name:{
                label:"Имя",
                className:"input",
                placeholder:"имя",
                name: "name",
                id:"name",
                required: true
            },
            lastVisit:{
                label: "Дата последнего визита",
                className:"lastVisit",
                type: "date",
                name: "lastVisit",
                id:"lastVisit",
                required: true
            },
            search:{
                label:"поиск",
                className:"search",
                name:"search",
                id:"search",
                placeholder:"поиск",
                required: false
            },
            searchDate:{
                label:"прошел визит",
                className:"searchDate",
                name:"searchDate",
                id:"searchDate",
                type:"checkbox",
                required: false
            },


        }
        this.input = document.createElement("input")
        this.label = document.createElement("label")
    }
    render(id,card) {
        const {
            label,
            className,
            placeholder,
            type,
            name,
            id: inputId,
            required
        } = this.config[id]
       
        this.label.textContent = label
        this.input.name = name
        this.input.className = className
        this.input.placeholder = placeholder
        this.input.type =  type || "text"
        this.input.value = card? card[name]:""
        this.input.id = inputId
        this.input.required = required // в браузере обязательное заполнение
        this.label.htmlFor = inputId
        this.label.append(this.input)
    
        return this.label
        
    }
    
}
export default Input