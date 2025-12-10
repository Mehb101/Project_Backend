const Task = require("../models/Task");
const Project = require("../models/Project");

const getAllTaskByProjectId = async (req, res) => {
	try {
		
		const getViewProject = await Project.findById(req.params.projectId);
		if (!getViewProject) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}
		
		if (getViewProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to view this project tasks" });
		}
		
		const task = await Task.find({ project: req.params.projectId });
		res.json(task);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createTask = async (req, res) => {
	try {
		
		const getViewProject = await Project.findById(req.params.projectId);
		if (!getViewProject) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}
		
		if (getViewProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to add task this project" });
		}
		const task = await Task.create({
			...req.body,
			
			project: req.params.projectId,
		});
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json(err);
	}
};

const updateTask = async (req, res) => {
	try {
		
		const getUpdateTask = await Task.findById(req.params.taskId);
		if (!getUpdateTask) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}
	
		const projectId = getUpdateTask.project;
		const getUpdateProject = await Project.findById(projectId);
		if (!getUpdateProject) {
			return res.status(400).json({ message: "Invalid project ID" });
		}
		
		if (getUpdateProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to update this task" });
		}

		const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
			new: true,
		});
		if (!task) {
			return res.status(404).json({ message: "No task found with this id!" });
		}
		res.json(task);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		
		const getDeleteTask = await Task.findById(req.params.taskId);
		if (!getDeleteTask) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}
		
		const projectId = getDeleteTask.project;
		
		const getProject = await Project.findById(projectId);
		if (!getProject) {
			return res.status(400).json({ message: "Invalid project ID" });
		}
		
		if (getUpdateProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to delete this task" });
		}
		const task = await Task.findByIdAndDelete(req.params.taskId);
		if (!task) {
			return res.status(404).json({ message: "No task found with this id!" });
		}
		res.json({ message: "task deleted!" });
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAllTaskByProjectId,
	createTask,
	updateTask,
	deleteTask,
};