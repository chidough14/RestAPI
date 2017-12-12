const express = require('express');
const Driver = require('../models/driver');
const router = express.Router();


// Get a list of drivers from db
router.get('/drivers', function(req, res, next){
  /*Driver.find().then(function(drivers){
   res.send(drivers)
  });*/

  Driver.geoNear(
      {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
      {maxDistance: 100000, spherical: true}
  ).then(function(drivers){
      res.send(drivers);
  });
});

//Add a new driver to db
router.post('/drivers', function(req, res, next){
    /*var driver = new Driver(req.body);
    driver.save();*/

    Driver.create(req.body).then(function(driver){
      res.send(driver);
    }).catch(next);
});

// Update driver
router.put('/drivers/:id', function(req, res, next){
    Driver.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(driver){
        Driver.findOne({_id: req.params.id}).then(function(driver){
            res.send(driver);
        });
    });
});

//Delete driver
router.delete('/drivers/:id', function(req, res, next){
    Driver.findByIdAndRemove({_id: req.params.id}).then(function(driver){
       res.send(driver);
    });
});

module.exports = router;