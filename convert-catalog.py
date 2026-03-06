QUALITY      = 85
QUALITY_HERO = 88

# Format: ("source (relative to project root)", "output subfolder (relative to images/)", "output-name.webp", max_width, "alt text")
# Run from project folder: python3 ~/Documents/Web\ Development/tools/convert.py

IMAGES = [
    # ── Badges ────────────────────────────────────────────────────────────────
    ("images/raw/badge-call-811-safe-digging-partner.jpeg", "", "badge-call-811-safe-digging-partner.webp", 400, "Call 811 Safe Digging Partner badge"),
    ("images/raw/badge-isnetworld-member-contractor.jpeg",  "", "badge-isnetworld.webp",                   400, "ISNetworld member contractor badge"),
    ("images/raw/badge-ncms-contractor-monitoring.png",     "", "badge-ncms.webp",                         400, "NCMS contractor monitoring badge"),

    # ── Client logos ──────────────────────────────────────────────────────────
    ("images/raw/logo-colonial-pipeline.jpeg",           "", "client-colonial-pipeline.webp",   400, "Colonial Pipeline logo"),
    ("images/raw/logo-enterprise-products-partners.jpeg","", "client-enterprise-products.webp", 400, "Enterprise Products Partners logo"),
    ("images/raw/logo-kinder-morgan.jpeg",               "", "client-kinder-morgan.webp",        400, "Kinder Morgan logo"),

    # ── Hero / key images (higher quality, larger size) ───────────────────────
    ("images/raw/cat-mini-excavator-railroad-crew.png",      "", "cat-mini-excavator-railroad-crew.webp",    1500, "CAT mini excavator with railroad crew on job site", QUALITY_HERO),
    ("images/raw/cat-mini-excavator-railroad-crew.png",      "", "cat-mini-excavator-railroad-desktop.webp", 1500, "CAT mini excavator with railroad crew on job site", QUALITY_HERO),
    ("images/raw/cat-mini-excavator-railroad-crew.png",      "", "cat-mini-excavator-railroad-mobile.webp",   800, "CAT mini excavator with railroad crew on job site", QUALITY_HERO),
    ("images/raw/pipeline-row-skid-steer-marker-dusk.png",   "", "pipeline-row-skid-steer-marker-dusk.webp",  1500, "Skid steer along pipeline right-of-way at dusk", QUALITY_HERO),
    ("images/raw/pipeline-row-skid-steer-marker-dusk.png",   "", "pipeline-row-skid-steer-marker-desktop.webp",1500, "Skid steer along pipeline right-of-way at dusk", QUALITY_HERO),
    ("images/raw/pipeline-row-skid-steer-marker-dusk.png",   "", "pipeline-row-skid-steer-marker-mobile.webp", 800, "Skid steer along pipeline right-of-way at dusk", QUALITY_HERO),
    ("images/raw/dl-enterprise-crew-safety-briefing.jpeg",   "", "dl-enterprise-crew-safety-briefing-wide.webp",    1500, "DL Enterprise crew safety briefing on job site", QUALITY_HERO),
    ("images/raw/dl-enterprise-crew-safety-briefing.jpeg",   "", "dl-enterprise-crew-safety-briefing-portrait.webp",  900, "DL Enterprise crew safety briefing on job site", QUALITY_HERO),
    ("images/raw/dl-enterprise-crew-safety-briefing.jpeg",   "", "dl-enterprise-crew-safety-briefing-square.webp",    900, "DL Enterprise crew safety briefing on job site", QUALITY_HERO),
    ("images/raw/crew-pipeline-meeting-tent-pipe.png",        "", "crew-pipeline-meeting-tent-pipe.webp",        1500, "Crew meeting under tent at pipeline job site", QUALITY_HERO),
    ("images/raw/crew-pipeline-meeting-tent-pipe.png",        "", "crew-pipeline-meeting-tent-pipe-footer.webp",  1200, "Crew meeting under tent at pipeline job site"),

    # ── Gallery / content images ──────────────────────────────────────────────
    ("images/raw/bobcat-railroad-tie-sorting-trailer.png",       "", "bobcat-railroad-tie-sorting-trailer.webp",       1200, "Bobcat sorting railroad ties onto a trailer"),
    ("images/raw/bulldozer-railroad-tie-yard.jpeg",              "", "bulldozer-railroad-tie-yard.webp",                1200, "Bulldozer working in a railroad tie yard"),
    ("images/raw/cat-excavator-bucket-curb-trench.jpeg",         "", "cat-excavator-bucket-curb-trench.webp",           1200, "CAT excavator digging a curb trench"),
    ("images/raw/cat-skid-steer-concrete-pad.png",               "", "cat-skid-steer-concrete-pad.webp",                1200, "CAT skid steer on a concrete pad"),
    ("images/raw/cat-skid-steer-excavation-stump.jpeg",          "", "cat-skid-steer-excavation-stump.webp",            1200, "CAT skid steer during stump excavation"),
    ("images/raw/cat-skid-steer-gravel-path-crew.jpeg",          "", "cat-skid-steer-gravel-path-crew.webp",            1200, "CAT skid steer grading gravel path with crew"),
    ("images/raw/cat-skid-steer-gravel-rake-railroad-track.jpeg","", "cat-skid-steer-gravel-rake-railroad-track.webp",  1200, "CAT skid steer raking gravel along railroad track"),
    ("images/raw/cat-skid-steer-gravel-rake-railroad.png",       "", "cat-skid-steer-gravel-rake-railroad.webp",        1200, "CAT skid steer raking gravel on railroad right-of-way"),
    ("images/raw/cat-skid-steer-loading-flatbed.jpeg",           "", "cat-skid-steer-loading-flatbed.webp",             1200, "CAT skid steer loading materials onto a flatbed trailer"),
    ("images/raw/cat-skid-steer-row-brushcutting.jpeg",          "", "cat-skid-steer-row-brushcutting.webp",            1200, "CAT skid steer brushcutting pipeline right-of-way"),
    ("images/raw/cat-skid-steer-stump-grinding.jpeg",            "", "cat-skid-steer-stump-grinding.webp",              1200, "CAT skid steer stump grinding on job site"),
    ("images/raw/concrete-slab-fenced-site.jpeg",                "", "concrete-slab-fenced-site.webp",                  1200, "Freshly poured concrete slab at a fenced industrial site"),
    ("images/raw/crew-loading-cat-skid-steer-trailer.jpeg",      "", "crew-loading-cat-skid-steer-trailer.webp",        1200, "Crew loading a CAT skid steer onto a trailer"),
    ("images/raw/doosan-bobcat-major-excavation.jpeg",           "", "doosan-bobcat-major-excavation.webp",             1200, "Doosan bobcat performing major excavation"),
    ("images/raw/excavator-loading-railroad-ties-truck.jpeg",    "", "excavator-loading-railroad-ties-truck.webp",      1200, "Excavator loading railroad ties onto a truck"),
    ("images/raw/fresh-concrete-pad-urban-site.jpeg",            "", "fresh-concrete-pad-urban-site.webp",              1200, "Fresh concrete pad poured at an urban job site"),
    ("images/raw/industrial-gas-pipeline-facility.jpeg",         "", "industrial-gas-pipeline-facility.webp",           1200, "Industrial gas pipeline facility"),
    ("images/raw/industrial-pipeline-facility-cooling-units.jpeg","","industrial-pipeline-facility-cooling-units.webp", 1200, "Industrial pipeline facility with cooling units"),
    ("images/raw/kubota-excavator-trenching-field.png",          "", "kubota-excavator-trenching-field.webp",           1200, "Kubota excavator trenching in a field"),
    ("images/raw/multiple-skid-steers-railroad-tie-yard.jpeg",   "", "multiple-skid-steers-railroad-tie-yard.webp",     1200, "Multiple skid steers working in a railroad tie yard"),
    ("images/raw/railroad-ballast-crew-stacked-ties.jpeg",       "", "railroad-ballast-crew-stacked-ties.webp",         1200, "Railroad ballast crew with stacked ties on job site"),
    ("images/raw/railroad-sorted-rails-ties-site.jpeg",          "", "railroad-sorted-rails-ties-site.webp",            1200, "Sorted rails and ties at a railroad job site"),
    ("images/raw/railroad-tie-jobsite-safety-sign.jpeg",         "", "railroad-tie-jobsite-safety-sign.webp",           1200, "Railroad tie job site with safety signage"),
    ("images/raw/red-chevy-truck-american-flag.jpeg",            "", "red-chevy-truck-american-flag.webp",              1200, "Red Chevy truck with American flag"),
    ("images/raw/red-crew-gravel-pipeline-station.jpeg",         "", "red-crew-gravel-pipeline-station.webp",           1200, "RED Enterprise crew spreading gravel at a pipeline station"),
    ("images/raw/skid-steers-railroad-tie-sorting-yard.jpeg",    "", "skid-steers-railroad-tie-sorting-yard.webp",      1200, "Skid steers sorting railroad ties in a yard"),
    ("images/raw/stacked-sorted-railroad-ties-blue-sky.jpeg",    "", "stacked-sorted-railroad-ties-blue-sky.webp",      1200, "Stacked and sorted railroad ties against a blue sky"),
    ("images/raw/stacked-ties-skid-steer-railroad.jpeg",         "", "stacked-ties-skid-steer-railroad.webp",           1200, "Stacked railroad ties with skid steer on site"),
    ("images/raw/two-cat-excavators-railroad-tracks.png",        "", "two-cat-excavators-railroad-tracks.webp",         1200, "Two CAT excavators working on railroad tracks"),
]
