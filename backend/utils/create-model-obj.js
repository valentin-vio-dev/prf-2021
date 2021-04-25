module.exports = function(req, properties, query) {
    let obj = {};
    properties.forEach(property => {
        obj[property] = query ? req.query[property] : req.body[property];
    });
    return obj;
}