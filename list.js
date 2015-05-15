Trajets = new Mongo.Collection("trajets");

if (Meteor.isClient) {

  Template.FormTrajet.helpers({
    trajets: function () {
      return Trajets.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.ShowTrajet.helpers({
    trajets: function () {
      return Trajets.find({});
    }
  });

  Template.ListTrajets.helpers({
    trajet: function () {
      return Trajets.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.layout.helpers({
    isLogged: function() {
      if (Meteor.user()) console.log('User is logged');
      else Router.go('Accueil');
    }
  });

  Template.TrajetPage.events({
    "click .reservation": function () {
      Trajets.update(this._id, {$set: {places: parseInt(this.places) - 1}});
    },
    "click .delete": function (event) {
      event.preventDefault();
      Trajets.remove(this._id);
      Router.go('ListTrajets');
    }
  });

  Template.TrajetPage.isZero = function() {
    return parseInt(this.places) === 0;
  };

  Template.TrajetPage.isOwner = function() {
    return this.owner === Meteor.userId();
  };

  UI.registerHelper("currentRouteName",function(){
    return Router.current()?Router.current().route.getName():"";
  });

  Template.FormTrajet.events({
  	"submit .new-trajet": function (event) {
      event.preventDefault();

  		// This function is called when the new task form is submitted
      var dateDepart = event.target.dateDepart.value;
    	var heureDepart = event.target.heureDepart.value;
    	var heureArrivee = event.target.heureArrivee.value;
    	var villeDepart = event.target.villeDepart.value;
    	var villeArrivee = event.target.villeArrivee.value;
    	var voiture = event.target.voiture.value;
    	var prix = event.target.prix.value;
    	var places = parseInt(event.target.places.value);

    	Trajets.insert({
        dateDepart: dateDepart,
    		heureDepart: heureDepart,
    		heureArrivee: heureArrivee,
    		villeDepart: villeDepart,
    		villeArrivee: villeArrivee,
    		voiture: voiture,
    		prix: prix,
    		places: parseInt(places),
    		createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        username: Meteor.user().username  // username of logged in user
    	});

    	// Clear form
      event.target.dateDepart.value = "";
    	event.target.heureDepart.value = "";
    	event.target.heureArrivee.value = "";
    	event.target.villeDepart.value = "";
    	event.target.villeArrivee.value = "";
    	event.target.voiture.value = "";
    	event.target.prix.value = "";
    	event.target.places.value = "";

      Router.go('ListTrajets');

  	}
  });
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
}