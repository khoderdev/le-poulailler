export interface MenuItem {
  id: string;
  name: string;
  price: number | string;
  description?: string;
  comingSoon?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuState {
  shopMenu: MenuCategory[];
  restaurantMenu: MenuCategory[];
  activeShopCategory: string;
  activeRestaurantCategory: string;
}

export const shopMenuData: MenuCategory[] = [
  {
    id: "fresh-chicken",
    name: "Fresh Chicken",
    items: [
      { id: "fc-1", name: "Whole Chicken /kg", price: 23 },
      { id: "fc-2", name: "Chicken Breast Bone-In/kg", price: 49 },
      { id: "fc-3", name: "Chicken Leg Bone-In/kg", price: 32 },
      { id: "fc-4", name: "Chicken ThighBone-In/kg", price: 30 },
      { id: "fc-5", name: "Drum Sticks Bone-In/kg", price: 33 },
      { id: "fc-6", name: "Chicken Wings Bone-In/kg", price: 24 },
      { id: "fc-7", name: "Chicken Breast Boneless /kg", price: 56 },
      { id: "fc-8", name: "Chicken Legs Boneless/kg", price: 52 },
      { id: "fc-9", name: "Whole Chicken Boneless /kg", price: 52 },
      { id: "fc-10", name: "Chicken Liver/kg", price: 25 },
      { id: "fc-11", name: "Chicken Gizzard", price: 25 },
      { id: "fc-12", name: "Chicken Heart", price: 25 },
      { id: "fc-13", name: "Minced Chicken", price: 55 },
    ],
  },
  {
    id: "chilled-items",
    name: "Chilled Items",
    items: [
      { id: "ci-1", name: "Chicken Fajita /kg", price: 56 },
      { id: "ci-2", name: "Chicken Francisco /kg", price: 56 },
      { id: "ci-3", name: "Shish Taouk /Kg (White Or Red)", price: 56 },
      { id: "ci-4", name: "Chicken Breast Marinated /Kg", price: 56 },
      { id: "ci-5", name: "Wings /kg (BBQ/BUFFALO/PROVENCIA)", price: 30 },
      { id: "ci-6", name: "Chicken Kebab /Kg", price: 59 },
      { id: "ci-7", name: "Whole Chicken Marinated /Piece", price: 36 },
      { id: "ci-8", name: "Arayes Chicken /Kg", price: 51 },
    ],
  },
  {
    id: "frozen-items",
    name: "Frozen Items",
    items: [
      { id: "fi-1", name: "Chicken Kiev /kg", price: 78 },
      { id: "fi-2", name: "Chicken Crispy Fillet /kg", price: 64 },
      { id: "fi-3", name: "Chicken Cordon Bleu /kg", price: 95 },
      { id: "fi-4", name: "Chicken Escalope /kg", price: 64 },
      { id: "fi-5", name: "Chicken Burger /kg", price: 52 },
      { id: "fi-6", name: "Chicken Makanek /kg", price: 52 },
      { id: "fi-7", name: "Chicken Sojouk /kg", price: 52 },
      { id: "fi-8", name: "Cheese Rolls /pcs", price: 4 },
      { id: "fi-9", name: "Kebbeh Chicken /pcs", price: 4 },
      { id: "fi-10", name: "Spinash Fatayer", price: 4 },
    ],
  },
];

export const restaurantMenuData: MenuCategory[] = [
  {
    id: "soup",
    name: "Soup",
    items: [
      {
        id: "soup-1",
        name: "Lentil Soup شوربة عدس",
        price: 16,
        description:
          "Pureed lentil soup served with fresh lemon wedges and crispy bread",
      },
      {
        id: "soup-2",
        name: "Shorbet Adas Bel Hamod شوربة عدس بالحامض",
        price: 16,
        description:
          "Whole green lentils with potato cubes, chards and fresh lemon juice",
      },
    ],
  },
  {
    id: "daily-dish",
    name: "Daily Dish",
    items: [
      {
        id: "dd-1",
        name: "Rice with Chicken رز على دجاج",
        price: "45/55",
        description:
          "Chicken served with spiced rice, demi glace sauce and fresh yogurt",
      },
      {
        id: "dd-2",
        name: "Kebbeh Bel Laban (Chicken) كبه بالبن",
        price: "45/55",
        description:
          "Chicken kebbeh cooked and dipped in our special boiled yogurt served with white rice",
      },
    ],
  },
  {
    id: "cold-mezza",
    name: "Cold Mezza",
    items: [
      {
        id: "cm-1",
        name: "Hommos حمّص",
        price: 26,
        description:
          "Pureed chickpeas blended with tahini sauce, and drizzled with virgin olive oil",
      },
      {
        id: "cm-2",
        name: "Hommos with Pine Nuts حمّص بالصنوبر",
        price: 31,
        description:
          "Pureed chickpeas blended with tahini sauce, and topped with roasted pine seeds and virgin olive oil",
      },
      {
        id: "cm-3",
        name: "Moutabal متبّل",
        price: 26,
        description:
          "Chargrilled eggplants blended with tahini sauce and drizzled with virgin olive oil",
      },
      {
        id: "cm-4",
        name: "Vine Leaves ورق عنب",
        price: 30,
        description:
          "Stuffed vine leaves with rice, parsley, tomatoes, onions drizzled with pomegranate molasses, fresh lemon juice, and virgin olive oil",
      },
      {
        id: "cm-5",
        name: "Hindbeh هندبه",
        price: 27,
        description:
          "Cooked chicory leaves, garlic, onions with fresh lemon juice and virgin olive oil",
      },
      {
        id: "cm-6",
        name: "Mouhammara محّمره",
        price: 27,
        description:
          "Bread crumbs, walnuts, and red chilli blended with tahini sauce, pomegranate molasses, and virgin olive oil",
      },
      {
        id: "cm-7",
        name: "Grilled Eggplant with Garlic باذنجان بالثوم",
        price: 27,
        description:
          "Chargrilled eggplants and garlic drizzled with virgin olive oil",
      },
      {
        id: "cm-8",
        name: "Labne لبنه",
        price: 24,
        description: "Fresh Lebanese labne drizzled with virgin olive oil",
      },
      {
        id: "cm-9",
        name: "Labne with Garlic لبنه بالثوم",
        price: 26,
        description:
          "Fresh Lebanese labne with minced garlic, dry mint and virgin olive oil",
      },
      {
        id: "cm-10",
        name: "Shanklish شنكليش",
        price: 28,
        description:
          "Lebanese shanklish cheese with tomatoes, onions and virgin olive oil",
      },
    ],
  },
  {
    id: "hot-mezza",
    name: "Hot Mezza",
    items: [
      {
        id: "hm-1",
        name: "Halloumi Grilled حلوم مشوي",
        price: 33,
        description: "Grilled halloumi cheese",
      },
      {
        id: "hm-2",
        name: "Foul Mdammas فول مدمّس",
        price: 27,
        description:
          "Fava beans with tomatoes, garlic, parsley, onion cumin powder, fresh lemon juice and olive oil",
      },
      {
        id: "hm-3",
        name: "Spicy Potato بطاطا حرّه",
        price: 28,
        description:
          "Fried potato cubes sauteed with garlic, coriander, fresh lemon juice, virgin olive oil and chilli powder",
      },
      {
        id: "hm-4",
        name: "Fried Egg بيض مقلي",
        price: 25,
        description: "Fried scramble eggs",
      },
      {
        id: "hm-5",
        name: "Sunny Side Up Eggs بيض عيون",
        price: 25,
        description: "Fried eggs, sunny side up",
      },
      {
        id: "hm-6",
        name: "Fattet Eggplant فتّة باذنجان",
        price: 28,
        description:
          "Chargrilled eggplants with fresh yogurt, garlic, crispy bread and roasted pine nuts",
        comingSoon: true,
      },
      {
        id: "hm-7",
        name: "Fattet Hommos فتّة حمّص",
        price: 28,
        description:
          "Chickpeas with fresh yogurt, garlic, crispy bread and roasted pine nuts",
        comingSoon: true,
      },
      {
        id: "hm-8",
        name: "Chicken Wings جوانح دجاج",
        price: 30,
        description:
          "Fried chicken wings sauteed with garlic, coriander, fresh lemon juice and virgin olive oil",
      },
      {
        id: "hm-9",
        name: "Chicken Liver كبدة دجاج",
        price: 32,
        description:
          "Fried chicken liver sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil",
      },
      {
        id: "hm-10",
        name: "Chicken Gizzard قوانص دجاج",
        price: 32,
        description:
          "Fried chicken gizzard sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil",
      },
      {
        id: "hm-11",
        name: "Chicken Hearts قلوب دجاج",
        price: 32,
        description:
          "Fried chicken hearts sauteed with garlic, pomegranate molasses, fresh lemon juice and virgin olive oil",
      },
      {
        id: "hm-12",
        name: "Cheese Rolls رقاقات جبنة",
        price: 20,
        description:
          "4 pieces of spring rolls stuffed with our special cheese mix",
      },
      {
        id: "hm-13",
        name: "Fried Chicken Kebbeh كبة دجاج مقلية",
        price: 20,
        description:
          "4 pieces of grounded chicken and crushed wheat stuffed with minced chicken, onion & sumac",
      },
      {
        id: "hm-14",
        name: "Mozzarella Sticks موزاريلا ستيكس",
        price: 20,
        description: "Fried mozzarella sticks served with cocktail sauce",
      },
      {
        id: "hm-15",
        name: "Makanek Plate مقانق دجاج",
        price: 32,
        description:
          "Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses",
      },
      {
        id: "hm-16",
        name: "Soujouk Plate سجق دجاج",
        price: 32,
        description:
          "Grilled spicy chicken sausages served with grilled onions and tomatoes",
      },
      {
        id: "hm-17",
        name: "French Fries Plate بطاطا مقليّه",
        price: 20,
        description: "Freshly fried fries",
      },
      {
        id: "hm-18",
        name: "Chicken Nuggets ناجتس دجاج",
        price: 25,
        description: "Fried breaded chicken served with cocktail sauce",
      },
      {
        id: "hm-19",
        name: "Seasoned Fries بطاطا متبلة",
        price: 24,
        description: "Seasoned freshly fried fries",
      },
      {
        id: "hm-20",
        name: "Potato Wedges بطاطا ودجز",
        price: 23,
        description: "Potato wedges served with ketchup",
      },
      {
        id: "hm-21",
        name: "Falafel Plate فلافل",
        price: 26,
        description: "Fried falafel with tahini, pickles, and vegetables",
      },
      {
        id: "hm-22",
        name: "Hummus with Chicken Shawarma حمص مع شاورما دجاج",
        price: 31,
        description:
          "Pureed chickpeas blended with tahini sauce, topped with chicken shawarma",
        comingSoon: true,
      },
    ],
  },

  {
    id: "salad",
    name: "Salad",
    items: [
      {
        id: "sal-1",
        name: "Tabboule تبوله",
        price: 26,
        description:
          "Freshly chopped parsley, tomatoes, onions, crushed wheat, with lemon juice and virgin olive oil",
      },
      {
        id: "sal-2",
        name: "Fattoush فتوش",
        price: 26,
        description:
          "Fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil",
      },
      {
        id: "sal-3",
        name: "Taouk Fattoush فتوش مع طاووق",
        price: 42,
        description:
          "Grilled taouk on a bed of fresh lettuce, tomatoes, cucumber, capsicum, rocca, bakle, mint leaves, thyme, fresh pomegranate seeds, toasted bread, with lemon juice, pomegranate molasses and virgin olive oil",
      },
      {
        id: "sal-4",
        name: "Oriental Salad سلطة شرقية",
        price: 24,
        description:
          "Fresh lettuce, tomatoes, cucumber, bakle, mint leaves with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-5",
        name: "Rocca Salad سلطة روكا",
        price: 24,
        description:
          "Fresh rocca, tomatoes, onions, with fresh lemon juice, sumac powder, and virgin olive oil dressing",
      },
      {
        id: "sal-6",
        name: "Bakle Salad سلطة بقله",
        price: 24,
        description:
          "Fresh bakle, tomatoes, onions with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-7",
        name: "Zaatar Salad سلطة زعتر",
        price: 24,
        description:
          "Fresh thyme, tomatoes, onions with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-8",
        name: "Rocca and Zaatar سلطة روكا و زعتر",
        price: 24,
        description:
          "Fresh thyme, rocca, tomatoes, onions with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-9",
        name: "Rocca Zaatar and Bakle سلطة روكا و زعتر و بقله",
        price: 24,
        description:
          "Fresh rocca, bakle, thyme, tomatoes, onions with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-10",
        name: "Beetroot and Rocca سلطة روكا وشمندر",
        price: 28,
        description:
          "Fresh rocca, walnuts, beetroot with fresh lemon juice and virgin olive oil",
      },
      {
        id: "sal-11",
        name: "Raheb Salad سلطة راهب",
        price: 26,
        description:
          "Grilled eggplants, tomatoes, capsicum, mint leaves, fresh pomegranate seeds, with lemon juice and virgin olive oil",
      },
      {
        id: "sal-12",
        name: "Cabbage Salad سلطة ملفوف",
        price: 20,
        description:
          "Chopped cabbage, tomatoes, dry mint, minced garlic, fresh squeezed lemon juice and olive oil",
      },
      {
        id: "sal-13",
        name: "Coleslaw Salad سلطة كول سلو",
        price: 24,
        description: "Chopped cabbage, carrots, sweet corn with mayonnaise",
      },
    ],
  },
  {
    id: "international-salad",
    name: "International Salad",
    items: [
      {
        id: "is-1",
        name: "Grilled Halloumi حلوم مشوي",
        price: 34,
        description:
          "Grilled halloumi slices on a bed of fresh lettuce, tomatoes, cucumber with a sprinkle of sumac on the top, drizzled with balsamic sauce",
      },
      {
        id: "is-2",
        name: "Caesar سلطة سيزر",
        price: 34,
        description:
          "Cherry tomatoes, crusty bread cubes, fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese",
      },
      {
        id: "is-3",
        name: "Chicken Caesar تشيكن سيزر",
        price: 42,
        description:
          "Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese",
      },
      {
        id: "is-4",
        name: "Taouk Caesar طاووق سيزر",
        price: 48,
        description:
          "Slices of grilled chicken breast, cherry tomatoes, crusty bread cubes on a bed of fresh iceberg lettuce drizzled with caesar dressing topped with grana padano cheese",
      },
      {
        id: "is-5",
        name: "Tuna Pasta تونا باستا",
        price: 43,
        description:
          "Tuna, fusilli pasta, sweet corn, cucumber, tomatoes, lemon juice, olive oil",
      },
      {
        id: "is-6",
        name: "Crab كراب",
        price: 48,
        description:
          "Shredded crab sticks and avocado slices on a bed of iceberg lettuce, cherry tomatoes, sweet corn drizzled with mustard dressing",
      },
      {
        id: "is-7",
        name: "Grilled Shrimps قريدس مشوي",
        price: 58,
        description:
          "Grilled shrimps with avocado slices on a bed of rocca, thyme, fresh mushroom mixed with sesame seeds, drizzled with balsamic dressing",
      },
    ],
  },
  {
    id: "pasta",
    name: "Pasta",
    items: [
      {
        id: "pa-1",
        name: "Penne Arabiata بيني ارابياتا",
        price: 46,
        description: "Penne pasta made with red sauce (spicy)",
      },
      {
        id: "pa-2",
        name: "Vegetarian بالخضار",
        price: 46,
        description:
          "Penne pasta made with red sauce, onions, broccoli, and mushrooms",
      },
      {
        id: "pa-3",
        name: "Alfredo الفريدو",
        price: 54,
        description:
          "Penne pasta made with white sauce, chicken, and mushrooms",
      },
      {
        id: "pa-4",
        name: "Pink بينك",
        price: 54,
        description: "Penne pasta made with pink sauce, chicken, and mushrooms",
      },
      {
        id: "pa-5",
        name: "Chicken Pesto تشيكن بستو",
        price: 58,
        description:
          "Penne pasta made with white sauce, pesto, chicken, pine seeds and parmesan cheese",
      },
    ],
  },
  {
    id: "main-courses",
    name: "Main Courses",
    items: [
      {
        id: "mc-1",
        name: "Escalope اسكالوب",
        price: 45,
        description:
          "Fried breaded escalope topped with melted cheese, served with coleslaw and baked potato",
      },
      {
        id: "mc-2",
        name: "Cordon Bleu Rolled كوردون بلو",
        price: 45,
        description:
          "Chicken with cheese and turkey filling, breaded deep-fried. Served with mushroom sauce and wedges potatoes",
      },
      {
        id: "mc-3",
        name: "Kiev كييف",
        price: 45,
        description:
          "Breaded chicken stuffed with butter, parsley and garlic served with sauteed vegetables and wedges",
      },
      {
        id: "mc-4",
        name: "Le Poulailler Mix Plate لو بولايي مكس بلايت",
        price: 65,
        description:
          "1 pc of chicken cordon bleu, 1 pc of chicken escalope served with fettuccine alfredo, wedges potatoes and mushroom sauce",
      },
      {
        id: "mc-5",
        name: "Mushroom Chicken Breast مشروم تشكن برست",
        price: 51,
        description:
          "Grilled chicken breast with fresh mushroom in demi-glace sauce served with mashed potatoes and sauteed vegetables",
      },
      {
        id: "mc-6",
        name: "Pepper Chicken Breast بيبر تشكن برست",
        price: 51,
        description:
          "Grilled chicken breast with black pepper in demi-glace sauce served with mashed potatoes and sauteed vegetables",
      },
    ],
  },
  {
    id: "broasted-chicken",
    name: "Broasted Chicken",
    items: [
      {
        id: "bc-1",
        name: "B-Chicken Meal 2pcs وجبة بروستد",
        price: 29,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-2",
        name: "B-Chicken Meal 4pcs وجبة بروستد",
        price: 49,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-3",
        name: "B-Chicken Meal 8pcs وجبة بروستد",
        price: 86,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-4",
        name: "B-Chicken Breast /pc صدر دجاج بروستد",
        price: 22,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-5",
        name: "B-Chicken Thigh /pc ورك دجاج بروستد",
        price: 11,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-6",
        name: "B-Chicken Drumstick /pc فخذ دجاج بروستد",
        price: 8,
        description: "Served with potato & garlic sauce",
      },
      {
        id: "bc-7",
        name: "B-Chicken Wing /pc جانح دجاج بروستد",
        price: 5,
        description: "Served with potato & garlic sauce",
      },
    ],
  },
  {
    id: "rotisserie-chicken",
    name: "Rotisserie Chicken",
    items: [
      {
        id: "rc-1",
        name: "Full Rotisserie Chicken فروج ماكينة كامل",
        price: 79,
        description:
          "Our signature roasted chicken served with garlic sauce, chili sauce & seasoned fries",
        comingSoon: true,
      },
      {
        id: "rc-2",
        name: "Half Rotisserie Chicken نصف فروج ماكينة",
        price: 49,
        description:
          "Our signature roasted chicken served with garlic sauce, chili sauce & seasoned fries",
        comingSoon: true,
      },
    ],
  },
  {
    id: "burgers-crispy",
    name: "Burgers & Crispy",
    items: [
      {
        id: "bg-1",
        name: "Lebanese Burger برغر لبناني",
        price: 30,
        description:
          "Our signature Lebanese burger made with a hand seasoned chicken patty grilled to perfection with coleslaw, tomatoes, pickles, fries, onions, mustard, mayonnaise, and ketchup",
      },
      {
        id: "bg-2",
        name: "Crispy Chicken كرسبي تشكن",
        price: 32,
        description:
          "Our special burger bun with crispy chicken, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce",
      },
      {
        id: "bg-3",
        name: "Spicy Crispy Chicken كرسبي تشكن (حار)",
        price: 32,
        description:
          "Our special burger bun with spicy fried crunchy chicken breast, cheddar slice, iceberg lettuce, cucumber pickles and mayonnaise sauce",
      },
      {
        id: "bg-4",
        name: "Mozzarella Burger موزاريلا",
        price: 38,
        description:
          "Our multigrain burger bun with our special marinated grilled breast, fried mozzarella, lettuce and our special burger sauce",
      },
      {
        id: "bg-5",
        name: "Crispy Tender Platter كرسبي",
        price: 47,
        description:
          "6 pieces of crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce",
      },
      {
        id: "bg-6",
        name: "Half Crispy Tender Platter كرسبي",
        price: 31,
        description:
          "3 pieces of crispy chicken tender, served with french fries, bun mayo garlic sauce and cocktail sauce",
      },
    ],
  },
  {
    id: "shawarmas",
    name: "Shawarmas",
    items: [
      {
        id: "sh-1",
        name: "Chicken Shawarma Small شاورما دجاج صغيرة",
        price: 11,
        description:
          "Our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj or Special Bread)",
        comingSoon: true,
      },
      {
        id: "sh-2",
        name: "Chicken Shawarma Large شاورما دجاج كبيرة",
        price: 24,
        description:
          "Our special chicken shawarma with garlic, pickles, and fries (Arabic, Saj or Special Bread)",
        comingSoon: true,
      },
      {
        id: "sh-3",
        name: "Arabic Chicken Shawarma وجبة شاورما عربي",
        price: 42,
        description:
          "Our special chicken shawarma with garlic, pickles, and fries (Arabic or Saj Bread)",
        comingSoon: true,
      },
      {
        id: "sh-4",
        name: "Chicken Shawarma Plate صحن شاورما دجاج",
        price: 43,
        description:
          "Our special chicken shawarma served with garlic sauce, pickles & french fries",
        comingSoon: true,
      },
    ],
  },
  {
    id: "international-sandwiches",
    name: "International Sandwiches & Wraps",
    items: [
      {
        id: "isw-1",
        name: "Crispy Poulailler كرسبي بولايي",
        price: 36,
        description:
          "Fried breaded crispy chicken, cheddar & craft cheese sliced, iceberg lettuce, sweet corn and our special homemade tartare sauce",
      },
      {
        id: "isw-2",
        name: "Chicken Escalope دجاج اسكالوب",
        price: 34,
        description:
          "Fried breaded escalope with coleslaw, fries, ketchup, cheese served in special bread",
      },
      {
        id: "isw-3",
        name: "Fajitas فاهيتا",
        price: 34,
        description:
          "Chicken slices seasoned with our special spices mixed with colored bell peppers, onions, mozzarella cheese and served with guacamole sauce",
      },
      {
        id: "isw-4",
        name: "Francisco فرنسيسكو",
        price: 34,
        description:
          "Chicken, sweet corn, lettuce, pickles sliced with cheese, mayonnaise toasted in special bread",
      },
      {
        id: "isw-5",
        name: "Submarine صب مارين",
        price: 33,
        description:
          "Smoked turkey, spicy salami, mayonnaise, lettuce, mix cheese, tomatoes and pickles served in special bread",
      },
      {
        id: "isw-6",
        name: "Chicken Sub Sandwich دجاج صب",
        price: 36,
        description:
          "Grilled chicken with smoked turkey, cheese, iceberg lettuce, pesto & tartare sauce in special bread",
      },
      {
        id: "isw-7",
        name: "Turkey and Cheese Wrap حبش و جبنة راب",
        price: 36,
        description:
          "Sliced smoked turkey with cheese, lettuce, tomatoes, pickles, mayo mustard sauce",
      },
      {
        id: "isw-8",
        name: "Escalope Wrap اسكالوب راب",
        price: 36,
        description:
          "Fried breaded escalope, lettuce, pickles, sweet corn, ketchup, cheese and garlic mayo",
      },
      {
        id: "isw-9",
        name: "Chicken Wrap دجاج راب",
        price: 36,
        description:
          "Grilled chicken with cheese, lettuce, tomatoes, pickles, garlic mayo sauce",
      },
    ],
  },
  {
    id: "lebanese-sandwiches",
    name: "Lebanese Sandwiches",
    items: [
      {
        id: "ls-1",
        name: "Falafel فلافل",
        price: 19,
        description:
          "Falafel with tomatoes, parsley, pickled turnip, cucumber pickles, and tahini wrapped in arabic bread",
      },
      {
        id: "ls-2",
        name: "Cauliflower قرنبيط مقلي",
        price: 19,
        description: "Cauliflower sandwich with pickles and tahini sauce",
      },
      {
        id: "ls-3",
        name: "Halloumi حلوم",
        price: 22,
        description:
          "Halloumi grilled with lettuce, tomatoes and fresh cucumber",
      },
      {
        id: "ls-4",
        name: "Shish Taouk شيش طاووق",
        price: 26,
        description: "Taouk with garlic and pickles",
      },
      {
        id: "ls-5",
        name: "Lebanese Taouk طاووق لبناني",
        price: 28,
        description:
          "Taouk with garlic, coleslaw salad, fries and cucumber pickles",
      },
      {
        id: "ls-6",
        name: "Chicken with Garlic سندوش الدجاج بالثوم",
        price: 25,
        description:
          "Roasted chicken with garlic, pickles, and fries served in Lebanese bread",
      },
      {
        id: "ls-7",
        name: "Chicken Liver سودة دجاج",
        price: 25,
        description:
          "Fried chicken liver with garlic paste and pickles served in soft french bread",
      },
      {
        id: "ls-8",
        name: "Makanek مقانق",
        price: 24,
        description: "Grilled chicken sausages, hommos, pickles, and tomatoes",
      },
      {
        id: "ls-9",
        name: "Soujouk سجق",
        price: 24,
        description: "Grilled spicy chicken sausages with hommos and pickles",
      },
      {
        id: "ls-10",
        name: "Kabab Halabi Chicken كباب حلبي",
        price: 26,
        description: "Kabab halabi chicken with hommos and pickles",
      },
      {
        id: "ls-11",
        name: "Kabab Intabli Chicken كباب عنتبلي",
        price: 26,
        description: "Spicy chicken kabab with hommos and pickles",
      },
    ],
  },
  {
    id: "grill",
    name: "Grill",
    items: [
      {
        id: "gr-1",
        name: "Shish Taouk Plate شيش طاووق",
        price: 52,
        description:
          "Grilled marinated chicken cubes served with garlic paste, fries, and hommos",
      },
      {
        id: "gr-2",
        name: "Kabab Halabi Plate كباب حلبي",
        price: 49,
        description:
          "Grilled chicken minced meat seasoned with parsley and onions served with fries and hommos",
      },
      {
        id: "gr-3",
        name: "Kabab Intabli Plate كباب عنتبلي",
        price: 49,
        description:
          "Grilled spicy chicken minced meat seasoned with parsley and onions served with fries and hommos",
      },
      {
        id: "gr-4",
        name: "Mix Grill مشاوي مشكّل لشخص",
        price: 51,
        description:
          "Shish taouk, kabab halabi, kabab intabli served with fries and hommos",
      },
      {
        id: "gr-5",
        name: "Chicken Breast صدر مشوي",
        price: 52,
        description:
          "Grilled marinated chicken breast served with pickles, fries, and hommos",
      },
      {
        id: "gr-6",
        name: "Grilled Chicken Wings جوانح دجاج",
        price: 29,
        description: "Grilled chicken wings served with garlic sauce",
      },
      {
        id: "gr-7",
        name: "Soujouk سجق",
        price: 32,
        description:
          "Grilled spicy chicken sausages served with grilled onions and tomatoes",
      },
      {
        id: "gr-8",
        name: "Makanek مقانق",
        price: 32,
        description:
          "Grilled chicken sausages served with grilled onions, tomatoes and pomegranate molasses",
      },
      {
        id: "gr-9",
        name: "Arayes Chicken Plate عرايس دجاج",
        price: 42,
        description:
          "Lebanese bread stuffed with our special Lebanese chicken mixture grilled to perfection (served with yogurt)",
      },
      {
        id: "gr-10",
        name: "Half Chicken نصف فروج",
        price: 48,
        description:
          "Half grilled chicken served with pickles, fries, and hommos",
      },
      {
        id: "gr-11",
        name: "Full Chicken فروج",
        price: 78,
        description:
          "Full grilled chicken served with pickles, fries, and hommos",
      },
      {
        id: "gr-12",
        name: "Taouk Half KG شيش طاووق نصف كيلو",
        price: 76,
        description: "Shish taouk served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-13",
        name: "Kabab Intabli Chicken Half KG كباب عنتبلي نصف كيلو",
        price: 72,
        description:
          "Kabab intabli chicken served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-14",
        name: "Kabab Halabi Chicken Half KG كباب حلبي نصف كيلو",
        price: 72,
        description:
          "Kabab halabi chicken served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-15",
        name: "Chicken Mix Grilled Half KG مشاوي مشكّل نصف كيلو",
        price: 75,
        description:
          "Shish taouk, kabab halabi chicken, kabab intabli chicken, makanek chicken, and soujouk chicken served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-16",
        name: "Taouk 1 KG شيش طاووق كيلو",
        price: 151,
        description: "Shish taouk served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-17",
        name: "Kabab Intabli Chicken 1 KG كباب عنتبلي كيلو",
        price: 141,
        description:
          "Kabab intabli chicken served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-18",
        name: "Kabab Halabi Chicken 1 KG كباب حلبي كيلو",
        price: 141,
        description:
          "Kabab halabi chicken served with fries, hummus & garlic sauce",
      },
      {
        id: "gr-19",
        name: "Chicken Mix Grilled 1 KG مشاوي مشكّل كيلو",
        price: 149,
        description:
          "Shish taouk, kabab halabi chicken, kabab intabli chicken, makanek chicken, and soujouk chicken served with fries, hummus & garlic sauce",
      },
    ],
  },
  {
    id: "coffee",
    name: "Coffee",
    items: [
      { id: "cf-1", name: "American Coffee اميريكان كوفي", price: 14 },
      { id: "cf-2", name: "Espresso Single اسبريسو سينجل", price: 10 },
      { id: "cf-3", name: "Espresso Double اسبريسو دبل", price: 14 },
      { id: "cf-4", name: "Cappuccino كابوتشينو", price: 15 },
      { id: "cf-5", name: "Café Latte كافي لاتي", price: 15 },
      {
        id: "cf-6",
        name: "Nescafe with Coffeemate نسكافيه و كوفي ميية",
        price: 15,
      },
      { id: "cf-7", name: "Nescafe with Milk نسكافيه و حليب", price: 15 },
      { id: "cf-8", name: "Nescafe Black نسكافيه بلاك", price: 13 },
      { id: "cf-9", name: "Nescafe Gold نسكافيه غولد", price: 14 },
      { id: "cf-10", name: "Nescafe 3in1 نسكافيه", price: 13 },
      { id: "cf-11", name: "Hot Chocolate هوت شوكلاته", price: 17 },
      { id: "cf-12", name: "Turkish Coffee (Cup) قهوة تركية (كوب)", price: 13 },
      {
        id: "cf-13",
        name: "Raqwe Turkish for Two ركوة تركية لشخصين",
        price: 18,
      },
      {
        id: "cf-14",
        name: "Raqwe Turkish for Four ركوة تركية لاربع اشخاص",
        price: 26,
      },
    ],
  },
  {
    id: "tea",
    name: "Tea",
    items: [
      { id: "te-1", name: "Matte متة", price: 31 },
      { id: "te-2", name: "Black Tea شاي", price: 13 },
      { id: "te-3", name: "Green Tea شاي اخضر", price: 13 },
      { id: "te-4", name: "Earl-Gray Tea شاي ايرل جراي", price: 13 },
      { id: "te-5", name: "Moroccan Tea for One شاي مغربي لشخص", price: 16 },
      { id: "te-6", name: "Moroccan Tea for Two شاي مغربي لشخصين", price: 24 },
      {
        id: "te-7",
        name: "Moroccan Tea for Four شاي مغربي لأربع اشخاص",
        price: 36,
      },
    ],
  },
  {
    id: "fresh-juices",
    name: "Fresh Juices",
    items: [
      { id: "fj-1", name: "Watermelon Juice عصير بطيخ", price: 19 },
      { id: "fj-2", name: "Carrot Juice عصير جزر", price: 19 },
      { id: "fj-3", name: "Kiwi Juice عصير كيوي", price: 19 },
      { id: "fj-4", name: "Mango Juice عصير مانجو", price: 21 },
      { id: "fj-5", name: "Pomegranate Juice عصير رمان", price: 19 },
      { id: "fj-6", name: "Lemonade عصير ليمون", price: 19 },
      { id: "fj-7", name: "Lemon and Mint ليمون بالنعناع", price: 20 },
      { id: "fj-8", name: "Orange Juice عصير برتقال", price: 19 },
      { id: "fj-9", name: "Apple Juice عصير تفاح", price: 19 },
      { id: "fj-10", name: "Pineapple Juice عصير الاناناس", price: 21 },
      { id: "fj-11", name: "Strawberry Juice عصير فراولة", price: 21 },
      { id: "fj-12", name: "Sweetmelon Juice عصير شمام", price: 19 },
      { id: "fj-13", name: "Cocktail Juice عصير كوكتيل", price: 30 },
      {
        id: "fj-14",
        name: "Lebanese Cocktail Fruit عصير كوكتيل لبناني",
        price: 35,
      },
      { id: "fj-15", name: "Avocado Juice عصير الافوكادوا", price: 35 },
      {
        id: "fj-16",
        name: "Avocado with Nutella عصير الافوكادوا مع نوتيلا",
        price: 39,
      },
    ],
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    items: [
      { id: "cc-1", name: "Cappuccino Frappe كابوتشينو فرابي", price: 21 },
      { id: "cc-2", name: "Ice Latte ايس لاتيه", price: 21 },
      { id: "cc-3", name: "Ice Americano ايس اميريكانو", price: 21 },
    ],
  },
  {
    id: "milk-shake",
    name: "Milk Shake",
    items: [
      { id: "ms-1", name: "Chocolate Milk-Shake شوكولات ميلك شيك", price: 24 },
      {
        id: "ms-2",
        name: "Strawberry Milk-Shake ستروبيري ميلك شيك",
        price: 24,
      },
      { id: "ms-3", name: "Vanilla Milk-Shake فانيلا ميلك شيك", price: 24 },
      {
        id: "ms-4",
        name: "Mango Passion Milk-Shake مانجو باشون ميلك شيك",
        price: 24,
      },
      { id: "ms-5", name: "Banana Milk-Shake بانانا ميلك شيك", price: 24 },
      { id: "ms-6", name: "Oreo Milk-Shake اوريو ميلك شيك", price: 24 },
    ],
  },
  {
    id: "water-softdrinks",
    name: "Water & Softdrinks",
    items: [
      { id: "ws-1", name: "Small Lebanese Water مياه لبنانية", price: 5 },
      { id: "ws-2", name: "Large Lebanese Water مياه لبنانية", price: 14 },
      {
        id: "ws-3",
        name: "Small Sparkling Water Perrier مياه غازية",
        price: 12,
      },
      {
        id: "ws-4",
        name: "Large Sparkling Water Perrier مياه غازية",
        price: 18,
      },
      { id: "ws-5", name: "Top Juice توب جوس", price: 5 },
      { id: "ws-6", name: "Soft Drink مشروبات غازية", price: 6 },
      { id: "ws-7", name: "Laban Ayran لبن عيران", price: 13 },
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    items: [
      {
        id: "ds-1",
        name: "Lazy Cake بسكويت بالشوكولا",
        price: 15,
        description: "Biscuit dipped in our special chocolate recipe",
      },
      {
        id: "ds-2",
        name: "Custard كاسترد",
        price: 15,
        description:
          "Mix of double custard flavors vanilla & chocolate topped with biscuit",
        comingSoon: true,
      },
      {
        id: "ds-3",
        name: "Kunafa كنافة",
        price: 29,
        description: "Baked semolina pastry with cheese",
        comingSoon: true,
      },
      {
        id: "ds-4",
        name: "Ghazal Al Banat غزل البنات بالايس كريم",
        price: 29,
        description:
          "Mastic (Mistika) ice cream and Lebanese cotton candy with a sprinkling of pistachios",
        comingSoon: true,
      },
      {
        id: "ds-5",
        name: "Baklawa Mix بقلاوة مشكلة",
        price: 29,
        description: "Assorted baklawa",
      },
    ],
  },
];
