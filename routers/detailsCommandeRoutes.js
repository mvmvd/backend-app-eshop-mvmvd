import express from "express"
import DetailsCommandeController from "../controllers/DetailsCommandeController.js"

const detailsCommandeRouter = express.Router()
const detailsCommande = new DetailsCommandeController()

// Ajouter des détails à une commande
detailsCommandeRouter.post("/details-commande", detailsCommande.addDetailsCommande)

// Mettre à jour les détails d'une commande
detailsCommandeRouter.put("/details-commande/:id", detailsCommande.updateDetailsCommande)

// Supprimer les détails d'une commande
detailsCommandeRouter.delete("/details-commande/:id", detailsCommande.deleteDetailsCommande)

// Récupérer tous les détails d'une commande spécifique
detailsCommandeRouter.get("/details-commande/:commandeId", detailsCommande.getDetailsCommande)

export default detailsCommandeRouter