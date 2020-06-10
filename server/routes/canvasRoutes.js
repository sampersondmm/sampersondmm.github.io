const express = require('express');
const router = express.Router({mergeParams: true});

const {createCanvas, getCanvas, deleteCanvas} = require('../handlers/canvasHandler');

// prefix - /api/users/:id/canvas
router.route('/').post(createCanvas);

// prefix - /api/users/:id/canvas/:canvas_id
router
    .route('/:canvas_id')
    .get(getCanvas)
    .delete(deleteCanvas)

module.exports = router;