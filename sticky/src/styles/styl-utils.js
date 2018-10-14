

export function picture(){
    return`
        background-image: url("https://picsum.photos/1200");
    `;
}

export function solid(){
    return `
        background-color: #031019
    `;
}

export function flex(direction){
    return `
        display: flex;
        flex-direction: ${direction};
        align-items: center;
        justify-content: center;
    `;
}

