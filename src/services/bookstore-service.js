export default class BookstoreService{

    constructor(){

        this.data = [
            {
                title: 'You and me forever', 
                author: 'Francis Chan', 
                id: 1,  
                price: 6, 
                coverImage: 'https://clc-blagovest.by/_CLCBlagovest/images/products/original/19072.jpg' 
            },
            {
                title: 'Gossip. How to resist it?', 
                author: 'Matt Mitchell', 
                id: 2,
                price: 5,
                coverImage: 'https://clc-blagovest.by/_CLCBlagovest/images/products/original/19226.jpg' 
            }
        ];

    }

    

    getBooks(){
        return new Promise( (resolve, reject) => {
            setTimeout( 
                () => {
                    if (Math.random() > 0.95) reject(new Error('ups-ups!'));
                    resolve(this.data); 
                    
                }, 700 
            );
        } );
    }

}