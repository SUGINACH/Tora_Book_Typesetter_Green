# קובץ מעבר — V23 — 28.10.2026

## מטרת הקובץ והנחיה עליונה

הקובץ הזה ממשיך ומעדכן את `V23/CONTINUATION_2026-10-27.md`. יש לקרוא את שניהם, אבל במקרה של סתירה — **ההנחיות החדשות כאן גוברות**. המשתמש ביקש להמשיך לעבוד ברציפות עד שכל הבעיות נפתרו, ואז לעבור שוב על כל המערכת ולנסות לאתר בעיות שהבדיקות הנוכחיות עלולות להחמיץ, תוך שימוש בכלים ושיטות בדיקה שונים. המשתמש יבדוק את התוצאה רק לאחר שהעוזר סבור שהבעיות נפתרו; לכן אין לעצור כעת כדי לבקש ממנו לבדוק PDF או לבחור את המשך העבודה. יש לבצע את הבדיקות והסקירה העצמאית בעצמנו, ולבקש את בדיקתו רק כשיש בסיס ראייתי מלא להצגת גרסה מוכנה.

**אין להכריז שהכול נפתר על סמך CI ירוק בלבד, ירידה במספר הממצאים, או fixtures מוזרקים.** יש להמשיך לפתור ולבדוק את כל השורות הפתוחות במטריצת הכיסוי, ובסוף לבצע ביקורת אדברסרית: מה לא נבדק, איזה trigger לא הופעל, אילו רכיבים אינם במודל, האם יש false negatives, והאם HTML/DOM ו-PDF עלולים להיות שונים.

## מצב מאגר וענף

- Repository: `SUGINACH/Tora_Book_Typesetter_Green`
- Branch עבודה: `V23` בלבד.
- **אסור למזג, cherry-pick או להעתיק שינויים ל-`V21`**; אלה ענפים מקבילים ונפרדים.
- HEAD שנבדק בעת הכנת הקובץ: `10151168371736e3b4d3f17500f33d4e280e86fe` — `V23: register widow tokenId schema correction` (28.10.2026 10:20:15Z). יש לאמת HEAD מחדש בתחילת השיחה הבאה; ייתכן ש-CI או commits נוספים הסתיימו מאז.
- קובץ הפרוטוקול המחייב: `V23/ISSUE_RESOLUTION_PROTOCOL.md`.
- מטריצת הכיסוי: `V23/ISSUE_COVERAGE_MATRIX_2026-10-28.md`.
- קטלוג הבעיות ותוכנית הטקסט: `V23/COMPREHENSIVE_LAYOUT_ISSUE_CATALOG_AND_TEST_TEXT_PLAN_2026-10-27.md`.
- יש לקרוא גם את סוף `worklog.md`, סוף `V23/MASTER_WORK_REGISTER.md), ואת תיעודי השיחות ב-repo (בפרט `V23/שיחה מספר 2.md), אם קיימים ב-HEAD. אל תסתמך על שמות קבצים בלבד: אמת דרך Git tree אילו תיעודי שיחה קיימים וקרא את הקטעים הרלוונטיים. תיעוד השיחות הוא מקור חשוב להגדרת הכוונה, ההחלטות וההבחנות שהמשתמש כבר קבע.

## מצב CI בנקודת המעבר

בבדיקה האחרונה:
- `Geometry audit CLI` run `40671310326` על HEAD `1015116837...` היה `in_progress`. הוא כולל בין היתר בדיקות smoke, no-legal-split, capacity/H3, empty column, missing column, injected body overflow, orphan diagnostic, widow diagnostic, sparse-page/square-bracket, section-end, ornaments, recto/verso headers ו-H2 ornament geometry.
- `Geometry audit long document` run `40671248203` על commit קודם `f101b76da55f2c166eca120b4e15962e82692b39` היה `in_progress`. שלביו כוללים הרצת המסמך המלא בברירת מחדל ובעיטורים, בדיקות accounting/coverage, PDF screenshots וארכוב הדוח.
- `pages build and deployment` run `40671309614` על HEAD `1015116837...` הסתיים `success`.
- commits וריצות רבות קודמות בוטלו עקב commits חדשים ו-concurrency. יש להתייחס רק לריצות שהסתיימו על ה-HEAD הסופי, או לוודא התאמה מדויקת של commit. בדוק את ה-logs וה-artifacts בפועל, לא רק סטטוס כללי.
- ב-HEAD יש תיקון לחוזה `tokenId` בממצא widow: אם אין מזהה ב-node, נלקח `data-token-id` מה-DOM ואם גם הוא חסר נרשם `null` במפורש. הריצה האחרונה אמורה לאמת את ה-assertion החדש. אין לסגור widow עד שה-CLI וה-artifact מראים את המפתח ואת הערכים הצפויים.

