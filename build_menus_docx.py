# -*- coding: utf-8 -*-
"""
Genera "Menus.docx": portada limpia con botones (tiles) y una seccion por
tipo de menu. Diseno claro y profesional (blanco / gris claro), navegacion
por hipervinculos internos (funciona en SharePoint / Word Online).

Portada / UI:  Calibri
Contenido del menu:  Goudy Old Style (Bold / regular segun corresponda)

Uso:  python build_menus_docx.py
Salida: Menus.docx (misma carpeta)
"""
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# ---- Paleta clara y profesional ----
INK       = RGBColor(0x22, 0x22, 0x22)   # texto principal
GREY      = RGBColor(0x55, 0x55, 0x55)   # descripciones
LIGHTGREY = RGBColor(0x8A, 0x8A, 0x8A)   # secundario / footer
HAIRLINE  = "D9D9D9"                       # bordes sutiles
TILE_FILL = "F2F2F2"                       # gris claro de los botones
TITLE_INK = RGBColor(0x33, 0x33, 0x33)

SANS  = "Calibri"            # portada / interfaz
SERIF = "Goudy Old Style"    # contenido de los menus

# ============================================================
# Datos de los menus (editables)
# ============================================================
MENUS = [
    {
        "key": "prestige",
        "title": "PRESTIGE MENU",
        "courses": [
            ("Violina Pumpkin", "Maitake, coffee, shiso", "add seared duck liver \u00a315"),
            ("Isle of Skye Scallop", "Coastal herbs, lemon, olive oil sabayon", ""),
            ("Rack of Dover Sole", "Brassica, prawns, Vin Jaune", ""),
            ("Aynhoe Park Deer", "Beetroot, blueberry, Roquefort", ""),
            ("Selection of British and French Cheeses", "(3 cheeses \u00a320, 5 cheeses \u00a330)", ""),
            ("Sorbet", "Calvados, apple", ""),
            ("Pear Tart", "Frangipane, mascarpone, cardamom", ""),
        ],
        "price": "\u00a3150 per person",
        "pairings": [
            "Non-alcoholic pairing \u00a380",
            "3 Wines \u00a390",
            "Matching wines \u00a3150",
            "The Connoisseur matching wines \u00a3325",
            "The Indulgence matching wines \u00a3975",
        ],
    },
    {
        "key": "discovery",
        "title": "DISCOVERY MENU",
        "courses": [
            ("Course One", "Description", ""),
            ("Course Two", "Description", ""),
            ("Course Three", "Description", ""),
            ("Course Four", "Description", ""),
        ],
        "price": "\u00a3120 per person",
        "pairings": [
            "Non-alcoholic pairing \u00a380",
            "3 Wines \u00a390",
            "Matching wines \u00a3150",
        ],
    },
    {
        "key": "alacarte",
        "title": "\u00c0 LA CARTE",
        "courses": [
            ("Starter", "Description", ""),
            ("Main", "Description", ""),
            ("Dessert", "Description", ""),
        ],
        "price": "",
        "pairings": [],
    },
    {
        "key": "lunch",
        "title": "LUNCH MENU",
        "courses": [
            ("Starter", "Description", ""),
            ("Main", "Description", ""),
            ("Dessert", "Description", ""),
        ],
        "price": "\u00a355 per person",
        "pairings": [],
    },
    {
        "key": "cheese",
        "title": "CHEESE MENU",
        "courses": [
            ("Selection of British and French Cheeses", "3 cheeses \u00a320 \u00b7 5 cheeses \u00a330", ""),
        ],
        "price": "",
        "pairings": [],
    },
]

FOOTER_LINES = [
    "All prices are inclusive of VAT.",
    "A 15% discretionary service charge will be added to your bill.",
    "If you have a food allergy, intolerance or sensitivity, please speak to your",
    "waiter about ingredients in our dishes before you order your meal.",
]

