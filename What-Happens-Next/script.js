const modal = document.getElementById("gameModal");
const gameContent = document.getElementById("gameContent");

let gameMode = "";
let currentUser = "";
let currentPartner = "";
let currentPrediction = {};


// ==========================================
// RANDOM HELPER
// ==========================================

function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// ==========================================
// BACKGROUND MUSIC
// ==========================================

const backgroundMusic = new Audio("music/chill.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;

let musicStarted = false;

function startMusic() {

    if (musicStarted) return;

    backgroundMusic.play()
        .then(() => {

            musicStarted = true;

        })
        .catch(() => {

            console.log("Waiting for user interaction to start music.");

        });
}

window.addEventListener("load", startMusic);

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });


// ==========================================
// START GAME
// ==========================================

function startGame(mode) {

    gameMode = mode;

    modal.classList.add("show");

    if (mode === "single") {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>Let's see what's coming...</h2>

                <p>
                    Enter your name and let the universe
                    make some questionable decisions about you.
                </p>

                <div class="input-group">

                    <label>Your name</label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>

                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Reveal My Future →
                </button>

            </div>
        `;

    } else {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>Your future together</h2>

                <p>
                    Let's see whether you're destined for
                    greatness... or mutual blocking.
                </p>

                <div class="input-group">

                    <label>Your name</label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>

                <div class="input-group">

                    <label>Partner's name</label>

                    <input
                        id="partnerName"
                        type="text"
                        placeholder="e.g. Juliet"
                        maxlength="30"
                    >

                </div>

                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Predict Our Future →
                </button>

            </div>
        `;
    }
}


// ==========================================
// BEGIN PREDICTION
// ==========================================

function beginPrediction() {

    const playerInput =
        document.getElementById("playerName");

    if (!playerInput || playerInput.value.trim() === "") {

        alert("Enter your name first 😂");

        return;
    }

    currentUser = playerInput.value.trim();


    if (gameMode === "couple") {

        const partnerInput =
            document.getElementById("partnerName");

        if (
            !partnerInput ||
            partnerInput.value.trim() === ""
        ) {

            alert("We need your partner's name too 😂");

            return;
        }

        currentPartner =
            partnerInput.value.trim();
    }


    runUniverseScan();
}


// ==========================================
// UNIVERSE SCAN
// ==========================================

async function runUniverseScan() {

    const messages = [

        "Connecting to the universe...",
        "Reading your personality...",
        "Checking your financial future...",
        "Investigating your love life...",
        "Locating your future home...",
        "Counting your future children...",
        "Checking your future garage...",
        "Looking through your travel history...",
        "Something suspicious was detected...",
        "Finalizing your future..."

    ];


    gameContent.innerHTML = `

        <div class="prediction-loading">

            <div class="loading-orb">
                ◇
            </div>

            <h2 id="scanTitle">
                Connecting to the universe...
            </h2>

            <p id="scanMessage">
                Please remain calm.
            </p>

            <div class="loading-bar">

                <div id="loadingProgress"></div>

            </div>

            <div
                class="loading-percent"
                id="loadingPercent"
            >
                0%
            </div>

        </div>
    `;


    const title =
        document.getElementById("scanTitle");

    const message =
        document.getElementById("scanMessage");

    const progress =
        document.getElementById("loadingProgress");

    const percent =
        document.getElementById("loadingPercent");


    const littleMessages = [

        "The universe is checking your receipts.",
        "This may take a few questionable calculations.",
        "Your future is looking interesting.",
        "The stars are currently discussing you.",
        "We found something interesting.",
        "Almost there.",
        "Your destiny has surprisingly good WiFi.",
        "Someone in your future is already disappointed in you.",
        "The universe just laughed. We don't know why."

    ];


    for (
        let i = 0;
        i < messages.length;
        i++
    ) {

        title.textContent =
            messages[i];

        message.textContent =
            pick(littleMessages);


        const percentage =
            Math.round(
                ((i + 1) / messages.length) * 100
            );


        progress.style.width =
            percentage + "%";

        percent.textContent =
            percentage + "%";


        await wait(500);
    }


    await wait(400);


    if (gameMode === "single") {

        showSingleResults();

    } else {

        showCoupleResults();

    }
}


