"use strict"
//Local Storage
var key = "toug0008";
var myArray = (localStorage.getItem(key) != null ? JSON.parse(localStorage.getItem(key)) : []);
console.log(myArray.length + " = myArray length");
let initLocalStorage = function () {
    if (myArray.length >= 1) {
        console.log(myArray.length + " = myArray length");
        myArray.shift(vsArray);
        myArray.shift(scoreArray);
        console.log(myArray.length + " = myArray length");
    }
    myArray.push({
        scoreArray
    });
    myArray.push({
        vsArray
    });
    console.log(myArray);
    setLocalStorage();
};
let setLocalStorage = function () {
    localStorage.setItem(key, JSON.stringify(myArray));
};
//Switch Pages
let goGames = function () {
    document.querySelector(".content").classList.add("active")
    document.querySelector(".standings").classList.remove("active");
};
let goStandings = function () {
    document.querySelector(".content").classList.remove("active");
    document.querySelector(".standings").classList.add("active");
};
//Associates the ID with the name
let teamArray = [];
let scoreArray = [];
let getName = function (id) {
    let teamName = "";
    teamArray.forEach(function (item) {
        if (id == item.id) {
            teamName = item.name;
        }
    })
    return teamName;
};
//
let vsArray = [];
let vsObject = {};
let t1wins = 0
    , t1losses = 0
    , t1ties = 0
    , t1name = ""
    , t2wins = 0
    , t2losses = 0
    , t2ties = 0
    , t2name = ""
    , t3wins = 0
    , t3losses = 0
    , t3ties = 0
    , t3name = ""
    , t4wins = 0
    , t4losses = 0
    , t4ties = 0
    , t4name = "";
let t1record = {
    w: t1wins
    , l: t1losses
    , t: t1ties
    , n: "Gryffindor"
}
let t2record = {
    w: t2wins
    , l: t2losses
    , t: t2ties
    , n: "Slytherin"
}
let t3record = {
    w: t3wins
    , l: t3losses
    , t: t3ties
    , n: "Hufflepuff"
}
let t4record = {
    w: t4wins
    , l: t4losses
    , t: t4ties
    , n: "Ravenclaw"
}
let i = 1
    , content = document.querySelector(".content")
    , standings = document.querySelector(".standings")
    , team1 = document.querySelector(".team1")
    , team1W = document.querySelector(".team1W")
    , team1L = document.querySelector(".team1L")
    , team1T = document.querySelector(".team1T")
    , team2 = document.querySelector(".team2")
    , team2W = document.querySelector(".team2W")
    , team2L = document.querySelector(".team2L")
    , team2T = document.querySelector(".team2T")
    , team3 = document.querySelector(".team3")
    , team3W = document.querySelector(".team3W")
    , team3L = document.querySelector(".team3L")
    , team3T = document.querySelector(".team3T")
    , team4 = document.querySelector(".team4")
    , team4W = document.querySelector(".team4W")
    , team4L = document.querySelector(".team4L")
    , team4T = document.querySelector(".team4T");
let a = ""
    , h = ""
    , a2 = ""
    , h2 = "";
