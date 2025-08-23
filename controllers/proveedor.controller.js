// controllers/proveedor.controller.js
import Proveedor from "../models/proveedor.model.js";

// Controller de Proveedor
export const proveedorController = {
  // Listar todos los proveedores
  listar: async (req, res) => {
    try {
      const proveedores = await Proveedor.find().populate("productosSuministrados");
      res.status(200).json(proveedores);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  },

  // Obtener proveedor por ID
  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const proveedor = await Proveedor.findById(id).populate("productosSuministrados");
      if (!proveedor) return res.status(404).json({ mensaje: "Proveedor no encontrado" });

      res.status(200).json(proveedor);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  },

  // Crear nuevo proveedor
  crear: async (req, res) => {
    try {
      const { nombre, email, telefono, direccion, productosSuministrados, activo } = req.body;
      const nuevoProveedor = new Proveedor({ nombre, email, telefono, direccion, productosSuministrados, activo });
      await nuevoProveedor.save();
      res.status(201).json(nuevoProveedor);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  },

  // Actualizar proveedor
  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const datos = req.body;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const proveedorActualizado = await Proveedor.findByIdAndUpdate(id, datos, { new: true }).populate("productosSuministrados");
      if (!proveedorActualizado) return res.status(404).json({ mensaje: "Proveedor no encontrado" });

      res.status(200).json(proveedorActualizado);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  },

  // Eliminar proveedor
  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ mensaje: "ID no válido" });

      const proveedorEliminado = await Proveedor.findByIdAndDelete(id);
      if (!proveedorEliminado) return res.status(404).json({ mensaje: "Proveedor no encontrado" });

      res.status(200).json({ mensaje: "Proveedor eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  }
};
