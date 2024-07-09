import { PrismaClient } from "@prisma/client";

export default class CommandeController {
  prisma = new PrismaClient();

  createCommande = async (req, res) => {
    const { userId, produits } = req.body; // produits est un tableau de { produitId, quantite, prix }
    if (!produits || produits.length === 0) {
      res.status(404).json({ status: false, message: "Aucun produit spécifié" });
    } else {
      try {
        const commande = await this.prisma.commande.create({
          data: {
            userId,
            total: produits.reduce((acc, curr) => acc + curr.prix * curr.quantite, 0),
            status: 'En cours',
            DetailsCommandes: {
              create: produits.map((p) => ({
                produitId: p.produitId,
                quantite: p.quantite,
                prix: p.prix
              }))
            }
          },
          include: {
            DetailsCommandes: true
          }
        });
        res.status(201).json({
          status: true,
          message: "Commande créée avec succès",
          data: commande
        });
      } catch (error) {
        console.error("Erreur lors de la création de la commande:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  getCommandes = async (req, res) => {
    try {
      const commandes = await this.prisma.commande.findMany({
        include: {
          DetailsCommandes: true,
          user: true
        }
      });
      res.status(200).json({
        status: true,
        data: commandes
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };

  findCommande = async (req, res) => {
    const data = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object?.values(data).some((value) => !!value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      try {
        const { element } = data;
        const commande = await this.prisma.commande.findFirst({
          where: {
            OR: [
              {
                id: {
                  equals: Number(element),
                }
              },
              {
                num: {
                  equals: element,
                },
              }
            ],
          },
        });
        if(commande) {
          res.status(200).json({
            status: true,
            data: commande,
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cette commande n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } 
  };

  updateCommande = async (req, res) => {
    const data = await req.body;
    const { id } = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object?.values(data).some((value) => !!value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      try {
        const commande = await this.prisma.commande.findUnique({
          where: {
            id: Number(id),
          },
        });
        if(commande) {
          const updatedCommande = await this.prisma.commande.update({
            where: { id: Number(id) },
            data: data,
          });
          res.status(200).json({
            status: true,
            message: `Commande ${id} mise à jour avec succès`,
            data: updatedCommande
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cette commande n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  deleteCommande = async (req, res) => {
    const data = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      const { id } = data;
      try {
        const commande = await this.prisma.commande.findUnique({
          where: {
            id: Number(id)
          },
        });
        if(commande) {
          await this.prisma.commande.delete({
            where: { id: Number(id) },
          });
          res.status(200).json({
            status: true,
            message: `Commande ${id} supprimée avec succès`
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cette commande n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de la commande:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  }; 
}