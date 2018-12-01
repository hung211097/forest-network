import React, { Component } from 'react';
import 'rc-calendar/assets/index.css';
import FullCalendar from 'rc-calendar/lib/FullCalendar';

import 'rc-select/assets/index.css';
import Select from 'rc-select';

import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';

const now = moment();
now.locale('en-gb').utcOffset(0);

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'month',
    }
  }
  onTypeChange = (type) => {
    this.setState({
      type,
    });
  }
  render() {
    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          fullscreen
          defaultValue={now}
          locale={enUS}
        />
      </div>
    );
  }
}

export default Calendar;
