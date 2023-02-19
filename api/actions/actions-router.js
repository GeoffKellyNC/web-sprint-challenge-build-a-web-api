// Write your "actions" router here!

const express = require('express');

const {get, insert, update, remove}= require('./actions-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await get();
        res.status(200).json(actions);
    } catch (err) {
        res.status(500).json({message: 'Failed to get actions'});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const action = await get(id);
        if(!action) {
            res.status(404).json({message: 'Action not found'});
            return
        }

        res.status(200).json(action);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to get action'});
        return
    }
});


router.post('/', async (req, res) => {
    try {
        const action = req.body;
        if(!action.project_id || !action.description || !action.notes) {
            res.status(400).json({message: 'Please provide project_id, description and notes'});
            return
        }
        const newAction = await insert(action);
        res.status(201).json(newAction);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to create new action'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const changes = req.body;
        if(!changes.project_id || !changes.description || !changes.notes) {
            res.status(400).json({message: 'Please provide project_id, description and notes'});
            return
        }
        const updatedAction = await update(id, changes);
        if(!updatedAction) {
            res.status(404).json({message: 'Action not found'});
            return
        }
        res.status(200).json(updatedAction);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to update action'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAction = await remove(id);
        if(!deletedAction) {
            res.status(404).json({message: 'Action not found'});
            return
        }
        res.status(200).json(deletedAction);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to delete action'});
    }
});



module.exports = router;
    



