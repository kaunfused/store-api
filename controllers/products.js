const Product = require("../models/product");

class productControllers {
  static getAllProducts = async (req, res) => {
    try {
      const { featured, company, name, sort, fields, numericFilters } =
        req.query;
      const queryObject = {};

      if (featured) {
        queryObject.featured = featured === "true" ? true : false;
      }

      if (company) {
        queryObject.company = company;
      }

      if (name) {
        queryObject.name = { $regex: name, $options: "i" };
      }

      if (numericFilters) {
        const operatorMap = {
          ">": "$gt",
          ">=": "$gte",
          "=": "$eq",
          "<": "$lt",
          "<=": "$lte",
        };

        const ex = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
          ex,
          (match) => `-${operatorMap[match]}-`
        );

        const options = ["price", "rating"];

        filters = filters.split(",").forEach((item) => {
          const [field, operator, value] = item.split("-");
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
      }

      let result = Product.find(queryObject);

      if (sort) {
        const sortList = sort.split(",").join(" ");
        result.sort(sortList);
      } else {
        result = result.sort("createdAt");
      }

      if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const skip = (page - 1) * limit;
      result = result.skip(skip).limit(limit);

      const prods = await result;
      res.status(200).json({ prods });
    } catch (error) {
      res.status(404).json({ msg: error });
    }
  };
}

module.exports = productControllers;
