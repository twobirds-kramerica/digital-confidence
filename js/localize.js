/* ============================================
   Digital Confidence Centre
   City Localisation System
   Replaces {{PLACEHOLDER}} tags in story blocks
   based on the user's selected city.
   ============================================ */

var DC_CITIES = {
  windsor: {
    name: 'Windsor',
    landmark: 'the Ambassador Bridge',
    library: 'Windsor Public Library (850 Ouellette Ave)',
    seniorCenter: 'Windsor Essex Community Health Centre',
    neighborhood: 'Walkerville',
    restaurant: 'a local Windsor restaurant'
  },
  london: {
    name: 'London',
    landmark: 'Victoria Park',
    library: 'London Public Library (251 Dundas St)',
    seniorCenter: 'London InterCommunity Health Centre',
    neighborhood: 'Old East Village',
    restaurant: 'a local London restaurant'
  },
  stthomas: {
    name: 'St Thomas',
    landmark: 'the Jumbo the Elephant statue',
    library: 'St Thomas Public Library (153 Curtis St)',
    seniorCenter: 'Elgin-St Thomas Community Health Centre',
    neighborhood: 'downtown St Thomas',
    restaurant: 'a local St Thomas café'
  },
  woodstock: {
    name: 'Woodstock',
    landmark: 'Museum Square',
    library: 'Woodstock Public Library (445 Hunter St)',
    seniorCenter: 'Woodstock Hospital Community Health',
    neighborhood: 'downtown Woodstock',
    restaurant: 'a local Woodstock café'
  },
  kitchener: {
    name: 'Kitchener',
    landmark: 'Victoria Park',
    library: 'Kitchener Public Library (85 Queen St N)',
    seniorCenter: 'Kitchener Downtown Community Health',
    neighborhood: 'Belmont Village',
    restaurant: 'a local Kitchener restaurant'
  },
  springfield: {
    name: 'your area',
    landmark: 'the local park',
    library: 'your local library',
    seniorCenter: 'your local community health centre',
    neighborhood: 'your neighbourhood',
    restaurant: 'a local café'
  }
};

/* Safe text-node replacement — does NOT touch event listeners */
function localizeContent() {
  var cityKey = localStorage.getItem('dc-city') || 'windsor';
  var info = DC_CITIES[cityKey] || DC_CITIES.windsor;

  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        /* Skip script and style nodes */
        var parent = node.parentNode;
        if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.textContent.indexOf('{{') !== -1
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      }
    },
    false
  );

  var nodes = [];
  var n;
  while ((n = walker.nextNode())) {
    nodes.push(n);
  }

  nodes.forEach(function (node) {
    node.textContent = node.textContent
      .replace(/\{\{CITY\}\}/g,         info.name)
      .replace(/\{\{LANDMARK\}\}/g,     info.landmark)
      .replace(/\{\{LIBRARY\}\}/g,      info.library)
      .replace(/\{\{SENIOR_CENTER\}\}/g, info.seniorCenter)
      .replace(/\{\{NEIGHBORHOOD\}\}/g, info.neighborhood)
      .replace(/\{\{RESTAURANT\}\}/g,   info.restaurant);
  });
}

document.addEventListener('DOMContentLoaded', localizeContent);
