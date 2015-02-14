var product = require('../models/Product'),
  authenticator = require('../authenticator');

var productRoute = {
  define: function(app, prefixAPI) {
    product.methods(['get', 'post', 'put', 'delete']);

    product.before('post', authenticator.authenticate);
    product.before('put', authenticator.authenticate);
    product.before('delete', authenticator.authenticate);

    // custom route
    product.route('recommendations', ['get'], function(request, response) {
      var input = request.body.tags,
        recommendations;

      recommendations = product.find({
        tags: { $in: input }
      });

      if (recommendations == null) {
        response.status(416);
        response.send('No product corresponds to the given tags.');
      } else {
        response.status(200);
        response.send(recommendations);
      }
    });

    product.route('product-barcode', ['get'], function(request, response) {
      var input = request.body.barcode,
        correspondingProduct;

      correspondingProduct = product.find({
        barcode: input
      });

      if (correspondingProduct == null) {
        response.status(404);
        response.send('There is not any product corresponding to that bar code.');
      } else {
        response.status(200);
        response.send(correspondingProduct);
      }
    });

    product.register(app, prefixAPI + '/Products');
  }
};

module.exports = productRoute;
