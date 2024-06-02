import huskkyImage from '../../images/huskky.webp';
import dogToyImage from '../../images/dog2.webp';
import pitpulImage from '../../images/pitpul.jpeg';
import dobermanImage from '../../images/doberman.jpg';
import chiluaImage from '../../images/chilua.webp';
import GreatdanedogsImage from '../../images/greatdane.jpeg';

const DATA = [
    {
        id: 0,
        title: "doberman dogs",
        price: 150,
        desc: "Healthy dog with strong physique.",
        img: dobermanImage,
        reviews: [
            { rating: 5, comment: "Great dogs for playing and for gaurding the house." }
        ]
    },
    {
        id: 1,
        title: "golden retriever dog",
        price: 200,
        desc: "best dog to play catch and tennis ball with.",
        img: dogToyImage,
        reviews: [
            { rating: 5, comment: "my family having the best time playing with these dogs ." },
            
        ]
    },
    {
        id: 2,
        title: "Husky dogs",
        price: 400,
        desc: "not only beautiful dogs but also funny .",
        img: huskkyImage,
        reviews: [
    
            { rating: 5, comment: "the best dogs to own they are fun to play with and so cute." }
        ]
    },
    {
        id: 3,
        title: "pitpul dogs",
        price: 800,
        desc: "they are scary and strong , you need to be expert to deal with them  .",
        img: pitpulImage,
        reviews: [
    
            { rating: 5, comment: "the best dogs to own they are fun to play with and so cute." }
        ]
    },
    {
        id: 4,
        title: "chilua dogs",
        price: 5000,
        desc: "they are small but also very smart and cost alot of money .",
        img: chiluaImage,
        reviews: [
    
            { rating: 5, comment: "expensive dogs but worth every benny." }
        ]
    },
    {
        id: 5,
        title: "Greatdane dogs",
        price: 700,
        desc: "THE BIGGEST Dogs but always they have the biggest hearts .",
        img: GreatdanedogsImage,
        reviews: [
    
            { rating: 5, comment: "its so huge and lovley i always feel safe." }
        ]
    },
];

export default DATA;
