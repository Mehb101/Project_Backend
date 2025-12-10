const Project = require("../models/Project");

const getAllProjectByUserId = async (req, res) => {
	try {
		const projects = await Project.find({ user: req.user._id });
		res.json(projects);
	} catch (err) {
		res.status(500).json(err);
	}
};

const getProjectById = async (req, res) => {
	
	try {
		
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		
		if (project.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to view this project" });
		}

		res.json(project);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createProject = async (req, res) => {
	try {
		const project = await Project.create({
			...req.body,
			
			user: req.user._id,
		});
		res.status(201).json(project);
	} catch (err) {
		res.status(400).json(err);
	}
};

const updateProject = async (req, res) => {
	try {
		
		const getUpdateProject = await Project.findById(req.params.id);
		if (!getUpdateProject) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		
		if (getUpdateProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to update this project" });
		}

		const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!project) {
			return res
				.status(404)
				.json({ message: "No project found with this id!" });
		}
		res.json(project);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteProject = async (req, res) => {
	try {
		
		const getDeleteProject = await Project.findById(req.params.id);
		if (!getDeleteProject) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		
		if (getDeleteProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to delete this project" });
		}
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project) {
			return res
				.status(404)
				.json({ message: "No project found with this id!" });
		}
		res.json({ message: "project deleted!" });
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getAllProjectByUserId,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};