## מה כבר הוכח — ומה לא

### הוכחות ממוקדות קיימות
- הזרקת overflow מבוקרת עברה בעבר ב-run `40669548960`: ממצא אחד `container-overlap/high`, `textOverflowPx=3906.38`, עמוד DOM index 4 (תווית `ג`), עם preview; ה-artifact כלל JSON ו-summary. זה מוכיח את מסלול האבחון במקרה המוזרק, לא את כל מקרי הגלישה הטבעיים או clipping ב-PDF.
- הזרקת orphan עברה ואומתה ב-artifact run `40670450381`: ממצא אחד, שורה אחת, rect ו-metadata, ללא runtime errors. זה מוכיח את מסלול האבחון המוזרק בלבד.
- רגרסיית widow הוספה לאחר מכן; ב-run `40670974338` היא נכשלה בגלל היעדר `tokenId` ב-JSON. התיקון ב-`f101b76...` וב-HEAD הנוכחי מטפל בשדה; יש לבדוק את הריצה החדשה לפני קביעה שהשער עבר.
- ה-CLI כלל קודם הרבה שערים ממוקדים, אך **אין בכך הוכחה טבעית** שכל האלמנות/יתומות, runt, כותרות בתחתית, חפיפות הערות, clipping, TOC, font fallback או DOM/PDF parity נפתרו.

### חובות פתוחות לפי מטריצת הכיסוי
המטריצה היא רשימת עבודה פעילה, לא מסמך סיכום סגור. לכל הפחות יש לטפל בשורות הבאות, לפי הפרוטוקול:
1. Widow/orphan: להשלים widow CI, להוסיף טריגרים טבעיים ולא רק הזרקה; לבדוק ראש/סוף טור ועמוד, line fragments מדודים, controls חיוביים ושליליים.
2. Runt בשורה אחרונה של p-cut: למדוד שברי שורות בפועל ב-RTL, רוחב השורה האחרונה, ספים וחריגים.
3. איזון טורים ו-rollback: להצליב כל ממצא עם ledger, שלב, ניסיון תיקון/rollback, גאומטריה לפני/אחרי ו-counterfactual; עמוד DOM 376 נשאר מושהה עד שכל יתר המשפחות הושלמו.
4. כותרות בתחתית טור/עמוד: בדיקת Range/rects ותנאי מינימום של שתי שורות טקסט אחרי כותרת, כולל כותרות רצופות וחריגים לגיטימיים.
5. H3 ברוחב מלא: אינטראקציות עם טורים עליונים/תחתונים, notes ו-ornaments, לא רק fixture ledger.
6. Sparse-page: baseline קודם הציג 17 עמודים לא מוערכים ב-default ו-18 ב-ornaments עקב `missing-body-flow`. כל עמוד חייב להיות evaluated, excluded עם role/reason מפורש, או not evaluated שחוסם סגירה. אין להפוך עמוד לא מזוהה ל-PASS.
7. Container-gap / סוף פרק וחלק: לאמת את כל החרגות boundary והראיות לעמוד/תווית. הממצא ההיסטורי ב-default `pageIdx=589`, תווית `תקפח`, פער 177px חייב להיבדק בנפרד מהחרגת `pageIdx=590`; אין להסיק שהראשון נפתר מפני שהשני הוחרג.
8. גלישה מחוץ לגבולות העמוד: predicate לכל רכיב גלוי ביחס ל-rect של `.a4-page`, כולל header/footer/ornament/notes, ובדיקות PDF clipping.
9. חפיפת טקסט והערות שוליים: fixture ייעודי שמזריק חפיפה מדידה ומאמת `footnoteOverlapPx`; לא רק overflow כללי.
10. עתודת הערות ו-reflow מאוחר: checkpoints לפני/אחרי reservation, reflow, balance ו-final layout; בדיקת הערה בודדת ו-counterfactual.
11. הערות שוליים ארוכות/מרובות, הערות צד ו-reposition: בדיקות pairwise rects, anchor correctness, שיוך/סדר ושימור תוכן.
12. containment-rounding: לוודא שהסבילות הצרה של note-marker באמת חלה רק בתנאים שנקבעו ושאינה מסתירה clipping.
13. סוגריים עגולים, קינון, סוגר חסר ו-square-bracket scope: להפריד parser/source mismatch מבעיה גאומטרית; לבדוק offsets, token identity ו-fixtures חיוביים ושליליים.
14. מעבר שורה אחרי אות הערה: Range fragments ו-inline DOM test שמוכיח שה-marker והטקסט לא נפרדים שלא במכוון.
15. U+E000/tofu/font fallback: מטריצת גופנים ו-font loading, glyph presence, fallback chain, screenshots ו-PDF.
16. כותרות עליונות recto/verso: כותרות ארוכות, מספרי עמוד חיצוניים, scale/fonts, clipping ו-overlap.
17. עיטורים וקווים מפרידים: כל רכיב active/off, גאומטריה מול body/notes/header, clipping ו-PDF parity.
18. TOC כללי/מפורט: fixture ארוך, עמוד אחרון קצר, repagination/repeat-render, page count ו-DOM→PDF parity.
19. שימור טקסט וסדר: להרחיב מעבר לספירות כלליות ל-markers, U+E000, notes, duplicated/lost tokens ו-source offsets.
20. DOM→HTML/PDF parity: מספר עמודים, טקסט וסדר, font metrics, clipping ו-screenshots.
21. דטרמיניזם: להפריד hash repeatability מאיכות; לבדוק repeat renders וגם Chromium/fonts/surface variations.
22. trace סיבתי: לכל ממצא, לפני/אחרי, stage, רכיבים שהשתנו, counterfactual, confidence; אין להסיק סיבתיות כשחסרים checkpoints.
23. ביצועים/זיכרון/timeouts: למדוד משך וזיכרון לפי stage ולהבדיל בין timeout, renderer crash ו-CI timeout.
24. מטריצת רוחב/גופן/scale: לפחות 3 וריאנטים רלוונטיים, trigger-hit אמיתי ורישום קלטים/סביבה.

