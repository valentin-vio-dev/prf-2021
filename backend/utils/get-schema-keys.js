module.exports = function(schema) {
    let sch = Object.assign({}, schema.schema.tree);
    delete sch.__v;
    delete sch.id;
    let obj = Object.keys(sch);
    return obj;
}