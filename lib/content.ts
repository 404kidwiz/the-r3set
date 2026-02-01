export const bio = {
    headline: "THE ARCHITECT OF THE SOUND",
    summary: "Michael Len Williams II, professionally known as Mike WiLL Made-It, is the Grammy Award-winning producer who defined the sound of the 2010s and continues to push boundaries in the 2020s. From the trap roots of Atlanta to global pop dominance, his EarDrummer empire has become synonymous with innovation.",
    sections: [
        {
            title: "The Origin",
            content: "Born in Marietta, Georgia (1989), Mike WiLL grew up in a family where music was the heartbeat. Despite early athletic aspirations, a Korg ES1 beat machine gifted by his father at age 14 shifted his trajectory forever. By 16 (2006), he was navigating the Atlanta studio circuit, selling beats and soaking up the game. His breakthrough came with 'Tupac Back' (2011) for Meek Mill and Rick Ross, a track that cemented his status as a force to be reckoned with."
        },
        {
            title: "EarDrummer Empire",
            content: "In 2013, Mike founded EarDrummer Records, signing the duo Rae Sremmurd and launching them into superstardom with hits like 'No Flex Zone' and 'No Type'. The label became a breeding ground for raw talent and genre-bending hits. His work on Miley Cyrus's 'Bangerz' album (2013) showcased his ability to translate trap sensibilities to a global pop audience, creating a cultural shift that is still felt today. 2016 saw him produce Beyoncé's 'Formation' and Rae Sremmurd's 'Black Beatles', both cultural reset moments."
        },
        {
            title: "The R3SET Era",
            content: "Now, Mike WiLL is orchestrating 'THE R3SET' (Ransom 3). With 2024's 'Dirty Nachos' with Chief Keef, the single 'high3r' featuring Lil Yachty and Lil Wayne, and the upcoming album 'Michael' (inspired by Thriller), he is stripping back the noise and focusing on pure, unadulterated sonic excellence. He continues to bridge the gap between street anthems and stadium fillers, proving that the only limit is his own vision."
        }
    ],
    awards: [
        { year: "2013", title: "BET Hip Hop Award - Producer of the Year" },
        { year: "2014", title: "ASCAP Rhythm & Soul - Songwriter of the Year" },
        { year: "2016", title: "Grammy Nomination - Formation (Record of the Year)" },
        { year: "2017", title: "Grammy Award - Contribution to 'Formation'" },
        { year: "2019", title: "Grammy Nomination - King's Dead (Best Rap Song)" },
        { year: "2023", title: "ESPN Lead Producer - Custom NBA Music Strategy" },
        { year: "2024", title: "Dirty Nachos - Acclaimed Collaborative Album" },
        { year: "2026", title: "Verzuz vs. Hit-Boy (January 30)" }
    ],
    socials: {
        instagram: { handle: "@mikewillmadeit", url: "https://instagram.com/mikewillmadeit" },
        twitter: { handle: "@MikeWiLLMadeIt", url: "https://twitter.com/MikeWiLLMadeIt" },
        youtube: { handle: "@MikeWiLLMadeIt", url: "https://www.youtube.com/@MikeWiLLMadeIt" },
        spotify: { url: "https://open.spotify.com/artist/5nRqBPq4flaZ8cCkP38fR4" }
    }
};

// YouTube Thumbnail Helper
const getThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

// ═══════════════════════════════════════════════════════════════════
// COMPLETE PRODUCTION DISCOGRAPHY (2011-2026) - CHRONOLOGICAL
// ═══════════════════════════════════════════════════════════════════