# ============================================================
# Helpers XML: bookmarks + hipervinculos internos
# ============================================================
_bookmark_id = [0]

def add_bookmark(paragraph, name):
    _bookmark_id[0] += 1
    bid = str(_bookmark_id[0])
    start = OxmlElement('w:bookmarkStart')
    start.set(qn('w:id'), bid); start.set(qn('w:name'), name)
    end = OxmlElement('w:bookmarkEnd'); end.set(qn('w:id'), bid)
    p = paragraph._p
    p.insert(0, start); p.append(end)

def add_internal_link(paragraph, text, anchor, color, size, bold, font=SANS,
                      caps_spacing=0):
    hyperlink = OxmlElement('w:hyperlink')
    hyperlink.set(qn('w:anchor'), anchor)
    run = OxmlElement('w:r')
    rPr = OxmlElement('w:rPr')
    rFonts = OxmlElement('w:rFonts')
    rFonts.set(qn('w:ascii'), font); rFonts.set(qn('w:hAnsi'), font)
    rPr.append(rFonts)
    c = OxmlElement('w:color'); c.set(qn('w:val'), '%02X%02X%02X' % (color[0], color[1], color[2]))
    rPr.append(c)
    sz = OxmlElement('w:sz'); sz.set(qn('w:val'), str(size * 2)); rPr.append(sz)
    if bold: rPr.append(OxmlElement('w:b'))
    # sin subrayado, para que parezca boton y no link
    u = OxmlElement('w:u'); u.set(qn('w:val'), 'none'); rPr.append(u)
    if caps_spacing:
        sp = OxmlElement('w:spacing'); sp.set(qn('w:val'), str(caps_spacing)); rPr.append(sp)
    run.append(rPr)
    t = OxmlElement('w:t'); t.text = text; run.append(t)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)

# ============================================================
# Helpers de texto y estilo
# ============================================================
def styled(paragraph, text, font=SERIF, size=12, color=INK, bold=False,
           italic=False, align=WD_ALIGN_PARAGRAPH.CENTER, caps_spacing=0,
           space_before=0, space_after=0):
    paragraph.alignment = align
    pf = paragraph.paragraph_format
    if space_before: pf.space_before = Pt(space_before)
    if space_after:  pf.space_after = Pt(space_after)
    r = paragraph.add_run(text)
    r.font.name = font
    r.font.size = Pt(size)
    r.font.color.rgb = color
    r.font.bold = bold
    r.font.italic = italic
    if caps_spacing:
        rPr = r._element.get_or_add_rPr()
        sp = OxmlElement('w:spacing'); sp.set(qn('w:val'), str(caps_spacing)); rPr.append(sp)
    return r

