import { slackBlack } from '../img/'
import { pocketThumbnail } from '../img/'

const slack = {
        name: "slack",
        thumbnail: slackBlack,
        alt: "a thumbnail of the slack icon"
}
const pocket = {
    name: "pocket",
    thumbnail: pocketThumbnail,
    alt: "a thumbnail of the slack icon"
}

const availibleApisArray = [slack, pocket]
const availibleApisObject = {
    slack: {slack},
    pocket: {pocket}
}


export { availibleApisArray, availibleApisObject };