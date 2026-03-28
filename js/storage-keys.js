/**
 * storage-keys.js
 * Central registry of all localStorage keys used by the Digital Confidence Centre.
 * Reference this file rather than using string literals directly.
 *
 * Usage: DCC_KEYS.THEME, DCC_KEYS.LANG, etc.
 */

window.DCC_KEYS = {
  // User preferences
  THEME:              'dc-theme',
  FONT_SIZE:          'dc-font-size',
  FONT_SIZE_LEGACY:   'brenda-font-size',  // legacy — migrated on load
  THEME_LEGACY:       'brenda-theme',       // legacy — migrated on load
  LANG:               'dc-lang',
  DYSLEXIC_FONT:      'dc-dyslexic-font',
  HIGH_CONTRAST:      'dc-high-contrast',
  REDUCE_ANIMATIONS:  'dc-reduce-animations',
  READING_GUIDE:      'dc-reading-guide',
  TEXT_SPACING:       'dc-text-spacing',
  SPEECH_SPEED:       'dc-speech-speed',

  // Onboarding and setup
  ONBOARDED:          'dcc_onboarded',
  DEVICE:             'dcc_device',
  GOAL:               'dcc_goal',
  NAME:               'dcc_name',
  SETUP_COMPLETE:     'dc-setup-complete',
  SPLASH_SEEN:        'dc-splash-seen',
  MIGRATED:           'dc-migrated',

  // Location and city
  CITY:               'dc-city',
  LOCATION_CONFIRMED: 'dc-location-confirmed',
  DEVICE_PROFILE:     'dc-device-profile',
  DEVICE_PROMPT_PENDING: 'dc-device-prompt-pending',

  // Module progress (prefix — append module number)
  MODULE_PREFIX:      'dc-module-',

  // Quiz
  QUIZ_ATTEMPTS:      'dc-quiz-attempts',
  QUIZ_BEST:          'dc-quiz-best',
  QUIZ_FINAL_SCORE:   'dc-quiz-final-score',
  QUIZ_SKIP_MODULES:  'dc-quiz-skip-modules',
  QUIZ_M25_COMPLETE:  'dc-module-2-5-complete',
  LAST_QUIZ_SCORE:    'dc-last-quiz-score',
  FINAL_QUIZ_UNLOCKED:'finalQuizUnlocked',
  FINAL_QUIZ_SCORE:   'finalQuizScore',
  FINAL_QUIZ_DATE:    'finalQuizDate',

  // User identity
  USER_NAME:          'dc-user-name',
  EMAIL_CAPTURED:     'emailCaptured',
  EMAIL_CAPTURE_DATE: 'emailCaptureDate',
  USER_EMAIL:         'userEmail',
  USER_NAME_EMAIL:    'userName',

  // Certificate
  CERT_NUMBER:        'dc-cert-number',

  // Analytics and feedback
  ANALYTICS_CONSENT:  'analytics_consent',
  HEATMAP_OPTOUT:     'dc-heatmap-optout',
  FEEDBACK_BACKUP:    'dc-feedback-backup',
  ERROR_LOG:          'dc-error-log',
  RATING_PREFIX:      'dc-rating-',

  // Privacy
  PRIVACY_CONSENT:    'privacyConsentGiven',
  PRIVACY_CONSENT_DATE:'privacyConsentDate',

  // Beta
  BETA_TESTER:        'dc-beta-tester',
  BETA_FEEDBACK:      'dc-beta-feedback',

  // Misc
  YT_INTERCEPT:       'yt_intercept_dismissed',
};
