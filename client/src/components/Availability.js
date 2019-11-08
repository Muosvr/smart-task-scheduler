import React, { Component } from 'react';

class Availability extends (Component) {
  constructor() {
    super();
    this.NUM_OF_DAYS = 7;
    this.state = {
      availability: this.getDates()
    }
  }

  getDates = () => {
    let dates = []
    let today = new Date()
    for (let i = 0; i < this.NUM_OF_DAYS; i++) {
      let theNextDate = new Date()
      theNextDate.setDate(today.getDate() + i)
      dates.push({ date: theNextDate.toLocaleDateString(), availability: 0 })
    }
    return dates;
  }

  updateAvailability = (e, index) => {
    let newAvailability = this.state.availability.slice();
    newAvailability[index] = { ...newAvailability[index], availability: e.target.value }
    this.setState({ availability: newAvailability })
    this.props.updateAvailability(newAvailability);
  }

  display = () => {
    return (
      <div style={{
        margin: "10px 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {this.state.availability.map((availability, i) => {
          const id = "a" + i;
          return (
            <div key={i} style={{ display: "inlineBlock", margin: "5px" }}>
              <label htmlFor={id}>{availability.date}</label>
              <br />
              <input
                style={{ marginLeft: "5px", width: "60px" }}
                id={id}
                value={availability.availability}
                type="number"
                onChange={e => this.updateAvailability(e, i)}
              />
            </div>
          )

        })}
      </div>
    )
  }


  render() {
    return (
      <div>
        {this.display()}
      </div>
    )
  }

}

export default Availability;