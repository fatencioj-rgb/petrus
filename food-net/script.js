
/* ── DATA ── */

// Culinary Glossary: Definitions for technical terms and ingredients
const glossary = {
  "tartare": "Finely chopped raw meat or fish, seasoned and served cold. Often mixed with capers, onions, and other condiments.",
  "tartlet": "A small tart or pastry case, typically filled with savory or sweet ingredients.",
  "Savora mustard": "French mustard brand established in 1870, made with brown mustard seeds, white wine, tarragon, turmeric and spices.",
  "taramasalata": "Greek dip made from cod roe, olive oil, lemon juice and a starchy base like bread or potato.",
  "caviar": "Eggs (roe) of sturgeon or other fish, prized as a luxury ingredient. Served chilled, often as a garnish.",
  "croustade": "A crispy, hollow shell made from pastry or fried bread dough, typically filled with savory preparations.",
  "terrine": "A dish made from forcemeat, pâté, or vegetables cooked in a rectangular mold and served in slices.",
  "mousse": "A light, airy preparation made by folding whipped cream or beaten egg whites into a flavored base.",
  "consommé": "A clear, refined broth made by simmering stock with meat and vegetables, then straining through muslin.",
  "velouté": "A classic French sauce made from a light stock (chicken, veal, or fish) thickened with a roux.",
  "sabayon": "A warm emulsified sauce made from egg yolks and liquid (wine, vinegar, or stock) whisked over gentle heat.",
  "beurre noisette": "Brown butter made by cooking unsalted butter until the milk solids caramelize, producing a rich, nutty hazelnut flavor.",
  "purée": "A smooth, thick paste made by cooking and blending vegetables, fruits, or other ingredients.",
  "foam": "A light, airy preparation created by aerating a liquid using a whipped cream dispenser or whisk.",
  "confit": "Food that has been slowly cooked in fat or oil at low temperature, then preserved in that same fat or oil.",
  "bisque": "A rich, creamy soup made from shellfish or sometimes vegetables, thickened with rice or cream.",
  "farce": "A forcemeat or stuffing made from meat, fish, or vegetables, used to fill other preparations.",
  "jus": "A thin, flavorful sauce made from meat drippings or stock, often enhanced with wine or other ingredients.",
  "émulsion": "A stable mixture of two normally immiscible liquids (like oil and water) held together by an emulsifier.",
  "brunoise": "Finely diced vegetables cut into tiny uniform cubes, typically 1–2mm on each side.",
  "julienne": "Vegetables cut into thin, uniform matchstick-like pieces, typically 3–4mm long and 1–2mm thick.",
  "feuille de brique": "A thin, crispy pastry sheet from North African cuisine, similar to phyllo dough, used for both savory and sweet dishes.",
  "barigoule": "A preparation of artichokes braised with aromatic vegetables and herbs, often served as a sauce or broth.",
  "pomme soufflé": "Thin potato slices layered and shaped into stars, dusted with cornstarch and fried until puffed and golden.",
  "dulse": "A reddish-purple Atlantic seaweed with a savoury, umami flavor, used as a garnish or ingredient.",
  "noisette": "French for 'hazelnut'; also refers to a small, tender cut of meat, often lamb or veal, cut from the best part of the cut.",
  "vin jaune": "A unique dry white wine from France's Jura region, made from Savagnin grapes aged under a yeast layer for 6+ years.",
  "Oscietra caviar": "Premium sturgeon caviar with medium-sized eggs, known for its rich, buttery flavor and firm texture.",
  "black garlic": "Garlic that has been fermented under controlled heat and humidity, resulting in a dark color, sweet-savory flavor and soft texture.",
  "samphire": "A succulent coastal plant with thin, jointed stems and a salty, mineral flavor; also called sea beans.",
  "oyster leaf": "A leafy green with a briny, oyster-like flavor, often used as a garnish or in salads.",
  "sea purslane": "A fleshy, salty-tasting coastal plant used in salads and as a garnish, also known as sea asparagus.",
  "sea fennel": "A coastal herb with a bright, anise-like flavor, used in salads, sauces and as a garnish.",
  "nori": "A type of edible seaweed commonly used in Japanese cuisine, often found in sheets for sushi or as a powder for seasoning.",
  "Alyssum": "A flowering plant with small, delicate blooms and a sweet, honey-like fragrance. Edible flowers often used as a garnish.",
  "bronze fennel": "A variety of fennel with bronze-colored fronds and a slightly stronger anise flavor than common fennel.",
  "salted finger": "A type of seaweed with a salty, umami flavor, often used in coastal cuisine and as a garnish.",
  "nasturtium": "An edible flower with a peppery flavor, often used as a colorful garnish. Leaves and seeds are also edible.",
  "chimichurri": "A vibrant herb sauce from Argentina, made from parsley, garlic, vinegar, oil and spices.",
  "herdwick lamb": "Meat from Herdwick sheep, native to England's Lake District, known for natural grazing, tender meat and rich flavor.",
  "Iberico chorizo": "Spanish cured sausage made from free-range black Iberian pigs, seasoned with smoked paprika, air-dried 4+ months.",
  "Pata Negra": "Spanish term meaning 'black hoof', referring to the Iberian pig prized for its superior meat quality and distinctive acorn-fed diet.",
  "Costal XO": "A condiment made from salted finger, samphire, sea purslane and sea fennel, used to add a briny, umami punch to dishes.",
  "Espelette pepper": "AOP-classified pepper from Pyrénées-Atlantiques, South-West France. Berry, sweet flavor with medium heat (~4000 Scoville). Handpicked and air-dried.",
  "ponzu": "A Japanese citrus-based sauce made with soy sauce, rice vinegar, mirin and citrus juice, often used as a dipping sauce or dressing.",
  "Burrata": "An Italian cheese made from mozzarella and cream, with a soft, creamy interior and a delicate, milky flavor.",
  "Isle of Skye": "An island off the west coast of Scotland, known for its rugged landscapes and high-quality seafood, including hand-dived scallops.",
  "Sabayon": "A warm, frothy sauce made by whisking egg yolks with a sweet or savory liquid over gentle heat until thickened and airy.",
  "rove de garrigue": "A petite, aromatic, and creamy goat's milk cheese from Provence in the South of France. It takes its name from the specific Rove breed of goat (recognized by their large, twisted horns) and the 'garrigue' (the wild, sun-baked scrubland of the Mediterranean) where the goats graze."
};

// Function to wrap glossary terms in tooltip markup
function wrapGlossaryTerms(text) {
  let result = typeof text === 'string' ? text : '';
  Object.keys(glossary).forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    result = result.replace(regex, `<span class="glossary-term" data-definition="${glossary[term].replace(/"/g, '&quot;')}" title="${glossary[term].replace(/"/g, '&quot;')}">${term}</span>`);
  });
  return result;
}

// Herb Leaf Definitions: List of herbs and leaves with regex patterns for matching
const herbLeafDefinitions = [
  { label: 'Basil', pattern: /\bbasil\b/i },
  { label: 'Chive', pattern: /\bchives?\b/i },
  { label: 'Chervil', pattern: /\bchervil\b/i },
  { label: 'Dill', pattern: /\bdill\b/i },
  { label: 'Parsley', pattern: /\bparsley\b/i },
  { label: 'Lovage', pattern: /\blovage\b/i },
  { label: 'Mint', pattern: /\bmint\b/i },
  { label: 'Thyme', pattern: /\bthyme\b/i },
  { label: 'Rosemary', pattern: /\brosemary\b/i },
  { label: 'Tarragon', pattern: /\btarragon\b/i },
  { label: 'Coriander', pattern: /\bcoriander\b/i },
  { label: 'Lemon balm', pattern: /\blemon balm\b/i },
  { label: 'Wild garlic', pattern: /\bwild garlic\b/i },
  { label: 'Samphire', pattern: /\bsamphire\b/i },
  { label: 'Oyster leaf', pattern: /\boyster leaf\b/i },
  { label: 'Sea purslane', pattern: /\bsea purslane\b/i },
  { label: 'Sea fennel', pattern: /\bsea fennel\b/i },
  { label: 'Bronze fennel', pattern: /\bbronze fennel\b/i },
  { label: 'Salted finger', pattern: /\bsalted finger\b/i },
  { label: 'Nori', pattern: /\bnori\b/i },
  { label: 'Nasturtium', pattern: /\bnasturtium\b/i },
  { label: 'Marjoram', pattern: /\bmarjoram\b/i },
  { label: 'Allium flower', pattern: /\ballium flower\b/i },
  { label: 'Purple Alyssum flowers', pattern: /\bpurple alyssum flowers\b/i },
  { label: 'White Alyssum flowers', pattern: /\bwhite alyssum flowers\b/i },
  { label: 'Iceplant', pattern: /\biceplant\b/i },
  { label: 'Red Dulse', pattern: /\bred dulse\b/i }
];

const herbLeafImageFiles = {
  'Basil': 'basil.png',
  'Chive': 'chive.png',
  'Chervil': 'chervil.png',
  'Dill': 'dill.webp',
  'Parsley': 'parsley.png',
  'Lovage': 'lovage.png',
  'Mint': 'mint.png',
  'Thyme': 'thyme.png',
  'Rosemary': 'rosemary.png',
  'Tarragon': 'tarragon.png',
  'Coriander': 'coriander.png',
  'Lemon balm': 'lemon-balm.png',
  'Wild garlic': 'wild-garlic.png',
  'Samphire': 'samphire.png',
  'Oyster leaf': 'oyster-leaf.png',
  'Sea purslane': 'sea-purslane.png',
  'Sea fennel': 'sea-fennel.png',
  'Bronze fennel': 'bronze-fennel.png',
  'Salted finger': 'salted-finger.png',
  'Nori': 'nori.png',
  'Nasturtium': 'nasturtium.webp',
  'Marjoram': 'marjoram.png',
  'Allium flower': 'allium-flower.png',
  'Purple Alyssum flowers': 'purple-alyssum-flowers.png',
  'White Alyssum flowers': 'white-alyssum-flowers.webp',
  'Iceplant': 'Iceplant.webp',
  'Red Dulse': 'red-dulse.webp',
};

