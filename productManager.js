//Usamos node-fetch 
//para trabajar con fetch en Node.js 
// (ya que estás usando ESModules) 
//npm install node-fetch


//productManager Este archivo contendrá funciones 
//para manejar productos desde la API.

// productManager.js
//importamos el node-fetch
import fetch from 'node-fetch';

//Usamos la API de FakeStore
const API_URL = 'https://fakestoreapi.com/products';

//Exporta una función asincrónica. Consultamos los productos.
export async function getAllProducts() {
  try {
    //Realiza solicitud HTTP a la URL. re suelve la promesa de fetch.
    //Almacena el objeto en un variable.
    const res = await fetch(API_URL);
    //Devuelve FALSE si la solicitud no fue exitosa.
    
    if (!res.ok) {
      throw new Error('Error getting products');
    }

    //devuelve un resultado, en este caso un JSON con los prodcutos de la APÏ
    //de FakeStore.
    return await res.json();

  } catch (error) {
    
    throw new Error('Failed to get products: ' + error.message);
  
  }
}

export async function getProductById (productId) {

  try {

    //usamos un template literals para construir dinamicamente la URL.
    //Espera la respuesta de la solicitud HTTP. y lo guarda en la variables
    const res = await fetch(`${API_URL}/${productId}`);
    
    //devulve un erro en caso de que no se encuentre dicho Id.
    if (!res.ok) {
    
      throw new Error(`Error getting products con ID  ${productId}`);
    
    }
    
    //devuelve un resultado, en este caso un JSON con 
    //los productos de la APÏ de FakeStore.
    return await res.json();
    
  } catch (error) {
    
    throw new Error('Failed to get products: ' + error.message);
  
  }
  
}

//exporta un funcion asincronica, y crea un nuevo elemento o producto
//y lo agrega en un Json. 
export async function createProduct(title, price, category){

  //Hacemos una solicitud HTTP a API_URL y espera la respuesta.
  const res = await fetch(API_URL, {

    //Definimos el metodo de la solicitud es "POST", usamos para enviar 
    //datos al servidor.
    method: 'POST',
    //Cuerpo de la solicitud. Convirtiendo el objeto en una cadena JSON
    body: JSON.stringify({
      title,
      price: parseFloat(price),
      description: 'test product',
      image: 'https://i.pravatar.cc',
      category
    
    }),
    //Se especifica que el contenido de la solicitud es de tipo "application/json"
    headers:{ 'Content-Type': 'application/json' }
  
  })

  //devuelve un resultado, en este caso un JSON con 
  //los productos de la APÏ de FakeStore.
  return await res.json();
}

//Exporta una función asincrónica que recibe un id de producto como argumento.
export async function deleteProduct(Id){
  
  //usamos un template literals para construir dinamicamente la URL.
  //Espera la respuesta de la solicitud HTTP. y lo guarda en la variables
  const res = await fetch(`${API_URL}/${id}`, {
    
    //Indica que es una solicitud HTTP tipo DELETE(Elimina recurso)
    method: 'DELETE'
  
  });
  //Devuelve la respuesta del servidor convertida a JSON
  return await res.json();

}

