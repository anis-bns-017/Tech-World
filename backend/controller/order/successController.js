const successController = async (req, res) => {
  try {
    console.log("Transaction: ", req.params);
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = successController;
