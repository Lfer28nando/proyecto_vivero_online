import Producto from "../models/producto.model.js";

export const productoController = {
  listar: async (req, res) => {
    try {
      const productos = await Producto.find();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const producto = await Producto.findById(id);
      if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

      res.status(200).json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre, precio, disponibilidad, imagen, categoria, descripcion } = req.body;

      // Validación mínima antes de crear
      if (!nombre || !precio || disponibilidad === undefined)
        return res.status(400).json({ mensaje: "Campos obligatorios incompletos" });

      const nuevoProducto = new Producto({ nombre, precio, disponibilidad, imagen, categoria, descripcion });
      await nuevoProducto.save();
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const productoActualizado = await Producto.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
      if (!productoActualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });

      res.status(200).json(productoActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const productoEliminado = await Producto.findByIdAndDelete(id);
      if (!productoEliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });

      res.status(200).json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
};
