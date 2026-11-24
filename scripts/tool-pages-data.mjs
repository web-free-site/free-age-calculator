/** Content and metadata for the five specialty SEO tool pages. */

export const AGE_TOOL_LINKS = [
  { slug: 'age-difference-calculator', label: 'Age difference between two people' },
  { slug: 'days-until-birthday', label: 'Days until my birthday' },
  { slug: 'chronological-age-calculator', label: 'Chronological age calculator' },
  { slug: 'day-of-the-week-born', label: 'Day of the week I was born' },
  { slug: 'school-admission-age-calculator', label: 'School admission age calculator' },
];

export const TOOL_PAGES = [
  {
    file: 'age-difference-calculator/index.html',
    slug: 'age-difference-calculator',
    title: 'Age Difference Calculator Between Two People | Free',
    description:
      'Free age difference calculator between two people. Enter two birth dates for the gap in years, months, days, and total calendar days—in your browser.',
    h1: 'Age difference calculator between two people',
    script: '/assets/age-difference-calculator.js',
    toolHtml: `
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label>Person 1 — date of birth</label>
          <div class="custom-date-input" id="p1-container">
            <input type="text" id="p1-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" aria-label="Person 1 day">
            <span class="separator">/</span>
            <input type="text" id="p1-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" aria-label="Person 1 month">
            <span class="separator">/</span>
            <input type="text" id="p1-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" aria-label="Person 1 year">
          </div>
          <span class="error-msg" id="p1-error">Please enter a valid date</span>
        </div>
        <div class="input-group">
          <label>Person 2 — date of birth</label>
          <div class="custom-date-input" id="p2-container">
            <input type="text" id="p2-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" aria-label="Person 2 day">
            <span class="separator">/</span>
            <input type="text" id="p2-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" aria-label="Person 2 month">
            <span class="separator">/</span>
            <input type="text" id="p2-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" aria-label="Person 2 year">
          </div>
          <span class="error-msg" id="p2-error">Please enter a valid date</span>
        </div>
      </div>
      <div class="glass-card primary-result-card">
        <p class="school-cutoff-summary" id="diff-summary">Enter two valid birth dates to see the age gap.</p>
        <div class="age-display">
          <div class="age-item"><span class="age-value" id="diff-years">—</span><span class="age-label">Years</span></div>
          <div class="age-item"><span class="age-value" id="diff-months">—</span><span class="age-label">Months</span></div>
          <div class="age-item"><span class="age-value" id="diff-days">—</span><span class="age-label">Days</span></div>
        </div>
        <p class="school-cutoff-summary">Total calendar days between the two births: <strong id="diff-total-days">—</strong></p>
      </div>`,
    webAppName: 'Age Difference Calculator Between Two People',
    webAppDescription:
      'Calculate the age gap in years, months, and days between two people from their birth dates. Free, client-side, no sign-up.',
    faq: [
      {
        name: 'How is the age difference between two people calculated?',
        answer:
          'The tool treats the earlier birth date as the starting point and the later one as the end date. It counts complete years, then months, then days—the same calendar-age method used on the main Free Age Calculator—so the gap matches “how old the younger person was when the older one was born” measured forward.',
      },
      {
        name: 'Does it matter which birth date I enter first?',
        answer:
          'No. Results are the same either way. The calculator automatically uses the earlier date as the reference and tells you which person is older.',
      },
      {
        name: 'Can I use this for siblings or couples?',
        answer:
          'Yes. Any two valid calendar birth dates work, including twins born on different days or partners many years apart.',
      },
      {
        name: 'Is this age difference calculator free?',
        answer:
          'Yes. Everything runs in your browser. Dates are not sent to a server and no account is required.',
      },
    ],
    articleHtml: `
      <p>Whether you are checking how many years separate two siblings, curious about the gap between you and a partner, or filling in a form that asks for “age difference in years and months,” you need a method that respects how calendars actually work—not just subtracting birth years.</p>
      <h2>What “age difference” means on a calendar</h2>
      <p>The age gap between two people is the <strong>exact age</strong> of the younger person measured from the older person’s birth date to the younger person’s birth date. That sounds backward until you remember that both births happened on fixed calendar days. The span from the earlier day to the later day is unique, and it decomposes into years, months, and days the same way any other date interval does.</p>
      <p>For example, if Person A was born on <strong>10 January 1980</strong> and Person B on <strong>22 November 1985</strong>, the gap is 5 years, 10 months, and 12 days—not simply 1985 minus 1980.</p>
      <h2>How the calculator works</h2>
      <p>This page uses the same core logic as <a href="/">Free Age Calculator</a> (from the open-source Age-Calculator project). Steps:</p>
      <ol>
        <li>Parse and validate both dates (invalid days like 31 February are rejected).</li>
        <li>Identify which birth came first.</li>
        <li>Count full years from the earlier date to the later date; if the later month/day has not yet been reached in the final year, subtract one year.</li>
        <li>Count remaining months, borrowing from the month when the day number requires it.</li>
        <li>Count leftover days after borrowing.</li>
      </ol>
      <p>The tool also shows <strong>total calendar days</strong> between the two birthdays—the raw day count sometimes requested on immigration or genealogy forms.</p>
      <h2>Worked example</h2>
      <p><strong>Earlier:</strong> 14 March 1992 &nbsp; <strong>Later:</strong> 02 August 1998</p>
      <p>From March 1992 to March 1998 is six full years. From 14 March 1998 to 02 August 1998: March 14→April 14→May 14→June 14→July 14 = 4 months; then 14 July to 02 August = 19 days. The difference is <strong>6 years, 4 months, and 19 days</strong>.</p>
      <h2>Edge cases and leap years</h2>
      <p><strong>February and varying month lengths.</strong> When the day on the later birth is smaller than the day on the earlier birth, the algorithm borrows days from the previous month (28–31 days depending on the month). That is why manual subtraction often drifts off by a day.</p>
      <p><strong>29 February.</strong> Someone born on a leap day has a valid birth date. Comparisons use that calendar day; in non-leap years some institutions use 28 February or 1 March for anniversaries, but the mathematical difference between two fixed dates still uses the stored calendar date.</p>
      <p><strong>Twins born minutes apart on different calendar days.</strong> If one twin was born just before midnight and the other after, the calendar gap may be 0 years, 0 months, and 1 day even though the real-time gap is hours.</p>
      <h2>When to use years-only vs exact age</h2>
      <p>Headlines often round to whole years (“six years apart”). Forms that ask for years, months, and days need the decomposed format this tool prints. Always match the format the recipient expects.</p>
      <p>For a child’s age on one specific day—such as a school intake cutoff—use the <a href="/school-admission-age-calculator/">school admission age calculator</a> instead, which pairs one birth date with an admission date rather than two births.</p>`,
  },
  {
    file: 'days-until-birthday/index.html',
    slug: 'days-until-birthday',
    title: 'How Many Days Until My Birthday | Free Countdown',
    description:
      'See how many days until your birthday—days, weeks, months left, and the weekday of your next birthday. Free countdown in your browser.',
    h1: 'How many days until my birthday',
    script: '/assets/days-until-birthday.js',
    toolHtml: `
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label for="bday-dd">Your date of birth</label>
          <div class="custom-date-input" id="bday-container">
            <input type="text" id="bday-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric" autocomplete="bday-day">
            <span class="separator">/</span>
            <input type="text" id="bday-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric" autocomplete="bday-month">
            <span class="separator">/</span>
            <input type="text" id="bday-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric" autocomplete="bday-year">
          </div>
          <span class="error-msg" id="bday-error">Please enter a valid date in the past</span>
        </div>
      </div>
      <div class="glass-card primary-result-card">
        <div class="age-display">
          <div class="age-item"><span class="age-value" id="until-days">—</span><span class="age-label">Days left</span></div>
          <div class="age-item"><span class="age-value" id="until-weeks">—</span><span class="age-label">Weeks (whole)</span></div>
        </div>
        <p class="school-cutoff-summary" id="until-ym">—</p>
        <p class="school-cutoff-summary">Next birthday falls on a <strong id="until-weekday">—</strong></p>
        <p class="school-cutoff-summary" id="until-next-date">Enter your date of birth above.</p>
      </div>`,
    webAppName: 'How Many Days Until My Birthday',
    webAppDescription:
      'Count down days and weeks until your next birthday and see which weekday it falls on. Free browser tool.',
    faq: [
      {
        name: 'How many days until my birthday is calculated?',
        answer:
          'The tool finds the next calendar date that matches your birth month and day (this year if it is still ahead, otherwise next year), then counts whole days from today to that date. It also shows remaining months and days using calendar borrowing.',
      },
      {
        name: 'Does the countdown include today?',
        answer:
          'If your birthday is today, the next birthday is treated as today and the remaining time shows zero days until the day ends.',
      },
      {
        name: 'What happens if I was born on 29 February?',
        answer:
          'In years without 29 February, JavaScript calendar dates may roll to 1 March when building the next birthday. Schools and governments differ on which substitute date to use; this tool follows the browser calendar. Confirm locally if the exact day matters legally.',
      },
      {
        name: 'Is my birthday sent to a server?',
        answer:
          'No. The countdown runs entirely in your browser.',
      },
    ],
    articleHtml: `
      <p>Planning a party, running a classroom countdown, or simply curious, most people want two numbers: <strong>how many days until my birthday</strong> and <strong>what day of the week</strong> that next birthday lands on. This guide explains the logic behind the calculator above and how to avoid the usual month-length mistakes when counting by hand.</p>
      <h2>Step 1: Find your next birthday date</h2>
      <p>Take your birth month and day and place them in the current year. If that date is today or still in the future, that is your next birthday. If it has already passed this year, move to the same month and day next year.</p>
      <p>Example: born <strong>18 July</strong>, today is <strong>24 November 2026</strong>. July 18, 2026 has passed, so the next birthday is <strong>18 July 2027</strong>.</p>
      <h2>Step 2: Count days until that date</h2>
      <p>The simplest figure is the integer number of midnights between today and the birthday. The tool displays that as <strong>days left</strong> and also <strong>whole weeks</strong> (days divided by 7, rounded down). Some people prefer “3 months and 5 days” style wording; the calculator shows that breakdown using the same borrow-months method as exact-age math.</p>
      <h2>Step 3: Weekday of the next birthday</h2>
      <p>Weekdays cycle every seven days. Once the next birthday date is known, its weekday is fixed—you can read it from a calendar or let the tool print Monday through Sunday for you. That helps when booking venues that care about Friday vs Saturday.</p>
      <h2>Worked example</h2>
      <p>Birth date: <strong>05 May 1995</strong>. Today: <strong>24 November 2026</strong>. Next birthday: <strong>05 May 2027</strong> (Wednesday in 2027). From 24 Nov 2026 to 05 May 2027 is 162 calendar days in a common year—about 23 weeks and 1 day. The live tool recalculates whenever you change the birth date.</p>
      <h2>Leap years and short months</h2>
      <p>February has 28 days in common years and 29 in leap years, so hand-counting through February trips people up. Always use the real length of each month rather than assuming 30 days.</p>
      <p>Leap-day births are rare but real. When February 29 does not exist in the target year, many cultures pick 28 February or 1 March as the “observed” birthday. This calculator uses the ECMAScript <code>Date</code> rules: constructing 29 February in a non-leap year advances to March 1. If your jurisdiction uses a different convention, compare results with official guidance.</p>
      <h2>Timezone note</h2>
      <p>The countdown uses your device’s local clock. If you are traveling across time zones near midnight, the day count could differ by one compared with someone in another region. For party planning that rarely matters; for legal midnight deadlines it might.</p>
      <p>For full exact age (not just the countdown), visit the <a href="/">main Free Age Calculator</a> or read <a href="/how-to-count-days-until-your-next-birthday/">how to count days until your next birthday</a> by hand.</p>`,
  },
  {
    file: 'chronological-age-calculator/index.html',
    slug: 'chronological-age-calculator',
    title: 'Chronological Age Calculator | Free Years Months Days',
    description:
      'Free chronological age calculator for any test date. See years, months, and days as used in schools and educational testing—browser-only, no medical claims.',
    h1: 'Chronological age calculator',
    script: '/assets/chronological-age-calculator.js',
    toolHtml: `
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label>Date of birth</label>
          <div class="custom-date-input" id="chrono-dob-container">
            <input type="text" id="chrono-dob-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="chrono-dob-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="chrono-dob-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric">
          </div>
          <span class="error-msg" id="chrono-dob-error">Enter a valid birth date on or before the test date</span>
        </div>
        <div class="input-group">
          <label>Test or assessment date</label>
          <div class="custom-date-input" id="chrono-test-container">
            <input type="text" id="chrono-test-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="chrono-test-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="chrono-test-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric">
          </div>
          <span class="error-msg" id="chrono-test-error">Enter a valid test date</span>
        </div>
      </div>
      <div class="glass-card primary-result-card">
        <p class="school-cutoff-summary" id="chrono-line">Enter birth date and test date to compute chronological age.</p>
        <div class="age-display">
          <div class="age-item"><span class="age-value" id="chrono-years">—</span><span class="age-label">Years</span></div>
          <div class="age-item"><span class="age-value" id="chrono-months">—</span><span class="age-label">Months</span></div>
          <div class="age-item"><span class="age-value" id="chrono-days">—</span><span class="age-label">Days</span></div>
        </div>
      </div>`,
    webAppName: 'Chronological Age Calculator',
    webAppDescription:
      'Compute chronological age in years, months, and days on any test date for education settings. Free and client-side.',
    faq: [
      {
        name: 'What is chronological age?',
        answer:
          'Chronological age is the amount of time that has passed from birth to a given date, expressed as years, months, and days. It is separate from grade level or developmental measures.',
      },
      {
        name: 'How do schools and testers report chronological age?',
        answer:
          'Many school psychologists and test publishers report years-months-days (for example 8-4-12 for eight years, four months, twelve days). This tool uses the same calendar decomposition; always follow the manual for the specific test you administer.',
      },
      {
        name: 'Does this calculator round months or years?',
        answer:
          'It does not round up to the next year or month. It shows complete years, then complete months, then leftover days—the usual “borrow days from the prior month” convention.',
      },
      {
        name: 'Is this a medical or diagnostic tool?',
        answer:
          'No. It performs calendar math only. It does not compute mental age, cognitive scores, or clinical diagnoses.',
      },
    ],
    articleHtml: `
      <p><strong>Chronological age</strong> sounds technical, but it is simply how old someone is on a particular calendar day, broken into years, months, and days. Schools, educational psychologists, and standardized test publishers often record it that way on score reports—not as a single decimal like 8.37 years.</p>
      <h2>Why three parts instead of one number?</h2>
      <p>Growth and curriculum decisions still lean on whole years, yet children born in January and December of the same year are not the same maturity within a classroom. Years-months-days captures the fine structure admissions officers and examiners expect when they ask, “What was the student’s chronological age on the date of testing?”</p>
      <h2>How this calculator computes chronological age</h2>
      <p>Given a birth date and a <strong>test date</strong> (or any reference date):</p>
      <ol>
        <li>Verify both dates and ensure birth is not after the test date.</li>
        <li>Subtract years, adjusting if the test month/day is before the birthday in the final year.</li>
        <li>Subtract months with day borrowing when needed.</li>
        <li>Report remaining days.</li>
      </ol>
      <p>This matches the algorithm on the <a href="/">Free Age Calculator</a> when you use “compare with another date,” but this page labels fields the way school forms usually do.</p>
      <h2>Rounding and conventions—stated honestly</h2>
      <p>Different publishers phrase rules differently. Some score reports truncate; others require exact Y-M-D strings. A few older manuals describe converting months to decimal years for lookup tables—<strong>that is not what this page does</strong>. If a manual tells you to round to the nearest month or year, apply that rule after you obtain the exact breakdown here.</p>
      <p>This site makes <strong>no medical or diagnostic claims</strong>. Test norms, eligibility, and clinical interpretation belong to the licensed professional administering the instrument.</p>
      <h2>Worked example</h2>
      <p>Birth: <strong>12 September 2017</strong>. Test date: <strong>03 February 2026</strong>.</p>
      <p>From September 2017 to September 2025 = 8 years. February 3 is before September 12 in 2026, so still 8 years. From 12 Sep 2025 to 12 Jan 2026 = 4 months. From 12 Jan to 3 Feb = 22 days. Chronological age = <strong>8 years, 4 months, 22 days</strong>.</p>
      <h2>Leap years and edge birthdays</h2>
      <p>Testing near February? Remember borrowed days from January come from 28 or 29 days. Leap-day births follow the same borrow rules; institutions may define observed birthdays separately—this tool uses the stored calendar date you enter.</p>
      <p>If the test date is the child’s birthday, months and days read zero even though hours may have passed—forms care about calendar dates, not time of day unless explicitly stated.</p>
      <h2>Related tools</h2>
      <p>For age on a school intake cutoff rather than a test session, try the <a href="/school-admission-age-calculator/">school admission age calculator</a>. For gap between two people’s births, use the <a href="/age-difference-calculator/">age difference calculator</a>.</p>
      <h2>Comparing chronological age with grade placement</h2>
      <p>Grade placement is a human decision. A student who is young for the grade may still thrive, and an older student may repeat a year for social reasons. Chronological age is one input among many—IEP teams, coaches, and examiners may also consider achievement scores, interview answers, or motor skills.</p>
      <p>When you submit forms, copy the years-months-days line exactly as printed. Transposing months and days is a common clerical error that triggers mismatches with scoring software.</p>`,
  },
  {
    file: 'day-of-the-week-born/index.html',
    slug: 'day-of-the-week-born',
    title: 'What Day of the Week Was I Born | Free Finder',
    description:
      'Find what day of the week you were born—or any date. Free weekday finder using your birth date, no download.',
    h1: 'What day of the week was I born',
    script: '/assets/day-of-the-week-born.js',
    toolHtml: `
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label for="dow-dd">Date of birth (or any date)</label>
          <div class="custom-date-input" id="dow-container">
            <input type="text" id="dow-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="dow-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="dow-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric">
          </div>
          <span class="error-msg" id="dow-error">Please enter a valid date</span>
        </div>
      </div>
      <div class="glass-card primary-result-card">
        <div class="age-display">
          <div class="age-item"><span class="age-value" id="dow-weekday" style="font-size:2rem">—</span><span class="age-label">Weekday</span></div>
        </div>
        <p class="school-cutoff-summary" id="dow-full">Enter any calendar date to see the weekday.</p>
      </div>`,
    webAppName: 'What Day of the Week Was I Born',
    webAppDescription:
      'Discover the weekday for any date of birth using a free browser calendar tool.',
    faq: [
      {
        name: 'How does the tool know what day of the week I was born?',
        answer:
          'It builds a standards-based JavaScript Date for your day, month, and year, then reads the localized weekday name. The underlying calendar is the Gregorian system used in most countries today.',
      },
      {
        name: 'Can I check weekdays for dates before 1970?',
        answer:
          'Yes, for typical birth years. Very ancient dates may hit JavaScript engine limits; for genealogy in the 1800s–1900s the result is reliable.',
      },
      {
        name: 'Were weekdays different in the Julian calendar?',
        answer:
          'Countries switched from Julian to Gregorian at different times, so historical records may not match a naive Gregorian calculation. This tool assumes Gregorian dates as you enter them.',
      },
      {
        name: 'Is the weekday finder free?',
        answer:
          'Yes. It runs locally with no account.',
      },
    ],
    articleHtml: `
      <p>People ask <strong>what day of the week was I born</strong> out of curiosity, for astrology charts, to plan “born on a Monday” reunions, or to complete family history forms. You do not need a paper perpetual calendar if you trust modern calendar math.</p>
      <h2>Gregorian weekdays in plain language</h2>
      <p>Most countries now use the <strong>Gregorian calendar</strong>, which repeats a 400-year cycle of weekdays. Each civil date maps to exactly one of Monday through Sunday. Leap years insert 29 February so the pattern stays aligned with Earth’s orbit.</p>
      <h2>What the calculator does</h2>
      <p>Enter day, month, and year. The tool validates the triplet, constructs a date object, and prints the full weekday name plus a long-form date string (for example “Wednesday, March 14, 1990”). No tables or mental arithmetic required.</p>
      <h2>Hand-check ideas (optional)</h2>
      <p>Enthusiasts use algorithms such as Zeller’s congruence or John Conway’s Doomsday rule. They are excellent pencil-and-paper exercises but easy to misapply across centuries. When accuracy matters, software checks are quicker.</p>
      <h2>Worked examples</h2>
      <ul>
        <li><strong>20 July 1969</strong> — famous historic Sunday (Apollo 11 landing).</li>
        <li><strong>01 January 2000</strong> — a Saturday; useful sanity check for “Y2K baby” folklore.</li>
        <li><strong>29 February 2004</strong> — a Sunday leap day.</li>
      </ul>
      <p>Type any of those into the tool to confirm.</p>
      <h2>Historical and cultural caveats</h2>
      <p>Genealogists sometimes copy dates from parish registers recorded in the <strong>Julian calendar</strong>. Britain and its colonies adopted Gregorian dates in 1752, skipping 11 days. A baptism recorded as 5 September 1752 Old Style may correspond to a different Gregorian weekday than you get if you type “5/9/1752” literally here.</p>
      <p>Timezone is irrelevant for weekday of birth unless the birth happened near midnight in a distant timezone and your source document uses local civil date only—most birth certificates already state the civic date.</p>
      <h2>Combine with other age tools</h2>
      <p>After learning your weekday, calculate <a href="/days-until-birthday/">how many days until your next birthday</a> or your <a href="/chronological-age-calculator/">chronological age on a test date</a> with the other free tools on this site.</p>
      <h2>Planning around your weekday</h2>
      <p>Knowing you were born on a Saturday might explain family stories about weekend baptisms or hospital staffing. Event planners sometimes avoid weekdays with heavy commute traffic; if your milestone birthday lands on a Tuesday, you might celebrate on the nearest weekend even though the civic date differs.</p>
      <p>Writers and game designers also look up weekdays to keep fictional timelines consistent. If a novel says “born Monday, died Thursday,” readers subconsciously check whether that span is plausible. A quick lookup keeps drafts honest without opening a spreadsheet.</p>
      <h2>Privacy</h2>
      <p>Like every tool on this domain, the weekday finder never transmits your date to a server. You can clear your browser tab and leave no trail beyond ordinary site analytics described on the <a href="/privacy/">privacy page</a>.</p>
      <h2>Telling the story in one sentence</h2>
      <p>Once you know the weekday, you can weave it into a biography line: “Born Sunday, 9 June 1985, in Manchester.” That single extra word costs nothing on paper but helps descendants reading the entry decades later visualize the week you entered the world.</p>`,
  },
  {
    file: 'school-admission-age-calculator/index.html',
    slug: 'school-admission-age-calculator',
    title: 'Age Calculator for School Admission | Free Cutoff Tool',
    description:
      'Free age calculator for school admission: enter birth date and your school’s cutoff date for exact years, months, and days. Verify rules locally.',
    h1: 'Age calculator for school admission',
    script: '/assets/school-admission-age-calculator.js',
    toolHtml: `
      <div class="glass-card input-card no-print">
        <div class="input-group">
          <label>Child’s date of birth</label>
          <div class="custom-date-input" id="adm-dob-container">
            <input type="text" id="adm-dob-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="adm-dob-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="adm-dob-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric">
          </div>
          <span class="error-msg" id="adm-dob-error">Enter a valid birth date on or before the cutoff</span>
        </div>
        <div class="input-group">
          <label>School admission cutoff date <span class="school-disclaimer">(edit to match your school)</span></label>
          <div class="custom-date-input" id="adm-cut-container">
            <input type="text" id="adm-cut-dd" class="date-part" placeholder="DD" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="adm-cut-mm" class="date-part" placeholder="MM" maxlength="2" inputmode="numeric">
            <span class="separator">/</span>
            <input type="text" id="adm-cut-yyyy" class="date-part" placeholder="YYYY" maxlength="4" inputmode="numeric">
          </div>
          <span class="error-msg" id="adm-cut-error">Enter a valid cutoff date</span>
          <p class="school-disclaimer"><button type="button" class="text-btn" id="adm-example-cutoff">Use example: 1 September ${new Date().getFullYear()}</button> (illustration only—confirm your school’s real date).</p>
        </div>
      </div>
      <div class="glass-card primary-result-card school-card">
        <p class="school-disclaimer">This shows calendar age on the cutoff date only. It does not apply national admission law.</p>
        <div class="school-result">
          <div class="age-item"><span class="age-value" id="adm-years">—</span><span class="age-label">Years</span></div>
          <div class="age-item"><span class="age-value" id="adm-months">—</span><span class="age-label">Months</span></div>
          <div class="age-item"><span class="age-value" id="adm-days">—</span><span class="age-label">Days</span></div>
        </div>
        <p class="school-cutoff-summary" id="adm-summary">Enter birth date and school cutoff date (example: 01/09/${new Date().getFullYear()}).</p>
      </div>`,
    webAppName: 'Age Calculator for School Admission',
    webAppDescription:
      'Calculate a child’s exact age on a school admission cutoff date you choose. Free, browser-based, not legal advice.',
    faq: [
      {
        name: 'How do I use this school admission age calculator?',
        answer:
          'Enter the child’s date of birth and the cutoff date your school or district publishes. The tool prints exact years, months, and days on that cutoff.',
      },
      {
        name: 'Does this apply official government admission rules?',
        answer:
          'No. Laws and district policies vary and change. The example September 1 button is only a demonstration—always confirm the real cutoff with your school.',
      },
      {
        name: 'What if my school uses age five by 31 March?',
        answer:
          'Type that date into the cutoff fields. Any valid calendar cutoff works.',
      },
      {
        name: 'Is data stored?',
        answer:
          'Calculations stay in your browser; nothing is uploaded.',
      },
    ],
    articleHtml: `
      <p>School brochures often say a child must be “5 years old by 1 September” or “turn six during the academic year.” Parents need the child’s <strong>exact age on the cutoff date</strong>, not a guess from the birth year alone. This page computes that age and explains what the numbers do—and do not—mean for admission.</p>
      <h2>What schools usually ask for</h2>
      <p>Most intake forms want either:</p>
      <ul>
        <li>A yes/no check against a minimum age on a specific day; or</li>
        <li>The child’s age in years, months, and days on that day for placement in reception, kindergarten, or Year 1.</li>
      </ul>
      <p>Districts pick their own cutoff: common examples include <strong>1 September</strong>, <strong>31 December</strong>, or the <strong>first day of term</strong>. This calculator does not embed any of those by default—you type the date your paperwork specifies.</p>
      <h2>How the math works</h2>
      <p>The algorithm is standard calendar age from date of birth to cutoff date—the same as the <a href="/">home calculator’s school enrollment section</a> and our <a href="/how-to-calculate-age-for-school-enrollment/">enrollment guide</a>.</p>
      <p>Example (illustration only): birth <strong>15 April 2020</strong>, cutoff <strong>1 September 2026</strong> → 6 years, 4 months, 17 days. Whether that qualifies for a given program is entirely up to the school’s published rules.</p>
      <h2>Examples around the world—verify locally</h2>
      <p>Policies differ. These are frequently cited patterns parents encounter; <strong>they are not legal advice and may be outdated</strong>:</p>
      <ul>
        <li>Some U.S. states use September 1 in the entry year; others use different dates or allow waivers.</li>
        <li>Parts of the UK talk about “compulsory school age” and term start dates rather than a single national birthday cutoff.</li>
        <li>Indian CBSE or state boards may reference age on 31 March of the academic year.</li>
        <li>Australian states set their own kindergarten entry birthdays.</li>
      </ul>
      <p>Always read the current handbook from your school or ministry of education.</p>
      <h2>Leap-year births and prematurity</h2>
      <p>Cutoff math uses calendar dates, not gestational age. A child born on 29 February is still compared on the cutoff the same way as any other date; some schools publish extra guidance for leap-day births.</p>
      <p>Medical prematurity adjustments (corrected age) are clinical decisions and are outside this tool.</p>
      <h2>Next steps</h2>
      <p>After calculating, contact the school office with the official birth certificate. For testing-age paperwork, see the <a href="/chronological-age-calculator/">chronological age calculator</a>. For comparing siblings’ spacing, use the <a href="/age-difference-calculator/">age difference calculator</a>.</p>
      <h2>When the numbers sit near the cutoff</h2>
      <p>Parents whose children are born a few days before or after the published cutoff are often the most anxious. A child who is 4 years, 11 months, and 28 days on a “must be five” cutoff is not five in calendar terms even though the gap feels tiny. Conversely, someone who turned five six months earlier is clearly eligible on age alone—but waitlists, zoning, or language tests may still affect placement.</p>
      <p>Document everything: screenshot or print this result with the cutoff you typed, then compare it with the school’s written policy. Policies sometimes distinguish “age on 1 September” from “age by the first day of school” when those dates differ by a week. Re-run the calculator if the district moves the intake day.</p>
      <h2>Repeating the calculation next year</h2>
      <p>If your child misses this year’s cutoff, advance the cutoff field to the following academic year in one step. The age will increase by one year minus any shift in the cutoff date itself. Families applying in multiple countries should run separate calculations because each nation’s cutoff is independent—this tool does not store or compare them for you.</p>`,
  },
];