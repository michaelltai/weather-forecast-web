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
import { GraphQLClient, gql } from "graphql-request";

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
  const hourlyInformation = weatherList.hourly;
  const timezone = weatherList.timezone;

  const [fetchComplete, setFetchComplete] = useState(false);

  const _getWeatherData = async () => {
    const endpoint =
      "https://api.openweathermap.org/data/2.5/onecall?lat=3.15&lon=101.71&exclude=current,minutely,alerts&units=metric&appid=b25c314cd84a8c1039c7a68fb4490a0c";
    //const query = gql`{

    //   }`;
    // var variable;
    // console.log("calling");
    // const information = new GraphQLClient(endpoint, {
    //   headers: { authorization: "Bearer MY_TOKEN" },
    // });
    // information.request(query, variable).then((data) => console.log(data));

    const tmp = await fetch(endpoint);
    const result = await tmp.json();
    dispatch(writeWeather(result));
    setFetchComplete(true);
  };

  const displayTime = (unix) => {
    let unix_timestamp = unix;
    var tmp = new Date(unix_timestamp * 1000);
    var toDate = tmp.toLocaleDateString();
    return toDate;
  };

  const renderSubWeather = () => {
    var i;
    var arr = [];
    for (i = 1; i <= 6; i++) {
      arr.push(
        <ButtonBase className={classes.subCat}>
          <Paper className={classes.subWeather}>
            <Grid container>
              <Grid item>
                <Container className={classes.image}>
                  <img
                    className={classes.subImg}
                    alt="complex"
                    src={
                      process.env.PUBLIC_URL +
                      `/${weatherInformation[i].weather[0].icon}.png`
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
                    {/* sdasdad */}
                    {"Feels Like " +
                      `${weatherInformation[i].feels_like.day}` +
                      "°C"}
                  </Typography>
                  <Typography display="block" variant="h6">
                    {/* sadsadas */}
                    {"High " +
                      `${weatherInformation[i].temp.max}` +
                      "°C |" +
                      " Low " +
                      `${weatherInformation[i].temp.min}` +
                      "°C"}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {/* asdasdasd */}
                    {displayTime(weatherInformation[i].dt)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {weatherInformation[i].weather[0].main}
                    {/* Rainy */}
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
            appState: { hourlydata: hourlyInformation },
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
                {/* Feels Like 30°C */}
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
                {/* High 20°C | Low 18°C */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {displayTime(weatherInformation[0].dt)}
                {/* 26/6/2021 */}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {weatherInformation[0].weather[0].main}
                {/* Rainy */}
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
