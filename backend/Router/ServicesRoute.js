const express = require('express');
const router = express.Router();
const Service = require('../Models/ServicesModel');

// Create a new service
router.post('/service', async (req, res) => {
  const { servicename, serviceprice, category, hours, minutes } = req.body;

  try {
    const newService = new Service({
      name: servicename,
      price: parseFloat(serviceprice.replace('Rs.', '')),
      category,
      duration: {
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10)
      }
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Route to get all services
router.get('/all', async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
