const searchType = document.getElementById('search-type');
const searchQuery = document.getElementById('search-query');

searchType.addEventListener('change', () => {
    if (searchType.value === 'matchDate') {
        searchQuery.type = 'date'; // Show calendar input
    } else {
        searchQuery.type = 'text'; // Default for other fields
        searchQuery.placeholder = 'Search For Archived Matches';
    }
});



document.getElementById('search-btn').addEventListener('click', async () => {
    const query = document.getElementById('search-query').value.trim();
    const type = document.getElementById('search-type').value;
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    const statsContainer = document.getElementById("detailed-num-stats");
    const timelineContainer = document.getElementById("matchtimeline-database")

    resultsContainer.classList.add("visible");
    resultsContainer.classList.remove("hidden");

    statsContainer.classList.add("visible");
    statsContainer.classList.remove("hidden");

    timelineContainer.classList.add("visible");
    timelineContainer.classList.remove("hidden");


    
    if (!query) {
        resultsContainer.textContent = 'Please Enter A Search Query.';
        return;
    }

    try {
        const response = await fetch(`/search?type=${encodeURIComponent(type)}&query=${encodeURIComponent(query)}`);

        if (response.status === 404) {
            resultsContainer.textContent = '❌ No Matches Found ❌';
            return;
        }

        if (!response.ok) {
            throw new Error('Server error');
        }

        const matches = await response.json();

        if (matches.length === 0) {
            resultsContainer.textContent ='❌ No Matches Found ❌';
            return;
        }

        matches.forEach(stats => {
            const matchElement = document.createElement('div');
            matchElement.classList.add('match-result');
            matchElement.innerHTML = `
                <div class="match-summary">
                    <div><strong>Match ID:</strong> ${stats.matchId}</div>
                    <div><strong>Match Name:</strong> 
  ${stats.matchName.replace(/\b\w/g, c => c.toUpperCase())}
</div>                    
                    <div><strong>Date:</strong> ${stats.matchDate.split('T')[0]}</div>
                    <div><strong>Sets Played:</strong> ${stats.setType}</div>
                    <div><strong>Final Score:</strong> ${stats.finalScore}</div>
                    <div><strong>Player 1 Name:</strong> ${stats.player1.name.charAt(0).toUpperCase() + stats.player1.name.slice(1)}</div>
                    <div><strong>Player 2 Name:</strong> ${stats.player2.name.charAt(0).toUpperCase() + stats.player2.name.slice(1)}</div>
                    <div><strong>Match Winner:</strong> ${stats.matchWinner}</div>
                    <button class="view-details">View Details</button>
                </div>
                <div class="match-details" style="display: none;">
                    <h3>Match Details</h3>
                    <div><strong>Sets Played:</strong> ${stats.setType}</div>
                    <div><strong>Final Score:</strong> ${stats.finalScore}</div>
                    <div><strong>Match Winner:</strong> ${stats.matchWinner}</div>
                    <div><strong>Each Set Score:</strong> ${stats.eachSetScore.join(', ')}</div>

                    <h3>Player 1</h3>
                    <div><strong>Name:</strong> ${stats.player1.name.charAt(0).toUpperCase() + stats.player1.name.slice(1)}</div>
                    <div><strong>Age:</strong> ${stats.player1.age}</div>
                    <div><strong>Gender:</strong> ${stats.player1.gender.charAt(0).toUpperCase() + stats.player1.gender.slice(1)}</div>
                    <div><strong>Height:</strong> 
  ${stats.player1?.height?.unit === 'in' 
    ? `${Math.floor(stats.player1.height.value / 12)} ft ${stats.player1.height.value % 12} in`
    : `${stats.player1.height.value} cm`
  }
</div>

                    <div><strong>Racket:</strong> ${stats.player1.racket}</div>
                    <div><strong>Dominant Hand:</strong> ${stats.player1.dominantHand.charAt(0).toUpperCase() + stats.player1.dominantHand.slice(1)}</div>

                    <h3>Player 2</h3>
                    <div><strong>Name:</strong> ${stats.player2.name.charAt(0).toUpperCase() + stats.player2.name.slice(1)}</div>
                    <div><strong>Age:</strong> ${stats.player2.age}</div>
                    <div><strong>Gender:</strong> ${stats.player2.gender.charAt(0).toUpperCase() + stats.player2.gender.slice(1)}</div>
<div><strong>Height:</strong> 
  ${stats.player2?.height?.unit === 'in' 
    ? `${Math.floor(stats.player2.height.value / 12)} ft ${stats.player2.height.value % 12} in`
    : `${stats.player2.height.value} cm`
  }
</div>              
                    <div><strong>Racket:</strong> ${stats.player2.racket}</div>
                    <div><strong>Dominant Hand:</strong> ${stats.player2.dominantHand.charAt(0).toUpperCase() + stats.player2.dominantHand.slice(1)}</div>


                    
                    <button class="back">Back</button>
                </div>
                <hr>
            `;



            resultsContainer.appendChild(matchElement);


            const matchStatsContainer = document.getElementById("detailed-num-stats");
            const matchTimelineContainer = document.getElementById("matchtimeline-database");


            matchElement.querySelector('.view-details').addEventListener('click', () => {
                document.querySelectorAll('.match-result .match-summary').forEach(el => el.style.display = 'none');

                matchElement.querySelector('.match-details').style.display = 'block';



                // Step 1: Show only player buttons
                matchStatsContainer.innerHTML = `
                    <h3 id="detailed-stats">Detailed Match Stats</h3>
                    <div class="player-button-group">
                        <button id="player-btn" onclick="setPlayer('p1')">Player 1</button>
                        <button  id="player-btn" onclick="setPlayer('p2')">Player 2</button>
                    </div>

                `;;


                window.setPlayer = function (player) {
                    selectedPlayer = player; // Store selected player
                    selectedCategory = "rally"; // Default category

                    // Step 3: Show category buttons and hide player buttons
                    matchStatsContainer.innerHTML = `
                        <h3 id="detailed-stats">Player Match Action</h3>
                        <div class="action-button-wrapper">
  <div class="action-button-container">
    <button id="action-btn" onclick="setCategory('rally')">Rally</button>
    <button id="action-btn"onclick="setCategory('mid')">Mid Attack</button>
    <button id="action-btn"onclick="setCategory('finish')">Finishing</button>
    <button id="action-btn"onclick="setCategory('serve')">Serve</button>
    <button id="action-btn" onclick="setCategory('return')">Returned Serve</button>
  </div>
</div>
                        <button id="back-btn" onclick="goBackToPlayers()">Back</button>

                    `;
                };


                window.goBackToPlayers = function () {
                    matchStatsContainer.innerHTML = `
                        <h3 id="detailed-stats">Detailed Match Stats</h3>
                        <div class="player-button-group">
                            <button  id="player-btn" onclick="setPlayer('p1')">Player 1</button>
                            <button  id="player-btn" onclick="setPlayer('p2')">Player 2</button>
                        </div>
                    `;
                }

                // Step 4: Function to set category and show stats
                window.setCategory = function (category) {
                    selectedCategory = category; // Update selected category

                    // Step 3: Show subcategory (forehand/backhand OR first/second serve)
                    let subcategoryButtons = "";

                    if (category === "serve") {
                        subcategoryButtons = `
                            <h3 id="detailed-stats">Select Serve</h3>
                            <div class="subcategory-button-group">
                                <button id="subcat-btn"onclick="setSubcategory('first')">First Serve</button>
                                <button id="subcat-btn"onclick="setSubcategory('second')">Second Serve</button>
                            </div>
                        `;
                    } else if (category === "return") {
                        subcategoryButtons = `
                            <h3 id="detailed-stats">Select Return</h3>
                            <div class="subcategory-button-group">
                                <button id="subcat-btn"onclick="setSubcategory('first')">First Return</button>
                                <button id="subcat-btn"onclick="setSubcategory('second')">Second Return</button>
                            </div>
                        `;
                    } else {
                        subcategoryButtons = `
                            <h3 id="detailed-stats">Select Hand Used</h3>
                            <div class="subcategory-button-group">
                                <button id="subcat-btn"onclick="setSubcategory('forehand')">Forehand</button>
                                <button id="subcat-btn"onclick="setSubcategory('backhand')">Backhand</button>
                            </div>
                        `;
                    }

                    matchStatsContainer.innerHTML = `
                        <div>${subcategoryButtons}</div>
                        <br>
                        <button id="back-btn" onclick="goBackToPlayers()">Back</button>
                    `;
                };

                // Step 4: Function to filter and display stats based on selected subcategory
                window.setSubcategory = function (subcategory) {
                    selectedSubcategory = subcategory; // Store selected subcategory

                    // Step 5: Filter stats and display them in a table
                    const filteredStats = Object.entries(stats.stats)
                        .filter(([key]) => key.startsWith(selectedPlayer) && key.includes(selectedCategory) && key.includes(selectedSubcategory))
                        .map(([key, value]) => {
                            // Replace technical terms with readable names
                            let formattedKey = key
                                .replace(/^p1/, 'Player 1')
                                .replace(/^p2/, 'Player 2')
                                .replace('forehand', 'Forehand')
                                .replace('backhand', 'Backhand')
                                .replace('rally', 'Rally')
                                .replace('mid', 'Mid Attack')
                                .replace('finish', 'Finishing')
                                .replace('firstreturn', 'Returned First Serve')
                                .replace('secondreturn', 'Returned Second Serve')

                                .replace('firstserve', 'First Serve')
                                .replace('secondserve', 'Second Serve')
                                .replace('fade', 'Fade')
                                .replace('draw', 'Draw')
                                .replace(/mid attack.*drop/i, match => match.replace('drop', ' 3rd Dagger (Dropshot)'))
                                .replace(/finishing.*dropshot/i, match => match.replace('dropshot', ' 3rd Dagger (Dropshot)'))
                                .replace(/skip/i, 'Regular (Skipped)')
                                .replace('volley', 'Volley')
                                .replace('overhead', 'Overhead')


                                .replace('winner', '')
                                .replace('unforcederror', '')
                                .replace('forcederror', '')
                                .replace('ace', '')
                                .replace('df', '')

                                .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
                                .replace(/\s+/g, ' ') // Remove extra spaces
                                .replace(/\( /g, '(')
                                .trim();

                            // Determine stat type (Winner, Unforced Error, Forced Error)
                            let statType = key.includes("winner") ? "Winner" :
                                key.includes("unforcederror") ? "Unforced Error" :
                                key.includes("forcederror") ? "Forced Error" :
                                key.includes("ace") ? "Ace" :
                                key.includes("df") ? "Double Fault" :

                                "Other";

                            return `
                            <tr>
                                <td>${formattedKey}</td>
                                <td>${statType}</td>
                                <td>${value}</td>
                            </tr>
                        `;
                        }).join('');

                    matchStatsContainer.innerHTML = `
                        <h3 id="detailed-stats">Detailed Match Stats</h3>
                        <table border="1" cellspacing="0" cellpadding="8">
                            <thead>
                                <tr>
                                    <th>Match Play Stats</th>
                                    <th>Results</th>
                                    <th>Occurrences</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${filteredStats || "<tr><td colspan='3'>No stats available</td></tr>"}
                            </tbody>
                        </table>
                        <br>
                        <button id="back-btn"  onclick="goBackToPlayers()">Back</button>
                    `;
                };








                matchTimelineContainer.innerHTML = `
                <div id="timeline-container">
                <h3 id="timeline-label">Match Timeline</h3>

         <ul id="stats-list">
            ${stats.statsmatchTimeline.map(event => `<li><strong>${event.timestamp}:</strong> ${event.message}</li>`).join('')}
                    </ul>
    </div>

    `;
            });




            // When 'Back' button is clicked
            matchElement.querySelector('.back').addEventListener('click', () => {
                // Show all match summaries again
                document.querySelectorAll('.match-result .match-summary').forEach(el => el.style.display = 'block');

                // Hide match details
                matchElement.querySelector('.match-details').style.display = 'none';

                // ✅ Clear Match Stats from `#detailed-num-stats`
                matchStatsContainer.innerHTML = `
                <h3 id="detailed-stats">Detailed Match Stats</h3>
`;

matchTimelineContainer.innerHTML = `
    <h3 id="timeline-label">Match Timeline</h3>
`;
            });




            // Show match details and hide other matches
            matchElement.querySelector('.view-details').addEventListener('click', () => {
                document.querySelectorAll('.match-result').forEach(el => el.style.display = 'none');
                matchElement.style.display = 'block';
                matchElement.querySelector('.match-summary').style.display = 'none';
                matchElement.querySelector('.match-details').style.display = 'block';
            });

            // Back button to show all matches again
            matchElement.querySelector('.back').addEventListener('click', () => {
                document.querySelectorAll('.match-result').forEach(el => el.style.display = 'block');
                matchElement.querySelector('.match-summary').style.display = 'block';
                matchElement.querySelector('.match-details').style.display = 'none';
            });
        });

    } catch (error) {
        console.error('Error:', error);
        resultsContainer.textContent = 'An error occurred while fetching match stats.';
    }
});