//Reload
let reload = function () {
    let divC = document.querySelector(".content");
    while (divC.firstChild) {
        divC.removeChild(divC.firstChild);
    }
    team1.classList.remove(myArray[0].scoreArray[0].n);
    team2.classList.remove(myArray[0].scoreArray[1].n);
    team3.classList.remove(myArray[0].scoreArray[2].n);
    team4.classList.remove(myArray[0].scoreArray[3].n);
    let teamDiv = document.querySelectorAll(".teamName");
    while (teamDiv.firstChild) {
        teamDiv.removeChild(teamDiv.firstChild);
    }
    
    if (myArray.length >= 1) {
        myArray.shift(scoreArray);
        myArray.shift(vsArray);
    }
    fetchReload();
};
//
let handleData = function (data) {
    let teams = data.teams;
    teamArray = [];
    teams.forEach(function (value) {
        let teamId = value.id;
        let teamName = value.name;
        let teamObject = {
            id: teamId
            , name: teamName
        }
        teamArray.push(teamObject);
    });
    let scores = data.scores;
    //
    t1wins = 0;
    t1losses = 0;
    t1ties = 0;
    t1name = "";
    t2wins = 0;
    t2losses = 0;
    t2ties = 0;
    t2name = "";
    t3wins = 0;
    t3losses = 0;
    t3ties = 0;
    t3name = "";
    t4wins = 0;
    t4losses = 0;
    t4ties = 0;
    t4name = "";
    i = 1;
    vsArray = [];
    scoreArray = [];
    //Loop through scores
    scores.forEach(function (value) {
        scoreArray.shift(t1record, t2record, t3record, t4record);
        //PAGE 1
        let date = document.createElement("div")
            , dateP = document.createElement("p")
            , game1 = document.createElement("div")
            , game2 = document.createElement("div");
        date.classList.add("dates");
        date.classList.add("date" + i);
        game1.classList.add("games");
        game1.classList.add("game1" + i);
        game2.classList.add("games");
        game2.classList.add("game2" + i);
        dateP.textContent = value.date;
        date.appendChild(dateP);
        date.appendChild(game1);
        date.appendChild(game2);
        h = getName(value.games[0].home);
        a = getName(value.games[0].away);
        h2 = getName(value.games[1].home);
        a2 = getName(value.games[1].away);
        if (myArray == false) {
            game1.textContent = (h + " vs " + a);
            game2.textContent = (h2 + " vs " + a2);
            game1.classList.add(h, a);
            game2.classList.add(h2, a2);
        }
        vsObject = {
            h: h
            , a: a
            , h2: h2
            , a2: a2
        }
        vsArray.push(vsObject);
        //PAGE 2
        let hWin = value.games[0].home_score > value.games[0].away_score;
        let aWin = value.games[0].home_score < value.games[0].away_score;
        let h2Win = value.games[1].home_score > value.games[1].away_score;
        let a2Win = value.games[1].home_score < value.games[1].away_score;
        let g1Tie = (value.games[0].home_score == value.games[0].away_score);
        let g2Tie = (value.games[1].home_score == value.games[1].away_score);
        //
        if (h == "Gryffindor" && hWin || a == "Gryffindor" && aWin || h2 == "Gryffindor" && h2Win || a2 == "Gryffindor" && a2Win) {
            t1wins = t1wins + 1;
        }
        else if (h == "Gryffindor" && aWin || a == "Gryffindor" && hWin || h2 == "Gryffindor" && a2Win || a2 == "Gryffindor" && h2Win) {
            t1losses = t1losses + 1;
        }
        else if (h == "Gryffindor" && g1Tie || a == "Gryffindor" && g1Tie || h2 == "Gryffindor" && g2Tie || a2 == "Gryffindor" && g2Tie) {
            t1ties = t1ties + 1;
        }
        //
        if (h == "Slytherin" && hWin || a == "Slytherin" && aWin || h2 == "Slytherin" && h2Win || a2 == "Slytherin" && a2Win) {
            t2wins = t2wins + 1;
        }
        else if (h == "Slytherin" && aWin || a == "Slytherin" && hWin || h2 == "Slytherin" && a2Win || a2 == "Slytherin" && h2Win) {
            t2losses = t2losses + 1;
        }
        else if (h == "Slytherin" && g1Tie || a == "Slytherin" && g1Tie || h2 == "Slytherin" && g2Tie || a2 == "Slytherin" && g2Tie) {
            t2ties = t2ties + 1;
        }
        //
        if (h == "Hufflepuff" && hWin || a == "Hufflepuff" && aWin || h2 == "Hufflepuff" && h2Win || a2 == "Hufflepuff" && a2Win) {
            t3wins = t3wins + 1;
        }
        else if (h == "Hufflepuff" && aWin || a == "Hufflepuff" && hWin || h2 == "Hufflepuff" && a2Win || a2 == "Hufflepuff" && h2Win) {
            t3losses = t3losses + 1;
        }
        else if (h == "Hufflepuff" && g1Tie || a == "Hufflepuff" && g1Tie || h2 == "Hufflepuff" && g2Tie || a2 == "Hufflepuff" && g2Tie) {
            t3ties = t3ties + 1;
        }
        //
        if (h == "Ravenclaw" && hWin || a == "Ravenclaw" && aWin || h2 == "Ravenclaw" && h2Win || a2 == "Ravenclaw" && a2Win) {
            t4wins = t4wins + 1;
        }
        else if (h == "Ravenclaw" && aWin || a == "Ravenclaw" && hWin || h2 == "Ravenclaw" && a2Win || a2 == "Ravenclaw" && h2Win) {
            t4losses = t4losses + 1;
        }
        else if (h == "Ravenclaw" && g1Tie || a == "Ravenclaw" && g1Tie || h2 == "Ravenclaw" && g2Tie || a2 == "Ravenclaw" && g2Tie) {
            t4ties = t4ties + 1;
        }
        //
        t1record = {
            w: t1wins
            , l: t1losses
            , t: t1ties
            , n: "Gryffindor"
        }
        t2record = {
            w: t2wins
            , l: t2losses
            , t: t2ties
            , n: "Slytherin"
        }
        t3record = {
            w: t3wins
            , l: t3losses
            , t: t3ties
            , n: "Hufflepuff"
        }
        t4record = {
            w: t4wins
            , l: t4losses
            , t: t4ties
            , n: "Ravenclaw"
        }
        content.appendChild(date);
        i = i + 1;
    });
    scoreArray.push(t1record, t2record, t3record, t4record);
    scoreArray.sort(function (a, b) {
        if (a.w < b.w) {
            return 1;
        }
        if (a.w > b.w) {
            return -1;
        }
        if (a.t < b.t) {
            return 1;
        }
        if (a.t > b.t) {
            return -1;
        }
        return 0;
    });
    if (myArray == false) {
        initLocalStorage();
        team1W.textContent = scoreArray[0].w;
        team1L.textContent = scoreArray[0].l;
        team1T.textContent = scoreArray[0].t;
        team1.textContent = scoreArray[0].n;
        team2W.textContent = scoreArray[1].w;
        team2L.textContent = scoreArray[1].l;
        team2T.textContent = scoreArray[1].t;
        team2.textContent = scoreArray[1].n;
        team3W.textContent = scoreArray[2].w;
        team3L.textContent = scoreArray[2].l;
        team3T.textContent = scoreArray[2].t;
        team3.textContent = scoreArray[2].n;
        team4W.textContent = scoreArray[3].w;
        team4L.textContent = scoreArray[3].l;
        team4T.textContent = scoreArray[3].t;
        team4.textContent = scoreArray[3].n;
        team1.classList.add(scoreArray[0].n);
        team2.classList.add(scoreArray[1].n);
        team3.classList.add(scoreArray[2].n);
        team4.classList.add(scoreArray[3].n);
        console.log(scoreArray[0].n + "new");
    }
    console.log(scoreArray);
    displayInfo();
    setIcons();
};
let displayInfo = function () {
    myArray = JSON.parse(localStorage.getItem(key));
    if (myArray.length >= 1) {
        console.log(myArray[1].vsArray[0].h);
        document.querySelector(".game11").textContent = (myArray[1].vsArray[0].h + " vs " + myArray[1].vsArray[0].a);
        document.querySelector(".game21").textContent = (myArray[1].vsArray[0].h2 + " vs " + myArray[1].vsArray[0].a2);
        document.querySelector(".game12").textContent = (myArray[1].vsArray[1].h + " vs " + myArray[1].vsArray[1].a);
        document.querySelector(".game22").textContent = (myArray[1].vsArray[1].h2 + " vs " + myArray[1].vsArray[1].a2);
        document.querySelector(".game13").textContent = (myArray[1].vsArray[2].h + " vs " + myArray[1].vsArray[2].a);
        document.querySelector(".game23").textContent = (myArray[1].vsArray[2].h2 + " vs " + myArray[1].vsArray[2].a2);
        document.querySelector(".game14").textContent = (myArray[1].vsArray[3].h + " vs " + myArray[1].vsArray[3].a);
        document.querySelector(".game24").textContent = (myArray[1].vsArray[3].h2 + " vs " + myArray[1].vsArray[3].a2);
        document.querySelector(".game15").textContent = (myArray[1].vsArray[4].h + " vs " + myArray[1].vsArray[4].a);
        document.querySelector(".game25").textContent = (myArray[1].vsArray[4].h2 + " vs " + myArray[1].vsArray[4].a2);
        document.querySelector(".game16").textContent = (myArray[1].vsArray[5].h + " vs " + myArray[1].vsArray[5].a);
        document.querySelector(".game26").textContent = (myArray[1].vsArray[5].h2 + " vs " + myArray[1].vsArray[5].a2);
        document.querySelector(".game11").classList.add(myArray[1].vsArray[0].h, myArray[1].vsArray[0].a);
        document.querySelector(".game21").classList.add(myArray[1].vsArray[0].h2, myArray[1].vsArray[0].a2);
        document.querySelector(".game12").classList.add(myArray[1].vsArray[1].h, myArray[1].vsArray[1].a);
        document.querySelector(".game22").classList.add(myArray[1].vsArray[1].h2, myArray[1].vsArray[1].a2);
        document.querySelector(".game13").classList.add(myArray[1].vsArray[2].h, myArray[1].vsArray[2].a);
        document.querySelector(".game23").classList.add(myArray[1].vsArray[2].h2, myArray[1].vsArray[2].a2);
        document.querySelector(".game14").classList.add(myArray[1].vsArray[3].h, myArray[1].vsArray[3].a);
        document.querySelector(".game24").classList.add(myArray[1].vsArray[3].h2, myArray[1].vsArray[3].a2);
        document.querySelector(".game15").classList.add(myArray[1].vsArray[4].h, myArray[1].vsArray[4].a);
        document.querySelector(".game25").classList.add(myArray[1].vsArray[4].h2, myArray[1].vsArray[4].a2);
        document.querySelector(".game16").classList.add(myArray[1].vsArray[5].h, myArray[1].vsArray[5].a);
        document.querySelector(".game26").classList.add(myArray[1].vsArray[5].h2, myArray[1].vsArray[5].a2);
        team1W.textContent = myArray[0].scoreArray[0].w;
        team1L.textContent = myArray[0].scoreArray[0].l;
        team1T.textContent = myArray[0].scoreArray[0].t;
        team1.textContent = myArray[0].scoreArray[0].n;
        team2W.textContent = myArray[0].scoreArray[1].w;
        team2L.textContent = myArray[0].scoreArray[1].l;
        team2T.textContent = myArray[0].scoreArray[1].t;
        team2.textContent = myArray[0].scoreArray[1].n;
        team3W.textContent = myArray[0].scoreArray[2].w;
        team3L.textContent = myArray[0].scoreArray[2].l;
        team3T.textContent = myArray[0].scoreArray[2].t;
        team3.textContent = myArray[0].scoreArray[2].n;
        team4W.textContent = myArray[0].scoreArray[3].w;
        team4L.textContent = myArray[0].scoreArray[3].l;
        team4T.textContent = myArray[0].scoreArray[3].t;
        team4.textContent = myArray[0].scoreArray[3].n;
        team1.classList.add(myArray[0].scoreArray[0].n);
        team2.classList.add(myArray[0].scoreArray[1].n);
        team3.classList.add(myArray[0].scoreArray[2].n);
        team4.classList.add(myArray[0].scoreArray[3].n);
    }
};
let setIcons = function () {
    let games = document.querySelectorAll(".games");
    games.forEach(function (value) {
        if (value.classList[2] == "Gryffindor") {
            let gryff = document.createElement("div");
            gryff.classList.add("gryff");
            value.appendChild(gryff);
        }
        if (value.classList[2] == "Slytherin") {
            let slyth = document.createElement("div");
            slyth.classList.add("slyth");
            value.appendChild(slyth);
        }
        if (value.classList[2] == "Hufflepuff") {
            let huff = document.createElement("div");
            huff.classList.add("huff");
            value.appendChild(huff);
        }
        if (value.classList[2] == "Ravenclaw") {
            let rave = document.createElement("div");
            rave.classList.add("rave");
            value.appendChild(rave);
        }
        //
        if (value.classList[3] == "Gryffindor") {
            let gryff = document.createElement("div");
            gryff.classList.add("gryff");
            value.appendChild(gryff);
        }
        if (value.classList[3] == "Slytherin") {
            let slyth = document.createElement("div");
            slyth.classList.add("slyth");
            value.appendChild(slyth);
        }
        if (value.classList[3] == "Hufflepuff") {
            let huff = document.createElement("div");
            huff.classList.add("huff");
            value.appendChild(huff);
        }
        if (value.classList[3] == "Ravenclaw") {
            let rave = document.createElement("div");
            rave.classList.add("rave");
            value.appendChild(rave);
        }
    });
    //
    let teamName = document.querySelectorAll(".teamName");
    teamName.forEach(function (item) {
        if (item.classList.contains("Gryffindor")) {
            let gryffi = document.createElement("div");
            gryffi.classList.add("gryff");
            item.appendChild(gryffi);
        }
        if (item.classList.contains("Slytherin")) {
            let slythi = document.createElement("div");
            slythi.classList.add("slyth");
            item.appendChild(slythi);
        }
        if (item.classList.contains("Hufflepuff")) {
            let huffi = document.createElement("div");
            huffi.classList.add("huff");
            item.appendChild(huffi);
        }
        if (item.classList.contains("Ravenclaw")) {
            let ravei = document.createElement("div");
            ravei.classList.add("rave");
            item.appendChild(ravei);
        }
    })
};
//Fetch
let url = "https://griffis.edumedia.ca/mad9014/sports/quidditch.php";
let headers = new Headers();
headers.append("Content-Type", "text/plain");
headers.append("Accept", "application/json; charset=utf-8");
let options = {
    method: "GET"
    , mode: "cors"
    , headers: headers
}
let req = new Request(url, options);
let fetchReload = function () {
        fetch(req).then(function (response) {
            return response.json();
        }).then(function (data) {
            handleData(data);
        }).catch(function (err) {
            alert(err);
        });
    }
    //Loaded
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".gamesB").addEventListener("click", goGames);
    document.querySelector(".standingsB").addEventListener("click", goStandings);
    document.querySelector(".iconic-reload").addEventListener("click", reload);
    goGames();
    fetchReload();
});