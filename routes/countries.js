const express = require('express');
const router = express.Router();

const countryController = require('../controllers/countryController');

router.get('/', countryController.countries);
router.get("/create", countryController.country_create_get);
router.post("/create", countryController.country_create_post);
router.get('/:id', countryController.country_detail);

module.exports = router;