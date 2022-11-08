import express from "express";
const router = express.Router();

// todo future function not now
// * get deadline date
router.get('/', (req, res) => {
    res.json({message: 'Get deadline date'})
})

// * update deadline date
router.put('/:id', (req, res) => {
    res.json({message: 'Update deadline date'})
})

export default router;