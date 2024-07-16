import Form from "../Form/Form.js"
class Search {
    constructor() {
        this.section = document.createElement("section")
        this.parent = document.querySelector("#root")
    }

    render() { 
        const newForm = new Form().render("search")
        this.section.append(newForm)
        this.parent.append(this.section)
        return this.section
    }
}
export default new Search()