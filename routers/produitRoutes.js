import express from "express"
import ProduitController from "../controllers/ProduitController.js"

const produitRouter = express.Router()
const produitController = new ProduitController()

// Routes pour les produits

// Rechercher un produit par un critère spécifique (par exemple, nom, catégorie)
produitRouter.get("/produits/:element", produitController.findProduit)

// Récupérer tous les produits
produitRouter.get("/produits", produitController.getProduits)

// Créer un nouveau produit
produitRouter.post("/produits", produitController.createProduit)

// Mettre à jour un produit existant
produitRouter.put("/produits/:id", produitController.updateProduit)

// Supprimer un produit
produitRouter.delete("/produits/:id", produitController.deleteProduct)

export default produitRouter
