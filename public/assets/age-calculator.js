document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const dobDD = document.getElementById('dob-dd');
    const dobMM = document.getElementById('dob-mm');
    const dobYYYY = document.getElementById('dob-yyyy');
    const dobContainer = document.getElementById('dob-container');
    const dobError = document.getElementById('dob-error');
    
    const compDD = document.getElementById('comp-dd');
    const compMM = document.getElementById('comp-mm');
    const compYYYY = document.getElementById('comp-yyyy');
    
    const compareGroup = document.getElementById('comparison-group');
    const toggleCompareBtn = document.getElementById('toggle-compare');

    const schoolDd = document.getElementById('school-dd');
    const schoolMm = document.getElementById('school-mm');
    const schoolYyyy = document.getElementById('school-yyyy');
    const schoolContainer = document.getElementById('school-container');
    const schoolError = document.getElementById('school-error');
    const schoolYears = document.getElementById('school-years');
    const schoolMonths = document.getElementById('school-months');
    const schoolDays = document.getElementById('school-days');
    const schoolCutoffLabel = document.getElementById('school-cutoff-label');
    

    const toastContainer = document.getElementById('toast-container');
    
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportJsonBtn = document.getElementById('export-json');
    const shareBtn = document.getElementById('share-btn');

    // Values Elements
    const elements = {
        years: document.getElementById('age-years'),
        months: document.getElementById('age-months'),
        days: document.getElementById('age-days'),
        
        statMonths: document.getElementById('stat-months'),
        statWeeks: document.getElementById('stat-weeks'),
        statDays: document.getElementById('stat-days'),
        statHours: document.getElementById('stat-hours'),
        statMinutes: document.getElementById('stat-minutes'),
        statSeconds: document.getElementById('stat-seconds'),
        
        bdaySummary: document.getElementById('birthday-summary'),
        bdayDate: document.getElementById('birthday-date'),
        cdDays: document.getElementById('cd-days'),
        cdHours: document.getElementById('cd-hours'),
        cdMinutes: document.getElementById('cd-minutes'),
        cdSeconds: document.getElementById('cd-seconds'),
        
        timelineSteps: document.querySelectorAll('.timeline-step'),
        
        milestonesList: document.getElementById('milestones-list'),
        nextMilestone: document.getElementById('next-milestone'),
        
        factBlinks: document.getElementById('fact-blinks'),
        factBreaths: document.getElementById('fact-breaths'),
        factHeartbeats: document.getElementById('fact-heartbeats')
    };

    let countdownInterval;
    let currentCalcData = null;

    const milestonesTargets = [1000, 5000, 10000, 15000, 20000, 25000, 30000];

    // Auto-jump logic
    const handleEightDigitPaste = (e, dd, mm, yyyy, callback) => {
        const raw = (e.clipboardData?.getData('text') || '').replace(/\D/g, '');
        if (raw.length === 8) {
            e.preventDefault();
            dd.value = raw.slice(0, 2);
            mm.value = raw.slice(2, 4);
            yyyy.value = raw.slice(4, 8);
            callback();
        }
    };

    const setupAutoJump = (dd, mm, yyyy, callback) => {
        const inputs = [dd, mm, yyyy];
        inputs.forEach((input, index) => {
            input.addEventListener('paste', (e) => handleEightDigitPaste(e, dd, mm, yyyy, callback));
            input.addEventListener('input', (e) => {
                // allow only numbers
                input.value = input.value.replace(/\D/g, '');
                
                const maxLen = parseInt(input.getAttribute('maxlength'));
                if (input.value.length >= maxLen) {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                }
                callback();
            });
            
            // handle backspace to go back
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && input.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    };

    const parseCustomDate = (dd, mm, yyyy) => {
        return window.AgeCore.parseCustomDateParts(dd.value, mm.value, yyyy.value);
    };

    // Initialization
    const init = () => {


        const dobUpdated = () => {
            calculateAge();
            calculateSchoolAge();
        };
        setupAutoJump(dobDD, dobMM, dobYYYY, dobUpdated);
        setupAutoJump(compDD, compMM, compYYYY, calculateAge);
        if (schoolDd) {
            setupAutoJump(schoolDd, schoolMm, schoolYyyy, calculateSchoolAge);
        }

        const savedDd = localStorage.getItem('ac-dob-dd');
        const savedMm = localStorage.getItem('ac-dob-mm');
        const savedYyyy = localStorage.getItem('ac-dob-yyyy');
        if (savedDd && savedMm && savedYyyy) {
            dobDD.value = savedDd;
            dobMM.value = savedMm;
            dobYYYY.value = savedYyyy;
            calculateAge();
        }
    };

    // Show Toast
    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);
    };

    // Format Number with Commas
    const formatNumber = (num) => {
        return new Intl.NumberFormat().format(num);
    };

    const getExactAge = (birthDate, targetDate) => window.AgeCore.getExactAge(birthDate, targetDate);
    const getDetailedStats = (birthDate, targetDate) => window.AgeCore.getDetailedStats(birthDate, targetDate);

    // Calculate Next Birthday
    const getNextBirthdayInfo = (birthDate, now) => {
        let nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        
        if (nextBday < now && (nextBday.toDateString() !== now.toDateString())) {
            nextBday.setFullYear(now.getFullYear() + 1);
        }

        const diffMs = nextBday - now;
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        
        const months = Math.floor(totalDays / 30.44); // approximate
        const days = Math.floor(totalDays % 30.44);

        return {
            dateObj: nextBday,
            months,
            days
        };
    };

    const startCountdown = (nextBday) => {
        if (countdownInterval) clearInterval(countdownInterval);

        const updateTimer = () => {
            const now = new Date();
            const diff = nextBday - now;

            if (diff <= 0) {
                elements.cdDays.textContent = '0';
                elements.cdHours.textContent = '0';
                elements.cdMinutes.textContent = '0';
                elements.cdSeconds.textContent = '0';
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / 1000 / 60) % 60);
            const s = Math.floor((diff / 1000) % 60);

            elements.cdDays.textContent = d;
            elements.cdHours.textContent = h;
            elements.cdMinutes.textContent = m;
            elements.cdSeconds.textContent = s;
        };

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    };

    const updateLiveSeconds = (birthDate) => {
        if (window.liveSecondsInterval) clearInterval(window.liveSecondsInterval);
        
        const update = () => {
            const now = new Date();
            const diffMs = now - birthDate;
            const totalSeconds = Math.floor(diffMs / 1000);
            const totalMinutes = Math.floor(diffMs / (1000 * 60));
            
            // Only update the dom if values change
            const secFormatted = formatNumber(totalSeconds);
            const minFormatted = formatNumber(totalMinutes);
            
            if(elements.statSeconds.textContent !== secFormatted) {
                elements.statSeconds.textContent = secFormatted;
            }
            if(elements.statMinutes.textContent !== minFormatted) {
                elements.statMinutes.textContent = minFormatted;
            }
        };
        
        update();
        window.liveSecondsInterval = setInterval(update, 1000);
    };

    const updateMilestones = (totalDays) => {
        const achieved = milestonesTargets.filter(t => totalDays >= t);
        const next = milestonesTargets.find(t => totalDays < t);

        // Show last 3 achieved
        const displayAchieved = achieved.slice(-3);
        
        elements.milestonesList.innerHTML = displayAchieved.map(t => 
            `<li class="achieved">Lived ${formatNumber(t)} days</li>`
        ).join('');

        if (next) {
            elements.nextMilestone.innerHTML = `
                <h4>Next Milestone</h4>
                <div class="target">${formatNumber(next)} Days</div>
                <div class="remaining">Remaining: ${formatNumber(next - totalDays)} Days</div>
            `;
        } else {
            elements.nextMilestone.innerHTML = `<div class="target">All milestones achieved!</div>`;
        }
    };

    const updateFunFacts = (years, totalMinutes) => {
        const blinks = totalMinutes * 17;
        const breaths = totalMinutes * 16;
        const beats = totalMinutes * 80;

        const formatHuge = (num) => {
            if (num > 1000000000) return (num / 1000000000).toFixed(1) + ' billion';
            if (num > 1000000) return (num / 1000000).toFixed(1) + ' million';
            return formatNumber(num);
        };

        elements.factBlinks.textContent = formatHuge(blinks);
        elements.factBreaths.textContent = formatHuge(breaths);
        elements.factHeartbeats.textContent = formatHuge(beats);
    };

    const updateTimeline = (years) => {
        let stage = 'child';
        if (years >= 13 && years < 20) stage = 'teen';
        else if (years >= 20 && years < 60) stage = 'adult';
        else if (years >= 60) stage = 'senior';

        elements.timelineSteps.forEach(step => {
            step.classList.remove('active');
            if (step.dataset.stage === stage) {
                step.classList.add('active');
            }
        });
    };

    // Main Calculate Function
    const calculateAge = () => {
        const birthDate = parseCustomDate(dobDD, dobMM, dobYYYY);
        let targetDate = new Date();

        if (compareGroup.style.display !== 'none') {
            const compDate = parseCustomDate(compDD, compMM, compYYYY);
            if (compDate) {
                targetDate = compDate;
            } else if (compDD.value || compMM.value || compYYYY.value) {
                return; // wait until valid partial compare date is full
            }
        }

        if (!birthDate) {
            if (dobDD.value || dobMM.value || dobYYYY.value) {
                if (dobDD.value.length === 2 && dobMM.value.length === 2 && dobYYYY.value.length === 4) {
                    dobContainer.classList.add('error');
                    dobError.classList.add('visible');
                } else {
                    dobContainer.classList.remove('error');
                    dobError.classList.remove('visible');
                }
            }
            return;
        }

        if (birthDate > targetDate) {
            dobContainer.classList.add('error');
            dobError.classList.add('visible');
            return;
        }

        dobContainer.classList.remove('error');
        dobError.classList.remove('visible');

        localStorage.setItem('ac-dob-dd', dobDD.value);
        localStorage.setItem('ac-dob-mm', dobMM.value);
        localStorage.setItem('ac-dob-yyyy', dobYYYY.value);

        const age = getExactAge(birthDate, targetDate);
        const stats = getDetailedStats(birthDate, targetDate);

        // Update Primary Result
        elements.years.textContent = age.years;
        elements.months.textContent = age.months;
        elements.days.textContent = age.days;

        // Re-trigger animation
        elements.years.parentElement.classList.remove('slideUp');
        void elements.years.offsetWidth;
        
        // Update Stats
        elements.statMonths.textContent = formatNumber(stats.totalMonths);
        elements.statWeeks.textContent = formatNumber(stats.totalWeeks);
        elements.statDays.textContent = formatNumber(stats.totalDays);
        elements.statHours.textContent = formatNumber(stats.totalHours);

        // Start live seconds if not comparing
        if (compareGroup.style.display === 'none') {
            updateLiveSeconds(birthDate);
        } else {
            if (window.liveSecondsInterval) clearInterval(window.liveSecondsInterval);
            elements.statMinutes.textContent = formatNumber(stats.totalMinutes);
            elements.statSeconds.textContent = formatNumber(stats.totalSeconds);
        }

        // Update Birthday Info
        const nextBdayInfo = getNextBirthdayInfo(birthDate, new Date());
        
        if (age.months === 0 && age.days === 0 && compareGroup.style.display === 'none') {
            elements.bdaySummary.textContent = 'Happy Birthday! 🎉';
        } else {
            elements.bdaySummary.textContent = `${nextBdayInfo.months} Months, ${nextBdayInfo.days} Days`;
        }

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        elements.bdayDate.textContent = `Your next birthday is on: ${nextBdayInfo.dateObj.toLocaleDateString(undefined, options)}`;

        startCountdown(nextBdayInfo.dateObj);

        // Updates
        updateMilestones(stats.totalDays);
        updateFunFacts(age.years, stats.totalMinutes);
        updateTimeline(age.years);

        // Store current calc data for export/share
        currentCalcData = { age, stats, birthDate: `${dobYYYY.value}-${dobMM.value}-${dobDD.value}` };
        calculateSchoolAge();
    };

    const calculateSchoolAge = () => {
        if (!schoolDd) return;
        const birthDate = parseCustomDate(dobDD, dobMM, dobYYYY);
        const cutoffDate = parseCustomDate(schoolDd, schoolMm, schoolYyyy);

        if (!schoolDd.value && !schoolMm.value && !schoolYyyy.value) {
            schoolYears.textContent = '—';
            schoolMonths.textContent = '—';
            schoolDays.textContent = '—';
            schoolCutoffLabel.textContent = 'Enter a school cutoff date to see age on that day.';
            schoolContainer.classList.remove('error');
            schoolError.classList.remove('visible');
            return;
        }

        if (!cutoffDate) {
            if (schoolDd.value.length === 2 && schoolMm.value.length === 2 && schoolYyyy.value.length === 4) {
                schoolContainer.classList.add('error');
                schoolError.classList.add('visible');
            }
            return;
        }

        if (!birthDate) {
            schoolContainer.classList.remove('error');
            schoolError.classList.remove('visible');
            schoolCutoffLabel.textContent = 'Enter date of birth above first.';
            return;
        }

        if (birthDate > cutoffDate) {
            schoolContainer.classList.add('error');
            schoolError.textContent = 'Cutoff must be on or after date of birth';
            schoolError.classList.add('visible');
            return;
        }

        schoolContainer.classList.remove('error');
        schoolError.classList.remove('visible');

        const age = getExactAge(birthDate, cutoffDate);
        schoolYears.textContent = age.years;
        schoolMonths.textContent = age.months;
        schoolDays.textContent = age.days;

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        schoolCutoffLabel.textContent = `Age on ${cutoffDate.toLocaleDateString(undefined, options)}: ${age.years} years, ${age.months} months, ${age.days} days.`;
    };

    toggleCompareBtn.addEventListener('click', () => {
        if (compareGroup.style.display === 'none') {
            compareGroup.style.display = 'flex';
            toggleCompareBtn.textContent = 'Hide comparison';
        } else {
            compareGroup.style.display = 'none';
            toggleCompareBtn.textContent = 'Compare with another date';
            compDD.value = '';
            compMM.value = '';
            compYYYY.value = '';
        }
        calculateAge();
    });



    // Exports
    exportPdfBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
    });

    exportJsonBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentCalcData) {
            showToast('Enter a date first');
            return;
        }
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentCalcData, null, 2));
        const a = document.createElement('a');
        a.href = dataStr;
        a.download = "age_calculator_results.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast('JSON Exported');
    });

    shareBtn.addEventListener('click', () => {
        if (!currentCalcData) {
            showToast('Enter a date first');
            return;
        }
        const { age } = currentCalcData;
        const text = `I am ${age.years} years, ${age.months} months, and ${age.days} days old!`;
        
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            showToast('Failed to copy');
        });
    });

    // Run init
    init();
});
