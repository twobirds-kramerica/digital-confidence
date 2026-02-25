/* ============================================
   Digital Confidence Centre
   City Resources Data & Rendering
   ============================================ */

var DC_CITIES = {
  windsor: {
    name: 'Windsor',
    appleStore: { name: 'Devonshire Mall Apple Retail', phone: '519-974-2552', note: '' },
    library: { name: 'Windsor Public Library Tech Help', phone: '519-255-6770' },
    seniorCentre: { name: 'Windsor/Essex Senior Active Adults Centre', phone: '519-254-1108' },
    policeNonEmergency: '519-258-6111'
  },
  london: {
    name: 'London',
    appleStore: { name: 'Masonville Place Apple Store', phone: '519-646-1420', note: '' },
    library: { name: 'London Public Library Digital Creator Space', phone: '519-661-4600' },
    seniorCentre: { name: 'London Middlesex Community Hub Seniors', phone: '519-661-0343' },
    policeNonEmergency: '519-661-5670'
  },
  stthomas: {
    name: 'St. Thomas',
    appleStore: { name: 'Masonville Apple Store (London)', phone: '519-646-1420', note: 'Nearest Apple Store is in London (about 30 min drive)' },
    library: { name: 'St. Thomas Public Library Computer Learning Centre', phone: '519-631-6050' },
    seniorCentre: { name: 'Elgin County Seniors Services', phone: '519-631-1460' },
    policeNonEmergency: '519-631-1224'
  },
  woodstock: {
    name: 'Woodstock',
    appleStore: { name: 'Masonville Apple Store (London)', phone: '519-646-1420', note: 'Nearest Apple Store is in London (about 45 min drive)' },
    library: { name: 'Woodstock Public Library', phone: '519-539-4801' },
    seniorCentre: { name: 'Oxford County Seniors Services', phone: '519-539-9800' },
    policeNonEmergency: '519-537-2323'
  },
  kitchener: {
    name: 'Kitchener',
    appleStore: { name: 'Conestoga Mall Apple Store', phone: '519-772-5150', note: '' },
    library: { name: 'Kitchener Public Library', phone: '519-743-0271' },
    seniorCentre: { name: 'Region of Waterloo Seniors Services', phone: '519-575-4400' },
    policeNonEmergency: '519-570-9777'
  }
};

var NATIONAL_RESOURCES = [
  {
    name: 'Connected Canadians',
    phone: '1-855-808-0505',
    description: 'Free one-on-one technology help for older adults. Trusted by 10,000+ seniors, Government of Canada funded. Trained volunteers help by phone or video call at your pace.',
    efficacy: 'Government of Canada funded — trusted by 10,000+ seniors'
  },
  {
    name: 'Cyber-Seniors',
    phone: '1-844-217-3057',
    description: 'Award-winning programme that pairs older adults with trained tech mentors. Featured on CBC. They specialise in helping with phones, tablets, video calling, and online safety.',
    efficacy: 'Award-winning, CBC featured'
  },
  {
    name: 'Canadian Anti-Fraud Centre',
    phone: '1-888-495-8501',
    description: 'The national reporting centre for fraud and scams in Canada. Report scams, get advice, and check if something is a known scam.',
    efficacy: 'Official Government of Canada resource'
  },
  {
    name: 'Get Cyber Safe',
    phone: '',
    website: 'getcybersafe.gc.ca',
    description: 'The Government of Canada\'s official cyber security website. Plain-language guides on passwords, phishing, safe shopping, and privacy.',
    efficacy: 'Official Government of Canada resource'
  }
];

/* Get current city from localStorage */
function dcGetCity() {
  var key = localStorage.getItem('dc-city');
  if (key && DC_CITIES[key]) return key;
  return null;
}

/* Get city data object */
function dcGetCityData() {
  var key = dcGetCity();
  return key ? DC_CITIES[key] : null;
}

/* Build a resource card HTML string with large tappable phone link */
function dcResourceCard(name, phone, description, efficacy, extra) {
  var html = '<div class="resource-card">';
  html += '<h4>' + name + '</h4>';
  if (description) html += '<p>' + description + '</p>';
  if (phone) html += '<p class="resource-phone"><a href="tel:' + phone.replace(/[^0-9+]/g, '') + '">' + phone + '</a></p>';
  if (extra) html += extra;
  if (efficacy) html += '<span class="efficacy-badge">' + efficacy + '</span>';
  html += '</div>';
  return html;
}

