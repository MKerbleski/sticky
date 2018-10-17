//import { flex } from '../../styles/styl-utils.js's

export function picture(){
    return`
        background-image: url("https://picsum.photos/1200");
    `;
}

export function menu(){
    return `
        background-color: rgba(0,0,0,.25);
    `;
}

export function flex(direction='row'){
    return `
        display: flex;
        flex-direction: ${direction};
        align-items: center;
        justify-content: center;
    `;
}