const express = require('express');
const router = express.Router();

const positionController = require('../controllers/positionController');

router.get('/', positionController.positions);
router.get("/create", positionController.position_create_get);
router.post("/create", positionController.position_create_post);
router.get('/:id', positionController.position_detail);

module.exports = router;