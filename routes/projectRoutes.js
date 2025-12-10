const router = require("express").Router();
const { authMiddleware } = require("../middleware/auth");
const {
	getAllProjectByUserId,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
} = require("../controllers/projectController");


router.use(authMiddleware);

router.get("/", getAllProjectByUserId);

router.get("/:id", getProjectById);


router.post("/", createProject);


router.put("/:id", updateProject);


router.delete("/:id", deleteProject);

module.exports = router;