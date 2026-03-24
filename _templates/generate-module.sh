#!/bin/bash
# Digital Confidence Centre — Quick Module Generator
# Usage: bash _templates/generate-module.sh 13 "Understanding Cloud Storage"
# Requires: _templates/module-template.html to exist

MODULE_NUM="${1}"
MODULE_TITLE="${2}"

if [ -z "$MODULE_NUM" ] || [ -z "$MODULE_TITLE" ]; then
  echo "Usage: bash generate-module.sh [number] [title]"
  echo "Example: bash generate-module.sh 13 \"Understanding Cloud Storage\""
  exit 1
fi

TEMPLATE="_templates/module-template.html"

if [ ! -f "$TEMPLATE" ]; then
  echo "Error: Template not found at ${TEMPLATE}"
  echo "Run this script from the root of the brenda-digital-confidence repo."
  exit 1
fi

DEST="module-${MODULE_NUM}.html"

if [ -f "$DEST" ]; then
  echo "Warning: ${DEST} already exists. Overwrite? (y/N)"
  read -r CONFIRM
  if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Aborted."
    exit 0
  fi
fi

# Calculate prev/next module numbers
PREV=$((MODULE_NUM - 1))
NEXT=$((MODULE_NUM + 1))

sed \
  -e "s/{{MODULE_NUM}}/${MODULE_NUM}/g" \
  -e "s/{{MODULE_TITLE}}/${MODULE_TITLE}/g" \
  -e "s/{{MODULE_NUM_PREV}}/${PREV}/g" \
  -e "s/{{MODULE_NUM_NEXT}}/${NEXT}/g" \
  "${TEMPLATE}" > "${DEST}"

echo ""
echo "Created: ${DEST}"
echo ""
echo "Next steps:"
echo "  1. Open ${DEST} in your editor"
echo "  2. Replace all {{PLACEHOLDERS}} with your content"
echo "  3. Full guide: _templates/module-content-guide.md"
echo ""
echo "Placeholders to fill in:"
echo "  {{OUTCOME_1}}, {{OUTCOME_2}}, {{OUTCOME_3}}"
echo "  {{SECTION_1_TITLE}}, {{SECTION_1_CONTENT}}"
echo "  {{STORY_LABEL}}, {{STORY_CONTENT}}"
echo "  {{SECTION_2_TITLE}}, {{SECTION_2_CONTENT}}"
echo "  {{TIP_LABEL}}, {{TIP_CONTENT}}"
echo "  {{SECTION_3_TITLE}}, {{SECTION_3_CONTENT}}"
echo "  {{SCENARIO_DESCRIPTION}}, {{SCENARIO_ANSWER}}"
echo "  {{TAKEAWAY_ICON_1-6}}, {{TAKEAWAY_1-6}}"
echo "  {{TOPIC_1}}, {{SKILL_1}}, {{CONFIDENCE_1}}"