// ==========================================
// CAREERS
// ==========================================

const careers = [

    "Software Engineer",
    "Tech Founder",
    "Web3 Builder",
    "Content Creator",
    "Creative Director",
    "DJ",
    "YouTube Creator",
    "Serial Entrepreneur",
    "Professional Problem Solver",
    "Footballer",
    "Music Artist",
    "Film Director",
    "Professional Gamer",
    "Real Estate Investor",
    "Fashion Designer",
    "Digital Nomad",
    "CEO of a company you started in your bedroom",
    "Professional Nap Consultant",
    "Full-time Food Critic",
    "Agbero",
    "Uber Driver with 5-star ratings",
    "Professional Influencer",
    "Motivational Speaker",
    "Family Business Manager",
    "Unemployed but somehow always outside",
    "CEO of a company with exactly 3 employees",
    "YouTube Comment Section Manager",
    "Professional Party Attendee",
    "Online Vendor",
    "Someone's mysterious rich uncle"

];


// ==========================================
// WEALTH
// ==========================================

const wealthValues = [

    0,
    240,
    1200,
    5800,
    15000,
    42000,
    87000,
    150000,
    280000,
    450000,
    720000,
    1200000,
    2500000,
    4800000,
    7500000,
    12000000,
    28000000,
    50000000,
    120000000,
    350000000,
    800000000,
    1500000000

];


const wealthDescriptions = {

    0: "Your biggest asset is vibes.",
    240: "Financial analysts have asked you to relax.",
    1200: "You're surviving through pure determination.",
    5800: "Not rich, but the future is still loading.",
    15000: "You're doing surprisingly okay.",
    42000: "You can breathe a little.",
    87000: "Money is beginning to respect you.",
    150000: "You're officially comfortable.",
    280000: "People have started asking what you do.",
    450000: "Your bank account is looking healthy.",
    720000: "You are becoming financially dangerous.",
    1200000: "You can finally say 'don't worry, I got it.'",
    2500000: "You have entered serious money territory.",
    4800000: "Your childhood dreams are getting expensive.",
    7500000: "People suddenly remember your number.",
    12000000: "You're buying things without checking the price.",
    28000000: "Your accountant is now your best friend.",
    50000000: "You have entered another tax bracket.",
    120000000: "You are officially somebody's financial goal.",
    350000000: "Your money has started making money.",
    800000000: "You don't ask how much anymore.",
    1500000000: "Congratulations. Even your calculator is tired."

};


// ==========================================
// HOMES
// ==========================================

const homes = [

    "A 4-bedroom mansion in Lagos",
    "A beautiful house in Abuja",
    "A luxury penthouse",
    "A smart home with more gadgets than furniture",
    "A peaceful beach house",
    "A massive family mansion",
    "A modern apartment overlooking the city",
    "A house with a swimming pool nobody uses",
    "A quiet suburban home",
    "A tiny apartment you absolutely love",
    "Your parents' house",
    "A rented apartment because rent won",
    "A surprisingly beautiful house you bought randomly",
    "A house with one room permanently dedicated to snacks",
    "A mansion you only visit twice a year",
    "You somehow own three houses and still complain about rent"

];


// ==========================================
// CARS
// ==========================================

const cars = [

    "Mercedes-Benz GLE",
    "Range Rover Sport",
    "G-Wagon",
    "Toyota Prado",
    "Lexus RX",
    "Tesla Model 3",
    "Toyota Highlander",
    "Porsche Cayenne",
    "BMW X6",
    "A very clean 2007 Corolla",
    "A motorcycle",
    "Keke",
    "Uber",
    "Your friend's car",
    "A car you bought because fuel consumption is okay",
    "A car with one stubborn door",
    "You don't own a car but know every Bolt driver around you"

];


