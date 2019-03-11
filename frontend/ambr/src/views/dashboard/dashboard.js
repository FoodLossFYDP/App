import React from 'react';
import DashboardTabs from './dashboard-nav.js';
import { withStyles } from '@material-ui/core/styles';
import YearlyChart from './charts/yearly-chart.js';
import WeeklyChart from './charts/weekly-chart.js';
import MonthlyChart from './charts/monthly-chart.js';

const styles = theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  });

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.state = {
            view: 0
        };
    }

    handleViewChange(val) {
        this.setState({view: val});
    }

    render() {
        return (
            <div>
                <DashboardTabs onChange={this.handleViewChange}/>
                {this.state.view == 0 && <WeeklyChart /> ||
                    this.state.view == 1 && <MonthlyChart /> || 
                    this.state.view == 2 && <YearlyChart />}
                {/* <FoodStats />
                <Footprints /> */}
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);