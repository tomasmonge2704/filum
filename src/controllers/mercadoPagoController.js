const mercadopago = require("mercadopago");
const frontUrl = process.env.frontURL;
mercadopago.configure({
    access_token: process.env.mpaccesstoken
});

const mercadoPagoController = {
    createPreference: async (req, res) => {
    const { status, datosComprador, datosVendedor, productos,total,token } = req.body;
    const items = productos.map((producto) => {
        return {
          title: producto.nombre,
          unit_price:Number(producto.precio),
          quantity:Number(producto.cantidad),
        };
      });
    let preference = {
        metadata:{ status, datosComprador, datosVendedor, productos,total,token },
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
  }
};

module.exports = mercadoPagoController;