// ==========================================
// LOVE
// ==========================================

const loveStatuses = [

    "Happily married",
    "Deeply in love",
    "Married your best friend",
    "In a relationship that survived everything",
    "Single and enjoying premium peace",
    "Single by choice... allegedly",
    "Currently avoiding relationship stress",
    "Married after saying you would never marry",
    "In a serious relationship",
    "Dating someone you met completely by accident",
    "Your ex comes back",
    "You become everyone's relationship adviser while being single",
    "Situationship champion",
    "You fall in love unexpectedly",
    "You decide love is a scam",
    "You get married and immediately miss being single",
    "You remain single and disturb absolutely nobody"

];


// ==========================================
// TRAVEL
// ==========================================

const travelDestinations = [

    "Dubai",
    "London",
    "Paris",
    "New York",
    "Tokyo",
    "Cape Town",
    "Santorini",
    "Canada",
    "Ghana",
    "Kenya",
    "South Africa",
    "Turkey",
    "Rwanda",
    "Morocco",
    "You mostly travel between Lagos and your hometown",
    "You've seen 17 countries",
    "You've travelled once and still talk about it every Christmas"

];


// ==========================================
// RANDOM EVENTS
// ==========================================

const randomEvents = [

    "You randomly become famous on the internet.",
    "You accidentally start a business that becomes huge.",
    "Someone you helped years ago changes your life.",
    "You move to another city and completely restart your life.",
    "You buy something expensive just because you can.",
    "You become the friend everyone calls for advice.",
    "You disappear for 6 months and return suspiciously successful.",
    "You become rich and suddenly everyone remembers your name.",
    "You accidentally become an influencer.",
    "One crazy decision completely changes your life.",
    "You become famous for saying something completely ridiculous.",
    "You start a business because you were bored.",
    "You win money from something you almost didn't enter.",
    "Your random side hustle becomes your main career.",
    "You become the family's unofficial financial adviser.",
    "You go viral for arguing with someone online.",
    "You accidentally become someone's celebrity crush.",
    "You move abroad and immediately miss Nigerian food.",
    "You become successful but still complain about transport.",
    "You become rich enough to stop checking food prices.",
    "You get a random opportunity that changes everything.",
    "You become known for something you never planned to do.",
    "You meet someone who completely changes your life.",
    "You become successful after everyone thought you were joking.",
    "You accidentally become a meme.",
    "You buy your dream house and immediately start complaining about maintenance.",
    "You make one decision at 2AM that changes your entire career.",
    "You become the rich friend everyone suddenly remembers.",
    "You somehow survive a terrible financial decision.",
    "You spend six months saying 'next month I'll start' before actually starting."

];


// ==========================================
// KIDS
// ==========================================

const kidDescriptions = [

    "tiny troublemakers",
    "future billionaires",
    "professional noise makers",
    "mini versions of you",
    "children who will finish your data subscription",
    "future footballers",
    "future engineers",
    "future comedians",
    "professional snack thieves",
    "children who will ask for money every weekend",
    "little geniuses",
    "walking sources of noise"

];


// ==========================================
// SINGLE RESULTS
// ==========================================

