/**
 * Check if the user is admin
 */

module.exports = function(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.redirect('/403');
  }
}
