// Translatable strings and rich content

const base = {
  site_name: 'Anna Nogaré',
  site_title: 'Anna Nogaré; Interpretive Design Director & Accessibility Strategist, CPACC',
  site_description: 'Creating experiences we give a damn about.',
  skiplink_aria_label: 'Skip to main content',
  navigation_aria_label: 'Main navigation',
  menu_dialog_aria_label: 'Menu dialog',
  menu_button_aria_label: 'Toggle menu dialog',
  footer_aria_label: 'Footer navigation',
  menu_sections: ['projects', 'manifesto', 'about', 'services', 'resources', 'contact'],
  menu_projects: ['shifting-image', 'maker-park', 'family-exhibits', 'vanishing', 'cruquius-museum', 'joh-enschede', 'herman-boerhaave', 'living-planet', 'badge-academy', 'parassita', 'canon', 'het-steen', 'middelen-meter', 'prodemos', 'interplanetary'],
  footer_socials: ['linkedin', 'behance'],
  badge_about_title: 'Learn more about me',
  badge_contact_title: 'Get in touch!',
  badge_manifesto_title: 'Read Accessibility Manifesto',
  button_resources_title: 'Back to resources',
  selected_projects_title: 'Selected Projects',
  awards_title: 'Awards',
  recognitions_title: 'Recognition',
  credits_title: 'Credits',
  project_cta_quote: 'Explore the next project or drop me a message.',
  project_overview_quote: 'More projects on <a href="https://www.behance.net/annanogar" target="_blank" rel="noopener nofollow">Behance</a>.',
}

const socials = {
  linkedin: { href: 'https://nl.linkedin.com/in/anna-nogar%C3%A8-27948048', title: 'LinkedIn' },
  behance: { href: 'https://www.behance.net/annanogar', title: 'Behance' },
}

