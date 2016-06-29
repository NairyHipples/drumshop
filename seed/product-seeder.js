var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');


var products = [
  new Product({
    imagePath: 'http://www.drumscult.com/wp-content/uploads/2014/04/Tama-StarClassic-Bubinga-Omni-Tune-1-DrumsCult.jpg',
    title: 'Tama Starclassic Bubinga Omni-Tune',
    description: 'Super awesome loud sounding drumset for your blast beating needs! By using a special key, the drummer can tune both drumheads at the same time.',
    price: 5999
  }),
  new Product({
    imagePath: 'http://www.drumscult.com/wp-content/uploads/2014/04/Tama-StarClassic-Maple-1-DrumsCult.jpg',
    title: 'Tama Starclassic Maple',
    description: 'The sound is one of the best you’ll get from maple. Good volume, great definition and a correct sustain. The bass drum has a deep punch and sounds better with medium-low tuning.',
    price: 4999
  }),
  new Product({
    imagePath: 'http://www.drumscult.com/wp-content/uploads/2014/04/Tama-StarClassic-Bubinga-1-DrumsCult.jpg',
    title: 'Tama Starclassic Bubinga',
    description: 'Tama Starclassic Bubinga drums produce a fat, deep sound with an immediate attack and a dry, definite note. One of the best sounds you can find anywhere.',
    price: 3999
  }),
  new Product({
    imagePath: 'http://www.drumscult.com/wp-content/uploads/2014/04/Tama-StarClassic-Maple-4-DrumsCult.jpg',
    title: 'Tama Starclassic Maple Beginner-Pack',
    description: 'A small starter kit that will make your neighbours ears bleed when you’re thrashing away in your bedroom with this beast of a beauty!',
    price: 2999
  })
];
var done = 0;
for (var i=0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}
