import express from "express";
import { productoController } from "../controllers/productos.controller.js";
import { proveedorController } from "../controllers/proveedor.controller.js";

const router = express.Router();

// Middleware de autenticación con APIKEY
const autenticarApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey || apiKey !== process.env.API_KEY_INVENTARIO) {
    return res.status(401).json({ mensaje: "APIKEY no válida" });
  }
  next();
};

// Rutas Producto
router.get("/productos", autenticarApiKey, productoController.listar);
router.get("/productos/:id", autenticarApiKey, productoController.obtenerPorId);
router.post("/productos", autenticarApiKey, productoController.crear);
router.put("/productos/:id", autenticarApiKey, productoController.actualizar);
router.delete("/productos/:id", autenticarApiKey, productoController.eliminar);

// Rutas Proveedor
router.get("/proveedores", autenticarApiKey, proveedorController.listar);
router.get("/proveedores/:id", autenticarApiKey, proveedorController.obtenerPorId);
router.post("/proveedores", autenticarApiKey, proveedorController.crear);
router.put("/proveedores/:id", autenticarApiKey, proveedorController.actualizar);
router.delete("/proveedores/:id", autenticarApiKey, proveedorController.eliminar);

export default router;
