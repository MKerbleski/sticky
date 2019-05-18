export const getNElements = (fromTypedHTMLString, nElements=2) => {
    let result = ''
    let greaterThan = 0;
    for(let i = 0; i < fromTypedHTMLString.length; i++){
        result += fromTypedHTMLString[i]
        if(fromTypedHTMLString[i] === '>'){
            greaterThan++;
            if(greaterThan === nElements*2){
                break;
            }
        }
    }
    return result
}