
const {Rental} =  require('../../../models/rental');
const mongoose = require('mongoose');

describe('rental.GenerateRental',() =>{
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async() => {
    server = require('../../server');
    customerId =  mongoose.types.ObjectId();
    movieId =  mongoose.types.ObjectId();

   rental = new Rental({
     customer:{_id:customerId ,name:'1234', phone:'12345'},  
     movie:{_id:movieId, title:'12345', dailyRentalRate: 2} 
    });
    await rental.save();
  });

  afterEach(async () =>{
    server.close();
    await Rental.remove({});
  });

  it('should work',async ()=>{
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
});




//client not logged
//customerId not provided
// not rental found
// rental already processed
//valid request
//set return date
//calculate rental fee
//increase the stoks
//return the rental