function slugifyIngredient(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function getIngredientImageSrc(label) {
  return `images/${herbLeafImageFiles[label] || `${slugifyIngredient(label)}.png`}`;
}

function getIngredientPalette(label) {
  const palettes = [
    ['#2E6D46', '#7BBE6D', '#183526'],
    ['#3D7A4F', '#A3D977', '#1D3B26'],
    ['#4F8654', '#C6E28A', '#22412A'],
    ['#2F7E76', '#95D8C6', '#163632']
  ];
  const seed = label.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palettes[seed % palettes.length];
}

// Function to generate a data URI for an SVG icon representing the ingredient 
function getIngredientIconDataUri(label) {
  const [base, accent, shadow] = getIngredientPalette(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${base}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#g)" />
      <path d="M11 23c4-10 14-11 18-6-1 8-7 14-14 15-4 0-7-4-4-9z" fill="rgba(255,255,255,0.82)" />
      <path d="M15 28c4-5 8-8 12-12" stroke="${shadow}" stroke-width="2" stroke-linecap="round" fill="none" />
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function extractHerbLeafTerms(text) {
  const found = [];
  herbLeafDefinitions.forEach(({ label, pattern }) => {
    if (pattern.test(text) && !found.includes(label)) {
      found.push(label);
    }
  });
  return found;
}

function buildHerbLeafMarkup(label) {
  const src = getIngredientImageSrc(label);
  const fallback = getIngredientIconDataUri(label);
  return `
    <span class="kb-ingredient-chip">
      <img src="${src}" alt="${label}" onerror="this.onerror=null;this.src='${fallback}'">
      <span>${label}</span>
    </span>`;
}

// Full list of dishes with details, including, description, allergies and knowledge points
const dishes = [
  {
    course: "Canapé",
    name: "Canapé Tartlet",
    desc: "Beef tartare served in a chickpea tartlet, finished with Savora mustard.",
    allergies: ["Milk","Gluten","Fish","Mustard","Soya"],
    setup: ["No Set Up"],
    knowledge: [
      { title: "Tartlet shell", text: "Made using chickpea flour — a high-protein legume flour." },
      { title: "Beef tartare", text: "Cornichons, capers, shallots, homemade tomato ketchup. Contains soy." },
      { title: "Savora mustard", text: "French mustard brand established 1870. Made with brown mustard seeds, white wine, tarragon, turmeric and other spices." }
    ]
  },
  {
    course: "Canapé",
    name: "Canapé Croustade",
    desc: "Black garlic croustade filled with taramasalata, and finished with costal XO and oscietra caviar.",
    allergies: ["Milk","Gluten","Fish","Mustard"],
    setup: ["No Set Up"],
    knowledge: [
      { title: "Black garlic croustade", text: "Made from a black garlic batter then deep-fried." },
      { title: "Costal XO", text: "Salted finger, samphire, sea purslane, sea fennel." },
      { title: "Taramasalata", text: "Greek dip of cod roe, olive oil, lemon juice and a starchy base (bread or potato)." },
      { title: "Herbs and leaves", text: "Salted finger, samphire, sea purslane, sea fennel." }
    ]
  },

  // Amuse-Bouche
  {
    course: "Amuse-Bouche",
    name: "Amuse-Bouche",
    desc: "Croissant filled with chicken liver parfait, served with chicken thigh in tempura, clementine gel, maple vinegar gel, and finished with chicken consommé.",
    allergies: ["Milk", "Gluten", "Shulphites", "Egg", "Mustard"],
    setup: ["Side plate", "Butter Knife"],
    knowledge: [

      { title: "Amuse-Bouche", text: "It is a small, bite-sized appetizer served before a meal. Typically, it is meant to stimulate the appetite and provide a preview of the chef's style. It means 'mouth amuser' in French." },
      { title: "Croissant", text: "A buttery, flaky, and layered pastry made from laminated dough." },
      { title: "Chicken liver parfait", text: "Smooth and creamy spread made from chicken liver, butter, and seasonings." },
      { title: "Chicken thigh tempura", text: "Chicken thigh coated in a light tempura batter and deep-fried." },
      { title: "Clementine gel", text: "Gel made from clementine juice, sugar, and gelling agent." },
      { title: "Maple vinegar gel", text: "Gel made from maple vinegar, sugar, and gelling agent." },
      { title: "Chicken consommé", text: "Clear, flavorful broth made from chicken, typically clarified to remove impurities, served with terragon oil, thyme and rosemary." },
      { title: "Herbs and leaves", text: "White Allysum Flowers, Purple Allysum Flowers"}

    ]
  },

  /*
  {
    course: "Amuse-Bouche",
    name: "New Amuse-Bouche",
    desc: "Tomato gazpacho laying on a bed of strawberry tartare, with a tomato tarte with basil, ponzu and burrata foam, tomato bread and whipped tomato butter.",
    allergies: ["Milk","Gluten","Celery","Sulphur dioxide","Egg","Mustard"],
    setup: ["Side plate", "Butter Knife"],
    knowledge: [
      { title: "Gazpacho", text: "Tomato, red pepper, garlic, onion, olive oil and gluten-free bread. Strawberry tartar sits underneath." },
      { title: "Tarte pastry", text: "Shortcrust pastry (butter, flour, salt) with Espelette pepper, oregano and parmesan." },
      { title: "Tomato butter", text: "Tomato powder, olives and basil." },
      { title: "Sauce", text: "Burrata foam." },
      { title: "Espelette pepper", text: "AOP-classified pepper from Pyrénées-Atlantiques, South-West France. Berry, sweet flavour with medium heat (~4000 Scoville). Handpicked and air-dried." }
    ]
  },
  */

  // Starter Fish
  {
    course: "Starter Fish",
    name: "Smoked Eel",
    desc: "Devon smoked eel served with Oscietra caviar, green apple gel, celeriac puree, on the side chimichurri doughnut, finished with smoked eel velouté.",
    allergies: ["Fish","Mustard","Celery","Milk","Egg","Gluten"],
    setup: ["Starter Fork", "Fish Knife", "Fish Spoon"],
    knowledge: [
      { title: "Main plate", text: "STURIA Oscietra caviar, celeriac purée and ribbons, green apple gel, black charcoal mayonnaise, pickled baby onions, mustard seeds, chive curls, nasturtium, dill, white allium flower." },
      { title: "On the side", text: "Chimichurri doughnut: Made with seaweed, parsley, dill, Japanese red wine. Stuffed with eel farce: eel trim, crème fraîche, chives. Chef recommends using it to mop the plate" },
      { title: "Sauce", text: "Velouté: Eel bones, shallots, thyme, garlic, white wine, chicken stock, milk, cream. \nThe velouté is poured in the middle of the plate" },
      // 
      { title: "Eel", text: "Eel is a long, snake-like fish found in both freshwater and saltwater environments. It has a rich, oily flesh and is often smoked or grilled. \n", images: ["eel.webp"] },
      { title: "Supplier", text: "Meadowland Smokery, Colyton, Devon." },
      { title: "Herbs and leaves", text: "Chive, dill, nasturtium, White Alyssum flowers." }
    ]
  },
  {
    course: "Starter Fish",
    name: "Pumpkin Tart",
    desc: "Pumpkin tart served with pickled girolles, roasted pumpkin seeds, sea lettuce, and finished with potimarron velouté.",
    allergies: ["milk", "sulphites", "molluscs (prestige)", "celery", "mustard", "gluten", "fish (prestige)"],
    setup: ["Starter Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Tart", text: "Brique pastry. Brushed with beaurre noisette, seasoned with leak, ash, nigella seeds." },
      { title: "Filling", text: "Smoked pumpkin écrasé, pickled girolles, roasted pumpkin seeds, sea lettuce, lyonnaise onions. Pickled mussels (prestige menu)." },
      { title: "Garnish", text: "Pickled pumpkin rose, coffee emulsion, shitake ponzu gel, green and purple shizo, pumpkin seeds mignonette, calandula petals." },
      { title: "Sauce", text: "Potimarron velouté: shellfish reduction for prestige. Parmesan for the lunch" },
      { title: "Écrasé", text: "roasted and mashed pumpkin, seasoned with salt and pepper." },
      { title: "Potimarron", text: "Potimarron is a type of winter squash with a sweet, nutty flavor. It is often used in soups, purees, and roasted dishes." },
      { title: "Sea lettuce", text: "Sea lettuce is a type of edible green algae that has a delicate, slightly salty flavor. It enhances the flavor of dishes and is often used as a garnish or in salads." },
      { title: "Lyonnaise onions", text: "Lyonnaise onions are thinly sliced onions that are sautéed until caramelized and tender. They add a sweet and savory flavor to dishes." },
      { title: "Herbs and leaves", text: "Green shiso, Calandula petals" },
    ]
  },
  /* 
  {
    course: "Starter Fish",
    name: "Cured Salmon",
    desc: "Cured Scottish salmon coated in nori powder, served with squid ink crisp with pickled gel and finished with buttermilk, horseradish and dill oil sauce.",
    allergies: ["Mollusc","Milk","Gluten","Celery","Sulphur dioxide","Egg","Mustard","Soya"],
    knowledge: [
      { title: "The cure", text: "Scottish salmon cured in sugar, salt, coriander seeds, lemon and lime zest. Every piece wrapped in nori seaweed." },
      { title: "Side", text: "Tapioca and squid ink cracker dressed with dill pickle gel, fresh dill and chive curls." },
      { title: "Sauce", text: "Buttermilk, horseradish, allium and dill oil — poured tableside." }
    ]
  }, */

  // Starter Meat
  /*
  {
    course: "Starter Meat",
    name: "Duck Leg terrine",
    desc: "Our terrine consist of Duck leg mixed with chives, parsley, and chervil. You will also find Fruit chutney, Morello cherries, and cherry jelly. <br> Served at the table with fruit bread and Duck liver parfait",
    allergies: ["Milk","Gluten","Celery","Sulphur dioxide","Egg","Mustard"],
    setup: ["Starter Fork", "Starter Knife", "Side plate", "Butter Knife"],
    knowledge: [
      { title: "Cooking method", text: "The duck leg is braised for 4 hours." },
      { title: "Fruit bread", text: "The fruit bread will be the same as our Amuse bouche but Fruit chutney paste instead of Tomato."},
      { title: "Cherries", text: "The cherries on top of the terrine is soaked in kirsch (cherry liquer)."},
      { title: "Chutney", text: "Fruit chutney (Figs, dates, prunes)"},
      { title: "Braising", text: "Braising is a cooking method that involves searing the meat at a high temperature and then cooking it slowly in liquid at a lower temperature. This method helps to tenderize tougher cuts of meat and infuse them with flavor."},
      { title: "Terrine", text: "A terrine is a dish made from forcemeat, pâté, or vegetables cooked in a rectangular mold and served in slices. It is often made with layers of different ingredients and can be served hot or cold."},
    ]
  },
  {
    course: "Starter Meat",
    name: "Sladesdown Chicken",
    desc: "Baby gem cooked in chicken stock thyme and garlic, between layers chicken ragout, au dessus chicken salt, mushroom ketchup, herb puree, chicken skin, girolle, white beans mange tout, fennel flowers, sea perslane, sea fennel, dill, corn flower – chicken veloute kalamansi vinegar, on the side chicken liver parfait with pastrami flat bread and vinegar reduction.",
    allergies: ["Sulphites","Gluten","Mustard","Milk","Celery","Egg"],
    setup: ["Main Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Baby gem", text: "Cooked in chicken stock, thyme and garlic." },
      { title: "Mushroom ketchup", text: "Made from mushrooms, vinegar, sugar and spices." },
      { title: "Kalamansi", text: "A small, round citrus fruit native to Southeast Asia, known for its tart flavor." },
      { title: "Chicken liver parfait", text: "A smooth, creamy spread made from chicken livers, butter, and seasonings." },
      { title: "Suppliers", text: "Sladesdown Farm, Dartmoor National Park, Devon, South West England. Non-GM, all-natural feed, pasture-grazed on wild grasses, vetches and brassicas." },
      { title: "Herbs and leaves", text: "Fennel flowers, sea purslane, sea fennel, dill, cornflower." }
    ]
  },
  */
  {
    course: "Starter Meat",
    name: "Pig Trotter",
    desc: "Braised pig trotter, stuffed with farce, served with smoked pomme puree, pork crackling, and finished with pork jus.",
    allergies: ["Milk", "Gluten", "Celery", "Sulphur dioxide", "Mustard"],
    setup: ["Starter Fork", "Starter Knife", "Side plate", "Butter Knife"],
    knowledge: [
      { title: "Trotter", text: "Deboned and braised, stuffed with farce (sweetbread, girolle duxelles, confit shallots, herbs chives parsley chervil, ham hock)." },
      { title: "Sweetbread cooking", text: "Soaked in ice water for 24 hours, cooked sous vide for 1 hour, peeled, pressed, and fried with rice flour until crispy." },
      { title: "Sauce", text: "Pork jus. Made of trotter bone, pork trimms, red wine and cider vinegar. Finished with wholegrain mustard." },
      { title: "Pomme puree", text: "Smoked pomme puree. Chopped pickeld girolles, crumb is made of sourdough, crispy skin, and chopped herbs. Then smoked with apple wood." },
      { title: "Side", text: "Pork crackling. Cooked pork skin, dehydrated and then fried until crispy a la minute." },
      { title: "Sweetbread", text: "Sweetbread is the culinary name for the thymus or pancreas of a calf or lamb, often used in gourmet dishes." },
      { title: "Braising", text: "Braising is a cooking method that involves searing the meat at a high temperature and then cooking it slowly in liquid at a lower temperature. This method helps to tenderize tougher cuts of meat and infuse them with flavor."},
      { title: "Pig trotter", text: "A pig trotter is the foot of a pig, often used in traditional dishes and slow-cooked to achieve tenderness."},
      { title: "Ham hock", text: "The ham hock is the lower portion of a pig's leg, often used to add flavor to dishes and slow-cooked for tenderness." }
    ]
  },
  /*
  {
    course: "Vegetarian",
    name: "Wye Valley Asparagus Tarte",
    desc: "Asparagus tarte filled with crushed boiled egg, asparagus, garlic pesto, and candied hazelnut. Served with a brioche foam with hazelnut.",
    allergies: ["Gluten","Nuts","Sulphites","Celery","Mustard","Milk","Egg"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Pastry", text: "Feuille de brique — semi-transparent before cooking, turns golden and crispy when baked or fried. Perfect for both savoury and sweet." },
      { title: "Butter", text: "Infused with red pepper, cumin and smoked paprika." },
      { title: "Garlic pesto", text: "Wild garlic, (No Nuts)" },
      { title: "Filling", text: "Cooked and fermented green asparagus, onion lyonnaise, grated hard-boiled egg with chives, candied hazelnut crumbs, asparagus tips brushed with duck glaze and vinaigrette." },
    ]
  }, */
  {
    course: "Shellfish",
    name: "Isle of Skye Scallops",
    desc: "Hand-dived scallops served with lemon gel, coastal herbs and herb purée. Finished with scallop roe and olive oil sabayon.",
    allergies: ["Mollusc","Milk","Gluten","Celery","Sulphur dioxide","Egg","Mustard","Soya"],
    setup: ["Starter Fork", "Fish Knife", "Fish Spoon"],
    knowledge: [
      { title: "Coastal herbs", text: "Salted finger, samphire, oyster leaf, sea purslane, sea fennel." },
      { title: "Herb purée", text: "Dill, chervil, parsley, basil, lovage, mint." },
      { title: "Sauce", text: "Scallop roe and olive oil sabayon (a light, creamy sauce made with egg yolk and Colobino olive oil, lemon and vegetable stock)." },
      { title: "Sauce Placement", text: "Two canals of sabayon bottom right of the scallops" },
      { title: "Sabayon", text: "A warm, frothy sauce made by whisking egg yolks with a sweet or savory liquid over gentle heat until thickened and airy." },
      { title: "Isle of Skye", text: "Island off the west coast of Scotland, known for rugged landscapes and high-quality seafood, including hand-dived scallops." },
      { title: "Supplier", text: "Keltic Seafare, established 1992 by Alasdair Hughson. Based in Dingwall, North of Inverness. North-West Highland coast of Scotland, delivered within 24–36 hours." },
      { title: "Herbs and leaves", text: "Salted finger, samphire, oyster leaf, sea purslane, sea fennel"}
    ]
  }, 
  {
    course: "Shellfish",
    name: "Lobster Raviolo",
    desc: "Fresh lobster raviolo with scallop mousse served on a bed of fennel chutney, on top lobster consommé jelly with lemon balm and lime, finished with lobster bisque.",
    allergies: ["Crustacean","Milk","Gluten","Celery","Sulphites","Egg","Mustard"],
    setup: ["Starter Fork", "Fish Spoon"],
    knowledge: [
      { title: "Scallop mousse", text: "Scallop, egg white, cream, lemon, lime, chervil, chive, basil." },
      { title: "Consommé jelly", text: "Lobster, lime, lemon balm, lemon, gold leaf dust, finger lime." },
      { title: "Lobster bisque", text: "Lobster bones, celery, onion, garlic, lemongrass, lime, bay leaf, star anise, coriander seeds, white peppercorn, tomato paste, lobster stock, veal stock, brandy, white wine, cream, lemon zest, lemon balm, dashi vinegar." },
      { title: "Finger Lime", text: "A small, elongated citrus fruit with a caviar-like texture, bursting with tangy juice. Often used as a garnish or flavor enhancer.", images: ["finger-lime.webp"] },
    ]
  },
  {
    course: "Fish",
    name: "Monkfish",
    desc: "Pan seared Monkfish, served with celeriac terrine, scallop and dulce mousse, Chorizo foam. Red wine sauce, chorizo, preserve lemon and capers",
    allergies: ["Egg","Milk","Mollusc","Fish","Sulphites","Gluten","Celery"],
    setup: ["Main Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Terrine", text: "Celeriac terrine, Pickled celeriac, fresh celery, herb puree, lemon gel, Alyssum flowers, bronze fennel, dill and nori croutons" },
      { title: "Scallop and dulce mousse", text: "Scallop and dulce mousse, Chorizo foam." },
      { title: "Sauce Chorizo Foam", text: "A canal of chorizo foam on the fish (two if ALC)" },
      { title: "Sauce Red Wine Reduction", text: "Red wine reduction with fish sauce, Iberico chorizo, preserved lemon, capers and pickled shallots. \n To be poured in the center of the plate" },
      { title: "Monkfish", text: "The monkfish is a firm, white-fleshed fish with a mild flavor, often used in gourmet dishes. It is known for its meaty texture and is sometimes referred to as 'the poor man's lobster' due to its similar taste and texture. It is commonly pan-seared or roasted and pairs well with rich sauces and seafood accompaniments.", images: ["Monkfish.webp"] },
      { title: "Herbs and leaves", text: "Purple Alyssum flowers, bronze fennel, dill"}
    ]
  },
  {
    course: "Fish",
    name: "New Monkfish",
    desc: "Barbecued monkfish served with cauliflower puree, barbecued cauliflower, vadouvan veloute, and seaweed hollandaise.",
    allergies: ["Egg","Milk","Fish","Sulphites","Celery","Nuts","Sesame", "Mustard"],
    setup: ["Main Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Cooking Method", text: "Monkfish tail barbecued on a konro grill and roasted with seaweed oil." },
      { title: "Cauliflower Puree", text: "Caramelised cauliflower puree (Milk)." },
      { title: "Barbecued cauliflower .", text: "Cooked in vadouvan oil, candied hazelnut and zaatar. (Sesame, Nuts). On top preserved lemon puree, barbecued monkfish cheeks, barbecued monkfish liver, cauliflower tuills brushed with stock syrup, pickled cauliflower, iceplant, allisium flowers." },
      { title: "Sauce", text: "Vadouvan veloute (Onion, shallots, mustard seeds, carrots, chilli), seaweed hollandaise (nori, red dulse, sealettuce and combu)" },
      { title: "Vadouvan", text: "A French curry blend made with a mix of spices including cumin, coriander, mustard seeds, fenugreek, and turmeric. It has a rich, aromatic flavor and is often used in sauces and stews." },
      { title: "Seaweed Hollandaise", text: "A hollandaise sauce made with nori, red dulse, sea lettuce, and kombu. (Egg)(Milk)" },
      { title: "Hollandaise", text: "A classic French sauce made with egg yolks, butter, and lemon juice, often used as a base for variations such as the seaweed hollandaise." },
      { title: "Supplier", text: "Flying Fish Seafoods" },
      { title: "Konro grill", text: "A traditional Japanese charcoal grill used for barbecuing. Provides high heat and a distinct smoky flavor." },
      { title: "Monkfish", text: "The monkfish is a firm, white-fleshed fish with a mild flavor, often used in gourmet dishes. It is known for its meaty texture and is sometimes referred to as 'the poor man's lobster' due to its similar taste and texture. It is commonly pan-seared or roasted and pairs well with rich sauces and seafood accompaniments.", images: ["Monkfish.webp"] },
      { title: "Herbs and leaves", text: "Iceplant, Purple Alyssum flowers, Red Dulse"}
    ]
  },

  /*
  {
    course: "Meat",
    name: "Duck & Asparagus Tarte",
    desc: "Feuille de brique tarte with crushed boiled egg, asparagus, garlic pesto and duck liver parfait. Finished with Duck semi-glaze and brioche foam with hazelnut and foie gras.",
    allergies: ["Gluten","Nuts","Sulphites","Celery","Mustard","Milk","Egg"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Pastry", text: "Feuille de brique — semi-transparent before cooking, turns golden and crispy when baked or fried. Perfect for both savoury and sweet." },
      { title: "Butter", text: "Infused with red pepper, cumin and smoked paprika." },
      { title: "Filling", text: "Cooked and fermented green asparagus, onion lyonnaise, grated hard-boiled egg with chives, candied hazelnut crumbs, asparagus tips brushed with duck glaze and vinaigrette." },
      { title: "Duck element", text: "Duck liver parfait, wild garlic emulsion, clementine gel, diced smoked duck breast." },
      { title: "Sauce", text: "Duck semi-glaze and brioche foam with hazelnut milk and foie gras." },
      { title: "Sauce Placement", text: "Duck semi-glaze on the side of the tarte <br> Brioche foam with hazelnut and foie gras on top of the tarte right in the middle." }
    ]
  }, */

  /* 
  {
    course: "Meat",
    name: "Chicken Supreme",
    desc: "Chicken Supreme served with potato dumpling filled with chicken ragout, multiple textures of Kohlrabi, mushroom XO, Rhubarb segments, and finished with chicken and calamansi jus gras.",
    allergies: ["Sulphites","Gluten","Mustard","Milk","Soya","Celery","Egg"],
    setup: ["Starter Fork", "Steak Knife"],
    knowledge: [
      { title: "Chicken mousse", text: "Contains kohlrabi, poached rhubarb, lemon and lime zest, parsley, chervil." },
      { title: "Potato dumpling", text: "Filled with chicken ragout, mushroom XO and wild garlic. Fried." },
      { title: "Kohlrabi textures", text: "Caramelised kohlrabi purée with calamansi vinegar, fried kohlrabi leaf, salt-baked kohlrabi in olive oil emulsion, raw kohlrabi discs." },
      { title: "Other elements", text: "Poached rhubarb segments, rhubarb gel, lemon balm garnish." },
      { title: "Supplier", text: "Sladesdown Farm, Dartmoor National Park, Devon, South West England. Non-GM, all-natural feed, pasture-grazed on wild grasses, vetches and brassicas." },
      { title: "Term", text: "'Chicken supreme' (suprême de volaille): a boneless, skin-on chicken breast." }
    ]
  }, */

  {
    course: "Meat",
    name: "Chicken A la petit pois",
    desc: "Chicken laying on a bed of baby gem, baby onions, smoked bacon and peas. On the side we have a chicken consommé.",
    allergies: ["Sulphites","Gluten","Mustard","Milk","Egg"],
    setup: ["Main Fork", "Steak Knife"],
    knowledge: [
      { title: "Chicken", text: "Chicken breast with chicken mousse (in the mousse there is chicken, pea mousse and crushed peas )." },
      { title: "Potato dumpling", text: "Filled with chicken ragout, mushroom XO and wild garlic. Fried." },
      { title: "Other elements", text: "Pea and mint puree." },
      { title: "Sauce", text: "Chicken Consommé. \n Served on the side in a cup with Terragon oil. Reccomend to sip it while having chicken." },
      { title: "Supplier", text: "Sladesdown Farm, Dartmoor National Park, Devon, South West England. Non-GM, all-natural feed, pasture-grazed on wild grasses, vetches and brassicas." },
      { title: "Term", text: "'Chicken supreme' (suprême de volaille): a boneless, skin-on chicken breast." }
    ]
  },
  {
    course: "Fish",
    name: "Confit Brill",
    desc: "Cornish brill stuffed with a prawn mousse and wrapped in nasturtium leaf. On the side, a selection of brassicas as well as razor clams, finished with vin jaune sauce.",
    allergies: ["Egg", "Milk", "Mollusc", "Crustacean","Fish","Mustard", "Celery", "Sulphites"],
    setup: ["Main Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Cooking", text: "Confit (in beurre noisette) fillet of Cornish brill wrapped in nasturtium leaf and filled with a prawn mousse." },
      { title: "Brassicas Side", text: " broccoli purée, tender stem broccolis, fried broccoli leaves, pickled broccoli stems." },
      { title: "Sauce", text: "Vin jaune:  a special and characteristic type of white wine made in the Jura region in eastern France. It is similar to dry fino Sherry and gets its character from being matured in a barrel under a film of yeast, known as the voile, on the wine's surface." },
      { title: "Brill", text: ". Brill is a premium, flat sea fish that belongs to the turbot family and is highly prized for its firm, bright white flesh and sweet, delicate flavor. It is a popular, more affordable alternative to turbot\n", images: ["brill.webp"] },
      { title: "Beurre noisette", text: "Unsalted butter cooked until milk solids separate and caramelise, producing a rich, nutty hazelnut flavour. 'Noisette' = hazelnut in French." },
      { title: "Herbs and leaves", text: "Fennel Flower, Bronze Fennel, White Alyssum flowers, Salted Finger"}
    ] // check!
  },
    /*
  {
    course: "Fish",
    name: "Confit Turbot",
    desc: "Cornish turbot stuffed with a prawn mousse and wrapped in a courgette flower. On the side, different textures of courgettes dressed with niçoises olives and Picoia pepper.",
    allergies: ["Egg","Milk","Mollusc","Fish","Sulphites"],
    setup: ["Main Fork", "Starter Knife", "Fish Spoon"],
    knowledge: [
      { title: "Cooking", text: "Confit (in beurre noisette) fillet of Cornish turbot wrapped in a courgette flower and filled with a prawn mousse." },
      { title: "Vegetables Side", text: "Courgette brunoise mixed with pickled cucumber dice, tomato jam, courgette puree, niçoises olives." },
      { title: "On top of Vegetables Side", text: "Picoia pepper, pickled yellow and blanched baby courgettes, Cucamelon (originally from South America, similar to a little melon but taste like a delicious combination of cucumber and lime) and niçoise olives." },
      { title: "Sauce", text: "Bouillabaisse: a classic French seafood soup, originally a stew made by Marseille fishermen using the bony rockfish which they were unable to sell to restaurants or markets." },
      { title: "Turbot", text: "Cornish turbot is a flatfish found in the North Atlantic, known for its firm, white flesh and delicate flavor. It is often considered a premium fish and is prized for its culinary versatility. \n", images: ["turbot.webp"] },
      { title: "Picoia pepper", text: "A delicate and sweet pepper from the Canary Islands." },
      { title: "Beurre noisette", text: "Unsalted butter cooked until milk solids separate and caramelise, producing a rich, nutty hazelnut flavour. 'Noisette' = hazelnut in French." },
      { title: "Herbs and leaves", text: "Basil, Fennel Flower, Bronze Fennel"}
    ]
  },
  {
    course: "Fish",
    name: "Rack of Dover Sole",
    desc: "Rack of Dover sole stuffed with prawn mousse, confit in beurre noisette, served withpoached white asparagus, with Oscietra caviar, bread croutons and finished with Vin jaune sauce. <br> Add Caviar £15 supplement",
    allergies: ["Egg","Milk","Crustacean","Fish","Sulphites","Gluten","Celery"],
    knowledge: [
      { title: "The sole", text: "Stuffed with prawn mousse and confit in beurre noisette." },
      { title: "Asparagus", text: "Poached in butter and chicken emulsion." },
      { title: "Garnish", text: "Oscietra caviar, bread crouton, herb purée, red oxalis, chervil, chive, garlic flower." },
      { title: "Vin jaune sauce", text: "Butter, carrots, white button mushrooms, white peppercorn, Vin Jaune and chicken stock." },
      { title: "Beurre noisette", text: "Unsalted butter cooked until milk solids separate and caramelise, producing a rich, nutty hazelnut flavour. 'Noisette' = hazelnut in French." },
      { title: "Vin Jaune", text: "Unique dry white from France's Jura region, made from Savagnin grapes aged under a yeast layer (voile) for over six years. Nutty, complex, oxidative style." }
    ]
  }, 
  {
    course: "Meat",
    name: "100 Days Dry-Aged Blue Grey",
    desc: "Strip loin aged 100 days, served with hay-smoked potatoes, globe artichoke, girolle mushrooms. on the side brioche filled with ox cheek, and finished with red wine beef jus, green peppercorn and foie gras.",
    allergies: ["Gluten","Sulphites","Egg","Milk","Celery","Mustard"],
    setup: ["Main Fork", "Steak Knife"],
    knowledge: [
      { title: "Blue-Grey cattle", text: "Hybrid breed: Black Galloway × White Shorthorn Bull. Found in South-West Scotland and North-West England. Known for fertility, hardiness and quality even in poor grazing conditions." },
      { title: "Dry aging", text: "Hung in a controlled room at 0–3°C with 80–85% humidity. Natural enzymes break down muscle fibres, increasing tenderness and deepening umami flavour. The longer the age, the more intense." },
      { title: "Barigoule broth", text: "Chicken stock, white wine, olive oil, thyme, lemon juice, garlic." },
      { title: "Other components", text: "Artichoke and truffle oil purée. Brioche filled with braised ox cheek and mushroom ragout." },
      { title: "Violet artichoke", text: "Italian artichoke variety, purple-hued bracts, slightly sweet with grassy notes." },
      { title: "Pomme soufflé", text: "Finely sliced potatoes shaped into stars, layered, dusted with cornstarch and fried in oil." }
    ]
  }, 
  */
  {
    course: "Meat",
    name: "100 Days Dry-Aged Blue Grey",
    desc: "100 days aged blue grey, served with braised carrot, shallots purée and finished with red wine beef jus, green peppercorn and bone marrow.",
    allergies: ["Gluten","Sulphites","Egg","Milk","Celery","Mustard"],
    setup: ["Main Fork", "Steak Knife"],
    knowledge: [
      { title: "Blue-Grey cattle", text: "Hybrid breed: Black Galloway × White Shorthorn Bull. Found in South-West Scotland and North-West England. Known for fertility, hardiness and quality even in poor grazing conditions." },
      { title: "Dry aging", text: "Hung in a controlled room at 0–3°C with 80–85% humidity. Natural enzymes break down muscle fibres, increasing tenderness and deepening umami flavour. The longer the age, the more intense." },
      { title: "Carrots", text: "Braised carrot glazed with beef jus and garnished with shallots and bacon crumbs. Fermented carrot gel, carrot purée, pickled carrots." },
      { title: "Shallots purée", text: "Smooth purée made from shallots, often used to add a sweet and mild onion flavor to dishes." },
      { title: "Bone marrow", text: "Bone marrow is the soft, fatty tissue found inside bones. It is rich in flavor and nutrients, often used in gourmet dishes to add depth and richness." },
      { title: "Sauce", text: "Red wine beef jus with capers, peppercorns, confit shallots, and bone marrow." },
      { title: "Herbs and leaves", text: "White Alyssum flowers"}
    ]
  },
  {
    course: "Meat",
    name: "Rack of Herdwick Lamb",
    desc: "Pan-seared Herdwick lamb rack, nori tarte with crushed peas, mint gel, seared lamb shoulder and pine nuts, finished with Lamb and marjoram jus.",
    allergies: ["Milk","Gluten","Celery","Egg","Mustard","Nuts"],
    setup: ["Main Fork", "Steak Knife"],
    knowledge: [
      { title: "Herdwick lamb", text: "Native to the Lake District, North West England. Known for natural grazing, meaty flavour and tenderness. Slaughtered 6–12 months old (lamb). Hogget = 1–2 years, Mutton = 2+ years." },
      { title: "Tarte", text: "Feuille de brique with nori powder, crushed peas, garlic pesto, mint gel, rove de garrigue gel, pine nuts." },
      { title: "Lamb shoulder", text: "Mixed with chicken mousse, spinach farce (black garlic, mushroom XO, miso, black garlic purée, chervil, chive, parsley). Pan-seared then added to the tarte." },
      { title: "Marjoram", text: "Perennial herb with sweet pine and citrus flavour. Indigenous to Cyprus, the Mediterranean, Turkey and Western Asia." }
    ]
  },
  {
    course: "Meat",
    name: "Venison Saddle",
    desc: "Roasted venison saddle, served with feuille de brick filled with deer shoulder, pickled beetroot, and finished with Roquefort sauce and deer jus.",
    allergies: ["Milk","Gluten","Celery","Mustard","Sulphites"],
    setup: ["Main Fork", "Steak Knife"],
    knowledge: [
      { title: "Venison Saddle", text: "Roasted venison saddle. A cut from the back of the deer, known for its tenderness and rich flavor. Served medium-rare to preserve its juiciness." },
      { title: "Feuille de brick", text: "Feuille de brick filled with deer shoulder, spicy caramelized onion, figs, date and prune chutney on top blackberry gel and alyssum flower." },
      { title: "Chutney", text: "Beetroot and blackberry chutney, on top pickled beetroot ribbons, roquefort gel, fermented blackberry gel, alyssum flower." },
      { title: "Roquefort Sauce", text: "A creamy blue cheese sauce made with Roquefort cheese, to be poured first and at the top right of the feuille de brick." },
      { title: "Deer Jus", text: "A rich sauce made from the juices of roasted deer, to be poured at the bottom left of the feuille de brick." }
    ]
  },

  /* ***************************** Vegetarian ***************************** */
  {
    course: "Vegetarian",
    name: "Organic spelt",
    desc: "Our organic spelt ragout has been cooked in a similar style to risotto, with dots of herb puree and girolles mushrooms to accompany. At the table we serve with a shiitake mushroom consommé.",
    allergies: ["Gluten","Mustard","Sulphites","Celery","Milk","Egg"],
    setup: ["Starter Fork", "Soup Spoon"],
    knowledge: [
      { title: "Spelt", text: "Organic spelt ragout is made in a risotto style cooked with crème fraiche, shallots and white wine." },
      { title: "Garnish", text: "Confit garlic and parsley puree." },
      { title: "Sauce", text: "Girolles mushroom consommé with parsley oil." },
      { title: "Consommé", text: "A clear, refined broth made by simmering stock with meat and vegetables, then straining through muslin." },
    ]
  },
  {
    course: "Vegetarian",
    name: "Courgette",
    desc: "Courgette brunoise mixed with pickled cucumber dice, tomato jam, courgette puree, niçoises olives.Picoia pepper, pickled yellow and blanched baby courgettes, Cucamelon and niçoise olives.",
    allergies: ["Milk","Sulphites"],
    setup: ["Starter Fork","Starter Knife", "Sauce Spoon"],
    knowledge: [
      { title: "Cucamelon", text: "A small fruit native to South America, resembling a tiny watermelon but tasting like a mix of cucumber and lime."},
    ]
  },
  {
    course: "Vegetarian",
    name: "Artichoke",
    desc: "Crushed potato with violet artichoke and artichoke emulsion, garnished with chive curls, nasturtium leaves and pomme souffle. We are finishing with an onion consommé.",
    allergies: ["Sulphites","Egg","Celery","Mustard"],
    setup: ["Starter Fork","Starter Knife", "Sauce Spoon"],
    knowledge: [
      { title: "Sauce", text: "Onion consommé."},
      { title: "Violet artichoke", text: "Italian artichoke variety, purple-hued bracts, slightly sweet with grassy notes." },
      { title: "Pomme soufflé", text: "Finely sliced potatoes shaped into stars, layered, dusted with cornstarch and fried in oil." }

    ]
  },

  /* **************************** Cheese's ****************************** */
  /*
  {
    course: "Cheese",
    name: "Brightwell Ash",
    desc: "To make Brightwell Ash they use milk from a pedigree of Anglo Nubian goats and vegetable ash to coat the cheese which gives of tangy and fresh taste with a crumbly compact texture. The cheese is aged 21 days in the farm and a further week in the cheese room with controlled temperature and humidity to enhance flavours.",
    allergies: ["Milk","Vegetarian","Unpasteurised"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Carmarthenshire, Wales." },
      { title: "Milk", text: "Goat's milk from Anglo Nubian goats." },
      { title: "pasteurisation", text: "Unpasteurised." },
      { title: "Method", text: "Traditional Rennet <br> Curd is cut, drained, pressed and coated in vegetable ash." },
      { title: "Texture", text: "Crumbly, compact texture." },
      { title: "Taste", text: "Tangy and fresh." },
    ]
  },*/
  /*
  {
    course: "Cheese",
    name: "St Jude",
    desc: "The milk is slowly & gently turned into curds with little intervention – simply lifting the curds & ladling into moulds, turning daily until ready for sale. The flavours of the pasture are intact giving the cheese an earthy richness becoming more evident as it ages.",
    allergies: ["Milk","Unpasteurised"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Suffolk, England." },
      { title: "Milk", text: "Cow's milk from a herd of 200 cows." },
      { title: "pasteurisation", text: "Unpasteurised." },
      { title: "Method", text: "Animal rennet" },
      { title: "Texture", text: "Soft, creamy texture." },
      { title: "Taste", text: "Earthy richness, becoming more evident as it ages." },
    ]
  },*/
  /*
  {
    course: "Cheese",
    name: "Comté",
    desc: "Comté is a hard cheese with a rich, nutty flavour and a golden brown rind. In the style of a distinct Gruyère, with a hint of caramel sweetness. We select mountain-aged cheeses stored in traditional cellars close to where they are made. The cheeses we choose are from June, July, August and September, and are available in three ages: the classic d'Estive, aged 12 - 24 months, and the more mature Comté, aged 24 - 36 months.",
    allergies: ["Milk","Unpasteurised"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Franche Comte, France." },
      { title: "Milk", text: "Cow's milk from Montbéliarde and French Simmental cows." },
      { title: "pasteurisation", text: "Unpasteurised." },
      { title: "Method", text: "Traditional Rennet <br> Curd is cut, drained, pressed and aged." },
      { title: "Texture", text: "Firm, smooth texture." },
      { title: "Taste", text: "Rich, nutty flavour with a hint of caramel sweetness." },
    ]
  },*/
  /*
  {
    course: "Cheese",
    name: "RollRight",
    desc: "Roll Right is a washed rind cheese crafted by cheesemaker David Jowett, part of a new generation producing what are set to become classic regional British cheeses. Its name is inspired by the ancient Rollright Stones, located near the original dairy where the cheese was first made. This cheese features a tender pink to apricot rind with a gentle, gamey aroma. The interior is rich and buttery, offering a nutty, bosky character reminiscent of styles such as Reblochon or a mild Munster. Each wheel is wrapped in spruce bark, which helps support the soft, gooey texture while imparting subtle woodsy and smoky notes. The milk comes from a mixed herd, with a large proportion of Swiss Brown cattle—an ancient Alpine breed prized for producing milk particularly well suited to cheesemaking.",
    allergies: ["Milk","Unpasteurised"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Oxfordshire, England." },
      { title: "Milk", text: "Cow's milk from a mixed herd, with a large proportion of Swiss Brown cattle." },
      { title: "pasteurisation", text: "Unpasteurised." },
      { title: "Method", text: "Traditional Rennet <br> Curd is cut, drained, pressed and aged." },
      { title: "Texture", text: "Tender pink to apricot rind with a soft, gooey interior." },
      { title: "Taste", text: "Gentle, gamey aroma with a rich and buttery interior, offering a nutty, bosky character reminiscent of styles such as Reblochon or a mild Munster." },
    ]
  },*/
  /*
  {
    course: "Cheese",
    name: "Cashel Blue",
    desc: "Made by Louis & Jane Grubb, the milk comes entirely from their own herd of Friesian cattle. The creamy rich texture is well marbled with nutty blue moulds which, with effective maturing in the coolest part of the cellar with high humidity, they start to gently ooze and melt, giving this cheese a very satisfying and enjoyable taste.",
    allergies: ["Milk","Vegetarian","Pasteurised"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Tipperary, Ireland." },
      { title: "Milk", text: "Cow's milk from Friesian cattle." },
      { title: "pasteurisation", text: "Pasteurised." },
      { title: "Method", text: "Vegetarian Rennet <br> Curd is cut, drained, pressed and aged." },
      { title: "Texture", text: "Creamy rich texture, well marbled with nutty blue moulds." },
      { title: "Taste", text: "Satisfying and enjoyable taste, with gentle oozing and melting of the blue moulds." },
    ]
  },*/

  // New cheeses to be added
  {
    course: "Cheese",
    name: "Fleur De Chevre",
    desc: "A beautiful, artisanal French goat's cheese shaped like a small flower, traditionally seasoned with sea salt and often presented resting elegantly on a chestnut leaf.",
    allergies: ["Milk"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Poitou-Charentes, Western France." },
      { title: "Milk", text: "Goat's milk." },
      { title: "pasteurisation", text: "Unpasteurised." },
      { title: "Method", text: "Rennet used. Curd is cut, drained, and aged." },
      { title: "Texture", text: "Soft and creamy with a delicate, slightly crumbly interior." },
      { title: "Taste", text: "Mild, tangy, and slightly earthy with a fresh goat's milk character." },
    ]
  },
  {
    course: "Cheese",
    name: "Perail",
    desc: "A fresh, shallow creamy disc with a natural rind and a rich melting pate. Traditionally produced by makers of Roquefort using the day's excess milk, the flavour is pronounced and delicious, with the familiar sweet earthiness of fresh sheep’s milk. Velvety on the palate, pleasant notes of buttery straw linger on the palate, evidence of its maturation on straw mats.",
    allergies: ["Milk"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Aveyron, Southern France." },
      { title: "Milk", text: "Ewe's milk, traditionally from Lacaune sheep." },
      { title: "pasteurisation", text: "Thermised." },
      { title: "Method", text: "Vegetarian Rennet used." },
      { title: "Texture", text: "Soft, thick, and velvety with a thin, wrinkly bloomy rind. It becomes highly unctuous, silky, and almost runny at room temperature." },
      { title: "Taste", text: "Mild and buttery when young, expanding into rich, full-bodied flavors with distinct 'sheepy' farmyard undertones, sweet earth, and hints of hay or peat." },
    ]
  },
  {
    course: "Cheese",
    name: "Bastide",
    desc: "A traditional, firm Basque cheese made from pure sheep's milk aged from 3 to 12 months, deeply reflective of the historic, fortified medieval 'bastide' towns found throughout the Pyrenees region. The cheese is carefully crafted using time-honored methods, resulting in a dense, slightly crumbly interior that is rich, nutty, and slightly tangy, with a pronounced sheep's milk character.",
    allergies: ["Milk"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Larzac, France." },
      { title: "Milk", text: "Ewe's milk." },
      { title: "pasteurisation", text: "Thermised." },
      { title: "Method", text: "Rennet used. Curd is cut, drained, and aged." },
      { title: "Texture", text: "Firm and dense with a slightly crumbly interior." },
      { title: "Taste", text: "Rich, nutty, and slightly tangy with a pronounced sheep's milk character." },
    ]
  },
  {
    course: "Cheese",
    name: "Abbaye De Citeaux",
    desc: "A rare, traditional monastic cheese crafted entirely by hand by Trappist monks inside Cîteaux Abbey, sharing historical roots with the classic Savoie Reblochon.",
    allergies: ["Milk"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Cîteaux, Burgundy, France." },
      { title: "Milk", text: "Cow's milk." },
      { title: "pasteurisation", text: "Pasteurised." },
      { title: "Method", text: "Rennet used. Curd is cut, drained, and aged." },
      { title: "Texture", text: "Semi-soft, supple, and pliable with an ivory-white, smooth interior paste that features occasional small, irregular holes beneath a pale-orange, slightly leathery washed rind." },
      { title: "Taste", text: "Rich, buttery, and slightly tangy with earthy undertones." },
    ]
  },
  {
    course: "Cheese",
    name: "Bleu De Basque",
    desc: "A distinctive, refined French blue cheese made from sheep's milk in the Pyrenees, offering a beautifully balanced, milder alternative to traditional Roquefort.",
    allergies: ["Milk"],
    setup: ["Starter Fork", "Starter Knife"],
    knowledge: [
      { title: "Origin", text: "Macaye, France." },
      { title: "Milk", text: "Ewe's milk." },
      { title: "pasteurisation", text: "Pasteurised." },
      { title: "Method", text: "Rennet used. Curd is cut, drained, and aged." },
      { title: "Texture", text: "Creamy and crumbly with characteristic blue veining." },
      { title: "Taste", text: "Mildly tangy and nutty with a balanced blue cheese flavor." },
    ]
  },
  /* ***************************** Pre-Desserts ***************************** */

  /*
  {
    course: "Pre-Dessert",
    name: "Pre-Dessert Basil Sorbet",
    desc: "Basil sorbet with strawberry granita.",
    allergies: ["Sulphites"],
    setup: ["Teaspoon"],
    knowledge: [
      { title: "Basil sorbet", text: "Basil leaves mixed with sugar syrup then frozen." },
      { title: "Strawberry granita", text: "Strawberries blended with sugar syrup and frozen, scraped to create a crystalline texture." }
    ]
  },
  */
  {
    course: "Pre-Dessert",
    name: "Uva Fragola Sorbet",
    desc: "Uva fragola (strawberry grape) sorbet served with lemon granita, on top tuille, and preserved lemon gel.",
    allergies: ["Sulphites","Egg", "Gluten"],
    setup: ["Teaspoon"],
    knowledge: [
      { title: "Uva Fragola", text: "Also known as strawberry grape, it is a variety of grape with a distinct strawberry-like aroma and flavor. Originated in the United States, specifically from North American wild grape species like Vitis labrusca and varieties like the Concord grape or Isabella grape developed in the 19th century. The vines were imported to Europe and Italy in the 19th century because they resisted the devastating phylloxera vine pest." },
      { title: "Lemon granita", text: "Lemon juice mixed with sugar syrup then frozen and scraped to create a crystalline texture." },
      { title: "Tuille", text: "Thin, crisp cookie made with, sugar, butter, and flour. Baked until golden brown and shaped while warm." },
      { title: "Preserved lemon gel", text: "Lemon peel preserved in salt and sugar, blended into a smooth gel." },
      { title: "Herbs and leaves", text: "White Alyssum flowers" }
    ]
  },
  {
    course: "Pre-Dessert",
    name: "Pre-Dessert Rose Sorbet",
    desc: "Rose sorbet with champagne foam and strawberry powder.",
    allergies: ["Sulphites","Egg"],
    setup: ["Teaspoon"],
    knowledge: [
      { title: "Rose sorbet", text: "Rose water mixed with sugar syrup then frozen." },
      { title: "Champagne foam", text: "Champagne heated with sugar, small amount of gelatine and egg whites added, refrigerated then loaded into a siphon." }
    ]
  },
  /* ***************************** Desserts ***************************** */

  /*
  {
    course: "Dessert",
    name: "Dark Chocolate Soufflé",
    desc: "Valrhona 70% chocolate soufflé (crème pâtissière base) with kirsch, lemon, fresh cherry. Morello cherry sorbet.",
    allergies: ["Milk","Sulphites","Egg","Soya"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "Key detail", text: "70% Valrhona chocolate (Guanaja), crème pâtissière base. Served immediately — it will not wait." },
      { title: "Valrhona", text: "French premium chocolate house founded 1922 by Albéric Guironnet in Tain-l'Hermitage, near Lyon. Sourced from finest cocoa beans worldwide." },
      { title: "Crème pâtissière", text: "Pastry cream: milk, sugar, egg yolks, cornstarch cooked to a thick, smooth custard. Versatile base for many pastry applications." }
    ]
  },
  {
    course: "Dessert",
    name: "Rum Baba",
    desc: "Citrus rum baba soaked in rum syrup, sloe gel, fraises de bois. Yoghurt ice cream and strawberry chocolate tuile.",
    allergies: ["Gluten","Milk","Egg","Sulphites"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "The baba", text: "Citrus-flavoured: lemon, lime, orange, mandarin and vanilla." },
      { title: "Rum syrup", text: "Bacardi Spiced Rum (8 years aged), water, sugar, zest from all baba fruits, star anise." },
      { title: "Other elements", text: "Sloe berry gel, Greek yoghurt ice cream, strawberry chocolate tuiles, strawberry nappage." },
      { title: "Nappage", text: "A glaze used to coat desserts, typically made from jam, pectin or apricot." },
      { title: "Sloe berry", text: "Small, sharp and tangy berry native to Europe, Western Asia and parts of North Africa." }
    ]
  },
  */
  {
    course: "Dessert",
    name: "Plaisir Sucré",
    desc: "'Sweet pleasure' — chocolate feuilletine base, chocolate sponge, chocolate crémeux, hazelnut biscuit, hazelnut mousse, chocolate brioche tuile, milk ice cream.",
    allergies: ["Milk","Nuts","Egg","Gluten","Soya"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "Build (bottom to top)", text: "1. Chocolate feuilletine (dark choc, white choc, cocoa butter, praline, feuilletine). <br> 2. Chocolate sponge (cream, butter, 70% Guanaja, egg yolk, sugar, flour, cocoa, egg white). <br>3. Chocolate crémeux (70% choc, cream, eggs, milk, sugar). <br>4. Hazelnut biscuit (butter, brown sugar, vanilla, eggs, praline, flour). <br>5. Hazelnut mousse (egg yolk, sugar, gelatine, praline, cream). <br>6. Chocolate brioche tuile (isomalt, glucose, brioche, cocoa powder, gold flakes). <br>7. Milk ice cream." }
    ]
  },
  {
    course: "Dessert",
    name: "Clementine Soufflé",
    desc: "Valrhona 70% chocolate soufflé (crème pâtissière base) with kirsch, lemon, fresh clementines. Clementine sorbet.",
    allergies: ["Milk","Sulphites","Egg","Soya"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "Soufflé", text: "Dark chocolate soufflé (crème pâtissière base). Served immediately. Insert the chocolate, clementines and cocoa nips in the Soufflé, then add the clementine sorbet on top." },
      { title: "Clementine", text: "A citrus fruit with a sweet and tangy flavor, often used in desserts and pastries." },
      { title: "Crème pâtissière", text: "Pastry cream: milk, sugar, egg yolks, cornstarch cooked to a thick, smooth custard. Versatile base for many pastry applications." }
    ]
  },
  {
    course: "Dessert",
    name: "Black Forest Parfait",
    desc: "White chocolate parfait sprayed with 70% Valrhona chocolate, morello cherry jelly, cherry gel, cherry sorbet, chocolate opaline.",
    allergies: ["Gluten","Milk","Egg"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "Build", text: "White chocolate parfait → sprayed with 70% Valrhona chocolate → morello cherry jelly (set with yellow pectin) → chocolate brioche disc → cherry gel (infused with clementine zest and lemon balm) → cherry sorbet → chocolate opaline on top." }
    ]
  },
  {
    course: "Dessert",
    name: "Vacherin",
    desc: "Beautiful Vacherin with meringue, lemon curd, passion fruit, finished with coconut sorbet and coconut foam.",
    allergies: ["Gluten","Milk","Egg","Sulphites"],
    setup: ["Starter Fork", "Dessert Spoon"],
    knowledge: [
      { title: "Build", text: "Meringue → madeleines disk → lemon curd → passion fruit gel → fresh passion fruit → coconut sorbet → coconut foam." },
      { title: "Vacherin", text: "A classic French dessert made with meringue, ice cream or sorbet, and whipped cream, often served with fruit." },
      { title: "Meringue", text: "A mixture of whipped egg whites and sugar, baked until crisp." },
      { title: "Madeleines disk", text: "A small, shell-shaped sponge cake originating from France, often flavored with lemon ." },
      { title: "Lemon curd", text: "A tangy, creamy spread made from lemon juice, sugar, eggs, and butter." },
      { title: "Passion fruit", text: "A tropical fruit with a sweet-tart flavor, often used in desserts." },
      { title: "Coconut sorbet", text: "A dairy-free frozen dessert made from coconut milk and sugar." },
      { title: "Coconut foam", text: "A light, airy foam made from coconut milk, often used as a garnish." }
    ]
  },
  {
    course: "End of Service",
    name: "Petit Fours",
    desc: "Freshly baked honey and lemon madeleines and raspberry macarons.",
    allergies: ["Egg","Milk","Gluten","Soya"],
    setup: ["No Set Up"],
    knowledge: [
      { title: "Madeleines", text: "Traditional mini cakes from Commercy, Lorraine, France. Made from eggs, sugar, butter, flour — enhanced with lemon zest and honey. Shell-shaped." },
      { title: "Macarons vs macaroons", text: "A macaron is the delicate almond-based French sandwich biscuit. A macaroon is a dense, chewy coconut-based cookie. These are macarons." }
    ]
  },
];

