import "./scss/styles.scss";
import type { IProduct } from "./types";
import Cart from "./components/models/Cart";
import Products from "./components/models/Products";
import Customer from "./components/models/Customer";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";
import ProductsApi from "./components/services/ProductsApi";

const productsModel = new Products();
const cartModel = new Cart();
const customerModel = new Customer();
const apiInstance = new Api(API_URL);
const api = new ProductsApi(apiInstance);

// Моковые товары из utils/data.ts (category в data.ts — string, поэтому приведение типа)
const mockProducts = apiProducts.items as IProduct[];

// ---------- Тестирование модели Products (моковые данные) ----------
console.log("=== Тестирование модели Products ===");

console.log("Список товаров до сохранения (ожидается пустой массив):", productsModel.getProductsList());

productsModel.saveProductsList(mockProducts);
console.log("Список товаров после saveProductsList:", productsModel.getProductsList());

console.log("Выбранный товар до setSelectedProduct (ожидается null):", productsModel.getSelectedProduct());

productsModel.setSelectedProduct(mockProducts[0]);
console.log("Выбранный товар после setSelectedProduct:", productsModel.getSelectedProduct());

console.log(
  "Товар, найденный по id первого товара (getProduct):",
  productsModel.getProduct(mockProducts[0].id)
);
console.log(
  "Товар по несуществующему id (getProduct, ожидается null):",
  productsModel.getProduct("non-existent-id")
);

// ---------- Тестирование модели Cart (моковые данные) ----------
console.log("=== Тестирование модели Cart ===");

console.log("Товары в корзине до добавления (getItemsList):", cartModel.getItemsList());
console.log("Количество товаров в корзине до добавления (getItemsCount):", cartModel.getItemsCount());

cartModel.add(mockProducts[0]);
cartModel.add(mockProducts[1]);
// Товар без цены (price: null) — проверяем, что он не ломает подсчёт суммы
cartModel.add(mockProducts[2]);
console.log("Товары в корзине после add трёх товаров (getItemsList):", cartModel.getItemsList());
console.log("Количество товаров в корзине (getItemsCount):", cartModel.getItemsCount());
console.log("Общая стоимость корзины (getTotalPrice):", cartModel.getTotalPrice());
console.log(
  "Наличие в корзине первого товара (contains, ожидается true):",
  cartModel.contains(mockProducts[0].id)
);
console.log(
  "Наличие в корзине товара, которого там нет (contains, ожидается false):",
  cartModel.contains(mockProducts[3].id)
);

cartModel.remove(mockProducts[0]);
console.log("Товары в корзине после remove первого товара (getItemsList):", cartModel.getItemsList());
console.log("Количество товаров после remove (getItemsCount):", cartModel.getItemsCount());
console.log("Общая стоимость после remove (getTotalPrice):", cartModel.getTotalPrice());
console.log(
  "Наличие в корзине удалённого товара (contains, ожидается false):",
  cartModel.contains(mockProducts[0].id)
);

cartModel.clear();
console.log("Товары в корзине после clear (getItemsList):", cartModel.getItemsList());
console.log("Количество товаров после clear (getItemsCount):", cartModel.getItemsCount());
console.log("Общая стоимость после clear (getTotalPrice):", cartModel.getTotalPrice());

// ---------- Тестирование модели Customer (моковые данные) ----------
console.log("=== Тестирование модели Customer ===");

console.log("Данные покупателя до сохранения (getCustomerData):", customerModel.getCustomerData());
console.log(
  "Ошибки валидации при пустых данных (validateSavedData):",
  customerModel.validateSavedData()
);

customerModel.saveCustomerData({ payment: "card" });
console.log("Данные после сохранения только payment (getCustomerData):", customerModel.getCustomerData());
console.log(
  "Ошибки валидации при заполненном только payment (validateSavedData):",
  customerModel.validateSavedData()
);

customerModel.saveCustomerData({ address: "г. Москва, ул. Пушкина, д. 1" });
customerModel.saveCustomerData({ email: "invalid-email" });
console.log("Данные после сохранения address и некорректного email (getCustomerData):", customerModel.getCustomerData());
console.log(
  "Ошибки валидации при некорректном email и пустом телефоне (validateSavedData):",
  customerModel.validateSavedData()
);

customerModel.saveCustomerData({ email: "test@example.com", phone: "+7 (999) 123-45-67" });
console.log("Данные после сохранения всех полей (getCustomerData):", customerModel.getCustomerData());
console.log(
  "Ошибки валидации при полностью заполненных данных (validateSavedData, ожидается пустой объект):",
  customerModel.validateSavedData()
);

customerModel.clearCustomerData();
console.log("Данные покупателя после clearCustomerData (getCustomerData):", customerModel.getCustomerData());
console.log(
  "Ошибки валидации после clearCustomerData (validateSavedData):",
  customerModel.validateSavedData()
);

// ---------- Проверка getProducts с реальными данными сервера ----------
console.log("=== Запрос каталога товаров с сервера (getProducts) ===");

api
  .getProducts()
  .then((response) => {
    productsModel.saveProductsList(response.items);
    console.log("Каталог товаров, полученный с сервера (getProductsList):", productsModel.getProductsList());
  })
  .catch((error) => {
    console.error("Ошибка при получении каталога товаров с сервера:", error);
  });
