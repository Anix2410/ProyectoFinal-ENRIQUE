import { createContext, useState } from "react";


export const CartContext = createContext({})


export const CartProvider = ({children}) => {
 const [cart, setCart] = useState([])


const addToCart = (item,cantidad)=> {
   

    if(isInCart(item.id)){
       
        const updatedCart = cart.map((prod)=>{
            if(prod.id === item.id){
               
                return {...prod, quantity: prod.quantity + cantidad}
            }else{
                return prod
            }
        })
        setCart(updatedCart)
    }else{

        setCart([...cart, {...item, quantity:cantidad}])
    }
}


const clear = () =>{
    setCart([])
}

const removeItem = (id) => {
setCart(cart.filter((prod)=> prod.id !== id))
}

const isInCart = (id) => {
    return cart.some((prod)=> prod.id === id)
}


    const cartQuantity = () => {
        return cart.reduce((acc, prod)=> acc+= prod.quantity,0)
    }

const cartTotal = () => {
    return cart.reduce((acc, prod)=> acc += prod.price * prod.quantity, 0)
}


const itemQuantity = (id) => {
    const itemInCart = cart.find((prod)=> prod.id === id)
    if(itemInCart){
        
        return itemInCart.quantity
    }else{
        
        return 0
    }
}

    return(
        <CartContext.Provider value={{cart, addToCart, clear, removeItem, cartTotal, cartQuantity, itemQuantity}}>
            {children}
        </CartContext.Provider>
    )
}