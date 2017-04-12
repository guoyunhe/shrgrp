/**
 * save the redirect parameter to session
 *
 * @param {Object} options options for the middleware
 */
module.exports.parse = function (options) {
  return function (req, res, next) {
    if (req.params.redirect) {
      req.session.redirect = req.params.redirect;
    }
    next();
  };
};

/**
 * redirect to intended url saved in session
 *
 * @param {Object} options options for the middleware
 * @param {string} options.fallback the fallback url if redirect not saved
 */
module.exports.redirect = function (options) {
  if (!options) {
    options = {};
  }

  if (!options.fallback) {
    options.fallback = '/';
  }

  return function (req, res, next) {
    if (req.session.redirect) {
      var url = req.session.redirect;
      req.session.redirect = null;
      res.redirect(url); // session will be saved when send or redirect
    } else {
      res.redirect(options.fallback);
    }
  };

};
