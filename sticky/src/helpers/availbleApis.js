import { 
    slackColorIcon, 
    slackWordLogo,
    pocketColorIcon,
    pocketWordLogo
} from '../img/'

const slack = {
    name: "slack",
    thumbnail: slackColorIcon,
    logo: slackWordLogo,
    alt: "a thumbnail of the slack icon"
}

const pocket = {
    name: "pocket",
    thumbnail: pocketColorIcon,
    logo: pocketWordLogo,
    alt: "a thumbnail of the pocket icon"
}

const AAA = [slack, pocket]

const AAO = {
    slack: slack,
    pocket: pocket
}

export { AAA, AAO };