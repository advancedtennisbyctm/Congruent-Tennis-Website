document.querySelectorAll('.mid-action-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const player = event.target.getAttribute('data-player');
        const action = event.target.getAttribute('data-action');
        showmidDetailsScreen(player, action);
    });
});

function showmidDetailsScreen(player, action) {
    const playerContainer = document.querySelector(`#player${player}-actions`);
    const otherPlayerContainer = document.querySelector(`#player${player === "1" ? "2" : "1"}-actions`);

    if (playerContainer) {
        resetPlayerState(playerContainer);

        const midScreen = playerContainer.querySelector('.mid-screen');
        const midOptions = playerContainer.querySelector('#mid-options');
        const midDirectionOptions = playerContainer.querySelector('#mid-direction-options');
        const midOutcomeOptions = playerContainer.querySelector('#mid-outcome-options');
        const rallyButton = playerContainer.querySelector('.action-btn');
        const midButton = playerContainer.querySelector('.mid-action-btn');
        const attackButton = playerContainer.querySelector('.finish-btn');
        const serveButton = playerContainer.querySelector('.serve-action-btn');
        const returnButton = playerContainer.querySelector('.return-action-btn');

        if (midScreen) midScreen.classList.remove('hidden');
        if (midOptions) midOptions.classList.remove('hidden');
        if (midDirectionOptions) midDirectionOptions.classList.add('hidden');
        if (midOutcomeOptions) midOutcomeOptions.classList.add('hidden');
        if (rallyButton) rallyButton.classList.add('hidden');
        if (midButton) midButton.classList.add('hidden');
        if (attackButton) attackButton.classList.add('hidden');
        if (serveButton) serveButton.classList.add('hidden');
        if (returnButton) returnButton.classList.add('hidden');





        playerContainer.querySelectorAll('.mid-side-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
        });
    }

    if (otherPlayerContainer) {
        MidfreezePlayer(otherPlayerContainer);
    }
}

function MidfreezePlayer(playerContainer) {
    playerContainer.querySelectorAll('button').forEach(button => {
        button.disabled = true;
    });

    const midScreen = playerContainer.querySelector('.mid-screen');
    if (midScreen) midScreen.classList.add('hidden');
}

document.querySelectorAll('.mid-side-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const side = event.target.getAttribute('data-side');
        const player = event.target.getAttribute('data-player');
        const action = event.target.getAttribute('data-action');
        showmidDirectionOptions(player, action, side);

    });
});

function showmidDirectionOptions(player, action, side) {
    const playerContainer = document.querySelector(`#player${player}-actions`);

    if (playerContainer) {
        const midOptions = playerContainer.querySelector('#mid-options');
        const midDirectionOptions = playerContainer.querySelector('#mid-direction-options');
        const midOutcomeOptions = playerContainer.querySelector('#mid-outcome-options');

        if (midOptions) midOptions.classList.add('hidden');
        if (midDirectionOptions) midDirectionOptions.classList.remove('hidden');
        if (midOutcomeOptions) midOutcomeOptions.classList.add('hidden');

        playerContainer.querySelectorAll('.mid-direction-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
        });
    }
}


document.querySelectorAll('.mid-direction-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const side = event.target.getAttribute('data-side');
        const player = event.target.getAttribute('data-player');
        const action = event.target.getAttribute('data-action');
        const direction = event.target.getAttribute('data-direction');
        showmidOutcomeOptions(player, action, side, direction);


    });
});





function showmidOutcomeOptions(player, action, side, direction) {


    const playerContainer = document.querySelector(`#player${player}-actions`);

    if (playerContainer) {
        const midDirectionOptions = playerContainer.querySelector('#mid-direction-options');
        const midOutcomeOptions = playerContainer.querySelector('#mid-outcome-options');

        const midButton = playerContainer.querySelector('.mid-action-btn');

        if (midDirectionOptions) midDirectionOptions.classList.add('hidden');
        if (midOutcomeOptions) midOutcomeOptions.classList.remove('hidden');

        playerContainer.querySelectorAll('.mid-outcome-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
            button.setAttribute('data-direction', direction);
            button.addEventListener('click', () => {
                if (midOutcomeOptions) midOutcomeOptions.classList.add('hidden');
                if (midButton) midButton.classList.remove('hidden');
                resetmidAllPlayers(); // Reset all players to the initial state
            });
        });
    }
}


