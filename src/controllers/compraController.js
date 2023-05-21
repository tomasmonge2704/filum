const Compra = require('../mongoDB/compraSchema');

const compraController = {
  getAll: async (req, res) => {
    try {
      const compras = await Compra.find();
      res.json(compras);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener las compras' });
    }
  },
  getCompraById: async (req, res) => {
    const { id } = req.params;
    try {
      const compras = await Compra.findById(id);
      res.json(compras);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener las compras' });
    }
  },
  getUserCompras: async (req, res) => {
    const { username } = req.params;
    try {
      const compras = await Compra.find({ 'datosComprador.username': username });
      res.json(compras);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al obtener las compras' });
    }
  },

  addCompra: async (req, res) => {
    const { status, datosComprador, datosVendedor, productos,total,pagoId } = req.body;
    const nuevaCompra = new Compra({ status, datosComprador, datosVendedor, productos,total,pagoId });
    try {
      const compraGuardada = await nuevaCompra.save();
      res.json(compraGuardada);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al guardar la compra' });
    }
  },
  actualizarCompra: async (req, res) => {
    try {
      const { status } = req.body;
      let updateFields = { status };
      if (status === "Entregado") {
        updateFields.fechaRecibido = new Date();
      }
      const compra = await Compra.findByIdAndUpdate(
        req.params.id,
        updateFields,
        { new: true }
      );
      if (!compra) throw new Error("Compra no encontrada");
      res.json(compra);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};

module.exports = compraController;
