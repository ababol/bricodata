module.exports = function(mongoose, Schema) {
  var ProductFaq = new Schema({
  	productId: {type: Schema.Types.ObjectId, ref: 'Product', required:true},
    question: {type:String, required:true},
    answer: {type:String, required:true}
  });
  return mongoose.model('Faq', ProductFaq);
};