const alts = {
  'misc/anna-dots_1x1': 'Anna Nogaré facing the camera with colorful dot projections on her face and shirt, against a dark background.',
  'misc/anna-leaning-forward_1x1': 'Anna Nogaré leaning forward at a table with sticky notes, listening while a man writes in the background.',
  'misc/service-gradient-1_1x1': 'A smooth, fluid abstract gradient of luminous colors. A prominent band of magenta and hot pink sweeps diagonally through the centre, transitioning from bright cyan and purple in the top-left to deep navy blue and dark red in the bottom-right. The lighting gives it a soft, neon glow.',
  'misc/service-gradient-2_1x1': 'An abstract digital gradient composed of bold diagonal color bands. It transitions smoothly from a warm peach-orange in the top-left to soft pink and violet. The bottom-right features a dramatic contrast of deep royal blue, followed by a dark shadow and a final, sharp streak of crimson.',
  'misc/service-gradient-3_1x1': 'A textured abstract gradient with a distinct, grainy, paper-like finish. Bright bands of yellow, orange, red, and pink sweep diagonally across the frame from the bottom-left toward the top-right. This warmth is balanced by a soft expanse of sky blue in the bottom-right.',
  'misc/vintage-telephone_1x1': 'An antique-style telephone with a wooden base and silver metal handset against a dark blue background. (Image copyright: Pawel Czerwinski via Unsplash)',
  'misc/wheelchair-sign_1x1': 'Stylized wheelchair symbol painted on asphalt, with a small bouquet of flowers placed in the figure’s hands. (Image copyright: Robert Harkness via Unsplash)',
  'misc/yall-means-all_1x1': 'Rainbow-striped Pride flag with bold white text reading “Y’all Means All!” hanging inside a window. (Image copyright: Megan Bucknall via Unsplash)',
  'projects/badge-academy/01_2x1': 'Illustration of a diverse group of colourful cartoon characters, including a tall red-haired figure, a girl with braids, an old man with a walker, an old lady with an air balloon, a blue-skinned man and a petite pink-haired woman, gathered together on a dark blue background.',
  'projects/badge-academy/02_1x1': 'A person’s hands holding a smartphone in a red case, displaying the Badge Academy app splash screen with the Dutch Police logo, bold yellow title, and illustrated cast of characters.',
  'projects/badge-academy/03_1x1': 'Smartphone mockup on a dark blue background showing the Badge Academy app splash screen, with the Politie logo at the top, a bold yellow comic-style title, a graduation cap, and the full illustrated cast of characters.',
  'projects/badge-academy/04_2x1': 'Illustration of six colourful cartoon characters of varying ages standing in a row, including a pink figure with a balloon, a green character with a walker, a tall figure in green, and a girl with braids, on a dark blue background.',
  'projects/badge-academy/05_2x1': 'Four smartphone screens showing the Badge Academy app structure: a location hub with Academie, Bureau, and Locker; the Academie sub-menu with first aid, administration, and investigation modules; a Bureau mission schedule with timed tasks; and the Locker screen with collectable badges and equipment.',
  'projects/badge-academy/06_1x1': 'Illustration of a Dutch Politie police car with red and blue markings, surrounded by orange traffic cones on a road with green trees in the background.',
  'projects/badge-academy/07_1x1': 'Badge Academy app logo: bold yellow comic-style lettering with a dark shadow on a blue circle, with the white Police torch-and-shield logo above.',
  'projects/badge-academy/08_2x1': 'Three smartphones showing Badge Academy Bureau content: a video of a police officer at the wheel of a patrol car, a chat-style screen with tips from three instructors in Dutch, and a loading screen with an animated blue police siren.',
  'projects/badge-academy/09_2x1': 'Three smartphones showing the “Schakel het gevaar uit” shooting mini-game, with a landscape intro screen and two portrait screens showing orange and teal illustrated robot-like figures, one holding a weapon.',
  'projects/badge-academy/10_1x1': 'Illustration of a jointed wooden crash-test dummy shrugging with arms spread, standing in front of a blue illustrated police academy building with a football pitch and running track.',
  'projects/badge-academy/11_1x1': 'Illustration of a lanky, sullen teal cartoon character in a white vest and rust-red shorts, standing in a residential street with blue apartment blocks against a magenta circle.',
  'projects/badge-academy/12_2x1': 'Four smartphones showing the “Verleen Eerste Hulp” first-aid mini-game, with an injured illustrated character in various states of distress across the screens and three selectable response items: a first aid kit, a bandage, and a cup at the bottom.',
  'projects/badge-academy/13_2x1': 'Four smartphones showing the “Verdedig jezelf” self-defence mini-game, with a small angry orange cartoon character with wild red hair and a briefcase appearing across all screens in escalating confrontation poses.',
  'projects/badge-academy/14_1x1': 'Illustration of a scowling orange cartoon character with red hair and a briefcase, standing in front of a blue bank building against a green circle on a dark blue background.',
  'projects/badge-academy/15_1x1': 'Illustration of a tall red-haired cartoon character in a green striped jumper opening a blue locker, with a small hand cheerfully waving from inside.',
  'projects/badge-academy/16_2x1': 'Three smartphones showing the Plankgas naar de overval driving mini-game: a comic-style landscape intro screen with the red-haired villain, a top-down street scene with barriers and a stop sign, and a 3D first-person driving view with directional controls.',
  'projects/badge-academy/17_2x1': 'Four smartphones showing the “Wat te doen” decision-making mini-game, featuring a green cartoon character in different scenarios: playing baseball, reporting a burglary, and jaywalking, with three action options at the bottom.',
  'projects/badge-academy/18_1x1': 'Illustration of a small green cartoon character wearing a sports headband and using a walking frame, standing in a dimly lit home interior with a yellow circle in the background.',
  'projects/badge-academy/19_1x1': 'Illustration of a smiling pink cartoon character meditating with eyes closed, holding a colourful striped balloon, with a thought cloud above its head and a boxing ring in the dark blue background.',
  'projects/badge-academy/20_2x1': 'Illustration of three mobile phones showing different screens of a detective game against a blue background. The screens display the Dutch text “Zoek het bewijs!”, a 3D room, and a mini-game featuring a dark blue bottle with a red stain.',
  'projects/badge-academy/21_2x1': 'Illustration of four mobile phones showing a sequence from a running game against a blue background. The screens display the Dutch title “In de achtervolging!” and follow a character with long braids chasing a pink grandmother holding a striped balloon.',
  'projects/badge-academy/22_1x1': 'Illustration of a yellow-skinned cartoon character with long braids, glasses, and red headphones. In the background, a blue bank building stands before a massive textured orange sun against a dark night sky.',
  'projects/badge-academy/23_1x1': 'A stylised monochromatic blue illustration of a dimly lit, messy office room. A baseball bat sits on top of stacked books on a large desk, surrounded by scattered items like a pistol, a bottle, an axe, and a single lit candle.',
  'projects/badge-academy/24_2x1': 'Illustration of three mobile phones displaying a case-sorting game interface against a blue background. The screens feature the Dutch text “Orden het bewijs!” alongside yellow “Top secret” folders containing suspect photos, fingerprints, and evidence.',
  'projects/badge-academy/cover_3x1': 'Close-up of a rain-wet Dutch police (Politie) vest, showing the force’s torch-and-shield logo and yellow reflective stripe across the back.',
  'projects/badge-academy/thumbnail_1x1': 'A person’s hands holding a smartphone in a red case, displaying the Badge Academy app splash screen with the Dutch Police logo, bold yellow title, and illustrated cast of characters.',
  'projects/canon/01_2x1': 'A front view of an open laptop sitting on a white surface against a soft grey-blue backdrop. The screen displays the Canon Professional Network website, showcasing a technical article titled “Flying high: filming an air display with the EOS C700” with a photo of a pilot inside a cockpit.',
  'projects/canon/02_1x1': 'A clean, graphic logo centred on a dark charcoal gradient background. It features the bold, whitestylised acronym “CPN“” with “Canon Professional Network” printed directly underneath in a sans-serif font, accompanied by a distinct red dot on the right side.',
  'projects/canon/03_1x1': 'A Canon mirrorless camera body resting on a rough, textured stone surface outdoors during the warm light of golden hour. The camera lens is removed, clearly exposing the reflective internal image sensor, with a blurred rocky landscape in the background.',
  'projects/canon/04_2x1': 'Three black tablets arranged in a row against a light grey background, displaying consecutive pages of a digital article from the Canon website. The layout highlights fine-art photography, featuring text blocks alongside creative portraits of women in unique settings.',
  'projects/canon/05_2x1': 'Three black tablets side-by-side displaying an online editorial article. The digital pages combine columns of text with documentary photography, including a poignant image of a woman cradling a small child on the left tablet, and a group of white doves in flight on the other screens.',
  'projects/canon/06_1x1': 'A desktop computer monitor showing a webpage under the “Inspiration” section of the Canon Professional Network site. The main focus of the screen is a wide banner image featuring a group of smiling people gathered together outdoors.',
  'projects/canon/07_1x1': 'A desktop monitor displaying a website biography page. The upper half of the screen features a large, horizontal photograph of a woman wearing a patterned headscarf standing on a rocky hillside that overlooks a dense, widespread city below.',
  'projects/canon/08_2x1': 'Three black tablets arranged side-by-side showcasing a multi-page digital profile layout. The pages display a combination of biographical paragraphs and prominent documentary images, including a portrait of a young girl looking out through a rain-streaked glass window.',
  'projects/canon/cover_3x1': 'A close-up shot of a hand securely holding a black Canon EOS R50 mirrorless camera fitted with an RF-S 18-45mm lens. The user’s index finger is poised over the shutter button, and the thumb rests near the top control dials, set against the green fabric of a jacket.',
  'projects/canon/thumbnail_1x1': 'A front view of an open laptop sitting on a white surface against a soft grey-blue backdrop. The screen displays the Canon Professional Network website, showcasing a technical article titled “Flying high: filming an air display with the EOS C700” with a photo of a pilot inside a cockpit.',
  'projects/cruquius-museum/01_2x1': 'Woman ascending a staircase inside the museum, with typographic quotes from 17th-century poetry and documents displayed on the surrounding walls.',
  'projects/cruquius-museum/02_1x1': 'Two visitors standing in front of a large projected historical illustration of the Cruquius pumping station, part of the museum’s narrative on land reclamation.',
  'projects/cruquius-museum/03_1x1': 'Close-up of a hand interacting with a digital map showing historical topography, part of an interactive display explaining the geography of Haarlemmermeer.',
  'projects/cruquius-museum/04_2x1': 'Museum visitor exploring a display case containing navigation instruments, maps, and archaeological artifacts, with a touch screen integrated into the surface.',
  'projects/cruquius-museum/05_2x1': 'Panoramic view of the gallery featuring an immersive wall projection of historical maps and a portrait of King Willem I, with visitors engaging with the exhibits.',
  'projects/cruquius-museum/06_1x1': 'Woman interacting with a digital touchscreen in front of a large decorative map, using the interface to explore historical information.',
  'projects/cruquius-museum/07_1x1': 'Two visitors interacting with a long display table featuring historical navigation tools, ceramic artifacts, and a digital map interface, in a gallery combining exposed brick and museum lighting.',
  'projects/cruquius-museum/08_2x1': 'Woman examining a large wall-mounted visual timeline that traces the development of steam technology from 1643 onward, featuring historical texts and illustrations.',
  'projects/cruquius-museum/09_2x1': 'Child peering into a reconstructed boiler installation, while two other children in the foreground use audio handsets to explore the exhibit in the “Boiler Room” section.',
  'projects/cruquius-museum/10_1x1': 'Young boy using a touchscreen embedded in a wall panel to learn about the properties and transformations of steam.',
  'projects/cruquius-museum/11_1x1': 'Child interacting with a horizontal touchscreen table, placed in front of a large infographic panel showing engineering data and historical timelines of the pumping station.',
  'projects/cruquius-museum/12_2x1': 'Children interacting with tall, black cylindrical structures that present historical information about steam power, surrounded by other exhibits and timeline graphics.',
  'projects/cruquius-museum/13_2x1': 'Three children closely examining a hands-on model of a steam engine, focusing on its moving mechanical parts.',
  'projects/cruquius-museum/14_1x1': 'A young woman observing a detailed infographic display with historical data, diagrams, and scale models related to the Cruquius pumping station and its steam engines.',
  'projects/cruquius-museum/15_1x1': 'Visitor standing near the massive Cruquius engine installation, surrounded by large iron components and a spiral staircase inside the museum.',
  'projects/cruquius-museum/16_2x1': 'Children seated at a long interactive counter, experimenting with steam engine models, assisted by a woman under a “Stoomlab” sign in the background.',
  'projects/cruquius-museum/cover_3x1': 'Entrance to the Cruquius Museum featuring exposed brick walls and illuminated signage, with a blurred figure walking through the doorway.',
  'projects/cruquius-museum/thumbnail_1x1': 'Museum visitor exploring a display case containing navigation instruments, maps, and archaeological artefacts, with a touch screen integrated into the surface.',
  'projects/family-exhibits/01_2x1': 'Wide view of the archaeological gallery, with large amphora replicas, touchscreen tables, and animated projections illustrating layers of earth and excavation scenes.',
  'projects/family-exhibits/02_1x1': 'Two young girls interacting with a sand-textured touchscreen interface, part of a digital digging game that simulates uncovering buried artifacts in different soil layers.',
  'projects/family-exhibits/03_1x1': 'Close-up of a girl using a circular interactive screen that mimics ancient decorative patterns, part of an archaeology-themed activity about reconstructing cultural objects from fragments.',
  'projects/family-exhibits/04_1x1': 'Two teenagers engaging with a large horizontal touchscreen as part of an interactive archaeological game, set within a gallery where colorful stratigraphic layers are projected on the walls to simulate excavation contexts.',
  'projects/family-exhibits/05_1x1': 'A toddler inserting a puzzle piece into a large interactive ceramic-alike amphora, part of a hands-on archaeological activity, while an adult woman looks on.',
  'projects/family-exhibits/06_2x1': 'Boy and father engaging with an interactive table game where participants place their hands over specific object replicas to trigger animated projections on the wall, revealing excavation layers and archaeological timelines.',
  'projects/family-exhibits/07_1x1': 'Children using a multi-user touchscreen to uncover virtual artifacts in a digging-themed game, while parents look on, in a gallery designed to simulate a layered archaeological dig site.',
  'projects/family-exhibits/08_1x1': 'Young girl smiling while playing with a tactile puzzle on a large amphora replica, part of an interactive installation that invites children to reconstruct broken archaeological artifacts.',
  'projects/family-exhibits/09_2x1': 'A child interacting with replicas of ancient artifacts on a round table; wall projections above respond with animated historical scenes and layers representing excavation contexts. Two adult men are observing the game.',
  'projects/family-exhibits/10_2x1': 'Wide view of a gallery with immersive underwater projections covering the walls; traditional fishing tools, props and interactive screens are arranged on display, and a large stylized pearl shell sits at the center.',
  'projects/family-exhibits/11_1x1': 'Young girl sitting playfully inside a large sculpted pearl shell in the middle of the gallery, surrounded by vivid marine-themed projections.',
  'projects/family-exhibits/12_1x1': 'Three children roleplaying a traditional cooking activity, using tongs to place toy fish over a simulated grill lit with glowing red light to mimic fire.',
  'projects/family-exhibits/13_2x1': 'Child and adult woman exploring an interactive touch display set into a counter, with vibrant coral reef animations projected on the surrounding gallery walls.',
  'projects/family-exhibits/14_1x1': 'Young girl standing in front of a wall display featuring brightly lit circular windows, each showcasing a different sea creature linked to the marine life of the Gulf.',
  'projects/family-exhibits/15_1x1': 'Close-up of a touchscreen game interface with a grid of numbered pearl illustrations, inviting visitors to find the most precious pearl known as the Dana or Jiwan.',
  'projects/family-exhibits/16_1x1': 'Two girls engaging with a digital touchscreen embedded under a large wooden dhow model, exploring pearl-themed interactive content with projected coral reef graphics.',
  'projects/family-exhibits/17_1x1': 'Young boy exploring a large boat model beneath a sail-shaped screen projecting a pearl diving scene, opening side compartments to discover the vessel’s interior features.',
  'projects/family-exhibits/18_2x1': 'Three children using large interactive wooden oars, simulating the rowing experience of pearl divers in a boat installation surrounded by an underwater environment.',
  'projects/family-exhibits/19_1x1': 'Wide view of an immersive energy-themed room with glowing floor tiles and colorful wall graphics depicting Qatar’s energy landscape and infrastructure.',
  'projects/family-exhibits/20_1x1': 'Two children and an adult joyfully interacting with an illuminated game floor, triggering projected animations and feedback related to Qatar’s energy journey.',
  'projects/family-exhibits/21_1x1': 'Child scanning colorful 3D-printed plastic objects shaped like consumer goods using a handheld barcode scanner at an interactive wall.',
  'projects/family-exhibits/22_1x1': 'Group of children standing barefoot on a glowing interactive floor, focusing on triggering visual responses through movement.',
  'projects/family-exhibits/23_2x1': 'Illuminated interactive floor displaying a stylized map of Qatar, with LED-lit illustrations on the wall representing national energy sources. A rainbow-colored screen above the floor provides game instructions in Arabic.',
  'projects/family-exhibits/cover_3x1': 'Exterior view of the National Museum of Qatar, with its iconic interlocking disc design and water features, seen through an artistic sculptural installation in the foreground.',
  'projects/family-exhibits/thumbnail_1x1': 'Children using a multi-user touchscreen to uncover virtual artifacts in a digging-themed game, while parents look on, in a gallery designed to simulate a layered archaeological dig site.',
  'projects/herman-boerhaave/01_2x1': 'A young woman kneeling in front of a glass case containing a bronze bust, carefully observing the sculpture below a graphic wall that combines Herman Boerhaave’s name and stylized portrait.',
  'projects/herman-boerhaave/02_1x1': 'Two visitors standing side by side watching a large screen playing a video interview with English subtitles, in a gallery section centered on experimentation and scientific thought.',
  'projects/herman-boerhaave/03_1x1': 'Glass case displaying a decorative urn placed on a dark pedestal, accompanied by a colorful wall panel that presents contextual information about Boerhaave’s life and work in Leiden.',
  'projects/herman-boerhaave/04_2x1': 'A young woman leaning forward to read a display in a room filled with colorful graphics and scientific illustrations, while a man in the background engages with another exhibit.',
  'projects/herman-boerhaave/05_2x1': 'Two visitors observing a collection of scientific and medical instruments in glass cases, surrounded by vibrant graphic panels illustrating bedside practices and experimental methods.',
  'projects/herman-boerhaave/06_1x1': 'A man in a blue shirt using a tactile interactive station, with buttons and dials, in a gallery filled with historic scientific tools and instructional displays.',
  'projects/herman-boerhaave/07_1x1': 'A young woman carefully examining a historical thermometer encased in glass, set against a brightly colored wall display with interpretive text about Fahrenheit’s innovations.',
  'projects/herman-boerhaave/08_2x1': 'Museum visitor exploring an exhibit of glass-encased scientific instruments and apothecary tools, surrounded by stylized wall graphics referencing laboratory experimentation.',
  'projects/herman-boerhaave/09_2x1': 'Two museum visitors navigating a gallery on bedside teaching, featuring engraved medical scenes, information panels, and historic ceramic vessels inside glass displays.',
  'projects/herman-boerhaave/10_1x1': 'Young woman leaning over a display case to observe a historical scientific object, with detailed background illustrations and text highlighting the tool’s significance.',
  'projects/herman-boerhaave/11_1x1': 'Young man interacting with a botanical display that includes herbarium sheets and plant illustrations, framed by vivid green walls decorated with foliage motifs.',
  'projects/herman-boerhaave/12_2x1': 'Woman closely reading a glass case containing handwritten medical notes, with a backdrop of engraved portraits and a large wall illustration of a teaching scene.',
  'projects/herman-boerhaave/13_2x1': 'Three visitors inside a museum gallery featuring a finely crafted wooden dresser as a central exhibit, with a large family portrait and colorful illustrated walls displaying quotes and silhouettes, including a panel about Carl Linnaeus.',
  'projects/herman-boerhaave/14_1x1': 'Two young visitors conversing in front of a large illustrated wall showing Leiden’s historic botanical garden and university buildings, with nearby panels on botanical research.',
  'projects/herman-boerhaave/15_1x1': 'Close-up of four ornate apothecary jars labeled in Latin, each adorned with a decorative crest, arranged inside a glass display against a clean backdrop.',
  'projects/herman-boerhaave/16_2x1': 'Woman smiling as she observes a glass case displaying fine porcelain tableware, set within a gallery of vivid wall illustrations and a historic portrait hanging in the background.',
  'projects/herman-boerhaave/cover_3x1': 'Entrance area of the exhibition featuring a large wall graphic with the name “Herman Boerhaave” and a silhouette cutout, with a man standing in a dimly lit space beyond the entrance.',
  'projects/herman-boerhaave/thumbnail_1x1': 'Profile view of a man wearing a grey turtleneck sweater, looking at a tall antique wooden scientific instrument displayed inside a glass case. The background features a vibrant blue and orange graphic mural with museum text.',
  'projects/het-steen/01_2x1': 'Female visitor touching a vertical touchscreen display embedded in a large cabinet structure, revealing layered stories through artworks and animated content.',
  'projects/het-steen/02_1x1': 'Distant view of an immersive theatrical installation, with a woman seated in the foreground watching life-sized projections of actors in costume performing inside a recreated artist’s studio.',
  'projects/het-steen/03_1x1': 'Child seated among oversized wooden architectural models, gazing up in awe at a screen embedded in the wooden structure above.',
  'projects/het-steen/04_1x1': 'Woman looking up inside a vertical wooden structure with a digital ceiling screen displaying a kaleidoscopic architectural animation.',
  'projects/het-steen/05_1x1': 'Child interacting with a large touchscreen display embedded in a wooden exhibit structure, surrounded by architectural models and warm lighting.',
  'projects/het-steen/06_2x1': 'Woman exploring a room lined with life-size vertical screens, each presenting cultural stories and visuals from different neighborhoods of Antwerp.',
  'projects/het-steen/07_1x1': 'Woman using a large horizontal touchscreen map alongside a wooden scale model of Antwerp, in a sunlit room with tall windows.',
  'projects/het-steen/08_1x1': 'Woman and child inside an immersive panoramic projection room with floor-to-ceiling visuals of a car terminal and cargo ship.',
  'projects/het-steen/09_2x1': 'Woman and child engaging with a large interactive map table; both smiling and pointing to different elements on the digital surface in a warmly lit room.',
  'projects/het-steen/10_2x1': 'Woman interacting with a horizontal touchscreen exhibit focused on craftsmanship and local industry, featuring large visuals and text in a softly lit space.',
  'projects/het-steen/11_1x1': 'Woman standing in a dimly lit attic space, listening to an audio track through a handset while interacting with a touchscreen display embedded in a wooden podium.',
  'projects/het-steen/12_1x1': 'Two women and a child observing a large vertical digital display showing a high-resolution reproduction of a classical painting, inside a bright gallery space with tall windows.',
  'projects/het-steen/13_2x1': 'A child sits on the floor while a woman stands nearby, both immersed in an interactive installation where colorful visuals and texts about Antwerp’s creative industry are projected onto the floor and wall.',
  'projects/het-steen/cover_3x1': 'Parent and child closely examining the drawers of a historic wooden cabinet in a red-patterned room at Het Steen, discovering tactile and visual elements of Antwerp’s past.',
  'projects/het-steen/thumbnail_1x1': 'Woman and child engaging with a large interactive map table; both smiling and pointing to different elements on the digital surface in a warmly lit room.',
  'projects/interplanetary/01_2x1': 'A two-page infographic titled “Interplanetary” on a starry black background. It maps cosmic distance from Earth and local satellites on the left, past an asteroid belt, to distant star clusters on the right.',
  'projects/interplanetary/02_1x1': 'A close-up of the “Interplanetary” page, showing the bold white title text, an explanatory paragraph, and a data table converting space distances into kilometres, AU, light-years, and parsecs.',
  'projects/interplanetary/03_1x1': 'A close-up of a white page showing a honeycomb grid of space organisations connected above detailed engineering line drawings of the Orion spacecraft and Arkyd telescope.',
  'projects/interplanetary/04_2x1': 'A full two-page spread titled “Agreements” using a white background. It features large interlocking hexagon clusters to map connections between global space agencies, a historical timeline, and a blue investment bar chart.',
  'projects/interplanetary/05_2x1': 'A full two-page infographic titled “International Space Station” on a starry black background. It illustrates a spacecraft’s launch and orbital trajectory over Earth alongside a detailed technical drawing of the ISS.',
  'projects/interplanetary/06_1x1': 'A close-up of the ISS infographic, highlighting data charts that break down the station’s modules between US and Russian segments, astronaut schedules, and orbital stats against a black starry backdrop.',
  'projects/interplanetary/07_1x1': 'A close-up of a white page mapping the Deep Space Network. Blue lines connect Earth ground stations to satellite relays and chart space observatories ordered by their distance in astronomical units.',
  'projects/interplanetary/08_2x1': 'A full two-page spread titled “Communication.” It features a massive, intricate circular diagram of blue lines connecting global tracking antennas to satellites, space telescopes, and deep-space probes.',
  'projects/interplanetary/09_2x1': 'A full two-page infographic titled “The Solar System” on a black background. It features large, textured blue-and-white illustrations of Jupiter, Saturn, and their moons, alongside orbital flight paths of deep space probes.',
  'projects/interplanetary/10_1x1': 'Close-up of a book page featuring a starry black background with bright blue orbital diagrams mapping trajectories between Earth, Venus, and Mars, accompanied by educational text blocks about the interplanetary transport network and the Cassini-Huygens probe.',
  'projects/interplanetary/11_1x1': 'Angled view of an infographic page covered in a dense grid of tiny grey and black little planets labelled with alphanumeric codes. Three large planets callouts break up the grid to display data for the exoplanets Kepler-296d, KOI-3010.01, and Kepler-22b.',
  'projects/interplanetary/12_2x1': 'An open two-page book spread titled “The Milky Way.” The left page shows blue diagrams illustrating the conditions for life alongside a technical drawing of the Kepler Space Telescope. The right page displays a massive data grid of tiny dots cataloging stars and exoplanets.',
  'projects/interplanetary/13_2x1': 'An open two-page book spread titled “The Universe.” The right page features a large graphic of an expanding cone illustrating the timeline of the universe from the Big Bang onwards, paired with an electromagnetic spectrum timeline at the bottom. The left page shows text about cosmic distances and a diagram of the Hubble telescope.',
  'projects/interplanetary/14_1x1': 'Close-up of text and blue diagrams on a white book page detailing methods for measuring cosmic distances, specifically highlighting the scientific concepts of “Parallax” and “Standard candles.”',
  'projects/interplanetary/15_1x1': 'Minimalist view of the corner of a textured black page featuring white text that reads “4.9%” next to a small shaded square. Below it, a caption reads: “Only 4.9% of our Universe is composed of observable matter.”',
  'projects/interplanetary/16_2x1': 'High-angle shot of an open book with a minimalist black two-page spread. The left page features text under a “95.1%” heading explaining dark matter, while the right page is mostly blank, featuring only a small “4.9%” statistic about observable matter in the bottom corner.',
  'projects/interplanetary/17_2x1': 'Close-up of a computer monitor displaying retro, pixelated white text on a black screen. The screen is divided into a “TRANSMITTING:” column showing outbound messages to deep space probes, and a “RECEIVED:” column showing inbound confirmations.',
  'projects/interplanetary/18_1x1': 'A vertical digital graphic on a black background showing instructions titled “@ATLASDSN: HOW TO TWEET TO DEEP SPACE?”. The left side illustrates concentric planetary orbits with lines connecting Earth to six deep-space probes, while the right side lists the Twitter handles and distances for each spacecraft.',
  'projects/interplanetary/19_1x1': 'Black-and-white photo of an art installation. A line-art satellite dish and six spacecraft (Chandra, Kepler, Curiosity, Rosetta, Cassini, Voyager 1) are projected onto a brick wall under the handle @ATLASDSN. In the foreground, a computer monitor displays a live transmission log with usernames, timestamps, and signal power.',
  'projects/interplanetary/20_2x1': 'A clean digital graphic with white line-art on a black background. It shows a large satellite dish emitting signal lines that map directly to six labelled spacecraft: Chandra, Kepler, Curiosity, Rosetta, Cassini, and Voyager 1.',
  'projects/interplanetary/21_2x1': 'Two tablets side-by-side displaying Twitter posts on a dark background. The left screen shows a tweet by Marco Ferrari explaining how to interact with the art installation, while the right screen shows a tweet by Ivor Williams about live tweeting to Voyager 1, both accompanied by photos of the installation.',
  'projects/interplanetary/22_1x1': 'Digital graphic showing retro, white pixelated text on a black background under the header “TRANSMITTING:”. It logs outbound transmissions from users to deep space missions, including Curiosity, Rosetta, Cassini, Voyager 1, and Kepler, listing exact timestamps and signal power in kilowatts.',
  'projects/interplanetary/23_1x1': 'Digital graphic showing retro, white pixelated text on a black background under the header “RECEIVED:”. It displays logs of incoming tweets containing short messages, target spacecraft handles, timestamps, and kilowatts received.',
  'projects/interplanetary/24_2x1': 'Black-and-white photograph of an art installation room. An interactive display mapping a satellite dish to deep space probes is projected on a brick wall. In the foreground, a computer monitor shows data logs next to a seated person using their smartphone.',
  'projects/interplanetary/cover_3x1': 'A panel composed of 2 images. On the left: a minimalist white book cover titled “Atlas of Contemporary Networks,” listing scientific topics vertically. On the right, a retro terminal screen displaying a data log of power commands transmitted to the Curiosity, Rosetta, and Cassini spacecraft.',
  'projects/interplanetary/thumbnail_1x1': 'Angled shot of a book cover with an off-white background. Black text lists words like “Human,” “Machine,” “Flora,” “Fauna,” and “Interplanetary” in a descending stepped pattern, ending with the bold title “Contemporary Networks.”',
  'projects/joh-enschede/01_1x1': 'Display on bookmaking, featuring a historical printing press surrounded by books and miniature figures, with suspended printed pages above and colorful stained glass at the back.',
  'projects/joh-enschede/02_1x1': 'Typography-themed station with metal type installations hanging overhead, display cases with printing materials below, and stained glass windows adding depth to the gallery.',
  'projects/joh-enschede/03_1x1': 'Banknote station with large printing rollers suspended above a display case of financial documents, set against an exposed brick wall and vibrant stained glass inspired by currency design.',
  'projects/joh-enschede/04_1x1': 'Interactive station with antique tools and a touchscreen, set against a stained glass window featuring collage-style banknote imagery and historical references.',
  'projects/joh-enschede/05_1x1': 'Close-up of a vibrant stained glass window featuring a collage of portraiture, patterns, and typographic elements from Dutch banknotes and various printed motifs and patterns.',
  'projects/joh-enschede/06_1x1': 'Display case containing metal printing tools and lead type molds, beneath a mounted infographic panel explaining the process of making lead type.',
  'projects/joh-enschede/07_1x1': 'Two children wearing headphones and holding clipboards, engaging with an interactive exhibit on printing techniques and history.',
  'projects/joh-enschede/08_1x1': 'Woman engaging with a hands-on printing exhibit, pulling a lever on a wooden structure below a screen that explains how to set up and use a historical press.',
  'projects/joh-enschede/09_1x1': 'Two young women reading and discussing a book displayed on a glass-topped museum table, surrounded by other printing-related displays and exhibition graphics.',
  'projects/joh-enschede/10_1x1': 'Two boys interacting with an illuminated display table, one pointing to a printing-related exhibit beneath the glass, with educational diagrams about lead type in the background.',
  'projects/joh-enschede/11_2x1': 'Man and woman smiling as they engage with a digital screen embedded in a display table, surrounded by colorful exhibition elements and brick walls.',
  'projects/joh-enschede/12_1x1': 'Close-up of two visitors interacting with a touchscreen showing historical Dutch banknote specimens, pointing to enlarged images on the screen.',
  'projects/joh-enschede/13_1x1': 'Detailed view of a digital display featuring an interactive design tool, where a user is selecting security features for a banknote as part of an educational museum experience.',
  'projects/joh-enschede/14_1x1': 'Two young girls interacting with a touchscreen display in the museum, one pointing at the interface while the other attentively observes, with printing equipment visible in the background.',
  'projects/joh-enschede/15_1x1': 'Group of children gathered around a display case labeled “De Duitse stempelsnijder” (“The German Punchcutter”), observing and discussing its contents, with an adult guiding them.',
  'projects/joh-enschede/16_2x1': 'Close-up of two adults smiling and using an interactive digital screen labeled “Wealth in letters,” with a printing press and suspended sheets visible above.',
  'projects/joh-enschede/cover_3x1': 'Young man closely inspecting a backlit historical timeline of portraits and key events in the legacy of Joh. Enschedé, a Dutch printer of value documents.',
  'projects/joh-enschede/thumbnail_1x1': 'Group of children gathered around a display case labeled “De Duitse stempelsnijder” (“The German Punchcutter”), observing and discussing its contents, with an adult guiding them.',
  'projects/living-planet/01_2x1': 'Family of four gathered around a touchscreen in the natural history gallery, as the mother points toward a taxidermy animal in the exhibit, surrounded by a diverse array of mounted species.',
  'projects/living-planet/02_1x1': 'Taxidermy dingo displayed on a white platform, surrounded by bears and wild cat specimens in an open exhibition space.',
  'projects/living-planet/03_1x1': 'Young woman pointing toward a group of taxidermy animals while standing next to an interactive screen displaying species-related content.',
  'projects/living-planet/04_1x1': 'Young boy in a red t-shirt looking up in awe, surrounded by taxidermy animals in a white exhibition space.',
  'projects/living-planet/05_1x1': 'Woman wearing a face mask pointing toward an animal specimen while two young children lean over a low railing in a gallery filled with large taxidermy mammals.',
  'projects/living-planet/06_2x1': 'A cheetah and an African wild dog stand side by side on a display platform, surrounded by various birds and mammals.',
  'projects/living-planet/07_1x1': 'Teenage visitor wearing a mask and green checkered shirt, engaging with an angled touchscreen among mounted animal specimens.',
  'projects/living-planet/08_1x1': 'Close-up of a touchscreen interface titled “Vivre sur la Terre” (“Living on Earth”) with a visual network of animal images and taxidermy specimens in the background.',
  'projects/living-planet/09_2x1': 'Mother and young child standing in front of a deer specimen while the child gestures excitedly, with other visitors and animal displays in the background.',
  'projects/living-planet/10_2x1': 'Two young children exploring a yellow circular hands-on table with small animal models, including one placed on top, tactile elements, and circular openings.',
  'projects/living-planet/11_1x1': 'A woman seated at a circular yellow interactive station using a touchscreen surrounded by animal figures, with mounted taxidermy animals in the background.',
  'projects/living-planet/12_1x1': 'Child interacting with a touchscreen embedded in a curved table showing a game about identifying camouflaged animals, with taxidermy specimens displayed nearby.',
  'projects/living-planet/13_2x1': 'Adult and child interacting with a yellow circular hands-on table featuring small colored blocks inside a transparent dome, within a gallery of taxidermy animals.',
  'projects/living-planet/14_1x1': 'Two children examining yellow hands-on tables with circular openings and small animal models placed inside.',
  'projects/living-planet/15_1x1': 'Visitors gather around a large immersive projection showing abstract, colourful nature imagery and a white branching structure in the center.',
  'projects/living-planet/16_1x1': 'Wide view of a museum gallery with circular display platforms presenting taxidermy animals, interactive screens, and low yellow tables integrated among the specimens.',
  'projects/living-planet/17_1x1': 'Close-up of a touchscreen showing a Dutch-language interactive explaining how oceans produce oxygen, with visuals of phytoplankton and coral reefs.',
  'projects/living-planet/18_2x1': 'Curved wall projection displaying four large interactive touchscreens, each in front of a section of animated visuals representing different ecosystems, such as grasslands, forests, and ocean life.',
  'projects/living-planet/19_1x1': 'A woman stands in a dimly lit gallery space, interacting with a touchscreen in front of a natural history exhibit featuring an elk and a scenic tundra backdrop, with wolves and other animals displayed behind her and in the background.',
  'projects/living-planet/20_1x1': 'Close-up of a horizontal touchscreen showing an interface with a rainforest image, a location map, biodiversity stats, and a finger selecting one of the circular data points.',
  'projects/living-planet/21_1x1': 'A woman engaging with a large digital table displaying an interactive globe, surrounded by nature-themed projections of underwater vegetation and marine life.',
  'projects/living-planet/22_1x1': 'A woman standing in an immersive room with walls covered in large-scale projections of forest and mountain environments, surrounded by vivid color and light.',
  'projects/living-planet/23_2x1': 'Immersive installation showing high-resolution projections of a chipmunk on one wall and a grazing reindeer on the other, wrapping around freestanding structures in the space.',
  'projects/living-planet/cover': 'Wide-angle view of a gallery filled with taxidermy animals arranged along curved white arches, showcasing biodiversity across species and environments.',
  'projects/living-planet/thumbnail_1x1': 'Mother and young child standing in front of a deer specimen while the child gestures excitedly, with other visitors and animal displays in the background.',
  'projects/maker-park/01_2x1': 'Daytime view of Ilmi Center showing families and school children walking toward the iconic reflective sphere, surrounded by gardens and flowering trees.',
  'projects/maker-park/02_1x1': 'Portrait of a young boy smiling in traditional Saudi attire, representing the target audience of the educational initiative.',
  'projects/maker-park/03_1x1': 'Aerial night rendering of the Ilmi Center lit up against a dark desert landscape, with illuminated pathways and the luminous central sphere at the heart of the design.',
  'projects/maker-park/04_2x1': 'Front-facing rendering of Ilmi Center at dusk, showing visitors entering the museum through a tunnel-like entrance beneath the glowing orb.',
  'projects/maker-park/05_2x1': 'Colorful 3D illustration of a robot hands holding a smartphone displaying the “Maker Park” gate from the Ilmi app, with gamified learning visuals in the background.',
  'projects/maker-park/06_1x1': 'Cartoon robot wearing a green jersey with the number 1, cheerfully raising a golden trophy with confetti falling around, celebrating a game achievement on a bright blue background.',
  'projects/maker-park/07_1x1': 'A close-up, high-angle shot of a person holding a smartphone in their hands. The phone screen displays a vibrant, cartoonish game menu featuring a blue gated entrance, a green robot character, and Arabic text that reads “Maker Park.”',
  'projects/maker-park/08_2x1': 'A cheerful robot holds its face in surprise next to a floating game controller and a smartphone showing a colorful hexagonal map interface from the educational platform, all set against a vibrant gradient background.',
  'projects/maker-park/cover_3x1': 'Architectural rendering of Ilmi Center at sunset, featuring a glowing spherical structure at the center of a landscaped cultural park filled with visitors.',
  'projects/maker-park/thumbnail_1x1': 'A close-up, high-angle shot of a person holding a smartphone in their hands. The phone screen displays a vibrant, cartoonish game menu featuring a blue gated entrance, a green robot character, and Arabic text that reads “Maker Park.”',
  'projects/middelen-meter/01_2x1': 'Three smartphone screens showing the app onboarding flow: the initial loading screen, a welcome message with a “START” button, and a tutorial screen explaining how to use the circular time dial to select a usage moment.',
  'projects/middelen-meter/02_1x1': 'The substance selection screen (Step 1 of 4) in Dutch, asking “Wat wil je bijhouden?”. It features four large, color-coded buttons with text and icons for tracking: Alcohol (pink), Sigaretten (orange), Joints (green), and Slaappillen (blue).',
  'projects/middelen-meter/03_1x1': 'The time selection screen (Step 2 of 4) for alcohol tracking, asking “Wanneer dronk je?”. A large, interactive central circular dial is set to “dinsdag 25 okt. middag” with a sun icon, above a white “VERDER” button.',
  'projects/middelen-meter/04_2x1': 'Three variations of the time selection screen (Step 2 of 4) customised for different substances, showing specific questions and color-coded dials for tracking smoking cigarettes, smoking joints, or taking sleeping pills.',
  'projects/middelen-meter/05_2x1': 'Three screens showing the alcohol consumption setup: a grid overlay to select specific drinks (like bier, wijn, sterk), Step 3 of 4 to log the specific amount (1 “bier light” of 25 cl), and Step 4 of 4 to select a tracking duration from 1 to 4 weeks.',
  'projects/middelen-meter/06_1x1': 'A setup completion pop-up window reading “GOED GEDAAN!” with a checklist confirming the substance is chosen, the last usage is set, and the tracking plan is made, above a prominent pink “START” button.',
  'projects/middelen-meter/07_1x1': 'The main app dashboard on day 1 of 7, displaying the text “Vandaag” above a central pink plus icon and a large blue button that reads “NIETS GEDRONKEN DE HELE DAG” to quickly log a sober day.',
  'projects/middelen-meter/08_2x1': 'Three variations of the daily dashboard interface: the left shows logged alcohol entries (1 light beer and 4 glasses of wine), the centre shows the “sober today” button for alcohol, and the right shows a cigarette tracking screen confirming “Vandaag niets gerookt” with a smiley face.',
  'projects/middelen-meter/09_2x1': 'Three app pop-up screens: a reminder to accurately log all parts of the previous day, a pink congratulations screen with a smiley face for not drinking today, and a “HERINNER MIJ” window to set an alarm reminder for logging usage.',
  'projects/middelen-meter/10_1x1': 'The main app dashboard on day 3 of 7, displaying a progress bar, a central time-of-day selection dial, a pink plus button for custom logging, and a primary button that reads “NIETS GEDRONKEN DE HELE DAG”.',
  'projects/middelen-meter/11_1x1': 'An app screen titled “GEBRUIK PER DAG” showing a pink-themed weekly bar chart broken down by day parts (ochtend, middag, avond, nacht). A smiley face highlights a day with zero consumption, and a button link at the bottom reads “Aantal standaard glazen”.',
  'projects/middelen-meter/12_2x1': 'Three side-by-side variations of the “GEBRUIK PER DAG” weekly bar chart screen. Each showcases a different substance tracking color scheme: orange for cigarettes, green for joints, and blue for sleeping pills, with consumption broken down by morning, afternoon, evening, and night.',
  'projects/middelen-meter/13_2x1': 'Three side-by-side smartphone mockups displaying the “OVERZICHT” screen. The screens show various timeline views of alcohol and multi-substance tracking data across 1 week, 2 weeks, and 4 weeks using colored vertical bar charts.',
  'projects/middelen-meter/14_1x1': 'A hand holding a smartphone displaying the “OVERZICHT” dashboard screen. The interface shows a weekly bar chart comparing alcohol (pink bars) and cigarette (orange bars) usage data from October 24 to October 30.',
  'projects/middelen-meter/15_1x1': 'An informational screen within the app detailing alcohol measurements, titled “Standaardglas alcohol: 10g = 12.7ml pure alcohol”. Below the title is an illustrative grid displaying standard units and measurements for different drink types, including beer, wine, aperitifs, and spirits.',
  'projects/middelen-meter/16_2x1': 'Three smartphone mockups side-by-side displaying concluding app modals: a congratulations window asking to start a new tracking cycle, a help window with a button link reading “OP ZOEK NAAR HULP?”, and a reset confirmation screen warning that all data will be deleted.',
  'projects/middelen-meter/cover_3x1': 'Close-up of a smartphone screen displaying the dark blue splash screen of the “Middelen Meter” app, featuring a geometric mountain logo in pink, yellow, and blue with a loading spinner.',
  'projects/middelen-meter/thumbnail_1x1': 'The main app dashboard on day 1 of 7, displaying the text “Vandaag” above a central pink plus icon and a large blue button that reads “NIETS GEDRONKEN DE HELE DAG” to quickly log a sober day.',
  'projects/parassita/01_1x1': 'Three copies of “Parasita” magazine arranged together on a surface. Each issue features a unique black and white cover illustration, a human heart with pink text, a young girl’s portrait with yellow text, and a planetary space scene with teal text.',
  'projects/parassita/02_1x1': 'A close-up view of a magazine cover featuring a black and white line-art portrait of a young girl with wavy hair. The yellow title “parasita” is visible at the top right, and a black box with yellow text sits at the bottom.',
  'projects/parassita/03_1x1': 'An internal page of a magazine featuring a grayscale architectural drawing of clotheslines hanging outside a building structure. A bright yellow circular graphic symbol is overlaid near the bottom of the page.',
  'projects/parassita/04_1x1': 'A close-up shot looking down into the complex zine-style folding structure of an open magazine. The unique layout reveals glimpses of inner pages with text, illustrations, and a distinct concertina fold.',
  'projects/parassita/05_2x1': 'An open spread of a magazine laid flat on a table. The right page features bold, black typography stating “A magazine for Italians who live in Amsterdam & Dutch who love Italy,” alongside columns of article text and a diagram.',
  'projects/parassita/06_2x1': 'Several opened and closed issues of “Parasita” magazine scattered on a surface. Visible pages show an “Index set” roadmap diagram, a planetary space cover labeled “Water Part 3/3”, and the human heart illustration issue.',
  'projects/parassita/07_1x1': 'A fully unfolded, multi-panel editorial layout showcasing infographics. It features linear “Index set” and “This issue” timelines with numbered circular icons, graphic diagrams of a folding box, and small black and white photographs.',
  'projects/parassita/08_1x1': 'An infographic magazine spread printed in black, white, and a bright yellow block background. It reads “The only film couple who never quarrelled” and depicts a horizontal timeline of film titles, accompanied by comic-style portraits and a movie still.',
  'projects/parassita/09_1x1': 'A close-up, angled view of the cover of “Parasita” magazine, subtitled “Family”. It features a detailed black and white cross-section illustration of a human heart, with the title text printed in vibrant pink.',
  'projects/parassita/10_1x1': 'Cover of Parassita magazine, Part 3/3, titled “Water,” featuring a detailed black-and-white ink illustration of Saturn, a planetary surface, and a complex space probe.',
  'projects/parassita/11_2x1': 'Open magazine spread showing an article titled “Valeria and her moving Italian family” and an overlapping page titled “Guten Morgen Riccardo!” featuring a portrait of a bearded man holding an iPod.',
  'projects/parassita/12_1x1': 'Upside-down infographic layout comparing Venetian “Sarde in saor” and Dutch herring dishes, featuring description paragraphs, a regional map of Italy, and an illustration of a fish salad.',
  'projects/parassita/13_1x1': 'Infographic page detailing an interview and a vertical travel timeline from 1972 to today, tracking a family’s moves across global cities using interlocking colored circles.',
  'projects/parassita/14_2x1': 'Two overlapping infographic sheets; one is titled “Belli di mamma: The Italian youth” with a graphic of a person walking through a door, and the other is titled “Sea drilling: The Next Referendum.”',
  'projects/parassita/15_1x1': 'Infographic detail comparing data on young Italians living with parents (“Mama’s boys”, totalling over 9 million) versus those moving abroad (“Expat boys”, totalling over 54,000), with lists of reasons for each.',
  'projects/parassita/16_1x1': 'Detailed infographic map of Southern Italy and the Adriatic Sea, showing offshore hydrocarbon extraction zones marked with gridded patterns and data visualisation dots.',
  'projects/parassita/17_1x1': 'Infographic page with sections on Italian household types, global happiness rankings showing Italy at 50th, and 2014 - 2015 birth/death rates alongside illustrations of pasta and a mock bicycle rental receipt.',
  'projects/parassita/18_1x1': 'Infographic page featuring a large technical line drawing of a cruise ship, a map of the Venetian lagoon marking floodgate locations, and a diagram explaining how the Mose barrier works.',
  'projects/parassita/19_2x1': 'Infographic poster titled “The Mafia Famiglia” featuring a map of Italy color-coded by crime organisation territories and a black-and-white comic illustration depicting a mafia hierarchy chart.',
  'projects/parassita/20_2x1': 'An open infographic page titled “The Blue Italy” that maps out national weather phenomena. The page features a minimalist outline of Italy overlaid with red rain droplets, gray snow asterisks, and teal flood zones, accompanied by a detailed data legend on the right.',
  'projects/parassita/21_1x1': 'A close-up, angled shot of a printed timeline infographic. A thick black diagonal line acts as the main axis, marked with specific years, small circular country codes, and varying sizes of red circles that highlight social and political milestones with text blocks.',
  'projects/parassita/22_1x1': 'An angled look into the folds of an open infographic poster. The center features a prominent black-and-white ink illustration of two laughing women, surrounded by text columns detailing global facts and legal milestones.',
  'projects/parassita/23_2x1': 'A wide view of a large, geometric folded infographic spread. The left side features a bold coral-red circular graphic with text reading “...what do Italians think about this topic?”, while the right side displays a historical timeline and a black-and-white illustration.',
  'projects/parassita/24_2x1': 'A folded infographic spread mapping migration routes across the Mediterranean Sea to Italy, titled “Sea: a pass to Europe.” The layout combines a pale teal geographic map, a sequence of black proportional data circles, and fine lines showing transit paths from North Africa.',
  'projects/parassita/25_1x1': 'A detailed view of a migration map infographic showing the Mediterranean Sea. Teal circular hubs mark North African cities like Tripoli and Benghazi, with a dense web of connecting lines radiating northward toward Italian coastal arrival points.',
  'projects/parassita/26_1x1': 'An infographic panel titled “Europe, a pass to hope” regarding the 2015 migrant crisis. It features a green line drawing of one person helping another, a concentric green demographic ring chart, and a descriptive text column labeled “Who?”.',
  'projects/parassita/27_2x1': 'Three folded booklets stacked diagonally, each with a “parasita” logo in different colors (yellow, pink, teal) where the “s” and “i” form a wave, accompanied by black-and-white illustrations.',
  'projects/parassita/28_2x1': 'A graphic design diagram illustrating how to fold paper into a multi-page booklet. “Sheet 1” shows a flat page with dashed fold lines, while “Sheet 2” and “Sheet 3” show the final folded accordion structures. A three-color palette circle icon sits beneath each diagram.',
  'projects/parassita/29_1x1': 'A minimalist black logo of the word “parasita” on a white background. The logo uses a clean, lowercase sans-serif typeface, with the letters “s” and “i” uniquely replaced by a continuous, looping vertical S-curve line.',
  'projects/parassita/30_1x1': 'A minimalist graphic icon featuring a black circular border on a white background. Inside the circle is an abstract, continuous line that twists into a vertical S-curve or fluid ribbon motif, representing the standalone brand mark derived from the “parasita” logo.',
  'projects/parassita/31_2x1': 'A graphic design diagram detailing a four-step assembly process for a folded booklet. “Step 1” through “Step 4” visually demonstrate how three separate components nest and fold together into a single, compact booklet.',
  'projects/parassita/cover_3x1': 'A cropped shot of three copies of “Parasita” magazine, stacked slightly overlapping. The title text is identical on all three, but colored differently in yellow, pink, and teal, over different black and white cover drawings.',
  'projects/parassita/thumbnail_1x1': 'Three copies of “Parasita” magazine arranged together on a surface. Each issue features a unique black and white cover illustration, a human heart with pink text, a young girl’s portrait with yellow text, and a planetary space scene with teal text.',
  'projects/prodemos/01_2x1': 'A girl smiles while another student films her using a tablet, capturing a scene for the interactive assignment indoors.',
  'projects/prodemos/02_1x1': 'Three girls stand in a tree-lined area, focused on a tablet screen as they work together on one of the GPS-based challenges.',
  'projects/prodemos/03_1x1': 'Three girls sit on a park bench, looking at a tablet together, one pointing at the screen as they discuss.',
  'projects/prodemos/04_1x1': 'Tablet screen showing a final congratulatory screen in Dutch with stars and a crown, marking the completion of the game.',
  'projects/prodemos/05_1x1': 'Tablet screen displaying the structure of the activity and tasks to complete, with headings and icons in purple on an orange background.',
  'projects/prodemos/06_2x1': 'A group of teenage students gathers in a leafy urban area, wearing red lanyards and name badges. Some are seated on a bench while others stand around them, smiling and holding tablets as part of an educational activity.',
  'projects/prodemos/07_1x1': 'Two girls stand on the sidewalk in front of a staircase, one holding a tablet and the other gesturing while talking, engaged in discussion.',
  'projects/prodemos/08_1x1': 'Four young men stand under a tree, gathered around a tablet, collaborating on a task during the outdoor activity.',
  'projects/prodemos/09_2x1': 'Close-up of a tablet screen showing a digital interface where users select a Dutch government minister as part of the game.',
  'projects/prodemos/cover_3x1': 'Five teenage girls walk side by side through a city street, smiling and chatting. They wear red lanyards with badges, and some hold tablets as part of an educational activity.',
  'projects/prodemos/thumbnail_1x1': 'Group of teenagers sitting and standing around a park bench, holding tablets and wearing event badges during an outdoor learning activity.',
  'projects/shifting-image/cover_3x1': 'Bust of Johan Maurits positioned in front of a wall covered with identical sculpted heads. Around the room, visitors observe large colonial paintings and immersive wall projections of tropical landscapes and ruins.',
  'projects/shifting-image/thumbnail_1x1': 'Close-up of a woman gazing at a large colonial painting depicting a noblewoman with children. The woman stands in a dark gallery lit by focused spotlights on the artworks.',
  'projects/shifting-image/01_2x1': 'Exhibition room with colonial portraits and a timeline wall. A large painting of a woman accompanied by a white child and a Black child dominates the foreground, while visitors quietly observe other paintings in the surroundings.',
  'projects/shifting-image/02_1x1': 'A woman interacts with a touchscreen display in front of a large, ornately framed portrait of Johan Maurits. In the background, projected images and a smaller portraits of two Black men are visible.',
  'projects/shifting-image/03_1x1': 'Close-up of a woman gazing at a large colonial painting depicting a noblewoman with children. The woman stands in a dark gallery lit by focused spotlights on the artworks.',
  'projects/shifting-image/04_2x1': 'Two women explore a gallery space featuring a detailed white architectural model and framed portraits of Black men. On the left wall, an exhibition timeline in Dutch and English provides historical context.',
  'projects/shifting-image/05_2x1': 'Gallery scene with a bust of Johan Maurits in the center, surrounded by wall-mounted colonial paintings and immersive projections of exotic landscapes. Several visitors explore the room independently.',
  'projects/shifting-image/06_1x1': 'White architectural model of a classical building, made of imitation sugar cubes and displayed under a spotlight. The model sits on a circular base covered in loose sugar cubes, all set within a dark exhibition room.',
  'projects/shifting-image/07_1x1': 'A woman stands closely in front of a large colonial portrait of a white woman accompanied by a Black servant. Projected market scenes and paintings are layered across the back wall.',
  'projects/shifting-image/08_2x1': 'Side view of a woman reading from a touchscreen next to a large white architectural model of a neoclassical building, made of imitation sugar cubes. The installation is surrounded by a base of loose sugar cubes and illuminated in a dark room.',
  'projects/shifting-image/09_2x1': 'Panoramic view of the exhibition room with a timeline wall, large projected colonial portraits, and a seated visitor. The bust of Johan Maurits appears in the foreground, partially turned.',
  'projects/shifting-image/10_1x1': 'Bust of Johan Maurits in a spotlight, set against a textured wall covered in repeating versions of the same sculpted face. The statue’s elaborate military uniform and expression are clearly visible.',
  'projects/shifting-image/11_1x1': 'A young woman stands in front of a series of framed landscape paintings, attentively engaging with a touchscreen. Projected scenes of natural environments extend across the walls in the background.',
  'projects/shifting-image/12_2x1': 'Interactive panel titled “Wat vraagt u zich af?” (“What would you like to know?”) invites visitors to reflect on the legacy of Johan Maurits and colonial history, featuring a mix of Dutch and English explanatory text and survey questions.',
  'projects/vanishing/01_2x1': 'Screenshot of the 3D interactive extinction data visualisation on a laptop, showing 14,448 endangered species plotted as coloured geometric shapes in a dark virtual space, with species names and a legend visible`',
  'projects/vanishing/02_1x1': 'Close-up of a hand using Leap Motion gesture control above a laptop keyboard, navigating the 3D extinction visualisation on screen, with species names and coloured shapes visible`',
  'projects/vanishing/03_1x1': 'A person’s hand resting on top of a Leap Motion device near a MacBook trackpad while the screen shows the colourful extinction data visualisation with geometric shapes representing animal species.',
  'projects/vanishing/04_2x1': 'Laptop displaying the companion app’s onboarding screen for the 3D extinction visualisation, with illustrated hand gesture diagrams explaining Z-axis and X/Y-axis navigation controls, and a caption reading “Moving your hand, you can control the camera inside the visualisation”.',
  'projects/vanishing/05_2x1': 'Three Android smartphone screens showing the Deep into the Animal Extinction companion app: the first displays a navigation instruction with a hand gesture diagram, the second shows the species legend (Mammals, Birds, Amphibes, Fish), and the third shows a species detail page for the Amur Leopard marked as critically endangered.',
  'projects/vanishing/06_1x1': 'Laptop showing the companion app species detail page for the Wyoming Toad (Anaxyrus baxteri), with a white skeletal illustration, an “Extinct in the wild” status bar in red, a US map highlighting Wyoming, and species data including taxonomy, threats, and description.',
  'projects/vanishing/07_1x1': 'Laptop showing the companion app species detail page for a great white shark, with a white anatomical illustration on a dark background, a threat-level colour bar, and a world map indicating its range.',
  'projects/vanishing/08_2x1': 'Laptop displaying the companion app detail page for the Amur Leopard (Panthera Pardus Orientalis), showing a white skeletal illustration, critically endangered status bar, geographic range map, and taxonomic data on a dark background.',
  'projects/vanishing/09_2x1': 'Black screen with a thin white border and the white text “Not everything that vanishes does it silently” centred in the lower third, serving as a title card or intro screen for the sound sonification piece',
  'projects/vanishing/10_1x1': 'Video thumbnail showing the extinction data visualisation paused at the year 1996, with coloured geometric shapes representing Mammals, Birds, Amphibes, Fishes, and Reptiles scattered across a black screen, with a play button overlay.',
  'projects/vanishing/11_1x1': 'Still from the sound sonification piece showing the year 2013, with coloured geometric shapes spread across five animal class columns (Mammals, Birds, Amphibes, Fishes, Reptiles) on a black background.',
  'projects/vanishing/12_2x1': 'Black screen with white text reading: “Every ten seconds of what you will be hearing corresponds to the animal species entered in the Red List during that year. The years are those in which the Red List was updated.”',
  'projects/vanishing/13_2x1': 'Double-page spread from the Vanishing printed atlas showing the Camouflage chapter, with illustrated military vehicles, aircraft, tanks, and soldiers on the left and a full-bleed illustration of soldiers in combat camouflage on the right, printed in black and red on white.',
  'projects/vanishing/14_1x1': 'Close-up photograph of the printed atlas pages showing detailed black and red Risograph illustrations of military vehicles and equipment from the Camouflage chapter, with text annotations visible.',
  'projects/vanishing/15_1x1': 'Close-up of the printed Physical Identity atlas spread, showing a detailed black ink illustration of the Stalking Cat with tiger-like facial tattoos, with caption text and diagrams visible below.',
  'projects/vanishing/16_2x1': 'Double-page spread from the Physical Identity chapter of the Vanishing atlas, with large illustrated portraits of body-modified individuals, data panels on modification types, cosmetic surgery statistics, and gender reassignment steps, in black and red on white.',
  'projects/vanishing/17_2x1': 'Double-page spread from the Vanishing atlas showing the Anonymity chapter, with an illustration of a man looking at his phone on the left and an isometric maze-like labyrinth diagram of data networks on the right, in black and red on white.',
  'projects/vanishing/18_1x1': 'Close-up of printed Anonymity and Camouflage atlas spreads layered together, showing isometric labyrinth and network diagrams in red and black, a red wireframe face illustration, and a large illustrated figure in the foreground.',
  'projects/vanishing/19_1x1': 'Close-up of the printed Languages atlas spread, showing a dense red full-bleed text page overlapping white pages with isometric diagrams, endangered language maps, and data panels on causes of language loss and revitalisation.',
  'projects/vanishing/20_2x1': 'Double-page spread from the Languages chapter of the Vanishing atlas, with isometric diagrams illustrating causes of language endangerment, a map of endangered languages by nation, effect and solution icons, and a dense red dictionary-style text column.',
  'projects/vanishing/21_2x1': 'Double-page spread from the Extinction chapter of the Vanishing atlas, dominated by a large red-and-black illustration of an Amur Leopard with its skeleton visible, alongside an identikit data panel, cause-of-extinction icons, case studies of extinct species, and a mammoth cloning diagram.',
  'projects/vanishing/22_1x1': 'Close-up of the printed Extinction atlas spread, showing red-spotted leopard fur and skeletal illustration detail, with a small world map, Amur Leopard identikit portrait, and data labels for places, habitats, threats, and weight.',
  'projects/vanishing/23_1x1': 'Close-up photograph of the printed Universe atlas spread, showing a polar projection Earth map with red location markers on a black starfield background, with orbital lines, a Dead Sea diagram, and a whale illustration in the lower portion.',
  'projects/vanishing/24_2x1': 'Double-page spread from the Universe chapter of the Vanishing atlas, with a polar projection Earth map on a black starfield, text panels on cosmological phenomena, and landscape illustrations of endangered places including Venice, the Amazon, and the Maldives.',
  'projects/vanishing/cover_3x1': 'Two-panel image: the Vanishing atlas black hardcover with its chapter index in white diagonal text, alongside a hand over a MacBook keyboard displaying the colourful 3D animal extinction data visualisation.',
  'projects/vanishing/thumbnail_1x1': 'A person’s hand resting on top of a Leap Motion device near a MacBook trackpad while the screen shows the colourful extinction data visualisation with geometric shapes representing animal species.',
}

