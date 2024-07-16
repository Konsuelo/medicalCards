import cardList from "../CardList/CardList.js"
class API {
    constructor() {
        this.token = localStorage.getItem("token") || null
        this.baseurl = "https://ajax.test-danit.com/api/v2/cards/"
    }
    async login(formData) {
        try {
            const response = await fetch(`${this.baseurl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error({ message: "invalid credential" }) //если не впорядке пароль или эмэйл
            }
            const data = await response.text()
            localStorage.setItem("token", data)
            this.token = data
            return this.token
        }
        catch (error) {
            return error
        }
    }

    async deleteCard(cardId) {
        try {
            const response = await fetch(`${this.baseurl}/${cardId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            })
            if (!response.ok) {
                throw new Error({ message: "ошибка удаления карточки" }) //если не впорядке пароль или эмэйл
            }
           
            return true
        }
        catch (error) {
            return error
        }
    }

    async createCard(formData) {
       
        try {
            const response = await fetch(`${this.baseurl}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(formData)

            })
            if (!response.ok) {
                throw new Error({ message: "ошибка создания карточки" })
            }
            const data = await response.json()
            return data
        }
        catch (error) {
            return error
        }
    }

    async getAllCards() {
        
        try {
            const response = await fetch(`${this.baseurl}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            })
            if (!response.ok) {
                throw new Error({ message: "ошибка получение карточки" })
            }
            const data = await response.json()
           
            return data
            //Переменная data используется для хранения данных, полученных в ответ на запрос к серверу, 
            // который выполняется с помощью метода response.json(). 
            // Этот метод преобразует ответ от сервера в формат JSON и возвращает его в виде JavaScript объекта.
            //  После того как данные будут получены и преобразованы в объект, они сохраняются в переменной data, 
            //  чтобы можно было с ними взаимодействовать
        }
        catch (error) {
            return error
        }
    }

    async getById(cardId) {
        try {
            const response = await fetch(`${this.baseurl}/${cardId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
            })
            if (!response.ok) {
                throw new Error({ message: "ошибка получения карточки по ID" })
            }
            const data = await response.json()
            cardList.card = data
            return data
        }
        catch (error) {
            return error
        }
    }

    async updateCard(cardId, formData) {
        try {
            const response = await fetch(`${this.baseurl}/${cardId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error({ message: "ошибка обнавления карточки" })
            }
            const data = await response.json()
            return data
            }
            catch (error) {
                return error
        }
        }
  
    logOut() {
        localStorage.removeItem("token")
        this.token = null
    }//удаление localeStorage из токена выйти user
}
export default new API()


// d0adebd4-e1c9-454b-98e8-fa251493ab9e




// fetch("https://ajax.test-danit.com/api/v2/cards/login", {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ email: 'your@email.com', password: 'password' })
// })
// //   .then(response => response.text())
// //   .then(token => console.log(token))


