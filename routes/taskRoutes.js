const router = require("express").Router();
const {
	getAllTaskByProjectId,
	createTask,
	updateTask,
	deleteTask,
} = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/auth");


router.use(authMiddleware);


router.get("/projects/:projectId/tasks", getAllTaskByProjectId);

router.post("/projects/:projectId/tasks", createTask);


router.put("/tasks/:taskId", updateTask);


router.delete("/tasks/:taskId", deleteTask);

module.exports = router;