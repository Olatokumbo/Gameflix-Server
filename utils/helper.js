exports.sessionizeUser  = (user) => {
    return {user_id: user._id, username: user.username}
}