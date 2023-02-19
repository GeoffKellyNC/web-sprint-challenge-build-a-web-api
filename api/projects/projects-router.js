// Write your "projects" router here!


const express = require('express');

const { get, insert, update, remove, getProjectActions } = require('./projects-model');


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const projects = await get();
        if(projects.length === 0) {
            res.status(404).send([]);
            return
        }
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({message: 'Failed to get projects'});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const project = await get(id);
        if(!project) {
            res.status(404).json({message: 'Project not found'});
            return
        }

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({message: 'Failed to get project'});
        return
    }
});

router.post('/', async (req, res) => {
    try {
        const project = req.body;
        if(!project.name || !project.description || project.complete === null) {
            res.status(400).json({message: 'Please provide name and description'});
            return
        }
        const newProject = await insert(project);
        res.status(201).json(newProject);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to create new project'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const changes = req.body;

        console.log('Changes: ', req.body)

        if (!changes.name || !changes.description) {
             res.status(400).send({ message: 'Please provide name, description' }); 
             return
        }

        const updatedProject = await update(id, changes);

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).send(updatedProject);

    } catch (err) {
        res.status(500).send({ message: 'Failed to update project' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProject = await remove(id);
        if(!deletedProject) {
            res.status(404).json({message: 'Project not found'});
            return
        }
        res.status(200).json(deletedProject);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to delete project'});
    }
}
);

router.get('/:id/actions', async (req, res) => {
    try {
        const id = req.params.id;
        const projectActions = await getProjectActions(id);
        if(!projectActions) {
            res.status(404).json({message: 'Project not found'});
            return
        }
        res.status(200).send(projectActions);
    }
    catch (err) {
        res.status(500).json({message: 'Failed to get project actions'});
    }
}
);

module.exports = router;
