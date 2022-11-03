// initialization





class GoodList {
    constructor(basket, container = '.good-list') {
        this.container = container
        this.rawGoods = []
        this.goodItems = []
        this._fetchGoods()
            .then(data => {
                this.rawGoods = data
                this.render()
            })
        this.basket = basket


    }

    async _fetchGoods() {
        try {
            const result = await fetch("https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json")
            return await result.json()
        } catch (err) {
            return console.log(data)
        }
    }

    render() {
        this.goodItems = this.rawGoods.map(item => new GoodItem(item));
        let block = this.goodItems.map(item => item.render()).join(' ')
        document.querySelector('.goods-list').innerHTML = block

        //кнопки добавления в корзину
        const addBtns = document.querySelectorAll(".buy-button");
        addBtns.forEach(btn => {
            btn.onclick = (e) => {
                const itemId = parseInt(e.target.dataset["id_product"])
                // console.log(itemId)
                console.log(e)
                const itemToAdd = this.goodItems.filter(item => itemId === item.id_product)[0];
                // console.log(itemToAdd)
                this.basket.addGood(itemToAdd)

            }
        })
    }
}


class Basket {

    constructor() {
        this.goods = []

    }

    addGood(goodItem) {
        this.goods.push(goodItem)
        this.render()
    }

    removeGood(removeItem) {
        this.goods = this.goods.filter(item => item.id !== removeItem.id)
    }

    getBasketSize() {
        return this.goods.length
    }

    getBasketTotalPrice() {
        return this.goods.reduce((a, b) => a + b.price, 0)
    }

    getItemById(itemId) {
        const foundItem = this.goods.filter(item => itemId === item.id_product);
        if (foundItem.length === 1) {
            return foundItem[0]
        }
        console.log('Ошибка поиска нужного элемента!!!')
    }

    render() {
        const basketBlock = document.querySelector(".basket-items")
        const items = []
        console.log(this.goods)
        this.goods.forEach(good => {
            const block = `<div class="item">
                                <div class="item-name">${good.product_name}</div>
                                <div class="item-price">${good.price}</div>
                                <div class="item-quantity">1</div>
                            </div>`
            items.push(block)
        })
        basketBlock.innerHTML = items.join(' ')
    }

}


class GoodItem {
    constructor(item) {
        this.id_product = item.id_product
        this.product_name = item.product_name
        this.price = item.price
        this.description = item.description
        this.image = item.image
    }

    toString() {
        return `<GoodItem ${this.id_product} ${this.product_name} ${this.price}>`
    }

    render() {
        return `<div class="goods-item">
                <div class="good-img"></div>
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button data-id_product="${this.id_product}" class="buy-button">Добавить</button>
            </div>`;
    }
}

function main() {

    // Привязываемся к модальному окну корзины 
    const basketModal = document.getElementById("basket-modal");
    const basketBtn = document.querySelector(".cart-button");

    // при нажатии кнопки корзины
    basketBtn.onclick = () => { basketModal.style.display = "block" }

    window.onclick = (e) => {
        if (e.target == basketModal) {
            basketModal.style.display = "none";
        }
    }






    let basket = new Basket()
    let goodList = new GoodList(basket)
}

main()