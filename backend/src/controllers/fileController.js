const fs = require("fs");
const fileService = require("../services/fileService");

module.exports = {
  async getByName(req, res) {
    const { name } = req.params;

    try {
      if (fs.existsSync(`./uploads/${name}`)) {
        return res.sendFile(`/uploads/${name}`, { root: '.' });
      } else {
        return  res.sendFile(`uploads/ramo_logo.svg`, { root: '.' });
      }

    } catch (error) {
      return  res.sendFile(`uploads/ramo_logo.svg`, { root: '.' });
    }
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

  async getPseFile(req, res) {
    try {
      if (!fs.existsSync('./uploads/pse.csv')) {
        throw new Error("Não existe arquivo CSV!");
      }

      return res.sendFile("/uploads/pse.csv", { root: '.' });
    } catch (error) {
      return res.status(400).json({error: error.message});      
    }
  }
}