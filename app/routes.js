var express = require('express');
var router = express.Router();
var controller = require('./controllers/con');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,'public/')
	},
	file: function(req,file,cb){
		cb(null,req.session.email+"-"+Date.now());
	}
})

var upload = multer({storage:storage});

router.use(function(req, res, next) {
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.get('/register' ,controller.registeration);
router.get('/login' , controller.goToLogin);
router.get('/' , controller.homeDirectory);
router.get('/addWork',controller.goToAddWork);
router.get('/myportfolios',controller.goToMyProfiles);
router.get('/portfolios/page/:id' , controller.loadProfiles);
router.get('/logout',controller.logout);
router.get('/user/:username' , controller.userProfile)

router.post('/login' , controller.login);
router.post('/register' , upload.any() , controller.submit);
router.post('/addWork', upload.any(),controller.addWork);


module.exports = router;