function resetmidAllPlayers() {
    ['1', '2'].forEach(player => {
        const playerContainer = document.querySelector(`#player${player}-actions`);
        if (playerContainer) resetMidPlayerState(playerContainer, player);
    });
}


document.querySelectorAll('.mid-outcome-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const outcome = event.target.getAttribute('data-outcome');
        const player = button.getAttribute('data-player');
        const action = button.getAttribute('data-action');
        const side = button.getAttribute('data-side');
        const direction = button.getAttribute('data-direction');
        stats.push({
            player,
            action,
            side,
            outcome,
            direction,
            timestamp: new Date().toLocaleTimeString()
        });

        resetmidAllPlayers();
        document.getElementById('mid-screen').classList.remove('hidden');
        updateScore(player, action, side, outcome, direction);
    });
});

function resetMidPlayerState(playerContainer) {
    // Reset buttons
    playerContainer.querySelectorAll('button').forEach(button => {
        button.disabled = false;
        button.classList.remove('hidden');
    });

    // Hide specific sections
    const midScreen = playerContainer.querySelector('.mid-screen');
    const midOptions = playerContainer.querySelector('#mid-options');
    const midDirectionOptions = playerContainer.querySelector('#mid-direction-options');
    const midOutcomeOptions = playerContainer.querySelector('#mid-outcome-options');
    const midButton = playerContainer.querySelector('.mid-action-btn');

    if (midScreen) midScreen.classList.add('hidden');
    if (midOptions) midOptions.classList.add('hidden');
    if (midDirectionOptions) midDirectionOptions.classList.add('hidden');
    if (midOutcomeOptions) midOutcomeOptions.classList.add('hidden');
    if (midButton) midButton.classList.remove('hidden'); // Ensure rally button is visible
}

document.querySelectorAll('.mid-back-to-match-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Hide the details screen for the active player
        document.querySelectorAll('.mid-screen').forEach(screen => screen.classList.add('hidden'));

        // Reset all players
        resetmidAllPlayers();

        // Ensure rally buttons are visible and enabled
        document.querySelectorAll('.mid-action-btn').forEach(midButton => {
            midButton.classList.remove('hidden'); // Make rally button visible
            midButton.disabled = false; // Ensure rally button is enabled
        });

        // Show the match screen
        document.getElementById('match-screen').classList.remove('hidden');
    });
});