function showSingleResults() {

    const wealth =
        pick(wealthValues);

    const age =
        Math.floor(Math.random() * 16) + 24;

    const kids =
        Math.floor(Math.random() * 9);

    const countries =
        Math.floor(Math.random() * 20) + 1;

    const career =
        pick(careers);

    const home =
        pick(homes);

    const car =
        pick(cars);

    const love =
        pick(loveStatuses);

    const travel =
        pick(travelDestinations);

    const randomEvent =
        pick(randomEvents);

    const wealthDescription =
        wealthDescriptions[wealth];


    const destinyScore =
        Math.floor(Math.random() * 101);


    currentPrediction = {

        type: "single",

        name: currentUser,

        career,
        wealth,
        wealthDescription,
        home,
        car,
        love,
        age,
        kids,
        countries,
        travel,
        randomEvent,
        destinyScore

    };


    gameContent.innerHTML = `

        <div class="results-screen">

            <div class="result-heading">

                <span class="result-kicker">
                    YOUR FUTURE
                </span>

                <h2>
                    ${escapeHTML(currentUser)}
                </h2>

                <p>
                    Here's what the universe came up with.
                </p>

            </div>


            <div class="result-grid">


                <div class="result-card career-card">

                    <div class="card-label">
                        💼 Career
                    </div>

                    <strong>
                        ${escapeHTML(career)}
                    </strong>

                </div>


                <div class="result-card money-card">

                    <div class="card-label">
                        💰 Future Net Worth
                    </div>

                    <strong>
                        $${formatMoney(wealth)}
                    </strong>

                    <span class="card-detail">
                        ${escapeHTML(wealthDescription)}
                    </span>

                </div>


                <div class="result-card home-card">

                    <div class="card-label">
                        🏠 Future Home
                    </div>

                    <strong>
                        ${escapeHTML(home)}
                    </strong>

                </div>


                <div class="result-card car-card">

                    <div class="card-label">
                        🚗 Future Ride
                    </div>

                    <strong>
                        ${escapeHTML(car)}
                    </strong>

                </div>


                <div class="result-card love-card">

                    <div class="card-label">
                        ❤️ Love Life
                    </div>

                    <strong>
                        ${escapeHTML(love)}
                    </strong>

                    <span class="card-detail">
                        Marriage prediction: age ${age}
                    </span>

                </div>


                <div class="result-card kids-card">

                    <div class="card-label">
                        👶 Future Children
                    </div>

                    <strong>
                        ${kids}
                    </strong>

                    <span class="card-detail">

                        ${
                            kids === 0
                                ? "Peace and quiet forever."
                                : kids + " " + pick(kidDescriptions)
                        }

                    </span>

                </div>


                <div class="result-card travel-card">

                    <div class="card-label">
                        ✈️ Travel
                    </div>

                    <strong>
                        ${countries} countries
                    </strong>

                    <span class="card-detail">
                        First big trip: ${escapeHTML(travel)}
                    </span>

                </div>


                <div class="result-card twist-card">

                    <div class="card-label">
                        😂 Plot Twist
                    </div>

                    <strong>
                        ${escapeHTML(randomEvent)}
                    </strong>

                </div>


            </div>


            <div class="destiny-score">

                <div>

                    <span>
                        Destiny Score
                    </span>

                    <small>
                        For entertainment only
                    </small>

                </div>

                <strong>

                    ${destinyScore}

                    <small>
                        /100
                    </small>

                </strong>

            </div>


            <div class="result-actions">

                <button
                    type="button"
                    class="back-result-btn"
                    onclick="backToGame()"
                >
                    ← Back
                </button>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="runUniverseScan()"
                >
                    Regenerate
                </button>


                <button
                    type="button"
                    class="share-result-btn"
                    onclick="shareFuture()"
                >
                    Share My Future
                </button>

            </div>


        </div>
    `;
}


// ==========================================
// COUPLE DATA
// ==========================================

const coupleLove = [

    "You become an annoyingly cute married couple.",
    "You argue over small things but somehow always fix them.",
    "You become the couple everyone secretly envies.",
    "You survive enough plot twists to deserve a Netflix series.",
    "One of you is definitely the stubborn one.",
    "You somehow turn chaos into a beautiful relationship.",
    "You become best friends who happen to be married.",
    "You become that couple who posts each other every birthday.",
    "You stay together mostly because neither of you wants to start over.",
    "You break up three times and somehow still get married.",
    "You become the couple everyone calls for relationship advice.",
    "You spend half your relationship saying 'I'm not angry.'"

];