const sections = {
  home: {
    slug: 'home',
    href: '/',
    menu_title: 'Anna Nogaré',
    menu_aria_label: 'Back to homepage',
    card_title: 'Back to homepage',
    card_image: 'misc/anna-dots_1x1',
    textcard_title: 'Homepage',
    textcard_subtitle: 'Back to homepage',
    title: 'Creating experiences we give a damn about.',
    description: 'I lead and design inclusive experiences across digital, physical, and hybrid environments, from cultural institutions to product ecosystems, turning complex content into journeys that stick.',
    subtitle: 'I lead and design inclusive experiences across digital, physical, and hybrid environments, from cultural institutions to product ecosystems, turning complex content into meaningful journeys.',
    cta_quote: 'It’s not about <em>them</em> in the end. It’s about <em>all of us</em> from the very start.',
    cta_image: 'misc/anna-dots-1x1',
    cta_badge: { variant: 'bright', href: '/about/', title: base.badge_about_title },
    header_badge: { href: '/manifesto/', title: base.badge_manifesto_title },
  },

  about: {
    slug: 'about',
    href: '/about/',
    menu_title: 'About',
    menu_aria_label: 'Learn more about me',
    card_title: 'About me',
    card_image: 'misc/anna-dots_1x1',
    textcard_title: 'About me',
    textcard_subtitle: 'Learn more about me',
    title: 'About me',
    description: 'I’m Anna Nogaré, an Interpretive Design Director & Accessibility Strategist working across cultural, educational, tourism, and public environments. A multidisciplinary designer at heart, I combine strategic leadership with hands-on design across digital, physical, and hybrid experiences, translating complex content into meaningful and inclusive journeys for diverse audiences.',
    cta_quote: 'Great ideas start with simple conversations.',
  },

  contact: {
    slug: 'contact',
    href: '/contact/',
    menu_title: 'Contact',
    menu_aria_label: 'Get in touch with me',
    card_title: 'Get in touch',
    card_image: 'misc/vintage-telephone_1x1',
    textcard_title: 'Contact',
    textcard_subtitle: 'Get in touch with me',
    title: 'Contact',
    description: 'If you’d like to discuss a project, ask a question, or simply say hi, I’d love to hear from you.',
    cta_quote: 'Always up for big ideas, or just a good decaf Americano.',
  },

  manifesto: {
    slug: 'manifesto',
    href: '/manifesto/',
    menu_title: 'Manifesto',
    menu_aria_label: 'Read my Accessibility Manifesto',
    card_title: 'Read Accessibility Manifesto',
    card_image: 'misc/wheelchair-sign_1x1',
    textcard_title: 'Manifesto',
    textcard_subtitle: 'We are all temporarily able. Yes, you too. And once you see it, you can’t unsee it.',
    title: 'Accessibility Manifesto',
    description: 'It’s not about them in the end of a project. It’s about all of us from the very start.',
    cta_quote: 'Accessibility is <br/>strategic design. <br/>Not a compromise.',
  },

  projects: {
    slug: 'projects',
    href: '/projects/',
    menu_title: 'Selected <br />projects',
    menu_aria_label: 'Explore selected projects',
    card_title: 'Selected projects',
    card_subtitle: 'A collection of articles, opinions, thoughts, and reflections.',
    textcard_title: 'Selected projects',
    textcard_subtitle: 'A collection of articles, opinions, thoughts, and reflections.',
    title: 'Selected projects',
    description: 'A mix of projects, all shaped by the same principle: people first, always. From exhibitions to products, each one plays with emotion, inclusion, and the stuff that actually sticks.',
    cta_quote: 'Let curiosity shape your story. Together, we make it real.',
  },

  resources: {
    slug: 'resources',
    href: '/resources/',
    menu_title: 'Resources',
    menu_aria_label: 'Read my opinions',
    card_title: 'Resources',
    card_subtitle: 'A collection of articles, opinions, thoughts, and reflections.',
    textcard_title: 'Resources',
    textcard_subtitle: 'Articles and thoughts on accessibility and design. Raw, evolving, worth talking about.',
    title: 'Resources',
    description: 'A collection of articles, opinions, thoughts, and reflections.',
    subtitle: 'A collection of articles, opinions, thoughts, and reflections gathered over time, mostly around accessibility as strategic design. Some are polished, some are raw, some somewhere in between. All are still evolving.',
    subtitle_2: 'This is a space to think and share out loud, because the more we talk about these things, the harder they are to ignore.',
    cta_quote: 'The more we talk about it, the harder it gets to ignore.',
  },

  services: {
    slug: 'services',
    href: '/services/',
    menu_title: 'Services',
    menu_aria_label: 'Discover my services',
    card_title: 'Discover my services',
    card_image: 'misc/service-gradient-1_1x1',
    textcard_title: 'Services',
    textcard_subtitle: 'Concept & Experience Strategy <br/>Creative Leadership & Execution <br/>Accessibility & Inclusive Design',
    title: 'Services',
    description: 'I work across cultural, educational, tourism, and public environments, including museums, exhibitions, archives, schools, universities, visitor centres, municipalities, and heritage sites.',
    cta_quote: 'How we design matters. Let’s think about it.',
  },
}

