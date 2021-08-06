// Require the mongoose module//
var mongoose = require('mongoose');
var {Schema} = mongoose;

 
const packagesSchema = new Schema({
      PackageId: { type: Number, required: "Please enter the package ID." },
      PkgName: { type: String, required: "Please enter the package name." },
      PkgStartDate: { type: Date, required: "Please enter the package start date." },
      PkgEndDate: { type: Date, required: "Please enter the package end date." },
      PkgDesc: String,
      PkgBasePrice: { type: Number, required: "Please enter the price." },
      PkgAgencyCommission: { type: Number, required: "Please enter the agency commission." },
      imagpath: String,
    });
    
    module.exports.Package = mongoose.model("Package", packagesSchema);

    