const coupleHomes = [

    "A luxury 5-bedroom mansion",
    "A modern smart home",
    "A beautiful house in Lagos",
    "A peaceful family home outside the city",
    "A luxury apartment before upgrading to a mansion",
    "A beach house you barely visit",
    "A normal apartment that somehow feels like home",
    "Your parents' house temporarily becomes your headquarters",
    "A mansion with one room dedicated entirely to shoes",
    "A rented apartment because you spent the house money travelling"

];


const coupleCars = [

    "Mercedes GLE + Toyota Highlander",
    "Range Rover + Lexus RX",
    "Tesla + Toyota Prado",
    "Two very clean SUVs",
    "One expensive car and one very reliable Corolla",
    "A G-Wagon + a car neither of you remembers buying",
    "One car because you both hate driving",
    "Two motorcycles because why not",
    "A Corolla + unlimited Bolt",
    "One person drives while the other gives terrible directions"

];


const coupleTwists = [

    "You randomly move to another country together.",
    "One of you starts a business that becomes huge.",
    "You become the couple that travels every holiday.",
    "You buy your dream house earlier than expected.",
    "Your first major argument is somehow about interior decoration.",
    "You become financially comfortable enough to stop checking food prices.",
    "Your children become more famous than both of you.",
    "You accidentally become a viral couple online.",
    "One of you becomes rich and the other immediately becomes the family's accountant.",
    "You spend your anniversary arguing about where to eat.",
    "You become the couple everyone asks for money.",
    "You somehow survive a joint business venture.",
    "You both become successful in completely different industries.",
    "You buy something extremely expensive and immediately regret it.",
    "You stay together purely because breaking up would require too much explanation."

];


// ==========================================
// COUPLE RESULTS
// ==========================================

function showCoupleResults() {

    const compatibility =
        Math.floor(Math.random() * 101);


    const kids =
        Math.floor(Math.random() * 8);


    const marriageYear =
        new Date().getFullYear() +
        Math.floor(Math.random() * 10) + 1;


    const coupleWealthValues = [

        12000,
        45000,
        85000,
        150000,
        320000,
        750000,
        1200000,
        2800000,
        7500000,
        15000000,
        42000000,
        120000000,
        500000000

    ];


    const wealth =
        pick(coupleWealthValues);


    const love =
        pick(coupleLove);

    const home =
        pick(coupleHomes);

    const car =
        pick(coupleCars);

    const twist =
        pick(coupleTwists);


    currentPrediction = {

        type: "couple",

        name: currentUser,

        partner: currentPartner,

        compatibility,

        kids,

        marriageYear,

        wealth,

        love,

        home,

        car,

        twist

    };


    gameContent.innerHTML = `

        <div class="results-screen">

            <div class="result-heading">

                <span class="result-kicker">
                    YOUR FUTURE TOGETHER
                </span>

                <h2>

                    ${escapeHTML(currentUser)}
                    +
                    ${escapeHTML(currentPartner)}

                </h2>

                <p>
                    The universe has made its decision.
                </p>

            </div>


            <div class="compatibility">

                <div>

                    <span>
                        Compatibility
                    </span>

                    <strong>
                        ${compatibility}%
                    </strong>

                </div>


                <div class="compatibility-bar">

                    <div
                        style="width:${compatibility}%"
                    ></div>

                </div>

            </div>


            <div class="result-grid">


                <div class="result-card love-card">

                    <div class="card-label">
                        💍 Marriage
                    </div>

                    <strong>
                        ${marriageYear}
                    </strong>

                    <span class="card-detail">
                        ${escapeHTML(love)}
                    </span>

                </div>


                <div class="result-card kids-card">

                    <div class="card-label">
                        👶 Future Children
                    </div>

                    <strong>
                        ${kids}
                    </strong>

                    <span class="card-detail">

                        ${
                            kids === 0
                                ? "Peace and quiet forever."
                                : kids + " " + pick(kidDescriptions)
                        }

                    </span>

                </div>


                <div class="result-card money-card">

                    <div class="card-label">
                        💰 Combined Net Worth
                    </div>

                    <strong>
                        $${formatMoney(wealth)}
                    </strong>

                </div>


                <div class="result-card home-card">

                    <div class="card-label">
                        🏠 Future Home
                    </div>

                    <strong>
                        ${escapeHTML(home)}
                    </strong>

                </div>


                <div class="result-card car-card">

                    <div class="card-label">
                        🚗 Future Garage
                    </div>

                    <strong>
                        ${escapeHTML(car)}
                    </strong>

                </div>


                <div class="result-card twist-card">

                    <div class="card-label">
                        😂 Relationship Plot Twist
                    </div>

                    <strong>
                        ${escapeHTML(twist)}
                    </strong>

                </div>


            </div>


            <div class="destiny-score">

                <div>

                    <span>
                        Couple Destiny
                    </span>

                    <small>
                        For entertainment only
                    </small>

                </div>


                <strong>

                    ${Math.floor(Math.random() * 101)}

                    <small>
                        /100
                    </small>

                </strong>

            </div>


            <div class="result-actions">

                <button
                    type="button"
                    class="back-result-btn"
                    onclick="backToGame()"
                >
                    ← Back
                </button>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="runUniverseScan()"
                >
                    Regenerate
                </button>


                <button
                    type="button"
                    class="share-result-btn"
                    onclick="shareFuture()"
                >
                    Share My Future
                </button>

            </div>


        </div>
    `;
}


