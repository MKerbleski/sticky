import { 
    slackBlack, 
    slackWordLogo,
    pocketColorIcon,
    pocketWordLogo
} from '../img/'

const slack = {
    name: "slack",
    title: "Slack",
    icon: slackBlack,
    logo: slackWordLogo,
    alt: "a thumbnail of the slack icon"
}

const pocket = {
    name: "pocket",
    title: "Pocket",
    icon: pocketColorIcon,
    logo: pocketWordLogo,
    alt: "a thumbnail of the pocket icon"
}

const AAA = [slack, pocket]

const AAO = {
    slack: slack,
    pocket: pocket
}

export { AAA, AAO };