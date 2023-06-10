import {Action} from '@ngrx/store';

export function simpleReducer(state: string = "", action: Action) {
    console.log(action.type, state);

    switch (action.type) {
        case 'HISTORY':
            state = "Our shop has a short history of selling quality products. From simple household stuff to new technological components.\n"  
            + " We have sold our products to all countries all over the world. From Canada to Mexico, from Brazil to Argentina, From U.K. to Greece, etc.";
            return state;

        case 'SOCIAL':
            return state = 'Our Facebook group: https://www.facebook.com\n'
            + "Our Instagram: https://www.instagram.com";
        
        default:
            return state;
    }
}