// ==========================================
// SHARE MY FUTURE
// ==========================================

async function shareFuture() {

    const resultScreen =
        document.querySelector(".results-screen");


    if (!resultScreen) {
        return;
    }


    const resultText =
        resultScreen.innerText;


    const shareText = `

WHAT HAPPENS NEXT? 🔮

${resultText}

I just discovered my future.

Find yours:
${window.location.href}

`;


    try {

        if (navigator.share) {

            await navigator.share({

                title: "What Happens Next? 🔮",

                text: shareText.trim()

            });

        } else {

            await navigator.clipboard.writeText(
                shareText.trim()
            );

            alert(
                "Your future has been copied! 😂"
            );

        }

    } catch (error) {

        console.log(
            "Share cancelled."
        );

    }
}


// ==========================================
// BACK TO GAME
// ==========================================

function backToGame() {

    modal.classList.add("show");


    if (gameMode === "single") {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>
                    Let's see what's coming...
                </h2>

                <p>
                    Enter your name and we'll generate
                    your future.
                </p>


                <div class="input-group">

                    <label>
                        Your name
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Reveal My Future →
                </button>

            </div>
        `;

    } else {

        gameContent.innerHTML = `

            <div class="game-screen">

                <h2>
                    Your future together
                </h2>

                <p>
                    Let's see what the universe
                    has planned.
                </p>


                <div class="input-group">

                    <label>
                        Your name
                    </label>

                    <input
                        id="playerName"
                        type="text"
                        placeholder="e.g. Maxwell"
                        maxlength="30"
                    >

                </div>


                <div class="input-group">

                    <label>
                        Partner's name
                    </label>

                    <input
                        id="partnerName"
                        type="text"
                        placeholder="e.g. Juliet"
                        maxlength="30"
                    >

                </div>


                <button
                    type="button"
                    class="continue-btn"
                    onclick="beginPrediction()"
                >
                    Predict Our Future →
                </button>

            </div>
        `;
    }
}


// ==========================================
// UTILITIES
// ==========================================

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


function formatMoney(value) {

    return new Intl.NumberFormat("en-US", {

        maximumFractionDigits: 0

    }).format(value);

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


function closeGame() {

    modal.classList.remove("show");

}
