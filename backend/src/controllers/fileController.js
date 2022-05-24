const fileService = require("../services/fileService");

module.exports = {
  async getByName(req, res) {
    const { name } = req.params;
    
    return res.sendFile(`/uploads/${name}`, { root: '.' });
  },

  async uploadOne(req, res) {
    const image = req.file;

    const imageURL = await fileService.uploadOne(image);

    return res.json({imageURL});
  },
    
  async removeImage(req, res) {
    const { imgName } = req.params;
    const fileService = new ImageService();

    try {
      const result = await fileService.removeImage(imgName);
      return res.json({message: result});
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  },

  async getPse(req, res) {
    return res.sendFile("/uploads/pse.csv", { root: '.' });
  }
}