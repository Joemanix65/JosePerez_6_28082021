ATTENTION!!

Afin de visualiser correctement le projet backend merci de suivre les étapes ci-dessous:

Télécharger le repository frontend: https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

Placer les dossiers frontend et backend dans un même dossier (exemple: P6_OC)

Charger le dossier dans votre éditeur préféré (VsCode ou autres)

Côté FRONTEND:

Vérifier que les dépendances suivantes sont installées:
- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : assurez vous d'utiliser la bonne version pour NodeJS. Pour Node 14.0 la version de node-sass doit être 4.14+.

Ouvrir un nouveau terminal côté frontend et exécuter `npm install` puis `npm init`.

UTILISATION:
côté frontend exécuter `npm start` ce qui lancera le serveur local et ouvrira votre navigateur. (`Ctrl+c` pour arrêter le serveur local).

-------------------------------------------------------

Côté BACKEND:

Ouvrir un nouveau terminal côté backtend et exécuter `npm init` et valider toutes les options sauf pour le point d'entrée qui doit être `server.js`.

Exécuter `nodemon` ce qui lancera le serveur local et la connexion à la base de donnée MongoDB Atlas.

Pour l'accès à la base de donnée MongoDB Atlas n'oubliez pas de créer le fichier `.env` à l'intérieur du dossier `backend` et d'y copier les informations de connections fournies avec les livrables.
