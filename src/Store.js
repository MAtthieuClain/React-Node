import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

const initState = {
    produit:  [],
}

async function getProduits() {
    var product
    await fetch("http://localhost:5000/")
    .then(res => res.json())
    .then(res => {
        console.log("TEST AVANT",res);
        product = res.produits
    })
    return product
}
async function reducer(state, action) {
    var new_state = await getProduits()
    const {} = action.payload
    switch(action.type) {
        case 'RECEIVE_PRODUCTS':
            console.log("TESTT: ", state)
            new_state = {
                ...state,
                'produit': [
                    ...state['produit'],
                    new_state
                ]
            }
            return new_state['produit']
        default:
            return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('list product', value)
}
export default function Store(props) {

    const [allProducts, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':5000')
        socket.on('list product', function(msg){
            dispatch({type: 'RECEIVE_PRODUCTS', payload: msg})
        })
    }

    return (
        <CTX.Provider value={{allProducts, sendChatAction}}>
            {props.children}
        </CTX.Provider>
    )
}