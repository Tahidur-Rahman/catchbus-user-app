const PLACES = {
  st_george: {
    location: { lat: 12.0539026, lng: -61.7548639 },
    name: "St. George's",
  },
  grand_anse: {
    location: { lat: -4.3190725, lng: 55.69395129999999 },
    name: "Grand Anse",
  },
  woburn: {
    location: { lat: 12.0196277, lng: -61.73078409999999 },
    name: "Woburn",
  },
  st_david: {
    location: {
      lat: 12.0375095,
      lng: -61.6676857,
    },
    name: "St.Davids",
  },
  morne_jaloux: {
    location: {
      lat: 12.034167,
      lng: -61.73710509999999,
    },
    name: "St.Morne Jaloux",
  },
  la_borie: {
    location: {
      lat: 12.0416722,
      lng: -61.72906559999999,
    },
    name: "La Borie",
  },
  old_westerhall: {
    location: {
      lat: 12.0287631,
      lng: -61.71104639999999,
    },
    name: "Old Westerhall",
  },
  windsor_forest: {
    location: { lat: 12.054513, lng: -61.6874125 },
    name: "Windsor Forest",
  },
  beaton: {
    location: { lat: 12.0328991, lng: -61.7020265 },
    name: "Beaton",
  },
  gouyave: {
    location: {
      lat: 12.1691738,
      lng: -61.7261422,
    },
    name: "Gouyave",
  },
  victoria: {
    location: {
      lat: 12.1929841,
      lng: -61.7020265,
    },
    name: "Victoria/Sauteurs",
  },
  grenvile: {
    location: { lat: 12.1242614, lng: -61.62385649999999 },
    name: "Grenville",
  },
  la_mode: {
    location: {
      lat: 12.0666731,
      lng: -61.73345070000001,
    },
    name: "La mode",
  },
  tempe: {
    location: {
      lat: 12.059752,
      lng: -61.7335118,
    },
    name: "Tempe/ Mt.Parnassus",
  },
  darbeau: {
    location: {
      lat: 12.0625533,
      lng: -61.7502666,
    },
    name: "Darbeau",
  },
  fontenoy: {
    location: {
      lat: 12.0700415,
      lng: -61.75209429999999,
    },
    name: "Fontenoy",
  },
  mt_moritz: {
    location: {
      lat: 12.0823191,
      lng: -61.7466068,
    },
    name: "Mt.Moritz",
  },
  brizan: {
    location: {
      lat: 12.1047522,
      lng: -61.75099239999999,
    },
    name: "Happy hill/ Brizan",
  },
};
export default  [
  { zone: '1', origin: PLACES.st_george, destination: PLACES.grand_anse },
  { zone: '2-A', origin: PLACES.st_george, destination: PLACES.woburn },
  { zone: '2-B', origin: PLACES.st_george, destination: PLACES.st_david },
  { zone: '3', origin: PLACES.st_george, destination: PLACES.morne_jaloux },
  { zone: '4-A', origin: PLACES.st_george, destination: PLACES.la_borie },
  { zone: '4-B', origin: PLACES.st_george, destination: PLACES.old_westerhall },
  { zone: '4-C', origin: PLACES.st_george, destination: PLACES.windsor_forest },
  { zone: '4-D', origin: PLACES.st_george, destination: PLACES.beaton },
  { zone: '5-A', origin: PLACES.st_george, destination: PLACES.gouyave },
  { zone: '5-B', origin: PLACES.st_george, destination: PLACES.victoria },
  { zone: '6', origin: PLACES.st_george, destination: PLACES.grenvile },
  { zone: '7-A', origin: PLACES.st_george, destination: PLACES.la_mode },
  { zone: '7-B', origin: PLACES.st_george, destination: PLACES.tempe },
  { zone: '7-C', origin: PLACES.st_george, destination: PLACES.darbeau },
  { zone: '8-A', origin: PLACES.st_george, destination: PLACES.fontenoy },
  { zone: '8-B', origin: PLACES.st_george, destination: PLACES.mt_moritz },
  { zone: '8-C', origin: PLACES.st_george, destination: PLACES.brizan },
];
