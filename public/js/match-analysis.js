document.getElementById('create-match-btn').addEventListener('click', () => {
    document.getElementById('main-screen').classList.toggle('hidden');
    document.getElementById('set-selection-screen').classList.toggle('hidden');
  });


document.getElementById('three-sets-btn').addEventListener('click', () => {
    startMatch(3);
    document.getElementById('game-stats-btn').classList.remove('hidden')
    document.getElementById('stats-container').classList.remove('hidden')

    
});

document.getElementById('five-sets-btn').addEventListener('click', () => {
    startMatch(5);
    document.getElementById('game-stats-btn').classList.remove('hidden')
    document.getElementById('stats-container').classList.remove('hidden')

});




function startMatch(sets) {
    resetmidAllPlayers()
    resetAllPlayers()
    resetreturnAllPlayers()
    resetserveAllPlayers()
    resetfinishAllPlayers()
    resetgameStats()



    document.getElementById('save-stats-screen').classList.remove('hidden');

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



    let currentSet = 1;
    let player1Sets = 0;
    let player2Sets = 0;
    let currentGame = 1;
    let player1Score = 0;
    let player2Score = 0;
    let player1Games = 0;
    let player2Games = 0;
    let player1Overtime = 0;
    let player2Overtime = 0;
    let overtime = false;
    let stats = [];

    document.getElementById('set-counter').textContent = `${player1Sets}-${player2Sets}`;
    document.getElementById('current-game').textContent = currentGame;
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
    document.getElementById('game-counter').textContent = `${player1Games}-${player2Games}`;


    document.querySelectorAll('.finish-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showfinishDetailsScreen(player, action);
        });
    });


    function showfinishDetailsScreen(player, action) {
        const playerContainer = document.querySelector(`#player${player}-actions`);
        const otherPlayerContainer = document.querySelector(`#player${player === "1" ? "2" : "1"}-actions`);

        if (playerContainer) {
            resetPlayerState(playerContainer);

            const finishScreen = playerContainer.querySelector('.finishing-screen');
            const finishOptions = playerContainer.querySelector('#finish-options');
            const finishDirectionOptions = playerContainer.querySelector('#finish-direction-options');
            const finishOutcomeOptions = playerContainer.querySelector('#finish-outcome-options');
            const rallyButton = playerContainer.querySelector('.action-btn');
            const midButton = playerContainer.querySelector('.mid-action-btn');
            const attackButton = playerContainer.querySelector('.finish-btn');
            const serveButton = playerContainer.querySelector('.serve-action-btn');
            const returnButton = playerContainer.querySelector('.return-action-btn');

            if (finishScreen) finishScreen.classList.remove('hidden');
            if (finishOptions) finishOptions.classList.remove('hidden');
            if (finishDirectionOptions) finishDirectionOptions.classList.add('hidden');
            if (finishOutcomeOptions) finishOutcomeOptions.classList.add('hidden');
            if (rallyButton) rallyButton.classList.add('hidden');
            if (midButton) midButton.classList.add('hidden');
            if (attackButton) attackButton.classList.add('hidden');
            if (serveButton) serveButton.classList.add('hidden');
            if (returnButton) returnButton.classList.add('hidden');





            playerContainer.querySelectorAll('.finish-side-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
            });
        }

        if (otherPlayerContainer) {
            finishFreezePlayer(otherPlayerContainer);
        }
    }

    function finishFreezePlayer(playerContainer) {
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        const finishScreen = playerContainer.querySelector('.finishing-screen');
        if (finishScreen) finishScreen.classList.add('hidden');
    }



    document.querySelectorAll('.finish-side-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showfinishDirectionOptions(player, action, side);

        });
    });


    function showfinishDirectionOptions(player, action, side) {
        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const finishOptions = playerContainer.querySelector('#finish-options');
            const finishDirectionOptions = playerContainer.querySelector('#finish-direction-options');
            const finishOutcomeOptions = playerContainer.querySelector('#finish-outcome-options');

            if (finishOptions) finishOptions.classList.add('hidden');
            if (finishDirectionOptions) finishDirectionOptions.classList.remove('hidden');
            if (finishOutcomeOptions) finishOutcomeOptions.classList.add('hidden');

            playerContainer.querySelectorAll('.finish-direction-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
            });
        }
    }



    document.querySelectorAll('.finish-direction-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const direction = event.target.getAttribute('data-direction');
            showfinishOutcomeOptions(player, action, side, direction);
        });
    });

    function showfinishOutcomeOptions(player, action, side, direction) {


        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const finishDirectionOptions = playerContainer.querySelector('#finish-direction-options');
            const finishOutcomeOptions = playerContainer.querySelector('#finish-outcome-options');

            const attackButton = playerContainer.querySelector('.finish-btn');

            if (finishDirectionOptions) finishDirectionOptions.classList.add('hidden');
            if (finishOutcomeOptions) finishOutcomeOptions.classList.remove('hidden');

            playerContainer.querySelectorAll('.finish-outcome-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
                button.setAttribute('data-direction', direction);
                button.addEventListener('click', () => {
                    if (finishOutcomeOptions) finishOutcomeOptions.classList.add('hidden');
                    if (attackButton) attackButton.classList.remove('hidden');
                    resetfinishAllPlayers(); // Reset all players to the initial state
                });
            });
        }
    }

    function resetfinishAllPlayers() {
        ['1', '2'].forEach(player => {
            const playerContainer = document.querySelector(`#player${player}-actions`);
            if (playerContainer) resetfinishPlayerState(playerContainer, player);
        });
    }


    document.querySelectorAll('.finish-outcome-btn').forEach(button => {
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

            resetfinishAllPlayers();
            document.getElementById('finishing-screen').classList.remove('hidden');
            updateScore(player, action, side, outcome, direction);
        });
    });


    function resetfinishPlayerState(playerContainer) {
        // Reset buttons
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = false;
            button.classList.remove('hidden');
        });

        // Hide specific sections
        const finishScreen = playerContainer.querySelector('.finishing-screen');
        const finishOptions = playerContainer.querySelector('#finish-options');
        const finishDirectionOptions = playerContainer.querySelector('#finish-direction-options');
        const finishOutcomeOptions = playerContainer.querySelector('#finish-outcome-options');
        const attackButton = playerContainer.querySelector('.finish-btn');

        if (finishScreen) finishScreen.classList.add('hidden');
        if (finishOptions) finishOptions.classList.add('hidden');
        if (finishDirectionOptions) finishDirectionOptions.classList.add('hidden');
        if (finishOutcomeOptions) finishOutcomeOptions.classList.add('hidden');
        if (attackButton) attackButton.classList.remove('hidden'); // Ensure rally button is visible
    }


    document.querySelectorAll('.finish-back-to-match-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Hide the details screen for the active player
            document.querySelectorAll('.finishing-screen').forEach(screen => screen.classList.add('hidden'));

            // Reset all players
            resetfinishAllPlayers();

            // Ensure rally buttons are visible and enabled
            document.querySelectorAll('.finish-btn').forEach(attackButton => {
                attackButton.classList.remove('hidden'); // Make rally button visible
                attackButton.disabled = false; // Ensure rally button is enabled
            });

            // Show the match screen
            document.getElementById('match-screen').classList.remove('hidden');
        });
    });


    // Initialize the action buttons
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showDetailsScreen(player, action);
        });
    });

    // Function to show the details screen
    function showDetailsScreen(player, action) {
        const playerContainer = document.querySelector(`#player${player}-actions`);
        const otherPlayerContainer = document.querySelector(`#player${player === "1" ? "2" : "1"}-actions`);

        if (playerContainer) {
            resetPlayerState(playerContainer);

            const detailsScreen = playerContainer.querySelector('.details-screen');
            const detailsOptions = playerContainer.querySelector('#details-options');
            const directionOptions = playerContainer.querySelector('#direction-options');
            const outcomeOptions = playerContainer.querySelector('#outcome-options');
            const rallyButton = playerContainer.querySelector('.action-btn');
            const midButton = playerContainer.querySelector('.mid-action-btn');
            const attackButton = playerContainer.querySelector('.finish-btn');
            const serveButton = playerContainer.querySelector('.serve-action-btn');
            const returnButton = playerContainer.querySelector('.return-action-btn');

            if (detailsScreen) detailsScreen.classList.remove('hidden');
            if (detailsOptions) detailsOptions.classList.remove('hidden');
            if (directionOptions) directionOptions.classList.add('hidden');
            if (outcomeOptions) outcomeOptions.classList.add('hidden');
            if (rallyButton) rallyButton.classList.add('hidden');
            if (midButton) midButton.classList.add('hidden');
            if (attackButton) attackButton.classList.add('hidden');
            if (serveButton) serveButton.classList.add('hidden');
            if (returnButton) returnButton.classList.add('hidden');





            playerContainer.querySelectorAll('.side-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
            });
        }

        if (otherPlayerContainer) {
            freezePlayer(otherPlayerContainer);
        }
    }

    // Function to show direction options
    function showDirectionOptions(player, action, side) {
        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const detailsOptions = playerContainer.querySelector('#details-options');
            const directionOptions = playerContainer.querySelector('#direction-options');
            const outcomeOptions = playerContainer.querySelector('#outcome-options');

            if (detailsOptions) detailsOptions.classList.add('hidden');
            if (directionOptions) directionOptions.classList.remove('hidden');
            if (outcomeOptions) outcomeOptions.classList.add('hidden');

            playerContainer.querySelectorAll('.direction-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
            });
        }
    }

    // Function to show outcome options
    function showOutcomeOptions(player, action, side, direction) {
        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const directionOptions = playerContainer.querySelector('#direction-options');
            const outcomeOptions = playerContainer.querySelector('#outcome-options');
            const rallyButton = playerContainer.querySelector('.action-btn');

            if (directionOptions) directionOptions.classList.add('hidden');
            if (outcomeOptions) outcomeOptions.classList.remove('hidden');

            playerContainer.querySelectorAll('.outcome-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
                button.setAttribute('data-direction', direction);

                button.addEventListener('click', () => {
                    if (outcomeOptions) outcomeOptions.classList.add('hidden');
                    if (rallyButton) rallyButton.classList.remove('hidden');
                    resetAllPlayers(); // Reset all players to the initial state
                });
            });
        }
    }

    function resetAllPlayers() {
        ['1', '2'].forEach(player => {
            const playerContainer = document.querySelector(`#player${player}-actions`);
            if (playerContainer) resetPlayerState(playerContainer, player);
        });
    }



    // Reset a specific player's state


    // Freeze a player's actions
    function freezePlayer(playerContainer) {
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        const detailsScreen = playerContainer.querySelector('.details-screen');
        if (detailsScreen) detailsScreen.classList.add('hidden');
    }

    // Event listeners for direction and outcome buttons
    document.querySelectorAll('.side-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showDirectionOptions(player, action, side);
        });
    });

    document.querySelectorAll('.direction-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const direction = event.target.getAttribute('data-direction');
            showOutcomeOptions(player, action, side, direction);
        });
    });

    document.querySelectorAll('.outcome-btn').forEach(button => {
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

            resetAllPlayers();
            document.getElementById('match-screen').classList.remove('hidden');
            updateScore(player, action, side, outcome, direction);
        });
    });


    function resetPlayerState(playerContainer) {
        // Reset buttons
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = false;
            button.classList.remove('hidden');
        });

        // Hide specific sections
        const detailsScreen = playerContainer.querySelector('.details-screen');
        const detailsOptions = playerContainer.querySelector('#details-options');
        const directionOptions = playerContainer.querySelector('#direction-options');
        const outcomeOptions = playerContainer.querySelector('#outcome-options');
        const rallyButton = playerContainer.querySelector('.action-btn');

        if (detailsScreen) detailsScreen.classList.add('hidden');
        if (detailsOptions) detailsOptions.classList.add('hidden');
        if (directionOptions) directionOptions.classList.add('hidden');
        if (outcomeOptions) outcomeOptions.classList.add('hidden');
        if (rallyButton) rallyButton.classList.remove('hidden'); // Ensure rally button is visible
    }

    document.querySelectorAll('.reg-back-to-match-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Hide the details screen for the active player
            document.querySelectorAll('.details-screen').forEach(screen => screen.classList.add('hidden'));

            // Reset all players
            resetAllPlayers();

            // Ensure rally buttons are visible and enabled
            document.querySelectorAll('.action-btn').forEach(rallyButton => {
                rallyButton.classList.remove('hidden'); // Make rally button visible
                rallyButton.disabled = false; // Ensure rally button is enabled
            });

            // Show the match screen
            document.getElementById('match-screen').classList.remove('hidden');
        });
    });


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





    document.querySelectorAll('.return-action-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showreturnDetailsScreen(player, action);
        });
    });


    function showreturnDetailsScreen(player, action) {
        const playerContainer = document.querySelector(`#player${player}-actions`);
        const otherPlayerContainer = document.querySelector(`#player${player === "1" ? "2" : "1"}-actions`);

        if (playerContainer) {
            resetPlayerState(playerContainer);

            const returnScreen = playerContainer.querySelector('.return-detail-screen');
            const returnOptions = playerContainer.querySelector('#return-details-options');
            const returnDirectionOptions = playerContainer.querySelector('#return-direction-options');
            const returnOutcomeOptions = playerContainer.querySelector('#return-outcome-options');
            const rallyButton = playerContainer.querySelector('.action-btn');
            const midButton = playerContainer.querySelector('.mid-action-btn');
            const attackButton = playerContainer.querySelector('.finish-btn');
            const serveButton = playerContainer.querySelector('.serve-action-btn');
            const returnButton = playerContainer.querySelector('.return-action-btn');

            if (returnScreen) returnScreen.classList.remove('hidden');
            if (returnOptions) returnOptions.classList.remove('hidden');
            if (returnDirectionOptions) returnDirectionOptions.classList.add('hidden');
            if (returnOutcomeOptions) returnOutcomeOptions.classList.add('hidden');
            if (rallyButton) rallyButton.classList.add('hidden');
            if (midButton) midButton.classList.add('hidden');
            if (attackButton) attackButton.classList.add('hidden');
            if (serveButton) serveButton.classList.add('hidden');
            if (returnButton) returnButton.classList.add('hidden');





            playerContainer.querySelectorAll('.return-num-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
            });
        }

        if (otherPlayerContainer) {
            returnfreezePlayer(otherPlayerContainer);
        }
    }

    function returnfreezePlayer(playerContainer) {
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        const returnScreen = playerContainer.querySelector('.return-detail-screen');
        if (returnScreen) returnScreen.classList.add('hidden');
    }


    document.querySelectorAll('.return-num-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showreturnDirectionOptions(player, action, side);

        });
    });

    function showreturnDirectionOptions(player, action, side) {
        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const returnOptions = playerContainer.querySelector('#return-details-options');
            const returnDirectionOptions = playerContainer.querySelector('#return-direction-options');
            const returnOutcomeOptions = playerContainer.querySelector('#return-outcome-options');

            if (returnOptions) returnOptions.classList.add('hidden');
            if (returnDirectionOptions) returnDirectionOptions.classList.remove('hidden');
            if (returnOutcomeOptions) returnOutcomeOptions.classList.add('hidden');

            playerContainer.querySelectorAll('.return-direction-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
            });
        }
    }



    document.querySelectorAll('.return-direction-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const direction = event.target.getAttribute('data-direction');
            showReturnOutcomeOptions(player, action, side, direction);
        });
    });



    function showReturnOutcomeOptions(player, action, side, direction) {


        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const returnDirectionOptions = playerContainer.querySelector('#return-direction-options');
            const returnOutcomeOptions = playerContainer.querySelector('#return-outcome-options');


            const returnButton = playerContainer.querySelector('.return-action-btn');

            if (returnDirectionOptions) returnDirectionOptions.classList.add('hidden');
            if (returnOutcomeOptions) returnOutcomeOptions.classList.remove('hidden');

            playerContainer.querySelectorAll('.return-outcome-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
                button.setAttribute('data-side', side);
                button.setAttribute('data-direction', direction);
                button.addEventListener('click', () => {
                    if (returnOutcomeOptions) returnOutcomeOptions.classList.add('hidden');
                    if (returnButton) returnButton.classList.remove('hidden');
                    resetreturnAllPlayers(); // Reset all players to the initial state
                });
            });
        }
    }


    function resetreturnAllPlayers() {
        ['1', '2'].forEach(player => {
            const playerContainer = document.querySelector(`#player${player}-actions`);
            if (playerContainer) resetreturnPlayerState(playerContainer, player);
        });
    }


    document.querySelectorAll('.return-outcome-btn').forEach(button => {
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

            resetreturnAllPlayers();
            document.getElementById('return-detail-screen').classList.remove('hidden');
            updateScore(player, action, side, outcome, direction);
        });
    });

    function resetreturnPlayerState(playerContainer) {
        // Reset buttons
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = false;
            button.classList.remove('hidden');
        });

        // Hide specific sections
        const returnScreen = playerContainer.querySelector('.return-detail-screen');
        const returnOptions = playerContainer.querySelector('#return-details-options');
        const returnDirectionOptions = playerContainer.querySelector('#return-direction-options');
        const returnOutcomeOptions = playerContainer.querySelector('#return-outcome-options');
        const returnButton = playerContainer.querySelector('.return-action-btn');

        if (returnScreen) returnScreen.classList.add('hidden');
        if (returnOptions) returnOptions.classList.add('hidden');
        if (returnDirectionOptions) returnDirectionOptions.classList.add('hidden');
        if (returnOutcomeOptions) returnOutcomeOptions.classList.add('hidden');
        if (returnButton) returnButton.classList.remove('hidden'); // Ensure rally button is visible
    }


    document.querySelectorAll('.return-back-to-match-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Hide the details screen for the active player
            document.querySelectorAll('.return-detail-screen').forEach(screen => screen.classList.add('hidden'));

            // Reset all players
            resetreturnAllPlayers();

            // Ensure rally buttons are visible and enabled
            document.querySelectorAll('.return-action-btn').forEach(returnButton => {
                returnButton.classList.remove('hidden'); // Make rally button visible
                returnButton.disabled = false; // Ensure rally button is enabled
            });

            // Show the match screen
            document.getElementById('match-screen').classList.remove('hidden');
        });
    });










    document.querySelectorAll('.serve-action-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showServeDetailsScreen(player, action);
        });
    });

    function showServeDetailsScreen(player, action) {
        const playerContainer = document.querySelector(`#player${player}-actions`);
        const otherPlayerContainer = document.querySelector(`#player${player === "1" ? "2" : "1"}-actions`);

        if (playerContainer) {
            resetPlayerState(playerContainer);

            const serveScreen = playerContainer.querySelector('.serve-detail-screen');
            const serveOptions = playerContainer.querySelector('#serve-details-options');
            const serveoneOptions = playerContainer.querySelector('#first-serve-options');
            const servetwoOptions = playerContainer.querySelector('#second-serve-options');
            const rallyButton = playerContainer.querySelector('.action-btn');
            const midButton = playerContainer.querySelector('.mid-action-btn');
            const attackButton = playerContainer.querySelector('.finish-btn');
            const serveButton = playerContainer.querySelector('.serve-action-btn');
            const returnButton = playerContainer.querySelector('.return-action-btn');

            if (serveScreen) serveScreen.classList.remove('hidden');
            if (serveOptions) serveOptions.classList.remove('hidden');
            if (serveoneOptions) serveoneOptions.classList.add('hidden');
            if (servetwoOptions) servetwoOptions.classList.add('hidden');
            if (rallyButton) rallyButton.classList.add('hidden');
            if (midButton) midButton.classList.add('hidden');
            if (attackButton) attackButton.classList.add('hidden');
            if (serveButton) serveButton.classList.add('hidden');
            if (returnButton) returnButton.classList.add('hidden');





            playerContainer.querySelectorAll('.serve-num-btn').forEach(button => {
                button.setAttribute('data-player', player);
                button.setAttribute('data-action', action);
            });
        }

        if (otherPlayerContainer) {
            servefreezePlayer(otherPlayerContainer);
        }
    }

    function servefreezePlayer(playerContainer) {
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        const serveScreen = playerContainer.querySelector('.serve-detail-screen');
        if (serveScreen) serveScreen.classList.add('hidden');
    }


    document.querySelectorAll('.serve-num-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showservenumOptions(player, action, side);

        });
    });



    function showservenumOptions(player, action, side) {
        const playerContainer = document.querySelector(`#player${player}-actions`);

        if (playerContainer) {
            const serveDetailsOptions = playerContainer.querySelector('#serve-details-options');
            const firstServeOptions = playerContainer.querySelector('#first-serve-options');
            const secondServeOptions = playerContainer.querySelector('#second-serve-options');

            // Hide the main serve options
            if (serveDetailsOptions) serveDetailsOptions.classList.add('hidden');

            // Show appropriate serve direction options based on the side
            if (side === "On First Serve Resulting In") {
                if (firstServeOptions) firstServeOptions.classList.remove('hidden');
                playerContainer.querySelectorAll('.first-serve-btn').forEach(button => {
                    button.setAttribute('data-player', player);
                    button.setAttribute('data-action', action);
                    button.setAttribute('data-side', side);
                });
            } else if (side === "On Second Serve Resulting In") {
                if (secondServeOptions) secondServeOptions.classList.remove('hidden');
                playerContainer.querySelectorAll('.second-serve-btn').forEach(button => {
                    button.setAttribute('data-player', player);
                    button.setAttribute('data-action', action);
                    button.setAttribute('data-side', side);
                });
            }
        }
    }



    function resetserveAllPlayers() {
        ['1', '2'].forEach(player => {
            const playerContainer = document.querySelector(`#player${player}-actions`);
            if (playerContainer) resetservePlayerState(playerContainer, player);
        });
    }


    // Event listener for first-serve buttons
    document.querySelectorAll('.first-serve-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const type = event.target.getAttribute('data-first');

            stats.push({
                player,
                action,
                side,
                type,
                timestamp: new Date().toLocaleTimeString()
            });

            updateScore(player, action, side, type);
            resetserveAllPlayers()
        });
    });



    // Event listener for second-serve buttons
    document.querySelectorAll('.second-serve-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const type = event.target.getAttribute('data-second');

            const winningPlayer = type === "A Double Fault" ? (player === "1" ? "2" : "1") : player;

            stats.push({
                player,
                action,
                side,
                type,
                timestamp: new Date().toLocaleTimeString()
            });

            updateScore(winningPlayer, action, side, type);
            resetserveAllPlayers()

        });
    });




    function resetservePlayerState(playerContainer) {
        // Reset buttons
        playerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = false;
            button.classList.remove('hidden');
        });

        // Hide specific sections
        const serveScreen = playerContainer.querySelector('.serve-detail-screen');
        const serveOptions = playerContainer.querySelector('#serve-details-options');
        const serveoneOptions = playerContainer.querySelector('#first-serve-options');
        const servetwoOptions = playerContainer.querySelector('#second-serve-options');
        const serveButton = playerContainer.querySelector('.serve-action-btn');

        if (serveScreen) serveScreen.classList.add('hidden');
        if (serveOptions) serveOptions.classList.add('hidden');
        if (serveoneOptions) serveoneOptions.classList.add('hidden');
        if (servetwoOptions) servetwoOptions.classList.add('hidden');
        if (serveButton) serveButton.classList.remove('hidden'); // Ensure rally button is visible
    }





    document.querySelectorAll('.serve-back-to-match-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Hide the details screen for the active player
            document.querySelectorAll('.serve-detail-screen').forEach(screen => screen.classList.add('hidden'));

            // Reset all players
            resetserveAllPlayers();

            // Ensure rally buttons are visible and enabled
            document.querySelectorAll('.serve-action-btn').forEach(serveButton => {
                serveButton.classList.remove('hidden'); // Make rally button visible
                serveButton.disabled = false; // Ensure rally button is enabled
            });

            // Show the match screen
            document.getElementById('match-screen').classList.remove('hidden');
        });
    });

    let currentServer = '1'; // '1' for Player 1, '2' for Player 2

    function toggleServer() {
        if (tiebreak) {
            tiebreakPoints++;
            // Switch server after the first point, then every two points
            if (tiebreakPoints === 1 || tiebreakPoints % 2 === 0) {
                currentServer = (currentServer === '1') ? '2' : '1';
            }
        } else {
            currentServer = (currentServer === '1') ? '2' : '1';
        }
        updateServerDisplay();
    }




    function updateServerDisplay() {
        const serverDisplay = document.getElementById('server-display');
        if (serverDisplay) {
            serverDisplay.textContent = `Current Server: Player ${currentServer}`;
        }
    }

    function startNewGame() {
        tiebreak = false;
        tiebreakPoints = 0;
        updateServerDisplay(); // Ensure server display is updated at the start
    }

    startNewGame()


    document.addEventListener('DOMContentLoaded', () => {
        const toggleServeBtn = document.getElementById('toggle-server-btn');
        if (toggleServeBtn) {
            toggleServeBtn.addEventListener('click', toggleServer);
        }
        updateServerDisplay(); // Initialize display on page load
    });
    // Set up event listener for the toggle server button
    // Set up event listener for the toggle server button
    document.getElementById('toggle-server-btn').addEventListener('click', toggleServer);

    // Initialize server display
    document.addEventListener('DOMContentLoaded', updateServerDisplay);


    function updateScore(player, action, side, outcome, direction) {
        if (overtime) {
            // Handle tiebreak logic
            if (player === '1') {
                player1Overtime++;
            } else {
                player2Overtime++;
            }

            toggleServer(); // Toggle server after every point in overtime

            // Check if any player wins in overtime (tiebreak)
            if (Math.abs(player1Overtime - player2Overtime) >= 2) {
                endGame(player);
            }
        } else {
            // Regular score update logic
            if (player === '1') {
                player1Score = nextScore(player1Score);
            } else {
                player2Score = nextScore(player2Score);
            }

            // Check if we need to start overtime (tiebreak)
            if (player1Score === 40 && player2Score === 40) {
                overtime = true;
                startTiebreak();
                toggleServer(); // Toggle server when overtime starts
            } else if (player1Score > 40 || player2Score > 40) {
                endGame(player); // End game if a player reaches the win condition
            }
        }

        // Update the score display
        document.getElementById('player1-score').textContent = player1Score >= 40 ? '40 (' + player1Overtime + ')' : player1Score;
        document.getElementById('player2-score').textContent = player2Score >= 40 ? '40 (' + player2Overtime + ')' : player2Score;
    }



    function nextScore(currentScore) {
        if (currentScore === 0) return 15;
        if (currentScore === 15) return 30;
        if (currentScore === 30) return 40;
        return currentScore + 10; // Handling 50+ scores
    }

    function startTiebreak() {
        tiebreak = true;
        tiebreakPoints = 0;
    }

    let player1GamesPerSet = [];
    let player2GamesPerSet = [];
    let combinedGamesPerSet = [];

    function endGame(winner) {
        if (winner === '1') {
            player1Games++;
            toggleServer();
        } else {
            player2Games++;
            toggleServer();
        }

        currentGame++;
        player1Score = 0;
        player2Score = 0;
        player1Overtime = 0;
        player2Overtime = 0;
        overtime = false;
        tiebreak = false; // Reset tiebreak flag
        tiebreakPoints = 0; // Reset tiebreak points




        if (player1Games >= 6 && player1Games - player2Games >= 2) {
            // Player 1 wins the set
            player1GamesPerSet.push(player1Games);
            player2GamesPerSet.push(player2Games);
            player1Sets++;
            currentSet++;
            tiebreak = false;
            player1Games = 0;
            player2Games = 0;
            currentGame = 0;
            combinedGamesPerSet = player1GamesPerSet.map((p1, index) => `${p1}:${player2GamesPerSet[index]}`); // Update combined games
            console.log(player1GamesPerSet)

            console.log(player2GamesPerSet)
            console.log(combinedGamesPerSet)


        } else if (player2Games >= 6 && player2Games - player1Games >= 2) {
            // Player 2 wins the set
            player1GamesPerSet.push(player1Games);
            player2GamesPerSet.push(player2Games);
            player2Sets++;
            currentSet++;
            tiebreak = false;
            player1Games = 0;
            player2Games = 0;
            currentGame = 0;
            combinedGamesPerSet = player1GamesPerSet.map((p1, index) => `${p1}:${player2GamesPerSet[index]}`); // Update combined games

        } else if (player1Games === 5 && player2Games === 5) {
            // Handle the case of 5-5, if this is the case you should decide to play a tiebreak
            tiebreak = true;
        } else if (player1Games === 6 && player2Games === 6 && tiebreak) {
            // Tiebreak set logic
            if (player1Games - player2Games >= 2) {
                player1GamesPerSet.push(player1Games);
                player2GamesPerSet.push(player2Games);
                player1Sets++;
                currentSet++;
                tiebreak = false;
                player1Games = 0;
                player2Games = 0;
                currentGame = 0;
                combinedGamesPerSet = player1GamesPerSet.map((p1, index) => `${p1}:${player2GamesPerSet[index]}`); // Update combined games

            } else if (player2Games - player1Games >= 2) {
                player1GamesPerSet.push(player1Games);
                player2GamesPerSet.push(player2Games);
                player2Sets++;
                currentSet++;
                tiebreak = false;
                player1Games = 0;
                player2Games = 0;
                currentGame = 0;
                combinedGamesPerSet = player1GamesPerSet.map((p1, index) => `${p1}:${player2GamesPerSet[index]}`); // Update combined games

            }
        }



        document.getElementById('set-counter').textContent = `${player1Sets}-${player2Sets}`;
        document.getElementById('current-game').textContent = currentGame;
        document.getElementById('player1-score').textContent = player1Score;
        document.getElementById('player2-score').textContent = player2Score;
        document.getElementById('game-counter').textContent = `${player1Games}-${player2Games}`;






        
        if (sets === 3) {   
            if (player1Sets === 2) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 1`;
                alert('Player 1 Won, Please Record Your Stats To The Database')

                
            } else if (player2Sets === 2) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 2`;
                alert('Player 2 Won, Please Record Your Stats To The Database')

            } else if (player1Sets === 3 && player2Sets === 1) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 1`;
                alert("Player 1 Won, Please Record Your Stats To The Database")

            } else if (player2Sets === 3 && player1Sets === 1) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 2`;
                alert('Player 2 Won, Please Record Your Stats To The Database')

            }

        }

        if (sets === 5) {
            if (player1Sets === 3) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 1`;
                alert('Player 1 Won, Please Record Your Stats To The Database')
            } else if (player2Sets === 3) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 2`;
                alert('Player 2 Won, Please Record Your Stats To The Database')

            } else if (player1sets === 5 && player2Sets === 2) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 1`;
                alert("Player 1 Won, Please Record Your Stats To The Database")
            } else if (player2Sets === 5 && player1Sets === 2) {
                finalSetScore = `[${player1Sets}:${player2Sets}]`;
                OverallMatchwinner = `Player 2`;
                alert('Player 2 Won, Please Record Your Stats To The Database')

            }

        }

    }



    //forehand rally
    let p1forehandrallyfadewinner = 0;
    let p1forehandrallyfadeunforcederror = 0;
    let p1forehandrallyfadeforcederror = 0

    let p1forehandrallydrawwinner = 0;
    let p1forehandrallydrawunforcederror = 0;
    let p1forehandrallydrawforcederror = 0

    let p1forehandrallyskipwinner = 0;
    let p1forehandrallyskipunforcederror = 0;
    let p1forehandrallyskipforcederror = 0


    //backhand rally
    let p1backhandrallyfadewinner = 0
    let p1backhandrallyfadeunforcederror = 0
    let p1backhandrallyfadeforcederror = 0

    let p1backhandrallydrawwinner = 0
    let p1backhandrallydrawunforcederror = 0
    let p1backhandrallydrawforcederror = 0

    let p1backhandrallyskipwinner = 0
    let p1backhandrallyskipunforcederror = 0
    let p1backhandrallyskipforcederror = 0



    //forehand mid ct attack 
    let p1forehandmidfadewinner = 0
    let p1forehandmidfadeunforcederror = 0
    let p1forehandmidfadeforcederror = 0

    let p1forehandmiddrawwinner = 0
    let p1forehandmiddrawunforcederror = 0
    let p1forehandmiddrawforcederror = 0

    let p1forehandmiddropwinner = 0
    let p1forehandmiddropunforcederror = 0
    let p1forehandmiddropforcederror = 0


    let p1forehandmidskipwinner = 0
    let p1forehandmidskipunforcederror = 0
    let p1forehandmidskipforcederror = 0


    //backhand mid ct attack
    let p1backhandmidfadewinner = 0
    let p1backhandmidfadeunforcederror = 0
    let p1backhandmidfadeforcederror = 0

    let p1backhandmiddrawwinner = 0
    let p1backhandmiddrawunforcederror = 0
    let p1backhandmiddrawforcederror = 0

    let p1backhandmiddropdrawwinner = 0
    let p1backhandmiddropdrawunforcederror = 0
    let p1backhandmiddropdrawforcederror = 0

    let p1backhandmiddropskipwinner = 0
    let p1backhandmiddropskipunforcederror = 0
    let p1backhandmiddropskipforcederror = 0


    let p1forehandfinishvolleywinner = 0
    let p1forehandfinishvolleyunforcederror = 0
    let p1forehandfinishvolleyforcederror = 0

    let p1forehandfinishoverheadwinner = 0
    let p1forehandfinishoverheadunforcederror = 0
    let p1forehandfinishoverheadforcederror = 0

    let p1forehandfinishdropshotwinner = 0
    let p1forehandfinishdropshotunforcederror = 0
    let p1forehandfinishdropshotforcederror = 0






    let p1backhandfinishvolleywinner = 0
    let p1backhandfinishvolleyunforcederror = 0
    let p1backhandfinishvolleyforcederror = 0

    let p1backhandfinishoverheadwinner = 0
    let p1backhandfinishoverheadunforcederror = 0
    let p1backhandfinishoverheadforcederror = 0

    let p1backhandfinishdropshotwinner = 0
    let p1backhandfinishdropshotunforcederror = 0
    let p1backhandfinishdropshotforcederror = 0






    //1st serve
    let p1firstserveace = 0
    let p1firstservewinner = 0

    let p1secondserveace = 0
    let p1secondservewinner = 0
    let p1secondservedf = 0






    //1st return
    let p1firstreturnfadewinner = 0
    let p1firstreturnfadeunforcederror = 0
    let p1firstreturnfadeforcederror = 0

    let p1firstreturndrawwinner = 0
    let p1firstreturndrawunforcederror = 0
    let p1firstreturndrawforcederror = 0

    let p1firstreturnskipwinner = 0
    let p1firstreturnskipunforcederror = 0
    let p1firstreturnskipforcederror = 0
    //2nd return
    let p1secondreturnfadewinner = 0
    let p1secondreturnfadeunforcederror = 0
    let p1secondreturnfadeforcederror = 0

    let p1secondreturndrawwinner = 0
    let p1secondreturndrawunforcederror = 0
    let p1secondreturndrawforcederror = 0

    let p1secondreturnskipwinner = 0
    let p1secondreturnskipunforcederror = 0
    let p1secondreturnskipforcederror = 0



    //forehand rally
    let p2forehandrallyfadewinner = 0;
    let p2forehandrallyfadeunforcederror = 0;
    let p2forehandrallyfadeforcederror = 0;

    let p2forehandrallydrawwinner = 0;
    let p2forehandrallydrawunforcederror = 0;
    let p2forehandrallydrawforcederror = 0;

    let p2forehandrallyskipwinner = 0;
    let p2forehandrallyskipunforcederror = 0;
    let p2forehandrallyskipforcederror = 0;


    //backhand rally
    let p2backhandrallyfadewinner = 0;
    let p2backhandrallyfadeunforcederror = 0;
    let p2backhandrallyfadeforcederror = 0;

    let p2backhandrallydrawwinner = 0;
    let p2backhandrallydrawunforcederror = 0;
    let p2backhandrallydrawforcederror = 0;

    let p2backhandrallyskipwinner = 0;
    let p2backhandrallyskipunforcederror = 0;
    let p2backhandrallyskipforcederror = 0;

    //forehand mid ct attack 
    let p2forehandmidfadewinner = 0;
    let p2forehandmidfadeunforcederror = 0;
    let p2forehandmidfadeforcederror = 0;

    let p2forehandmiddrawwinner = 0;
    let p2forehandmiddrawunforcederror = 0;
    let p2forehandmiddrawforcederror = 0;

    let p2forehandmiddropwinner = 0
    let p2forehandmiddropunforcederror = 0
    let p2forehandmiddropforcederror = 0

    let p2forehandmidskipwinner = 0
    let p2forehandmidskipunforcederror = 0
    let p2forehandmidskipforcederror = 0


    //backhand mid ct attack
    let p2backhandmidfadewinner = 0;
    let p2backhandmidfadeunforcederror = 0;
    let p2backhandmidfadeforcederror = 0;

    let p2backhandmiddrawwinner = 0;
    let p2backhandmiddrawunforcederror = 0;
    let p2backhandmiddrawforcederror = 0;


    let p2backhandmiddropdrawwinner = 0
    let p2backhandmiddropdrawunforcederror = 0
    let p2backhandmiddropdrawforcederror = 0

    let p2backhandmidskipdrawwinner = 0
    let p2backhandmidskipdrawunforcederror = 0
    let p2backhandmidskipdrawforcederror = 0



    let p2forehandfinishvolleywinner = 0
    let p2forehandfinishvolleyunforcederror = 0
    let p2forehandfinishvolleyforcederror = 0

    let p2forehandfinishoverheadwinner = 0
    let p2forehandfinishoverheadunforcederror = 0
    let p2forehandfinishoverheadforcederror = 0

    let p2forehandfinishdropshotwinner = 0
    let p2forehandfinishdropshotunforcederror = 0
    let p2forehandfinishdropshotforcederror = 0



    let p2backhandfinishvolleywinner = 0
    let p2backhandfinishvolleyunforcederror = 0
    let p2backhandfinishvolleyforcederror = 0

    let p2backhandfinishoverheadwinner = 0
    let p2backhandfinishoverheadunforcederror = 0
    let p2backhandfinishoverheadforcederror = 0

    let p2backhandfinishdropshotwinner = 0
    let p2backhandfinishdropshotunforcederror = 0
    let p2backhandfinishdropshotforcederror = 0

    //1st serve
    let p2firstserveace = 0
    let p2firstservewinner = 0

    let p2secondserveace = 0
    let p2secondservewinner = 0
    let p2secondservedf = 0






    //1st return
    let p2firstreturnfadewinner = 0;
    let p2firstreturnfadeunforcederror = 0;
    let p2firstreturnfadeforcederror = 0;

    let p2firstreturndrawwinner = 0;
    let p2firstreturndrawunforcederror = 0;
    let p2firstreturndrawforcederror = 0;

    let p2firstreturnskipwinner = 0;
    let p2firstreturnskipunforcederror = 0;
    let p2firstreturnskipforcederror = 0;


    //2nd return
    let p2secondreturnfadewinner = 0;
    let p2secondreturnfadeunforcederror = 0;
    let p2secondreturnfadeforcederror = 0;

    let p2secondreturndrawwinner = 0;
    let p2secondreturndrawunforcederror = 0;
    let p2secondreturndrawforcederror = 0;

    let p2secondreturnskipwinner = 0;
    let p2secondreturnskipunforcederror = 0;
    let p2secondreturnskipforcederror = 0;


    let lastProcessedIndex = 0;

    const matchTimelineButton = document.getElementById('match-timeline-btn');
    const matchTimeline = document.getElementById('matchTimeline');

    // Get the button element
    const player1databtn = document.getElementById('player-1-data');
    // Get the button element
    const player2databtn = document.getElementById('player-2-data');

    document.getElementById('game-stats-btn').addEventListener('click', () => {
        showStats();
        document.getElementById('match-screen').classList.remove('hidden');
        document.getElementById('player-1-data').classList.remove('hidden');
        document.getElementById('player-2-data').classList.remove('hidden');
        document.getElementById('match-timeline-btn').classList.remove('hidden');
        document.getElementById('back-to-match-btn').classList.remove('hidden');
        document.getElementById('game-stats').classList.remove('hidden');
        document.getElementById('game-stats-btn').classList.add('hidden');

        const matchScreenButtons = document.querySelectorAll('#match-screen button');
        
        // Disable each button
        matchScreenButtons.forEach(button => {
            button.disabled = true;
        });

    })


    

    const p1rally = document.getElementById('p1rally');
    const p1mid = document.getElementById('p1mid');
    const p1finish = document.getElementById('p1finish')
    const p1serve = document.getElementById('p1serve');
    const p1return = document.getElementById('p1return');

    const p2rally = document.getElementById('p2rally');
    const p2mid = document.getElementById('p2mid');
    const p2finish = document.getElementById('p2finish');
    const p2serve = document.getElementById('p2serve');
    const p2return = document.getElementById('p2return');

    const rally1Btn = document.getElementById('rally-data-1');
    const mid1Btn = document.getElementById('mid-data-1');
    const finish1Btn = document.getElementById('finish-data-1');
    const serve1Btn = document.getElementById('serve-data-1');
    const return1Btn = document.getElementById('return-data-1');


    const rally2Btn = document.getElementById('rally-data-2');
    const mid2Btn = document.getElementById('mid-data-2');
    const finish2Btn = document.getElementById('finish-data-2');
    const serve2Btn = document.getElementById('serve-data-2');
    const return2Btn = document.getElementById('return-data-2');

    function resetgameStats() {
        document.getElementById('stats-screen').classList.add('hidden')
        document.getElementById('p1rally').classList.add('hidden')
        document.getElementById('p1mid').classList.add('hidden')
        document.getElementById('p1finish').classList.add('hidden')
        document.getElementById('p1serve').classList.add('hidden')
        document.getElementById('p1return').classList.add('hidden')
        document.getElementById('p2rally').classList.add('hidden')
        document.getElementById('p2mid').classList.add('hidden')
        document.getElementById('p2finish').classList.add('hidden')
        document.getElementById('p2return').classList.add('hidden')
        document.getElementById('p2serve').classList.add('hidden')
        document.getElementById('p1').classList.add('hidden')
        document.getElementById('rally-data-1').classList.add('hidden')
        document.getElementById('mid-data-1').classList.add('hidden')
        document.getElementById('finish-data-1').classList.add('hidden')
        document.getElementById('serve-data-1').classList.add('hidden')
        document.getElementById('return-data-1').classList.add('hidden')
        document.getElementById('p2').classList.add('hidden')
        document.getElementById('rally-data-2').classList.add('hidden')
        document.getElementById('mid-data-2').classList.add('hidden')
        document.getElementById('finish-data-2').classList.add('hidden')
        document.getElementById('serve-data-2').classList.add('hidden')
        document.getElementById('return-data-2').classList.add('hidden')
        document.getElementById('matchTimeline').classList.add('hidden')
        document.getElementById('back-to-stats-btn').classList.add('hidden')


        document.getElementById('game-stats-btn').classList.remove('hidden')


        
        const matchScreenButtons = document.querySelectorAll('#match-screen button');
        
        // Disable each button
        matchScreenButtons.forEach(button => {
            button.disabled = false;
        });


    }

    document.getElementById('back-to-match-btn').addEventListener('click', () => {
        resetgameStats()

    });



    matchTimelineButton.addEventListener('click', () => {
        matchTimeline.classList.remove('hidden');
        document.getElementById('player-1-data').classList.add('hidden');
        document.getElementById('player-2-data').classList.add('hidden');
        document.getElementById('game-stats').classList.add('hidden');

        document.getElementById('match-timeline-btn').classList.add('hidden');
        document.getElementById('back-to-stats-btn').classList.remove('hidden');
        document.getElementById('back-to-match-btn').classList.add('hidden');


    });

    // Get the button element
    const backstatsButton = document.getElementById('back-to-stats-btn');

    // Get the stats element (assuming it's the parent element of the player stats)
    const statsElement = document.getElementById('stats'); // replace with the actual ID of the stats element


    // Add a click event listener to the back button
    backstatsButton.addEventListener('click', () => {
        // Hide the player stats element

        document.getElementById('player-1-data').classList.remove('hidden');
        document.getElementById('player-2-data').classList.remove('hidden');
        document.getElementById('game-stats').classList.remove('hidden');
        document.getElementById('back-to-match-btn').classList.remove('hidden');



        document.getElementById('match-timeline-btn').classList.remove('hidden');
        matchTimeline.classList.add('hidden');



        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');

        document.getElementById('p2').classList.add('hidden')
        document.getElementById('p1').classList.add('hidden')

        p1rally.classList.add('hidden')
        p1mid.classList.add('hidden')
        p1finish.classList.add('hidden')
        p1serve.classList.add('hidden')
        p1return.classList.add('hidden')


        p2rally.classList.add('hidden')
        p2mid.classList.add('hidden')
        p2finish.classList.add('hidden')

        p2serve.classList.add('hidden')
        p2return.classList.add('hidden')

        document.getElementById('back-to-stats-btn').classList.add('hidden');




        // Show the stats element
        statsElement.style.display = 'block';


    });




    // Add a click event listener to the button
    player2databtn.addEventListener('click', () => {
        document.getElementById('p2').classList.remove('hidden')
        document.getElementById('back-to-stats-btn').classList.remove('hidden');
        document.getElementById('match-timeline-btn').classList.add('hidden');


        // Toggle the hidden class on the player1 element
        // Hide the button
        document.getElementById('rally-data-2').classList.remove('hidden');
        document.getElementById('mid-data-2').classList.remove('hidden');
        document.getElementById('finish-data-2').classList.remove('hidden');
        document.getElementById('serve-data-2').classList.remove('hidden');
        document.getElementById('return-data-2').classList.remove('hidden');
        document.getElementById('player-2-data').classList.add('hidden');
        document.getElementById('player-1-data').classList.add('hidden');
        document.getElementById('back-to-match-btn').classList.add('hidden');
        document.getElementById('game-stats').classList.add('hidden');
    });


    // Add a click event listener to the button
    player1databtn.addEventListener('click', () => {

        document.getElementById('p1').classList.remove('hidden')
        document.getElementById('back-to-stats-btn').classList.remove('hidden');
        document.getElementById('match-timeline-btn').classList.add('hidden');


        // Toggle the hidden class on the player1 element
        // Hide the button
        document.getElementById('rally-data-1').classList.remove('hidden');
        document.getElementById('mid-data-1').classList.remove('hidden');
        document.getElementById('finish-data-1').classList.remove('hidden');
        document.getElementById('serve-data-1').classList.remove('hidden');
        document.getElementById('return-data-1').classList.remove('hidden');
        document.getElementById('player-2-data').classList.add('hidden');
        document.getElementById('player-1-data').classList.add('hidden');
        document.getElementById('back-to-match-btn').classList.add('hidden');
        document.getElementById('game-stats').classList.add('hidden');
    });






    rally1Btn.addEventListener('click', () => {
        p1rally.classList.remove('hidden')
        p1mid.classList.add('hidden')
        p1finish.classList.add('hidden')
        p1serve.classList.add('hidden')
        p1return.classList.add('hidden')
        document.getElementById('p1').classList.add('hidden');

        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden');



    })

    mid1Btn.addEventListener('click', () => {
        p1rally.classList.add('hidden')
        p1mid.classList.remove('hidden')
        p1finish.classList.add('hidden')
        p1serve.classList.add('hidden')
        p1return.classList.add('hidden')

        document.getElementById('p1').classList.add('hidden');

        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden');
    })

    finish1Btn.addEventListener('click', () => {
        p1rally.classList.add('hidden')
        p1mid.classList.add('hidden')
        p1finish.classList.remove('hidden')
        p1serve.classList.add('hidden')
        p1return.classList.add('hidden')

        document.getElementById('p1').classList.add('hidden');

        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden')
    })

    serve1Btn.addEventListener('click', () => {
        p1rally.classList.add('hidden')
        p1mid.classList.add('hidden')
        p1finish.classList.add('hidden')
        p1serve.classList.remove('hidden')
        p1return.classList.add('hidden')

        document.getElementById('p1').classList.add('hidden');

        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden')
    })


    return1Btn.addEventListener('click', () => {
        p1rally.classList.add('hidden')
        p1mid.classList.add('hidden')
        p1finish.classList.add('hidden')
        p1serve.classList.add('hidden')
        p1return.classList.remove('hidden')
        document.getElementById('p1').classList.add('hidden');

        document.getElementById('rally-data-1').classList.add('hidden');
        document.getElementById('mid-data-1').classList.add('hidden');
        document.getElementById('finish-data-1').classList.add('hidden');
        document.getElementById('serve-data-1').classList.add('hidden');
        document.getElementById('return-data-1').classList.add('hidden')
    })





    rally2Btn.addEventListener('click', () => {
        p2rally.classList.remove('hidden')
        p2mid.classList.add('hidden')
        p2finish.classList.add('hidden')
        p2serve.classList.add('hidden')
        p2return.classList.add('hidden')

        document.getElementById('p2').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');

    })

    mid2Btn.addEventListener('click', () => {
        p2rally.classList.add('hidden')
        p2mid.classList.remove('hidden')
        p2finish.classList.add('hidden')
        p2serve.classList.add('hidden')
        p2return.classList.add('hidden')

        document.getElementById('p2').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');
    })

    finish2Btn.addEventListener('click', () => {
        p2rally.classList.add('hidden')
        p2mid.classList.add('hidden')
        p2finish.classList.remove('hidden')
        p2serve.classList.add('hidden')
        p2return.classList.add('hidden')

        document.getElementById('p2').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');
    })

    serve2Btn.addEventListener('click', () => {
        p2rally.classList.add('hidden')
        p2mid.classList.add('hidden')
        p2finish.classList.add('hidden')
        p2serve.classList.remove('hidden')
        p2return.classList.add('hidden')

        document.getElementById('p2').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');
    })

    return2Btn.addEventListener('click', () => {
        p2rally.classList.add('hidden')
        p2mid.classList.add('hidden')
        p2finish.classList.add('hidden')
        p2serve.classList.add('hidden')
        p2return.classList.remove('hidden')

        document.getElementById('p2').classList.add('hidden');

        document.getElementById('rally-data-2').classList.add('hidden');
        document.getElementById('mid-data-2').classList.add('hidden');
        document.getElementById('finish-data-2').classList.add('hidden');
        document.getElementById('serve-data-2').classList.add('hidden');
        document.getElementById('return-data-2').classList.add('hidden');

        
    })


    


    function processTimeline() {
        const statstimeline = []; // Local timeline array
    
        // Populate the timeline array
        stats.forEach(stat => {
            const timestamp = stat.timestamp;
            const message = `
                Player ${stat.player} ${stat.action ? `${stat.action}` : ''} 
                ${stat.direction ? `${stat.direction}` : ''} ${stat.side ? `${stat.side}` : ''} 
                ${stat.outcome ? `${stat.outcome}` : ''} ${stat.type ? `${stat.type}` : ''}
            `.trim();
    
            statstimeline.push({ timestamp, message });
        });
    
        return statstimeline; // Return the processed timeline
    }

    function showStats() {

        //forehand rally
        document.getElementById('p1-forehand-rally-fade-winner').textContent = p1forehandrallyfadewinner;
        document.getElementById('p1-forehand-rally-fade-unforced-error').textContent = p1forehandrallyfadeunforcederror;
        document.getElementById('p1-forehand-rally-fade-forced-error').textContent = p1forehandrallyfadeforcederror

        document.getElementById('p1-forehand-rally-draw-winner').textContent = p1forehandrallydrawwinner
        document.getElementById('p1-forehand-rally-draw-unforced-error').textContent = p1forehandrallydrawunforcederror
        document.getElementById('p1-forehand-rally-draw-forced-error').textContent = p1forehandrallydrawforcederror


        document.getElementById('p1-forehand-rally-skip-winner').textContent = p1forehandrallyskipwinner
        document.getElementById('p1-forehand-rally-skip-unforced-error').textContent = p1forehandrallyskipunforcederror
        document.getElementById('p1-forehand-rally-skip-forced-error').textContent = p1forehandrallyskipforcederror




        //backhand rally

        document.getElementById('p1-backhand-rally-fade-winner').textContent = p1backhandrallyfadewinner;
        document.getElementById('p1-backhand-rally-fade-unforced-error').textContent = p1backhandrallyfadeunforcederror;
        document.getElementById('p1-backhand-rally-fade-forced-error').textContent = p1backhandrallyfadeforcederror

        document.getElementById('p1-backhand-rally-draw-winner').textContent = p1backhandrallydrawwinner
        document.getElementById('p1-backhand-rally-draw-unforced-error').textContent = p1backhandrallydrawunforcederror
        document.getElementById('p1-backhand-rally-draw-forced-error').textContent = p1backhandrallydrawforcederror

        document.getElementById('p1-backhand-rally-skip-winner').textContent = p1backhandrallyskipwinner
        document.getElementById('p1-backhand-rally-skip-unforced-error').textContent = p1backhandrallyskipunforcederror
        document.getElementById('p1-backhand-rally-skip-forced-error').textContent = p1backhandrallyskipforcederror





        //forehand mid
        document.getElementById('p1-forehand-mid-ct-fade-winner').textContent = p1forehandmidfadewinner
        document.getElementById('p1-forehand-mid-ct-fade-unforced-error').textContent = p1forehandmidfadeunforcederror
        document.getElementById('p1-forehand-mid-ct-fade-forced-error').textContent = p1forehandmidfadeforcederror

        document.getElementById('p1-forehand-mid-ct-draw-winner').textContent = p1forehandmiddrawwinner
        document.getElementById('p1-forehand-mid-ct-draw-unforced-error').textContent = p1forehandmiddrawunforcederror
        document.getElementById('p1-forehand-mid-ct-draw-forced-error').textContent = p1forehandmiddrawforcederror



        document.getElementById('p1-forehand-mid-ct-drop-winner').textContent = p1forehandmiddropwinner
        document.getElementById('p1-forehand-mid-ct-drop-unforced-error').textContent = p1forehandmiddropunforcederror
        document.getElementById('p1-forehand-mid-ct-drop-forced-error').textContent = p1forehandmiddropforcederror

        document.getElementById('p1-forehand-mid-ct-skip-winner').textContent = p1forehandmidskipwinner
        document.getElementById('p1-forehand-mid-ct-skip-unforced-error').textContent = p1forehandmidskipunforcederror
        document.getElementById('p1-forehand-mid-ct-skip-forced-error').textContent = p1forehandmidskipforcederror




        document.getElementById('p1-backhand-mid-ct-fade-winner').textContent = p1backhandmidfadewinner
        document.getElementById('p1-backhand-mid-ct-fade-unforced-error').textContent = p1backhandmidfadeunforcederror
        document.getElementById('p1-backhand-mid-ct-fade-forced-error').textContent = p1backhandmidfadeforcederror

        document.getElementById('p1-backhand-mid-ct-draw-winner').textContent = p1backhandmiddrawwinner
        document.getElementById('p1-backhand-mid-ct-draw-unforced-error').textContent = p1backhandmiddrawunforcederror
        document.getElementById('p1-backhand-mid-ct-draw-forced-error').textContent = p1backhandmiddrawforcederror



        document.getElementById('p1-backhand-mid-ct-drop-winner').textContent = p1backhandmiddropdrawwinner
        document.getElementById('p1-backhand-mid-ct-drop-unforced-error').textContent = p1backhandmiddropdrawunforcederror
        document.getElementById('p1-backhand-mid-ct-drop-forced-error').textContent = p1backhandmiddropdrawforcederror

        document.getElementById('p1-backhand-mid-ct-skip-winner').textContent = p1backhandmiddropskipwinner
        document.getElementById('p1-backhand-mid-ct-skip-unforced-error').textContent = p1backhandmiddropskipunforcederror
        document.getElementById('p1-backhand-mid-ct-skip-forced-error').textContent = p1backhandmiddropskipforcederror




        document.getElementById('p1-forehand-finish-volley-winner').textContent = p1forehandfinishvolleywinner
        document.getElementById('p1-forehand-finish-volley-unforced-error').textContent = p1forehandfinishvolleyunforcederror
        document.getElementById('p1-forehand-finish-volley-forced-error').textContent = p1forehandfinishvolleyforcederror


        document.getElementById('p1-forehand-finish-overhead-winner').textContent = p1forehandfinishoverheadwinner
        document.getElementById('p1-forehand-finish-overhead-unforced-error').textContent = p1forehandfinishoverheadunforcederror
        document.getElementById('p1-forehand-finish-overhead-forced-error').textContent = p1forehandfinishoverheadforcederror


        document.getElementById('p1-forehand-finish-dropshot-winner').textContent = p1forehandfinishdropshotwinner
        document.getElementById('p1-forehand-finish-dropshot-unforced-error').textContent = p1forehandfinishdropshotunforcederror
        document.getElementById('p1-forehand-finish-dropshot-forced-error').textContent = p1forehandfinishdropshotforcederror


        document.getElementById('p1-backhand-finish-volley-winner').textContent = p1backhandfinishvolleywinner
        document.getElementById('p1-backhand-finish-volley-unforced-error').textContent = p1backhandfinishvolleyunforcederror
        document.getElementById('p1-backhand-finish-volley-forced-error').textContent = p1backhandfinishvolleyforcederror


        document.getElementById('p1-backhand-finish-overhead-winner').textContent = p1backhandfinishoverheadwinner
        document.getElementById('p1-backhand-finish-overhead-unforced-error').textContent = p1backhandfinishoverheadunforcederror
        document.getElementById('p1-backhand-finish-overhead-forced-error').textContent = p1backhandfinishoverheadforcederror


        document.getElementById('p1-backhand-finish-dropshot-winner').textContent = p1backhandfinishdropshotwinner
        document.getElementById('p1-backhand-finish-dropshot-unforced-error').textContent = p1backhandfinishdropshotunforcederror
        document.getElementById('p1-backhand-finish-dropshot-forced-error').textContent = p1backhandfinishdropshotforcederror










        //1st serve
        document.getElementById('p1-first-serve-ace').textContent = p1firstserveace
        document.getElementById('p1-first-serve-winner').textContent = p1firstservewinner




        //2nd serve
        document.getElementById('p1-second-serve-ace').textContent = p1secondserveace
        document.getElementById('p1-second-serve-winner').textContent = p1secondservewinner
        document.getElementById('p1-second-serve-df').textContent = p1secondservedf







        //1st return
        document.getElementById('p1-first-return-fade-winner').textContent = p1firstreturnfadewinner
        document.getElementById('p1-first-return-fade-unforced-error').textContent = p1firstreturnfadeunforcederror
        document.getElementById('p1-first-reture-fade-forced-error').textContent = p1firstreturnfadeforcederror

        document.getElementById('p1-first-return-draw-winner').textContent = p1firstreturndrawwinner
        document.getElementById('p1-first-return-draw-unforced-error').textContent = p1firstreturndrawunforcederror
        document.getElementById('p1-first-reture-draw-forced-error').textContent = p1firstreturndrawforcederror

        document.getElementById('p1-first-return-skip-winner').textContent = p1firstreturnskipwinner
        document.getElementById('p1-first-return-skip-unforced-error').textContent = p1firstreturnskipunforcederror
        document.getElementById('p1-first-reture-skip-forced-error').textContent = p1firstreturnskipforcederror


        //2nd return
        document.getElementById('p1-second-return-fade-winner').textContent = p1secondreturnfadewinner
        document.getElementById('p1-second-return-fade-unforced-error').textContent = p1secondreturnfadeunforcederror
        document.getElementById('p1-second-return-fade-forced-error').textContent = p1secondreturnfadeforcederror

        document.getElementById('p1-second-return-draw-winner').textContent = p1secondreturndrawwinner
        document.getElementById('p1-second-return-draw-unforced-error').textContent = p1secondreturndrawunforcederror
        document.getElementById('p1-second-return-draw-forced-error').textContent = p1secondreturndrawforcederror

        document.getElementById('p1-second-return-skip-winner').textContent = p1secondreturnskipwinner
        document.getElementById('p1-second-return-skip-unforced-error').textContent = p1secondreturnskipunforcederror
        document.getElementById('p1-second-return-skip-forced-error').textContent = p1secondreturnskipforcederror




        document.getElementById('p2-forehand-rally-fade-winner').textContent = p2forehandrallyfadewinner;
        document.getElementById('p2-forehand-rally-fade-unforced-error').textContent = p2forehandrallyfadeunforcederror;
        document.getElementById('p2-forehand-rally-fade-forced-error').textContent = p2forehandrallyfadeforcederror;

        document.getElementById('p2-forehand-rally-draw-winner').textContent = p2forehandrallydrawwinner;
        document.getElementById('p2-forehand-rally-draw-unforced-error').textContent = p2forehandrallydrawunforcederror;
        document.getElementById('p2-forehand-rally-draw-forced-error').textContent = p2forehandrallydrawforcederror;

        document.getElementById('p2-forehand-rally-skip-winner').textContent = p2forehandrallyskipwinner;
        document.getElementById('p2-forehand-rally-skip-unforced-error').textContent = p2forehandrallyskipunforcederror;
        document.getElementById('p2-forehand-rally-skip-forced-error').textContent = p2forehandrallyskipforcederror;




        //backhand rally
        document.getElementById('p2-backhand-rally-fade-winner').textContent = p2backhandrallyfadewinner;
        document.getElementById('p2-backhand-rally-fade-unforced-error').textContent = p2backhandrallyfadeunforcederror;
        document.getElementById('p2-backhand-rally-fade-forced-error').textContent = p2backhandrallyfadeforcederror;

        document.getElementById('p2-backhand-rally-draw-winner').textContent = p2backhandrallydrawwinner;
        document.getElementById('p2-backhand-rally-draw-unforced-error').textContent = p2backhandrallydrawunforcederror;
        document.getElementById('p2-backhand-rally-draw-forced-error').textContent = p2backhandrallydrawforcederror;

        document.getElementById('p2-backhand-rally-skip-winner').textContent = p2backhandrallyskipwinner;
        document.getElementById('p2-backhand-rally-skip-unforced-error').textContent = p2backhandrallyskipunforcederror;
        document.getElementById('p2-backhand-rally-skip-forced-error').textContent = p2backhandrallyskipforcederror;




        //forehand mid
        document.getElementById('p2-forehand-mid-ct-fade-winner').textContent = p2forehandmidfadewinner;
        document.getElementById('p2-forehand-mid-ct-fade-unforced-error').textContent = p2forehandmidfadeunforcederror;
        document.getElementById('p2-forehand-mid-ct-fade-forced-error').textContent = p2forehandmidfadeforcederror;

        document.getElementById('p2-forehand-mid-ct-draw-winner').textContent = p2forehandmiddrawwinner;
        document.getElementById('p2-forehand-mid-ct-draw-unforced-error').textContent = p2forehandmiddrawunforcederror;
        document.getElementById('p2-forehand-mid-ct-draw-forced-error').textContent = p2forehandmiddrawforcederror;



        document.getElementById('p2-forehand-mid-ct-drop-winner').textContent = p2forehandmiddropwinner
        document.getElementById('p2-forehand-mid-ct-drop-unforced-error').textContent = p2forehandmiddropunforcederror
        document.getElementById('p2-forehand-mid-ct-drop-forced-error').textContent = p2forehandmiddropforcederror


        document.getElementById('p2-forehand-mid-ct-skip-winner').textContent = p2forehandmidskipwinner
        document.getElementById('p2-forehand-mid-ct-skip-unforced-error').textContent = p2forehandmidskipunforcederror
        document.getElementById('p2-forehand-mid-ct-skip-forced-error').textContent = p2forehandmidskipforcederror



        document.getElementById('p2-backhand-mid-ct-fade-winner').textContent = p2backhandmidfadewinner;
        document.getElementById('p2-backhand-mid-ct-fade-unforced-error').textContent = p2backhandmidfadeunforcederror;
        document.getElementById('p2-backhand-mid-ct-fade-forced-error').textContent = p2backhandmidfadeforcederror;

        document.getElementById('p2-backhand-mid-ct-draw-winner').textContent = p2backhandmiddrawwinner;
        document.getElementById('p2-backhand-mid-ct-draw-unforced-error').textContent = p2backhandmiddrawunforcederror;
        document.getElementById('p2-backhand-mid-ct-draw-forced-error').textContent = p2backhandmiddrawforcederror;


        document.getElementById('p2-backhand-mid-ct-drop-winner').textContent = p2backhandmiddropdrawwinner
        document.getElementById('p2-backhand-mid-ct-drop-unforced-error').textContent = p2backhandmiddropdrawunforcederror
        document.getElementById('p2-backhand-mid-ct-drop-forced-error').textContent = p2backhandmiddropdrawforcederror


        document.getElementById('p2-backhand-mid-ct-skip-winner').textContent = p2backhandmidskipdrawwinner
        document.getElementById('p2-backhand-mid-ct-skip-unforced-error').textContent = p2backhandmidskipdrawunforcederror
        document.getElementById('p2-backhand-mid-ct-skip-forced-error').textContent = p2backhandmidskipdrawforcederror




        document.getElementById('p2-forehand-finish-volley-winner').textContent = p2forehandfinishvolleywinner
        document.getElementById('p2-forehand-finish-volley-unforced-error').textContent = p2forehandfinishvolleyunforcederror
        document.getElementById('p2-forehand-finish-volley-forced-error').textContent = p2forehandfinishvolleyforcederror


        document.getElementById('p2-forehand-finish-overhead-winner').textContent = p2forehandfinishoverheadwinner
        document.getElementById('p2-forehand-finish-overhead-unforced-error').textContent = p2forehandfinishoverheadunforcederror
        document.getElementById('p2-forehand-finish-overhead-forced-error').textContent = p2forehandfinishoverheadforcederror


        document.getElementById('p2-forehand-finish-dropshot-winner').textContent = p2forehandfinishdropshotwinner
        document.getElementById('p2-forehand-finish-dropshot-unforced-error').textContent = p2forehandfinishdropshotunforcederror
        document.getElementById('p2-forehand-finish-dropshot-forced-error').textContent = p2forehandfinishdropshotforcederror


        document.getElementById('p2-backhand-finish-volley-winner').textContent = p2backhandfinishvolleywinner
        document.getElementById('p2-backhand-finish-volley-unforced-error').textContent = p2backhandfinishvolleyunforcederror
        document.getElementById('p2-backhand-finish-volley-forced-error').textContent = p2backhandfinishvolleyforcederror


        document.getElementById('p2-backhand-finish-overhead-winner').textContent = p2backhandfinishoverheadwinner
        document.getElementById('p2-backhand-finish-overhead-unforced-error').textContent = p2backhandfinishoverheadunforcederror
        document.getElementById('p2-backhand-finish-overhead-forced-error').textContent = p2backhandfinishoverheadforcederror


        document.getElementById('p2-backhand-finish-dropshot-winner').textContent = p2backhandfinishdropshotwinner
        document.getElementById('p2-backhand-finish-dropshot-unforced-error').textContent = p2backhandfinishdropshotunforcederror
        document.getElementById('p2-backhand-finish-dropshot-forced-error').textContent = p2backhandfinishdropshotforcederror

        //1st serve
        document.getElementById('p2-first-serve-ace').textContent = p2firstserveace
        document.getElementById('p2-first-serve-winner').textContent = p2firstservewinner




        //2nd serve
        document.getElementById('p2-second-serve-ace').textContent = p2secondserveace
        document.getElementById('p2-second-serve-winner').textContent = p2secondservewinner
        document.getElementById('p2-second-serve-df').textContent = p2secondservedf






        //1st return
        document.getElementById('p2-first-return-fade-winner').textContent = p2firstreturnfadewinner;
        document.getElementById('p2-first-return-fade-unforced-error').textContent = p2firstreturnfadeunforcederror;
        document.getElementById('p2-first-return-fade-forced-error').textContent = p2firstreturnfadeforcederror;

        document.getElementById('p2-first-return-draw-winner').textContent = p2firstreturndrawwinner;
        document.getElementById('p2-first-return-draw-unforced-error').textContent = p2firstreturndrawunforcederror;
        document.getElementById('p2-first-return-draw-forced-error').textContent = p2firstreturndrawforcederror;

        document.getElementById('p2-first-return-skip-winner').textContent = p2firstreturnskipwinner;
        document.getElementById('p2-first-return-skip-unforced-error').textContent = p2firstreturnskipunforcederror;
        document.getElementById('p2-first-return-skip-forced-error').textContent = p2firstreturnskipforcederror;


        //2nd return
        document.getElementById('p2-second-return-fade-winner').textContent = p2secondreturnfadewinner;
        document.getElementById('p2-second-return-fade-unforced-error').textContent = p2secondreturnfadeunforcederror;
        document.getElementById('p2-second-return-fade-forced-error').textContent = p2secondreturnfadeforcederror;

        document.getElementById('p2-second-return-draw-winner').textContent = p2secondreturndrawwinner;
        document.getElementById('p2-second-return-draw-unforced-error').textContent = p2secondreturndrawunforcederror;
        document.getElementById('p2-second-return-draw-forced-error').textContent = p2secondreturndrawforcederror;

        document.getElementById('p2-second-return-skip-winner').textContent = p2secondreturnskipwinner;
        document.getElementById('p2-second-return-skip-unforced-error').textContent = p2secondreturnskipunforcederror;
        document.getElementById('p2-second-return-skip-forced-error').textContent = p2secondreturnskipforcederror;




        document.getElementById('match-screen').classList.add('hidden');
        document.getElementById('stats-screen').classList.remove('hidden');
        // Get the stats list element
        const statsList = document.getElementById('stats-list');
        statsList.innerHTML = ''; // Clear the list

        stats.forEach(stat => {
            const listItem = document.createElement('li');
            const timestamp = stat.timestamp; // Get the timestamp from the stat object
            const message = `
                Player ${stat.player} ${stat.action ? `${stat.action}` : ''} ${stat.direction ? `${stat.direction}` : ''} 
                ${stat.side ? `${stat.side}` : ''} ${stat.outcome ? `${stat.outcome}` : ''} ${stat.type ? `${stat.type}` : ''}
            `.trim();
        

            listItem.innerHTML = `
                <span class="timestamp">${timestamp}</span>
                <div class="message">${message}</div>
            `;
            statsList.appendChild(listItem);
        });



        for (let i = lastProcessedIndex; i < stats.length; i++) {
            const stat = stats[i];
            if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandrallyfadewinner += 1;
                document.getElementById('p1-forehand-rally-fade-winner').textContent = p1forehandrallyfadewinner;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandrallyfadeunforcederror += 1;
                document.getElementById('p1-forehand-rally-fade-unforced-error').textContent = p1forehandrallyfadeunforcederror;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandrallyfadeforcederror += 1;
                document.getElementById('p1-forehand-rally-fade-forced-error').textContent = p1forehandrallyfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandrallydrawwinner += 1;
                document.getElementById('p1-forehand-rally-draw-winner').textContent = p1forehandrallydrawwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandrallydrawunforcederror += 1;
                document.getElementById('p1-forehand-rally-draw-unforced-error').textContent = p1forehandrallydrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandrallydrawforcederror += 1;
                document.getElementById('p1-forehand-rally-draw-forced-error').textContent = p1forehandrallydrawforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandrallyskipwinner += 1;
                document.getElementById('p1-forehand-rally-skip-winner').textContent = p1forehandrallyskipwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandrallyskipunforcederror += 1;
                document.getElementById('p1-forehand-rally-skip-unforced-error').textContent = p1forehandrallyskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandrallyskipforcederror += 1;
                document.getElementById('p1-forehand-rally-skip-forced-error').textContent = p1forehandrallyskipforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandrallyfadewinner += 1;
                document.getElementById('p1-backhand-rally-fade-winner').textContent = p1backhandrallyfadewinner;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandrallyfadeunforcederror += 1;
                document.getElementById('p1-backhand-rally-fade-unforced-error').textContent = p1backhandrallyfadeunforcederror;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandrallyfadeforcederror += 1;
                document.getElementById('p1-backhand-rally-fade-forced-error').textContent = p1backhandrallyfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandrallydrawwinner += 1;
                document.getElementById('p1-backhand-rally-draw-winner').textContent = p1backhandrallydrawwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandrallydrawunforcederror += 1;
                document.getElementById('p1-backhand-rally-draw-unforced-error').textContent = p1backhandrallydrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandrallydrawforcederror += 1;
                document.getElementById('p1-backhand-rally-draw-forced-error').textContent = p1backhandrallydrawforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandrallyskipwinner += 1;
                document.getElementById('p1-backhand-rally-skip-winner').textContent = p1backhandrallyskipwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandrallyskipunforcederror += 1;
                document.getElementById('p1-backhand-rally-skip-unforced-error').textContent = p1backhandrallyskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandrallyskipforcederror += 1;
                document.getElementById('p1-backhand-rally-skip-forced-error').textContent = p1backhandrallyskipforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmidfadewinner += 1;
                document.getElementById('p1-forehand-mid-ct-fade-winner').textContent = p1forehandmidfadewinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmidfadeunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-fade-unforced-error').textContent = p1forehandmidfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmidfadeforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-fade-forced-error').textContent = p1forehandmidfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmiddrawwinner += 1;
                document.getElementById('p1-forehand-mid-ct-draw-winner').textContent = p1forehandmiddrawwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmiddrawunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-draw-unforced-error').textContent = p1forehandmiddrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmiddrawforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-draw-forced-error').textContent = p1forehandmiddrawforcederror



            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmiddropwinner += 1;
                document.getElementById('p1-forehand-mid-ct-drop-winner').textContent = p1forehandmiddropwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmiddropunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-drop-unforced-error').textContent = p1forehandmiddropunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmiddropforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-drop-forced-error').textContent = p1forehandmiddropforcederror

            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmidskipwinner += 1;
                document.getElementById('p1-forehand-mid-ct-skip-winner').textContent = p1forehandmidskipwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmidskipunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-skip-unforced-error').textContent = p1forehandmidskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmidskipforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-skip-forced-error').textContent = p1forehandmidskipforcederror





            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmidfadewinner += 1;
                document.getElementById('p1-backhand-mid-ct-fade-winner').textContent = p1backhandmidfadewinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmidfadeunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-fade-unforced-error').textContent = p1backhandmidfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmidfadeforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-fade-forced-error').textContent = p1backhandmidfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmiddrawwinner += 1;
                document.getElementById('p1-backhand-mid-ct-draw-winner').textContent = p1backhandmiddrawwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmiddrawunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-draw-unforced-error').textContent = p1backhandmiddrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmiddrawforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-draw-forced-error').textContent = p1backhandmiddrawforcederror


            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmiddropdrawwinner += 1;
                document.getElementById('p1-backhand-mid-ct-drop-winner').textContent = p1backhandmiddropdrawwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmiddropdrawunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-drop-unforced-error').textContent = p1backhandmiddropdrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmiddropdrawforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-drop-forced-error').textContent = p1backhandmiddropdrawforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmiddropskipwinner += 1;
                document.getElementById('p1-backhand-mid-ct-skip-winner').textContent = p1backhandmiddropskipwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmiddropskipunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-skip-unforced-error').textContent = p1backhandmiddropskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmiddropskipforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-skip-forced-error').textContent = p1backhandmiddropskipforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandfinishvolleywinner += 1;
                document.getElementById('p1-forehand-finish-volley-winner').textContent = p1forehandfinishvolleywinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandfinishvolleyunforcederror += 1;
                document.getElementById('p1-forehand-finish-volley-unforced-error').textContent = p1forehandfinishvolleyunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandfinishvolleyforcederror += 1;
                document.getElementById('p1-forehand-finish-volley-forced-error').textContent = p1forehandfinishvolleyforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandfinishoverheadwinner += 1;
                document.getElementById('p1-forehand-finish-overhead-winner').textContent = p1forehandfinishoverheadwinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandfinishoverheadunforcederror += 1;
                document.getElementById('p1-forehand-finish-overhead-unforced-error').textContent = p1forehandfinishoverheadunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandfinishoverheadforcederror += 1;
                document.getElementById('p1-forehand-finish-overhead-forced-error').textContent = p1forehandfinishoverheadforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandfinishdropshotwinner += 1;
                document.getElementById('p1-forehand-finish-dropshot-winner').textContent = p1forehandfinishdropshotwinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandfinishdropshotunforcederror += 1;
                document.getElementById('p1-forehand-finish-dropshot-unforced-error').textContent = p1forehandfinishdropshotunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandfinishdropshotforcederror += 1;
                document.getElementById('p1-forehand-finish-dropshot-forced-error').textContent = p1forehandfinishdropshotforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandfinishvolleywinner += 1;
                document.getElementById('p1-backhand-finish-volley-winner').textContent = p1backhandfinishvolleywinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandfinishvolleyunforcederror += 1;
                document.getElementById('p1-backhand-finish-volley-unforced-error').textContent = p1backhandfinishvolleyunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandfinishvolleyforcederror += 1;
                document.getElementById('p1-backhand-finish-volley-forced-error').textContent = p1backhandfinishvolleyforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandfinishoverheadwinner += 1;
                document.getElementById('p1-backhand-finish-overhead-winner').textContent = p1backhandfinishoverheadwinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandfinishoverheadunforcederror += 1;
                document.getElementById('p1-backhand-finish-overhead-unforced-error').textContent = p1backhandfinishoverheadunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandfinishoverheadforcederror += 1;
                document.getElementById('p1-backhand-finish-overhead-forced-error').textContent = p1backhandfinishoverheadforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandfinishdropshotwinner += 1;
                document.getElementById('p1-backhand-finish-dropshot-winner').textContent = p1backhandfinishdropshotwinner
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandfinishdropshotunforcederror += 1;
                document.getElementById('p1-backhand-finish-dropshot-unforced-error').textContent = p1backhandfinishdropshotunforcederror
            } else if (stat.player === "1" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandfinishdropshotforcederror += 1;
                document.getElementById('p1-backhand-finish-dropshot-forced-error').textContent = p1backhandfinishdropshotforcederror
            } else if (stat.player === "1" && stat.action === 'Served' && stat.side === 'On First Serve Resulting In' && stat.type === 'An Ace') {
                p1firstserveace += 1;
                document.getElementById('p1-first-serve-ace').textContent = p1firstserveace
            } else if (stat.player === "1" && stat.action === 'Served' && stat.side === 'On First Serve Resulting In' && stat.type === 'A Winner') {
                p1firstservewinner += 1;
                document.getElementById('p1-first-serve-winner').textContent = p1firstservewinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'An Ace') {
                p1secondserveace += 1;
                document.getElementById('p1-second-serve-ace').textContent = p1secondserveace
            } else if (stat.player === "1" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'A Winner') {
                p1secondservewinner += 1;
                document.getElementById('p1-second-serve-winner').textContent = p1secondservewinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'A Double Fault') {
                p1secondservedf += 1;
                document.getElementById('p1-second-serve-df').textContent = p1secondservedf








            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstreturnfadewinner += 1;
                document.getElementById('p1-first-return-fade-winner').textContent = p1firstreturnfadewinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstreturnfadeunforcederror += 1;
                document.getElementById('p1-first-return-fade-unforced-error').textContent = p1firstreturnfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstreturnfadeforcederror += 1;
                document.getElementById('p1-first-reture-fade-forced-error').textContent = p1firstreturnfadeforcederror



            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstreturndrawwinner += 1;
                document.getElementById('p1-first-return-draw-winner').textContent = p1firstreturndrawwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstreturndrawunforcederror += 1;
                document.getElementById('p1-first-return-draw-unforced-error').textContent = p1firstreturndrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstreturndrawforcederror += 1;
                document.getElementById('p1-first-reture-draw-forced-error').textContent = p1firstreturndrawforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstreturnskipwinner += 1;
                document.getElementById('p1-first-return-skip-winner').textContent = p1firstreturnskipwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstreturnskipunforcederror += 1;
                document.getElementById('p1-first-return-skip-unforced-error').textContent = p1firstreturnskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstreturnskipforcederror += 1;
                document.getElementById('p1-first-reture-skip-forced-error').textContent = p1firstreturnskipforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondreturnfadewinner += 1;
                document.getElementById('p1-second-return-fade-winner').textContent = p1secondreturnfadewinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondreturnfadeunforcederror += 1;
                document.getElementById('p1-second-return-fade-unforced-error').textContent = p1secondreturnfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondreturnfadeforcederror += 1;
                document.getElementById('p1-second-return-fade-forced-error').textContent = p1secondreturnfadeforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondreturndrawwinner += 1;
                document.getElementById('p1-second-return-draw-winner').textContent = p1secondreturndrawwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondreturndrawunforcederror += 1;
                document.getElementById('p1-second-return-draw-unforced-error').textContent = p1secondreturndrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondreturndrawforcederror += 1;
                document.getElementById('p1-second-return-draw-forced-error').textContent = p1secondreturndrawforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondreturnskipwinner += 1;
                document.getElementById('p1-second-return-skip-winner').textContent = p1secondreturnskipwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondreturnskipunforcederror += 1;
                document.getElementById('p1-second-return-skip-unforced-error').textContent = p1secondreturnskipunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondreturnskipforcederror += 1;
                document.getElementById('p1-second-return-skip-forced-error').textContent = p1secondreturnskipforcederror
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandrallyfadewinner += 1;
                document.getElementById('p2-forehand-rally-fade-winner').textContent = p2forehandrallyfadewinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandrallyfadeunforcederror += 1;
                document.getElementById('p2-forehand-rally-fade-unforced-error').textContent = p2forehandrallyfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandrallyfadeforcederror += 1;
                document.getElementById('p2-forehand-rally-fade-forced-error').textContent = p2forehandrallyfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandrallydrawwinner += 1;
                document.getElementById('p2-forehand-rally-draw-winner').textContent = p2forehandrallydrawwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandrallydrawunforcederror += 1;
                document.getElementById('p2-forehand-rally-draw-unforced-error').textContent = p2forehandrallydrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandrallydrawforcederror += 1;
                document.getElementById('p2-forehand-rally-draw-forced-error').textContent = p2forehandrallydrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandrallyskipwinner += 1;
                document.getElementById('p2-forehand-rally-skip-winner').textContent = p2forehandrallyskipwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandrallyskipunforcederror += 1;
                document.getElementById('p2-forehand-rally-skip-unforced-error').textContent = p2forehandrallyskipunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandrallyskipforcederror += 1;
                document.getElementById('p2-forehand-rally-skip-forced-error').textContent = p2forehandrallyskipforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandrallyfadewinner += 1;
                document.getElementById('p2-backhand-rally-fade-winner').textContent = p2backhandrallyfadewinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandrallyfadeunforcederror += 1;
                document.getElementById('p2-backhand-rally-fade-unforced-error').textContent = p2backhandrallyfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandrallyfadeforcederror += 1;
                document.getElementById('p2-backhand-rally-fade-forced-error').textContent = p2backhandrallyfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandrallydrawwinner += 1;
                document.getElementById('p2-backhand-rally-draw-winner').textContent = p2backhandrallydrawwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandrallydrawunforcederror += 1;
                document.getElementById('p2-backhand-rally-draw-unforced-error').textContent = p2backhandrallydrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandrallydrawforcederror += 1;
                document.getElementById('p2-backhand-rally-draw-forced-error').textContent = p2backhandrallydrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandrallyskipwinner += 1;
                document.getElementById('p2-backhand-rally-skip-winner').textContent = p2backhandrallyskipwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandrallyskipunforcederror += 1;
                document.getElementById('p2-backhand-rally-skip-unforced-error').textContent = p2backhandrallyskipunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandrallyskipforcederror += 1;
                document.getElementById('p2-backhand-rally-skip-forced-error').textContent = p2backhandrallyskipforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmidfadewinner += 1;
                document.getElementById('p2-forehand-mid-ct-fade-winner').textContent = p2forehandmidfadewinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmidfadeunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-fade-unforced-error').textContent = p2forehandmidfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmidfadeforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-fade-forced-error').textContent = p2forehandmidfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmiddrawwinner += 1;
                document.getElementById('p2-forehand-mid-ct-draw-winner').textContent = p2forehandmiddrawwinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmiddrawunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-draw-unforced-error').textContent = p2forehandmiddrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmiddrawforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-draw-forced-error').textContent = p2forehandmiddrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmiddropwinner += 1;
                document.getElementById('p2-forehand-mid-ct-drop-winner').textContent = p2forehandmiddropwinner
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmiddropunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-drop-unforced-error').textContent = p2forehandmiddropunforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmiddropforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-drop-forced-error').textContent = p2forehandmiddropforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmidskipwinner += 1;
                document.getElementById('p2-forehand-mid-ct-skip-winner').textContent = p2forehandmidskipwinner
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmidskipunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-skip-unforced-error').textContent = p2forehandmidskipunforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmidskipforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-skip-forced-error').textContent = p2forehandmidskipforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmidfadewinner += 1;
                document.getElementById('p2-backhand-mid-ct-fade-winner').textContent = p2backhandmidfadewinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmidfadeunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-fade-unforced-error').textContent = p2backhandmidfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmidfadeforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-fade-forced-error').textContent = p2backhandmidfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmiddrawwinner += 1;
                document.getElementById('p2-backhand-mid-ct-draw-winner').textContent = p2backhandmiddrawwinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmiddrawunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-draw-unforced-error').textContent = p2backhandmiddrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmiddrawforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-draw-forced-error').textContent = p2backhandmiddrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmiddropdrawwinner += 1;
                document.getElementById('p2-backhand-mid-ct-drop-winner').textContent = p2backhandmiddropdrawwinner
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmiddropdrawunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-drop-unforced-error').textContent = p2backhandmiddropdrawunforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmiddropdrawforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-drop-forced-error').textContent = p2backhandmiddropdrawforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmidskipdrawwinner += 1;
                document.getElementById('p2-backhand-mid-ct-skip-winner').textContent = p2backhandmidskipdrawwinner
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmidskipdrawunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-skip-unforced-error').textContent = p2backhandmidskipdrawunforcederror
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === '' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmidskipdrawforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-skip-forced-error').textContent = p2backhandmidskipdrawforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandfinishvolleywinner += 1;
                document.getElementById('p2-forehand-finish-volley-winner').textContent = p2forehandfinishvolleywinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandfinishvolleyunforcederror += 1;
                document.getElementById('p2-forehand-finish-volley-unforced-error').textContent = p2forehandfinishvolleyunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandfinishvolleyforcederror += 1;
                document.getElementById('p2-forehand-finish-volley-forced-error').textContent = p2forehandfinishvolleyforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandfinishoverheadwinner += 1;
                document.getElementById('p2-forehand-finish-overhead-winner').textContent = p2forehandfinishoverheadwinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandfinishoverheadunforcederror += 1;
                document.getElementById('p2-forehand-finish-overhead-unforced-error').textContent = p2forehandfinishoverheadunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandfinishoverheadforcederror += 1;
                document.getElementById('p2-forehand-finish-overhead-forced-error').textContent = p2forehandfinishoverheadforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandfinishdropshotwinner += 1;
                document.getElementById('p2-forehand-finish-dropshot-winner').textContent = p2forehandfinishdropshotwinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandfinishdropshotunforcederror += 1;
                document.getElementById('p2-forehand-finish-dropshot-unforced-error').textContent = p2forehandfinishdropshotunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandfinishdropshotforcederror += 1;
                document.getElementById('p2-forehand-finish-dropshot-forced-error').textContent = p2forehandfinishdropshotforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandfinishvolleywinner += 1;
                document.getElementById('p2-backhand-finish-volley-winner').textContent = p2backhandfinishvolleywinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandfinishvolleyunforcederror += 1;
                document.getElementById('p2-backhand-finish-volley-unforced-error').textContent = p2backhandfinishvolleyunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Volley' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandfinishvolleyforcederror += 1;
                document.getElementById('p2-backhand-finish-volley-forced-error').textContent = p2backhandfinishvolleyforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandfinishoverheadwinner += 1;
                document.getElementById('p2-backhand-finish-overhead-winner').textContent = p2backhandfinishoverheadwinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandfinishoverheadunforcederror += 1;
                document.getElementById('p2-backhand-finish-overhead-unforced-error').textContent = p2backhandfinishoverheadunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a Overhead' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandfinishoverheadforcederror += 1;
                document.getElementById('p2-backhand-finish-overhead-forced-error').textContent = p2backhandfinishoverheadforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandfinishdropshotwinner += 1;
                document.getElementById('p2-backhand-finish-dropshot-winner').textContent = p2backhandfinishdropshotwinner
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandfinishdropshotunforcederror += 1;
                document.getElementById('p2-backhand-finish-dropshot-unforced-error').textContent = p2backhandfinishdropshotunforcederror
            } else if (stat.player === "2" && stat.action === 'Scored in the Finish Area with' && stat.direction === 'a 3rd Dagger' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandfinishdropshotforcederror += 1;
                document.getElementById('p2-backhand-finish-dropshot-forced-error').textContent = p2backhandfinishdropshotforcederror
            } else if (stat.player === "2" && stat.action === 'Served' && stat.side === 'On First Serve Resulting In' && stat.type === 'An Ace') {
                p2firstserveace += 1;
                document.getElementById('p2-first-serve-ace').textContent = p2firstserveace
            } else if (stat.player === "2" && stat.action === 'Served' && stat.side === 'On First Serve Resulting In' && stat.type === 'A Winner') {
                p2firstservewinner += 1;
                document.getElementById('p2-first-serve-winner').textContent = p2firstservewinner
            } else if (stat.player === "2" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'An Ace') {
                p2secondserveace += 1;
                document.getElementById('p2-second-serve-ace').textContent = p2secondserveace
            } else if (stat.player === "2" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'A Winner') {
                p2secondservewinner += 1;
                document.getElementById('p2-second-serve-winner').textContent = p2secondservewinner
            } else if (stat.player === "2" && stat.action === 'Served' && stat.side === 'On Second Serve Resulting In' && stat.type === 'A Double Fault') {
                p2secondservedf += 1;
                document.getElementById('p2-second-serve-df').textContent = p2secondservedf




            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstreturnfadewinner += 1;
                document.getElementById('p2-first-return-fade-winner').textContent = p2firstreturnfadewinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstreturnfadeunforcederror += 1;
                document.getElementById('p2-first-return-fade-unforced-error').textContent = p2firstreturnfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstreturnfadeforcederror += 1;
                document.getElementById('p2-first-return-fade-forced-error').textContent = p2firstreturnfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstreturndrawwinner += 1;
                document.getElementById('p2-first-return-draw-winner').textContent = p2firstreturndrawwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstreturndrawunforcederror += 1;
                document.getElementById('p2-first-return-draw-unforced-error').textContent = p2firstreturndrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstreturndrawforcederror += 1;
                document.getElementById('p2-first-return-draw-forced-error').textContent = p2firstreturndrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstreturnskipwinner += 1;
                document.getElementById('p2-first-return-skip-winner').textContent = p2firstreturnskipwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstreturnskipunforcederror += 1;
                document.getElementById('p2-first-return-skip-unforced-error').textContent = p2firstreturnskipunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstreturnskipforcederror += 1;
                document.getElementById('p2-first-return-skip-forced-error').textContent = p2firstreturnskipforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondreturnfadewinner += 1;
                document.getElementById('p2-second-return-fade-winner').textContent = p2secondreturnfadewinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondreturnfadeunforcederror += 1;
                document.getElementById('p2-second-return-fade-unforced-error').textContent = p2secondreturnfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondreturnfadeforcederror += 1;
                document.getElementById('p2-second-return-fade-forced-error').textContent = p2secondreturnfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondreturndrawwinner += 1;
                document.getElementById('p2-second-return-draw-winner').textContent = p2secondreturndrawwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondreturndrawunforcederror += 1;
                document.getElementById('p2-second-return-draw-unforced-error').textContent = p2secondreturndrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondreturndrawforcederror += 1;
                document.getElementById('p2-second-return-draw-forced-error').textContent = p2secondreturndrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondreturnskipwinner += 1;
                document.getElementById('p2-second-return-skip-winner').textContent = p2secondreturnskipwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondreturnskipunforcederror += 1;
                document.getElementById('p2-second-return-skip-unforced-error').textContent = p2secondreturnskipunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === '' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondreturnskipforcederror += 1;
                document.getElementById('p2-second-return-skip-forced-error').textContent = p2secondreturnskipforcederror;
            }




            lastProcessedIndex = i + 1;
        }

    }

    



    document.getElementById('saveStatsButton').addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent form submission reload


        try {
            // Collect match and player details
            const matchName = document.getElementById('matchName').value;
            const matchDate = document.getElementById('matchDate').value;

            if (typeof finalSetScore === 'undefined' || finalSetScore === null) {
                alert('Please start recording the match before saving to the database.');
                return; // Stop execution
}

            function getRacketValue(player) {
                const racketSelect = document.getElementById(`${player}Racket`);
                const selectedOption = racketSelect.options[racketSelect.selectedIndex]; // Get the selected <option>
                const selectedValue = selectedOption.value;
            
                // Get the racket brand (optgroup label)
                let brand = "";
                const optgroupElements = racketSelect.getElementsByTagName("optgroup");
                for (const optgroup of optgroupElements) {
                    if ([...optgroup.children].includes(selectedOption)) {
                        brand = optgroup.label; // Get the brand name
                        break;
                    }
                }
            
                // If "Custom1" or "Custom2" is selected, use the input field value
                if (selectedValue.startsWith("Custom")) {
                    const playerNumber = selectedValue.replace("Custom", ""); // Extract "1" or "2"
                    const customRacketInput = document.getElementById(`customRacket${playerNumber}`);
            
                    // Ensure proper formatting for custom rackets: "Custom - Aero"
                    return customRacketInput.value.trim() !== "" 
                        ? `Custom - ${customRacketInput.value.trim()}`
                        : "Custom - No Name Provided";
                }
            
                return brand ? `${brand} - ${selectedValue}` : selectedValue; // Return formatted string
            }
            
            
            // Function to show/hide custom racket input dynamically

    
            const player1 = {
                name: document.getElementById('player1Name').value,
                age: parseInt(document.getElementById('player1Age').value, 10),
                height: getHeightData('player1'),
                gender: document.getElementById('player1Gender').value,
                racket: getRacketValue('player1'), // Use function to check for custom input
                dominantHand: document.getElementById('player1DominantHand').value // Get selected dominant hand
            };
            
            const player2 = {
                name: document.getElementById('player2Name').value,
                age: parseInt(document.getElementById('player2Age').value, 10),
                height: getHeightData('player2'),
                gender: document.getElementById('player2Gender').value,
                racket: getRacketValue('player2'), // Use function to check for custom input
                dominantHand: document.getElementById('player2DominantHand').value // Get selected dominant hand
            };
            
    

            function getHeightData(player) {
                const unit = document.getElementById(`${player}HeightUnit`).value;
        
                if (unit === 'ft') {
                    const feet = parseInt(document.getElementById(`${player}Feet`).value, 10) || 0;
                    const inches = parseInt(document.getElementById(`${player}Inches`).value, 10) || 0;
                    return { value: feet * 12 + inches, unit: 'in' };
                } else {
                    const cm = parseFloat(document.getElementById(`${player}Height`).value) || 0;
                    return { value: cm, unit: 'cm' };
                }
            }
    
            // Assign stats directly using variables
            const stats = {
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
            };
    
            // Use matchTimeline variable (an array of objects with timestamp and message)
            // Use setScore variable (array of set scores)
            const eachSetScore = combinedGamesPerSet; // Example set scores
            const finalScore = finalSetScore;
            const matchWinner = OverallMatchwinner;
            const statsmatchTimeline = processTimeline()
            const setType = sets;


            // Send the data to the backend
            const response = await fetch('/save-stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    matchName,
                    setType,
                    finalScore,
                    matchWinner,
                    matchDate,
                    player1,
                    player2,
                    stats,
                    eachSetScore,      // Include set score
                    statsmatchTimeline // Include timeline with timestamp and message
                }),
            });


    
            const result = await response.json();
            console.log('Server response:', result);
    
            if (response.ok) {
                if (confirm('Stats Saved Successfully! Do You Want To Reload The Page?')) {
                  location.reload();
                }
              } else {
                alert('Error saving stats: ' + result.message);
              }
        } catch (error) {
            console.error('Error saving stats:', error);
            alert('Failed to save stats. Check console for details.');
        }
    });
    


}