/**
 * save the redirect parameter to session
 *
 * @param {Object} options options for the middleware
 */
module.exports.parse = function (options) {
  return function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    if (req.body.redirect) {
      req.session.redirect = req.body.redirect;
      console.log(req.body.redirect);
      console.log(req.session.redirect);
      req.session.save();
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
      res.redirect(req.session.redirect);
      req.session.redirect = null;
      req.session.save();
    } else {
      res.redirect(options.fallback);
    }
  };

};
