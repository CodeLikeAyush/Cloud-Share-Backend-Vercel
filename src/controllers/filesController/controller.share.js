const filesServices = require("../../services/filesServices");

const share = async (req, res) => {
  try {
    console.log(req.formFields);
    const result = await filesServices.share_file(req.formFields);
    !result.Error
      ? res.status(200).json({ message: "email send" })
      : res.status(500).json({ message: "unable to send mail" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong while sending email" });
  }
};

module.exports = share;
