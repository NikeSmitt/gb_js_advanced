const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];


const renderGoodsItem = item => {
    return `<div class="goods-item">
                <div class="good-img"></div>
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-button">Добавить</button>
            </div>`;
};
const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}
renderGoodsList(goods);