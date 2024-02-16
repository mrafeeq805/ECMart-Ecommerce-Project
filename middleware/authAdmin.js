// This middleware checks if the user is authenticated
function isAuthenticated(req, res, next) {
    const admin = req.session.admin
    if (admin) {
        // If the user is authenticated, proceed to the next middleware or route handler
        return next();
    }

    // If the user is not authenticated, redirect them to the login page or send an error response
    res.redirect('/admin/login'); // You can customize the redirect URL or response as needed
}

module.exports = isAuthenticated;