export const discography = [
    // ═══ 2011 ═══
    {
        type: "produce",
        title: "Tupac Back",
        artist: "Meek Mill ft. Rick Ross",
        year: "2011",
        month: "04",
        coverUrl: getThumb("S_RzBeC5ZUE"),
        youtubeId: "S_RzBeC5ZUE"
    },

    // ═══ 2012 ═══
    {
        type: "produce",
        title: "Turn On The Lights",
        artist: "Future",
        year: "2012",
        month: "04",
        coverUrl: getThumb("B7eS_oSt5IY"),
        youtubeId: "B7eS_oSt5IY"
    },
    {
        type: "produce",
        title: "Mercy",
        artist: "Kanye West, Big Sean, Pusha T, 2 Chainz",
        year: "2012",
        month: "04",
        coverUrl: getThumb("7Dqgr0wNyPo"),
        youtubeId: "7Dqgr0wNyPo"
    },
    {
        type: "produce",
        title: "No Lie",
        artist: "2 Chainz ft. Drake",
        year: "2012",
        month: "05",
        coverUrl: getThumb("74G2v-rEnzk"),
        youtubeId: "74G2v-rEnzk"
    },
    {
        type: "produce",
        title: "Bandz A Make Her Dance",
        artist: "Juicy J ft. Lil Wayne, 2 Chainz",
        year: "2012",
        month: "09",
        coverUrl: getThumb("AI0gk2KJeho"),
        youtubeId: "AI0gk2KJeho"
    },
    {
        type: "produce",
        title: "Pour It Up",
        artist: "Rihanna",
        year: "2012",
        month: "11",
        coverUrl: getThumb("ehcVomMexkY"),
        youtubeId: "ehcVomMexkY"
    },

    // ═══ 2013 ═══
    {
        type: "produce",
        title: "Love Me",
        artist: "Lil Wayne ft. Drake, Future",
        year: "2013",
        month: "01",
        coverUrl: getThumb("KY44zvhWhp4"),
        youtubeId: "KY44zvhWhp4"
    },
    {
        type: "produce",
        title: "Bugatti",
        artist: "Ace Hood ft. Future, Rick Ross",
        year: "2013",
        month: "01",
        coverUrl: getThumb("M_tWjL4lQGY"),
        youtubeId: "M_tWjL4lQGY"
    },
    {
        type: "produce",
        title: "Body Party",
        artist: "Ciara",
        year: "2013",
        month: "03",
        coverUrl: getThumb("N6O2nc9RsVM"),
        youtubeId: "N6O2nc9RsVM"
    },
    {
        type: "produce",
        title: "We Can't Stop",
        artist: "Miley Cyrus",
        year: "2013",
        month: "06",
        coverUrl: getThumb("LrUvwg20Fgw"),
        youtubeId: "LrUvwg20Fgw"
    },
    {
        type: "single",
        title: "23",
        artist: "Mike WiLL Made-It ft. Miley Cyrus, Wiz Khalifa, Juicy J",
        year: "2013",
        month: "09",
        coverUrl: getThumb("bbEoRnaOIbs"),
        youtubeId: "bbEoRnaOIbs"
    },

    // ═══ 2014 ═══
    {
        type: "produce",
        title: "Move That Dope",
        artist: "Future ft. Pharrell, Pusha T",
        year: "2014",
        month: "02",
        coverUrl: getThumb("Qj090sC4gLw"),
        youtubeId: "Qj090sC4gLw"
    },
    {
        type: "single",
        title: "Buy the World",
        artist: "Mike WiLL Made-It ft. Future, Lil Wayne, Kendrick Lamar",
        year: "2014",
        month: "03",
        coverUrl: getThumb("bbEoRnaOIbs"), // Using placeholder
    },
    {
        type: "produce",
        title: "No Flex Zone",
        artist: "Rae Sremmurd",
        year: "2014",
        month: "05",
        coverUrl: getThumb("p2cQSPRTdhg"),
        youtubeId: "p2cQSPRTdhg"
    },
    {
        type: "produce",
        title: "No Type",
        artist: "Rae Sremmurd",
        year: "2014",
        month: "09",
        coverUrl: getThumb("wzMrK-aGCug"),
        youtubeId: "wzMrK-aGCug"
    },

    // ═══ 2015 ═══
    {
        type: "produce",
        title: "Throw Sum Mo",
        artist: "Rae Sremmurd ft. Nicki Minaj, Young Thug",
        year: "2015",
        month: "03",
        coverUrl: getThumb("IvcLdyPGLfI"),
        youtubeId: "IvcLdyPGLfI"
    },
    {
        type: "single",
        title: "Drinks On Us",
        artist: "Mike WiLL Made-It ft. The Weeknd, Swae Lee, Future",
        year: "2015",
        month: "06",
        coverUrl: getThumb("yN0GvGfI80Y"),
        youtubeId: "yN0GvGfI80Y"
    },

    // ═══ 2016 ═══
    {
        type: "produce",
        title: "Formation",
        artist: "Beyoncé",
        year: "2016",
        month: "02",
        coverUrl: getThumb("WDZJPJV__bQ"),
        youtubeId: "WDZJPJV__bQ"
    },
    {
        type: "single",
        title: "Nothing Is Promised",
        artist: "Rihanna ft. Mike WiLL Made-It",
        year: "2016",
        month: "06",
        coverUrl: getThumb("6o-RktviPv0"),
        youtubeId: "6o-RktviPv0"
    },
    {
        type: "produce",
        title: "Black Beatles",
        artist: "Rae Sremmurd ft. Gucci Mane",
        year: "2016",
        month: "09",
        coverUrl: getThumb("b8m9zhNAgKs"),
        youtubeId: "b8m9zhNAgKs"
    },
    {
        type: "single",
        title: "Black Barbies",
        artist: "Nicki Minaj ft. Mike WiLL Made-It",
        year: "2016",
        month: "12",
        coverUrl: getThumb("4dM8eOq_44E"),
        youtubeId: "4dM8eOq_44E"
    },

    // ═══ 2017 ═══
    {
        type: "album",
        title: "Ransom 2",
        artist: "Mike WiLL Made-It",
        year: "2017",
        month: "03",
        coverUrl: getThumb("es2ATiwlWOE"), // Using Perfect Pint as representative
    },
    {
        type: "single",
        title: "Perfect Pint",
        artist: "Mike WiLL Made-It ft. Kendrick Lamar, Gucci Mane, Rae Sremmurd",
        year: "2017",
        month: "03",
        coverUrl: getThumb("es2ATiwlWOE"),
        youtubeId: "es2ATiwlWOE"
    },
    {
        type: "produce",
        title: "Humble",
        artist: "Kendrick Lamar",
        year: "2017",
        month: "03",
        coverUrl: getThumb("tvTRZJ-4EyI"),
        youtubeId: "tvTRZJ-4EyI"
    },
    {
        type: "produce",
        title: "DNA",
        artist: "Kendrick Lamar",
        year: "2017",
        month: "04",
        coverUrl: getThumb("NLZRYQMLDW4"),
        youtubeId: "NLZRYQMLDW4"
    },
    {
        type: "produce",
        title: "Rake It Up",
        artist: "Yo Gotti ft. Nicki Minaj",
        year: "2017",
        month: "06",
        coverUrl: getThumb("OrXd_dRNDgw"),
        youtubeId: "OrXd_dRNDgw"
    },

    // ═══ 2018 ═══
    {
        type: "album",
        title: "Creed II: The Album",
        artist: "Various Artists (Executive Produced by Mike WiLL Made-It)",
        year: "2018",
        month: "11",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/98/Creed_II_Soundtrack.jpg",
    },
    {
        type: "produce",
        title: "Powerglide",
        artist: "Rae Sremmurd ft. Juicy J",
        year: "2018",
        month: "05",
        coverUrl: getThumb("95Rzsn-zjr0"),
        youtubeId: "95Rzsn-zjr0"
    },

    // ═══ 2020 ═══
    {
        type: "single",
        title: "What That Speed Bout?!",
        artist: "Mike WiLL Made-It ft. Nicki Minaj, YoungBoy Never Broke Again",
        year: "2020",
        month: "11",
        coverUrl: getThumb("p8W_c6E1M-U"),
        youtubeId: "p8W_c6E1M-U"
    },

    // ═══ 2023 ═══
    {
        type: "single",
        title: "Different Breed",
        artist: "Mike WiLL Made-It ft. Swae Lee, Latto",
        year: "2023",
        month: "10",
        coverUrl: getThumb("V1cFnzBsWZM"),
        youtubeId: "V1cFnzBsWZM"
    },

    // ═══ 2024 ═══
    {
        type: "album",
        title: "Dirty Nachos",
        artist: "Mike WiLL Made-It & Chief Keef",
        year: "2024",
        month: "03",
        coverUrl: getThumb("SgPCEGZGMmM"),
        youtubeId: "SgPCEGZGMmM"
    },
    {
        type: "single",
        title: "high3r",
        artist: "Mike WiLL Made-It ft. Lil Yachty, Lil Wayne",
        year: "2024",
        month: "08",
        coverUrl: getThumb("V1cFnzBsWZM"), // Using similar era artwork
    },

    // ═══ 2026 ═══
    {
        type: "single",
        title: "ROCKSTAR RAGING",
        artist: "Mike WiLL Made-It ft. Swae Lee",
        year: "2026",
        month: "01",
        coverUrl: getThumb("V1cFnzBsWZM"), // Using similar artwork
    },
];

