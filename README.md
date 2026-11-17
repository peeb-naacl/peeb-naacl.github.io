# PEEB research project page

Project page for [PEEB: Part-based Image Classifiers with an Explainable and Editable Language Bottleneck](https://aclanthology.org/2024.findings-naacl.131/), Findings of NAACL 2024.

The layout follows the centered academic project-page style of [VLMs Are Blind](https://vlmsareblind.github.io/): white background, blue author links, dark resource buttons, large paper figures, and results tables.

## Preview

Run `python3 -m http.server 8080` and open http://localhost:8080. No installation or build is needed. The optional Google Font has a local sans-serif fallback.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch → main → / (root)**. The project URL is https://tinxai.github.io/peeb.github.io/.

## Paper figures

All five main figures are cropped directly from the published 36-page ACL Anthology PDF, rendered at 288 dpi. The graphics, photographs, labels, and model scores are preserved; surrounding page text and captions are removed. The page supplies HTML captions and click-to-enlarge views, with keyboard and Escape support.

See [assets/figures/sources.json](assets/figures/sources.json) for source, page numbers, and crop bounds. To regenerate the local lossless WebP assets, install PyMuPDF and Pillow and run:

```sh
python tools/crop_figures.py /path/to/2024.findings-naacl.131.pdf
```

The PDF is not committed. Figures are attributed to Pham et al. (2024), DOI [10.18653/v1/2024.findings-naacl.131](https://doi.org/10.18653/v1/2024.findings-naacl.131); ACL's 2024 publication is licensed under CC BY 4.0. Research code and model demo links point to the authors' official implementation and Hugging Face Space. This static page does not run inference.
