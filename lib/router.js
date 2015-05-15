Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'Accueil'}, function(){
    this.render('Accueil');
});

Router.route('/Formulaire', {name : 'FormTrajet'}, function(){
    this.render('FormTrajet');
});

Router.route('/Trajets', {name : 'ListTrajets'}, function(){
    this.render('ListTrajets');
});

Router.route('/Trajets/:_id', {
	name: 'TrajetPage',
	data: function() { return Trajets.findOne(this.params._id); }
});



// Router.route('/items/:_id', {name : 'ShowTrajet'}, function () {
//  var item = Trajet.findOne({_id: this.params._id});
//  this.render('ShowTrajet', {data: item});
// });