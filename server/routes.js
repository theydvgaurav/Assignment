const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const reporttemplatecopy = require('./model')


router.post('/reports', async (req, res) => {

  cmdtyID = req.body.reportDetails.cmdtyID
  marketID = req.body.reportDetails.marketID
  minPrice = req.body.reportDetails.minPrice / req.body.reportDetails.convFctr
  maxPrice = req.body.reportDetails.maxPrice / req.body.reportDetails.convFctr


  // checking if there exits a previous report
  const existingReport = await reporttemplatecopy.find({ cmdtyID: cmdtyID, marketID: marketID }).exec();

  // create new report for marketID : cmdtyID
  if (existingReport.length === 0) {
    var new_report = new reporttemplatecopy({
      cmdtyName: req.body.reportDetails.cmdtyName,
      cmdtyID: req.body.reportDetails.cmdtyID,
      marketID: req.body.reportDetails.marketID,
      marketName: req.body.reportDetails.marketName,
      users: [req.body.reportDetails.userID],
      timestamp: new Date().getTime(),
      priceUnit: "Kg",
      minPrice: req.body.reportDetails.minPrice / req.body.reportDetails.convFctr,
      maxPrice: req.body.reportDetails.maxPrice / req.body.reportDetails.convFctr
    })


    // save the new report in db
    new_report.save().then(data => {
      res.send({
        status: "success",
        reportID: data._id
      });
    })
      .catch(error => {
        res.json(error)
      })
  }
  else {

    // getting the id of existing report
    const id = existingReport[0]._id.toString()

    const num = existingReport[0].users.length

    existingReport[0].users.push(req.body.reportDetails.userID)

    const updated_report = {
      cmdtyName: existingReport[0].cmdtyName,
      cmdtyID: existingReport[0].cmdtyID,
      marketID: existingReport[0].marketID,
      marketName: existingReport[0].marketName,
      users: existingReport[0].users,
      timestamp: new Date().getTime(),
      priceUnit: existingReport[0].priceUnit,
      minPrice: ((existingReport[0].minPrice * num + minPrice) / (num + 1)),
      maxPrice: ((existingReport[0].maxPrice * num + maxPrice) / (num + 1))
    }

    // Update the existing report
    await reporttemplatecopy.findByIdAndUpdate(id, updated_report)
      .then((data) => {
        res.send({
          status: "success",
          reportID: data._id
        });
      })
      .catch(error => {
        res.json(error)
      })
  }

})

router.get('/reports', async (req, res) => {

  const cmdtyId = req.query.cmdtyID

  await reporttemplatecopy.find({ cmdtyID: cmdtyId }).exec()
    .then((data) => {
      res.send(data);
    })
    .catch(error => {
      res.json(error)
    })


})


module.exports = router;