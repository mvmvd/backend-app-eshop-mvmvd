import express from "express";
import CommandeController from "../controllers/CommandeController.js";

const commandeRouter = express.Router()
const commandeController = new CommandeController()

// Routes pour les commandes

// Créer une nouvelle commande
commandeRouter.post("/commandes", commandeController.createCommande)

// Récupérer toutes les commandes
commandeRouter.get("/commandes", commandeController.getCommandes)

// Rechercher une commande par un critère spécifique (par exemple, id, num)
commandeRouter.get("/commandes/:element", commandeController.findCommande)

// Mettre à jour une commande existante
commandeRouter.put("/commandes/:id", commandeController.updateCommande)

// Supprimer une commande
commandeRouter.delete("/commandes/:id", commandeController.deleteCommande)

export default commandeRouter
