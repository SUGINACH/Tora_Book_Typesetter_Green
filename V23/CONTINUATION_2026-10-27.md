# קובץ מעבר — V23 — 27.10.2026

## הוראות פתיחה לשיחה הבאה

יש להמשיך מהמצב המתועד כאן, לא להתחיל סקירה כללית מחדש. יש לקרוא את הקובץ הזה, את `V23/ISSUE_RESOLUTION_PROTOCOL.md`, את סוף `worklog.md` ואת סוף `V23/MASTER_WORK_REGISTER.md`. יש לפעול בענף `V23` בלבד; אסור למזג או להעתיק שינויים אל `V21`. ממצא האיזון בעמוד 376 נשאר מושהה עד להשלמת יתר סוגי הממצאים.

**המשתמש עבר על ה-PDF האחרון ואישר את יתר הממצאים, עם שתי הערות מהותיות:** עמודי sparse-page 588/628 הם סיומי פרק והדיווח תלוי ב-`balance-chapter-end`; ממצאי structural-fallback בעמודים 46/218/315/41/109/133 הם פתרון חלקי אפשרי כשאין חלוקה חוקית, ויש להשאירו בשליטת המשתמש. אין להניח שהצלחת CI מוכיחה נכונות חזותית.

## מצב Git ו-CI

- Repository: `SUGINACH/Tora_Book_Typesetter_Green`
- Branch: `V23`
- HEAD נוכחי לאחר ארכוב הדוח: `643adc8fadda2eefd794adaa866c8c03a29fb2ba` — `V23: archive rendered layout issue screenshots`.
- commit שעליו בוצעו הבדיקות: `e190b1191377e897a0cf63ac6acc7a32a1db547d` — `V23: classify terminal section gaps across intentional blank pages`.
- [ריצת Long Document המוצלחת](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/actions/runs/40506660569)
- [ריצת CLI המוצלחת](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/actions/runs/40506660520)
- [ריצת Pages המוצלחת על אותו commit בדיקה](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/actions/runs/40506659238)
- Artifact של הביקורת המלאה: [geometry-audit-long-report](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/actions/runs/40506660569/artifacts/12735706761).

## ה-PDF האחרון — נבדק חזותית על ידי המשתמש

תיקיית הדוח שנשמרה ב-branch:
`V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/`