const supportedLanguages = [
  { id: 'en', label: 'EN' },
  { id: 'it', label: 'IT' },
  { id: 'es', label: 'ES' },
  { id: 'fr', label: 'FR' }
];

const dishDescriptionTranslations = {
  'Canapé Tartlet': {
    it: 'Tartare di manzo servita in una tartelletta di ceci, rifinita con senape Savora.',
    es: 'Tártara de res servida en una tartaleta de garbanzos, rematada con mostaza Savora.',
    fr: 'Tartare de boeuf servi dans une tartelette de pois chiches, garni de moutarde Savora.'
  },
  'Canapé Croustade': {
    it: 'Croustade all\'aglio nero farcita con taramasalata, rifinita con coastal XO e caviale Oscietra.',
    es: 'Croustade de ajo negro relleno de taramasalata, rematado con coastal XO y caviar Oscietra.',
    fr: 'Croustade à l\'ail noir farci de tarama, garni de coastal XO et caviar Oscietra.'
  },
  'New Amuse-Bouche': {
    it: 'Gazpacho di pomodoro su una base di tartare di fragole, con tarte al pomodoro, basilico, ponzu e spuma di burrata, pane al pomodoro e burro al pomodoro montato.',
    es: 'Gazpacho de tomate sobre una base de tártara de fresas, con tarta de tomate, albahaca, ponzu y espuma de burrata, pan de tomate y mantequilla de tomate montada.',
    fr: 'Gazpacho de tomate sur une base de tartare de fraises, avec tarte à la tomate, basilic, ponzu et mousse de burrata, pain à la tomate et beurre de tomate monté.'
  },
  'Smoked Eel': {
    it: 'Anguilla affumicata del Devon servita con caviale Oscietra, gel di mela verde, purea di sedano rapa, doughnut al chimichurri a parte, rifinita con velouté di anguilla affumicata.',
    es: 'Anguila ahumada de Devon servida con caviar Oscietra, gel de manzana verde, puré de nabo sueco, buñuelo de chimichurri aparte, rematado con velouté de anguila ahumada.',
    fr: 'Anguille fumée du Devon servie avec caviar Oscietra, gel de pomme verte, purée de navet suédois, beignet de chimichurri à part, garni de velouté d\'anguille fumée.'
  },
  'Duck Leg terrine': {
    it: 'La nostra terrina è composta da coscia d\'anatra mescolata con erba cipollina, prezzemolo e cerfoglio. Troverete anche chutney di frutta, amarene e gelatina di ciliegie. <br> Servita al tavolo con pane alla frutta e parfait di fegato d\'anatra.',
    es: 'Nuestra terrina está compuesta de muslo de pato mezclado con cebollino, perejil y perifollo. También encontrará chutney de frutas, cerezas agrias y gelatina de cereza. <br> Servido en la mesa con pan de frutas y parfait de hígado de pato.',
    fr: 'Notre terrine est composée de cuisses de canard mélangées avec de la ciboulette, du persil et du cerfeuil. Vous trouverez également une chutney de fruits, des griottes et de la gelée de cerise. <br> Servi à table avec du pain aux fruits et un parfait de foie de canard.'
  },
  'Isle of Skye Scallops': {
    it: 'Capesante pescate a mano servite con gel al limone, erbe costiere e purea di erbe. Rifinite con sabayon di corallo di capasanta e olio d\'oliva.',
    es: 'Vieiras pescadas a mano servidas con gel de limón, hierbas costeras y puré de hierbas. Rematadas con sabayon de coral de vieira y aceite de oliva.',
    fr: 'Pétoncles pêchés à la main servis avec gel de citron, herbes côtières et purée d\'herbes. Garnis de sabayon de corail de pétoncle et huile d\'olive.'
  },
  'Lobster Raviolo': {
    it: 'Raviolo fresco all\'astice con mousse di capasanta, servito su una base di chutney di finocchio, con gelatina di consommé d\'astice, melissa e lime, rifinito con bisque d\'astice.',
    es: 'Ravioli fresco de langosta con mousse de vieira, servido sobre una base de chutney de hinojo, con gelatina de consomé de langosta, melisa y lima, rematado con bisque de langosta.',
    fr: 'Ravioli frais de homard avec mousse de pétoncle, servi sur une base de chutney de fenouil, avec gelée de consommé de homard, mélisse et citron vert, garni de bisque de homard.'
  },
  'Monkfish': {
    it: 'Rana pescatrice scottata in padella, servita con terrina di sedano rapa, mousse di capasanta e dulse, spuma al chorizo. Salsa al vino rosso con chorizo, limone conservato e capperi.',
    es: 'Rape salteado en sartén, servido con terrina de nabo sueco, mousse de vieira y dulse, espuma de chorizo. Salsa de vino tinto con chorizo, limón confitado y alcaparras.',
    fr: 'Lotte poêlée, servie avec terrine de navet suédois, mousse de pétoncle et dulse, mousse de chorizo. Sauce au vin rouge avec chorizo, citron confit et câpres.'
  },
  'Sladesdown Chicken': {
    it: 'Lattuga baby gem cotta in brodo di pollo con timo e aglio, con strati di ragout di pollo, sale di pollo, ketchup di funghi, purea di erbe, pelle di pollo, finferli, fagioli bianchi, taccole, fiori di finocchio, sea purslane, finocchio marino, aneto e fiordaliso. Velouté di pollo con aceto di kalamansi; a parte parfait di fegato di pollo con flatbread al pastrami e riduzione all\'aceto.',
    es: 'Lechuga baby gem cocida en caldo de pollo con tomillo y ajo, con capas de ragú de pollo, sal de pollo, ketchup de champiñones, puré de hierbas, piel de pollo, rebozuelos, judías blancas, guisantes, flores de hinojo, purslane marino, hinojo marino, eneldo y aciano. Velouté de pollo con vinagre de kalamansi; aparte parfait de hígado de pollo con flatbread de pastrami y reducción de vinagre.',
    fr: 'Laitue baby gem cuite dans un bouillon de poulet avec thym et ail, avec couches de ragoût de poulet, sel de poulet, ketchup de champignons, purée d\'herbes, peau de poulet, chanterelles, haricots blancs, pois gourmands, fleurs de fenouil, pourpier de mer, fenouil marin, aneth et bleuet. Velouté de poulet au vinaigre de kalamansi; à part un parfait de foie de poulet avec flatbread de pastrami et réduction de vinaigre.'
  },
  'Chicken A la petit pois': {
    it: 'Pollo adagiato su una base di lattuga baby gem, cipolline, pancetta affumicata e piselli. A parte serviamo un consommé di pollo.',
    es: 'Pollo reclinado sobre una base de lechuga baby gem, cebollitas, tocino ahumado y guisantes. Servimos aparte un consomé de pollo.',
    fr: 'Poulet couché sur une base de laitue baby gem, petits oignons, lard fumé et petits pois. Nous servons à part un consommé de poulet.'
  },
  'Confit Turbot': {
    it: 'Rombo della Cornovaglia farcito con mousse di gamberi e avvolto in un fiore di zucchina. A parte, diverse consistenze di zucchine condite con olive niçoise e peperone Picoia.',
    es: 'Rodaballo de Cornualles relleno de mousse de gamba y envuelto en una flor de calabacín. Aparte, diferentes texturas de calabacín aderezadas con aceitunas niçoise y pimiento Picoia.',
    fr: 'Turbot de Cornouailles farci de mousse de crevette et enrobé dans une fleur de courgette. À part, différentes textures de courgettes assaisonnées d\'olives niçoise et poivron Picoia.'
  },
  '100 Days Dry-Aged Blue Grey': {
    it: 'Controfiletto frollato 100 giorni, servito con patate affumicate al fieno, carciofo violetto e finferli. A parte brioche farcita con guancia di bue, rifinito con jus di manzo al vino rosso, pepe verde e foie gras.',
    es: 'Contrafilete envejecido 100 días, servido con papas ahumadas con heno, alcachofa violeta y rebozuelos. Aparte, bollo relleno de mejilla de res, rematado con salsa de carne al vino tinto, pimienta verde y foie gras.',
    fr: 'Faux-filet affiné 100 jours, servi avec pommes de terre fumées au foin, artichaut violet et chanterelles. À part, brioche farcie de joue de boeuf, garni de jus de boeuf au vin rouge, poivre vert et foie gras.'
  },
  'Rack of Herdwick Lamb': {
    it: 'Carré di agnello Herdwick scottato in padella, tarte al nori con piselli schiacciati, gel alla menta, spalla d\'agnello rosolata e pinoli, rifinito con jus di agnello e maggiorana.',
    es: 'Costillar de cordero Herdwick salteado en sartén, tarta de nori con guisantes triturados, gel de menta, espaldilla de cordero rosada y piñones, rematado con salsa de cordero y mejorana.',
    fr: 'Carré d\'agneau Herdwick poêlé, tarte au nori avec pois écrasés, gel de menthe, épaule d\'agneau rôtie et pignons, garni de jus d\'agneau et marjolaine.'
  },
  'Organic spelt': {
    it: 'Il nostro ragout di farro biologico è cotto in uno stile simile al risotto, accompagnato da punti di purea di erbe e funghi finferli. Al tavolo serviamo un consommé di funghi shiitake.',
    es: 'Nuestro ragú de escaña orgánica se prepara en un estilo similar al risotto, acompañado de puntos de puré de hierbas y rebozuelos. En la mesa servimos un consomé de champiñones shiitake.',
    fr: 'Notre ragoût d\'épeautre biologique est cuit dans un style similaire au risotto, accompagné de points de purée d\'herbes et de chanterelles. À table, nous servons un consommé de champignons shiitake.'
  },
  'Courgette': {
    it: 'Brunoise di zucchina mescolata con dadini di cetriolo sottaceto, confettura di pomodoro, purea di zucchina e olive niçoise. Peperone Picoia, zucchine gialle sottaceto e baby zucchine sbollentate, cucamelon e olive niçoise.',
    es: 'Brunoise de calabacín mezclado con dados de pepino encurtido, confitura de tomate, puré de calabacín y aceitunas niçoise. Pimiento Picoia, calabacines amarillos encurtidos y baby calabacines escaldados, cucamelon y aceitunas niçoise.',
    fr: 'Brunoise de courgette mélangée avec dés de concombre mariné, confiture de tomate, purée de courgette et olives niçoise. Poivron Picoia, courgettes jaunes marinées et mini courgettes blanchies, cornichon et olives niçoise.'
  },
  'Artichoke': {
    it: 'Patata schiacciata con carciofo violetto ed emulsione di carciofo, guarnita con riccioli di erba cipollina, foglie di nasturzio e pomme soufflé. Rifiniamo con un consommé di cipolla.',
    es: 'Papa aplastada con alcachofa violeta y emulsión de alcachofa, adornada con rizos de cebollino, hojas de capuchina y pomme soufflé. Rematamos con un consomé de cebolla.',
    fr: 'Pomme de terre écrasée avec artichaut violet et émulsion d\'artichaut, garnie de boucles de ciboulette, feuilles de capucine et pomme soufflée. Nous finissons avec un consommé d\'oignon.'
  },
  'Brightwell Ash': {
    it: 'Per produrre Brightwell Ash si usa latte di capre Anglo Nubian di razza, con cenere vegetale per ricoprire il formaggio, che dona un gusto fresco e leggermente acidulo con una consistenza compatta e friabile. Il formaggio matura 21 giorni in fattoria e un\'ulteriore settimana nella cheese room a temperatura e umidità controllate per esaltarne i sapori.',
    es: 'Para producir Brightwell Ash se utiliza leche de cabra de raza Anglo Nubia, con ceniza vegetal para cubrir el queso, que proporciona un sabor fresco y ligeramente ácido con una textura compacta y desmenuzable. El queso madura 21 días en la granja y una semana adicional en la cámara de queso a temperatura y humedad controladas para realzar sus sabores.',
    fr: 'Pour produire Brightwell Ash, on utilise du lait de chèvre de race Anglo Nubian, avec de la cendre végétale pour couvrir le fromage, qui donne un goût frais et légèrement acide avec une texture compacte et friable. Le fromage affine 21 jours à la ferme et une semaine supplémentaire dans la fromagerie à température et humidité contrôlées pour rehausser ses saveurs.'
  },
  'St Jude': {
    it: 'Il latte viene trasformato lentamente e delicatamente in cagliata con intervento minimo: la cagliata viene semplicemente sollevata e versata negli stampi, poi girata ogni giorno fino alla vendita. I sapori del pascolo restano intatti, donando al formaggio una ricchezza terrosa che diventa più evidente con la maturazione.',
    es: 'La leche se transforma lentamente y delicadamente en cuajada con intervención mínima: la cuajada se levanta simplemente y se vierte en moldes, luego se voltea todos los días hasta la venta. Los sabores del pasto permanecen intactos, dando al queso una riqueza terrosa que se vuelve más evidente con la maduración.',
    fr: 'Le lait est transformé lentement et délicatement en caillé avec une intervention minimale : le caillé est simplement soulevé et versé dans les moules, puis retourné tous les jours jusqu\'à la vente. Les saveurs du pâturage restent intactes, donnant au fromage une richesse terreuse qui devient plus évidente à l\'affinage.'
  },
  'Comté': {
    it: 'Il Comté è un formaggio a pasta dura dal sapore ricco e nocciolato e dalla crosta dorata. Ricorda uno stile Gruyère distinto, con una nota di dolcezza caramellata. Selezioniamo formaggi di montagna affinati in cantine tradizionali vicine al luogo di produzione. I formaggi scelti provengono da giugno, luglio, agosto e settembre e sono disponibili in tre stagionature: il classico d\'Estive, 12-24 mesi, e il Comté più maturo, 24-36 mesi.',
    es: 'Comté es un queso de pasta dura con un sabor rico y avellana y una corteza dorada. Recuerda un estilo Gruyère distintivo, con una nota de dulzura caramelizada. Seleccionamos quesos de montaña affinados en bodegas tradicionales cerca del lugar de producción. Los quesos seleccionados provienen de junio, julio, agosto y septiembre y están disponibles en tres edades: el clásico d\'Estive, 12-24 meses, y el Comté más maduro, 24-36 meses.',
    fr: 'Comté est un fromage à pâte dure avec une saveur riche et noisetée et une croûte dorée. Il rappelle un style Gruyère distinct, avec une note de douceur caramélisée. Nous sélectionnons des fromages de montagne affinés dans des caves traditionnelles près du lieu de production. Les fromages sélectionnés proviennent de juin, juillet, août et septembre et sont disponibles en trois âges : le classique d\'Estive, 12-24 mois, et le Comté plus mature, 24-36 mois.'
  },
  'RollRight': {
    it: 'Roll Right è un formaggio a crosta lavata creato dal casaro David Jowett, parte di una nuova generazione che produce formaggi regionali britannici destinati a diventare classici. Il nome si ispira alle antiche Rollright Stones, vicino al caseificio originale. Ha una crosta tenera dal rosa all\'albicocca con un delicato aroma selvatico. L\'interno è ricco e burroso, con un carattere nocciolato e boschivo che ricorda Reblochon o un Munster delicato. Ogni forma è avvolta in corteccia di abete, che sostiene la consistenza morbida e fondente e dona leggere note legnose e affumicate. Il latte proviene da una mandria mista, con una forte presenza di vacche Swiss Brown, antica razza alpina apprezzata per il latte ideale alla caseificazione.',
    es: 'Roll Right es un queso de corteza lavada creado por el quesero David Jowett, parte de una nueva generación que produce quesos regionales británicos destinados a convertirse en clásicos. El nombre se inspira en las antiguas Rollright Stones, cerca de la quesería original. Tiene una corteza suave de rosa a albaricoque con un aroma delicadamente salvaje. El interior es rico y mantecoso, con un carácter de nuez y bosque que recuerda a Reblochon o un Munster delicado. Cada forma está envuelta en corteza de abeto, que sostiene la textura suave y fundente y proporciona delicadas notas leñosas y ahumadas. La leche proviene de un rebaño mixto, con una fuerte presencia de vacas Swiss Brown, una antigua raza alpina apreciada por su leche ideal para la elaboración de queso.',
    fr: 'Roll Right est un fromage à croûte lavée créé par le fromager David Jowett, faisant partie d\'une nouvelle génération qui produit des fromages régionaux britanniques destinés à devenir des classiques. Le nom s\'inspire des anciennes Rollright Stones, près de la fromagerie originale. Il a une croûte tendre de rose à abricot avec un arôme délicatement sauvage. L\'intérieur est riche et beurré, avec un caractère de noix et de forêt qui rappelle Reblochon ou un Munster délicat. Chaque forme est enrobée d\'écorce de sapin, qui soutient la texture douce et fondante et donne des notes légèrement boisées et enfumées. Le lait provient d\'un troupeau mixte, avec une forte présence de vaches Swiss Brown, une ancienne race alpine appréciée pour son lait idéal pour la fabrication de fromage.'
  },
  'Cashel Blue': {
    it: 'Prodotto da Louis e Jane Grubb, il latte proviene interamente dalla loro mandria di vacche Friesian. La consistenza cremosa e ricca è ben marmorizzata da muffe blu nocciolate che, grazie a un\'efficace maturazione nella parte più fresca della cantina ad alta umidità, iniziano a sciogliersi delicatamente, donando al formaggio un gusto molto piacevole e appagante.',
    es: 'Producido por Louis y Jane Grubb, la leche proviene completamente de su rebaño de vacas Friesian. La textura cremosa y rica está bien veteada con mohos azules color avellana que, gracias a un envejecimiento efectivo en la parte más fría de la bodega con alta humedad, comienzan a derretirse delicadamente, dando al queso un sabor muy agradable y satisfactorio.',
    fr: 'Produit par Louis et Jane Grubb, le lait provient entièrement de leur troupeau de vaches Friesian. La texture crémeuse et riche est bien marbrée par des moisissures bleu noisetées qui, grâce à un affinage efficace dans la partie la plus froide du cellier à haute humidité, commencent à fondre délicatement, donnant au fromage un goût très agréable et satisfaisant.'
  },
  'Fleur De Chevre': {
    it: 'Un bellissimo formaggio artigianale francese di capra, modellato come un piccolo fiore, tradizionalmente condito con sale marino e spesso presentato elegantemente su una foglia di castagno.',
    es: 'Un hermoso queso artesanal francés de cabra, modelado como una pequeña flor, condimentado tradicionalmente con sal marina y frecuentemente presentado elegantemente sobre una hoja de castaño.',
    fr: 'Un magnifique fromage artisanal français de chèvre, façonné comme une petite fleur, traditionnellement assaisonné de sel marin et souvent présenté élégamment sur une feuille de châtaignier.'
  },
  'Perail': {
    it: 'Un disco fresco, basso e cremoso con crosta naturale e pasta ricca e fondente. Tradizionalmente prodotto dai casari del Roquefort con il latte in eccesso della giornata, ha un sapore pronunciato e delizioso, con la familiare dolcezza terrosa del latte fresco di pecora. Vellutato al palato, lascia piacevoli note di paglia burrosa, segno della maturazione su stuoie di paglia.',
    es: 'Un disco fresco, bajo y cremoso con corteza natural y pasta rica y fundente. Producido tradicionalmente por los queseros del Roquefort con la leche sobrante del día, tiene un sabor pronunciado y delicioso, con la familiar dulzura terrosa de la leche fresca de oveja. Aterciopelado al paladar, deja agradables notas de paja mantecosa, signo de la maduración en esteras de paja.',
    fr: 'Un disque frais, bas et crémeux avec croûte naturelle et pâte riche et fondante. Produit traditionnellement par les fromagers de Roquefort avec le lait en excès de la journée, il a une saveur prononcée et délicieuse, avec la douceur terreuse familière du lait frais de brebis. Velouté au palais, il laisse d\'agréables notes de paille beurrée, signe de l\'affinage sur des nattes de paille.'
  },
  'Bastide': {
    it: 'Un tradizionale formaggio basco a pasta compatta, prodotto con puro latte di pecora e stagionato da 3 a 12 mesi, profondamente legato alle storiche città medievali fortificate chiamate bastide nei Pirenei. È realizzato con metodi tradizionali, ottenendo una pasta densa, leggermente friabile, ricca, nocciolata e appena acidula, con un carattere pronunciato di latte di pecora.',
    es: 'Un queso tradicional vasco de pasta compacta, producido con leche pura de oveja y envejecido de 3 a 12 meses, profundamente vinculado a las históricas ciudades medievales fortificadas llamadas bastida en los Pirineos. Se elabora con métodos tradicionales, obteniendo una pasta densa, ligeramente friable, rica, avellana y apenas ácida, con un carácter pronunciado de leche de oveja.',
    fr: 'Un fromage basque traditionnel à pâte compacte, produit avec du lait pur de brebis et affiné de 3 à 12 mois, profondément lié aux historiques villes médiévales fortifiées appelées bastide dans les Pyrénées. Il est élaboré selon des méthodes traditionnelles, obtenant une pâte dense, légèrement friable, riche, noisetée et légèrement acide, avec un caractère prononcé de lait de brebis.'
  },
  'Abbaye De Citeaux': {
    it: 'Un raro formaggio monastico tradizionale, prodotto interamente a mano dai monaci trappisti all\'interno dell\'Abbazia di Cîteaux, con radici storiche condivise con il classico Reblochon della Savoia.',
    es: 'Un raro queso monástico tradicional, producido completamente a mano por monjes trapenses dentro de la Abadía de Cîteaux, con raíces históricas compartidas con el queso Reblochon clásico de Saboya.',
    fr: 'Un rare fromage monastique traditionnel, produit entièrement à la main par les moines trappistes au sein de l\'Abbaye de Cîteaux, avec des racines historiques partagées avec le fromage Reblochon classique de la Savoie.'  
  },
  'Bleu De Basque': {
    it: 'Un raffinato e distintivo formaggio erborinato francese di latte di pecora dei Pirenei, che offre un\'alternativa più delicata e ben equilibrata al Roquefort tradizionale.'
  },
  'Pre-Dessert Basil Sorbet': {
    it: 'Sorbetto al basilico con granita di fragole.',
    es: 'Sorbete de albahaca con granita de fresas.',
    fr: 'Sorbet au basilic avec granita de fraises.'
  },
  'Pre-Dessert Rose Sorbet': {
    it: 'Sorbetto alla rosa con spuma allo champagne e polvere di fragole.',
    es: 'Sorbete de rosa con espuma de champagne y polvo de fresa.',
    fr: 'Sorbet à la rose avec mousse de champagne et poudre de fraise.'
  },
  'Plaisir Sucré': {
    it: '"Dolce piacere": base di feuilletine al cioccolato, pan di Spagna al cioccolato, crémeux al cioccolato, biscuit alla nocciola, mousse alla nocciola, tuile di brioche al cioccolato e gelato al latte.',
    es: '"Placer Dulce": base de feuilletine de chocolate, bizcocho de chocolate, crémeux de chocolate, galleta de avellana, mousse de avellana, tuile de brioche de chocolate y helado de leche.',
    fr: '"Plaisir Sucré": base de feuilletine au chocolat, génoise au chocolat, crémeux au chocolat, biscuit à la noisette, mousse à la noisette, tuile de brioche au chocolat et crème glacée au lait.'
  },
  'Dark Chocolate Soufflé': {
    it: 'Soufflé al cioccolato Valrhona 70% con base di crème pâtissière, kirsch, limone e ciliegia fresca. Sorbetto all\'amarena.',
    es: 'Soufflé de chocolate Valrhona 70% con base de crème pâtissière, kirsch, limón y cereza fresca. Sorbete de amarena.',
    fr: 'Soufflé au chocolat Valrhona 70% avec base de crème pâtissière, kirsch, citron et cerise fraîche. Sorbet aux griottes.'
  },
  'Black Forest Parfait': {
    it: 'Parfait al cioccolato bianco spruzzato con cioccolato Valrhona 70%, gelatina di amarene, gel di ciliegia, sorbetto alla ciliegia e opalina al cioccolato.',
    es: 'Parfait de chocolate blanco rociado con chocolate Valrhona 70%, gelatina de amarena, gel de cereza, sorbete de cereza y opalina de chocolate.',
    fr: 'Parfait au chocolat blanc pulvérisé avec chocolat Valrhona 70%, gelée de griotte, gel de cerise, sorbet aux cerises et opaline au chocolat.'
  },
  'Rum Baba': {
    it: 'Babà agli agrumi imbevuto di sciroppo al rum, gel di prugnolo e fraises de bois. Gelato allo yogurt e tuile al cioccolato e fragola.',
    es: 'Babá de cítricos empapado en almíbar de ron, gel de endrino y fresas silvestres. Helado de yogur y tuile de chocolate y fresa.',
    fr: 'Baba aux agrumes imbibé de sirop au rhum, gel de prunelle et fraises des bois. Crème glacée au yaourt et tuile chocolat-fraise.'
  },
  'Petit Fours': {
    it: 'Madeleine al miele e limone appena sfornate e macaron alla vaniglia con ganache al cioccolato bianco.',
    es: 'Magdalenas de miel y limón recién horneadas y macarrón de vainilla con ganache de chocolate blanco.',
    fr: 'Madeleine au miel et citron fraîchement sorties du four et macaron à la vanille avec ganache au chocolat blanc.'
  }
};

