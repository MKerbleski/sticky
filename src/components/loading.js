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
        </LoadingDiv>
    )
}

const LoadingDiv = styled.div`
    /* border: 1px solid red; */
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