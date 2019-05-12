export function picture(){
    return`
        background-image: url("https://picsum.photos/1200");
    `;
}

export function border(color){
    return`
        border: 2px solid ${color ? color : `#${Math.floor(Math.random()*16777215).toString(16)}`};
        margin: 2px;
        padding: 2px;
    `;
}

export function scrollBar(height=6, color='black'){
    return`
        overflow: auto;
        &::-webkit-scrollbar {
            width: 5px;
            height: ${height}px;
            &-thumb{
                background-color: ${color};
                border-radius: 25px;
                width: 2px;
                border: 1px solid transparent;
            }
        }
    `;
}

export function menu(){
    // return `
    //     background-color: rgba(0,0,0,.3);
    //     background-color: #00ffb55c;
    // `;
}

export function bg(color){
    return `
        background-color: ${color};
    `;
}

export function flexCenter(direction='row', justify='center', align='center'){
    return `
        display: flex;
        flex-direction: ${direction};
        justify-content: ${justify};
        align-items: ${align};
    `;
}

export function start(color){
    return `
        border: 1px solid ${color ? color : null}
        display: flex;
        box-sizing: border-box;
        padding: 1px;
        margin: 1px;
    `
}

export function apiNote(){
    return `
        border: 3px solid green;
        font-size: 13px;
        box-sizing: border-box;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 3px;
        color: black;
        margin: 2px;
    `
}

export function apiChannel(){
    return `
        border: 13px solid green;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 3px;
        margin: 3px;
        color: black;
        background: white;
    `
}