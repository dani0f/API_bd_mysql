const {format} = require('timeago.js');
var Handlebars  = require('express-handlebars');
const helpers = {
};

helpers.timeago = () => {
    return format(timestamp);
};

module.exports = helpers;