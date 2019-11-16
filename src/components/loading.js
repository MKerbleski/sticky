import React from 'react';
import styled from 'styled-components'

export const Loading = () => {
    return (
        <LoadingDiv>
            <iframe 
                title="bubble-rings-loading-icon"
                src="https://giphy.com/embed/8UI85273lC1VzEgkyW" 
                width="40" 
                frameBorder="0"
            />
            {/* <iframe 
                title="line-twisting illusion"
                src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2018/09/belttrick_smaller.mp4" 
                width="40" 
                frameBorder="0"
            /> */}
        </LoadingDiv>
    )
}

/// This one is also cool https://www.quantamagazine.org/the-strange-numbers-that-birthed-modern-algebra-20180906/

const LoadingDiv = styled.div`

    box-sizing: border-box;
    display: flex;
    justify-content: center;
    height: 50%;
    width: 100%;
    transition-duration: 1sec;
    iframe{
        width: 50%;
        height: 50%;
        margin: 10px;
        box-sizing: border-box;
        border-radius: 100px;
    }
`


// <p><a href="https://giphy.com/gifs/trippy-bubble-rings-8UI85273lC1VzEgkyW">via GIPHY</a></p>