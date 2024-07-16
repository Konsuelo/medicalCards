class Main {
constructor(){
    this.config = {
        noCards: {
            title: "no cards",
            elem: document.createElement("p")
        },
        cardList:{
            title: "card",
            elem: document.createElement("h2")
        }
    }
    this.main = document.createElement("main")
}
render(id){
    const {
        title,
        elem,
    } = this.config[id]
    elem.textContent = title
    this.main.append(elem)
    return this.main
}
}
export default Main