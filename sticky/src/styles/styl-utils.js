//import { flex } from '../../styles/styl-utils.js's

export function picture(){
    return`
        background-image: url("https://picsum.photos/1200");
    `;
}

export function menu(){
    return `
        background-color: rgba(0,0,0,.3);
    `;
}

export function bg(color){
    return `
        background-color: ${color};
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

export function start(color){
    return `
    border: 1px solid ${color? color: null}
    display: flex;
    box-sizing: border-box;
    padding: 1px;
    margin: 1px;
    `
}

export function apiNote(){
    return `
    border: 1px solid green;
    font-size: 13px;
    box-sizing: border-box;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 3px;
    color: black;
    margin: 1px;
    `
}