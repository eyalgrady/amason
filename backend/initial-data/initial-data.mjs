export const initialData = {
  users: [
    // 3 סוגי משתמשים
    {
      name: "regular_user",
      phone: "050-1111111",
      email: "regularuser@gmail.com",
      password: "Aa123456!",
      isBusiness: false,
      isDeleted: false,
    },
    {
      name: "business_user_1",
      phone: "050-2222222",
      email: "business1@gmail.com",
      password: "Aa123456!",
      businessName: "Business One",
      categories: [
        "Clothing & Fashion",
        "Electronics & Appliances",
        "Books & Media",
        "Beauty & Health",
        "Home & Garden",
      ],
      address: {
        postcode: "12345",
        street: "Main Street",
        optionalText: "",
        city: "Tel Aviv",
        country: "Israel",
      },
      image: {
        url: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/fde98af2-b860-4778-9dad-a27fb1adae1d._CR0%2C0%2C3000%2C600_SX1500_.jpg",
        alt: "Business One Image",
      },
      isBusiness: true,
      isDeleted: false,
    },
    {
      name: "business_user_2",
      phone: "050-3333333",
      email: "business2@gmail.com",
      password: "Aa123456!",
      businessName: "Business Two",
      categories: [
        "Toys & Games",
        "Sports & Leisure",
        "Beauty & Health",
        "Home & Garden",
        "Electronics & Appliances",
        "Clothing & Fashion",
      ],
      address: {
        postcode: "54321",
        street: "Another Street",
        optionalText: "",
        city: "Haifa",
        country: "Israel",
      },
      image: {
        url: "https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/1/AmazonStores/ATVPDKIKX0DER/872b1aaa3a7fc50de2fccba333f0c082.w3000.h601._CR0%2C0%2C3000%2C601_SX1920_.jpg",
        alt: "Business Two Image",
      },
      isBusiness: true,
      isDeleted: false,
    },
    {
      name: "business_user_3",
      phone: "050-4444444",
      email: "business3@gmail.com",
      password: "Aa123456!",
      businessName: "Business Three",
      categories: [
        "Jewelry & Watches",
        "Sports & Leisure",
        "Beauty & Health",
        "Home & Garden",
      ],
      address: {
        postcode: "54321",
        street: "Capital Street",
        optionalText: "",
        city: "Jerusalem",
        country: "Israel",
      },
      image: {
        url: "https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/7ace7f48-503b-43c3-8227-8f2ae50bacb3._SL5000_CR0%2C0%2C5000%2C1000_SX1920_.jpg",
        alt: "Business Three Image",
      },
      isBusiness: true,
      isDeleted: false,
    },
    {
      name: "admin",
      phone: "050-4444444",
      email: "admin@gmail.com",
      password: "Admin1234!",
      businessName: "Admin Business",
      address: {
        postcode: "67890",
        street: "Admin Street",
        optionalText: "",
        city: "Tel Aviv",
        country: "Israel",
      },
      image: {
        url: "https://via.placeholder.com/150",
        alt: "Admin Image",
      },
      isBusiness: true,
      isAdmin: true,
      isDeleted: false,
    },
  ],

  products: [
    // 50 מוצרים ממגוון קטגוריות
    {
      title: "Amason Essentials Men's Cotton Cardigan Jumper",
      content: `<ul><li>REGULAR FIT: Comfortable, easy fit through the shoulders, chest, and waist</li>
      <li>COTTON YARN: Knit from a 100% cotton yarn with a soft hand and natural stretch.</li>
      <li>EVERYDAY SWEATER: This lightweight cardigan sweater is the perfect cool weather layer, wear it with a t-shirt and jeans for an easy going look, or dress it up with a collared shirt and chinos for the office.</li>
      <li>DETIALS: V-neck with center front button closure placket. Ribbed at sleeve cuffs and bottom hem.</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/91IwzHmLFoL._AC_UL480_QL65_.jpg",
        alt: "Cotton Cardigan Jumper",
      },
      price: "22",
      quantity: 100,
      category: "Clothing & Fashion",
      subcategory: "Men",
      brandName: "Amason Essentials",
      businessName: "Business One",
      isDeleted: false,
    },
    {
      title: "GRACE KARIN Womens Vintage Pencil Work Dress",
      content: `<ul>
      <li>1950s Style Dresses: Bodycon; Knee Length;Concealed Zip at Back</li>
      <li>Different Models of Different Fabrics; Multicolored as Show</li>
      <li>It is great for daily life, wear to work, casual party, cocktail and other special occasions.You will feel more confident and attractive when you wear our 1950s style vintage pencil dress.</li>
      <li>1 Dress only in package!!!</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/713LxBzBXrL._AC_UL480_QL65_.jpg",
        alt: "Vintage Pencil Work Dress",
      },
      price: "26",
      quantity: 100,
      category: "Clothing & Fashion",
      subcategory: "Women",
      brandName: "Grace Karin",
      businessName: "Business Two",
      isDeleted: false,
    },
    // 48 מוצרים נוספים ממגוון קטגוריות...
    {
      title: "Regatta Kids Waterproof Robe Juniors",
      content: `<ul>
      <li>Featuring our waterproof and windproof Hydrafort 5000 fabric</li>
      <li>Roomy, weatherproof and warm, our Junior Waterproof Changing Robe will give them freedom of movement as they change from dirty clothes into something clean and dry</li>
      <li>The Borg fleece lining brings the warmth and comfort</li>
      <li>With ample room, they'll be able to discreetly change without the need for a private room</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/61miAh-NfpL._AC_UL480_QL65_.jpg",
        alt: "Waterproof Robe",
      },
      price: "32",
      quantity: 100,
      category: "Clothing & Fashion",
      subcategory: "Kids",
      brandName: "",
      discountPercentage: "10",
      promotionMessageText: "Dont miss this promotion!",
      businessName: "Business One",
      isDeleted: false,
    },
    {
      title: "Samsung Galaxy A15 Black 4G 128GB",
      content: `
      <ul>
      <li>Colour: blue/black</li>
      <li>2.2GHz MediaTek MT6789V/CD Octa-Core Processor</li>
      <li>50 megapixel main camera</li>
      <li>16.4 cm (6.5 inch) Super AMOLED display with 1080 x 2340 pixels</li>
      <li>128 GB internal memory, Android 14.0</li>
      </ul>
      
      <p>Did you know? This product has an IMEI serial number that uniquely identifies the device. In the event that the device is lost or stolen while in transit, in order to combat potential fraud, Amason may report the relevant IMEI serial number in loss and theft databases to prevent its fraudulent use or resale. No action is required on your part. For more information, please visit the Privacy Notice. </p>`,
      image: {
        url: "https://m.media-amazon.com/images/I/71CwQvzaQNL._AC_UY327_FMwebp_QL65_.jpg",
        alt: "Samsung Galaxy A15",
      },
      price: "400",
      quantity: 100,
      category: "Electronics & Appliances",
      subcategory: "Smartphones",
      brandName: "Samsung",
      businessName: "Business One",
      isDeleted: false,
    },
    {
      title:
        "Complete set of Dell OptiPlex Dual Core 4GB RAM, 160 GB Hard Drive, Windows 10 Desktop PC Computer (Renewed)",
      content: `<ul>
      <li> Fast Intel Dual Core, 4GB RAM, 160GB Hard Drive</li>
      <li>Generic mixed model / brand of 17" monitor. Picture is for illustration only.</li>
      <li>Genuine Microsoft Windows 10 Certificate of Authenticity.</li>
      <li>WiFi Enabled - 150MBps WiFi Wireless USB network adapter included.</li>
      </ul>
     
      <p>This refurbished product is inspected, tested and cleaned in accordance with Amazon Renewed requirements to be fully functional. Premium and Excellent condition products will show no signs of cosmetic damage visible from 30 centimetres. Good condition products will show scratches barely visible from 30 centimetres away. Acceptable condition products will show scratches clearly visible from 30 centimetres away. Products sold by third-party sellers are covered by the voluntary 1-year Amazon Renewed Guarantee (see below). Products sold by Amazon are covered under statutory legal warranty by Amazon directly. Batteries, where present, will have a minimum capacity of 80% relative to new (90% for Premium condition products). The product will come with original or compatible generic accessories. Refurbished products are not guaranteed to be waterproof.</p>`,
      image: {
        url: "https://m.media-amazon.com/images/I/41x81v5aR8L._AC_UY327_FMwebp_QL65_.jpg",
        alt: "Complete set of Dell OptiPlex Dual",
      },
      price: "80",
      quantity: 100,
      category: "Electronics & Appliances",
      subcategory: "Computers",
      brandName: "Dell",
      discountPercentage: "5",
      promotionMessageText: "",
      businessName: "Business Two",
      isDeleted: false,
    },
    {
      title:
        "SIEMENS TF301G19 EQ300 Fully Automatic Coffee Machine with ceramDrive, milkPerfect and oneTouch Function, in Piano Black",
      content: `<ul>
      
      <li>Milk froth made easy: With milkPerfect you can froth milk directly in your coffee mug by sliding the stainless steel frothing wand into the mug for fresh, barista-quality foam at home</li>
      <li>oneTouch: Simply press the button for your preferred drink on the intuitive coffeeDirect Display and enjoy everything from espresso or a creamy latte macchiato to a cappuccino or simple filter coffee</li>
      <li>Customise your strength: The intelligent Siemens iAroma feature lets you choose between 3 different strength levels, so you get your coffee just the way you like it with a flavourful aroma every time</li>
      <li>Efficient cleaning: The door of the coffee machine is located at the front for easy access and the milk frother is dishwasher-safe to make cleaning even simpler</li>
      <li>Items delivered: Siemens TF301G19 EQ300 fully automatic coffee machine with 3 strength levels, ceramDrive grinder, iAroma system, milkPerfect frother, coffeeDirect panel and oneTouch, in piano black</li>
      </ul>
     `,
      image: {
        url: "https://m.media-amazon.com/images/I/71722spukEL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Fully Automatic Coffee Machine",
      },
      price: "280",
      quantity: 100,
      category: "Electronics & Appliances",
      subcategory: "Home Appliances",
      brandName: "",
      discountPercentage: "",
      promotionMessageText: "",
      businessName: "Business One",

      isDeleted: false,
    },
    {
      title:
        "vidaXL Solid Brown TV Cabinet with Natural Rattan Weaving | Engineered Wood Stand with Three Storage Compartments | Scandinavian Style Media Unit with Wood Feet | Living Room Essential Furniture",
      content: ` <ul>
      <li><strong>High-quality material</strong>: The TV cabinet is constructed of excellent engineered wood featuring strength, moisture resistance, and pinewood feet, ensuring a robust and long-lasting unit</li>
      <li><strong>Aesthetic look</strong>: The brown color of the TV stand gives it a versatile look, meaning it can blend in with various interior decors from vintage to contemporary</li>
      <li><strong>Easy assembly</strong>: The vidaXL TV cabinet comes with an easy-to-follow assembly manual, making the process of putting it together hassle-free and straightforward</li>
      <li><strong>Functional and aesthetic</strong>: Besides being an efficient organizer, this unit enhances the beauty of your space with its Scandinavian style and solid pinewood feet</li>
      <li><strong>Thoughtful design</strong>: The natural rattan woven doors add a stylish touch. The thoughtfully designed compartments help keep magazines, DVDs and other items organized and the solid flat top serves as a photo or decor display</li>
    </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/512+4e-Kf4L._AC_UL480_FMwebp_QL65_.jpg",
        alt: "vidaXL Solid Brown TV Cabinet",
      },
      price: "220",
      quantity: "100",
      category: "Home & Garden",
      subcategory: "Furniture",
      voucherCode: "",
      brandName: "",
      discountPercentage: "",
      promotionMessageText: "",
      businessName: "Business Two",

      isDeleted: false,
    },
    {
      title: 'AcaciaHome 18" Bunch of Grapes Floral Ceramic Umbrella Stand',
      content: `Approximately 18" high x 8" diameter. (46CM x 20CM) Finished in a marginal distressed look so this really looks like a Retro product`,
      image: {
        url: "https://m.media-amazon.com/images/I/713DLuPcNbL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Ceramic Umbrella Stand",
      },
      price: "18",
      quantity: 100,
      category: "Home & Garden",
      subcategory: "Home Accessories",
      voucherCode: "",
      brandName: "",
      discountPercentage: "",
      promotionMessageText: "",
      businessName: "Business Three",
      isDeleted: false,
    },
    {
      title:
        "FANHAO Garden Hose Spray Gun with 7 Patterns, 100% Heavy Duty Metal Hose Pipe Spray Gun Zinc Alloy High Pressure Hose Gun for Plant Watering, Car and Pet Washing, Sidewalk Cleaning",
      content: `
      <ul>
      <li>UPGRADED HOSE PIPE SPRAY GUN -- 100% Metal. FANHAO hose gun is extra heavy duty made from premium zinc alloy.</li> 
      <li>High quality to prevent leak, rust, corrosion and wear, is much STRONGER and DURABLE than plastic spray guns. A shock resistant rubberized bezel dial protects the sprayer from accidental drops.</li>
      <li>FITS ALL STANDARD GARDEN HOSES & LEAK PROOF -- Fits all EU-based garden hoses - 3/4"G Garden Hose Thread. No adapters necessary! One piece design and multiple internal rubber o-ring washers provides a durable tight seal to eliminate leaks.</li>
      <li>7 SPRAY SETTINGS FOR ALL PURPOSE USES -- Choose from Flat, Center, Cone, Angle, Shower, Mist, and Jet to cover all of your watering needs! Perfect for watering your garden, lawn, grass, and flower beds. It's also great for washing your car, dogs, and pets.</li>
      <li>ERGONOMIC SOFT RUBBER COMFORT GRIP -- Comfortable spraying. A key element we upgraded our garden hose nozzle is the soft rubber coating which makes the spray nozzle very comfortable to use. You can water all day, your hands won't be tired and won't be cold even in the winter.</li>
      <li>100% QUALITY GUARANTEE -- We stand by our products. Return & Refund Guarantee within 30 days of receipt of shipment if you are not satisfied with our hose nozzle. No question asked.</li>
</ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/61iLQFiGKIL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Garden Hose Spray Gun",
      },
      price: "10",
      quantity: "100",
      category: "Home & Garden",
      subcategory: "Gardening",
      voucherCode: "",
      brandName: "",
      discountPercentage: "",
      promotionMessageText: "",
      businessName: "Business One",

      isDeleted: false,
    },
    {
      title: "Femfresh INTIMATE WASH 250ML",
      content: `<ul>
      <li>EVERYDAY CARE DAILY WASH: Our gentle, soap-free pH-balanced formula is specially designed for safe & effective regular cleansing for your intimate vagina area</li>
      <li>PH & MICRO-BIOME BALANCED: Won’t dry out or irritate skin like soap can. Enriched with soothing aloe vera to deodorise & keep skin happy & feeling fresh all-day long</li>
      <li>CARING HYGIENE: Unlike ordinary body washes & shower gels, Femfresh is formulated to sooth & protect against irritation to your intimate skin, keeping it feeling healthy</li>
      <li>DERMATOLOGICALLY & GYNAECOLOGICALLY TESTED: Gentle on delicate, intimate areas. Hypoallergenic body wash - suitable for sensitive skin. Hormone free, paraben free, soap free & pH balanced</li>
      <li>PART OF THE FEMFRESH SKIN CARE RANGE: Ideal for daily use. Specifically designed to care for your delicate vulval skin & intimate female areas, keeping you feeling fresher for longer</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/51QVP9ITEbL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Femfresh INTIMATE WASH",
      },
      price: "2",
      quantity: "100",
      category: "Beauty & Health",
      subcategory: "Personal Care",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Two",
      isDeleted: false,
    },
    {
      title:
        "IT Cosmetics Bye Bye Under Eye Concealer, Highly Pigmented and Water-Resistant with Long-Wearing Finish",
      content: `
Item form	Gel
Colour	Deep Honey 43.0
Skin type	All
Finish type	opaque
Recommended uses for product	coverage
Package information	Tube
Brand	IT Cosmetics
Coverage	Full
Product benefits	Infused with peptides, hydrolysed collagen, hyaluronic acid and antioxidants to help skin to appear younger.Infused with peptides, hydrolysed collagen, hyaluronic acid and antioxidants to help skin to appear younger.
Skin tone	Deep`,
      image: {
        url: "https://m.media-amazon.com/images/I/613envkFWwL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Under Eye Concealer",
      },
      price: "19",
      quantity: "100",
      category: "Beauty & Health",
      subcategory: "Cosmetics",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Three",
      isDeleted: false,
    },
    {
      title:
        "Magnesium Glycinate 4-in-1 | 1400mg Complex – 400mg Elemental Magnesium | High Strength Magnesium Glycinate, Citrate, Malate & Taurate with Zinc and Vitamin B6 | for Sleep, Energy, Bones and Muscles",
      content: `<ul>
      <li>4-IN-1 MAGNESIUM COMPLEX: This magnesium complex contains 1400mg of four types of organic magnesium (Glycinate, Citrate, Malate, Taurate) – providing 400mg of elemental magnesium (100% daily recommended intake amount). Each bottle contains 60 vegan capsules.</li>
      <li>"NOT BUFFERED" FORMULA - Our magnesium complex is made with a "not buffered" formula. "Not buffered" means our product is not mixed with less expensive and less absorbable magnesium oxide to bulk up the capsules. The 4 in 1 organic magnesium forms help support sleep, muscle relaxation and bone health, as well as boosting energy and reducing fatigue.</li>
      <li>ZINC AND VITAMIN B6 FOR BONE AND MUSCLES: Each serving provides 10mg of elemental zinc and 1.4mg of Vitamin B6. These values ensure you receive 100% of your daily Zinc and Vitamin B6 recommended daily intake. Zinc contributes to maintenance of normal bones, hair, skin, vision & immune system. Vitamin B6 contribute to normal muscle function and maintenance of healthy bones & teeth.</li>
      <li>SUPPORTS SLEEP QUALITY: Magnesium is a natural muscle relaxer which helps calm the brain at bedtime. It helps maintain healthy levels of GABA, a neurone signal that promotes relaxation and sleep. Low levels of GABA can make it difficult to relax and fall asleep. Magnesium increases the level of GABA activity in the brain - helping you fall asleep.</li>
      <li>3rd Party Tested & cGMP Certified: Our 4-in1 Magnesium Complex is made in the UK at a registered cGMP facility and is 3rd party tested for purity and accuracy. Every magnesium pill is vegan, non-GMO, gluten-free and contains no fillers, artificial ingredients, preservatives, or stearates.</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/71riO2lcbOL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Magnesium Glycinate",
      },
      price: "8",
      quantity: "100",
      category: "Beauty & Health",
      subcategory: "Supplements",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business One",

      isDeleted: false,
    },
    {
      title: "NIKE Men's M Nk Df Acd23 Top Ss T-Shirt",
      content: `<ul>
      <li>Sports shirt</li>
      <li>Nike Dri-FIT technology</li>
      <li>Short sleeves</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/41qu+75Q3NL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Nike T-Shirt",
      },
      price: "22",
      quantity: "100",
      category: "Sports & Leisure",
      subcategory: "Sportswear",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Two",

      isDeleted: false,
    },
    {
      title:
        "EnterSports Ab Rollers Wheel Kit, Exercise Wheel Core Strength Training Abdominal Roller Set with Push Up Bars, Resistance Bands, Knee Mat Home Gym Fitness Equipment for Abs Workout",
      content: `<ul>
      <li>DURABLE&SILENCE - This abs roller is made of high-strength stainless steel shaft which can support 272kg, 3.2” width roller with the non-slip design let you roll across any surface without wobbling. The handle is covered by foam padding prevent hands from slipping during intense workouts.</li>
      <li>EASY TO ASSEMBLE - It takes less one minute to assemble the wheel roller, it is easy to pack the exercise wheel to your gym bag, backpack or luggage, enjoy workout anywhere you want.</li>
      <li>WORKOUT YOUR WHOLE BODY - EnterSports roller wheel is designed as your personal fitness trainer. It works various muscles targeting your abs, hip flexors, shoulders, and back, burning your calories to shape a better figure.</li>
      <li>PACKAGE INCLUDED - E nterSports ab wheel comes with all the accessories you need. 2 resistance bands, 2 knee pads, 2 Push Up Bars Handles Grips and 1 exercise guide post. The resistance bands use with the roller or handles grips can increase the difficulty of training, suitable for beginners to professional person.</li>
      <li>100% SATISFACTION GUARANTEE-- ensures This will quickly become your favorite no-risk purchase. Many people are stocking up with 2 or 3 of these sets so the whole family can enjoy the benefits of an excellent abdominal workout. HURRY AND BUY NOW while we have this very popular complete abdominal set in stock. This is a great birthday gift, holiday present, or anniversary gift. Just right for friends, family, and co-workers</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/71657XnYOhL._AC_UL480_FMwebp_QL65_.jpg",
        alt: "EnterSports Ab Rollers Wheel",
      },
      price: "16",
      quantity: 100,
      category: "Sports & Leisure",
      subcategory: "Sports Equipment",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Three",
      isDeleted: false,
    },
    {
      title:
        "A Thousand Feasts: a joyful new memoir on the pleasures of food, travel and gardening from the Sunday Times bestselling author",
      content: `From award-winning writer Nigel Slater, comes a new and exquisitely written collection of notes, memoir, stories and small moments of joy.

'Nigel Slater’s prose is the rarest delicacy of all: exquisite yet effortless, filled with heart, tenderness, yearning and humour' ELIZABETH DAY

For years, Nigel Slater has kept notebooks of curiosities and wonderings, penned while at his kitchen table, soaked in a fisherman’s hut in Reykjavik, sitting calmly in a moss garden in Japan or sheltering from a blizzard in a Vienna Konditorei.

These are the small moments, events and happenings that gave pleasure before they disappeared. Miso soup for breakfast, packing a suitcase for a trip and watching a butterfly settle on a carpet, hiding in plain sight. He gives short stories of feasts such as a mango eaten in monsoon rain or a dish of restorative macaroni cheese and homes in on the scent of freshly picked sweet peas and the sound of water breathing at night in Japan.

This funny and sharply observed collection of the good bits of life, often things that pass many of us by, is utter joy from beginning to end.`,
      image: {
        url: "https://m.media-amazon.com/images/I/61wrNVncbxL._SL1500_.jpg",
        alt: "A Thousand Feasts",
      },
      price: "10",
      quantity: "100",
      category: "Books & Media",
      subcategory: "Books",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business One",
      isDeleted: false,
    },
    {
      title:
        "BEST LEARNING Mushroom Garden - Interactive Educational Light-Up Toddler Toys for 1 to 3 Years Old Infants & Toddlers - Colors, Numbers, Games & Music for Kids - Ideal Baby Toy",
      content: `<ul>
      <li>MULTI AWARDS WINNING FUN LEARNING TOY - Family Choice Award Winner, Mom's Choice Gold Metal, Tillywig & Academics' Choice Brain Child Award Winner! Creative Chile Preferred Choice and Creative Play of the Year Awards Winner! Innovative and educational. Rock It! Roll It! Spin It! Great fun for toddlers and children.</li>
      <li>BEST GIFT IDEAS for toddler boys and girls. Early educational toy with colourful light-up mushrooms to learn numbers, colours and play music.</li>
      <li>MEMORY GAMES - As the colourful mushrooms light up, pay attention to the patterns and follow it. The patterns get longer as you progress!</li>
      <li>SPOIL YOUR TODDLER & PACK THEM UP WITH SKILLS including numbers, colours, music, hand and eye co-ordination, creativity and imagination, logical thinking, motor functions, concentration, problem solving, dexterity and memory.</li>
      <li>ENGAGING, FUN & RISK - FREE! Intended for 1 to 5 years old toddlers and early learners backed by our parent-approved peace-of-mind guarantee! What are you waiting for? Requires 3 AA batteries (alkaline batteries included).</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/61uxTqnVT6L._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Interactive Educational Light-Up Toddler",
      },
      price: "24",
      quantity: 100,
      category: "Toys & Games",
      subcategory: "Children's Toys",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Two",
      isDeleted: false,
    },
    {
      title:
        "Philip Jones Silver Plated Solitaire Created with Zircondia® Crystals",
      content: `<ul>
      <li>Made with Trust. Silver Plated Solitaire Friendship Set Created with Zircondia Crystals by Philip Jones. Buy with confidence with our 12-month manufacturer warranty and 30-day money back guarantee if you are not 100% happy with your Set.</li>
      <li>Made with Style. Stylish and fashionable Set from The Philip Jones Jewellery Collection. Classic and contemporary pieces with a luxe finish.</li>
      <li>Made to Last. Our jewellery is crafted from high quality materials and our rigorous quality control checks mean it is designed to be worn daily. Each item is tested to ensure compliance with stringent EU regulations.</li>
      <li>Made for Giving. Philip Jones Sets are presented in a luxurious branded pouch making it an ideal gift idea for Birthdays, Anniversaries, Mother’s Day or Christmas.</li>
      <li>Made for Value. Philip Jones aims to make luxurious, elegant, and fashion forward sets available for all. Our sourcing experts strive to deliver high quality jewellery at affordable prices.</li>
      </ul>`,
      image: {
        url: "https://m.media-amazon.com/images/I/51CYcmwjm4L._AC_UL480_FMwebp_QL65_.jpg",
        alt: "Philip Jones Silver Plated Solitaire",
      },
      price: "16",
      quantity: "100",
      category: "Jewelry & Watches",
      subcategory: "Jewelry",
      limitedTimeDeal: "",
      voucher: "",
      voucherCode: "",
      brand: "",
      brandName: "",
      discount: "",
      discountPercentage: "",
      promotionMessage: "",
      promotionMessageText: "",
      businessName: "Business Three",
      isDeleted: false,
    },
  ],

  mainCategories: {
    "Clothing & Fashion": ["Men", "Women", "Kids"],
    "Electronics & Appliances": ["Smartphones", "Computers", "Home Appliances"],
    "Home & Garden": ["Furniture", "Home Accessories", "Gardening"],
    "Beauty & Health": ["Personal Care", "Cosmetics", "Supplements"],
    "Sports & Leisure": [
      "Sportswear",
      "Sports Equipment",
      "Outdoor Activities",
    ],
    "Books & Media": ["Books", "Music", "Movies"],
    "Toys & Games": ["Children's Toys", "Educational Games", "Puzzles"],
    "Jewelry & Watches": ["Jewelry", "Watches", "Accessories"],
    "Food & Beverages": [
      "Food Products",
      "Alcoholic Beverages",
      "Organic Food",
    ],
    "Gifts & Events": ["Gifts", "Holiday Items", "Event Decorations"],
  },
};
