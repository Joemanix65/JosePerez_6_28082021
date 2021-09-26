const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()//Query
    .then(sauces => res.status(200).json(sauces))//Promise
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
    
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce =  (req, res, next) => {
    const sauceObjet = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObjet, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(403).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(404).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeDislikeSauce = (req, res, ) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
     
    switch (like) {
        //on aime la sauce
        case 1:
            Sauce.updateOne({
                _id: sauceId 
                }, 
                { 
                $push: { usersLiked: userId }, 
                $inc: { likes: +1 }
                
                }) 
              .then(() => res.status(200).json({ message: "J'aime !" }))
              .catch((error) => res.status(400).json({ error }))
              
        break;
        //on aime pas la sauce
        case -1:
            Sauce.updateOne({ 
                _id: sauceId 
                },
                { 
                $push: { usersDisliked: userId }, 
                $inc: { dislikes: +1 }
                })
                .then(() => res.status(200).json({ message: `Je n'aime pas !` }))
                .catch((error) => res.status(400).json({ error }))
        break;
        //on annule le like ou le dislike
        case 0:
            Sauce.findOne({ 
                _id: sauceId 
                })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, 
                { $pull: { usersLiked: userId }, 
                $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `Annulation Like` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, 
                { $pull: { usersDisliked: userId }, 
                $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `Annulation Dislike` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(400).json({ error }))
        break;
    };   
};