import Button from "../Button/Button.js"
class Header {
    constructor() {
        this.parent = document.querySelector("#root")
        this.logo = document.createElement("img")
        this.logo.src = "../img/sign-emergency-code-sos_23_icon-icons.com_57202.svg"
        this.header = document.createElement("header")
      
        this.container = document.createElement("div")
        this.container.className = "container"
        this.nav = document.createElement("nav")
        this.nav.className="header_nav"
    }
    renderHeader(id) {
        const btn = new Button(id).renderBtn()
        this.parent.prepend(this.header)
        this.header.append(this.container)
        this.container.append(this.nav)
        this.nav.append(this.logo, btn)
    }
}
export default new Header()