// Mapping of dish names to image file paths
const dishImages = {
  "Canapé Tartlet": [
    "images/tartlet.png",
    "images/tartlet2.webp"
  ],
  "Canapé Croustade": [
    "images/croustade2.webp",
    "images/croustade.png"
  ],
  "New Amuse-Bouche": [
    "images/AMUSE-BOUCHE.png",
    "images/AMUSE-BOUCHE-TARTE.WEBP"
  ],

  
  // Vegetarian dishes
  "Organic spelt": "images/ORGANIC SPELT.png",
  "Courgette": "images/courgette veg.webp",
  "Wye Valley Asparagus Tarte": "images/ASPARAGUS TARTE.png",
  "Artichoke": "images/artichoke veg.webp",
  
  // Starter meat dishes
  "Duck Leg terrine": [ 
    "images/Duck Leg terrine.png",
  ],
  
  // Fish dishes
  "Cured Salmon": "images/CURED SALMON.png",
  "Smoked Eel": [
    "images/SMOKED EEL2.webp",
    "images/SMOKED EEL.png"
  ],
  "Pumpkin Tart": [
    "images/PumpkinTartSept1.webp",
    "images/PumpkinTartSept2.webp"
  ],
  "Isle of Skye Scallops": [
    "images/ISLE OF SKYE SCALLOPS.png",
    "images/ISLE OF SKYE SCALLOPS 2.webp"
  ],
  "Lobster Raviolo": "images/LOBSTER RAVIOLO.png",
  "Monkfish": "images/MONKFISH.png",
  "New Monkfish": [
    "images/Monkfish0926.jpg",
    "images/Monkfish0926(2).jpg",
  ],
  /*
  "Confit Turbot": "images/CONFIT TURBOT 2.png",
  */
  "Confit Brill": [ // september
    "images/Turbot-Sept.webp",
    "images/Turbot-Sept2.webp"
  ],

  "Rack of Dover Sole": "images/DOVER SOLE.png",

  // Meat dishes
  "Duck & Asparagus Tarte": "images/DUCK AND ASPARAGUS TARTE.png",
  "Chicken Supreme": "images/CHICKEN SUPREME.png",
  "Chicken A la petit pois": [
    "images/Chicken A la petit pois.png",
    "images/chicken consomme.webp"
  ],
  "Sladesdown Chicken": [
    "images/BABY GEM1.webp",
    "images/BABY GEM2.webp"
  ],
  "Pig Trotter": [
    "images/PigTrotterSept1.webp",
    "images/PigTrotterSept2.webp"
  ],
  "Venison Saddle": [
    "images/VenisonSaddle1.webp",
    "images/VenisonSaddle2.webp"
  ],
  /*
  "100 Days Dry-Aged Blue Grey": [ // summer
    "images/BLUE GREY STRIP LOIN.png",
    "images/BLUE GREY STRIP LOIN2.webp"
  ],
  */
  "100 Days Dry-Aged Blue Grey": [ // september
    "images/BLUE-GREY-september.webp",
    "images/BLUE-GREY-september2.webp"
  ],
  "Rack of Herdwick Lamb": "images/RACK OF LAMB.png",
  // Cheese dishes
  "Brightwell Ash": [
    "images/BRIGHTWELL ASH.png",
    "images/Carmarthenshire, Wales.webp"
  ],
  "St Jude": [
    "images/ST JUDE.webp",
    "images/Suffolk, England.webp"
  ],
  "Comté": [
    "images/COMTE.webp",
    "images/FRANCHE-COMTÉ.webp"
  ],
  "RollRight": [
    "images/ROLLRIGHT.webp",
    "images/Oxfordshire, England.webp"
  ],
  "Cashel Blue": [
    "images/CASHEL BLUE.webp",
    "images/Tipperary, Ireland.webp"
  ],
  // New cheeses added to the cheese menu
  "Fleur De Chevre": [
    "images/FLEUR DE CHEVRE.png",
    "images/Poitou-Charentes, Western France.png"
  ],
  "Perail": [
    "images/PERAIL.webp",
    "images/Aveyron, Southern France.jpeg"
  ],
  "Bastide": [
    "images/la bastide.png",
    "images/larzac.png"
  ],
  "Abbaye De Citeaux": [
    "images/ABBAYE DE CITEAUX.webp",
    "images/Citeaux.jpeg"
  ],
  "Bleu De Basque": [
    "images/BLEU DE BASQUE.webp",
    "images/Macaye, France.png"
  ],
  // Pre-Dessert and Dessert dishes
  "Uva Fragola Sorbet": [
    "images/UvaFragolaPD.jpeg",
    "images/UvaFragolaPD2.jpeg"
  ],
  "Pre-Dessert Basil Sorbet": "images/PRE DESSERT P BASIL SORBET.png",
  "Pre-Dessert Rose Sorbet": "images/PRE DESSERT D ROSE SORBET.png",
  
  // Dessert dishes
  "Plaisir Sucré": "images/PLASIR SUCRE.png",
  "Black Forest Parfait": "images/VALRHONA CHOCOLATE SPHERE.png",
  "Dark Chocolate Soufflé": [ // with cherries
    "images/DARK CHOCOLATE SOUFFLE.png",
    "images/DARK CHOCOLATE SOUFFLE2.webp"
  ],
  "Clementine Soufflé": [ // with clementines
    "images/clementine suffle.webp",
    "images/clementine suffle2.webp"
  ],
  "Rum Baba": "images/RUM BABA.png",
  "Vacherin": [
    "images/Vacherin.jpeg",
    "images/Vacherin2.jpeg"
  ],

  // Petit Fours
  "Petit Fours": "images/PETIT FOURS MADELEINS MACAROONS.png"
};

