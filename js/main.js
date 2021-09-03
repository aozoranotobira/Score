window.onload = () => {
    var point_11 = document.getElementById("point_11");
    var point_15 = document.getElementById("point_15");
    var point_21 = document.getElementById("point_21");
    var game_1 = document.getElementById("game_1");
    var game_3 = document.getElementById("game_3");
    var extra = document.getElementById("extra");
    var no_extra = document.getElementById("no_extra");
    var serve_a = document.getElementById("serve_a");
    var serve_b = document.getElementById("serve_b");
    var court_a = document.getElementById("court_a");
    var court_b = document.getElementById("court_b");
    var first_a1 = document.getElementById("first_a1");
    var first_a2 = document.getElementById("first_a2");
    var first_b1 = document.getElementById("first_b1");
    var first_b2 = document.getElementById("first_b2");
    var play = document.getElementById("play");
    var time = document.getElementById("time");
    var left1_player = document.getElementById("left1_player");
    var left2_player = document.getElementById("left2_player");
    var right1_player = document.getElementById("right1_player");
    var right2_player = document.getElementById("right2_player");
    var left1_server = document.getElementById("left1_server");
    var left2_server = document.getElementById("left2_server");
    var right1_server = document.getElementById("right1_server");
    var right2_server = document.getElementById("right2_server");
    var left_score = document.getElementById("left_score");
    var right_score = document.getElementById("right_score");
    var left_point = document.getElementById("left_point");
    var right_point = document.getElementById("right_point");
    var back = document.getElementById("back");
    var change = document.getElementById("change");
    var game1 = document.getElementById("game1");
    var game2 = document.getElementById("game2");
    var game3 = document.getElementById("game3");
    var games_a = document.getElementById("games_a");
    var games_b = document.getElementById("games_b");
    var div_sheet1 = document.getElementById("div_sheet1");
    var table_sheet1 = document.getElementById("table_sheet1");
    var tr1_a1 = document.getElementById("tr1_a1");
    var tr1_a2 = document.getElementById("tr1_a2");
    var tr1_b1 = document.getElementById("tr1_b1");
    var tr1_b2 = document.getElementById("tr1_b2");
    var div_sheet2 = document.getElementById("div_sheet2");
    var table_sheet2 = document.getElementById("table_sheet2");
    var tr2_a1 = document.getElementById("tr2_a1");
    var tr2_a2 = document.getElementById("tr2_a2");
    var tr2_b1 = document.getElementById("tr2_b1");
    var tr2_b2 = document.getElementById("tr2_b2");
    var div_sheet3 = document.getElementById("div_sheet3");
    var table_sheet3 = document.getElementById("table_sheet3");
    var tr3_a1 = document.getElementById("tr3_a1");
    var tr3_a2 = document.getElementById("tr3_a2");
    var tr3_b1 = document.getElementById("tr3_b1");
    var tr3_b2 = document.getElementById("tr3_b2");
    var points = {
        11: { interval: 6, duece: 10, extra: 11 },
        15: { interval: 8, duece: 14, extra: 21 },
        21: { interval: 11, duece: 20, extra: 30 },
    };
    var sheetHeaders = [game1, game2, game3];
    var sheets = [
        { div: div_sheet1, table: table_sheet1, a1: tr1_a1, a2: tr1_a2, b1: tr1_b1, b2: tr1_b2 },
        { div: div_sheet2, table: table_sheet2, a1: tr2_a1, a2: tr2_a2, b1: tr2_b1, b2: tr2_b2 },
        { div: div_sheet3, table: table_sheet3, a1: tr3_a1, a2: tr3_a2, b1: tr3_b1, b2: tr3_b2 },
    ];

    const START1 = "第１ゲーム開始";
    const START2 = "第２ゲーム開始";
    const START3 = "第３ゲーム開始";
    const FINISH = "ゲーム終了";
    const RETIRE = "棄権";
    const TEAM_A = "Ａ";
    const TEAM_B = "Ｂ";
    const FIRST = "１";
    const SECOND = "２";
    const A1 = TEAM_A + FIRST;
    const A2 = TEAM_A + SECOND;
    const B1 = TEAM_B + FIRST;
    const B2 = TEAM_B + SECOND;
    const SERVER = "Ｓ";
    const RECEIVER = "Ｒ";
    const SHEET_WIDTH_TH = 38;
    const SHEET_WIDTH_TD = 35;

    var rulePoint = 21;
    var ruleGame = 3;
    var ruleExtra = true;
    var gameIndex = 0;
    var games = [];
    var courtLeft = TEAM_A;
    var courtRight = TEAM_B;
    var changeEnds = false;
    var deuce = false;
    var timer;
    var start;
    var sheetWidth = SHEET_WIDTH_TH;

    // ポイント数[ラジオボタン]／押下イベントハンドラ登録
    point_11.addEventListener("click", () => {
        rulePoint = 11;
    }, false);
    point_15.addEventListener("click", () => {
        rulePoint = 15;
    }, false);
    point_21.addEventListener("click", () => {
        rulePoint = 21;
    }, false);

    // ゲーム数[ラジオボタン]／押下イベントハンドラ登録
    game_1.addEventListener("click", () => {
        ruleGame = 1;
    }, false);
    game_3.addEventListener("click", () => {
        ruleGame = 3;
    }, false);

    // 延長有無[ラジオボタン]／押下イベントハンドラ登録
    extra.addEventListener("click", () => {
        ruleExtra = true;
    }, false);
    no_extra.addEventListener("click", () => {
        ruleExtra = false;
    }, false);

    // プレイ[ボタン]／押下イベントハンドラ登録
    play.addEventListener("click", () => {
        switch (play.innerHTML) {
            case START1:
            case START2:
            case START3:
                var serveTeam;
                if (play.innerHTML == START1) {
                    gameIndex = 0;
                    games = [];
                    for (var i = 0; i < ruleGame; i++) {
                        games.push({ pointA: 0, pointB: 0, rallys: [] });
                    }
                    serveTeam = serve_a.checked ? TEAM_A : TEAM_B;
                    courtLeft = court_a.checked ? TEAM_A : TEAM_B;
                    courtRight = court_b.checked ? TEAM_A : TEAM_B;
                } else {
                    gameIndex = play.innerHTML == START2 ? 1 : 2;
                    serveTeam = games[gameIndex].pointA > games[gameIndex].pointB ? TEAM_A : TEAM_B;
                    [courtLeft, courtRight] = [courtRight, courtLeft];
                }
                games[gameIndex].rallys.push({
                    win: serveTeam,
                    pointA: 0,
                    pointB: 0,
                    server: serveTeam == TEAM_A ? TEAM_A + (first_a1.checked ? FIRST : SECOND) : TEAM_B + (first_b1.checked ? FIRST : SECOND),
                    receiver: serveTeam == TEAM_B ? TEAM_A + (first_a1.checked ? FIRST : SECOND) : TEAM_B + (first_b1.checked ? FIRST : SECOND),
                    leftFirst: courtLeft == TEAM_A ? TEAM_A + (first_a1.checked ? FIRST : SECOND) : TEAM_B + (first_b1.checked ? FIRST : SECOND),
                    leftSecond: courtLeft == TEAM_A ? TEAM_A + (first_a2.checked ? FIRST : SECOND) : TEAM_B + (first_b2.checked ? FIRST : SECOND),
                    rightFirst: courtLeft == TEAM_B ? TEAM_A + (first_a1.checked ? FIRST : SECOND) : TEAM_B + (first_b1.checked ? FIRST : SECOND),
                    rightSecond: courtLeft == TEAM_B ? TEAM_A + (first_a2.checked ? FIRST : SECOND) : TEAM_B + (first_b2.checked ? FIRST : SECOND),
                    changeCourt: false,
                });
                changeEnds = false;
                deuce = false;
                resetTimer();

                play.innerHTML = RETIRE;
                left_point.innerText = (courtLeft == TEAM_A ? TEAM_A : TEAM_B) + "ポイント";
                right_point.innerText = (courtLeft == TEAM_B ? TEAM_A : TEAM_B) + "ポイント";
                if (gameIndex == 0) clearScoreSheet();
                display();
                setRadioDisabled(true);
                setButtonDisabled(false);
                break;
            case FINISH:
                play.innerHTML = START1;
                clearInterval(timer);
                setRadioDisabled(false);
                setButtonDisabled(true);
                break;
            case RETIRE:
                if (!window.confirm("棄権しますか？")) return;
                play.innerHTML = START1;
                clearInterval(timer);
                setRadioDisabled(false);
                setButtonDisabled(true);
                break;
            default:
                break;
        }
    }, false);

    // レフトポイント[ボタン]／押下イベントハンドラ登録
    left_point.addEventListener("click", () => {
        var rallys = games[gameIndex].rallys;
        var lastRally = rallys[rallys.length - 1];

        var pointA = lastRally.pointA + (courtLeft == TEAM_A ? 1 : 0);
        var pointB = lastRally.pointB + (courtLeft == TEAM_B ? 1 : 0);
        var server;
        var receiver;
        var leftFirst;
        var leftSecond;
        var rightFirst = lastRally.rightFirst;
        var rightSecond = lastRally.rightSecond;
        if (lastRally.win == courtLeft) {
            // ポイント
            leftFirst = lastRally.leftSecond;
            leftSecond = lastRally.leftFirst;
            server = lastRally.server;
            receiver = lastRally.receiver == rightSecond ? rightFirst : rightSecond;
        } else {
            // サービスオーバー
            leftFirst = lastRally.leftFirst;
            leftSecond = lastRally.leftSecond;
            var even = (courtLeft == TEAM_A ? pointA : pointB) % 2 == 0;
            server = even ? leftFirst : leftSecond;
            receiver = even ? rightFirst : rightSecond;
        }

        games[gameIndex].rallys.push({
            win: courtLeft,
            pointA: pointA,
            pointB: pointB,
            server: server,
            receiver: receiver,
            leftFirst: leftFirst,
            leftSecond: leftSecond,
            rightFirst: rightFirst,
            rightSecond: rightSecond,
            changeCourt: false,
        });

        display();

        if (checkGameOver(pointA, pointB)) {
            if (checkFinish()) {
                play.innerHTML = FINISH;
                setRadioDisabled(true);
            } else {
                play.innerHTML = gameIndex == 0 ? START2 : START3;
                setRadioDisabled(true, true);
            }
            resetTimer();
            setButtonDisabled(true);
        }
    }, false);

    // ライトポイント[ボタン]／押下イベントハンドラ登録
    right_point.addEventListener("click", () => {
        var rallys = games[gameIndex].rallys;
        var lastRally = rallys[rallys.length - 1];

        var pointA = lastRally.pointA + (courtRight == TEAM_A ? 1 : 0);
        var pointB = lastRally.pointB + (courtRight == TEAM_B ? 1 : 0);
        var server;
        var receiver;
        var leftFirst = lastRally.leftFirst;
        var leftSecond = lastRally.leftSecond;
        var rightFirst;
        var rightSecond;
        if (lastRally.win == courtRight) {
            // ポイント
            rightFirst = lastRally.rightSecond;
            rightSecond = lastRally.rightFirst;
            server = lastRally.server;
            receiver = lastRally.receiver == leftSecond ? leftFirst : leftSecond;
        } else {
            // サービスオーバー
            rightFirst = lastRally.rightFirst;
            rightSecond = lastRally.rightSecond;
            var even = (courtRight == TEAM_A ? pointA : pointB) % 2 == 0;
            server = even ? rightFirst : rightSecond;
            receiver = even ? leftFirst : leftSecond;
        }

        games[gameIndex].rallys.push({
            win: courtRight,
            pointA: pointA,
            pointB: pointB,
            server: server,
            receiver: receiver,
            leftFirst: leftFirst,
            leftSecond: leftSecond,
            rightFirst: rightFirst,
            rightSecond: rightSecond,
            changeCourt: false,
        });

        display();

        if (checkGameOver(pointA, pointB)) {
            if (checkFinish()) {
                play.innerHTML = FINISH;
                setRadioDisabled(true);
            } else {
                play.innerHTML = gameIndex == 0 ? START2 : START3;
                setRadioDisabled(true, true);
            }
            resetTimer();
            setButtonDisabled(true);
        }
    }, false);

    // 戻る[ボタン]／押下イベントハンドラ登録
    back.addEventListener("click", () => {
        if (games[gameIndex].rallys.length <= 1) return;

        var rally = games[gameIndex].rallys.pop();
        if (rally.changeCourt) {
            games[gameIndex].rallys.pop();
        }
        display(true);
    }, false);

    // チェンジコート[ボタン]／押下イベントハンドラ登録
    change.addEventListener("click", () => {
        if (games[gameIndex].rallys.length <= 1) return;

        var rallys = games[gameIndex].rallys;
        var rally = rallys[rallys.length - 1];
        if (rally.changeCourt) {
            rallys.pop();
        } else {
            games[gameIndex].rallys.push({
                win: rally.win,
                pointA: rally.pointA,
                pointB: rally.pointB,
                server: rally.server,
                receiver: rally.receiver,
                leftFirst: rally.rightFirst,
                leftSecond: rally.rightSecond,
                rightFirst: rally.leftFirst,
                rightSecond: rally.leftSecond,
                changeCourt: true,
            });
        }

        [courtLeft, courtRight] = [courtRight, courtLeft];
        left_point.innerText = (courtLeft == TEAM_A ? TEAM_A : TEAM_B) + "ポイント";
        right_point.innerText = (courtLeft == TEAM_B ? TEAM_A : TEAM_B) + "ポイント";

        displayScoreBoard();
    }, false);

    // ラジオボタン押下可否
    function setRadioDisabled(disabled, next = false) {
        point_11.disabled = disabled;
        point_15.disabled = disabled;
        point_21.disabled = disabled;
        game_1.disabled = disabled;
        game_3.disabled = disabled;
        extra.disabled = disabled;
        no_extra.disabled = disabled;
        serve_a.disabled = disabled;
        serve_b.disabled = disabled;
        court_a.disabled = disabled;
        court_b.disabled = disabled;
        first_a1.disabled = next ? false : disabled;
        first_a2.disabled = next ? false : disabled;
        first_b1.disabled = next ? false : disabled;
        first_b2.disabled = next ? false : disabled;
    }

    // ボタン押下可否
    function setButtonDisabled(disabled) {
        left_point.disabled = disabled;
        right_point.disabled = disabled;
        back.disabled = disabled;
        change.disabled = disabled;
    }

    // タイマーリセット
    function resetTimer() {
        clearInterval(timer);
        start = new Date();
        timer = setInterval(countDown, 1000);
    }

    // カウントダウン
    function countDown() {
        var now = new Date();
        var elapsed = parseInt((now.getTime() - start.getTime()) / 1000);
        var hours = parseInt(elapsed / 3600);
        var minutes = parseInt((elapsed / 60) % 60);
        var seconds = elapsed % 60;
        time.innerText = `${zeroPadding(hours, 2)}:${zeroPadding(minutes, 2)}:${zeroPadding(seconds, 2)}`;
    }

    function zeroPadding(num, length) {
        return ('0000000000' + num).slice(-length);
    }

    // ゲーム終了判定
    function checkGameOver(pointA, pointB) {
        // チェンジエンズ判定
        if (!changeEnds && gameIndex + 1 == ruleGame && (pointA == points[rulePoint].interval || pointB == points[rulePoint].interval)) {
            changeEnds = true;
            alert("チェンジエンズ");
        }

        // デュース判定
        if (ruleExtra && (pointA == points[rulePoint].duece && pointB == points[rulePoint].duece)) {
            deuce = true;
        }

        // ゲーム終了判定
        var gameOver = false;
        if (!deuce && (pointA == rulePoint || pointB == rulePoint)) {
            gameOver = true;
        } else if (deuce && (pointA == pointB + 2 || pointB == pointA + 2)) {
            gameOver = true;
        } else if (pointA == points[rulePoint].extra || pointB == points[rulePoint].extra) {
            gameOver = true;
        }

        // ゲーム終了時の画面表示
        if (gameOver) {
            games[gameIndex].pointA = pointA;
            games[gameIndex].pointB = pointB;

            sheetHeaders[gameIndex].innerText = `${pointA} - ${pointB}`;
            var tda = getTd(pointA);
            tda.rowSpan = 2;
            sheets[gameIndex].a1.appendChild(tda);
            var tdb = getTd(pointB);
            tdb.rowSpan = 2;
            sheets[gameIndex].b1.appendChild(tdb);
            sheets[gameIndex].table.style.width = `${sheetWidth + SHEET_WIDTH_TD}px`;
            sheets[gameIndex].div.scrollLeft = sheets[gameIndex].div.scrollWidth;
        }

        return gameOver;
    }

    // 試合終了判定
    function checkFinish() {
        var finish = false;

        var winA = 0;
        var winB = 0;
        for (var i = 0; i < ruleGame; i++) {
            winA = winA + (games[i].pointA > games[i].pointB ? 1 : 0);
            winB = winB + (games[i].pointB > games[i].pointA ? 1 : 0);
        }
        games_a.innerText = winA;
        games_b.innerText = winB;

        if (gameIndex + 1 == ruleGame) {
            finish = true;
        } else if (winA == 2 || winB == 2) {
            finish = true;
        }

        return finish;
    }

    // 画面表示
    function display(back = false) {
        displayScoreBoard();
        if (back) {
            deleteScoreSheet();
        } else {
            insertScoreSheet();
        }
    }

    // スコアボード表示
    function displayScoreBoard() {
        var rallys = games[gameIndex].rallys;
        var rally = rallys[rallys.length - 1];
        left1_player.innerText = rally.leftFirst;
        left2_player.innerText = rally.leftSecond;
        right1_player.innerText = rally.rightFirst;
        right2_player.innerText = rally.rightSecond;
        left1_server.innerText = rally.server == rally.leftFirst ? SERVER : rally.receiver == rally.leftFirst ? RECEIVER : "";
        left2_server.innerText = rally.server == rally.leftSecond ? SERVER : rally.receiver == rally.leftSecond ? RECEIVER : "";
        right1_server.innerText = rally.server == rally.rightFirst ? SERVER : rally.receiver == rally.rightFirst ? RECEIVER : "";
        right2_server.innerText = rally.server == rally.rightSecond ? SERVER : rally.receiver == rally.rightSecond ? RECEIVER : "";
        left_score.innerText = courtLeft == TEAM_A ? rally.pointA : rally.pointB;
        right_score.innerText = courtLeft == TEAM_B ? rally.pointA : rally.pointB;
    }

    // スコアシート初期表示
    function clearScoreSheet() {
        games_a.innerText = 0;
        games_b.innerText = 0;
        for (var i = 0; i < sheets.length; i++) {
            sheetHeaders[i].innerText = `0 - 0`;
            sheets[i].table.style.width = `${sheetWidth}px`;
            sheets[i].a1.innerText = "";
            sheets[i].a2.innerText = "";
            sheets[i].b1.innerText = "";
            sheets[i].b2.innerText = "";
            sheets[i].a1.appendChild(getTh(TEAM_A + FIRST));
            sheets[i].a2.appendChild(getTh(TEAM_A + SECOND));
            sheets[i].b1.appendChild(getTh(TEAM_B + FIRST));
            sheets[i].b2.appendChild(getTh(TEAM_B + SECOND));
            sheets[i].table.style.width = `${SHEET_WIDTH_TH}px`;
            sheets[i].div.scrollLeft = sheets[i].div.scrollWidth;
        }
    }

    // スコアシート列追加
    function insertScoreSheet() {
        var rallys = games[gameIndex].rallys;
        var rally = rallys[rallys.length - 1];
        if (rally.pointA == 0 && rally.pointB == 0) {
            sheets[gameIndex].a1.appendChild(getTd(rally.server == A1 ? SERVER : rally.receiver == A1 ? RECEIVER : ""));
            sheets[gameIndex].a2.appendChild(getTd(rally.server == A2 ? SERVER : rally.receiver == A2 ? RECEIVER : ""));
            sheets[gameIndex].b1.appendChild(getTd(rally.server == B1 ? SERVER : rally.receiver == B1 ? RECEIVER : ""));
            sheets[gameIndex].b2.appendChild(getTd(rally.server == B2 ? SERVER : rally.receiver == B2 ? RECEIVER : ""));
            sheets[gameIndex].a1.appendChild(getTd(rally.server == A1 || rally.receiver == A1 ? rally.pointA : ""));
            sheets[gameIndex].a2.appendChild(getTd(rally.server == A2 || rally.receiver == A2 ? rally.pointA : ""));
            sheets[gameIndex].b1.appendChild(getTd(rally.server == B1 || rally.receiver == B1 ? rally.pointB : ""));
            sheets[gameIndex].b2.appendChild(getTd(rally.server == B2 || rally.receiver == B2 ? rally.pointB : ""));
            sheetWidth = SHEET_WIDTH_TH + SHEET_WIDTH_TD + SHEET_WIDTH_TD;
        } else {
            sheets[gameIndex].a1.appendChild(getTd(rally.server == A1 ? rally.pointA : ""));
            sheets[gameIndex].a2.appendChild(getTd(rally.server == A2 ? rally.pointA : ""));
            sheets[gameIndex].b1.appendChild(getTd(rally.server == B1 ? rally.pointB : ""));
            sheets[gameIndex].b2.appendChild(getTd(rally.server == B2 ? rally.pointB : ""));
            sheetWidth = sheetWidth + SHEET_WIDTH_TD;
        }
        sheets[gameIndex].table.style.width = `${sheetWidth}px`;
        sheets[gameIndex].div.scrollLeft = sheets[gameIndex].div.scrollWidth;
    }

    function getTh(text) {
        var th = document.createElement("th");
        th.textContent = text;
        return th;
    }

    function getTd(text) {
        var td = document.createElement("td");
        td.textContent = text;
        return td;
    }

    // スコアシート列削除
    function deleteScoreSheet() {
        sheets[gameIndex].a1.deleteCell(-1);
        sheets[gameIndex].a2.deleteCell(-1);
        sheets[gameIndex].b1.deleteCell(-1);
        sheets[gameIndex].b2.deleteCell(-1);
        sheetWidth = sheetWidth - SHEET_WIDTH_TD;
        sheets[gameIndex].table.style.width = `${sheetWidth}px`;
        sheets[gameIndex].div.scrollLeft = sheets[gameIndex].div.scrollWidth;
    }
}