def set_cell_bg(cell, hex_fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement('w:shd')
    shd.set(qn('w:val'), 'clear'); shd.set(qn('w:color'), 'auto')
    shd.set(qn('w:fill'), hex_fill)
    tcPr.append(shd)

def set_cell_borders(cell, hex_color, size=6):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = OxmlElement('w:tcBorders')
    for edge in ('top', 'left', 'bottom', 'right'):
        e = OxmlElement('w:' + edge)
        e.set(qn('w:val'), 'single'); e.set(qn('w:sz'), str(size))
        e.set(qn('w:space'), '0'); e.set(qn('w:color'), hex_color)
        borders.append(e)
    tcPr.append(borders)

def set_cell_vcenter(cell):
    tcPr = cell._tc.get_or_add_tcPr()
    va = OxmlElement('w:vAlign'); va.set(qn('w:val'), 'center'); tcPr.append(va)

def set_row_height(row, pts):
    trPr = row._tr.get_or_add_trPr()
    h = OxmlElement('w:trHeight')
    h.set(qn('w:val'), str(int(pts * 20))); h.set(qn('w:hRule'), 'atLeast')
    trPr.append(h)

# ============================================================
# Documento
# ============================================================
doc = Document()
for s in doc.sections:
    s.top_margin = Inches(0.9); s.bottom_margin = Inches(0.9)
    s.left_margin = Inches(1.1); s.right_margin = Inches(1.1)

# ---------- PORTADA ----------
add_bookmark(doc.add_paragraph(), "TOP")
doc.add_paragraph()
styled(doc.add_paragraph(), "PETRUS", font=SANS, size=11, color=LIGHTGREY, caps_spacing=60)
styled(doc.add_paragraph(), "Menus", font=SANS, size=40, color=TITLE_INK, bold=True)
styled(doc.add_paragraph(), "SELECT A MENU", font=SANS, size=10, color=LIGHTGREY, caps_spacing=40)
doc.add_paragraph()

# Botones como tiles (tabla de 1 columna, celdas gris claro)
tbl = doc.add_table(rows=len(MENUS), cols=1)
tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
tbl.autofit = False
for i, m in enumerate(MENUS):
    cell = tbl.cell(i, 0)
    cell.width = Inches(4.2)
    set_cell_bg(cell, TILE_FILL)
    set_cell_borders(cell, HAIRLINE, size=6)
    set_cell_vcenter(cell)
    set_row_height(tbl.rows[i], 34)
    p = cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    add_internal_link(p, m["title"], "SEC_" + m["key"], color=INK, size=13,
                      bold=True, font=SANS, caps_spacing=20)
    # separacion entre tiles
    if i < len(MENUS) - 1:
        sp = OxmlElement('w:spacing'); sp.set(qn('w:after'), '0')

# pequeno respiro entre filas visualmente
tblPr = tbl._tbl.tblPr
spacing = OxmlElement('w:tblCellSpacing')
spacing.set(qn('w:w'), '60'); spacing.set(qn('w:type'), 'dxa')
tblPr.append(spacing)

doc.add_paragraph()
styled(doc.add_paragraph(), "Click a menu to open it", font=SANS, size=9,
       color=LIGHTGREY)

doc.add_page_break()

# ---------- SECCIONES ----------
def divider():
    styled(doc.add_paragraph(), "\u2013", font=SERIF, size=12, color=LIGHTGREY,
           space_before=4, space_after=4)

def render_menu(m):
    anchor_p = doc.add_paragraph()
    add_bookmark(anchor_p, "SEC_" + m["key"])
    styled(anchor_p, m["title"], font=SERIF, size=20, color=INK, bold=True,
           caps_spacing=40)
    doc.add_paragraph()

    for i, (dish, desc, supp) in enumerate(m["courses"]):
        if i > 0:
            divider()
        styled(doc.add_paragraph(), dish, font=SERIF, size=14, color=INK,
               bold=True, space_after=1)
        if desc:
            styled(doc.add_paragraph(), desc, font=SERIF, size=12, color=GREY,
                   space_after=1)
        if supp:
            styled(doc.add_paragraph(), "(" + supp + ")", font=SERIF, size=11,
                   color=GREY, italic=True)

    if m["price"]:
        divider()
        styled(doc.add_paragraph(), m["price"], font=SERIF, size=13, color=INK, bold=True)

    if m["pairings"]:
        doc.add_paragraph()
        for line in m["pairings"]:
            styled(doc.add_paragraph(), line, font=SERIF, size=12, color=GREY, space_after=1)

    doc.add_paragraph()
    for line in FOOTER_LINES:
        styled(doc.add_paragraph(), line, font=SANS, size=8, color=LIGHTGREY)

    doc.add_paragraph()
    back = doc.add_paragraph(); back.alignment = WD_ALIGN_PARAGRAPH.CENTER
    add_internal_link(back, "\u2191  Back to menu list", "TOP", color=LIGHTGREY,
                      size=10, bold=False, font=SANS)
    doc.add_page_break()

for m in MENUS:
    render_menu(m)

doc.save("Menus.docx")
print("OK -> Menus.docx generado")