const projects = {
  badge_academy: {
    slug: 'badge-academy',
    href: '/projects/badge-academy/',
    menu_title: 'Badge Academy',
    menu_aria_label: 'Explore the “Badge Academy” project',
    card_title: 'Badge Academy',
    card_subtitle: 'Dutch Police, Amsterdam (NL)',
    card_image: 'projects/badge-academy/thumbnail_1x1',
    title: 'Badge Academy',
    description: 'A mobile game simulating police training, designed to recruit and inspire the next generation of officers.',
    subtitle: 'Dutch Police, Amsterdam (NL), 2021',
    header_image: 'projects/badge-academy/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Lead Designer | Illustrator' },
      { title: 'Employer', description: 'IJsfontein' },
      { title: 'Client', description: 'Dutch National Police' },
      { title: 'Mockups & Video', description: 'IJsfontein' },
    ],
    copyright: '© IJsfontein. All right reserved.',
  },

  canon: {
    slug: 'canon',
    href: '/projects/canon/',
    menu_title: 'Canon Pro Network',
    menu_aria_label: 'Explore the “Canon Pro Network” project',
    card_title: 'Canon Pro Network',
    card_subtitle: 'Canon Europe, London (UK)',
    card_image: 'projects/canon/thumbnail_1x1',
    title: 'Canon Professional Network',
    description: 'A digital platform for photography professionals, built around inspiration, craft, and Canon’s visual identity.',
    subtitle: 'Canon Europe, London (UK), 2017',
    header_image: 'projects/canon/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Visual Designer' },
      { title: 'Employer', description: 'The Red Dot Agency' },
      { title: 'Client', description: 'Canon Europe' },
    ],
    copyright: '© Canon Europe. All rights reserved.',
  },

  cruquius_museum: {
    slug: 'cruquius-museum',
    href: '/projects/cruquius-museum/',
    menu_title: 'Cruquius Museum',
    menu_aria_label: 'Explore the “Cruquius Museum” project',
    card_title: 'Cruquius museum',
    card_subtitle: 'Cruquius Museum, Cruquius (NL)',
    card_image: 'projects/cruquius-museum/thumbnail_1x1',
    title: 'Cruquius Museum',
    description: 'An immersive look at Haarlemmermeer’s history and the world’s largest steam engine.',
    subtitle: 'Cruquius Museum, Cruquius (NL), 2020',
    header_image: 'projects/cruquius-museum/cover_3x1',
    label: 'Featured',
    awards: [],
    recognitions: [
      { title: 'Featured on Behance’s Graphic Design gallery:', description: 'Exhibition & Signage category' },
      { title: 'Featured on Behance’s Illustrator gallery', description: '' },
    ],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Cruquius Museum' },
      { title: 'Photography', description: 'Mike Bink' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  family_exhibits: {
    slug: 'family-exhibits',
    href: '/projects/family-exhibits/',
    menu_title: 'Family Exhibits',
    menu_aria_label: 'Explore the “Family Exhibits” project',
    card_title: 'Family Exhibits',
    card_subtitle: 'National Museum of Qatar, Doha (QA)',
    card_image: 'projects/family-exhibits/thumbnail_1x1',
    title: 'Family Exhibits',
    description: 'A multi-sensory family journey into Qatar’s heritage, shaped by play and discovery.',
    subtitle: 'National Museum of Qatar, Doha (QA), 2019',
    header_image: 'projects/family-exhibits/cover_3x1',
    label: 'Awarded',
    awards: [
      { title: 'AVICOM F@IMP 2.0 2020', description: 'Winner | Interpreting exhibition installation' },
      { title: 'International Design Award 2020', description: 'Bronze | Multimedia-Interactive Media' },
      { title: 'Muse Design Awards 2019', description: 'Silver | Interior Design Exhibits, Pavilions, & Exhibitions' },
      { title: 'SBID Awards 2019', description: 'Nomination | Public Space Design' },
    ],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'National Museum of Qatar' },
      { title: 'Photography', description: 'Studio Louter' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  herman_boerhaave: {
    slug: 'herman-boerhaave',
    href: '/projects/herman-boerhaave/',
    menu_title: 'Herman Boerhaave',
    menu_aria_label: 'Explore the “Herman Boerhaave” project',
    card_title: 'Herman Boerhaave',
    card_subtitle: 'Rijksmuseum Boerhaave, Leiden (NL)',
    card_image: 'projects/herman-boerhaave/thumbnail_1x1',
    title: 'Herman Boerhaave',
    description: 'A walk through the life and world of one of the most influential Dutch physicians.',
    subtitle: 'Rijksmuseum Boerhaave, Leiden (NL), 2018',
    header_image: 'projects/herman-boerhaave/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Rijksmuseum Boerhaave' },
      { title: 'Photography', description: 'Mike Bink' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  het_steen: {
    slug: 'het-steen',
    href: '/projects/het-steen/',
    menu_title: 'Visit Antwerp',
    menu_aria_label: 'Explore the “Visit Antwerp” project',
    card_title: 'Visit Antwerp',
    card_subtitle: 'Het Steen, Antwerp (BE)',
    card_image: 'projects/het-steen/thumbnail_1x1',
    title: 'Visit Antwerp',
    description: 'A visitor center inside Antwerp’s oldest building, made of stories, people, and places.',
    subtitle: 'Het Steen, Antwerp (BE), 2021',
    header_image: 'projects/het-steen/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Visit Antwerp' },
      { title: 'Photography', description: 'Ocular' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  interplanetary: {
    slug: 'interplanetary',
    href: '/projects/interplanetary/',
    menu_title: 'Interplanetary',
    menu_aria_label: 'Explore the “Interplanetary” project',
    card_title: 'Inter&shy;planetary',
    card_subtitle: ' IUAVUniversity of Venice, Venice (IT)',
    card_image: 'projects/interplanetary/thumbnail_1x1',
    title: 'Interplanetary',
    description: 'An editorial and digital project mapping the universe’s connected networks through information design.',
    subtitle: 'IUAV University of Venice, Venice (IT), 2015',
    header_image: 'projects/interplanetary/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Solo Designer | Illustrator' },
      { title: 'Concept', description: 'Anna Nogaré, Andrea Fasolo Rao' },
      { title: 'Academic supervision', description: 'Marco Ferrari, Ivor Williams' },
    ],
    copyright: 'Developed at IUAV University of Venice',
  },

  joh_enschede: {
    slug: 'joh-enschede',
    href: '/projects/joh-enschede/',
    menu_title: 'Joh. Enschedé',
    menu_aria_label: 'Explore the “Joh. Enschedé” project',
    card_title: 'Joh. Enschedé',
    card_subtitle: 'Noord-Hollands Archief, Haarlem (NL)',
    card_image: 'projects/joh-enschede/thumbnail_1x1',
    title: 'Joh. Enschedé',
    description: 'Exploring the printers behind pages, banknotes, and type that shaped a nation.',
    subtitle: 'Noord-Hollands Archief, Haarlem (NL), 2019',
    header_image: 'projects/joh-enschede/cover_3x1',
    label: 'Awarded + Featured',
    awards: [
      //
      { title: 'Muse Design Awards 2020', description: 'Platinum | Design, Exhibition, Pavilions & Exhibitions' },
    ],
    recognitions: [
      { title: 'Featured on Behance’s Graphic Design gallery:', description: 'Exhibition & Signage category' },
      { title: 'Featured on Behance’s Illustrator gallery', description: '' },
    ],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Noord-Hollands Archief' },
      { title: 'Photography', description: 'Mike Bink' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  living_planet: {
    slug: 'living-planet',
    href: '/projects/living-planet/',
    menu_title: 'Living Planet',
    menu_aria_label: 'Explore the “Living Planet” project',
    card_title: 'Living planet',
    card_subtitle: 'Museum of Natural Sciences, Brussels (BE)',
    card_image: 'projects/living-planet/thumbnail_1x1',
    title: 'Living Planet',
    description: 'Understanding biodiversity and ecosystems through playful investigation.',
    subtitle: 'Museum of Natural Sciences, Brussels (BE), 2020',
    header_image: 'projects/living-planet/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Museum of Natural Sciences' },
      { title: 'Photography', description: 'Museum + Studio Louter' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  maker_park: {
    slug: 'maker-park',
    href: '/projects/maker-park/',
    menu_title: 'Maker Park',
    menu_aria_label: 'Explore the “Maker Park” project',
    card_title: 'Maker park',
    card_subtitle: 'ilmi Science Discovery & Innovation Center, Riyadh (SA)',
    card_image: 'projects/maker-park/thumbnail_1x1',
    title: 'Maker Park',
    description: 'A nationwide digital ecosystem for STREAM education through informal learning and gamification.',
    subtitle: 'ilmi Science Discovery and Innovation Center, Riyadh (SA), Expected opening in 2026',
    header_image: 'projects/maker-park/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Creative Director | Strategist' },
      { title: 'Employer', description: 'IJsfontein' },
      { title: 'Client', description: 'Misk Foundation' },
      { title: 'Photography', description: 'Unsplash' },
      { title: 'Renders', description: 'Provided by client' },
      { title: 'Mockups & Video', description: 'IJsfontein' },
    ],
    copyright: '© IJsfontein. All rights reserved.',
  },

  middelen_meter: {
    slug: 'middelen-meter',
    href: '/projects/middelen-meter/',
    menu_title: 'Middelen Meter',
    menu_aria_label: 'Explore the “Middelen Meter” project',
    card_title: 'Middelen Meter',
    card_subtitle: 'Jellinek, Amsterdam (NL), 2023',
    card_image: 'projects/middelen-meter/thumbnail_1x1',
    title: 'Middelen Meter',
    description: 'A self-monitoring app for substance use, designed to support reflection without judgement.',
    subtitle: 'Jellinek, Amsterdam (NL), 2023, 2023',
    header_image: 'projects/middelen-meter/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Creative Director | Lead Designer' },
      { title: 'Employer', description: 'IJsfontein' },
      { title: 'Client', description: 'Jellinek' },
      { title: 'Mockups & Video', description: 'IJsfontein' },
    ],
    copyright: '© IJsfontein. All rights reserved.',
  },

  parassita: {
    slug: 'parassita',
    href: '/projects/parassita/',
    menu_title: 'Parassita',
    menu_aria_label: 'Explore the “Parassita” project',
    card_title: 'Parassita',
    card_subtitle: 'Personal project, Amsterdam (NL)',
    card_image: 'projects/parassita/thumbnail_1x1',
    title: 'Parassita',
    description: 'An independent magazine about Italy, told via information design, traveling parasitically through Amsterdam.',
    subtitle: 'Personal project, Amsterdam (NL), 2016',
    header_image: 'projects/parassita/cover_3x1',
    awards: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Solo Designer | Illustrator' },
      { title: 'Co-relator', description: 'David Pino (NL)' },
      { title: 'Supervisor', description: 'Emanuela Bonini Lessing (IT)' },
    ],
    copyright: 'Developed at IUAV University of Venice',
  },

  prodemos: {
    slug: 'prodemos',
    href: '/projects/prodemos/',
    menu_title: 'Make your own law',
    menu_aria_label: 'Explore the “Make your own law” project',
    card_title: 'Make your own law',
    card_subtitle: 'ProDemos, The Hague (NL)',
    card_image: 'projects/prodemos/thumbnail_1x1',
    title: 'Make your own law',
    description: 'A GPS game where students propose, debate, and bring their own laws to life.',
    subtitle: 'ProDemos, The Hague (NL), 2021',
    header_image: 'projects/prodemos/cover_3x1',
    awars: [],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'ProDemos' },
      { title: 'Photography', description: 'Bas van Vliet + Studio Louter' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  shifting_image: {
    slug: 'shifting-image',
    href: '/projects/shifting-image/',
    menu_title: 'Shifting Image',
    menu_aria_label: 'Explore the “Shifting Image” project',
    card_title: 'Shifting Image',
    card_subtitle: 'Mauritshuis, The Hague (NL)',
    card_image: 'projects/shifting-image/thumbnail_1x1',
    title: 'Shifting Image',
    description: 'An exhibition confronting the layered, uncomfortable perspectives of Dutch colonial history.',
    subtitle: 'Mauritshuis, The Hague (NL), 2019',
    header_image: 'projects/shifting-image/cover_3x1',
    label: 'Awarded',
    awards: [
      { title: 'AVICOM F@IMP 2.0 2020', description: 'Winner | Scenography' },
      { title: 'Museums + Heritage Award 2020', description: 'Winner | The International Project of the Year &lt; £1m' },
      { title: 'European Design Awards 2020', description: 'Bronze | Exhibition Design' },
      { title: 'FX Design Award 2020', description: 'Finalist | Museum or Exhibition Space' },
      { title: 'Frame Awards 2020', description: 'Longlist | Exhibition of the Year' },
      { title: 'Muse Design Awards 2019', description: 'Gold | Interior Design Exhibits, Pavilions, & Exhibitions' },
      { title: 'SBID Awards 2019', description: 'Nomination | Public Space Design' },
    ],
    recognitions: [],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer' },
      { title: 'Employer', description: 'Studio Louter' },
      { title: 'Client', description: 'Mauritshuis' },
      { title: 'Photography', description: 'Mike Bink' },
    ],
    copyright: '© Studio Louter. All rights reserved.',
  },

  vanishing: {
    slug: 'vanishing',
    href: '/projects/vanishing/',
    menu_title: 'Vanishing',
    menu_aria_label: 'Explore the “Vanishing” project',
    card_title: 'Vanishing',
    card_subtitle: 'IUAV University of Venice, Venice (IT)',
    card_image: 'projects/vanishing/thumbnail_1x1',
    title: 'Vanishing',
    description: 'A printed atlas and digital experience exploring the many faces of disappearance.',
    subtitle: 'IUAV University of Venice, Venice (IT), 2014',
    header_image: 'projects/vanishing/cover_3x1',
    label: 'Featured',
    awards: [],
    recognitions: [
      //
      { title: 'Featured on the Leap Motion official blog:', description: 'On the Verge of Extinction' },
    ],
    credits: [
      { title: 'Role', description: 'Art Director | Lead Designer | Illustrator' },
      { title: 'Concept', description: 'Anna Nogaré, Andrea Fasolo Rao, Riccardo Gioria' },
      { title: 'Academic supervision', description: 'Marco Ferrari, Ivor WilliamsDeveloped at IUAV University of Venice' },
    ],
    copyright: 'Developed at IUAV University of Venice',
  },
}

