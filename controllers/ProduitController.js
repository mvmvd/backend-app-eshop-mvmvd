import { PrismaClient } from "@prisma/client";

export default class ProduitController {
  prisma = new PrismaClient();

  createProduit = async (req, res) => {
    const data = req.body;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const { id, nom } = data;
        const produit = id ? await this.prisma.produit.findFirst({
          where: {
            OR: [
              {
                id: {
                  equals: Number(id),
                }
              },
              {
                nom: {
                  equals: nom,
                },
              }
            ]
          },
        }) : await this.prisma.produit.findFirst({
          where: {
            nom: nom,
          },
        });
        if (produit) {
          res
            .status(200)
            .json({ status: false, msg: "Ce produit existe déjà" });
        } else {
          const newProduit = await this.prisma.produit.create({
            data: data,
          });
          res.status(200).json({
            status: true,
            msg: "Produit créé avec succès",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  updateProduit = async (req, res) => {
    const data = req.body;
    const { id } = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const produit = await this.prisma.produit.findUnique({
          where: {
            id: Number(id),
          },
        });
        if (produit) {
          const updatedProduit = await this.prisma.produit.update({
            where: {
              id: Number(id),
            },
            data: data
          });
          res.status(200).json({
            status: true,
            msg: "Produit modifié avec succès",
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Ce produit n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  findProduit = async (req, res) => {
    const data = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      try {
        const { element } = data;
        const produit = await this.prisma.produit.findFirst({
          where: {
            OR: [
              {
                id: {
                  equals: Number(element),
                }
              },
              {
                nom: {
                  equals: element,
                },
              },
            ],
          },
        });
        if(produit) {
          res.status(200).json({
            status: true,
            data: produit,
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Ce produit n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };

  getProduits = async (req, res) => {
    try {
      const produits = await this.prisma.produit.findMany({
        select: {
          id: true,
          nom: true,
          prix: true,
          categorie: true,
          photo: true,
          description: true,
        },
      });
      res.status(200).json({
        status: true,
        data: produits,
      });
    } catch (error) {
      console.error("Erreur lors de la requête à la base de données:", error);
      res.status(500).json({ status: false, message: "Erreur interne du serveur" });
    }
  };

  deleteProduct = async (req, res) => {
    const data = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object.values(data).some((value) => !!value)) {
      const { id } = data;
      try {
        const produit = await this.prisma.produit.findUnique({
          where: {
            id: Number(id)
          },
        });
        if(produit) {
          await this.prisma.produit.delete({
            where: {
              id: Number(id)
            },
          });
          res
            .status(200)
            .json({ status: true, msg: "Produit supprimé avec succès" });
        } else {
            res
              .status(404)
              .json({ status: false, msg: "Ce produit n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res.status(500).json({ status: false, message: "Erreur interne du serveur" });
      }
    } else {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    }
  };
}
