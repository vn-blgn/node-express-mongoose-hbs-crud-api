const express = require('express');
const router = express.Router();

const playerController = require('../controllers/playerController');

router.get('/', playerController.players);
router.get("/create", playerController.player_create_get);
router.post("/create", playerController.player_create_post);

router.get("/:id/delete", playerController.player_delete_get);
router.get("/:id/delete_player", playerController.player_delete);

router.get("/:id/update", playerController.player_update_get);
router.post("/:id/update", playerController.player_update_post);

router.get('/:id', playerController.player_detail);

module.exports = router;