const resources = {
  we_are_all_temporarily_able_yes_you_too: {
    slug: 'we-are-all-temporarily-able-yes-you-too',
    href: '/resources/we-are-all-temporarily-able-yes-you-too/',
    menu_title: 'We are all temporarily able. Yes, you too.',
    menu_aria_label: 'Read my “We are all temporarily able. Yes you too.” article',
    title: 'We are all temporarily able. Yes, you too.',
    title_with_markup: 'We are all temporarily able. <br/>Yes, you too.',
    description: 'Stop thinking of disability as something that happens to “other people”. Discover why we are all temporarily able and how changing our perspective on design and accessibility can build a world that works for everyone.',
    subtitle: 'Anna Nogaré | <time datetime="2026-05-13">13-05-2026</time> | <em>12 min</em>',
    subtitle_short: '<time datetime="2026-05-13">13-05-2026</time> | <em>12 min</em>',
    cta_quote: 'The more we talk about it, the harder it gets to ignore.',
  },
}

// eslint-disable-next-line camelcase
const resource_cards = [
  {
    href: resources.we_are_all_temporarily_able_yes_you_too.href,
    pretitle: resources.we_are_all_temporarily_able_yes_you_too.subtitle_short,
    title: resources.we_are_all_temporarily_able_yes_you_too.title,
    subtitle: resources.we_are_all_temporarily_able_yes_you_too.description
  },

  {
    href: 'https://goodjob.vision/interpretive-design-italia-cultura-accessibile/',
    target: '_blank',
    pretitle: '<time datetime="2026-05-04">04-05-2026</time> | <em>14 min</em>',
    subtitle: 'Published on Goodjob!',
    title: 'Interpretive design: progettare cultura accessibile non è un favore per pochi, ma migliora la vita di tutti'
  }
]