- [פתח PDF — צילומי העמודים](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/blob/V23/V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/layout-issue-screenshot-report.pdf)
- [פתח manifest — מיפוי עמוד PDF לממצא ולצילום המקורי](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/blob/V23/V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/layout-issue-screenshot-manifest.json)
- [README של הדוח](https://github.com/SUGINACH/Tora_Book_Typesetter_Green/blob/V23/V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/README.md)

ה-PDF כולל 26 צילומי מסך אמיתיים שנלכדו מעמודי Chromium המרונדרים, עד שלושה עמודים שונים לכל סוג ממצא. ה-manifest מייחס אותם לשתי תצורות: default (639 עמודים) ו-ornaments (659 עמודים), מאותו commit. אינדקסי DOM ‏375 ו־376 הושמטו במכוון.

### תוצאות audit מתוך JSON של הריצה המוצלחת

**תצורת default — 639 עמודים**
- 27 ממצאים: 6 בינוניים, 21 נמוכים.
- סוגים: imbalance=9, container-gap=8, structural-fallback=6, square-bracket-scope=3, sparse-page=1.
- containment-rounding: אפס ממצאים פעילים; 6 מדידות note-marker נשמרו כחריגות נסבלות.
- container-gap: הכיסוי מלא, 531 נבדקו, 108 הוחרגו לפי סיבה מפורשת, 0 לא נבדקו.
- sparse-page: הכיסוי **אינו מלא** — 535 נבדקו, 87 הוחרגו, 17 לא נבדקו בגלל `missing-body-flow`.

**תצורת ornaments — 659 עמודים**
- 36 ממצאים: 13 בינוניים, 23 נמוכים.
- סוגים: container-gap=12, structural-fallback=8, imbalance=7, sparse-page=6, square-bracket-scope=3.
- containment-rounding: אפס ממצאים פעילים; 10 מדידות note-marker נשמרו כחריגות נסבלות.
- container-gap: הכיסוי מלא, 551 נבדקו, 108 הוחרגו לפי סיבה מפורשת, 0 לא נבדקו.
- sparse-page: הכיסוי **אינו מלא** — 556 נבדקו, 85 הוחרגו, 18 לא נבדקו בגלל `missing-body-flow`.

שערי CI של סבילות note-marker, גבול section-divider, שלמות כיסוי container-gap, trace ממוקד, CLI ויצירת PDF עברו. אלה תוצאות של בדיקות אוטומטיות; הן אינן מחליפות סקירה חזותית.

## החלטות שכבר יושמו ואסור לבטל ללא ראיה

### 1. containment-rounding
חריגות קטנות של note-marker, מעל 1px ועד 3px כלפי מעלה בלבד, כאשר שאר הכיוונים עד 0.25px והגאומטריה מאומתת מול ה-DOM החי, נשמרות ב-`audit.checks.containmentRounding.toleratedRecords` ולא נספרות כליקויים. כל חריגה שאינה עומדת בתנאים נשארת issue. שער ה-CI מאמת את הרשומות ואת העמודים שהוגדרו.
- default: 6 רשומות סבילות; 0 ממצאי containment-rounding.
- ornaments: 10 רשומות סבילות; 0 ממצאי containment-rounding.
- אין להציג את זה כהוכחה שלא קיימת בעיה חזותית אחרת; זו הכרעה צרה בסוג המדידה המסוים.

### 2. container-gap בסוף חלק
הקוד דורש מפריד סיום `.sec-divider-wrap` כילד האחרון של `.page-body-flow`, ואחריו עמוד `.sub-shaar-page` ישירות או דרך עמוד `.blank-page` מפורש אחד. נתוני boundary נשמרים, ושער CI מאמת את הראיות.
- השער דיווח PASS עבור target indices: default `[590]`, ornaments `[588,608,628]`.
- **הערת המשתמש אושרה כממצא gate לא מדויק:** ב-JSON default יש `container-gap` פעיל ב-`pageIdx=589`, תווית `תקפח`, פער 177px; `pageIdx=590` הוא גבול/החרגה נפרדים. יש לוודא שה-gate בודק גם את ממצא 589 עצמו ולא מחשיב את ההחרגה בעמוד הסמוך כהוכחת פתרון.
- לפי JSON הנוכחי, העמודים 588, 608, 628 הם ממצאי `sparse-page`, ועמוד 649 הוא `square-bracket-scope`, לא `container-gap`. המשתמש העיר קודם על סוגי הממצאים האלה, ולכן יש להתייחס לכל אחד לפי סוגו בפועל ולא לערבב ביניהם. אם המשתמש מאשר/מתקן את הזיהוי לאחר צפייה ב-PDF, לתעד את ההכרעה.

### 3. sparse-page — עדיין פתוח
הכיסוי אינו מלא בגלל 17/18 עמודים עם `missing-body-flow`. אין לסמן PASS, ואין להסתיר את המקרים הלא-מוערכים. היה שינוי אבחוני מוכן בעבר לשיפור הכיסוי והוספת שער קשיח, אך אין להניח שהוא נמצא ב-HEAD הנוכחי: התוצאות העדכניות מוכיחות שנותרו 17/18 מקרים לא מוערכים. יש לעיין בקוד וב-commit history, להגדיר את מבנה העמודים/החרגות במדויק, ולתקן רק לאחר סקירת ה-PDF/הערות המשתמש.

## סדר העבודה המחייב מכאן

1. **קודם לקבל את הערות המשתמש על ה-PDF האחרון.** המשתמש הודיע שטרם עבר עליו.
2. למפות כל הערה לפי manifest: תצורה, PDF page number, DOM index, page label, סוג ממצא, מדדים וצילום המקור. לא לערבב בין מספר עמוד מוצג, PDF page number ו-`pageIdx`.
3. לסגור את שאלת container-gap של סוף החלק רק לאחר אימות העמוד המדויק, כולל בדיקת target `pageIdx=589` לעומת החרגת `pageIdx=590`.
4. להשלים את חוזה הכיסוי של sparse-page, כולל 17/18 `missing-body-flow`, בלי החרגות כלליות או החלשת שערים.
5. אחרי כל שינוי אבחוני/מנוע: שתי ריצות מלאות (default + ornaments), CLI, בדיקות הרגרסיה, השוואת inventory, ודוח PDF חדש עם צילומי עמודים אמיתיים בתיקייה חדשה תחת `V23/reports/`.
6. לבדוק שלא נעלם ממצא בגלל שינוי כיסוי/החרגה, ולוודא ששימור הטקסט, הכותרות, ההערות, העיטורים והדטרמיניזם לא נפגעו.
7. רק אחרי סיום סוגי הממצאים האחרים חוזרים לעמוד 376. אין לשנות אותו כעת.

## פרט טכני קטן
ב-log של ארכוב ה-PDF הופיעה הודעת shell `line 13: .a4-page: command not found`: backticks סביב `.a4-page` ב-heredoc של README פורשו כ-command substitution. ה-PDF וה-manifest נוצרו והועלו בהצלחה, אך README שנשמר עלול להחסיר את הטקסט `.a4-page`. לתקן בהמשך על ידי escaping של backticks או heredoc quoted; לא לערבב תיקון תיעוד זה עם שינוי מנוע העימוד.

## פרומפט לפתיחת השיחה הבאה

המשך את העבודה בפרויקט `Tora_Book_Typesetter_Green` בענף `V23` בלבד. קרא תחילה את `V23/CONTINUATION_2026-10-27.md`, את `V23/ISSUE_RESOLUTION_PROTOCOL.md`, ואת הסעיפים האחרונים ב-`worklog.md` וב-`V23/MASTER_WORK_REGISTER.md`. אל תתחיל מחדש ואל תנחש מצב: אמת את HEAD והקבצים בפועל.

הבדיקות הסתיימו בהצלחה על commit `e190b1191377e897a0cf63ac6acc7a32a1db547d`, והדוח נשמר ב-`V23/reports/container-gap_imbalance_sparse-page_square-bracket-scope_structural-fallback_2026-10-27_run-40506660569/`. עדיין לא עברתי על ה-PDF. הצג לי תחילה את ה-PDF וה-manifest והמתן להערותיי לפני הכרזה שהממצאים חזותית נכונים או לפני שינוי נוסף שמבוסס עליהם.

המשך לאחר מכן לפי הסדר: (1) אימות הערותיי מול manifest ו-JSON; (2) בדיקת target סוף-החלק — בדוח default יש container-gap ב-`pageIdx=589` (177px) בעוד שער ההחרגה מאמת `pageIdx=590`, ולכן חייבים ליישב את המיפוי לפי צילום ותווית ולא להניח שהבעיה נסגרה; (3) תיקון כיסוי sparse-page, שבו נותרו 17 עמודים לא מוערכים ב-default ו-18 ב-ornaments בגלל `missing-body-flow`; (4) ריצות מלאות, בדיקות רגרסיה ו-PDF חדש; (5) יתר סוגי הממצאים. אין למזג V23 ל-V21. עמוד 376 נשאר מושהה עד לסיום יתר הבעיות. שמור על פרוטוקול 9 השלבים, אל תחליש שערי CI, ועדכן `worklog.md` ו-`V23/MASTER_WORK_REGISTER.md` בכל שינוי מהותי.


## עדכון לאחר סקירת המשתמש — 2026-10-27

- המשתמש אישר את שאר ממצאי ה-PDF. עמודי DOM 588 ו-628 בתצורת ornaments הם סיומי פרק: `sparse-page` הוא ממצא תקף כאשר `balance-chapter-end=balance`; כאשר נבחר `fill`, סיום קצר הוא התנהגות מכוונת שיש לסווג כהחרגה מפורשת.
- המשתמש אישר לבחון את `structural-fallback` בעמודים 46, 218, 315, 41, 109, 133 כפתרון חלקי בלבד במקרים ללא חלוקה דו־טורית חוקית. יש להשאיר אפשרות זו בלוח ההגדרות; אין לסווג fallback כהוכחה לאיזון מלא.
- תיקון נדרש בשער סוף-החלק: default `pageIdx=589` / `תקפח` / 177px הוא ממצא `container-gap` פעיל; ההחרגה שנבדקת ב-`pageIdx=590` אינה יכולה לבדה להוכיח שהוא נפתר.
- כיסוי `sparse-page` נותר לא שלם ב-HEAD הקודם: 17/18 עמודים עם `missing-body-flow`. אלה עמודי שער/ריקים/שערי משנה בעלי תפקיד מפורש; יש לרשום אותם כהחרגות מבניות מפורשות בלבד, ולהשאיר כל תפקיד לא מוכר כ-`NOT EVALUATED`.
- HEAD שאומת לפני התיקון: `8d0b7db8e6020e0682c2cbe2c166c65b7f077437`. נדרשות ריצות CLI ומסמך מלא בשתי התצורות, השוואת inventory ו-PDF חדש. עמוד 376 נשאר מושהה; V23 בלבד.
