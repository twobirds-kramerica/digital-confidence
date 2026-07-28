# LOON voice test — DCC beta welcome v2 (2026-07-27)

Aaron asked whether the narration voice could sound more natural than the current
`en-CA-ClaraNeural`. Three real samples were synthesized, all reading the same two lines
of the actual v2 script, all at the same rate (-8%), all free/keyless edge-tts.

**Listen to these before accepting the pick. This is a taste call, not a technical one.**

| Voice | Sample file (full path) | Length | Microsoft voice metadata |
|---|---|---|---|
| `en-CA-ClaraNeural` (v1 default) | `C:\twobirds\digital-confidence\_feedback\poc\renders\voice-test-en-CA-ClaraNeural.mp3` | 13.22s | General; Friendly, Positive |
| `en-US-JennyNeural` | `C:\twobirds\digital-confidence\_feedback\poc\renders\voice-test-en-US-JennyNeural.mp3` | 13.06s | General; Friendly, Considerate, Comfort |
| `en-US-AvaMultilingualNeural` | `C:\twobirds\digital-confidence\_feedback\poc\renders\voice-test-en-US-AvaMultilingualNeural.mp3` | 12.17s | **Conversation, Copilot**; Expressive, Caring, Pleasant, Friendly |

Sample text (identical for all three):
> Welcome to the Digital Confidence Centre, built to help adults feel confident with technology.
> This is the beta site. You are one of the first to see it, and we thank you for your time.

## Recommendation: `en-US-AvaMultilingualNeural`

Ava is the only one of the three from Microsoft's newer conversational voice line. That is
visible in the metadata, not just claimed: Clara and Jenny are tagged content category
`General`, while Ava is tagged `Conversation` / `Copilot` with personalities
`Expressive, Caring, Pleasant, Friendly`. The older `General` voices are tuned for even,
neutral read-aloud; the conversational line carries sentence-level intonation and warmth,
which is what "sounds less like a robot" actually means here. Ava also reads the same text
about 8% faster at the same rate setting, which is a symptom of more natural phrasing
rather than uniform per-word pacing.

Applied as the EN default in the v2 render.

## The trade-off Aaron can veto — and should decide deliberately

**There is no Canadian voice in the Multilingual line.** Choosing Ava means the narrator's
accent changes from Canadian (`en-CA`) to American (`en-US`). That matters more for this
product than for most:

- DCC's footer trust row literally says "Canadian", and the positioning is
  "plain-language lessons for Canadian seniors."
- The audience is 65+ Canadians, who tend to notice an American voice on a
  Canadian-branded service.

So the honest framing is: **more natural voice, less Canadian voice.** There is no option
that gives both. If Aaron prefers the Canadian accent, the revert is one word.

Revert to Canadian:
```
# C:\twobirds\digital-confidence\_feedback\poc\renders\loon-render-generic.py
"en": {"voice": "en-CA-ClaraNeural", "rate": "-8%", "tag": "EN"}
```
then re-run the regenerate command in `DCC-BETA-WELCOME-PRODUCTION-NOTES.md`.

`en-US-JennyNeural` was tested and is not recommended: it is from the same older `General`
line as Clara, so it costs the Canadian accent without buying much naturalness. If the
accent is going to change, it should buy the newer voice line.

## Aaron's decision, 2026-07-27/28 (confirmed live): Ava it is
Aaron listened and explicitly approved `en-US-AvaMultilingualNeural`, accepting the
Canadian-to-American accent trade-off described above. Settled — do not re-litigate the
Clara-vs-Ava question without a new reason to revisit it.

## French: unchanged

`fr-CA-SylvieNeural` stays exactly as it was. No French equivalent trade-off was requested,
and the Multilingual line offers no fr-CA voice either, so changing the French track would
cost the Canadian accent for no naturalness gain.