אפשר להוסיף/לשנות סדר לפי ממצאים חדשים, אך אין למחוק שורה מהותית בלי ראיה והחלטה מתועדת. יש לעדכן את מטריצת הכיסוי תוך כדי עבודה, לא רק בסוף.

## ממצאים/החלטות היסטוריים שחייבים לשמר

- המשתמש בדק את PDF מה-27.10 ואישר את שאר הממצאים, עם ההבחנות: עמודי ornaments DOM 588/628 הם סיומי פרק; sparse-page תלוי ב-`balance-chapter-end`. Structural-fallback בעמודים 46/218/315/41/109/133 עשוי להיות פתרון חלקי מותר כאשר אין split חוקי, וצריך להשאיר אותו בשליטת המשתמש. אין להציג fallback כהוכחת איזון מלא.
- PDF ו-manifest היסטוריים נמצאים ב:
  `V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/`
  ה-PDF מכיל 26 צילומים אמיתיים מ-Chromium. זהו baseline היסטורי; אחרי תיקונים מהותיים יש להפיק דוח חדש.
- המסמך המלא `very_long_test_text.txt` הוא קלט קנוני, וצריך להריץ אותו גם ב-default וגם ב-active ornaments. fixtures קצרים משלימים בלבד.
- עמוד DOM index 376 מושעה מפורשות עד סיום יתר משפחות הבעיות. בדוק את ה-workflow בפועל כדי לוודא שאין שלב targeted trace שמריץ אותו. אל תשתמש בנתוניו ואל תיצור עבורו צילומים לפני הסרת ההשהיה.
- הייתה הודעת shell בעת ארכוב ה-PDF: `line 13: .a4-page: command not found`, כנראה בגלל backticks בתוך heredoc README. יש לבדוק אם README חסר טקסט ולתקן תיעוד בנפרד.
- כל שינוי מהותי בקוד/אודיט/tests מחייב עדכון `worklog.md` וגם `V23/MASTER_WORK_REGISTER.md`. לשמור על תיעוד מדויק: מה שונה, למה, ראיות, תוצאת בדיקה, ומה עדיין פתוח. אל לרשום PASS לפני שיש תוצאה אמיתית.

## פרוטוקול עבודה מחייב

פעל לפי כל תשעת השלבים ב-`V23/ISSUE_RESOLUTION_PROTOCOL.md`:
1. הגדרה מדידה של הפגם והחריגים;
2. predicate אמין ו-fixtures חיוביים/שליליים;
3. בדיקה/trace דטרמיניסטיים;
4. זיהוי סיבתי של השלב;
5. תכנון תיקון ותחום השפעה;
6. שינוי מבודד;
7. אימות הגאומטריה בפועל;
8. שתי ריצות מלאות, inventory, conservation, determinism, trace, screenshot PDF;
9. הערכה מחודשת עד סגירה או חריג מתועד.

אין להחליש CI, להרחיב exclusions, או לשנות thresholds רק כדי להשיג ירוק. בכל דוח להפריד `evaluated`, `excluded`, `not evaluated`, `not applicable`; totals חייבים להתאים למספר העמודים. יש להבחין בין `implemented`, `exercised`, `asserted` ו-`resolved`.

## ביקורת עצמאית בסוף — חובה

