import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  });

class WeeklyChart extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

export default withStyles(styles)(WeeklyChart);