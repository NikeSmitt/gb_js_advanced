class GoodList {
    constructor(container = '.good-list') {
        this.container = container
        this.rowGoods = []
        this.goodItems = []
        this.$fetchGoods()
        this.render()


    }

    $fetchGoods() {
        this.rowGoods = [
            {id: 1, title: 'Shirt', price: 150},
            {id: 2, title: 'Socks', price: 50},
            {id: 3, title: 'Jacket', price: 350},
            {id: 4, title: 'Shoes', price: 250},
        ];
    }

    render() {
        this.goodItems = this.rowGoods.map(item => new GoodItem(item));
        let block = this.goodItems.map(item => item.render()).join(' ')
        document.querySelector('.goods-list').innerHTML = block
    }
}


class Basket {

    constructor() {
        this.goods = []

    }

    addGood(goodItem) {
        this.goods.push(goodItem)
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
        const foundItem = this.goods.filter(item => itemId === item.id);
        if (foundItem.length === 1) {
            return foundItem[0]
        }
        console.log('Ошибка поиска нужного элемента!!!')
    }

}


class GoodItem {
    constructor(item) {
        this.id = item.id
        this.title = item.title
        this.price = item.price
        this.description = item.description
        this.image = item.image
    }

    toString() {
        return `<GoodItem ${this.id} ${this.title} ${this.price}>`
    }

    render() {
        return `<div class="goods-item">
                <div class="good-img"></div>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-button">Добавить</button>
            </div>`;
    }
}

function main() {
    let goodList = new GoodList()
    let basket = new Basket()

    // Заполняем корзину
    goodList.goodItems.forEach(item => {
        basket.addGood(item)
    })

    console.log(`В корзине ${basket.getBasketSize()} товаров.`)
    console.log(`В корзине товаров на сумму ${basket.getBasketTotalPrice()}`)

    console.log(`Удаляем объект Socks`)

    const itemToRemove = basket.getItemById(1)
    console.log(`Нашли объект ${itemToRemove}`)
    basket.removeGood(itemToRemove)

    console.log(`В корзине ${basket.getBasketSize()} товаров.`)
    console.log(`В корзине товаров на сумму ${basket.getBasketTotalPrice()}`)
}

main()