// Menu definitions and which dishes are included in each menu
const menuDefinitions = [
  {
    id: 'a_la_carte',
    label: 'A la carte menu',
    description: 'A selection of our full a la carte dishes available as individual orders.'
  },
  {
    id: 'lunch',
    label: 'Lunch menu',
    description: 'A compact lunch menu with lighter dishes and one classic dessert.'
  },
  {
    id: 'prestige',
    label: 'Prestige menu',
    description: 'A longer tasting menu with multiple courses, including a pre-dessert and petit fours.'
  },
  {
    id: 'discovery',
    label: 'Discovery menu',
    description: 'A discovery tasting experience focused on seasonal seafood, pre-dessert and distinctive desserts.'
  },
  {
    id: 'cheese',
    label: 'Cheese menu',
    description: 'A focused menu for the cheese course and accompaniments.'
  },
  {
    id: 'new_dishes',
    label: 'New Dishes',
    description: 'Recently added dishes to feature once they have been included in this menu.'
  }
];

// Mapping of menu IDs to the dishes they include (by name)
const menuItems = {
  a_la_carte: [
    'Pumpkin Tart',
    'Isle of Skye Scallops',
    'Pig Trotter',
    'Lobster Raviolo',
    'New Monkfish',
    'Confit Turbot',
    'Rack of Herdwick Lamb',
    '100 Days Dry-Aged Blue Grey',
    'Plaisir Sucré',
    'Clementine Soufflé',
    'Vacherin',
  ],
  lunch: [
    'Pumpkin Tart',
    'Isle of Skye Scallops',
    'Chicken A la petit pois',
    'Uva Fragola Sorbet',
    'Black Forest Parfait',
  ],
  prestige: [
    'Pumpkin Tart',
    'Isle of Skye Scallops',
    'New Monkfish',
    'Rack of Herdwick Lamb',
    'Uva Fragola Sorbet',
    'Vacherin',
  ],
  discovery: [
    'Pig Trotter',
    'Lobster Raviolo',
    'Confit Turbot',
    '100 Days Dry-Aged Blue Grey',
    'Pre-Dessert Rose Sorbet',
    'Plaisir Sucré',
  ],
  cheese: [
    'Brightwell Ash',
    'St Jude',
    'Comté',
    'RollRight',
    'Cashel Blue',
    // New cheeses added to the cheese menu
    'Fleur De Chevre',
    'Perail',
    'Bastide',
    'Abbaye De Citeaux',
    'Bleu De Basque'
  ],
  new_dishes: [
    'Trotter',
    '100 Days Dry-Aged Blue Grey',
    'Croissant',
    'Pumpkin Tart',
    'Pig Trotter',
    'Amuse-Bouche',
    'Confit Brill',
    'Venison Saddle'
  ]
};

