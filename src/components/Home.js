import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  ButtonBase,
  Container,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import NightsStayRoundedIcon from "@material-ui/icons/NightsStayRounded";
import { useHistory } from "react-router-dom";
import { convertToDate } from "./function";

import { useDispatch, useSelector } from "react-redux";
import { writeWeather } from "../reduxConfig/actions/weatherAction";

const useStyles = makeStyles((theme) => ({
  headerName: {
    alignSelf: "center",
  },
  title: {
    marginLeft: 25,
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
  root: {
    marginTop: 50,
    marginLeft: 100,
  },
  curWeather: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: "auto",
    width: 500,
    maxWidth: 500,
    boxShadow: theme.shadows[3],
    animation: "$fadeIn .6s ease-in-out",
  },
  subWeather: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: "auto",
    width: 500,
    boxShadow: theme.shadows[3],

    animation: "$fadeIn 1.5s ease-in-out",
    animationDelay: "-.002s",
  },
  curImg: {
    margin: "auto",
    width: 128,
    height: 128,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  subImg: {
    margin: "auto",
    width: 100,
    height: 100,
    maxWidth: "100%",
    maxHeight: "100%",
  },
  subCat: {
    marginBottom: 20,
    marginLeft: 100,
  },
  backdrop: {
    backgroundColor: "#5F86FE",
  },

  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(2rem)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

function Home() {
  const dispatch = useDispatch();
  const { weatherList } = useSelector((state) => state.weatherReducers);
  const classes = useStyles();
  const history = useHistory();

  const weatherInformation = weatherList.daily;
  const timezone = weatherList.timezone;

  const [fetchComplete, setFetchComplete] = useState(false);

  const _getWeatherData = async () => {
    const endpoint =
      "https://api.openweathermap.org/data/2.5/onecall?lat=3.15&lon=101.71&exclude=current,minutely,alerts&units=metric&appid=b25c314cd84a8c1039c7a68fb4490a0c";
    const tmp = await fetch(endpoint);
    const result = await tmp.json();
    dispatch(writeWeather(result));
    setFetchComplete(true);
  };

  const renderSubWeather = () => {
    var arr = [];
    for (var i = 1; i <= 6; i++) {
      let min = i;
      arr.push(
        <ButtonBase
          className={classes.subCat}
          onClick={() => {
            history.push({
              pathname: "/detail",
              appState: { hourlydata: weatherInformation[min].dt },
            });
          }}
        >
          <Paper className={classes.subWeather}>
            <Grid container>
              <Grid item>
                <Container className={classes.image}>
                  <img
                    className={classes.subImg}
                    alt="complex"
                    src={
                      process.env.PUBLIC_URL +
                      `/${weatherInformation[min].weather[0].icon}.png`
                    }
                  />
                </Container>
              </Grid>
              <Grid item xs={12} sm container>
                <div style={{ textAlign: "left" }}>
                  <Typography
                    display="block"
                    variant="h6"
                    style={{ fontWeight: "bold" }}
                  >
                    {"Feels Like " +
                      `${weatherInformation[min].feels_like.day}` +
                      "°C"}
                  </Typography>
                  <Typography display="block" variant="h6">
                    {"High " +
                      `${weatherInformation[min].temp.max}` +
                      "°C |" +
                      " Low " +
                      `${weatherInformation[min].temp.min}` +
                      "°C"}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {convertToDate(weatherInformation[min].dt)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {weatherInformation[min].weather[0].main}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </ButtonBase>
      );
    }
    return arr;
  };

  const renderMainWeather = () => {
    return (
      <ButtonBase
        onClick={() => {
          history.push({
            pathname: "/detail",
            appState: { hourlydata: weatherInformation[0].dt },
          });
        }}
      >
        <Paper className={classes.curWeather}>
          <Grid container spacing={0}>
            <Grid item>
              <Container className={classes.image}>
                <img
                  className={classes.curImg}
                  alt="complex"
                  src={
                    process.env.PUBLIC_URL +
                    `/${weatherInformation[0].weather[0].icon}.png`
                  }
                />
              </Container>
            </Grid>
            <div style={{ textAlign: "left" }}>
              <Typography
                display="block"
                variant="h6"
                style={{ fontWeight: "bold" }}
              >
                {"Feels Like " +
                  `${weatherInformation[0].feels_like.day}` +
                  "°C"}
              </Typography>
              <Typography display="block" variant="h6">
                {"High " +
                  `${weatherInformation[0].temp.max}` +
                  "°C |" +
                  " Low " +
                  `${weatherInformation[0].temp.min}` +
                  "°C"}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {convertToDate(weatherInformation[0].dt)}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {weatherInformation[0].weather[0].main}
              </Typography>
            </div>
          </Grid>
        </Paper>
      </ButtonBase>
    );
  };

  useEffect(() => {
    _getWeatherData();
  }, []);

  return (
    <div className={classes.backdrop}>
      {fetchComplete && (
        <div>
          <AppBar position="static">
            <Toolbar className={classes.headerName}>
              <NightsStayRoundedIcon />
              <Typography>Weather Forecast</Typography>
            </Toolbar>
          </AppBar>
          <Typography className={classes.title}>{timezone}</Typography>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                {renderMainWeather()}
              </Grid>
              <Grid item xs={5}>
                {renderSubWeather()}
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
