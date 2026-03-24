# Digital Confidence Centre — Version Française

## Structure

Ce dossier contient la version française des modules 1 à 6 ainsi que la page d'accueil et la FAQ.
La structure reflète exactement la version anglaise.

**État actuel :** Modules 1–6 traduits (machine) — révision professionnelle requise.

## Statut des fichiers

| Fichier | État | Notes |
|---------|------|-------|
| `index.html` | ✅ Complet | Page d'accueil française avec cartes modules 1–6 |
| `faq.html` | ✅ Complet | Top 20 questions fréquentes en français |
| `modules/module-1.html` | ✅ Complet | La Porte de Sortie |
| `modules/module-2.html` | ✅ Complet | Le Bouclier de Sécurité |
| `modules/module-3.html` | ✅ Complet | Mots de Passe et Biométrie |
| `modules/module-4.html` | ✅ Complet | Sécurité des Applications |
| `modules/module-5.html` | ✅ Complet | Courriels et Messages |
| `modules/module-6.html` | ✅ Complet | Services Bancaires en Ligne |
| `modules/module-7.html` | ❌ Non commencé | Disponible en anglais seulement |
| `modules/module-8.html` | ❌ Non commencé | Disponible en anglais seulement |
| `modules/module-9.html` | ❌ Non commencé | Disponible en anglais seulement |
| `modules/module-10.html` | ❌ Non commencé | Disponible en anglais seulement |
| `modules/module-11.html` | ❌ Non commencé | Disponible en anglais seulement |
| `modules/module-12.html` | ❌ Non commencé | Disponible en anglais seulement |

## Décisions de traduction

### Dialecte
- **Français québécois** (fr-CA) partout
- Registre formel « Vous » — programme éducatif pour aînés

### Terminologie clé

| Anglais | Français choisi | Raison |
|---------|----------------|--------|
| email | courriel | Norme de l'OQLF |
| spam/junk | pourriel | Norme OQLF |
| phishing | hameçonnage | Norme OQLF |
| password | mot de passe | Standard |
| scam | arnaque | Usage courant franco-canadien |
| two-factor authentication | authentification à deux facteurs | Norme OQLF |
| password manager | gestionnaire de mots de passe | Descriptif, bien compris |
| App Store / Face ID / Touch ID / iMessage / iPad / iPhone | inchangés | Noms de marque Apple |
| Canada Post | Postes Canada | Nom bilingue officiel |
| CRA | Agence du revenu du Canada (ARC) | Nom bilingue officiel |
| Anti-Fraud Centre | Centre antifraude du Canada | Nom bilingue officiel |
| Connected Canadians | Canadiens Branchés | Nom bilingue officiel |
| CDIC | SADC | Nom français officiel |

### Identifiants de quiz
Tous les ID de quiz utilisent le suffixe `-fr` pour éviter les collisions localStorage avec les versions anglaises.

### Exemples localisés
- Phrase de passe : « Purple-Teacup-Bridge-44 » → « Tulipe-Violette-Pont-44 »
- Exemples bancaires : RBC → « Banque Royale du Canada », TD → « TD Groupe Banque TD »

### Métadonnées des pages
- `lang="fr-CA"` sur toutes les pages
- `<meta name="robots" content="noindex, follow">` — pages françaises non indexées
- Avertissement traduction machine dans le pied de page

### Conventions de chemins

| Emplacement | Préfixe CSS/JS | Préfixe navigation vers la racine |
|-------------|---------------|----------------------------------|
| `lang/fr/modules/` | `../../../` | `../../../` |
| `lang/fr/` | `../../` | `../../` |

### JavaScript (modules français)
Charger uniquement : `app.js`, `accessibility.js`, `progress.js`, `scam-quiz.js` (si quiz présent)

## Révision requise
Cette traduction a été générée par machine et nécessite une révision professionnelle avant déploiement public. Priorités pour la révision humaine :
1. Expression idiomatique naturelle
2. Cohérence terminologique avec les normes du français québécois
3. Calibration du ton pour le public aîné
4. Références locales québécoises (ex. Hydro-Québec vs. Hydro One)

## Approche

- Dialecte préféré : français canadien (variante ontarienne) — pas français européen
- Terminologie clé : « courriel » (pas « email »), « aîné » (pas « senior »)

## Contact pour la traduction

Aaron Kramer — aaron.patzalek@gmail.com
Two Birds Innovation, St. Thomas, Ontario

## Calendrier

Traduction des modules 7–12 prévue selon les ressources disponibles. Des partenariats communautaires avec des organisations franco-ontariennes sont explorés pour financer la traduction professionnelle.

## Dates de traduction
- Modules 1–6, index, faq, README : mars 2026
