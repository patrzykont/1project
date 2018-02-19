var scheduleByWeek = {};
var weekScores = []
    function displaySchedule() {        
        var schedule = "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/full_game_schedule.json"
        $.ajax({
          url: schedule,
          method: "GET",
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa("patrzykonta" + ":" + "kucoding1")
          },
          success: function (response){
              var nflSchedule = response.fullgameschedule.gameentry;
              var currentWeek;
              for ( var i =0; i < nflSchedule.length; i++) {
                currentWeek = nflSchedule[i].week
                if ( !scheduleByWeek[currentWeek] ) {
                  scheduleByWeek[currentWeek] = [];
                }
                scheduleByWeek[currentWeek].push(nflSchedule[i]);
              }
            }
          })
      }
      var dates = [
        ["20170907", "20170910", "20170911"],
        ["20170914", "20170917", "20170918"],
        ["20170921", "20170924", "20170925"],
        ["20170928", "20171001", "20171002"],
        ["20171005", "20171008", "20171009"],
        ["20171012", "20171015", "20171016"],
        ["20171019", "20171022", "20171023"],
        ["20171026", "20171029", "20171030"],
        ["20171102", "20171105", "20171106"],
        ["20171109", "20171112", "20171113"],
        ["20171116", "20171119", "20171120"],
        ["20171123", "20171126", "20171127"],
        ["20171130", "20171203", "20171204"],
        ["20171207", "20171210", "20171211"],
        ["20171214", "20171216", "20171217", "20171218"],
        ["20171223", "20171224", "20171225", "20171231"]
      ]
   function displayScores(dates) {
    var weeklyScore = weekScores;
    weekScores =[];
    var day1, day2, day3;
     var scores = "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/scoreboard.json?fordate=" + dates[0];
        $.ajax({
          url: scores,
          method: "GET",
          dataType: 'json',
          async: false,
          headers: {
            "Authorization": "Basic " + btoa("patrzykonta" + ":" + "kucoding1")
          },
          success: function (response){
            //console.log(response);
            day1 = response
            scores =  "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/scoreboard.json?fordate=" + dates[1];
            $.ajax({
              url: scores,
              method: "GET",
              dataType: 'json',
              async: false,
              headers: {
                "Authorization": "Basic " + btoa("patrzykonta" + ":" + "kucoding1")
              },
              success: function (response){
                //console.log(response);
                day2 = response
                scores =  "https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-regular/scoreboard.json?fordate=" + dates[2];
                $.ajax({
                  url: scores,
                  method: "GET",
                  dataType: 'json',
                  async: false,
                  headers: {
                    "Authorization": "Basic " + btoa("patrzykonta" + ":" + "kucoding1")
                  },
                  success: function (response){
                    //console.log(response);
                    day3 = response
                }
              })
            }
          })
        }
      })
        var allScoreData = day1.scoreboard.gameScore.concat(day2.scoreboard.gameScore, day3.scoreboard.gameScore)
        //console.log('All Score Data :: ', allScoreData)
        for (var i=0; i < allScoreData.length; i++) {
          weekScores.push({home: allScoreData[i].homeScore, away: allScoreData[i].awayScore})
        }
        console.log('DAYs:  ')
        console.log(weekScores)
    }    
  $("#weekSelector a").on("click", function(element) {
    event.preventDefault();
    var nWeek = $(this).data("week");
    $("#schedule").empty();
    console.log(nWeek)    
    displayScores(dates[nWeek-1]);
    var weeklySchedule = scheduleByWeek[nWeek];
    var weeklyScore = weekScores;
    console.log(weeklyScore)
    console.log(weekScores)
    for (var i = 0; i < weeklySchedule.length; i++) {
      var newDiv = $("<div class='items'>");
      var weekNumber = weeklySchedule[i].week;
      var gameDate = weeklySchedule[i].date;
      var gameTime = weeklySchedule[i].time;
      var awayTeamCity = weeklySchedule[i].awayTeam.City;
      var awayTeamName = weeklySchedule[i].awayTeam.Name;
      var homeTeamCity = weeklySchedule[i].homeTeam.City;
      var homeTeamName = weeklySchedule[i].homeTeam.Name;
      var awayScore = weekScores[i].away;
      var homeScore = weekScores[i].home;
      var wNumber = $("<p>").text("Week: " + weekNumber);
      var gDate = $("<p>").text("Game Date: " + gameDate);
      var gTime = $("<p>").text("Game Time: " + gameTime);
      var aTeam = $("<p>").text("Away Team: " + awayTeamCity + " " + awayTeamName);
      var hTeam = $("<p>").text("Home Team: " + homeTeamCity + " " + homeTeamName);
      var aScore = $("<p>").text("Away Score: " + awayScore);
      var hScore = $("<p>").text("Home Score: " + homeScore);
      newDiv.append(wNumber);
      newDiv.append(gDate);
      newDiv.append(gTime);
      newDiv.append(aTeam);
      newDiv.append(hTeam);      
      newDiv.append(aScore);
      newDiv.append(hScore);
      $("#schedule").append(newDiv);
    }
      
  })
      displaySchedule();