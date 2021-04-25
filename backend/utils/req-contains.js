module.exports = function(req, properties) {
    let contains = 0;
    Object.keys(req.body).forEach(key => {
        for (let i=0; i<properties.length; i++) {
            if (properties[i] == key) {
                contains++;
            }
        }
    });
    return contains == properties.length;
}