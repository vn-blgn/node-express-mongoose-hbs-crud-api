const express = require('express');
const router = express.Router();

const clubController = require('../controllers/clubController');

router.get('/', clubController.clubs);
router.get("/create", clubController.club_create_get);
router.post("/create", clubController.club_create_post);
router.get('/:id', clubController.club_detail);

module.exports = router;