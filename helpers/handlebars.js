// const $ = require('jquery');

function hbsHelpers(exphbs) {
    return exphbs.create({
      helpers: { // This was missing
        select: function( selected, options ){
            console.log(options.fn(this));
            return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
        }
        // More helpers...
      },
      defaultLayout: 'main'
  
    });
  }
  
  module.exports = hbsHelpers;