class Food{

    constructor(){

        this.image = loadImage('Milk.png');
        this.foodStock = 20
        this.lastFed
    }

    getFoodStock(){

        var dataFood = database.ref("food")
        dataFood.on("value", function(data){
            foodStock = data.val();
        })

    }

    updateFoodStock(food){

        database.ref("/").update({food:food})

    }

    changeFood(){

        if(this.foodStock>=0){
            this.foodStock = foodS
        }

    }


    display(){
        var x=40,y=50;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock;i++){
                if(i%10===0){
                    x=40;
                    y+=53
                }
                image(this.image, x, y, 70, 70);
                x=x+30
            }
        }

    }
}