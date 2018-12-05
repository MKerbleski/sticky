import { slackBlack } from '../img/'
import { pocketThumbnail } from '../img/'
import { slackWord } from '../img/'

const slack = {
        name: "slack",
        thumbnail: slackBlack,
        logo: slackWord,

        alt: "a thumbnail of the slack icon"
}
const pocket = {
    name: "pocket",
    thumbnail: pocketThumbnail,
    alt: "a thumbnail of the pocket icon"
}

const AAA = [slack, pocket]
const AAO = {
    slack: slack,
    pocket: pocket
}


export { AAA, AAO };