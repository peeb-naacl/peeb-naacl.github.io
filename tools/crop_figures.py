"""Render the paper's original figures without surrounding prose or captions.
Usage: python tools/crop_figures.py /path/to/2024.findings-naacl.131.pdf
Requires PyMuPDF and Pillow. Coordinates use PDF points; pages below are one-based.
"""
from pathlib import Path
import argparse
import json
import fitz
from PIL import Image

FIGURES = [
    ('figure-1-explanations.webp', 1, (303, 219, 527, 374)),
    ('figure-2-editability.webp', 3, (69, 71, 527, 245)),
    ('figure-3-architecture.webp', 5, (69, 77, 527, 278)),
    ('figure-4-descriptors.webp', 7, (67, 67, 527, 300)),
    ('figure-5-dogs.webp', 9, (69, 68, 527, 200)),
]

def main():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument('pdf', type=Path)
    args = args.parse_args()
    doc = fitz.open(args.pdf)
    output = Path(__file__).resolve().parents[1] / 'assets' / 'figures'
    output.mkdir(parents=True, exist_ok=True)
    records = []
    for name, page_number, bounds in FIGURES:
        page = doc[page_number - 1]
        pix = page.get_pixmap(matrix=fitz.Matrix(4, 4), clip=fitz.Rect(bounds), alpha=False)
        Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(output / name, lossless=True, method=6)
        records.append({'file': name, 'page': page_number, 'crop_pdf_points': bounds,
                        'width': pix.width, 'height': pix.height})
        print(name, pix.width, pix.height)
    (output / 'sources.json').write_text(json.dumps({
        'source': 'https://aclanthology.org/2024.findings-naacl.131.pdf',
        'doi': '10.18653/v1/2024.findings-naacl.131',
        'license': 'CC BY 4.0 (ACL Anthology, 2024)',
        'processing': 'Rendered at 288 dpi, cropped, and encoded as lossless WebP; original figure contents preserved.',
        'figures': records,
    }, indent=2) + '\n')

if __name__ == '__main__':
    main()
