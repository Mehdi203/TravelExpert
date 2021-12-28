module.exports = function processErrors(errs, pageTemplate, req, res, data) {
    // If there are errors from the Model schema//
    const errorArray = [];
    const errorKeys = Object.keys(errs.errors);
    errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
    return res.render(pageTemplate, {
      errors: errorArray,
      ...req.body,
      ...data,
    });
  };