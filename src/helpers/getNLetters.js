// This function is used to parse out the first few letters typed from an html string that is saved for styling from the first line of text whether that be a paragraph or header.
export const getNLetters = (fromTypedHTMLString, nLetters=null) => {
    let result = ''
    for(let i = 0; i < fromTypedHTMLString.length; i++){
        if(fromTypedHTMLString[i] === '>' && fromTypedHTMLString[i+1] !== '<'){
            let j = i+1;
            while(fromTypedHTMLString[j] !== '<' ){
                result += fromTypedHTMLString[j]
                j++
            }
            break;
        }
    }
    return nLetters ? result.substring(0,nLetters) : result
}