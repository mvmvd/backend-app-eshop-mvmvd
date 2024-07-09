import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default class UserController {
  prisma = new PrismaClient();

  createUser = async (req, res) => {
    const data = await req.body;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      try {
        let { email, username, password } = data;
        const user = await this.prisma.user.findUnique({
          where: {
            OR: [
              {
                email: {
                  equals: email,
                }
              },
              {
                username: {
                  equals: username,
                }
              }
            ],
          },
        });
        if (user) {
          res
            .status(200)
            .json({ status: false, msg: "Ce utilisateur existe déja" });
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(email)) {
            password = await bcrypt.hash(password, 12);
            const user = await this.prisma.user.create({
              data: data,
            });
            res.status(200).json({
              status: true,
              msg: "Utilisateur créé avec succès",
            });
          } else {
            res
              .status(400)
              .json({ status: false, message: "Adresse email invalide" });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    }
  };

  getUsers = async (req, res) => {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          avatar: true,
          role: true,
        },
      });
      res.status(200).json({
        status: true,
        data: users,
      });
    } catch (error) {
      console.error("Erreur lors de la requête à la base de données:", error);
      res.status(500).json({ status: false, message: "Erreur interne du serveur" });
    }
  };

  findUser = async (req, res) => {
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
        const user = await this.prisma.user.findFirst({
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
              {
                username: {
                  equals: element,
                }
              }
            ],
          },
        });
        if(user) {
          res.status(200).json({
            status: true,
            data: user,
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Ce user n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Erreur interne du serveur" });
      }
    } 
  };

  updateUser = async (req, res) => {
    const data = await req.body;
    const { id } = req.params;
    /**
     * Checks if all properties of the request body are empty
     * @type {boolean}
     */
    if (Object?.values(data).every((value) => !value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      try {
        let { email, username } = data;
        const user = await this.prisma.user.findFirst({
          where: {
            OR: [
              {
                email: {
                  equals: email,
                }
              },
              {
                username: {
                  equals: username,
                }
              }
            ]
          },
        });
        if (user) {
          const updatedUser = await this.prisma.user.update({
            where: {
              id: Number(id),
            },
            data: data,
          });
          res.status(200).json({
            status: true,
            msg: "Utilisateur modifié avec succès",
          });
        } else {
          res
            .status(404)
            .json({ status: false, msg: "Cet utilisateur n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res
          .status(500)
          .json({ status: false, message: "Internal Server Error" });
      }
    }
  };

  deleteUser = async (req, res) => {
    const data = req.params;
    /**
     * Vérifie si toutes les propriétés du corps de la requête ne sont pas vides
     * @type {boolean}
     */
    if (Object?.values(data).some((value) => !!value)) {
      res.status(404).json({ status: false, message: "Aucune donnée reçue" });
    } else {
      const { id } = data;
      try {
        const user = await this.prisma.user.findUnique({
          where: {
            id: Number(id)
          },
        });
        if(user) {
          await this.prisma.user.delete({
            where: {
              id: Number(id)
            },
          });
          res
            .status(200)
            .json({ status: true, msg: "User supprimé avec succès" });
        } else {
            res
              .status(404)
              .json({ status: false, msg: "Ce user n'existe pas" });
        }
      } catch (error) {
        console.error("Erreur lors de la requête à la base de données:", error);
        res.status(500).json({ status: false, message: "Erreur interne du serveur" });
      }
    } 
  };
}
