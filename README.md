
# 👗 Stylike – Site E-commerce de vêtements (MERN Stack)

**Stylike** est une application web de vente de vêtements développée en **MERN Stack**. Elle permet aux utilisateurs d’acheter en ligne, de gérer leurs commandes, et à l’admin de gérer les produits et les ventes via une interface dédiée.

---

## ✨ Fonctionnalités

### 🛍️ Interface Client
- Authentification sécurisée avec **JWT** (connexion/inscription)
- Affichage des produits
- Ajout au panier
- Passation de commande avec :
  - Paiement en ligne via **Stripe**
  - Paiement à la livraison (COD)
- Historique et affichage des commandes

### 🛠️ Interface Admin
- Connexion sécurisée via identifiants admin
- Ajout, modification et suppression de produits
- Gestion et affichage des commandes

---

## 🔐 Authentification sécurisée

- Authentification basée sur **JWT (JSON Web Tokens)** pour protéger les routes sensibles.
- Les utilisateurs (clients) peuvent s’inscrire, se connecter, et consulter leur historique de commandes de manière sécurisée.
- L’interface admin est protégée et accessible uniquement via un compte administrateur.

---

## 🔗 Accès aux interfaces

- 🌐 **Interface Client** : [Voir ici](https://stylike-frontend.onrender.com/)
- 🔧 **Interface Admin** : [Voir ici](https://stylike-admin.onrender.com)

> **Identifiants Admin**  
> 📧 Email : `admin@Stylike.com`  
> 🔑 Mot de passe : `Admin211743`

---

## 🧰 Technologies utilisées

| Frontend       | Backend         | Services externes          |
|----------------|------------------|-----------------------------|
| React (Vite)   | Express.js       | Stripe (paiement)           |
| TailwindCSS    | Node.js          | Cloudinary (upload images)  |
| Axios          | MongoDB Atlas    | Postman (test API)          |
| Toastify       | dotenv           | UptimeRobot (surveillance)  |
| VS Code        |                  | Render (hébergement)        |
| JWT            |                  |                             |

---

## 📦 Structure du projet

```
Stylike/
├── client/         # Interface utilisateur
├── server/         # API et logique back-end
├── README.md
└── .env            # Variables d’environnement
```

---

## 💡 À propos

Développé par **Yessmin Bouchehed** dans le cadre d’un projet full-stack complet.  
Stylike est une solution e-commerce moderne, responsive et performante.
