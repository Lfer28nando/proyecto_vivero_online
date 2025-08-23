// models/producto.model.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, "El nombre del producto es obligatorio"],
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  precio: { 
    type: Number, 
    required: [true, "El precio es obligatorio"], 
    min: 100
  },
  disponibilidad: { 
    type: Boolean, 
    required: [true, "La disponibilidad es obligatoria"]
  },
  imagen: { 
    type: String 
  },
  categoria: { 
    type: String, 
    enum: ["interior", "exterior", "suculenta", "arbol", "decorativa"],
    required: [true, "La categoría es obligatoria"]
  },
  descripcion: { 
    type: String, 
    maxlength: 500
  },
  fechaRegistro: { 
    type: Date, 
    default: Date.now 
  }
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
