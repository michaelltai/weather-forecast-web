import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Typography,
  Container,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import NightsStayRoundedIcon from "@material-ui/icons/NightsStayRounded";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { displayTime, convertToDate } from "./function";

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
    height: 1650,
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
  const curDateUnix = history.location.appState.hourlydata;

  const [weatherInfo, setWeatherInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const includeTime = async () => {
    const endpoint =
      "https://api.openweathermap.org/data/2.5/forecast?q=Kuala%20Lumpur&units=metric&appid=b25c314cd84a8c1039c7a68fb4490a0c";

    const tmp = await fetch(endpoint);
    const result = await tmp.json();
    let date = convertToDate(curDateUnix);
    setSelectedDate(date);
    setWeatherInfo(result.list);
  };

  const calculateDate = () => {
    var arr = [];

    for (var i = 0; i < weatherInfo.length; i++) {
      let int = convertToDate(weatherInfo[i].dt);
      if (int === selectedDate) {
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
                      `/${weatherInfo[i].weather[0].icon}.png`
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
                  {`Feels Like ${weatherInfo[i].main.feels_like} °C`}
                </Typography>
                <Typography display="block" variant="h5">
                  {`${weatherInfo[i].weather[0].main}`}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {`Time : ${displayTime(weatherInfo[i].dt)}`}
                </Typography>
              </div>
            </Grid>
          </Paper>
        );
      } else if (i === weatherInfo.length - 1 && arr.length === 0) {
        arr.push(
          <Paper className={classes.weatherInfo}>
            <Typography
              align="center"
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              Weather Not Found!
            </Typography>
          </Paper>
        );
      }
    }

    return arr;
  };

  useEffect(() => {
    includeTime();
  }, []);

  return (
    <div className={classes.backdrop}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.goBack();
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <NightsStayRoundedIcon />
          <Typography>Weather Forecast</Typography>
        </Toolbar>
      </AppBar>
      <Typography className={classes.title}>{selectedDate}</Typography>
      {calculateDate()}
    </div>
  );
}

export default Detail;
