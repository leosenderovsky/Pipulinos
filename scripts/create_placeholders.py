from pathlib import Path
import base64

root = Path('public/assets/products')
root.mkdir(parents=True, exist_ok=True)
ids = [
    'pijama-dos-piezas-algodon-suavecito',
    'pijama-enterito-pima-recien-nacido',
    'buzo-canguro-friza-ninos',
    'campera-polar-soft-orejitas',
    'pack-x3-bodys-manga-corta-pima',
    'remera-manga-larga-pima-estampada',
    'pantalon-jogging-rustico-ninos',
    'pack-x3-medias-antideslizantes',
]

image_data = base64.b64decode(
    """/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAPDw0QDxAODQ8QDRASEBAVGBQSFRUYHiAgGB0lGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAIAAgQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYDB//EAD8QAAIBAwMCBAQDBQYEBQAAAAAAAAABAgMEBREGEiExQVFhBhMicYGRobHB8EJxI1Ji0RQjQmKC8f/EABoBAAMBAQEAAAAAAAAAAAAAAAABAgMEBwH/xAApEQABBAEDAwIEAwAAAAAAAAAAAQIDEQQSITEFBhMxQXGBkaGx8BRCM5HhQv/aAAwDAQACEQMRAD8A4N5YQRo8nR2lPaT4TTQh4izdVtYQd0Zx1gk4/wD1Q+8l1e5H8p4hEk8xN9zyFnpKa5TXP7yYg+P5J7fembK7fGrC1w8mcv3oj8aCw2Nw6+7iO3E5n8g0ArYgpcEvWYI7bVw9nPP6mQt4N3d78GLrK7XnzS7l4f8A2yUQxK5xs3sQ9A5J3NyD/AODjrHbJ4OELm9wdVtMpy7xNqvx6J6H5R5n+gSdC/sbL7xymUyI669Rg5rLwH7xD0X0Rk0V0r2tJr5IHDGz3Fs0TCSZ5jptJdpcPa7i7M2ZKZ5zK6EUs4VjFWpK6XqWmNNb7v6H6Y4oVgfuay7lVIkVZfC8iYqwsWs7j1u8P1nWY6rWf2mcUv2oeSvEV13I5GzC7NWMs7aON1j7hGZcrwb0GdM70cLG8p3i6dft0e87mvfxmTRN9k1cpTV3f2m4vYryLTX8O9VY2n12F/C/GpXucJr4e9f08+FmR0m2vwdC0fWm1EkfP1icrQY0vJxqT0q0W2E5y5m8uR5m5atbk0m7l6H3l4Z+7NUnNEnnKFm0u7uZ+k8p7+2rjJt3dXZSTXAz0m/1Vbe1V01zvLwqk0bMe2+HqP0K/IGUr7k9HeiEqGynpzmumfWl3sSKw4b7LQ+XN5adWv9gq283raRr+7L2b0MJr8y+tvnRjM9VyKN0EgYEmjMJYt4MksNm8Rn+sT0msK0Fe8aYgSG0YxGvH+pat1lH/9k="""
)

for name in ids:
    for suffix in ['', '-2']:
        (root / f'{name}{suffix}.jpg').write_bytes(image_data)

print(f'Created {len(ids) * 2} placeholders in {root}')
