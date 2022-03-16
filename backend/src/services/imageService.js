const fs = require("fs");

module.exports = {
  async uploadOne(image) {
    if (image) {
      return `${process.env.BASE_URL}/api/${image.destination}/${image.filename}`;
    } else {
      throw new Error("Imagem não pode ser enviada!");
    }
  },

  async removeImage(imgName) {
    try {
      await fs.promises.unlink(`./uploads/${imgName}`);
      return ("Imagem deletada com sucesso!");
    } catch (error) {
      throw new Error("Essa imagem não existe");
    }    
  }
}