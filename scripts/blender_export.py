"""Exporta la escena de Blender a GLB listo para la web (HT-03).

Uso (desde la raíz del repo):
    blender --background modelo.blend --python scripts/blender_export.py -- character

El argumento tras `--` es el nombre del archivo de salida (sin extensión):
se escribe en src/assets/models/<nombre>.glb. Ver docs/pipeline-blender.md.
"""
import os
import sys

import bpy

name = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "model"
out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "assets", "models")
os.makedirs(out_dir, exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, f"{name}.glb"),
    export_format="GLB",
    export_yup=True,  # Blender Z-up -> glTF Y-up
    export_apply=True,  # aplica modificadores
    export_texcoords=True,  # UVs
    export_normals=True,
    export_materials="EXPORT",
    export_image_format="WEBP",
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
    export_animations=True,
    export_cameras=False,
    export_lights=False,
    use_selection=False,
)
print(f"Exportado: {name}.glb")
