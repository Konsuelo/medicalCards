import header from "./components/Header/Header.js"
import api from "./components/API/API.js"
import cardList from "./components/CardList/CardList.js"
import Main from "./components/Main/Main.js"
import search from "./components/Search/Search.js"
const init = async () => {
    const token = api.token
    const id = token ? "createCard" : "login"
    header.renderHeader(id)
    search.render()
    if (token) {
        const cards = await api.getAllCards()
       
        if (!cards.length) {
            const main = new Main().render("noCards")
           const root= document.querySelector("#root")
           root.append(main)
            return
        }
      
        const main = new Main().render("cardList")
        cardList.renderCards(cards, main)
    }
}
init()