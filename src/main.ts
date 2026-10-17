import "./scss/styles.scss";
import type { IProduct } from "./types";
import Cart from "./components/models/Cart";
import Products from "./components/models/Products";
import Customer from "./components/models/Customer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import ProductsApi from "./components/services/ProductsApi";

const productsModel = new Products();
const cartModel = new Cart();
const customerModel = new Customer();
const apiInstance = new Api(API_URL);
const api = new ProductsApi(apiInstance);
const products = await api.getProducts();

productsModel.saveProductsList(products.items as IProduct[]);

console.log(productsModel.getProductsList());
