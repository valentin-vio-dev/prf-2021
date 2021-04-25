module.exports = function(message, data) {
    return {
        type: 'success',
        message: message,
        data: data
    }
};