// eslint-disable-next-line camelcase
const content_blocks = {
  about: [
    {
      type: 'article-content-image',
      variant: 'left',
      cpacc_badge: true,
      hearts_shader: true,
      image: 'misc/anna-dots_1x1',
      richtext: `
<h2>Profile</h2>
<p>I’m a Senior Experience Designer & Accessibility Strategist with over a decade of international experience leading and designing digital, physical, and hybrid experiences across Europe and the Middle East, turning complex content into journeys that stick with people.</p>
<p>My multidisciplinary career is shaped by deep dives into several disciplines of design, hands-on mastery, and cross-functional collaborations that naturally evolved into leadership roles. Now, I don’t just look at design; I pull together strategy, storytelling, and logistics too. I’ve led global teams, mentored people, dealt with impossible stakeholders, survived crazy deadlines, and delivered a few miracles on repeat, all while keeping my hands dirty and having fun building things with people.</p>
<p>Also, I’m obsessed with accessibility. Beyond the human aspect, it is just basic logic. In a digital world full of inaccessible patterns that AI is learning from, true accessibility expertise matters. I became <a href="https://www.accessibilityassociation.org/cpacc" target="_blank" rel="noopener nofollow" title="More information about the CPACC certification; opens in a new tab or window">CPACC-certified</a> through the <a href="https://www.accessibilityassociation.org/" target="_blank" rel="noopener nofollow" title="More information about the IAAP; opens in a new tab or window">IAAP</a> to back it up with the heavy technical weight needed to defend and advocate for it.</p>
<p>Some of the organizations I’ve partnered with to make the impossible possible include the National Museum of Qatar, ilmi Science Discovery & Innovation Center (Riyadh), the Museum of Natural Sciences (Brussels), the Icelandic Museum of Natural History, Het Steen Visitor Center (Antwerp), Canon Professional Network, Amnesty International, the Dutch National Police, and others across different sectors.</p>
      `,
    },

    {
      type: 'article-content-image',
      variant: 'right',
      image: 'misc/anna-leaning-forward_1x1',
      richtext: `
<h2>Approach</h2>

<p>Engagement starts by meeting people where they are. Everyone understands, learns, and expresses themselves differently, and I design with that in mind.</p>
<p>My approach is built around asking uncomfortable questions, untangling the chaos behind the scenes, listening to the volley of absurd requests, refusing to play it safe, and killing the ego talks in the room.</p>
<p>The goal is simple: creating experiences where everyone reaches the same destination at their own pace.</p>
<p>Messy? Yes. Worth it? Always.</p>
      `,
    },
  ],

  badge_academy: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p><em>Badge Academy</em> is an Android game developed for the Dutch National Police to give teenagers a taste of the force. Instead of a dry public service announcement, the app drops players into a simulated training academy where they earn badges, tackle live cases, and hunt down an entire family of recurring criminals, each with their own backstory and personality.</p>
<p>To keep the game replayable, players face random encounters with the family members across eight distinct mini-games. The real test of focus comes from intentional distraction screens where characters jump out mid-game to break the player’s concentration. It takes the high-stress reality of police work, from administering first aid to chasing suspects, and packages it into a competitive, goal-driven experience that slyly doubles as a recruitment tool.</p>
      `,
      images: ['projects/badge-academy/01_2x1', 'projects/badge-academy/02_1x1', 'projects/badge-academy/03_1x1', 'projects/badge-academy/04_2x1', 'projects/badge-academy/05_2x1', 'projects/badge-academy/06_1x1', 'projects/badge-academy/07_1x1', 'projects/badge-academy/08_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>A one-designer show, me, which meant building the entire visual world, UX/UI, and interaction logic from scratch. My favorite challenge was playing character designer: I illustrated all six members of the criminal family, giving each one a distinct backstory to anchor the narrative. From there, I mapped out the interaction mechanics for the eight mini-games and the focus-breaking distraction screens.</p>
<p>The real tightrope walk was the branding. I built a vibrant, high-energy gaming environment that screams “teenagers,” while strictly adhering to the official corporate color palette of the Dutch National Police. It was a lesson in balancing institutional authority with teenage engagement, but above all, a great way to view criminality from a cartoonish, more pleasant-than-reality perspective.</p>
      `,
      images: ['projects/badge-academy/09_2x1', 'projects/badge-academy/10_1x1', 'projects/badge-academy/11_1x1', 'projects/badge-academy/12_2x1', 'projects/badge-academy/13_2x1', 'projects/badge-academy/14_1x1', 'projects/badge-academy/15_1x1', 'projects/badge-academy/16_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Owned the end-to-end design as the sole creative, handling everything from character illustration to full UX/UI execution.</li>
  <li>Built the narrative backbone by designing and illustrating a family of six distinct criminal characters.</li>
  <li>Designed eight randomized mini-games and focus-testing distraction mechanics to maximize player retention.</li>
  <li>Built a credible brand identity rooted in an official government palette that still felt like a mobile game.</li>
  <li>Gamified real-world police training into engaging visual experiences for a teenage audience.</li>
</ul>
      `,
      images: ['projects/badge-academy/17_2x1', 'projects/badge-academy/18_1x1', 'projects/badge-academy/19_1x1', 'projects/badge-academy/20_2x1', 'projects/badge-academy/21_2x1', 'projects/badge-academy/22_1x1', 'projects/badge-academy/23_1x1', 'projects/badge-academy/24_2x1'],
    },
  ],

  canon: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The Canon Professional Network was the digital hub for photographers and imaging pros across Europe. Instead of just pushing product specs, the platform had to be a genuine source of inspiration, mixing heavy editorial stories, community features, global contests, and deep technical insights.</p>
<p>Because the target audience consisted entirely of people who obsess over image quality for a living, every piece of content, newsletter, and campaign asset had to look perfect. No pressure.</p>
      `,
      images: ['projects/canon/01_2x1', 'projects/canon/02_1x1', 'projects/canon/03_1x1', 'projects/canon/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>As a Visual Designer on the team for a solid year, my job was to make sure our layouts didn’t insult our audience’s eyeballs. I designed website pages, custom microsites, newsletters, and campaign assets. The real work here was in the choice of the assets themselves: curating imagery, establishing strict visual hierarchies, and building layouts that let the photography breathe while adhering to Canon’s colossal corporate guidelines.</p>
<p>Beyond the daily content grind, I curated the visual identity for recurring global photo contests and featured stories. It was an intense bootcamp in high-volume, premium production that forced me to evaluate hundreds of world-class photos every week. Consider it a masterclass in visual storytelling that finely tuned my eye, while occasionally giving me a serious case of imposter syndrome.</p>
      `,
      images: [],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Managed the editorial design for a high-volume platform serving photography professionals across Europe.</li>
  <li>Translated raw content into compelling visual narratives through intentional photography curation, image hierarchy, and layout.</li>
  <li>Built and deployed across a toolkit of formats, including web pages, microsites, newsletters, and campaign assets.</li>
  <li>Upheld Canon’s premium standards across every single output without letting the quality slip over time.</li>
</ul>
      `,
      images: ['projects/canon/05_2x1', 'projects/canon/06_1x1', 'projects/canon/07_1x1', 'projects/canon/08_2x1'],
    },
  ],

  contact: [
    {
      type: 'article-content-image',
      variant: 'left',
      image: 'misc/vintage-telephone_1x1',
      richtext: `
<p>I am currently based in Italy, planning my move back to the Netherlands, and working worldwide.</p>
<p>Anyway, you know what to do. Don’t wait any longer 👇</p>
<p class="paragraph--gigantic"><a href="mailto:_send_me_an_">_send_me_an_</a><br />NL: <a href="tel:_or_pick_up_the_">_or_pick_up_the_</a><br />IT: <a href="tel:_or_otherwise_pick_up_the_">_or_otherwise_pick_up_the_</a></p>
      `,
    },
  ],

  cruquius_museum: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The Cruquius Museum is housed inside a historic pumping station that holds a massive piece of history: one of the world’s largest steam engines, which famously helped drain the Haarlemmermeer lake and literally reshape the Dutch landscape. The space bridges preserved 19th-century industrial architecture with contemporary exhibits, showing off both raw technological ingenuity and its huge societal impact.</p>
<p>Through a mix of interactive displays, large-scale audiovisual projections, and hands-on activities, the museum breaks down complex engineering principles and environmental history, making heavy industrial machinery tell human-scale stories.</p>
      `,
      images: ['projects/cruquius-museum/01_2x1', 'projects/cruquius-museum/02_1x1', 'projects/cruquius-museum/03_1x1', 'projects/cruquius-museum/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I led the interaction strategy, multimedia design, and audiovisual installations, focused heavily on shaping a hands-on workshop experience where visitors can actually test out engineering concepts through physical and digital models. My job was to design a coherent visual and interactive system, bringing immovable machinery into dialogue with modern interpretive media, making sure technical data felt exciting and playful.</p>
<p>Working alongside multidisciplinary teams and external partners, I translated dense engineering and environmental history into fun and accessible content formats. It was all about strategic interpretation, spatial logic, and pacing the multimedia elements so that walking through a heritage site felt less like a dry history lesson and more like an experience of genuine wonder.</p>
      `,
      images: ['projects/cruquius-museum/05_2x1', 'projects/cruquius-museum/06_1x1', 'projects/cruquius-museum/07_1x1', 'projects/cruquius-museum/08_2x1', 'projects/cruquius-museum/09_2x1', 'projects/cruquius-museum/10_1x1', 'projects/cruquius-museum/11_1x1', 'projects/cruquius-museum/12_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led the interaction and multimedia design for a permanent industrial heritage exhibition, retrofitting a historic space with modern AV installations.</li>
  <li>Designed a visual and interactive system, making complex engineering principles playful and engaging.</li>
  <li>Translated heavy engineering and environmental history into approachable informal learning narratives.</li>
  <li>Shaped a physical workshop environment that ditches passive reading for active, hands-on learning by doing.</li>
  <li>Coordinated cross-functional teams and external vendors across design and production.</li>
  <li>Featured in multiple curated Behance galleries for exhibition and interaction design.</li>
</ul>
      `,
      images: ['projects/cruquius-museum/13_2x1', 'projects/cruquius-museum/14_1x1', 'projects/cruquius-museum/15_1x1', 'projects/cruquius-museum/16_2x1'],
    },
  ],

  family_exhibits: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The National Museum of Qatar takes visitors on a 1.5-kilometre journey through the country’s history, blending movement, touch, and storytelling. Within that journey, the <em>Family Exhibits</em> bring Qatar’s heritage to life for children aged 5 to 15 through several galleries.</p>
<p>I worked on three of them: <em>Archaeology</em>, <em>Life on the Coast</em>, and <em>Energy</em>, where visitors dig up ancient artifacts, discover traditional pearl diving culture, and explore the role energy plays in country’s story. Each gallery combines interactive games, hands-on activities, and immersive projections to make Qatari’s history and culture feel lived-in, not lectured.</p>
      `,
      images: ['projects/family-exhibits/01_2x1', 'projects/family-exhibits/02_1x1', 'projects/family-exhibits/03_1x1', 'projects/family-exhibits/04_1x1', 'projects/family-exhibits/05_1x1', 'projects/family-exhibits/06_2x1', 'projects/family-exhibits/07_1x1', 'projects/family-exhibits/08_1x1', 'projects/family-exhibits/09_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>This was my first high-budget jump into the Middle East, and the exact moment I fell head-over-heels for exhibition design and the gritty reality of physical production. For three years, I directed the UX/UI, interaction strategy, and multimedia design across three galleries, coordinating an international network of specialists through relentless iteration.</p>
<p>The real puzzle was building coherence across wildly different formats: interactive modules, immersive projections, and physical-digital touchpoints in the same space. On top of that, I had to navigate a completely new culture and design for dual-language systems, balancing opposing reading directions under accessibility constraints. Basically, three years of design systems, visual design, interaction guidelines, and endless testing.</p>
<p>From the first wireframe to stepping on a plane for on-site installation, it was a wild ride of keeping internal teams, external partners, and timelines intact under heavy pressure. In the end, we delivered an experience where parents have fun too; a massive win, given the goal of creating quality time for families forced indoors due to the Qatari heat. Definitely a lot of lessons learned, great time spent, and incredible people met worldwide.</p>
      `,
      images: ['projects/family-exhibits/10_2x1', 'projects/family-exhibits/11_1x1', 'projects/family-exhibits/12_1x1', 'projects/family-exhibits/13_2x1', 'projects/family-exhibits/14_1x1', 'projects/family-exhibits/15_1x1', 'projects/family-exhibits/16_1x1', 'projects/family-exhibits/17_1x1', 'projects/family-exhibits/18_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led the end-to-end UX/UI and interaction strategy across three high-traffic, family-focused galleries.</li>
  <li>Built a unified interaction language to seamlessly bridge software modules, immersive projections, and physical props.</li>
  <li>Guided a complex international network of internal teams, external partners, and specialists under tight delivery constraints.</li>
  <li>Leveraged endless prototyping and testing to optimize user flows, clarity, and accessibility for broad audiences.</li>
  <li>Embedded inclusive design principles at scale within a high-profile public cultural environment.</li>
  <li>Recognized with several international awards.</li>
</ul>
      `,
      images: ['projects/family-exhibits/19_1x1', 'projects/family-exhibits/20_1x1', 'projects/family-exhibits/21_1x1', 'projects/family-exhibits/22_1x1', 'projects/family-exhibits/23_2x1'],
    },
  ],

  herman_boerhaave: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>To celebrate Herman Boerhaave’s 350th birthday, the Rijksmuseum Boerhaave launched a temporary exhibition that tracked his life through historic Leiden, from the botanical gardens straight into his home.</p>
<p>Instead of just lining up old scientific instruments and dusty archival documents, the exhibition uncovers a surprisingly modern narrative: Boerhaave’s relentless fight against 18th-century scientific misinformation. Through a rock and roll mix of bold visuals, tight spatial sequencing, and multimedia elements, the space transforms centuries-old medical history into a highly relevant story about truth, science, and lasting human impact.</p>
      `,
      images: ['projects/herman-boerhaave/01_2x1', 'projects/herman-boerhaave/02_1x1', 'projects/herman-boerhaave/03_1x1', 'projects/herman-boerhaave/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I was the sole designer on this project, which meant taking full ownership of the exhibition’s visual design, graphic language, and material choices from initial concept down to final execution. My job was to build a reading logic and wayfinding system from scratch, using color and sharp typography to guide visitors through dense historical and medical data without letting them get lost in the weeds.</p>
<p>Flying solo meant working directly in the trenches with curators, content designers, and fabrication partners. I had to balance narrative clarity with physical spatial rhythms, pushing for a bold, contemporary aesthetic that intentionally contrasted with the antique subject matter. It was about proving that historical medical exhibitions don’t have to look clinical or dated to be deeply impactful.</p>
      `,
      images: ['projects/herman-boerhaave/05_2x1', 'projects/herman-boerhaave/06_1x1', 'projects/herman-boerhaave/07_1x1', 'projects/herman-boerhaave/08_2x1', 'projects/herman-boerhaave/09_2x1', 'projects/herman-boerhaave/10_1x1', 'projects/herman-boerhaave/11_1x1', 'projects/herman-boerhaave/12_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Owned the complete visual identity as the sole designer, driving the project from first sketch to final installation.</li>
  <li>Built an intuitive reading logic and wayfinding system using color and typography to guide visitors through dense medical data.</li>
  <li>Translated 18th-century history and scientific concepts into a high-impact, accessible spatial experience.</li>
  <li>Coordinated with curators and fabrication teams to perfectly align the narrative with physical spatial rhythms.</li>
</ul>
      `,
      images: ['projects/herman-boerhaave/13_2x1', 'projects/herman-boerhaave/14_1x1', 'projects/herman-boerhaave/15_1x1', 'projects/herman-boerhaave/16_2x1'],
    },
  ],

  het_steen: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p><em>Het Steen</em> is an 800-year-old historic fortress and the oldest building in Antwerp. It also happens to house the city’s main visitor center. Instead of standard, boring tourist brochures, the space uses an 11-room interactive path to introduce visitors to Antwerp’s distinct neighborhoods, complex history, iconic landmarks, and vibrant contemporary culture.</p>
<p>The experience uses digital media, immersive 360° projections, and spatial storytelling to unpack Antwerp’s past and present, helping people orient themselves before they go out to explore.</p>
      `,
      images: ['projects/het-steen/01_2x1', 'projects/het-steen/02_1x1', 'projects/het-steen/03_1x1', 'projects/het-steen/04_1x1', 'projects/het-steen/05_1x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I led the UX/UI and multimedia design for the entire visitor experience. My job was to figure out how the digital interactions should behave and how the various audiovisual elements would talk to one another. I designed a consistent visual and interaction system that linked screens, massive projections, and spatial touchpoints, ensuring visitors could navigate the journey without getting lost.</p>
<p>To make things even more memorable, we built this entire experience during the peak of COVID-19 constraints. I had to coordinate multidisciplinary teams across design and production while juggling remote workflows, unhealthy doses of uncertainty, and the honest fact that I never saw the place in real life due to the shutdown. Every single interface, interactive installation, and piece of user-facing design was mapped out and built by navigating nothing but floor plans and technical drawings from afar. If that isn’t hardcore design, I don’t know what is.</p>
      `,
      images: ['projects/het-steen/06_2x1', 'projects/het-steen/07_1x1', 'projects/het-steen/08_1x1', 'projects/het-steen/09_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Directed the UX/UI and multimedia design for a multi-room visitor center.</li>
  <li>Designed a unified interaction framework that successfully connected digital screens and environmental projections.</li>
  <li>Translated dense historical and cultural archives into engaging, interactive installations.</li>
  <li>Guided remote and local teams across design, content, and production to keep the project moving forward.</li>
  <li>Delivered the entire experience on time despite the logistical nightmare of pandemic-era restrictions and without setting foot on-site once.</li>
</ul>
      `,
      images: ['projects/het-steen/10_2x1', 'projects/het-steen/11_1x1', 'projects/het-steen/12_1x1', 'projects/het-steen/13_2x1'],
    },
  ],

  interplanetary: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The <em>Atlas of Contemporary Networks</em> was an ambitious project at IUAV University of Venice mapping complex infrastructure through a mix of print editorial and digital design. For our chapter, my partner and I were handed the single word “Interplanetary” and a wish of good luck. We had to build the entire content strategy from scratch, deciding to visually organize the universe’s network systems by their distance from Earth. The resulting narrative arc scaled all the way from low-orbit satellites and the International Space Station out to the Milky Way and the NASA Deep Space Network.</p>
<p>The print project eventually bled into the digital world with @AtlasDSN, a Twitter-based installation designed to teach users the meaning of cosmic patience. Visually styled after Atari’s 1979 Asteroids game, a nod to the Voyager launch era, the installation transmitted real tweets to space probes using real signal travel times. If you wanted to ping Mars, you had to wait 20 minutes for the signal to arrive. If you wanted to talk to Voyager I outside the Solar System, you were looking at an 18-hour delay. It was the ultimate antidote to modern instant gratification.</p>
      `,
      images: ['projects/interplanetary/01_2x1', 'projects/interplanetary/02_1x1', 'projects/interplanetary/03_1x1', 'projects/interplanetary/04_2x1', 'projects/interplanetary/05_2x1', 'projects/interplanetary/06_1x1', 'projects/interplanetary/07_1x1', 'projects/interplanetary/08_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I took charge of translating the raw data into a visual language, building the information architecture, content design, and entire graphic ecosystem from the ground up. I owned the print side of the room, executing every layout, typesetting choice, illustration, and complex data visualization. The major curveball was executing all of this within a strict, shared two-color Risograph framework, a beautiful but unforgiving constraint that applied to the entire publication.</p>
<p>Since astrophysics data doesn’t naturally care about human readability, the job was all about stripping away technical density to engineer clear and layered visual narratives. I embedded myself with the developer during the concept phase to pitch and build the foundation. We ended up developing two entirely separate visual languages: a meticulous, data-heavy layout for print, and a retro, interactive interface for the digital installation.</p>
<p>I won’t lie, because it was a duet show performed in just three months, it was pure blood, sweat, and tears. But it became the ultimate workout on information design and partner bonding. We still call each other business partner after more than a decade.</p>
      `,
      images: ['projects/interplanetary/09_2x1', 'projects/interplanetary/10_1x1', 'projects/interplanetary/11_1x1', 'projects/interplanetary/12_2x1', 'projects/interplanetary/13_2x1', 'projects/interplanetary/14_1x1', 'projects/interplanetary/15_1x1', 'projects/interplanetary/16_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Designed the full print editorial system from scratch, managing layout, typography, illustrations, and data visualizations within a strict Risograph two-color framework.</li>
  <li>Translated complex astrophysics and spatial data into accessible visual narratives, balancing scientific accuracy with editorial clarity.</li>
  <li>Co-developed the concept and narrative framing, engineering two intentionally distinct visual languages for the print and digital components.</li>
  <li>Designed the @AtlasDSN installation experience, connecting users to deep-space spacecraft through real-time tweet transmission delays.</li>
</ul>
      `,
      images: ['projects/interplanetary/17_2x1', 'projects/interplanetary/18_1x1', 'projects/interplanetary/19_1x1', 'projects/interplanetary/20_2x1', 'projects/interplanetary/21_2x1', 'projects/interplanetary/22_1x1', 'projects/interplanetary/23_1x1', 'projects/interplanetary/24_2x1'],
    },
  ],

  joh_enschede: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The Noord-Hollands Archief opened a permanent exhibition dedicated to Joh. Enschedé, the legendary printing house that spent centuries producing the Netherlands’ banknotes, stamps, and typefaces.</p>
<p>A striking, five-meter-high glass façade creates a vibrant atmosphere, framing three heavy-hitting historical installations: an 18th-century printing press, a showcase of rare typefaces, and a massive banknote printer’s roll. By pairing interactive screens and physical games with a raw workshop environment, the exhibition strips away the stuffiness of archival history and invites people to actually touch the precision craftsmanship behind everyday objects.</p>
      `,
      images: ['projects/joh-enschede/01_1x1', 'projects/joh-enschede/02_1x1', 'projects/joh-enschede/03_1x1', 'projects/joh-enschede/04_1x1', 'projects/joh-enschede/05_1x1', 'projects/joh-enschede/06_1x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I ran the visual direction and graphic layer, establishing the entire typographic system, color palette, and material choices from scratch. My focus was on building a tight visual identity where every label, case graphic, and display element felt like a natural extension of a master printer’s legacy.</p>
<p>When you are dealing with a five-meter window to decorate and delicate, centuries-old archival artifacts, you don’t get to use standard solutions. It required hyper-detailed production planning and custom-built cases to make sure the graphics and physical structures worked together perfectly. By acting as the bridge between the client and the production teams, I aligned the dense history of security printing with a modern visual identity that completely cuts through the potential heaviness of the topic.</p>
      `,
      images: ['projects/joh-enschede/07_1x1', 'projects/joh-enschede/08_1x1', 'projects/joh-enschede/09_1x1', 'projects/joh-enschede/10_1x1', 'projects/joh-enschede/11_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led the graphic layer and art direction for a permanent heritage exhibition, balancing archival preservation with bold spatial design.</li>
  <li>Built a unified visual system across everything from small on-case labels to the massive glass façade.</li>
  <li>Translated high-security printing history into engaging learning touchpoints.</li>
  <li>Choreographed content, materials, and visual identity into a hands-on, workshop-style visitor journey.</li>
  <li>Recognized with an international award and multiple curated features in Behance galleries.</li>
</ul>
      `,
      images: ['projects/joh-enschede/12_1x1', 'projects/joh-enschede/13_1x1', 'projects/joh-enschede/14_1x1', 'projects/joh-enschede/15_1x1', 'projects/joh-enschede/16_2x1'],
    },
  ],

  living_planet: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The <em>Living Planet</em> exhibition is an extensive  multi-floor educational journey designed to show visitors exactly how interconnected and fragile our ecosystems really are.</p>
<p>Scaling across two floors and showcasing more than 800 animal species, the exhibition ditches traditional, dusty natural history tropes. Instead, it weaves a dense web of ecological connections through interactive screens, large-scale projections, and immersive environments, proving that heavy scientific data can be turned into a hands-on playground for the public.</p>
      `,
      images: ['projects/living-planet/01_2x1', 'projects/living-planet/02_1x1', 'projects/living-planet/03_1x1', 'projects/living-planet/04_1x1', 'projects/living-planet/05_1x1', 'projects/living-planet/06_2x1', 'projects/living-planet/07_1x1', 'projects/living-planet/08_1x1', 'projects/living-planet/09_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I ran the experience framework, UX/UI strategy, and the entire visual and multimedia layer for the space. My primary battle was architecture: I had to design a structured interaction system that logically linked massive volumes of digital scientific data to the actual physical specimens sitting in front of the visitors. When you are dealing with hundreds of species across screens, projections, and tactile stations, you cannot guess. You iterate, and test until the interaction flow is completely bulletproof.</p>
<p>I spent a year and a half coordinating multidisciplinary internal and external teams across the Benelux region, balancing high-level art direction with down-and-dirty production. To make things even more interesting, the delivery phase hit right during the start of the COVID-19 lockdowns, which was a completely unprecedented situation. Navigating those insane operational constraints meant completely rewriting our workflows on the fly to ensure we actually delivered a world-class exhibition on time.</p>
      `,
      images: ['projects/living-planet/10_2x1', 'projects/living-planet/11_1x1', 'projects/living-planet/12_1x1', 'projects/living-planet/13_2x1', 'projects/living-planet/14_1x1', 'projects/living-planet/15_1x1', 'projects/living-planet/16_1x1', 'projects/living-planet/17_1x1', 'projects/living-planet/18_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Directed the experience framework and UX/UI strategy for a multi-level natural science exhibition.</li>
  <li>Engineered a logical interaction system connecting digital data points to hundreds of physical specimens.</li>
  <li>Led cross-border teams through an intense 18-month, content-heavy production cycle.</li>
  <li>Validated layout flows across screens, projections, and installations through aggressive prototyping.</li>
  <li>Embedded inclusive design principles to make complex biodiversity data accessible to the general public.</li>
  <li>Survived the ultimate stress test, delivering a world-class space despite sudden lockdown constraints.</li>
</ul>
      `,
      images: ['projects/living-planet/19_1x1', 'projects/living-planet/20_1x1', 'projects/living-planet/21_1x1', 'projects/living-planet/22_1x1', 'projects/living-planet/23_2x1'],
    },
  ],

  maker_park: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>ilmi is a new science and innovation center opening in Riyadh, Saudi Arabia. With 38,000 square meters of immersive and interactive installations, it is conceived as a national cultural hub for families and a flagship for informal learning in STREAM disciplines (Science, Technology, Reading, Engineering, Art, Mathematics).</p>
<p>To scale the impact beyond its physical walls, ilmi includes a digital platform extending the experience nationwide. Designed as a freemium ecosystem, it combines educational content, gamified mechanics, interactive features, and external integrations to support continuity between on-site and off-site learning.</p>
      `,
      images: ['projects/maker-park/01_2x1', 'projects/maker-park/02_1x1', 'projects/maker-park/03_1x1', 'projects/maker-park/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>For over three years, I wore three hats simultaneously: lead designer, creative director, and strategist. I didn’t just design the prototype of the digital platform; I contributed to the center’s Digital Learning Strategy while guiding the accessibility guidelines.</p>
<p>Working in a high-profile, fast-paced ecosystem meant translating playful learning objectives and sky-high business requirements into scalable, retention-driven concepts. The briefs constantly evolved, the timelines were intense, and the expectations were huge, but so far this is the project where I’ve learned the most, no doubt! It was a catalyst as well, because the intense intersection of game mechanics and diverse learners’ needs led me straight to my CPACC accessibility certification.</p>
<p>Through it all, I coordinated a global network of partners, cross-functional teams, and vendors. I acted as the captain of the boat keeping everyone and everything aligned, and pulling off miracles under pressure. It was a brutal masterclass in high-stakes leadership, and honestly? The most rewarding project I’ve worked on so far.</p>
      `,
      images: ['projects/maker-park/05_2x1', 'projects/maker-park/06_1x1', 'projects/maker-park/07_1x1', 'projects/maker-park/08_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led end-to-end UX/UI and experience strategy for a large-scale nationwide digital learning ecosystem.</li>
  <li>Co-authored the center’s Learning Digital Strategy from the ground up.</li>
  <li>Pioneered foundational accessibility standards across the entire ecosystem.</li>
  <li>Mastered informal learning and game mechanics, to turn educational goals into engaging experiences.</li>
  <li>Orchestrated a global network of teams and vendors through constantly shifting requirements.</li>
</ul>
      `,
    },

    {
      type: 'article-highlight',
      title: 'Note',
      text: 'This project is still in development and subject to NDA, so only a limited overview can be shared.',
    },
  ],

  manifesto: [
    {
      type: 'article-content-image',
      variant: 'left',
      image: 'misc/wheelchair-sign_1x1',
      richtext: `
<p>Accessibility isn’t a favor. It’s not about being benevolent.<br />And it’s definitely not just for <em>the few</em>.</p>
<p><strong>It’s about ability, and that changes all the time.</strong></p>
<p>Break an arm? Lose your glasses? Struggling with a new language? Suddenly, the world isn’t built for you.<br />Blinded by the sun? Exhausted? Have a killer headache? Suddenly, even the simplest tasks feel impossible.</p>
<p>Let’s face it: the chances of you staying fully able-bodied your entire life are extremely low, if not nonexistent.<br />That’s why it makes more sense to think of everyone as <em>temporarily able-bodied</em>.</p>
<p><strong>Accessibility isn’t special treatment.</strong></p>
<p>It’s just making things better for everyone because we all benefit from subtitles, automatic doors, and easy-to-read instructions. As simple as that.</p>
<p><strong>So, why do we still treat accessibility like a bureaucratic checklist to verify at the end of a project?</strong></p>
<p>It’s time to change that, and I’m all in. I want to create experiences where everyone feels welcome, capable, and comfortable.</p>
      `,
    },

    {
      type: 'article-quote',
      quote: 'It’s not about <em>them</em> at the end of a project. It’s about <em>all of us</em> from the very start.',
    },

    {
      type: 'article-content-image',
      variant: 'right-reversed',
      image: 'misc/yall-means-all_1x1',
      richtext: `
<p>I want to make things less frustrating for everyone.</p>
<p>There’s still a lot of stigma around human diversity, and we often get trapped in rigid ways of thinking. But I’m glad to see that inclusivity is gaining more and more attention.</p>
<p><strong>The revolution is happening, and I want to be part of it!</strong></p>
<p>Not just in my work, but by changing the way we think about accessibility: it shouldn’t be an afterthought but a mindset.</p>
      `,
    },
  ],

  middelen_meter: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p><em>Middelen Meter</em> is a self-monitoring app developed by Jellinek, one of the leading organizations for addiction care in the Netherlands. The tool helps users track their consumption of alcohol, tobacco, cannabis, and medication, giving them a clear, data-driven look at their personal patterns over time.</p>
<p>Because tracking these kinds of habits requires absolute trust, the app is built as a free, privacy-first tool where all data stays local, strictly on the user’s device. Instead of acting like a digital scold or forcing a specific treatment plan, the simple interface focuses on multi-substance tracking that encourages honest self-reflection. It serves as a practical, low-barrier companion for individuals checking in on their habits and the care professionals supporting them.</p>
      `,
      images: ['projects/middelen-meter/01_2x1', 'projects/middelen-meter/02_1x1', 'projects/middelen-meter/03_1x1', 'projects/middelen-meter/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I led the UX/UI redesign of the app, simplifying interaction flows and completely overhauling the visual identity. The real hurdle wasn’t usability and design per se, but the deep psychological and behavioral sensitivity attached to it. If an app feels judgmental, medicalized, or punitive, users simply stop logging their data. My job was to ensure the experience felt empowering rather than corrective, and supportive rather than clinical.</p>
<p>Every design decision had to be shaped around the reality of people in highly fragile stages of self-reflection. I built a refreshed brand identity and a strict design system to provide consistent interaction guidelines across the full experience. Because a large portion of the user base had low digital literacy, we used iterative testing to strip away any complex UI patterns, ensuring the tool was completely intuitive for anyone to use. It is the typical low-key project with a high-stake daily impact.</p>
      `,
      images: ['projects/middelen-meter/05_2x1', 'projects/middelen-meter/06_1x1', 'projects/middelen-meter/07_1x1', 'projects/middelen-meter/08_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led the end-to-end UX/UI redesign, creating an intuitive and empathetic user journey tailored for users with low digital literacy.</li>
  <li>Developed a refreshed brand identity and design system around a non-clinical tone across the entire experience.</li>
  <li>Embedded strict accessibility and usability principles to build deep user trust and comfort.</li>
  <li>Worked on prototyping and testing to strip away complex UI patterns, ensuring smoothness during usage.</li>
  <li>Balanced behavioral sensitivity with radical simplicity, delivering a tool that successfully supports honest self-reflection without passing judgment.</li>
</ul>
      `,
      images: ['projects/middelen-meter/09_2x1', 'projects/middelen-meter/10_1x1', 'projects/middelen-meter/11_1x1', 'projects/middelen-meter/12_2x1', 'projects/middelen-meter/13_2x1', 'projects/middelen-meter/14_1x1', 'projects/middelen-meter/15_1x1', 'projects/middelen-meter/16_2x1'],
    },
  ],

  parassita: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>Lacking an official distribution network, Parassita is an independent magazine about Italy that survives by hitchhiking, reaching Italian expats and Amsterdam residents through a slightly criminal guerrilla distribution strategy where it is secretly slipped inside existing books, magazines, and fanzines across bookstores, newsstands, and public spaces.</p>
<p>Designed for an international audience looking to connect with Italian culture, the magazine bypasses dusty travel clichés, using heavy data visualization, rigorous information design, and sharp visual narratives to dissect the country from an entirely fresh perspective.</p>
<p>Parassita was presented as the thesis project for the Master’s degree in Visual Communication and Multimedia Design at IUAV University of Venice, and it made me a proud mama because it completely subverts standard editorial design.</p>
      `,
      images: ['projects/parassita/01_1x1', 'projects/parassita/02_1x1', 'projects/parassita/03_1x1', 'projects/parassita/04_1x1', 'projects/parassita/05_2x1', 'projects/parassita/06_2x1', 'projects/parassita/07_1x1', 'projects/parassita/08_1x1', 'projects/parassita/09_1x1', 'projects/parassita/10_1x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>This was a completely rogue, one-person operation. I conceived the concept, mapped out the guerrilla distribution strategy, and handled every single layer of execution, including the research, copywriting, photography, editorial layout, and data visualisation.</p>
<p>The parasitic model meant designing under ridiculous, self-imposed physical constraints. To make infiltration work, the magazine was split into three separate pieces. To make things spicier, I restricted each sheet to a rogue format and its own strict duotone colour palette, because why not? When you limit yourself like that, your information hierarchy has to be super intentional and clear. Pulling this off solo required constantly shifting gears between strategy, meticulous research, and nitty-gritty asset production. Of course, I would change a lot of things now, but somehow this is still my precious.</p>
      `,
      images: ['projects/parassita/11_2x1', 'projects/parassita/12_1x1', 'projects/parassita/13_1x1', 'projects/parassita/14_2x1', 'projects/parassita/15_1x1', 'projects/parassita/16_1x1', 'projects/parassita/17_1x1', 'projects/parassita/18_1x1', 'projects/parassita/19_2x1', 'projects/parassita/20_2x1', 'projects/parassita/21_1x1', 'projects/parassita/22_1x1', 'projects/parassita/23_2x1', 'projects/parassita/24_2x1', 'projects/parassita/25_1x1', 'projects/parassita/26_1x1', 'projects/parassita/27_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Conceived and launched an independent publication from raw concept to final print run as a solo creator.</li>
  <li>Orchestrated a parasitic distribution strategy that turned logistical limitations into a powerful concept.</li>
  <li>Owned the full creative stack, executing all research, copywriting, photography, and editorial layouts independently.</li>
  <li>Designed a strict duotone hierarchy to optimize complex data readability across separate editorial sections.</li>
  <li>Translated cultural identity into visual systems, transforming dense socio-political Italian data into engaging narratives for an international audience.</li>
</ul>
      `,
      images: ['projects/parassita/28_2x1', 'projects/parassita/29_1x1', 'projects/parassita/30_1x1', 'projects/parassita/31_2x1'],
    },
  ],

  prodemos: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p><em>ProDemos</em> is an organization based in the political heart of The Hague dedicated to educating citizens, and particularly students, about democracy and the rule of law. To make civic procedures actually interesting to teenagers, they took the education out of the textbook and onto the streets.</p>
<p>The program starts in the classroom, where students draft their own bill proposals. The real action begins when they arrive at the ProDemos Center, splitting into teams for a GPS-guided mobile game. The app leads them through historical political landmarks, requiring them to complete tasks that simulate the reality of the lawmaking process. The journey wraps up with a custom animated film that serves as a debrief, giving them plenty to argue about once they get back to school.</p>
      `,
      images: ['projects/prodemos/01_2x1', 'projects/prodemos/02_1x1', 'projects/prodemos/03_1x1', 'projects/prodemos/04_1x1', 'projects/prodemos/05_1x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I led the UI/UX design and visual direction, coordinating a dedicated team and collaborating with external stakeholders to create a location-based learning experience. We connected three wildly different contexts into one unbreakable loop, balancing academic goals with rigid organizational and educational constraints. All of this, to keep a bunch of teenagers engaged on a screen while navigating a live city and competing with their own smartphones.</p>
<p>Unleashing groups of students into public spaces demanded a max attention to safety and inclusive game dynamics. Through cooperation, focus groups, and live field testing, I refined the interaction logic to make the experience loud enough to compete with real-world distractions, intuitive enough to require zero training, and secure enough to keep everyone safe. Working with the attention spans of teenagers is always by default a lesson.</p>
      `,
      images: [],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led UX/UI and visual direction for a GPS-based educational game.</li>
  <li>Designed a connected learning journey linking classroom preparation to on-site interactive play.</li>
  <li>Coordinated a dedicated team and collaborated with external partners.</li>
  <li>Applied iterative research and testing to validate engagement and comprehension.</li>
  <li>Embedded inclusive design principles to ensure accessibility and safety for diverse student groups.</li>
  <li>Applied game mechanics and motivation models to support playful, goal-oriented learning.</li>
</ul>
      `,
      images: ['projects/prodemos/06_2x1', 'projects/prodemos/07_1x1', 'projects/prodemos/08_1x1', 'projects/prodemos/09_2x1'],
    },
  ],

  services: [
    {
      type: 'article-content-image',
      variant: 'left',
      image: 'misc/service-gradient-1_1x1',
      richtext: `
<h2>Concept & Experience Strategy</h2>
<p>Define what the experience is, who it is for, and how it works.</p>
<ul>
  <li>Audience research and journey mapping</li>
  <li>Concept development and experience structure</li>
  <li>Content translation and narrative framing</li>
  <li>Early-stage project definition</li>
  <li>Development and management of pitches and tenders</li>
  <li>Stakeholder alignment and project framing</li>
</ul>
      `,
    },

    {
      type: 'article-content-image',
      variant: 'right',
      image: 'misc/service-gradient-2_1x1',
      richtext: `
<h2>Creative Leadership & Execution</h2>
<p>Guide projects from concept to delivery, across all touchpoints.</p>
<ul>
  <li>Creative and art direction</li>
  <li>Experience design (physical, digital, and hybrid)</li>
  <li>Visual design, graphic systems, and design production</li>
  <li>Interaction design, informal learning, and game mechanics</li>
  <li>Information design, content integration, and narrative flow</li>
  <li>Leading multidisciplinary teams and guiding stakeholders</li>
</ul>
      `,
    },

    {
      type: 'article-content-image',
      variant: 'left',
      image: 'misc/service-gradient-3_1x1',
      richtext: `
<h2>Accessibility & Inclusive Design</h2>
<p>Integrate accessibility and advocate for more inclusive practices.</p>
<ul>
  <li>Accessibility integration in design processes and workflows</li>
  <li>Applying universal design and accessibility standards</li>
  <li>Research and development of accessibility guidelines</li>
  <li>Accessibility audits, testing and reviews</li>
  <li>Strategic advisory and capacity building</li>
  <li>Workshops and lectures for diverse audiences and contexts</li>
</ul>
      `,
    },
  ],

  shifting_image: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>The Mauritshuis developed <em>Shifting Image</em> to critically examine the colonial legacy of Johan Maurits and the Dutch presence in Brazil, specifically its direct connection to the transatlantic slave trade.</p>
<p>Instead of a traditional, single-narrative history lesson, the exhibition was designed to investigate how power relations shape collective memory, combining brutal historical truths with contemporary critique.</p>
<p>Through digital interfaces and spatial installations, we didn’t just display artifacts; we invited visitors to navigate conflicting viewpoints and question who gets to write history.</p>
      `,
      images: ['projects/shifting-image/01_2x1', 'projects/shifting-image/02_1x1', 'projects/shifting-image/03_1x1', 'projects/shifting-image/04_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I led the UX/UI strategy and multimedia design across the entire exhibition. The challenge was a triptych of technical, editorial, and structural constraints. Heavy-volume, sensitive, layered content that needed an interaction logic giving parallel narratives equal weight without paralyzing the visitor.</p>
<p>When you’re dealing with emotionally charged history, design friction has to disappear. I focused on content hierarchy, clean readability, and dead-simple interaction patterns so the history could breathe. Accessibility wasn’t a feature, it was the foundation.</p>
<p>I guided internal and external teams across iPads, large-scale projections, and physical installations, translating complex interpretive goals into a cohesive, rock-solid experience framework.</p>
      `,
      images: ['projects/shifting-image/05_2x1', 'projects/shifting-image/06_1x1', 'projects/shifting-image/07_1x1', 'projects/shifting-image/08_2x1'],
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Led the strategic UX/UI and multimedia framework for a high-stakes, multi-perspective national exhibition.</li>
  <li>Built content systems from the ground up capable of holding conflicting historical narratives without overwhelming visitors.</li>
  <li>Managed multidisciplinary specialists across digital interfaces, spatial projections, and physical touchpoints.</li>
  <li>Embedded accessibility into the core design logic from day one, ensuring cognitive clarity for a broad audience.</li>
  <li>Recognised with 7+ international awards.</li>
</ul>
      `,
      images: ['projects/shifting-image/09_2x1', 'projects/shifting-image/10_1x1', 'projects/shifting-image/11_1x1', 'projects/shifting-image/12_2x1'],
    },
  ],

  vanishing: [
    {
      type: 'image-grid',
      title: 'The overview',
      richtext: `
<p>Vanishing is an editorial and digital exploration of disappearance across six distinct lenses: Camouflage, Physical Identity, Anonymity, Languages, Extinction, and Universe. Developed as part of the Atlas project at IUAV University of Venice, the project uses information design and visual narratives to make dense, abstract concepts entirely tangible and readable.</p>
<p>The digital extension focuses heavily on animal extinction across three interconnected pieces. A data sonification translates the grim realities of the IUCN Red List into a sound timeline, where animal classes are assigned distinct notes and repetitions reflect endangerment scales. An interactive 3D visualization, navigated via Leap Motion gestural tracking, plots all 14,448 endangered species in a virtual space where depth maps directly to extinction risk, backed by a generative audio layer that responds to user exploration in real time. Finally, a companion web app anchors the experience, providing the necessary data and information.</p>
      `,
      images: ['projects/vanishing/01_2x1', 'projects/vanishing/02_1x1', 'projects/vanishing/03_1x1', 'projects/vanishing/04_2x1', 'projects/vanishing/05_2x1', 'projects/vanishing/06_1x1', 'projects/vanishing/07_1x1', 'projects/vanishing/08_2x1'],
    },

    {
      type: 'article-highlight',
      title: 'TODO:',
      text: 'ADD VIDEO (https://vimeo.com/101531290)',
    },

    {
      type: 'image-grid',
      title: 'The work',
      richtext: `
<p>I managed everything end-to-end from the initial conceptual framing of each spread and digital experience down to the final visual output of both. For the printed atlas, I took care of the whole layout, typography, illustration, and data viz, all while wrestling with the savage but beautiful constraint of a shared, two-color Risograph framework.</p>
<p>The digital expansion was an entirely different beast where my role spanned concept, visual direction, and interaction design. We were building three wildly different components, with each demanding a completely distinct UX approach. My job was to shape the visual and experiential logic for all three, making sure they worked as standalone experiments while still feeling like they belonged to the same conceptual family. Three months of intense work, three people involved, three digital experiences (and one printed chapter) delivered, infinite satisfaction achieved.</p>
      `,
      images: ['projects/vanishing/09_2x1', 'projects/vanishing/10_1x1', 'projects/vanishing/11_1x1', 'projects/vanishing/12_2x1'],
    },

    {
      type: 'article-highlight',
      title: 'TODO:',
      text: 'ADD VIDEO (https://vimeo.com/101524505) (needs vimeo account)',
    },

    {
      type: 'image-grid',
      title: 'The result',
      richtext: `
<ul>
  <li>Art directed a print system, wrestling a strict two-color Risograph limit into a clean structure for complex data.</li>
  <li>Designed a three-tier digital ecosystem, integrating data sonification, a 3D interactive data viz, and a companion web app.</li>
  <li>Translated the abstract concept of disappearance across multiple themes into one cohesive physical and digital experience.</li>
  <li>Harnessed gestural tracking and generative audio to let users physically navigate a virtual space of 14,448 endangered species.</li>
  <li>Featured on the official Leap Motion blog for innovative interaction design.</li>
</ul>
      `,
      images: ['projects/vanishing/13_2x1', 'projects/vanishing/14_1x1', 'projects/vanishing/15_1x1', 'projects/vanishing/16_2x1', 'projects/vanishing/17_2x1', 'projects/vanishing/18_1x1', 'projects/vanishing/19_1x1', 'projects/vanishing/20_2x1', 'projects/vanishing/21_2x1', 'projects/vanishing/22_1x1', 'projects/vanishing/23_1x1', 'projects/vanishing/24_2x1'],
    },
  ],

  we_are_all_temporarily_able_yes_you_too: [
    {
      type: 'article-content',
      richtext: `
<p>Let’s be honest: the word “disabled” makes people uncomfortable, not so much those who live with disability, but those who have to say the word aloud. We tend to avoid it, replacing it with softer labels such as <em>differently abled</em>, <em>person with special needs</em>, or <em>neurodivergent</em>. Sometimes we use those terms carefully, almost proudly, to show how sensitive and inclusive we are. Other times, we avoid the subject altogether because “disabled” feels too harsh, too direct, almost offensive.</p>
<p>But if being disabled weren’t something that concerns “other people”, but a concrete possibility that concerns all of us, then that word would stop feeling so distant. So uncomfortable.</p>
<p>This isn’t the first time we’ve changed a word in the hope of changing perspective.We moved, thankfully, from “handicapped” to “disabled”, precisely to shift attention from the person experiencing a difficulty to the environment that generates it. In fact, the term “disabled” refers to the difficulty or impossibility of carrying out a specific activity autonomously, in relation to particular contexts or barriers. Nothing offensive, nothing sanitised: simply a fact.</p>
<p>And yet the negative, discriminatory, or pity-driven connotations attached to disability are so deeply rooted that finding the right word for it has become almost impossible. Because, in truth, what makes us uncomfortable is not the word itself, but the idea behind it.</p>
<p>Honestly, I don’t think that reaction comes from an excess of sensitivity, but from the fact that most of us know very little about disability. Either because it does not feel like it concerns us, or because we are afraid to even sit with the idea. But how many times in our lives have we found ourselves, quite literally, <em>dis-abled</em>?</p>
<p>We break a limb, lose our glasses, don’t speak the language of the person in front of us: suddenly, the world is no longer built for us.</p>
<p class="paragraph--pause">We’re blinded by the sun, exhausted after a sleepless night, or flattened by a migraine: even the simplest things become impossible.</p>
<p class="paragraph--pause">These are just a few small examples of moments when we are all literally dis-abled, temporarily, yes, but dis-abled nonetheless.</p>
<p>According to the UN, in countries where life expectancy exceeds 70 years, it is estimated that a person spends on average around 8 years, equal to 11.5% of their life, living with some form of disability.</p>
<p class="paragraph--pause">Let’s face reality, then: the chances of remaining fully able for an entire lifetime are extremely low, if not nonexistent. Our functionality, our autonomy, and our physical, cognitive, and emotional balance depend on factors we take for granted, until they’re gone.</p>
      `,
    },

    {
      type: 'article-quote',
      quote: 'That’s why I think it makes more sense to think we are all temporarily able. Yes, you too.',
    },

    {
      type: 'article-content',
      richtext: `
<p>So if we’re all truly temporarily able, why do we find it so hard to relate to disability?</p>
<p>As mentioned earlier, the word disabled was meant to shift attention away from the individual and toward the environment around them. If society creates barriers, society creates disability. Without barriers, much of what we call disability would not exist in the same way.</p>
<p class="paragraph--pause">This is precisely what <em>accessibility</em> is about: removing barriers so that environments and contexts do not disable people in the first place.</p>
<p>There are many examples of real disabilities that aren’t even perceived as such, because society has integrated them so successfully that they have become normalised.</p>
<p class="paragraph--pause">Eyeglasses are a clear example. People who wear them don’t see well, so technically they have a limitation, but nobody thinks of them as disabled, because a solution exists that is so widespread that the condition has simply been absorbed into the system. It is no longer perceived as a barrier and therefore no longer named as disability, even though technically it is.</p>
<p>This shows how much the relationship between disability and context is far more important than we think, even just in defining the concept of disability itself.The same applies to anyone who needs an elevator, subtitles, or simplified instructions. These needs become disabilities only when the environment stops responding, stops offering alternatives, stops allowing flexibility.</p>
      `,
    },

    {
      type: 'article-quote',
      quote: 'In other words, disability isn’t something that belongs to a person; it’s an unequal relationship between that person and a context that never accounted for them.',
    },

    {
      type: 'article-content',
      richtext: `
<p>That is why I want to challenge the assumption that the problem always lies in the individual.</p>
<p class="paragraph--pause">If I cannot use stairs but I have access to a ramp that allows me to reach the same destination as everyone else, in what sense am I <em>dis-abled</em>? <em>Dis-abled</em> from doing what, exactly?</p>
<p>I do not want to deny disability or minimise the real difficulties many people face every day. Speaking about systemic barriers does not erase pain, fatigue, or discrimination. It explains them better. Because I deeply believe that it is also the context that defines disability, not just the body.</p>
<p>If we think about it, we admit this ourselves every time we celebrate a disabled person for having “made it <em>despite everything</em>.” It is precisely in that <em>“despite everything”</em> that the trick hides. Every time someone is applauded for achieving something despite their condition, we are implicitly acknowledging that the system was never designed for them or their needs. We are admitting that to achieve something ordinary, they had to make an extraordinary effort, and instead of questioning that unfair system, we applaud, but very little changes for the person involved.</p>
<p>The problem is that this way of thinking appears everywhere: in the places we inhabit, the services we use, and the experiences we design.</p>
<p class="paragraph--pause">Accessibility is still treated as a kind concession, something to consider only if there’s time, budget, or if someone explicitly asks for it.</p>
<p class="paragraph--pause">And yet today it is required by law. Finally, one might say.</p>
<p>In practice, however, it is often followed more to avoid penalties or look good than out of genuine conviction. It becomes a checklist completed at the last minute with the minimum effort possible. As if ticking a box were enough to say you’ve done your part.But accessibility is not an add-on, nor a formality: it is a collective responsibility.</p>
<p>A design competence that is necessary to guarantee the minimum conditions for something to truly work for all of us, and not only those who happen to fit a standard that, let’s be honest, in the end, represents almost no one.</p>
      `,
    },

    {
      type: 'article-quote',
      quote: 'I believe society is not afraid of disability itself. It is afraid of being treated the way disabled people are treated.',
    },

    {
      type: 'article-content',
      button: { href: '/resources/', title: base.button_resources_title },
      richtext: `
<p>So disability is avoided, stigmatised, or turned into inspirational symbolism. Meanwhile, we continue building physical, digital, and cultural barriers while congratulating ourselves for using the right words, but in reality, nothing has changed.</p>
<p>I'm not here to deny disability, but to reject the toxic narrative around it, because we could all be far more able, or at least given the conditions to be, if the world were designed to truly include every body, every mind, every experience.</p>
<p>The problem is not me. The problem is the world as it was designed. And the fact that we keep thinking of ourselves as able until we're not.</p>
<p>We changed the word.</p>
<p class="paragraph--pause">Now we need to change perspective.</p>
      `,
    },
  ],
}

