
class Textarea {
    constructor() {
        this.config = {
            purpose: {
                label: "Цель визита",
                className: "textarea",
                placeholder: "Цель визита",
                name: "purpose",
                id: "purposeVisit"
            },
            description: {
                label: "Краткое описание визита",
                className: "textarea",
                placeholder: "краткое описание визита",
                name: "description",
                id: "description"
            },
            disease: {
                label: "перенесенные заболевания сердечно-сосудистой системы",
                className: "textarea",
                placeholder: "перенесенные заболевания сердечно-сосудистой системы",
                name: "disease",
                id: "disease",
            },
            

        }
        this.textarea = document.createElement("textarea")
        this.label = document.createElement("label")
    }
    render(id,card) {
        
        const {
            label,
            className,
            placeholder,
            name,
            id: elemId,
        } = this.config[id]

        this.textarea.name = name
        this.textarea.className = className
        this.textarea.value = card? card[name]:""
        this.textarea.placeholder = placeholder
        this.textarea.id = elemId
        ///
        this.label.textContent = label
        this.label.htmlFor = elemId //привязка label input
        this.textarea.required = true // если не заполнить все поля, не даст пройти дальше

        this.label.append(this.textarea)
        return this.label
}}
export default Textarea