/* Render full resources section for the resources page */
function dcRenderResourcesPage() {
  var container = document.getElementById('local-resources');
  if (!container) return;

  var cityKey = dcGetCity();
  var html = '';

  if (!cityKey) {
    // No city selected — show all cities or prompt
    html += '<div class="tip-block">';
    html += '<span class="tip-label">Set Your City</span>';
    html += '<p>To see local resources for your area, please choose your city.</p>';
    html += '<button class="btn btn-primary" onclick="dcOpenWizard()" style="margin-top:12px;">Choose Your City</button>';
    html += '</div>';

    // Show all cities with headings
    var keys = Object.keys(DC_CITIES);
    for (var i = 0; i < keys.length; i++) {
      html += dcRenderCityBlock(DC_CITIES[keys[i]]);
    }
  } else {
    html += dcRenderCityBlock(DC_CITIES[cityKey]);
  }

  // National resources
  html += '<h2>National Resources</h2>';
  html += '<p>These Canada-wide programmes are available to everyone, no matter where you live.</p>';
  for (var n = 0; n < NATIONAL_RESOURCES.length; n++) {
    var r = NATIONAL_RESOURCES[n];
    var extra = '';
    if (r.website) {
      extra = '<p><a href="https://' + r.website + '" target="_blank" rel="noopener">' + r.website + '</a></p>';
    }
    html += dcResourceCard(r.name, r.phone, r.description, r.efficacy, extra);
  }

  container.innerHTML = html;
}

/* Render a single city's resource block */
function dcRenderCityBlock(city) {
  var html = '<h2 class="city-section-title">Your Local Resources in ' + city.name + '</h2>';

  // Apple Store
  html += '<h3>Apple Store</h3>';
  var appleExtra = city.appleStore.note ? '<p><em>' + city.appleStore.note + '</em></p>' : '';
  html += dcResourceCard(city.appleStore.name, city.appleStore.phone, 'In-person help with iPhones, iPads, and Mac computers. Walk in or book a Genius Bar appointment.', '', appleExtra);

  // Library
  html += '<h3>Library Tech Help</h3>';
  html += dcResourceCard(city.library.name, city.library.phone, 'Free computer and internet access. Many libraries offer one-on-one tech help sessions for seniors.', 'Free');

  // Senior Centre
  html += '<h3>Senior Services</h3>';
  html += dcResourceCard(city.seniorCentre.name, city.seniorCentre.phone, 'Programmes and services for older adults in your community, including technology workshops.', '');

  // Police
  html += '<h3>Police Non-Emergency</h3>';
  html += dcResourceCard(city.name + ' Police (Non-Emergency)', city.policeNonEmergency, 'For fraud or scam reporting. In an emergency, always call 911.', '');

  // Shared fraud line
  html += dcResourceCard('Canadian Anti-Fraud Centre', '1-888-495-8501', 'National fraud reporting hotline. All cities share this resource.', 'Official Government of Canada');

  return html;
}

/* Render compact city help for module "local help" sections */
function dcRenderModuleHelp() {
  var containers = document.querySelectorAll('.local-help-dynamic');
  if (!containers.length) return;

  var city = dcGetCityData();
  containers.forEach(function (el) {
    if (!city) {
      el.innerHTML =
        '<p><strong>Need local help?</strong> <a href="#" onclick="dcOpenWizard(); return false;">Set your city</a> to see local resources here.</p>';
      return;
    }

    var html = '<h4>Local Help in ' + city.name + '</h4>';
    html += '<p><strong>' + city.library.name + '</strong> — <a href="tel:' + city.library.phone.replace(/[^0-9+]/g, '') + '">' + city.library.phone + '</a></p>';
    html += '<p><strong>' + city.seniorCentre.name + '</strong> — <a href="tel:' + city.seniorCentre.phone.replace(/[^0-9+]/g, '') + '">' + city.seniorCentre.phone + '</a></p>';
    html += '<p><strong>Police (non-emergency)</strong> — <a href="tel:' + city.policeNonEmergency.replace(/[^0-9+]/g, '') + '">' + city.policeNonEmergency + '</a></p>';
    html += '<p><a href="resources.html">See all ' + city.name + ' resources</a></p>';
    el.innerHTML = html;
  });
}