// ------------- Code below ---

const setImageAlts = (object, lookup = {}) => (!object ? {} : Object.fromEntries(Object.entries(object).map(([key, value]) => (!value || typeof value !== 'object' ? [key, value] : [key, Object.fromEntries(Object.entries(value).map(([propKey, propValue]) => (propKey.endsWith('image') && typeof propValue === 'string' ? [propKey, { src: propValue, alt: lookup[propValue] || '' }] : [propKey, propValue])))]))))
const setBlockImageAlts = (object, lookup = {}) => (!object ? {} : Object.fromEntries(Object.entries(object).map(([key, blockList]) => [key, blockList.map(block => Object.fromEntries(Object.entries(block).map(([propKey, propValue]) => (propKey.endsWith('images') && Array.isArray(propValue) ? [propKey, propValue.map(src => ({ src, alt: lookup[src] || '' }))] : [propKey, propValue]))))])))
const setAllImageAlts = (object, lookup = {}) => {
  const transform = val => (!val || typeof val !== 'object' ? val : Array.isArray(val) ? val.map(transform) : Object.fromEntries(Object.entries(val).map(([k, v]) => (k.endsWith('images') && Array.isArray(v) ? [k, v.map(src => ({ src, alt: lookup[src] || '' }))] : k.endsWith('image') && typeof v === 'string' ? [k, { src: v, alt: lookup[v] || '' }] : [k, transform(v)]))))
  return transform(object)
}
const findBySlug = (collection, slug) => Object.values(collection).find(item => item.slug === slug || item.href?.includes(slug))
const formatMenuItem = item => ({ href: item.href, title: item.menu_title, aria_label: item.aria_label || item.menu_aria_label })
const getMenuItems = (sectionSlugs, projectSlugs, allSections, allProjects) => {
  const mappedSlugs = sectionSlugs.map(slug => {
    const section = findBySlug(allSections, slug)

    if (!section) {
      return null
    }

    const submenuItems =
      slug === 'projects'
        ? projectSlugs
            .map(pSlug => findBySlug(allProjects, pSlug))
            .filter(Boolean)
            .map(formatMenuItem)
        : null

    return { ...formatMenuItem(section), submenu_items: submenuItems }
  })

  return mappedSlugs.filter(Boolean)
}

export default {
  base,
  socials,
  alts,
  sections: setImageAlts(sections, alts),
  projects: setImageAlts(projects, alts),
  resources: setImageAlts(resources, alts),
  menu_items: getMenuItems(base.menu_sections, base.menu_projects, sections, projects),
  footer_socials: base.footer_socials.map(slug => ({ ...socials[slug], target: '_blank' })),
  // eslint-disable-next-line camelcase
  resource_cards,
  content_blocks: setAllImageAlts(content_blocks, alts),
}