function getAvailableMenuDefinitions() {
  return menuDefinitions.filter(menu => {
    if (menu.id === 'new_dishes') {
      return (menuItems[menu.id] || []).length > 0;
    }
    return true;
  });
}

// Full list of menu definitions, including the "All dishes" option
const dishMenuDefinitions = [
  {
    id: 'all',
    label: 'All dishes',
    description: 'Every dish currently available in the Food Bible.'
  },
  ...getAvailableMenuDefinitions()
];

const menuWinePairings = {
  prestige: {
    'Sladesdown Chicken': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Isle of Skye Scallops': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Monkfish': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Rack of Herdwick Lamb': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Rum Baba': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
  },
  discovery: {
    'Smoked Eel': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Lobster Raviolo': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Confit Turbot': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    '100 Days Dry-Aged Blue Grey': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ],
    'Plaisir Sucré': [
      'Matching Wines: Wine pairing to be confirmed.',
      'Connoisseur: Wine pairing to be confirmed.',
      'Indulgence: Wine pairing to be confirmed.',
    ]
  }
};

// Initial selected menu
let selectedMenu = 'all';

// Utility function to get dish objects for a given menu ID
function getMenuDishes(menuId) {
  if (menuId === 'all') return dishes;
  const names = menuItems[menuId] || [];
  return names
    .map(name => dishes.find(d => d.name === name))
    .filter(Boolean);
}

function getWinePairing(menuId, dish) {
  if (!['prestige', 'discovery'].includes(menuId) || dish.course === 'Pre-Dessert') {
    return '';
  }

  return (menuWinePairings[menuId] || {})[dish.name] || '';
}

function renderWinePairingBlock(pairing) {
  const pairingItems = Array.isArray(pairing) ? pairing : [pairing];
  const rows = pairingItems
    .map(item => {
      if (!item) return '';

      if (typeof item === 'object') {
        const label = typeof item.label === 'string' ? item.label : '';
        const text = typeof item.text === 'string' ? item.text : '';
        if (!label && !text) return '';

        return `<div class="wine-pairing-row${label ? '' : ' wine-pairing-row--single'}">
          ${label ? `<div class="wine-pairing-label">${wrapGlossaryTerms(label)}</div>` : ''}
          <div class="wine-pairing-text">${wrapGlossaryTerms(text)}</div>
        </div>`;
      }

      const text = String(item);
      const splitIndex = text.indexOf(':');
      const hasLabel = splitIndex > -1;
      const label = hasLabel ? text.slice(0, splitIndex).trim() : '';
      const value = hasLabel ? text.slice(splitIndex + 1).trim() : text;

      return `<div class="wine-pairing-row${label ? '' : ' wine-pairing-row--single'}">
        ${label ? `<div class="wine-pairing-label">${wrapGlossaryTerms(label)}</div>` : ''}
        <div class="wine-pairing-text">${wrapGlossaryTerms(value)}</div>
      </div>`;
    })
    .filter(Boolean)
    .join('');

  return rows ? `
    <div class="wine-pairing-section">
      <div class="wine-pairing-title">Wine Pairing</div>
      ${rows}
    </div>` : '';
}

// Rendering functions (menu tabs, dish grid, and dish details)
function renderMenuTabs() {
  const availableMenus = [{
    id: 'all',
    label: 'All dishes',
    description: 'Every dish currently available in the Food Bible.'
  }, ...getAvailableMenuDefinitions()];

  if (!availableMenus.some(menu => menu.id === selectedMenu)) {
    selectedMenu = 'all';
  }

  const tabs = document.getElementById('menu-tabs');
  tabs.innerHTML = availableMenus.map(menu =>
    `<button class="menu-tab${menu.id === selectedMenu ? ' active' : ''}" onclick="selectMenu('${menu.id}')">${menu.label}</button>`
  ).join('');

  const summary = availableMenus.find(menu => menu.id === selectedMenu) || availableMenus[0];
  const selection = getMenuDishes(selectedMenu);
  const isCheeseMenu = selectedMenu === 'cheese';
  const countLabel = isCheeseMenu
    ? `${selection.length} cheese${selection.length === 1 ? '' : 's'} in the menu.`
    : `${selection.length} dish${selection.length === 1 ? '' : 'es'} ${selectedMenu === 'all' ? 'available.' : 'included in this menu.'}`;
  document.getElementById('menu-summary').innerHTML = `
    <div class="menu-summary__text">${summary.description}</div>
    <div class="menu-summary__count">${countLabel}</div>`;
}

// Handle menu selection and re-render dishes
function selectMenu(menuId) {
  selectedMenu = menuId;
  renderMenuTabs();
  renderDishes(menuId);
}

