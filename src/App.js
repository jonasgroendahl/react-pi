import React, { Component } from 'react';
import './App.css';
import Pause from "./components/Pause";
import Move from "./components/Move";
import Complete from "./components/Complete";
import { format } from "date-fns";
import io from "socket.io-client";
import Play from "./components/Play";

class App extends Component {

  state = {
    time: '15:57',
    view: 'PAUSE',
    item: {},
    countdown: 10,
    rest: false,
    prevView: 'PAUSE'
  }

  componentDidMount = () => {
    this.startClock();
    this.socket = io('http://localhost:3001');
    this.handleIncomingSocketRequests();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.view !== prevState.view) {
      this.setState({ prevView: prevState.view });
    }
  }

  handleIncomingSocketRequests = () => {
    this.socket.on("next-class", (data) => {
      console.log('next', data);
      const modifiedData = { ...data, start: format(new Date(data.start), 'HH:mm') };
      if (data.complete) {
        this.setState({ view: 'COMPLETE' });
        setTimeout(() => {
          this.setState({ view: 'PAUSE', item: modifiedData })
        }, 5000);
      }
      else {
        this.setState({ view: 'PAUSE', item: modifiedData });
      }
    });

    this.socket.on("play", (data) => {
      console.log('play', data);

      if (data.move) {
        this.setState({ view: 'MOVE' });

        let timer;

        // IF ALSO a rest block
        if (data.rest) {
          this.setState({ rest: 1 });
          timer = data.duration * data.amount;
        }
        else {
          timer = 10;
        }

        this.setState({ countdown: timer }, () => {
          const moveTimer = setInterval(() => {
            timer--;
            this.setState({ countdown: timer });
            if (timer === 4 && !data.rest) {
              clearInterval(moveTimer);
              this.startPlayInterval();
              this.setState({ view: 'PLAY', rest: 0, item: { ...data } });
            }
            if (timer === 0 && data.rest) {
              clearInterval(moveTimer);
            }
          }, 1000)
        })
      }
      else {
        this.startPlayInterval();
        this.setState({ view: 'PLAY', item: { ...data } });
      }
    });
  }

  startPlayInterval = () => {
    this.setState({ countdown: 4 });
    let playTimer = 4;
    const playInterval = setInterval(() => {
      playTimer--;
      this.setState({ countdown: playTimer });
      if (playTimer === 0) {
        this.setState({ view: 'PLAYING' });
        clearInterval(playInterval);
      }
    }, 1000)
  }

  startClock = () => {
    setInterval(() => {
      const time = format(new Date(), 'HH:mm');
      this.setState({ time });
    }, 1000);
  }

  render() {
    const { time, view, item, countdown, rest } = this.state;

    const classes = ['wrapper'];

    let viewContent;
    switch (view) {
      case 'PAUSE':
        viewContent = <Pause item={item} />
        classes.push('pause-bg');
        break;
      case 'MOVE':
        viewContent = <Move countdown={countdown} rest={rest} />
        classes.push('move-bg');
        break;
      case 'COMPLETE':
        viewContent = <Complete />;
        classes.push('complete-bg');
        break;
      case 'PLAY':
        viewContent = <Play item={item} countdown={countdown} />
        if (this.state.prevView === 'PAUSE') {
          classes.push('pause-bg');
        }
        else {
          classes.push('move-bg');
        }
        break;
      default:
        break;
    }

    return (
      <div className={classes.join(' ')}>
        {viewContent}
        {view !== 'PLAYING' && <p className="clock">{time}</p>}
      </div>
    );
  }
}

export default App;
