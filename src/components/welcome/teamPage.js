import React , { Component } from 'react'
import styled from 'styled-components'

import {
    flexCenter,
    scrollBar,
    mainThemePrimary
} from '../../styles'

import {
    headshot,
    afflack, 
    sam,
    charlie
} from '../../img'

export default class Bios extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <BiosDiv> 
                <h1>Say hello to our team!</h1>
                <div className="bios">
                    {/* <img src={canyon} /> */}
                    <div className="bio">
                        <h2>Dwayne</h2>
                        <p>Why stop at 13? Dwayne has 14 ph.d s? Acheivments include membership of mensa at age 17. First startup sold at age 26. And composing shakesphere poetry by violin. Why work for us. "I wanted to be surrounded by intelligent and motivated people like myself. Ive already worked among the brightest minds of google, and spaceX. Sticky was just the next logial step."</p>
                    </div>
                    <div className="bio">
                        <h2>Christian Wolff</h2>
                        <img src={afflack} />
                        <p>Once called "an accountant ahead of his time" Christian "Chris" first stumbled upon the concept of 2 column accounting while keeping score during an intense game of cops and robbers as a kid. From then on Chris has been keeping score on business assets.</p>
                    </div>

                    <div className="bio">
                        <h2>Darius Kincaid</h2>
                        <img src={sam} />
                        <p>Security Officer. Darius went outside the box on this one. </p>
                    </div>

                    <div className="bio">
                        <h2>Lorraine Broughton</h2>
                        <img src={charlie} />
                        <p>Without Lorriane our project would still be on notepads and in Michael's imagination. Her training in</p>
                    </div>
                    <div className="bio">
                        <h2>Michael Kerbleski</h2>
                        <img src={headshot} ></img>
                        <p>The mind behind all our ideas. Award winning person Michael leads the vision for the product and dabbles in various web development aspects of the project. D1 NCAA athlete. Entreprenuer.</p>
                    </div>
                    <div className="bio">
                        <h2>You?</h2>
                        <p>We are hiring! Submit an application <a href="/careers">here</a>.</p>
                    </div>
                </div>
            </BiosDiv>
        )
    }
}

const BiosDiv = styled.div`
    border: 1px solid white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${scrollBar()}
    .bios {
        display: flex;
        flex-direction: row;
        /* border: 1px solid blue; */
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        height: auto;
        /* height: 100%; */
        .bio {
            /* border: 1px solid green; */
            border: 1px solid gray;
            background: ${mainThemePrimary};
            height: 300px;
            width: 300px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin: 5px;
            opacity: 1;
            img {
                height: 100px;
            }
            p {
                margin: 6px;
            }
        }
    }
`