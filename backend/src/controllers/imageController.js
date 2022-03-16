const imageService = require("../services/imageService");

module.exports = {
  async getByName(req, res) {
    const { name } = req.params;
    
    return res.sendFile(`/uploads/${name}`, { root: '.' });
  },

  async uploadOne(req, res) {
    const image = req.file;

    const imageURL = await imageService.uploadOne(image);

    return res.json({imageURL});
  },
    
  async removeImage(req, res) {
    const { imgName } = req.params;
    const imageService = new ImageService();

    try {
      const result = await imageService.removeImage(imgName);
      return res.json({message: result});
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  }
}