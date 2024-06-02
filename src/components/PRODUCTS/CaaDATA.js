import mainecoonImage from '../../images/mainecoon1.jpg';
import turkishangoleCatImage from '../../images/turkishangole.jpg';
import ScottishFoldCatImage from '../../images/ScottishFoldCat.jpg';
import britishcatImage from '../../images/britishcat.jpg';
import balenesecatImage from '../../images/balenese.webp';
import BengalCatImage from '../../images/BengalCat.jpg';


const DATA = [
    {
        id: 0,
        name: "British cat ",
        price: 300,
        desc: "british cat with short hair .",
        img: britishcatImage,
        reviews: [
            { rating: 5, comment: "quite cat and loves to cuddle, highly recommend." }
        ]
    },
    {
        id: 1,
        name: "ScottishFold Cat",
        price: 250,
        desc: "ScottishFold Cat that always ready to play.",
        img: ScottishFoldCatImage,
        reviews: [
            { rating: 4, comment: "Interactive combine and easy to love." }
        ]
    },
    {
        id: 2,
        name: "Balenes cat",
        price: 120,
        desc: "Balenes cat is the best type of cat fo cozy company .",
        img: balenesecatImage,
        reviews: [
            { rating: 5, comment: "this cat is the best thing for cozy and confirtiable time." }
        ]
    },
    {
        id: 3,
        name: "turkishangole",
        price: 10000,
        desc: "this is the best cat you will ever have.",
        img: turkishangoleCatImage,
        reviews: [
            { rating: 5, comment: "my best friend for ever." }
        ]
    },
    {
        id: 4,
        name: "Maine coon",
        price: 500,
        desc: "these cats are scary from outside but they lovley from the inside .",
        img: mainecoonImage,
        reviews: [
            { rating: 5, comment: "My family loves this cat its big and fluffy" }
        ]
    },
    {
        id: 5,
        name: "Bengal-Cat",
        price: 80,
        desc: "these lovley cats reminds as of the safari",
        img: BengalCatImage,
        reviews: [
            { rating: 4.5, comment: "My kids loves this one, they say we have tiger in the house ." }
        ]
    },
];

export default DATA;
