class ElementAttribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;

        if (shouldRender) {
            this.render();
        }
    }

    render() {}

    createRootElement = (tag, cssClasses, attributes) => {
        const rootElement = document.createElement(tag);

        rootElement.className = cssClasses || "";

        if (attributes && attributes.length > 0) {
            attributes.forEach( ({ name, value }) => rootElement.setAttribute(name, value));
        }

        document.getElementById(this.hookId).appendChild(rootElement);

        return rootElement;
    }
}

class Product {
    constructor(title, img, price, desc) {
        this.title = title;
        this.imageUrl = img;
        this.price = price;
        this.description = desc;
    }
}

class ProductItem extends Component{
    constructor(product, hook) {
        super(hook, false);
        this.product = product;
        this.render();
    }

    addProductToCart = () => {
        App.addProductToCart(this.product);
    }

    render = () => {
        const prodEl = this.createRootElement("li", "product-item");

        prodEl.innerHTML = `
                <div>
                    <img src="${this.product.imageUrl}" alt="${this.product.title}">
                    
                    <div class="product-item__content">
                        <h2>${this.product.title}</h2>
                        <h3>$${this.product.price}</h3>
                        <p>${this.product.description}</p>
                        <button>Add to cart</button>
                    </div>
                </div>
           `;


        const addCartBtn = prodEl.querySelector("button");

        // addCartBtn.onclick = (e) => (()=> {
        //     console.log("You push the button ...");
        //
        //     console.log(this.product);
        // })(this);
        addCartBtn.addEventListener("click", this.addProductToCart);
    }
}

class ProductList extends Component{
    constructor(hookId) {
        super(hookId, false);

        this.#fetchProducts();
        this.render();
    }

    #products = [];

    #fetchProducts = () => {
        this.#products = [
            new Product(
                "iphone X",
                "https://i.allo.ua/media/catalog/product/cache/1/image/600x415/799896e5c6c37e11608b9f8e1d047d15/5/1/517ab8933a68aba57613c964a6e9d16e.jpg",
                899,
                `Apple iPhone X – воплощение лучших инновационных решений. Абсолютно новый дизайн с 
                переосмысленной системой управления. Безрамочный дизайн выводит опыт использования на новый уровень. Корпус из стекла и металла. 
                Совершенное аппаратное ядро, благодаря мощнейшей внутренней 64 битной архитектуре. Разительно улучшенная самая популярная в мире мобильная камера. 
                Именно таким видит свой флагманский смартфон компания Apple в 2017 году.
                `
            ),
            new Product(
                "xiaomi redmi note 8 pro",
                "https://i.allo.ua/media/catalog/product/cache/1/image/600x415/799896e5c6c37e11608b9f8e1d047d15/g/7/g7-_-__7.jpg",
                300,
                `Redmi Note 8 Pro оснащен 6.53 – дюймовым FullHD+ экраном, который занимает 91.4 % площади фронтальной панели. Он обрамлен практически незаметными рамками, 
                ширина которых по бокам составляет всего 1.8 мм, сверху и снизу – 2.05 мм и 4.2 мм соответственно. 
                Экран защищен 3D-стеклом повышенной прочности Double Corning Gorilla Glass.
                `
            ),
            new Product(
                "samsung galaxy s20 ultra",
                "https://i.allo.ua/media/catalog/product/cache/1/image/600x415/799896e5c6c37e11608b9f8e1d047d15/f/i/file_1551_20.jpg",
                1299,
                `Galaxy S20 Ultra предоставляет невиданные до сих пор возможности для создания фотошедевров. 
                Система камер с искусственным интеллектом позволяет заглянуть за горизонт и рассмотреть окружающую вас красоту до мельчайших подробностей.
                `
            )
        ];

        // this.renderProducts();
    }

    renderProducts = () => this.#products && this.#products.forEach(item => {
        new ProductItem(item, "listOfProduct");
    });

    render = () => {
        console.log("PRODUCTS:", this.#products)
        this.createRootElement("ul", "product-list", [new ElementAttribute("id", "listOfProduct")]);

        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }

    }

}

class ShoppingCart extends Component{
    constructor(hook) {
        super(hook, false);
        this.render();
    }

    items = [];

    set cartItems(value) {
        this.items = value;

        this.totalOutput.innerHTML = `<h2>Total:\$${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount() {
        return this.items.reduce((prev, cur) => prev + cur.price, 0)
    }

    addProduct = product => {
        this.cartItems = [...this.items, product];
        console.log(this.items);
    }

    orderProduct = () => {
        console.log("You caught ...");
        console.log("ITEMS:", this.items);

    }

    render = () => {
        const cartEl = this.createRootElement("section", "cart");

        cartEl.innerHTML = `
            <h2>Total: \$${"0.00"}</h2>
            <button>Order now!</button>
        `;

        const orderBtn = cartEl.querySelector("button");

        orderBtn.addEventListener("click", this.orderProduct)

        this.totalOutput = cartEl.querySelector("h2");
    }
}

class Shop {
    constructor() {
        this.render();
    }

    render = () => {
        this.cart = new ShoppingCart("app");

        new ProductList("app");
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();

        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
