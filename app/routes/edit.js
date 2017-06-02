import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('question', params.question_id);
  },
  actions: {
    delete(model) {
      var response_deletions = model.get('responses').map(function(response){
        return response.destroyRecord();
      });
      Ember.RSVP.all(response_deletions).then(function() {
        return model.destroyRecord();
      });
      this.transitionTo('index');
    }
  }
});
