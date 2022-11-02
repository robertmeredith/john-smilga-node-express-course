const asyncWrapper = (fnc) => {
  return async (req, res, next) => {
    try {
      await fnc(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
