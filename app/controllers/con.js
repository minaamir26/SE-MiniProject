let User = require('../models/profiles');
let projectController =
{
  registeration:function(req, res)
  {
    res.render('register2');
  }
  , 
  //register
  submit:function(req,res)
  {
    var image = req.files[0];

    //console.log(image);
    var x = "";
    if(image == undefined)
      x = "default";
    else
      x = image.filename;
    let added = new User(
        {
          name : req.body.name,
          password : req.body.password,
          email : req.body.email,
          gucid : req.body.gucid,
          gender : req.body.gender,
          image: x,
          username : req.body.username
        });
      //console.log(added)
      added.save(function(err,added)
      {
        if(err)
        {
          console.log(err);
          req.flash("error", "User already exists");
          res.redirect('/register');
        }
        else
        {
          req.flash("info", "You have succesfully registered");
          res.redirect('/addWork');
        }
      });
  },

  goToLogin:function(req,res){
    res.render('login2');
  },

  login:function(req,res)
  {
    //console.log(req.body);
    User.findOne({username : req.body.username , password : req.body.password} , function(err, user){
      if(user)
      {
        req.session.email = user.email;
        req.flash("info", "logged in succesfully");
        res.redirect('/addWork');
      }
      else
      {
        req.flash("error", "username/passoword is incorrect");
        res.redirect('/login');
      }
    });
  },
  homeDirectory:function(req,res){
    var sess = req.session;
    //console.log(req.session);
    if(sess.email)
    {
      res.redirect('addWork');
    }
    else
    {
      res.render('home');
    }



  },

  goToAddWork:function(req,res){
    var email2 = req.session.email;
    User.findOne({email : email2} ,function(err,user)
    {

      //console.log(email2);
      console.log(user);
      if(email2)
      {
          res.render('addWork' , {user});
      }
      else
      {
        res.redirect('/');
      }

    });
    
  },
  addWork:function(req,res){
    var x = req.body.type;
    if(x == 'URL')
    {
      User.findOne({email : req.session.email} ,function(err,user)
      {
        user.works.push({ title: req.body.title1 , image : '', URL : req.body.url , isURL : true});
        user.save();
        req.flash("info", "project added succesfully");
        //console.log(user.works);
        res.redirect('myportfolios');
      });
    }
    else
    {
      User.findOne({email : req.session.email} ,function(err,user)
      {
        user.works.push({ title: req.body.title2 , isURL : false , URL : '', image : req.files[0].filename });
        user.save(function(err,r){
        });
        req.flash("info", "project added succesfully");
        //console.log(user.works);
        res.redirect('myportfolios');
      });
    }
    //console.log(user.works);
  },

  loadProfiles:function(req,res){
    // User.find.$where( 'this.works.length>0').exec(function(err,user){
      
    User.find().$where('this.works.length>0').exec(function(err,user){
        if(err)
          console.log(err);
        else
          res.render('viewPorto',{user : user ,  id : req.params.id});
        console.log(user);
    })
  },

    /*User.find(function(err,user){
      console.log(user);
      var x = 0;
      for(var i=0;i<user.length;i++)
        if(user[i].works.length>0)
          x = x+1;
    })*/

  goToMyProfiles:function(req,res){
  var email2 = req.session.email;
    User.findOne({email : email2} ,function(err,user)
    {
      if(email2)
      {
          res.render('profiles2' , {user : user }  );
      }
      else
      {
        res.redirect('/');
      }

    });
  },
  logout:function(req,res){
    req.flash("info", "logged out succesfully");
    req.session.destroy();
    res.redirect('/');

  },
  userProfile:function(req,res){
    var email2 = req.session.email;
    User.findOne({email : email2} ,function(err,user)
    {
      if(email2)
      {
          res.render('user' , {user : user });
      }
      else
      {
        res.redirect('/');
      }

    });
  }
}
module.exports = projectController;