/* Update footer/header with city + devices indicator */
function dcUpdateIndicators() {
  var city = dcGetCityData();

  // Footer city labels
  var footers = document.querySelectorAll('.city-footer-label');
  footers.forEach(function (el) {
    if (city) {
      el.innerHTML = 'Showing resources for: <strong>' + city.name + '</strong> &middot; <a href="#" onclick="dcOpenWizard(); return false;">Change</a>';
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });

  // Device indicator
  var deviceLabels = document.querySelectorAll('.device-footer-label');
  var profile = localStorage.getItem('dc-device-profile');
  deviceLabels.forEach(function (el) {
    if (profile) {
      try {
        var parsed = JSON.parse(profile);
        var names = [];
        if (parsed.phone) parsed.phone.forEach(function (d) { if (d !== 'none') names.push(d === 'iphone' ? 'iPhone' : 'Android Phone'); });
        if (parsed.tablet) parsed.tablet.forEach(function (d) { if (d !== 'none') names.push(d === 'ipad' ? 'iPad' : 'Android Tablet'); });
        if (parsed.computer) parsed.computer.forEach(function (d) {
          if (d !== 'none') {
            if (d === 'windows') names.push('Windows');
            else if (d === 'mac') names.push('Mac');
            else if (d === 'chromebook') names.push('Chromebook');
          }
        });
        if (names.length > 0) {
          el.innerHTML = 'Your devices: <strong>' + names.join(', ') + '</strong> &middot; <a href="#" onclick="dcOpenWizard(); return false;">Change</a>';
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      } catch (e) { el.style.display = 'none'; }
    } else {
      el.style.display = 'none';
    }
  });
}

/* Show welcome banner on homepage after onboarding */
function dcShowWelcomeBanner() {
  var welcomeEl = document.getElementById('dc-welcome-banner');
  if (!welcomeEl) return;

  var setupDone = localStorage.getItem('dc-setup-complete');
  var welcomed = sessionStorage.getItem('dc-welcomed');
  if (!setupDone || welcomed) {
    welcomeEl.style.display = 'none';
    return;
  }

  var city = dcGetCityData();
  var profile = localStorage.getItem('dc-device-profile');
  var deviceNames = [];
  if (profile) {
    try {
      var parsed = JSON.parse(profile);
      if (parsed.phone) parsed.phone.forEach(function (d) { if (d !== 'none') deviceNames.push(d === 'iphone' ? 'iPhone' : 'Android Phone'); });
      if (parsed.tablet) parsed.tablet.forEach(function (d) { if (d !== 'none') deviceNames.push(d === 'ipad' ? 'iPad' : 'Android Tablet'); });
      if (parsed.computer) parsed.computer.forEach(function (d) {
        if (d !== 'none') {
          if (d === 'windows') deviceNames.push('Windows PC');
          else if (d === 'mac') deviceNames.push('Mac');
          else if (d === 'chromebook') deviceNames.push('Chromebook');
        }
      });
    } catch (e) { /* ignore */ }
  }

  var msg = 'Welcome! We have set up your Digital Confidence Centre';
  if (city) msg += ' for <strong>' + city.name + '</strong>';
  if (deviceNames.length > 0) msg += ' with instructions for your <strong>' + deviceNames.join(' and ') + '</strong>';
  msg += '. You can change these anytime from the <strong>My Settings</strong> link in the sidebar.';

  welcomeEl.innerHTML = '<span class="check-icon">🎉</span><p>' + msg + '</p>';
  welcomeEl.style.display = '';
  sessionStorage.setItem('dc-welcomed', 'true');
}

/* Initialise on page load */
document.addEventListener('DOMContentLoaded', function () {
  dcRenderResourcesPage();
  dcRenderModuleHelp();
  dcUpdateIndicators();
  dcShowWelcomeBanner();
});
