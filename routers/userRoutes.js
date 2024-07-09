import express from "express"
import UserController from "../controllers/UserController.js"

const userRouter = express.Router()
const userController = new UserController()

// Routes pour les users

// Créer un nouveau user
userRouter.post("/users", userController.createUser)

// Récupérer tous les users
userRouter.get("/users", userController.getUsers)

// Rechercher un user par un critère spécifique (par exemple, id, username, email)
userRouter.get("/users/:element", userController.findUser)

// Mettre à jour un user existant
userRouter.put("/users/:id", userController.updateUser)

// Supprimer un user
userRouter.delete("/users/:id", userController.deleteUser)

export default userRouter
