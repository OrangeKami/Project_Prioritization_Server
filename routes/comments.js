import express from "express";
const router = express.Router();

// * get all comments
router.get('/', (req, res)=>{
    res.json({message: "get all comments"})
});

// * get a comment
router.get('/:id', (req, res)=>{
    res.json({message: "get a comment"})
});

// * create a new comment
router.post('/', (req, res)=>{
    res.json({message: "create a new comment"})
});

// * update a comment
router.put('/:id', (req, res)=>{
    res.json({message: "update a comment"})
})

//  *delete a comment
router.delete('/:id', (req, res)=>{
    res.json({message: "delete a comment"})
})

export default router;