document.getElementById('set-selection-screen').classList.add('hidden');
document.getElementById('match-screen').classList.remove('hidden');
document.querySelector(`#player1-actions .action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player2-actions .action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player1-actions .mid-action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player2-actions .mid-action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player1-actions .finish-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player2-actions .finish-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player1-actions .serve-action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player2-actions .serve-action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player1-actions .return-action-btn.hidden`)?.classList.remove('hidden');
document.querySelector(`#player2-actions .return-action-btn.hidden`)?.classList.remove('hidden');




                        p1forehandrallyfadewinner,
                        p1forehandrallyfadeunforcederror,
                        p1forehandrallyfadeforcederror,
                        p1forehandrallydrawwinner,
                        p1forehandrallydrawunforcederror,
                        p1forehandrallydrawforcederror,
                        p1forehandrallyskipwinner,
                        p1forehandrallyskipunforcederror,
                        p1forehandrallyskipforcederror,

                        p1backhandrallyfadewinner,
                        p1backhandrallyfadeunforcederror,
                        p1backhandrallyfadeforcederror,
                        p1backhandrallydrawwinner,
                        p1backhandrallydrawunforcederror,
                        p1backhandrallydrawforcederror,
                        p1backhandrallyskipwinner,
                        p1backhandrallyskipunforcederror,
                        p1backhandrallyskipforcederror,

                        p1forehandmidfadewinner,
                        p1forehandmidfadeunforcederror,
                        p1forehandmidfadeforcederror,
                        p1forehandmiddrawwinner,
                        p1forehandmiddrawunforcederror,
                        p1forehandmiddrawforcederror,
                        p1forehandmiddropwinner,
                        p1forehandmiddropunforcederror,
                        p1forehandmiddropforcederror,
                        p1forehandmidskipwinner,
                        p1forehandmidskipunforcederror,
                        p1forehandmidskipforcederror,

                        p1backhandmidfadewinner,
                        p1backhandmidfadeunforcederror,
                        p1backhandmidfadeforcederror,
                        p1backhandmiddrawwinner,
                        p1backhandmiddrawunforcederror,
                        p1backhandmiddrawforcederror,
                        p1backhandmiddropdrawwinner,
                        p1backhandmiddropdrawunforcederror,
                        p1backhandmiddropdrawforcederror,
                        p1backhandmiddropskipwinner,
                        p1backhandmiddropskipunforcederror,
                        p1backhandmiddropskipforcederror,

                        p1forehandfinishvolleywinner,
                        p1forehandfinishvolleyunforcederror,
                        p1forehandfinishvolleyforcederror,
                        p1forehandfinishoverheadwinner,
                        p1forehandfinishoverheadunforcederror,
                        p1forehandfinishoverheadforcederror,
                        p1forehandfinishdropshotwinner,
                        p1forehandfinishdropshotunforcederror,
                        p1forehandfinishdropshotforcederror,

                        p1backhandfinishvolleywinner,
                        p1backhandfinishvolleyunforcederror,
                        p1backhandfinishvolleyforcederror,
                        p1backhandfinishoverheadwinner,
                        p1backhandfinishoverheadunforcederror,
                        p1backhandfinishoverheadforcederror,
                        p1backhandfinishdropshotwinner,
                        p1backhandfinishdropshotunforcederror,
                        p1backhandfinishdropshotforcederror,

                        p1firstserveace,
                        p1firstservewinner,
                        p1secondserveace,
                        p1secondservewinner,
                        p1secondservedf,

                        p1firstreturnfadewinner,
                        p1firstreturnfadeunforcederror,
                        p1firstreturnfadeforcederror,
                        p1firstreturndrawwinner,
                        p1firstreturndrawunforcederror,
                        p1firstreturndrawforcederror,
                        p1firstreturnskipwinner,
                        p1firstreturnskipunforcederror,
                        p1firstreturnskipforcederror,
                        p1secondreturnfadewinner,
                        p1secondreturnfadeunforcederror,
                        p1secondreturnfadeforcederror,
                        p1secondreturndrawwinner,
                        p1secondreturndrawunforcederror,
                        p1secondreturndrawforcederror,
                        p1secondreturnskipwinner,
                        p1secondreturnskipunforcederror,
                        p1secondreturnskipforcederror,

                        p2forehandrallyfadewinner,
                        p2forehandrallyfadeunforcederror,
                        p2forehandrallyfadeforcederror,
                        p2forehandrallydrawwinner,
                        p2forehandrallydrawunforcederror,
                        p2forehandrallydrawforcederror,
                        p2forehandrallyskipwinner,
                        p2forehandrallyskipunforcederror,
                        p2forehandrallyskipforcederror,

                        p2backhandrallyfadewinner,
                        p2backhandrallyfadeunforcederror,
                        p2backhandrallyfadeforcederror,
                        p2backhandrallydrawwinner,
                        p2backhandrallydrawunforcederror,
                        p2backhandrallydrawforcederror,
                        p2backhandrallyskipwinner,
                        p2backhandrallyskipunforcederror,
                        p2backhandrallyskipforcederror,

                        p2forehandmidfadewinner,
                        p2forehandmidfadeunforcederror,
                        p2forehandmidfadeforcederror,
                        p2forehandmiddrawwinner,
                        p2forehandmiddrawunforcederror,
                        p2forehandmiddrawforcederror,
                        p2forehandmiddropwinner,
                        p2forehandmiddropunforcederror,
                        p2forehandmiddropforcederror,
                        p2forehandmidskipwinner,
                        p2forehandmidskipunforcederror,
                        p2forehandmidskipforcederror,

                        p2backhandmidfadewinner,
                        p2backhandmidfadeunforcederror,
                        p2backhandmidfadeforcederror,
                        p2backhandmiddrawwinner,
                        p2backhandmiddrawunforcederror,
                        p2backhandmiddrawforcederror,
                        p2backhandmiddropdrawwinner,
                        p2backhandmiddropdrawunforcederror,
                        p2backhandmiddropdrawforcederror,
                        p2backhandmidskipdrawwinner,
                        p2backhandmidskipdrawunforcederror,
                        p2backhandmidskipdrawforcederror,

                        p2forehandfinishvolleywinner,
                        p2forehandfinishvolleyunforcederror,
                        p2forehandfinishvolleyforcederror,
                        p2forehandfinishoverheadwinner,
                        p2forehandfinishoverheadunforcederror,
                        p2forehandfinishoverheadforcederror,
                        p2forehandfinishdropshotwinner,
                        p2forehandfinishdropshotunforcederror,
                        p2forehandfinishdropshotforcederror,

                        p2backhandfinishvolleywinner,
                        p2backhandfinishvolleyunforcederror,
                        p2backhandfinishvolleyforcederror,
                        p2backhandfinishoverheadwinner,
                        p2backhandfinishoverheadunforcederror,
                        p2backhandfinishoverheadforcederror,
                        p2backhandfinishdropshotwinner,
                        p2backhandfinishdropshotunforcederror,
                        p2backhandfinishdropshotforcederror,

                        p2firstserveace,
                        p2firstservewinner,
                        p2secondserveace,
                        p2secondservewinner,
                        p2secondservedf,

                        p2firstreturnfadewinner,
                        p2firstreturnfadeunforcederror,
                        p2firstreturnfadeforcederror,
                        p2firstreturndrawwinner,
                        p2firstreturndrawunforcederror,
                        p2firstreturndrawforcederror,
                        p2firstreturnskipwinner,
                        p2firstreturnskipunforcederror,
                        p2firstreturnskipforcederror,
                        p2secondreturnfadewinner,
                        p2secondreturnfadeunforcederror,
                        p2secondreturnfadeforcederror,
                        p2secondreturndrawwinner,
                        p2secondreturndrawunforcederror,
                        p2secondreturndrawforcederror,
                        p2secondreturnskipwinner,
                        p2secondreturnskipunforcederror,
                        p2secondreturnskipforcederror






                        app.post('/save-stats', async (req, res) => {


    
                            const {
                                matchId = generateMatchId(),
                                matchName,
                                matchDate,
                                player1,
                                player2,
                                stats,
                                eachSetScore,
                                matchTimeline, // Accept custom timeline
                            } = req.body;
                        
                            
                        
                            try {
                                const updatedMatchStats = await PlayerStats.findOneAndUpdate(
                                    { matchId },
                                    {
                                        matchId,
                                        
                                        matchName,
                                        matchDate,
                                        player1,
                                        player2,
                                        stats,
                                        eachSetScore,
                                        matchTimeline, // Save timeline as provided
                                        updatedAt: new Date(),
                                    },
                                    { upsert: true, new: true, setDefaultsOnInsert: true }
                                );
                        
                                res.status(200).json({ message: 'Stats saved successfully', matchId, data: updatedMatchStats });
                            } catch (error) {
                                console.error('Error saving stats:', error);
                                res.status(500).json({ message: 'Failed to save stats', error: error.message });
                            }
                        });
                        
                        
                        // Endpoint to fetch stats by matchId
                        app.get('/get-stats/:matchId', async (req, res) => {
                            const { matchId } = req.params;
                        
                            try {
                                // Fetch data for the given matchId
                                const stats = await PlayerStats.findOne({ matchId });
                        
                                if (!stats) {
                                    return res.status(404).json({ message: 'Match stats not found' });
                                }
                        
                                res.status(200).json(stats);
                            } catch (error) {
                                console.error('Error fetching stats:', error);
                                res.status(500).json({ message: 'Failed to fetch stats' });
                            }
                        });