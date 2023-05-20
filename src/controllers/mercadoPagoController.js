const mercadopago = require("mercadopago");
const Compra = require('../mongoDB/compraSchema');
const frontUrl = process.env.frontURL;
mercadopago.configure({
    access_token: process.env.mpaccesstoken
});

const mercadoPagoController = {
    createPreference: async (req, res) => {
    const { status, datosComprador, datosVendedor, productos,total } = req.body;
    const items = productos.map((producto) => {
        return {
          title: producto.nombre,
          unit_price:Number(producto.precio),
          quantity:Number(producto.cantidad),
        };
      });
    let preference = {
        items: items,
        "back_urls": {
            "success": `${frontUrl}/success`,
            "failure": `${frontUrl}/failure`,
            "pending": `${frontUrl}/pending`
        },
        "auto_return": "approved"
      };
      mercadopago.preferences
      .create(preference)
      .then(function (response) {
        res.json({ preferenceId: response.body.id });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al generar la preferencia' });
      });
  },

  handleNotification: (req, res) => {
    // Verificar si el pago ha sido aprobado
    if (req.body.action === 'payment.updated' && req.body.data.status === 'approved') {
      console.log('pagado');
      // Realizar acciones adicionales aquí, como actualizar el estado del pedido en la base de datos, enviar notificaciones, etc.
    }

    res.sendStatus(200);
  }
};

module.exports = mercadoPagoController;