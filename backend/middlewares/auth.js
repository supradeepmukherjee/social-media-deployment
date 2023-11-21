const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
}