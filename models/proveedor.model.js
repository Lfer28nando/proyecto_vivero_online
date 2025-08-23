// models/proveedor.model.js
import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, "El nombre del proveedor es obligatorio"],
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: [true, "El email es obligatorio"],
    trim: true,
    lowercase: true,
    match: /.+@.+\..+/
  },
  telefono: { 
    type: String, 
    required: [true, "El teléfono es obligatorio"],
    trim: true
  },
  direccion: { 
    type: String, 
    maxlength: 200 
  },
  productosSuministrados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto"
    }
  ],
  fechaRegistro: { 
    type: Date, 
    default: Date.now 
  },
  activo: { 
    type: Boolean, 
    default: true 
  }
});

const Proveedor = mongoose.model("Proveedor", proveedorSchema);

export default Proveedor;
