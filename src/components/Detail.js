import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import NightsStayRoundedIcon from "@material-ui/icons/NightsStayRounded";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  headerName: {
    alignSelf: "center",
  },
  weatherInfo: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: "auto",
    marginTop: 30,
    maxWidth: 600,
    maxHeight: 150,
    boxShadow: theme.shadows[3],
    animation: "$fadeIn 1s ease-in-out",
  },
  curImg: {
    margin: "auto",
    maxWidth: 300,
    maxHeight: 300,
  },
  backdrop: {
    backgroundColor: "#5F86FE",
    height: 680,
  },
  returnButton: {
    marginTop: 60,
    marginLeft: 375,
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
}));

function Detail() {
  const classes = useStyles();
  const history = useHistory();
  const curData = history.location.appState.hourlydata;

  const [weatherInfo, setWeatherInfo] = useState([]);

  var getCurDate = new Date();
  var getHourTime = getCurDate.getHours();

  const getWeatherIcon = (weather) => {
    let w = weather;
    console.log(weatherInfo);
    return w[0].icon;
  };

  const displayTime = (unix) => {
    let unix_timestamp = unix;
    var tmp = new Date(unix_timestamp * 1000);
    var toDate = tmp.toLocaleTimeString();
    return toDate;
  };

  const convertToHours = (i) => {
    let t = new Date(i * 1000);
    let hours = t.getHours();
    return hours;
  };

  const includeTime = async () => {
    let tmp = await Promise.all(
      curData.map(async (obj) => {
        return {
          ...obj,
          utcTime: convertToHours(obj.dt),
        };
      })
    );
    setWeatherInfo(tmp);
  };

  const calculateDate = () => {
    var arr = [];
    var i;
    for (i in weatherInfo) {
      for (getHourTime; getHourTime <= 24; getHourTime += 3) {
        if (getHourTime === weatherInfo[i].utcTime) {
          arr.push(
            <Paper className={classes.weatherInfo}>
              <Grid container spacing={0}>
                <Grid item>
                  <Container className={classes.image}>
                    <img
                      className={classes.curImg}
                      alt="complex"
                      src={
                        process.env.PUBLIC_URL +
                        `/${getWeatherIcon(curData[i].weather)}.png`
                      }
                    />
                  </Container>
                </Grid>
                <div style={{ textAlign: "left" }}>
                  <Typography
                    display="block"
                    variant="h5"
                    style={{ fontWeight: "bold" }}
                  >
                    {"Feels Like " + `${curData[i].feels_like}` + "°C"}
                  </Typography>
                  <Typography display="block" variant="h5">
                    {`${curData[i].weather[0].main}`}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {"Time :" + `${displayTime(curData[i].dt)}`}
                  </Typography>
                </div>
              </Grid>
            </Paper>
          );
        }
      }
    }

    return arr;
  };

  useEffect(() => {
    includeTime();
  }, []);
  //! pass in city name as parameter when redirecting to this component. use that parameter
  //! and fill into the api. then retrieve the hourly data and display it out
  return (
    <div className={classes.backdrop}>
      <AppBar position="static">
        <Toolbar className={classes.headerName}>
          <NightsStayRoundedIcon />
          <Typography>Weather Forecast</Typography>
        </Toolbar>
      </AppBar>
      {calculateDate()}
      <div className={classes.returnButton}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => {
            history.goBack();
          }}
        >
          Return
        </Button>
      </div>
    </div>
  );
}

export default Detail;