// Render dishes for the selected menu, grouped by course and with details
function renderDishes(menuId) {
  const grid = document.getElementById('dish-grid');
  grid.innerHTML = '';
  const menuDishes = getMenuDishes(menuId);
  const isAllDishes = menuId === 'all';
  const isCheeseMenu = menuId === 'cheese';

  if (!menuDishes.length) {
    grid.innerHTML = '<div class="menu-empty">No dishes are configured for this menu yet.</div>';
    return;
  }

  let sections = [];
  const isNewDishesMenu = menuId === 'new_dishes';
  if (isAllDishes) {
    menuDishes.forEach(dish => {
      let section = sections.find(item => item.title === dish.course);
      if (!section) {
        section = { title: dish.course, items: [], isCourseGroup: false };
        sections.push(section);
      }
      section.items.push(dish);
    });
  } else {
    // Group dishes into Canapés and main courses (which are numbered sequentially)
    const canapeSection = menuDishes.filter(d => d.course === 'Canapé'); // Always first
    const mainSection = menuDishes.filter(d => d.course !== 'Canapé'); // Main courses and desserts, numbered sequentially regardless of course name
    if (canapeSection.length && !isNewDishesMenu) sections.push({ title: 'Canapés', items: canapeSection, isCourseGroup: true }); // Canapés are always grouped together and not numbered individually
    if (mainSection.length) sections.push({ title: isCheeseMenu ? 'Cheese' : isNewDishesMenu ? '' : 'Menu courses', items: mainSection, isCourseGroup: false }); // All other courses are numbered sequentially regardless of their course name, so we set isCourseGroup to false and handle numbering in the rendering loop
  }

  // Calculate total courses for numbering (main courses + 1 if canapés exist, since they are considered a single course group)
  const totalCourses = isAllDishes ? 0 : menuDishes.filter(d => d.course !== 'Canapé').length + (menuDishes.some(d => d.course === 'Canapé') ? 1 : 0); // Total courses is the count of main courses plus one if there are canapés, since canapés are treated as a single course group
  let nextCourseNumber = 1; // Start numbering from 1 for the first course (which could be canapés if they exist, otherwise the first main course)
  let globalIndex = 0; // Global index for unique IDs across all dishes, regardless of section
  sections.forEach(section => {
    const sectionBlock = document.createElement('div');
    sectionBlock.className = 'menu-section';
    const showSectionHeader = !isNewDishesMenu && (section.title || section.items.length > 0);
    sectionBlock.innerHTML = `
      ${showSectionHeader ? `
        <div class="menu-section-header">
          <div class="menu-section-title">${section.title}</div>
          <div class="menu-section-count">${section.items.length} item${section.items.length === 1 ? '' : 's'}</div>
        </div>` : ''}
      `;

    section.items.forEach(d => {
      const i = globalIndex; // Capture the current global index for use in IDs and event handlers
      const courseNumber = isAllDishes ? 0 : section.isCourseGroup ? nextCourseNumber : nextCourseNumber++; // If this section is a course group (like canapés), use the same course number for all items, otherwise increment for each item
      const card = document.createElement('div'); // Create a card for each dish
      card.className = 'dish-card'; // Base class for styling
      const allergyItems = d.allergies.filter(a => !isNonAllergenTag(a));
      const nonAllergyTags = d.allergies.filter(a => isNonAllergenTag(a));
      const tags = allergyItems.map(a => `<span class="tag${getDietaryClass(a)}">${a}</span>`).join('');
      const extraTags = nonAllergyTags.map(a => `<span class="tag${getDietaryClass(a)}">${a}</span>`).join(''); // Allergen tags
      const cheeseInfo = getCheeseInfo(d);
      const pasteurisedBadge = getPasteurisedBadgeMarkup(cheeseInfo);
      const unpasteurisedBadge = getUnpasteurisedBadgeMarkup(cheeseInfo);
      const thermisedBadge = getThermisedBadgeMarkup(cheeseInfo);
      const vegetarianRennetBadge = getVegetarianRennetBadgeMarkup(cheeseInfo);
      const traditionalRennetBadge = getTraditionalRennetBadgeMarkup(cheeseInfo);
      const milkSource = cheeseInfo
        ? `<div class="milk-source"><span class="milk-source-part milk-source-part--milk"><img src="${cheeseInfo.icon}" alt="${cheeseInfo.milkType}" class="milk-source-icon"><span>${cheeseInfo.milkType}</span></span><span class="milk-source-divider">|</span><span class="milk-source-part milk-source-part--pasteurisation">${pasteurisedBadge}${unpasteurisedBadge}${thermisedBadge}<span>${cheeseInfo.pasteurisation}</span></span><span class="milk-source-divider">|</span><span class="milk-source-part milk-source-part--method">${traditionalRennetBadge}${vegetarianRennetBadge}<span>${cheeseInfo.method}</span></span></div>`
        : '';
      const setupTags = d.setup ? d.setup.map(s => `<span class="tag setup-tag">${s}</span>`).join('') : ''; // Setup tags (cutlery, plates)
      const winePairing = getWinePairing(menuId, d);
      const winePairingBlock = renderWinePairingBlock(winePairing);
      const knowledgeItems = Array.isArray(d.knowledge) ? d.knowledge.filter(k => k && typeof k === 'object') : [];
      const herbLeafSection = knowledgeItems.find(k => (k.title || '').toLowerCase() === 'herbs and leaves');
      const herbLeafTerms = herbLeafSection ? [...new Set(extractHerbLeafTerms(herbLeafSection.text || ''))] : [];
      const kbItems = knowledgeItems
        .filter(k => (k.title || '').toLowerCase() !== 'herbs and leaves')
        .map(k => {
          const title = typeof k.title === 'string' ? k.title : '';
          const text = typeof k.text === 'string' ? k.text : '';
          if (!title && !text) return '';
          const images = Array.isArray(k.images) ? k.images.filter(img => typeof img === 'string') : [];
          const imageHtml = images.length 
            ? `<div class="kb-images">${images.map(src => `<img src="images/${src}" alt="${title}" class="kb-image">`).join('')}</div>`
            : '';
          return `<div class="kb-item">
            <div class="kb-title">${wrapGlossaryTerms(title)}</div>
            <div class="kb-text">${wrapGlossaryTerms(text)}</div>
            ${imageHtml}
          </div>`;
        })
        .join(''); // Knowledge base items with glossary term highlighting
      const herbLeafBlock = herbLeafTerms.length ? `
        <div class="kb-ingredient-end">
          <div class="kb-ingredient-end__title">Herbs and leaves</div>
          <div class="kb-ingredient-list">
            ${herbLeafTerms.map(buildHerbLeafMarkup).join('')}
          </div>
        </div>` : '';
      const dishImageSource = dishImages[d.name] || d.image || '';
      const imageSources = Array.isArray(dishImageSource)
        ? dishImageSource.filter(Boolean)
        : dishImageSource
          ? [dishImageSource]
          : [];
      const imageBlock = imageSources.length
        ? `<div class="dish-images${imageSources.length > 1 ? ' dish-images--multi' : ''}">${imageSources.map(src => `<div class="dish-image"><img src="${src}" alt="${d.name}"></div>`).join('')}</div>`
        : '';

      // might be removed
      const courseBase = d.course.replace(/\s*—\s*Course\s*\d+/i, '').trim(); // Remove any existing course numbering from the course name to get the base course name for labeling
      const isNewDishesMenu = menuId === 'new_dishes';
      const courseLabel = isAllDishes || isCheeseMenu || isNewDishesMenu ? courseBase : `${courseBase}${courseBase ? ' — ' : ''}Course ${courseNumber} of ${totalCourses}`;

      // Build the dish card HTML with header (clickable to toggle details) and body (hidden by default, shown when toggled)
      card.innerHTML = `
        <div class="dish-header" onclick="toggleDish(${i})">
          ${imageBlock}
          <div class="dish-meta">
            <div class="course-label">${courseLabel}</div>
            <div class="dish-name">${d.name}</div>
            <div class="dish-desc">${getTranslatedDescription(d.name)}</div>
            ${milkSource}
            <div class="allergy-tags">${tags}</div>
            ${extraTags ? `<div class="allergy-tags allergy-tags--extra">${extraTags}</div>` : ''}
            ${setupTags ? `<div class="setup-tags">${setupTags}</div>` : ''}
          </div>
          <button class="dish-toggle" id="toggle-${i}" aria-label="Expand details">+</button>
        </div>
        <div class="dish-body" id="body-${i}">
          <div class="kb-section">${kbItems}${herbLeafBlock}${winePairingBlock}</div>
        </div>`;

      sectionBlock.appendChild(card);
      globalIndex += 1;
    });

    if (!isAllDishes && section.isCourseGroup) nextCourseNumber += 1;
    grid.appendChild(sectionBlock);
  });
}

// Toggle dish details visibility
function buildDishes() {
  renderMenuTabs();
  renderDishes(selectedMenu);
}

