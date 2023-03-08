import React, { Component } from 'react';
import { Chart } from 'chart.js';
class Timeline extends Component {
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.state = {
            timelines: []
        };
        this.handleAddTimeline = this.handleAddTimeline.bind(this);
    }

    componentDidMount(){
        this.mychart = new Chart(this.canvasRef.current, {
            type: 'line',
            options: {
                //Add chart.js options
            },
            data:  {
                labels : [],
                datasets : []
            }
        
        });
    }

    componentDidUpdate() {
        const { timelines } = this.state;
        const datasets = timelines.map(({ name, events, color }) => {
            return {
                label : name,
                data: events.map(({ date, label}) => ({ x:date, y:label})),
                borderColor: color,
                borderWidth: 1,
                fil: false,
                pointRadius: 5,
                pointHoverRadius: 10,
                pointBackgroundColor :color,
                pointBorderColor: color,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: color,
            };
        });
        const labels = timelines.reduce((acc, { events }) => {
            return acc.concat(events.map(({ date }) => date));
        }, []).filter((date,index, arr) => arr.indexOf(date) === index);
        this.mychart.data = {
            labels,
            datasets
        };
        this.mychart.update();
    }

    handleAddTimeline(){
        const { timelines } = this.state;
        const name = prompt('Enter name for your new timeline:');
        if (name) {
            this.setState({
                timelines: [
                    ...timelines,
                    {
                        name,
                        color: '#000000'                 }
                ]
            })
        }
    }
    render(){
        return <canvas ref={this.canvasRef} />;
    }
}
export default Timeline;