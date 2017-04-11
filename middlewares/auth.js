/**
 * Check if the user is authenticated
 */

module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.format({
      'text/html': function(){
        req.session.redirect = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.redirect('/auth/facebook');
      },

      'application/json': function(){
        res.status(401).json({message: 'unauthorized. please login'});
      },

      'default': function() {
        // log the request and respond with 406
        res.status(401).send('unauthorized. please login');
      }
    });

  }
}