function normalizeQuizText(text) {
  return (text || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function takeSnippet(text, maxWords) {
  const words = normalizeQuizText(text).split(' ').filter(Boolean);
  return words.slice(0, maxWords).join(' ');
}

function shuffleList(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function buildQuizQuestion(correctAnswer, pool, questionText, explanation, maxOptions = 4) {
  const distractors = shuffleList(
    [...new Set((pool || []).filter(option => option && option !== correctAnswer))]
  ).slice(0, Math.max(0, maxOptions - 1));
  const shuffledOptions = shuffleList([correctAnswer, ...distractors]);
  return {
    q: questionText,
    opts: shuffledOptions,
    ans: shuffledOptions.indexOf(correctAnswer),
    exp: explanation
  };
}

function getFirstMeaningfulSetupItem(setupItems) {
  return Array.isArray(setupItems)
    ? setupItems.find(item => item && item !== 'No Set Up')
    : null;
}

function getPriorityKnowledgeItem(knowledgeItems) {
  if (!Array.isArray(knowledgeItems) || !knowledgeItems.length) {
    return null;
  }

  const priorities = [
    'Supplier',
    'Method',
    'Cooking method',
    'Cooking',
    'Sauce',
    'Main plate',
    'On the side',
    'Garnish',
    'Herbs and leaves',
    'Vegetables Side',
    'Other elements',
    'Texture',
    'Taste',
    'Origin'
  ];

  for (const label of priorities) {
    const matched = knowledgeItems.find(item => item && item.title && item.text && item.title.toLowerCase().includes(label.toLowerCase()));
    if (matched) {
      return matched;
    }
  }

  return knowledgeItems.find(item => item && item.title && item.text) || null;
}

function buildAutoMultipleChoiceQuiz(menuId) {
  const menuDishes = getQuizMenuDishes(menuId);
  const allDishes = [...new Set(dishes.map(dish => dish.name).filter(Boolean))];
  const allCourses = [...new Set(dishes.map(dish => dish.course).filter(Boolean))];
  const allSetupItems = [...new Set(dishes.flatMap(dish => Array.isArray(dish.setup) ? dish.setup : []).filter(item => item && item !== 'No Set Up'))];
  const allAllergens = [...new Set(dishes.flatMap(dish => Array.isArray(dish.allergies) ? dish.allergies : []).filter(Boolean))];
  const allKnowledgeTitles = [...new Set(dishes.flatMap(dish => Array.isArray(dish.knowledge) ? dish.knowledge : [])
    .map(item => item && item.title)
    .filter(Boolean))];
  const questions = [];

  menuDishes.forEach(dish => {
    const allergens = Array.isArray(dish.allergies) ? dish.allergies.filter(a => a && !isNonAllergenTag(a)) : [];
    const nonAllergenTags = Array.isArray(dish.allergies) ? dish.allergies.filter(a => a && isNonAllergenTag(a)) : [];
    const allergenList = allergens.join(', ');

    if (allergens.length) {
      // Q1: name a specific allergen present in the dish
      const pickedAllergen = shuffleList(allergens)[0];
      questions.push(buildQuizQuestion(
        pickedAllergen,
        allAllergens.filter(item => item !== pickedAllergen),
        `Which allergen is present in ${dish.name}?`,
        `${pickedAllergen} is listed for ${dish.name}.`
      ));

      // Q2: identify the dish by its allergen list
      if (allergens.length >= 2) {
        const otherDishes = menuDishes
          .filter(other => other.name !== dish.name && Array.isArray(other.allergies))
          .map(other => other.name);
        questions.push(buildQuizQuestion(
          dish.name,
          otherDishes,
          `Which dish contains all of these allergens: ${allergenList}?`,
          `${dish.name} contains: ${allergenList}.`
        ));
      }

      // Q3: "does this dish contain X?" — pick an allergen NOT in the dish as the trap
      const absentAllergens = allAllergens.filter(a => !allergens.includes(a));
      if (absentAllergens.length && allergens.length >= 2) {
        const trap = shuffleList(absentAllergens)[0];
        const correctAnswer = 'No';
        questions.push(buildQuizQuestion(
          correctAnswer,
          ['Yes'],
          `Does ${dish.name} contain ${trap}?`,
          `${dish.name} does NOT contain ${trap}. It contains: ${allergenList}.`
        ));
      }

      // Q4: how many allergens does this dish have?
      const countStr = String(allergens.length);
      const nearCounts = ['1','2','3','4','5','6','7','8'].filter(n => n !== countStr);
      questions.push(buildQuizQuestion(
        countStr,
        nearCounts,
        `How many allergens are listed for ${dish.name}?`,
        `${dish.name} has ${allergens.length}: ${allergenList}.`
      ));
    }

    // Pasteurisation question for cheeses / dishes with that tag
    if (nonAllergenTags.length) {
      const pastTag = nonAllergenTags.find(t => /pasteurised/i.test(t));
      if (pastTag) {
        questions.push(buildQuizQuestion(
          pastTag,
          ['Pasteurised', 'Unpasteurised', 'Thermised'].filter(t => t !== pastTag),
          `Is ${dish.name} pasteurised or unpasteurised?`,
          `${dish.name} is ${pastTag}.`
        ));
      }
    }

    const setupItem = getFirstMeaningfulSetupItem(dish.setup);
    if (setupItem) {
      questions.push(buildQuizQuestion(
        setupItem,
        allSetupItems.filter(item => item !== setupItem),
        `Which setup item is listed for ${dish.name}?`,
        `${setupItem} is listed for ${dish.name}.`
      ));
    }

    const knowledgeItem = getPriorityKnowledgeItem(dish.knowledge);
    if (knowledgeItem) {
      const knowledgeSnippet = takeSnippet(knowledgeItem.text, 12);
      if (knowledgeSnippet) {
        questions.push(buildQuizQuestion(
          knowledgeItem.title,
          allKnowledgeTitles.filter(title => title !== knowledgeItem.title),
          `Which note matches this detail from ${dish.name}: "${knowledgeSnippet}${knowledgeSnippet.endsWith('.') ? '' : '...'}"?`,
          `${knowledgeItem.title} is one of the notes for ${dish.name}.`
        ));
      }
    }

    if (dish.course) {
      questions.push(buildQuizQuestion(
        dish.course,
        allCourses.filter(course => course !== dish.course),
        `Which course does ${dish.name} belong to?`,
        `${dish.name} is in the ${dish.course} course.`
      ));
    }

    const descriptionSnippet = takeSnippet(dish.desc, 14);
    if (descriptionSnippet) {
      questions.push(buildQuizQuestion(
        dish.name,
        allDishes.filter(name => name !== dish.name),
        `Which dish matches this description: "${descriptionSnippet}${descriptionSnippet.endsWith('.') ? '' : '...'}"?`,
        `The description belongs to ${dish.name}.`
      ));
    }
  });

  return questions;
}

const quizMenuDefinitions = [
  ...getAvailableMenuDefinitions(),
  {
    id: 'all_menus',
    label: 'All menus',
    description: 'Questions covering all dishes across all menus.'
  }
];

// Quiz state variables
let selectedQuizMenu = 'a_la_carte'; // Default to a_la_carte quiz
const quizModes = [
  { id: 'multiple_choice', label: 'Multiple choice' },
  { id: 'fill_words', label: 'Fill in words' },
  { id: 'picture_desc', label: 'Picture description' }
];
let selectedQuizMode = 'multiple_choice';
let currentQuiz = []; // Will hold the current quiz questions based on selected menu

// Toggle dish details visibility when header is clicked
function toggleDish(i) {
  const body = document.getElementById('body-' + i);
  const btn = document.getElementById('toggle-' + i);
  const open = body.classList.toggle('open');
  btn.textContent = open ? '−' : '+';
}

function getDietaryClass(label) {
  const trimmed = (label || '').trim();
  if (/^(vegetarian|vegan)$/i.test(trimmed)) return ' dietary-tag';
  if (/^pasteurised$/i.test(trimmed)) return ' pasteurised-tag';
  return '';
}

function isNonAllergenTag(label) {
  return /^(vegetarian|vegan|pasteurised|unpasteurised|thermised)$/i.test((label || '').trim());
}

const cheeseInfoByName = {
  'Brightwell Ash': { milkType: "Goat", pasteurisation: 'Unpasteurised', method: 'Traditional rennet', icon: 'images/goat-milk.svg' },
  'St Jude': { milkType: "Cow", pasteurisation: 'Unpasteurised', method: 'Traditional rennet', icon: 'images/cow-milk.svg' },
  'Comté': { milkType: "Cow", pasteurisation: 'Unpasteurised', method: 'Traditional rennet', icon: 'images/cow-milk.svg' },
  'RollRight': { milkType: "Cow", pasteurisation: 'Unpasteurised', method: 'Traditional rennet', icon: 'images/cow-milk.svg' },
  'Cashel Blue': { milkType: "Cow", pasteurisation: 'Pasteurised', method: 'Vegetarian rennet', icon: 'images/cow-milk.svg' },
  'Fleur De Chevre': { milkType: "Goat", pasteurisation: 'Unpasteurised', method: 'Traditional rennet', icon: 'images/goat-milk.svg' },
  'Perail': { milkType: "Ewe", pasteurisation: 'Thermised', method: 'Vegetarian rennet', icon: 'images/sheep-milk.svg' },
  'Bastide': { milkType: "Ewe", pasteurisation: 'Thermised', method: 'Traditional rennet', icon: 'images/sheep-milk.svg' },
  'Abbaye De Citeaux': { milkType: "Cow", pasteurisation: 'Pasteurised', method: 'Traditional rennet', icon: 'images/cow-milk.svg' },
  'Bleu De Basque': { milkType: "Ewe", pasteurisation: 'Pasteurised', method: 'Traditional rennet', icon: 'images/sheep-milk.svg' }
};

function getCheeseInfo(dish) {
  if (!dish || dish.course !== 'Cheese') {
    return null;
  }

  return cheeseInfoByName[dish.name] || null;
}

function getPasteurisedBadgeMarkup(cheeseInfo) {
  return cheeseInfo && cheeseInfo.pasteurisation === 'Pasteurised'
    ? '<img src="images/pasteurised-badge.svg" alt="Pasteurised" class="pasteurised-badge-icon">'
    : '';
}

function getUnpasteurisedBadgeMarkup(cheeseInfo) {
  return cheeseInfo && cheeseInfo.pasteurisation === 'Unpasteurised'
    ? '<img src="images/unpasteurised-badge.svg" alt="Unpasteurised" class="pasteurised-badge-icon">'
    : '';
}

function getThermisedBadgeMarkup(cheeseInfo) {
  return cheeseInfo && cheeseInfo.pasteurisation === 'Thermised'
    ? '<img src="images/thermised-badge.svg" alt="Thermised" class="pasteurised-badge-icon">'
    : '';
}

function getVegetarianRennetBadgeMarkup(cheeseInfo) {
  return cheeseInfo && /vegetarian rennet/i.test(cheeseInfo.method || '')
    ? '<img src="images/vegetarian-rennet-badge.svg" alt="Vegetarian rennet" class="pasteurised-badge-icon">'
    : '';
}
function getTraditionalRennetBadgeMarkup(cheeseInfo) {
  return cheeseInfo && /traditional rennet/i.test(cheeseInfo.method || '')
    ? '<img src="images/traditional-rennet-badge.svg" alt="Traditional rennet" class="traditional-rennet-badge-icon">'
    : '';
}

/* ── RENDER ALLERGIES ── */
function buildAllergies() {
  const tbody = document.getElementById('allergy-tbody');
  dishes.forEach(d => {
    const tr = document.createElement('tr');
    const allergyItems = d.allergies.filter(a => !isNonAllergenTag(a));
    const nonAllergyTags = d.allergies.filter(a => isNonAllergenTag(a));
    const chips = allergyItems.map(a => `<span class="chip${getDietaryClass(a)}">${a}</span>`).join('');
    const extraChips = nonAllergyTags.map(a => `<span class="chip${getDietaryClass(a)}">${a}</span>`).join('');
    const cheeseInfo = getCheeseInfo(d);
    const pasteurisedBadge = getPasteurisedBadgeMarkup(cheeseInfo);
    const unpasteurisedBadge = getUnpasteurisedBadgeMarkup(cheeseInfo);
    const thermisedBadge = getThermisedBadgeMarkup(cheeseInfo);
    const vegetarianRennetBadge = getVegetarianRennetBadgeMarkup(cheeseInfo);
    const traditionalRennetBadge = getTraditionalRennetBadgeMarkup(cheeseInfo);
    const milkLine = cheeseInfo
      ? `<div class="milk-source"><span class="milk-source-part milk-source-part--milk"><img src="${cheeseInfo.icon}" alt="${cheeseInfo.milkType}" class="milk-source-icon"><span>${cheeseInfo.milkType}</span></span><span class="milk-source-divider">|</span><span class="milk-source-part milk-source-part--pasteurisation">${pasteurisedBadge}${unpasteurisedBadge}${thermisedBadge}<span>${cheeseInfo.pasteurisation}</span></span><span class="milk-source-divider">|</span><span class="milk-source-part milk-source-part--method">${traditionalRennetBadge}${vegetarianRennetBadge}<span>${cheeseInfo.method}</span></span></div>`
      : '';
    tr.innerHTML = `<td class="dish-col">${d.name}</td><td>${milkLine}<div class="allergen-chips">${chips}</div>${extraChips ? `<div class="allergen-chips allergen-chips--extra">${extraChips}</div>` : ''}</td>`;
    tbody.appendChild(tr);
  });
}

/* ── NAVIGATION ── */
function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (btn) btn.classList.add('active');
  closeMenu();
  window.scrollTo(0, 0);
}

function toggleMenu() {
  const nav = document.querySelector('.nav-menu');
  const button = document.querySelector('.nav-toggle');
  const open = nav.classList.toggle('open');
  button.classList.toggle('open', open);
  button.setAttribute('aria-expanded', open);
}

function closeMenu() {
  const nav = document.querySelector('.nav-menu');
  const button = document.querySelector('.nav-toggle');
  if (nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    button.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }
}

function toggleLanguageMenu() {
  const menu = document.getElementById('language-menu');
  const button = document.querySelector('.language-toggle');
  const open = menu.classList.toggle('open');
  button.setAttribute('aria-expanded', open);
  if (open) {
    closeMenu();
  }
}

function closeLanguageMenu() {
  const menu = document.getElementById('language-menu');
  const button = document.querySelector('.language-toggle');
  if (menu && menu.classList.contains('open')) {
    menu.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }
}

function syncLanguageButtons(lang) {
  document.querySelectorAll('.nav-lang-btn, .language-menu-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const desktopBtn = document.getElementById('lang-btn-' + lang);
  const mobileBtn = document.getElementById('mobile-lang-btn-' + lang);
  if (desktopBtn) desktopBtn.classList.add('active');
  if (mobileBtn) mobileBtn.classList.add('active');
}

function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  const button = document.getElementById('theme-toggle');
  if (button) {
    const isLight = nextTheme === 'light';
    const targetTheme = isLight ? 'dark' : 'light';
    const icon = button.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = isLight ? '☾' : '☀';
    button.setAttribute('aria-label', `Switch to ${targetTheme} mode`);
    button.setAttribute('title', `Switch to ${targetTheme} mode`);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  try {
    localStorage.setItem('petrus-theme', nextTheme);
  } catch (error) {
    // Theme still changes for the current session if storage is unavailable.
  }
  applyTheme(nextTheme);
}

function getSavedTheme() {
  try {
    return localStorage.getItem('petrus-theme') || 'dark';
  } catch (error) {
    return 'dark';
  }
}

// Utility function to show a page by name, used in navigation buttons
function showPageByName(name) {
  const btns = document.querySelectorAll('.nav-btn');
  const map = { home: 0, dishes: 1, allergies: 2, suppliers: 3, quiz: 4 };
  showPage(name, btns[map[name]]);
}

/* ── QUIZ ── */
let qIndex = 0, qScore = 0, qAnswered = false, qShuffled = [], qLog = [];

function renderQuizModeTabs() {
  const tabs = document.getElementById('quiz-mode-tabs');
  tabs.innerHTML = quizModes.map(mode =>
    `<button class="menu-tab${mode.id === selectedQuizMode ? ' active' : ''}" onclick="selectQuizMode('${mode.id}')">${mode.label}</button>`
  ).join('');
}

function getQuizMenuDishes(menuId) {
  return menuId === 'all_menus' ? getMenuDishes('all') : getMenuDishes(menuId);
}

function buildDishCoverageQuestions(menuId) {
  const menuDishes = getQuizMenuDishes(menuId);
  const allCourses = [...new Set(dishes.map(item => item.course).filter(Boolean))];

  return menuDishes.map(dish => {
    const correctCourse = dish.course;
    const options = [correctCourse];

    for (const course of allCourses) {
      if (course !== correctCourse && options.length < 4) {
        options.push(course);
      }
    }

    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

    return {
      q: `${dish.name} belongs to which course?`,
      opts: shuffledOptions,
      ans: shuffledOptions.indexOf(correctCourse),
      exp: `${dish.name} is in the ${correctCourse} course.`
    };
  });
}

function getMultipleChoiceQuiz(menuId) {
  return buildAutoMultipleChoiceQuiz(menuId);
}

function renderQuizMenuTabs() {
  const availableQuizMenus = [...getAvailableMenuDefinitions(), {
    id: 'all_menus',
    label: 'All menus',
    description: 'Questions covering all dishes across all menus.'
  }];

  if (!availableQuizMenus.some(menu => menu.id === selectedQuizMenu)) {
    selectedQuizMenu = 'a_la_carte';
  }

  const tabs = document.getElementById('quiz-menu-tabs');
  tabs.innerHTML = availableQuizMenus.map(menu =>
    `<button class="menu-tab${menu.id === selectedQuizMenu ? ' active' : ''}" onclick="selectQuizMenu('${menu.id}')">${menu.label}</button>`
  ).join('');
  renderQuizStartInfo();
}

function renderQuizStartInfo() {
  const selected = quizMenuDefinitions.find(menu => menu.id === selectedQuizMenu);
  const pictureQuestions = buildPictureDescriptionQuiz(selectedQuizMenu);
  const count = selectedQuizMode === 'fill_words'
    ? Object.keys(glossary).length
    : selectedQuizMode === 'picture_desc'
      ? pictureQuestions.length
      : getMultipleChoiceQuiz(selectedQuizMenu).length;

  const subtitles = {
    multiple_choice: `${selected.label} quiz, auto-generated from the current dishes`,
    fill_words: 'Practice key culinary terms with fill-in-the-word questions.',
    picture_desc: 'Look at the dish photo, write the description, then check it against the Food Bible.'
  };

  const meta = {
    multiple_choice: `${count} automatically generated questions from the current dishes.`,
    fill_words: `${count} glossary words to practice.`,
    picture_desc: `${count} pictured dishes in this menu quiz.`
  };

  document.getElementById('quiz-start-sub').textContent = subtitles[selectedQuizMode];
  document.getElementById('quiz-start-meta').textContent = meta[selectedQuizMode];
}

function selectQuizMenu(menuId) {
  selectedQuizMenu = menuId;
  renderQuizMenuTabs();
}

function selectQuizMode(modeId) {
  selectedQuizMode = modeId;
  renderQuizModeTabs();
  renderQuizStartInfo();
}

function buildPictureDescriptionQuiz(menuId) {
  return getQuizMenuDishes(menuId)
    .filter(dish => dish.desc && dish.desc.toLowerCase() !== 'to be confirmed')
    .map(dish => ({
      type: 'picture_desc',
      q: 'Write the Food Bible description for this dish:',
      dishName: dish.name,
      image: dishImages[dish.name] || '',
      ans: dish.desc
    }));
}

function startQuiz() {
  if (selectedQuizMode === 'fill_words') {
    currentQuiz = Object.entries(glossary).map(([term, def]) => ({
      type: 'word',
      q: 'Enter the word matching this definition:',
      prompt: def,
      ans: term
    }));
  } else if (selectedQuizMode === 'picture_desc') {
    currentQuiz = buildPictureDescriptionQuiz(selectedQuizMenu);
  } else {
    currentQuiz = getMultipleChoiceQuiz(selectedQuizMenu);
  }
  qShuffled = selectedQuizMode === 'picture_desc'
    ? [...currentQuiz]
    : [...currentQuiz].sort(() => Math.random() - 0.5);
  qIndex = 0; qScore = 0; qAnswered = false; qLog = [];
  document.getElementById('quiz-start').style.display = 'none';
  document.getElementById('quiz-end').style.display = 'none';
  document.getElementById('quiz-main').style.display = 'block';
  renderQ();
}

function renderQ() {
  const q = qShuffled[qIndex];
  const pct = qShuffled.length ? Math.round((qIndex / qShuffled.length) * 100) : 0;
  const selected = quizMenuDefinitions.find(menu => menu.id === selectedQuizMenu);
  const menuTitle = document.getElementById('quiz-menu-title');
  document.getElementById('q-counter').textContent = `${qIndex + 1} / ${qShuffled.length}`;
  document.getElementById('q-score').textContent = `${qScore} pts`;
  document.getElementById('progress-fill').style.width = pct + '%';
  menuTitle.textContent = q.type === 'picture_desc' && selected ? selected.label : '';
  menuTitle.style.display = q.type === 'picture_desc' ? 'block' : 'none';
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('feedback-box').className = 'feedback-box';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('next-btn').disabled = false;
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.style.display = 'none';
  submitBtn.disabled = false;
  qAnswered = false;

  const opts = document.getElementById('options');
  opts.innerHTML = '';

  if (q.type === 'word') {
    opts.innerHTML = `
      <div class="word-prompt">${q.prompt}</div>
      <input id="word-answer" class="word-input" type="text" placeholder="Type your answer" autocomplete="off" onkeydown="if(event.key==='Enter') submitWordAnswer()">
    `;
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('word-answer').focus();
    return;
  }

  if (q.type === 'picture_desc') {
    const imageMarkup = q.image
      ? `<img src="${q.image}" alt="${q.dishName}" onerror="showPictureFallback(this)">`
      : `<div class="picture-fallback-title">${q.dishName}</div>`;

    opts.innerHTML = `
      <div class="picture-question${q.image ? '' : ' picture-question--fallback'}">
        ${imageMarkup}
      </div>
      <textarea id="word-answer" class="word-input desc-input" placeholder="Write the dish description" autocomplete="off"></textarea>
    `;
    document.getElementById('submit-btn').style.display = 'inline-block';
    document.getElementById('word-answer').focus();
    return;
  }

  q.opts.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'option-btn';
    b.textContent = o;
    b.onclick = () => selectAnswer(i);
    opts.appendChild(b);
  });
}

function showPictureFallback(img) {
  const wrap = img.closest('.picture-question');
  if (!wrap) return;
  wrap.classList.add('picture-question--fallback');
  wrap.innerHTML = `<div class="picture-fallback-title">${img.alt}</div>`;
}

function submitWordAnswer() {
  if (qAnswered) return;
  const q = qShuffled[qIndex];
  const input = document.getElementById('word-answer');
  if (!input) return;
  const chosenText = input.value.trim();
  if (!chosenText) return;

  qAnswered = true;
  input.disabled = true;
  document.getElementById('submit-btn').disabled = true;

  if (q.type === 'picture_desc') {
    const fb = document.getElementById('feedback-box');
    fb.innerHTML = `
      <div class="desc-feedback-title">${q.dishName}</div>
      <div class="desc-feedback-label">Your answer</div>
      <div class="desc-feedback-text">${escapeHtml(chosenText)}</div>
      <div class="desc-feedback-label">Food Bible description</div>
      <div class="desc-feedback-text">${q.ans}</div>
      <div class="self-mark-actions">
        <button class="btn-ghost" onclick="markDescriptionAnswer(false)">Missed it</button>
        <button class="btn-primary" onclick="markDescriptionAnswer(true)">I got it</button>
      </div>
    `;
    fb.className = 'feedback-box show-correct desc-feedback';
    qLog.push({ question: q.dishName, chosen: chosenText, correct: q.ans, ok: false, pendingSelfMark: true });
    return;
  }

  const correct = chosenText.toLowerCase() === q.ans.toLowerCase();
  if (correct) qScore++;

  const fb = document.getElementById('feedback-box');
  fb.textContent = correct
    ? `✓ ${q.ans} is correct.`
    : `✗ The correct answer is ${q.ans}.`;
  fb.className = 'feedback-box ' + (correct ? 'show-correct' : 'show-wrong');
  document.getElementById('next-btn').style.display = 'inline-block';

  qLog.push({ question: q.q, chosen: chosenText, correct: q.ans, ok: correct });
}

function markDescriptionAnswer(ok) {
  if (!qAnswered) return;
  const lastLog = qLog[qLog.length - 1];
  if (!lastLog || !lastLog.pendingSelfMark) return;

  lastLog.ok = ok;
  lastLog.pendingSelfMark = false;
  if (ok) qScore++;

  document.getElementById('q-score').textContent = `${qScore} pts`;
  document.getElementById('feedback-box').className = 'feedback-box ' + (ok ? 'show-correct' : 'show-wrong') + ' desc-feedback';
  document.querySelectorAll('.self-mark-actions button').forEach(btn => btn.disabled = true);
  document.getElementById('next-btn').style.display = 'inline-block';
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[char]));
}

function selectAnswer(chosen) {
  if (qAnswered) return;
  qAnswered = true;
  const q = qShuffled[qIndex];
  const btns = document.querySelectorAll('.option-btn');
  const correct = chosen === q.ans;
  if (correct) qScore++;
  btns[q.ans].classList.add('correct');
  if (!correct) btns[chosen].classList.add('wrong');
  btns.forEach(b => b.disabled = true);

  const fb = document.getElementById('feedback-box');
  fb.textContent = (correct ? '✓  ' : '✗  ') + q.exp;
  fb.className = 'feedback-box ' + (correct ? 'show-correct' : 'show-wrong');
  document.getElementById('next-btn').style.display = 'inline-block';

  qLog.push({ question: q.q, chosen: q.opts[chosen], correct: q.opts[q.ans], ok: correct });
}

function nextQ() {
  qIndex++;
  if (qIndex >= qShuffled.length) {
    showResults();
  } else {
    renderQ();
  }
}

function showResults() {
  document.getElementById('quiz-main').style.display = 'none';
  document.getElementById('quiz-end').style.display = 'block';
  document.getElementById('review-section').style.display = 'none';
  document.getElementById('final-score').textContent = qScore;
  document.getElementById('final-total').textContent = qShuffled.length;
  const msgs = [
    'Keep studying the Food Bible — review the dishes section and try again.',
    'A good start. Focus on allergens and supplier knowledge.',
    'Solid foundation. A few more sessions and you will have it.',
    'Very good. Nearly there — check the questions you missed.',
    'Outstanding — you know this menu inside out.'
  ];
  const pct = qShuffled.length ? qScore / qShuffled.length : 0;
  const idx = pct < 0.4 ? 0 : pct < 0.6 ? 1 : pct < 0.75 ? 2 : pct < 0.9 ? 3 : 4;
  document.getElementById('score-msg').textContent = msgs[idx];
}

function reviewQuiz() {
  const sec = document.getElementById('review-section');
  sec.style.display = 'block';
  sec.innerHTML = qLog.map((l, i) => `
    <div style="background:var(--surface);border:0.5px solid ${l.ok ? 'rgba(45,106,63,0.4)' : 'rgba(139,32,32,0.4)'};border-radius:var(--radius-lg);padding:1rem 1.25rem;margin-bottom:10px">
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:6px">Question ${i+1}</div>
      <div style="font-family:var(--font-display);font-size:17px;color:var(--text);margin-bottom:8px">${l.question}</div>
      <div style="font-size:13px;color:${l.ok ? '#7CC994' : '#E07070'}">Your answer: ${l.chosen}</div>
      ${!l.ok ? `<div style="font-size:13px;color:#7CC994">Correct answer: ${l.correct}</div>` : ''}
    </div>`).join('');
  sec.scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
  document.getElementById('quiz-end').style.display = 'none';
  document.getElementById('quiz-start').style.display = 'block';
}

/* ── LANGUAGE SWITCHER ── */
let currentLanguage = 'en';

function getSavedLanguage() {
  try {
    return localStorage.getItem('petrus-language') || 'en';
  } catch (error) {
    return 'en';
  }
}

function getTranslatedDescription(dishName) {
  if (currentLanguage === 'en') {
    const dish = dishes.find(d => d.name === dishName);
    return dish ? dish.desc : '';
  }
  const translations = dishDescriptionTranslations[dishName];
  if (translations && translations[currentLanguage]) {
    return translations[currentLanguage];
  }
  // Fallback to English if translation doesn't exist
  const dish = dishes.find(d => d.name === dishName);
  return dish ? dish.desc : '';
}

function selectLanguage(lang) {
  currentLanguage = lang;
  try {
    localStorage.setItem('petrus-language', lang);
  } catch (error) {
    // Language preference can't be saved, but it's still set for this session
  }
  syncLanguageButtons(lang);
  // Re-render all dish descriptions with the new language
  buildDishes();
}

function initLanguage() {
  currentLanguage = getSavedLanguage();
  syncLanguageButtons(currentLanguage);
}

/* ── INIT ── */
initLanguage();
applyTheme(getSavedTheme());
buildDishes(); // Initial render of dishes for the default selected menu
buildAllergies(); // Build the allergies table
renderQuizModeTabs();
renderQuizMenuTabs(); // Render quiz menu tabs and initial quiz info