// ═══════════════════════════════════════════════════════════════════
// COMPLETE VIDEOGRAPHY - ALL MUSIC VIDEOS
// ═══════════════════════════════════════════════════════════════════

export const videos = discography
    .filter(item => item.youtubeId) // Only items with video IDs
    .map(item => ({
        title: item.title,
        artist: item.artist,
        year: item.year,
        type: item.type === "single" || item.type === "album" ? "Mike WiLL Original" : "Production Credit",
        youtubeId: item.youtubeId!,
        description: `${item.type === "produce" ? "Produced by Mike WiLL Made-It" : "Official Release"} (${item.year})`
    }));

export const scrollSequences = [
    { name: "clip-1", label: "THE VISION", frames: 193 },
    { name: "clip-2", label: "THE LAB", frames: 194 },
    { name: "clip-3", label: "THE STAGE", frames: 192 },
    { name: "clip-4", label: "THE WORLD", frames: 193 },
    { name: "clip-5", label: "THE LEGACY", frames: 194 },
    { name: "clip-6", label: "THE FUTURE", frames: 193 }
];

// Photo Gallery
export const galleryPhotos = [
    "021672001563-r1-066-31a.jpeg",
    "021672001563-r1-070-33a.JPG",
    "dustdigital-242.JPG",
    "D3E5B33C-9760-48CD-86A0-E1D6374BDAA9.jpeg",
    "BA707EA6-F895-4CE3-999A-64E61B57B7B9.jpeg",
    "A73ED2F7-BD92-493B-B35F-080F930E6B18.jpeg",
    "9FCFA3CE-D65A-48C6-82A3-39171A7CC566.jpeg",
    "C39208E8-96B7-42D1-B8FA-035CF2BF7538.jpeg",
    "67680BA4-C165-4A36-9D3B-BC870E36105A.jpeg",
    "BC32B57E-A1D6-430E-A8A0-99128EEA1A19.jpeg",
    "EB9495B0-C20B-446A-83AF-79396BD86F3A.jpeg",
    "4EDAC26A-4D5C-4E05-9B76-B283E4D168F4.jpeg",
    "IMG_0504.JPG",
    "IMG_0787.JPG",
    "IMG_3679.jpeg",
    "IMG_3686.JPG",
    "3DE1CB21-7FAB-45AD-B16F-4B602F158393.jpeg",
    "854A93AA-AEF3-4914-9867-38BEDE718440.jpeg",
    "9405CD0C-CAEE-44E6-8B8B-B5D6D712D39E.jpeg",
    "9E33EEEC-2996-47AB-A2BC-6760FB8A8F24.jpeg",
    "ABE60E9F-7052-4BAF-BCD0-E89096403896.jpeg",
    "DWY_WhiteOnBlackSeamless_00388.jpeg",
    "IMG_0685.JPG"
].map(filename => `/gallery/${filename}`);
