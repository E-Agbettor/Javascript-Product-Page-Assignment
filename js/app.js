 /*Javascript product page assignment week 14
   Trainer: Lash
   ATrainee: Elliot Adinortey Agbettor
   Date: April 9th - 12th, 2021
   A javascript project using classes, objects, arrays, etc to render the DOM
 ----------------------------------------------------------------------- 
 */



// class product
class Product{

    constructor(_id, _imageUrl, _title, _desc, _price, _stock){
        this.id = _id;
        this.imageUrl = _imageUrl;
        this.title = _title;
        this.description = _desc;
        this.price = _price;
        this.stock = _stock;
    }
} 

//class shoppinng Cart
class ShoppingCart{
    items = [];

    //method remove from cart 
    removeFromCart(e){
        if(e.target.classList.contains('remove')){
             e.target.parentElement.parentElement.parentElement.remove();
        }
    }

    //method clear(empty) cart
    clearCart(){
        const cartContent = document.querySelector('#cart-content tbody');
         while(cartContent.firstChild){
             cartContent.removeChild(cartContent.firstChild);
        } 
    }

    //method render (display) shopping cart content
    render(){
        const section = document.createElement('section');
        section.className ='shopping-cart';
        section.innerHTML=`
        <a class"logo">logo</a>
        <div class="display-message"> Item addedd successfully to cart.</div>
        <div>
            <div class="cart">
                <div id="shopping-cart">
                    <table id="cart-content">
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                    </table>
                    <button class="clear-cart" id="clear-cart">clear cart</button>
                    <button class="checkout" >checkout</button>
                </div>
            </div>
        </div>
        `;
        const imgTrash = section.querySelector('#cart-content tbody');
        imgTrash.addEventListener('click', this.removeFromCart);

        const clearCart = section.querySelector('#clear-cart');
        clearCart.addEventListener('click', this.clearCart)
        return section;
    }
}

// class Prouct Item
class ProductItem{
   
    constructor(product) {
        this.product = product;
      }
    
    // method buy product from shop
    buyProduct(e){
        e.preventDefault();
        if(e.target.classList.contains('product-btn')){
            const data = e.target.parentElement.parentElement;
            this.getProductInfo(data);
        }
        
    }

    // method query product information
    getProductInfo(data){
        //create an object with product item data
        const productInfo ={
            image : data.querySelector('img').src,
            title : data.querySelector('h3').textContent,
            price : data.querySelector('h4').textContent
        }
        // console.log(productInfo)
        this.addToCart(productInfo);
    }
    
    // method add product to shopping cart
    addToCart(data){
        const cartContent = document.querySelector('#cart-content tbody');
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <tr>
                <td><img src="${data.image}" width="100"/></td>
                <td>${data.title}</td>
                <td id="price">${data.price}</td>
                <td>
                    <a><img src="img/trash.png" class="remove"/></a>
                </td>
            </tr>
        `;
        cartContent.appendChild(tableRow);
        this.displayMessage();
    }
    
    //display toast
    displayMessage(){
        const displayMessage = document.querySelector('.display-message');
       displayMessage.style.display ="block";
       setTimeout(this.hideMessage, 1500)
    }

    //hide toast
    hideMessage(){
        const displayMessage = document.querySelector('.display-message');
       displayMessage.style.display ="none";
    }
        
    // method display products on the page
    productUI(){
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML=`
            <div class="img-box">
                <img src="${this.product.imageUrl}"/>
            </div>
            <div class="product-details">
                <h3 class="product-title">${this.product.title}</h3>
                <p class="product-desc">${this.product.description}</p>
                <h4 class="price">\GHC ${this.product.price}</h4>
                <p class="in-stock">${this.product.stock}</p>
                <button class="product-btn">Add to Cart</button>
            </div>
        `;
        const addCartButton = div.querySelector('button');
        addCartButton.addEventListener('click', this.buyProduct.bind(this));
        return div;
    }
}

// productlist class
class ProductList{
    // products array
   products=[
        new Product(
            1,
            'img/img-display.jpg',
            'Infinix Hot S5',
            'Android 10.0, 32GB ROM',
            799.99,
            '15 stock'),
        new Product(
            2,
            'img/img-display-2.jpg',
            'Infinix Hot S9',
            'A Smart HD Dual SIM- 32GB HDD - 2GB RAM',
            659.99,
            '10 in stock'),
        new Product(
            3,
            'img/img-infinix-display-4.jpg',
            'Infinix Note 8 Pro',
            'Dual SIM Smartphone -16GB HDD',
             499.99,
             '5 in stock'),
        new Product(
            4,
            'img/img-samsung-display-1.jpg',
            'Samsung Galaxy A21s',
            '32GB HDD - 3GB RAM - Black',
            999.99,
            '7 in stock'),
        new Product(
            5,
            'img/img-infinix-display-4.jpg',
            'Infinix X653 Lite Pro',
            'Dual SIM Smartphone -16GB HDD',
            499.99,
            '3 in stock')
    ];

    // method display iterated products
    render() {
        const section = document.createElement('section');
        section.className = 'row';
        for (const product of this.products) {
          const productItem = new ProductItem(product);
          const div = productItem.productUI();
          section.append(div);
        }
        return section;
        
      }

}

//class App init
class App{
    render() {
        const root = document.getElementById('root');
        //rendering shoppingCart class
        const cart = new ShoppingCart;
        const cartElement = cart.render();
        //rendering productList class
        const productList = new ProductList();
        const productListEl = productList.render();

        root.append(cartElement);
        root.append(productListEl);
    }
}
const app = new App();
app.render();
 
