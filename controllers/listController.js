const listSchema = require('./listSchema');
const lists = {};


lists.getList = (next) => {
    listSchema.find({}, next);
};

lists.createList = (req, res, next) => {
    var list = {
        listItem: req.body.listItem,
    }
    listSchema.create(list, (err, data) => {
        if (err) {
            console.error("Error");
        }
        res.redirect('/');
    });
};

lists.deleteList = (req, res, next) => {
    listSchema.find({ _id: req.body._id }).remove((err) => {
        if (err) console.error("Error");
    });
};

lists.updateList = (req,res,next) => {
    listSchema.findOne({ _id: req.body._id }, (err, data) => {
        data.listItem = req.body.listItem;
        data.save();
    });
}
module.exports = lists;