לאחר שכל המשפחות במטריצה נסגרו:
- עבור שוב על כל מטריצה, כל issue kind וכל exclusion.
- חפש false negatives: selectors חסרים, רכיבים לא במודל, DOM nodes שנעלמים ב-extract, early returns, ספים שאינם מופעלים, fixtures שבוחרים רק מקרה נוח, ו-assertions שמסתפקים בקוד יציאה.
- הוסף mutation/negative-control tests כדי לוודא שהשערים נכשלים כשמזריקים פגם, וגם נשארים שקטים במקרה מותר.
- השווה DOM חי, מודל audit, HTML/PDF output וצילומי מסך אמיתיים; בדוק text conservation ו-page count.
- בדוק repeatability, תצורות default/ornaments, וריאנטים רלוונטיים של fonts/width/scale.
- בצע סקירת קוד סטטית נפרדת מהרצת Chromium; חפש scope/runtime errors, stale state, non-finite geometry, missing IDs, mismatched units, early-return paths ו-coverage arithmetic.
- תעד גם מה עדיין לא ניתן להוכיח, אל תטען לשלמות מוחלטת אם יש מגבלה ידועה. רק לאחר מכן הצג למשתמש את ה-PDF/manifest והסבר מה הוכח ומה מוגבל.

## פרומפט לפתיחת השיחה הבאה

המשך ברציפות את עבודת מנוע העימוד בפרויקט `SUGINACH/Tora_Book_Typesetter_Green`, בענף `V23` בלבד. קרא תחילה את `V23/CONTINUATION_2026-10-28.md`, את `V23/CONTINUATION_2026-10-27.md`, את `V23/ISSUE_RESOLUTION_PROTOCOL.md`, את `V23/ISSUE_COVERAGE_MATRIX_2026-10-28.md`, את `V23/COMPREHENSIVE_LAYOUT_ISSUE_CATALOG_AND_TEST_TEXT_PLAN_2026-10-27.md`, את תיעודי השיחות ב-repo (במיוחד `V23/שיחה מספר 2.md), ואת סוף `worklog.md` ו-`V23/MASTER_WORK_REGISTER.md`. אמת את HEAD, היסטוריית commits, קובצי workflow ותוצאות CI בפועל לפני כל מסקנה.

המשתמש ביקש שלא לעצור לבדיקתו באמצע: הוא יבדוק רק אחרי שלדעתך כל הבעיות נפתרו. המשך לבצע תיקונים, בדיקות וסקירה עצמאית עד אז. השתמש בפרוטוקול תשעת השלבים לכל בעיה, הגדר במדויק את predicate והחריגים לפני שינוי קוד, השתמש בכלים שונים (בדיקת קוד סטטית, fixtures חיוביים ושליליים, הזרקת פגמים, Chromium DOM geometry, דוחות JSON/artifacts, PDF screenshots, text conservation, determinism ו-long document בשתי תצורות). אל תחליש שערים ואל תסיק PASS מהיעדר ממצא אם ה-trigger לא הופעל או coverage חסר.

בדוק תחילה את התוצאות העדכניות של CLI run `40671310326` וה-long-document run `40671248203` (ייתכן שיש ריצות חדשות על HEAD). במיוחד השלם את widow regression: ב-run קודם ה-assertion נכשל כי `tokenId` נשמט; התיקון האחרון אמור לרשום tokenId או `null` במפורש. בדוק JSON/artifact בפועל. המשך לאחר מכן לסגור את כל הפערים במטריצת הכיסוי, לרבות natural widow/orphan, runt, heading-bottom, sparse-page `missing-body-flow`, container-gap סוף חלק (`pageIdx=589` / `תקפח` / 177px מול החרגת `pageIdx=590`), page-bound clipping, footnote/side-note overlap ו-reflow, fonts/U+E000, TOC, DOM/PDF parity, trace, determinism וסביבת widths/fonts/scale.

הפק שתי ריצות מלאות של `very_long_test_text.txt` — default ו-active ornaments — אחרי תיקונים, השווה inventory/coverage מול baseline, בדוק artifacts ו-PDF screenshots אמיתיים. שמור את page 376 מושהה עד שכל יתר המשפחות סגורות; ודא שה-workflow לא מריץ אותו. עדכן את מטריצת הכיסוי, `worklog.md` ו-`V23/MASTER_WORK_REGISTER.md` בכל שינוי. אחרי שנראה שכל הבעיות נפתרו, בצע סיבוב ביקורת אדברסרית נוסף כדי לבדוק אם מנגנון הבדיקה עצמו מפספס בעיות. רק אז הצג למשתמש את התוצאה הסופית והראיות, בלי להפריז בטענות. אין למזג V23 לתוך V21.
