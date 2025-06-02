// index.js
// importamos las funciones de productManager.js

import { getAllProducts, 
         getProductById, 
         createProduct, 
         deleteProduct } from './productManager.js';

//process.argv es un arreglo que contiene todos los argumentos pasados al programa.

const [ , , method, resource ] = process.argv;

// Ej: GET solicitamos los datos de un servidor 
// Ej: products o products/ID 

async function main() {
  try {

     //Si el metodo es GET y es products realizar las acciones que solicita
     if (method === 'GET' && resource === 'products') {
     
          //Realiza solicitud HTTP a la URL. re suelve la promesa de fetch.
          //Almacena el objeto en un variable. 
          const products = await getAllProducts();

          //imprime los elementos de los productos.
          products.forEach(p => console.log(`[${p.id}] ${p.title} - $${p.price}`)); 
        
     }else 
          ////Si el metodo es GET y si el argumento products/15 
          // realizar las acciones que solicita.
          if(method === 'GET' && (resource === 'products' || resource.startsWith('products/'))) { 
               
               //Almacena un string del argumento product/15.
               const productId = resource.split('/')[1];

               //Realizamos solicitud HTTP a la URL. se devulve la promesa de fetch
               //Almacena el objero en una variable.
               const product = await getProductById(productId);

               //impirmimos los valores del array.
               console.log(`ID: ${product.id}`);
               console.log(`Título: ${product.title}`);
               console.log(`Precio: $${product.price}`);
               console.log(`Categoría: ${product.category}`);

     }else 
          
          //Si es el metodo "POST" recurso que crea o envia datos
          // y si es products el recurso con el que trabajamos.
          if(method === 'POST' && resource === 'products'){

            // Desde índice 4 para tomar lo que viene después 
            // de 'POST' y 'products'
            const args = process.argv.slice(4);    
            const [title, price, category] = args;

            //Verifico que la variables es definida y no sea null o undefined
            if (!title || !price || !category) {

                console.log('Uso: npm run start POST products <title> <price> <category>');
                return;

            }

            //Realizamos solicitud HTTP a la URL. se devulve la promesa de fetch
            //Almacena el objero en una variable. 
            const newProduct = await createProduct(title, price, category);

            console.log('Producto creado con ID:', newProduct.id);

       }else 
          
          //Verifica que el metodo solicitado sea DELETE y 
          //que el argumento  products/15
          if(method === 'DELETE' && resource.startsWith('products/')){
            
             const productId = resource.split('/')[1];
             const deleteProd = await deleteProduct(productId);
             console.log('Product removed: ' + deleteProd);

       }
       else{
            //Indicamos como debe ser llamado los argumento en caso de fallar.
            console.log('Unrecognized command. Usage: ');
            console.log('npm run start GET products');
            console.log('npm run start GET products/<id>');
            console.log('npm run start POST products <title> <price> <category>');
            console.log('npm run start DELETE products/<id>');
        }   
        
   } 
  catch (error) {
        console.error('Error:', error.message);
  }
  
}


main();
